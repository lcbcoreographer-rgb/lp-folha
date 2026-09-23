/**
 * Texto rico do blog, sanitizado de novo aqui antes de ir para a tela.
 *
 * O CRM já limpa o texto ao salvar, mas o site não confia só nisso: o que
 * chega pela rede passa por esta lista fechada antes de virar HTML. Cópia do
 * sanitizador do CRM (crm-folha, app/lib/emailBlocos.ts), com o conjunto de
 * marcas do blog: p, br, strong, em, a[href], ul, ol, li.
 * ponytail: cópia em vez de pacote compartilhado; são dois repositórios e a
 * função é pura. Mudou lá, muda aqui.
 */

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export function escaparHtml(texto: string): string {
  return texto.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

const ENTIDADES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  aacute: "á", Aacute: "Á", eacute: "é", Eacute: "É", iacute: "í", Iacute: "Í",
  oacute: "ó", Oacute: "Ó", uacute: "ú", Uacute: "Ú", atilde: "ã", Atilde: "Ã",
  otilde: "õ", Otilde: "Õ", ccedil: "ç", Ccedil: "Ç", acirc: "â", Acirc: "Â",
  ecirc: "ê", Ecirc: "Ê", ocirc: "ô", Ocirc: "Ô", agrave: "à", Agrave: "À",
};

function decodificarEntidades(texto: string): string {
  return texto.replace(/&(#[xX][0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (original, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return n > 0 && n <= 0x10ffff && !(n >= 0xd800 && n <= 0xdfff) ? String.fromCodePoint(n) : "";
    }
    return ENTIDADES[e] ?? ENTIDADES[e.toLowerCase()] ?? original;
  });
}

/**
 * Link aceito: http e https sempre; mailto e tel só onde `contato` (link no
 * meio do texto). Qualquer outro esquema (javascript:, data:) volta vazio.
 */
export function linkSeguro(entrada: string, contato = true): string {
  const url = String(entrada ?? "").trim();
  if (!url || url.length > 2000) return "";
  if (/^https?:\/\//i.test(url)) {
    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:" ? u.href : "";
    } catch {
      return "";
    }
  }
  if (contato && /^mailto:[^\s"'<>]+@[^\s"'<>]+$/i.test(url)) return url;
  if (contato && /^tel:\+?[\d\s().-]{6,30}$/i.test(url)) return url.replace(/[\s().-]/g, "");
  return "";
}

const TAGS_PERMITIDAS = new Set(["p", "br", "strong", "em", "a", "ul", "ol", "li"]);
// o editor do navegador às vezes quebra linha com <div> e marca negrito com <b>
const TAGS_TROCADAS: Record<string, string> = { div: "p", b: "strong", i: "em" };
// some junto com o conteúdo, não só a marcação
const TAGS_DESCARTADAS = new Set([
  "script", "style", "title", "textarea", "iframe", "object", "embed", "noscript",
  "template", "xmp", "svg", "math", "head", "select", "noembed", "noframes",
]);

/** Texto entre tags: decodifica o que veio codificado e escapa de novo só o que abre marcação. */
function textoSeguro(texto: string): string {
  return decodificarEntidades(texto).replace(/[&<>]/g, (c) => ESCAPES[c]);
}

/** Índice do ">" que fecha a tag, pulando o que está entre aspas. -1 se não fecha. */
function fimDaTag(html: string, desde: number): number {
  let aspas = "";
  for (let i = desde; i < html.length; i++) {
    const c = html[i];
    if (aspas) {
      if (c === aspas) aspas = "";
    } else if (c === '"' || c === "'") aspas = c;
    else if (c === ">") return i;
  }
  return -1;
}

function lerHref(atributos: string): string | null {
  const re = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(atributos))) {
    if (m[1].toLowerCase() === "href") return decodificarEntidades(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return null;
}

/**
 * Só p, br, strong, em, a[href], ul, ol, li. Todo atributo some (estilo,
 * evento, classe), menos o href do link, que só fica se for http, https,
 * mailto ou tel. Script, estilo e comentário somem com o conteúdo. A saída
 * sai sempre bem formada (toda tag aberta é fechada).
 */
export function sanitizarTextoRico(entrada: string): string {
  const html = String(entrada ?? "");
  const pilha: { nome: string; emitida: boolean }[] = [];
  let saida = "";
  let i = 0;

  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) {
      saida += textoSeguro(html.slice(i));
      break;
    }
    saida += textoSeguro(html.slice(i, lt));

    if (html.startsWith("<!--", lt)) {
      const fim = html.indexOf("-->", lt + 4);
      i = fim === -1 ? html.length : fim + 3;
      continue;
    }
    if (html[lt + 1] === "!" || html[lt + 1] === "?") {
      const fim = html.indexOf(">", lt);
      i = fim === -1 ? html.length : fim + 1;
      continue;
    }

    const m = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt, lt + 80));
    if (!m) {
      saida += "&lt;";
      i = lt + 1;
      continue;
    }
    const fim = fimDaTag(html, lt + m[0].length);
    if (fim === -1) break; // tag cortada no fim do texto: descarta o resto
    const fechando = m[1] === "/";
    const original = m[2].toLowerCase();
    const atributos = html.slice(lt + m[0].length, fim);
    i = fim + 1;

    if (!fechando && TAGS_DESCARTADAS.has(original)) {
      const fecho = new RegExp(`</${original}\\s*>`, "i").exec(html.slice(i));
      i = fecho ? i + fecho.index + fecho[0].length : html.length;
      continue;
    }

    const nome = TAGS_TROCADAS[original] ?? original;
    if (!TAGS_PERMITIDAS.has(nome)) continue;

    if (nome === "br") {
      if (!fechando) saida += "<br>";
      continue;
    }

    if (fechando) {
      let pos = -1;
      for (let k = pilha.length - 1; k >= 0; k--) {
        if (pilha[k].nome === nome) {
          pos = k;
          break;
        }
      }
      if (pos === -1) continue; // fecha o que nunca abriu: ignora
      while (pilha.length > pos) {
        const topo = pilha.pop()!;
        if (topo.emitida) saida += `</${topo.nome}>`;
      }
      continue;
    }

    if (nome === "a") {
      const href = linkSeguro(lerHref(atributos) ?? "");
      // link perigoso ou sem destino: o texto fica, o link não
      pilha.push({ nome, emitida: Boolean(href) });
      if (href) saida += `<a href="${escaparHtml(href)}">`;
      continue;
    }

    pilha.push({ nome, emitida: true });
    saida += `<${nome}>`;
  }

  while (pilha.length) {
    const topo = pilha.pop()!;
    if (topo.emitida) saida += `</${topo.nome}>`;
  }
  return saida;
}
