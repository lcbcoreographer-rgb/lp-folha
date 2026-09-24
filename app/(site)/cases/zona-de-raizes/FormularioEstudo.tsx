"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, Download, Loader2 } from "lucide-react";
import WhatsAppCTAButton from "../../../components/WhatsAppCTAButton";
import { trackEvent } from "../../../lib/gtag";
import {
  CAMPOS_VAZIOS,
  CARGOS,
  ROTA_FORMULARIOS,
  SEGMENTOS,
  corpoDoEnvio,
  mascaraTelefone,
  validar,
  type Campos,
} from "../../../lib/formularioSite";

export const ID_CARTAO = "baixar-o-case";
export const MENSAGEM_WHATSAPP =
  "Olá, vi o site da Folha e o case de tratamento de efluentes com zona de raízes. Quero conversar sobre o meu projeto.";

const FORMULARIO = "estudo-de-caso-zona-de-raizes";
const PDF = "/materiais/case-zona-de-raizes.pdf";
const CHAVE = "folha:estudo-zona-de-raizes"; // guarda só o primeiro nome
const ORDEM: (keyof Campos)[] = ["nome", "email", "telefone", "cargo", "segmento"];
const GENERICA = "Não conseguimos enviar agora. Confira sua conexão e tente de novo.";

// ---------- quem já preencheu (localStorage, sempre com try/catch) ----------

function lerSalvo(): string | null {
  try {
    return window.localStorage.getItem(CHAVE);
  } catch {
    return null;
  }
}
function assinar(avisar: () => void) {
  window.addEventListener("storage", avisar);
  return () => window.removeEventListener("storage", avisar);
}
function gravar(valor: string | null) {
  try {
    if (valor === null) window.localStorage.removeItem(CHAVE);
    else window.localStorage.setItem(CHAVE, valor);
  } catch {
    // modo privado ou armazenamento bloqueado: só não lembra na próxima visita
  }
}

// ---------- peças ----------

const BOTAO_PRINCIPAL =
  "inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-amber-600 px-6 py-3 text-[0.95rem] font-medium tracking-[0.06em] text-white uppercase transition-colors duration-300 hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-900";

const BOTAO_SECUNDARIO =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-forest-900/30 px-6 py-3 text-[0.95rem] font-medium text-forest-900 transition-colors duration-300 hover:border-forest-900 hover:bg-forest-900 hover:text-paper";

function LinkDoPdf({ children, className = BOTAO_PRINCIPAL }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={PDF}
      download="Case-Folha-Zona-de-Raizes.pdf"
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent("file_download", { file_name: "case-zona-de-raizes.pdf" })}
      className={className}
    >
      <Download size={19} strokeWidth={1.8} aria-hidden />
      {children}
    </a>
  );
}

const CAMPO =
  "block h-12 w-full rounded-lg border border-forest-900/20 bg-white px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20 aria-[invalid=true]:border-amber-600 aria-[invalid=true]:ring-amber-600/15 lg:h-11";

function Campo({
  id,
  rotulo,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink lg:mb-1">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="mt-1.5 text-sm leading-snug text-amber-700">
          {erro}
        </p>
      )}
    </div>
  );
}

// ---------- o cartão ----------

export default function FormularioEstudo() {
  const salvo = useSyncExternalStore(assinar, lerSalvo, () => null);
  // null = decide pelo que ficou salvo; depois de agir, a pessoa manda
  const [fase, setFase] = useState<"form" | "sucesso" | null>(null);
  const mostra = fase ?? (salvo !== null ? "retorno" : "form");

  const [dados, setDados] = useState<Campos>(CAMPOS_VAZIOS);
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [erroServidor, setErroServidor] = useState<string | null>(null);
  const [falhas, setFalhas] = useState(0);
  const [primeiroNome, setPrimeiroNome] = useState("");

  const iniciadoEm = useRef(0);
  const armadilha = useRef<HTMLInputElement>(null);
  const tituloPainel = useRef<HTMLHeadingElement>(null);

  // "quando o formulário apareceu": na montagem; e de novo em "Preencher de novo"
  useEffect(() => {
    iniciadoEm.current = Date.now();
  }, []);

  useEffect(() => {
    if (fase === "sucesso") tituloPainel.current?.focus();
  }, [fase]);

  function mudar(campo: keyof Campos, valor: string) {
    const novo = { ...dados, [campo]: campo === "telefone" ? mascaraTelefone(valor) : valor };
    setDados(novo);
    // o aviso some assim que o campo fica certo, sem esperar outro envio
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: validar(novo)[campo] }));
  }

  function sair(campo: keyof Campos) {
    if (!dados[campo]) return; // não brigar com quem só passou pelo campo
    setErros((e) => ({ ...e, [campo]: validar(dados)[campo] }));
  }

  function falhou(frase: string | null, detalhe: unknown) {
    console.error("[estudo de caso] envio para o CRM falhou", detalhe);
    setFalhas((n) => n + 1);
    setErroServidor(frase ?? GENERICA);
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviando) return;

    const agora = validar(dados);
    setErros(agora);
    const primeiro = ORDEM.find((c) => agora[c]);
    if (primeiro) {
      document.getElementById(`estudo-${primeiro}`)?.focus();
      return;
    }

    setEnviando(true);
    setErroServidor(null);
    try {
      const r = await fetch(ROTA_FORMULARIOS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          corpoDoEnvio(dados, {
            formulario: FORMULARIO,
            formularioNome: "Estudo de caso Zona de Raízes",
            pagina: window.location.pathname,
            iniciadoEm: iniciadoEm.current,
            site: armadilha.current?.value ?? "",
          })
        ),
        // rede presa não pode deixar a pessoa girando para sempre (Safari < 16 não tem timeout)
        signal: typeof AbortSignal.timeout === "function" ? AbortSignal.timeout(15000) : undefined,
      });

      if (r.ok) {
        const nome = dados.nome.trim().split(/\s+/)[0] ?? "";
        gravar(nome);
        setPrimeiroNome(nome);
        setFase("sucesso");
        trackEvent("generate_lead", { form_name: FORMULARIO });
        return;
      }

      const corpo: unknown = await r.json().catch(() => null);
      const frase =
        corpo && typeof corpo === "object" && "error" in corpo && typeof corpo.error === "string" && corpo.error
          ? corpo.error
          : null;
      if (r.status >= 500) falhou(frase, `HTTP ${r.status}`);
      else setErroServidor(frase ?? GENERICA);
    } catch (err) {
      falhou(null, err);
    } finally {
      setEnviando(false);
    }
  }

  function preencherDeNovo() {
    gravar(null);
    setDados(CAMPOS_VAZIOS);
    setErros({});
    setErroServidor(null);
    setFalhas(0);
    iniciadoEm.current = Date.now();
    setFase("form");
    requestAnimationFrame(() => document.getElementById("estudo-nome")?.focus());
  }

  return (
    <div
      id={ID_CARTAO}
      data-lenis-prevent
      className="scroll-mt-24 rounded-2xl bg-paper p-6 shadow-[0_30px_70px_-30px_rgba(20,30,14,0.55)] ring-1 ring-forest-900/10 sm:p-8 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:p-7"
    >
      {mostra === "form" && (
        <form onSubmit={enviar} method="post" noValidate aria-describedby="estudo-legal">
          <p className="rotulo text-ink-soft">Case completo, PDF de 12 páginas</p>
          <h2 className="text-balance mt-2.5 text-[1.45rem] leading-[1.25] text-forest-950">
            Preencha seus dados para acessar o conteúdo
          </h2>

          <div className="mt-6 space-y-4 lg:mt-5 lg:space-y-3">
            <Campo id="estudo-nome" rotulo="Nome completo" erro={erros.nome}>
              <input
                id="estudo-nome"
                name="nome"
                type="text"
                autoComplete="name"
                autoCapitalize="words"
                enterKeyHint="next"
                placeholder="Seu nome e sobrenome"
                value={dados.nome}
                onChange={(e) => mudar("nome", e.target.value)}
                onBlur={() => sair("nome")}
                aria-invalid={!!erros.nome}
                aria-describedby={erros.nome ? "estudo-nome-erro" : undefined}
                required
                className={CAMPO}
              />
            </Campo>

            <Campo id="estudo-email" rotulo="E-mail corporativo" erro={erros.email}>
              <input
                id="estudo-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="next"
                placeholder="voce@empresa.com.br"
                value={dados.email}
                onChange={(e) => mudar("email", e.target.value)}
                onBlur={() => sair("email")}
                aria-invalid={!!erros.email}
                aria-describedby={erros.email ? "estudo-email-erro" : undefined}
                required
                className={CAMPO}
              />
            </Campo>

            <Campo id="estudo-telefone" rotulo="Telefone / WhatsApp" erro={erros.telefone}>
              <input
                id="estudo-telefone"
                name="telefone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                enterKeyHint="next"
                placeholder="(41) 99999-9999"
                value={dados.telefone}
                onChange={(e) => mudar("telefone", e.target.value)}
                onBlur={() => sair("telefone")}
                aria-invalid={!!erros.telefone}
                aria-describedby={erros.telefone ? "estudo-telefone-erro" : undefined}
                required
                className={CAMPO}
              />
            </Campo>

            {(
              [
                ["cargo", "Cargo", CARGOS, "organization-title"],
                ["segmento", "Segmento de atuação", SEGMENTOS, "off"],
              ] as const
            ).map(([campo, rotulo, opcoes, auto]) => (
              <Campo key={campo} id={`estudo-${campo}`} rotulo={rotulo} erro={erros[campo]}>
                <div className="relative">
                  <select
                    id={`estudo-${campo}`}
                    name={campo}
                    autoComplete={auto}
                    value={dados[campo]}
                    onChange={(e) => mudar(campo, e.target.value)}
                    onBlur={() => sair(campo)}
                    aria-invalid={!!erros[campo]}
                    aria-describedby={erros[campo] ? `estudo-${campo}-erro` : undefined}
                    required
                    className={`${CAMPO} appearance-none pr-11 ${dados[campo] ? "" : "text-ink-soft/70"}`}
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {opcoes.map((o) => (
                      <option key={o} value={o} className="text-ink">
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-soft"
                  />
                </div>
              </Campo>
            ))}
          </div>

          {/* Armadilha para robô: fora da tela, fora do Tab e do leitor de tela. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="estudo-site">Site</label>
            <input ref={armadilha} id="estudo-site" name="site" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>

          {erroServidor && (
            <p role="alert" className="mt-5 rounded-lg bg-amber-600/10 px-4 py-3 text-sm leading-snug text-amber-700">
              {erroServidor}
            </p>
          )}

          {/* Duas quedas de rede ou do servidor: não prender a pessoa */}
          {falhas >= 2 && (
            <div className="mt-4 space-y-3 rounded-xl border border-forest-900/15 p-4">
              <p className="text-sm leading-snug text-ink">
                O case é seu mesmo assim. Baixe agora, e se quiser, fale com a gente no WhatsApp.
              </p>
              <LinkDoPdf>Baixar o case (PDF)</LinkDoPdf>
              <WhatsAppCTAButton eventLabel="estudo_falha_whatsapp" message={MENSAGEM_WHATSAPP} className={BOTAO_SECUNDARIO}>
                Falar no WhatsApp
              </WhatsAppCTAButton>
            </div>
          )}

          <button
            type="submit"
            disabled={enviando}
            className={`${BOTAO_PRINCIPAL} mt-6 min-h-14 disabled:cursor-wait disabled:opacity-80 lg:mt-5 lg:min-h-13`}
          >
            {enviando ? (
              <>
                <Loader2 size={19} className="animate-spin motion-reduce:animate-none" aria-hidden />
                Enviando…
              </>
            ) : erroServidor ? (
              "Tentar de novo"
            ) : (
              "Baixar o case"
            )}
          </button>
          <p id="estudo-legal" className="mt-3 text-center text-xs leading-relaxed text-ink-soft">
            Ao clicar no botão, você concorda com nossa{" "}
            <a href="/politica-de-privacidade" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-forest-800">
              Política de Privacidade
            </a>
            .
          </p>
        </form>
      )}

      {mostra === "sucesso" && (
        <div aria-live="polite">
          <p className="rotulo text-ink-soft">Tudo certo</p>
          <h2
            ref={tituloPainel}
            tabIndex={-1}
            className="text-balance mt-2.5 text-[1.6rem] leading-[1.2] text-forest-950 outline-none"
          >
            {primeiroNome ? `Obrigado, ${primeiroNome}. O case é seu.` : "Obrigado. O case é seu."}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            O PDF tem 12 páginas e abre em outra aba.
          </p>
          <div className="mt-6">
            <LinkDoPdf className={`${BOTAO_PRINCIPAL} min-h-16 text-base`}>Baixar o case (PDF)</LinkDoPdf>
          </div>
          <div className="fio mt-8 pt-6">
            <p className="leading-relaxed text-ink">
              Tem um projeto parecido? O time comercial da Folha conversa com você pelo WhatsApp.
            </p>
            <div className="mt-4">
              <WhatsAppCTAButton eventLabel="estudo_sucesso_whatsapp" message={MENSAGEM_WHATSAPP} className={BOTAO_SECUNDARIO}>
                Falar no WhatsApp
              </WhatsAppCTAButton>
            </div>
          </div>
        </div>
      )}

      {mostra === "retorno" && (
        <div>
          <p className="rotulo text-ink-soft">Case liberado</p>
          <h2 className="text-balance mt-2.5 text-[1.6rem] leading-[1.2] text-forest-950">
            {salvo ? `Que bom te ver de novo, ${salvo}.` : "Que bom te ver de novo."}
          </h2>
          <p className="mt-3 leading-relaxed text-ink-soft">Você já preencheu seus dados. O case continua liberado.</p>
          <div className="mt-6">
            <LinkDoPdf>Baixar de novo</LinkDoPdf>
          </div>
          <button
            type="button"
            onClick={preencherDeNovo}
            className="mt-4 min-h-11 w-full text-sm text-ink-soft underline decoration-forest-900/30 underline-offset-4 transition-colors hover:text-forest-900 hover:decoration-forest-900"
          >
            Não é você? Preencher de novo
          </button>
        </div>
      )}
    </div>
  );
}

// ---------- os botões "Baixar o case completo" da página ----------

/**
 * Âncora de verdade (sem JS, o navegador pula para o formulário). Com JS: se o
 * formulário já está na tela (coluna fixa no computador), só foca o primeiro
 * campo e dá um pulso no cartão; senão rola até ele e foca quando parar.
 */
export function IrParaFormulario({
  children,
  className,
  rotulo,
}: {
  children: React.ReactNode;
  className: string;
  rotulo: string;
}) {
  function ir(e: React.MouseEvent<HTMLAnchorElement>) {
    const cartao = document.getElementById(ID_CARTAO);
    if (!cartao) return;
    e.preventDefault(); // o SmoothScrollProvider respeita e não rola de novo
    trackEvent("click_button", { button_label: rotulo });

    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alvo = cartao.querySelector<HTMLElement>('input:not([tabindex="-1"]), select, a[href], button');
    const focar = () => {
      alvo?.focus({ preventScroll: true });
      if (!semMovimento)
        cartao.animate(
          [
            { boxShadow: "0 0 0 0 rgba(198,62,29,0.5)" },
            { boxShadow: "0 0 0 16px rgba(198,62,29,0)" },
          ],
          { duration: 900, iterations: 2, easing: "cubic-bezier(0.25,1,0.5,1)" }
        );
    };

    const r = (alvo ?? cartao).getBoundingClientRect();
    if (r.top >= 80 && r.bottom <= window.innerHeight - 40) {
      focar();
      return;
    }

    cartao.scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "start" });
    if (semMovimento) {
      focar();
      return;
    }
    let feito = false;
    const fim = () => {
      if (feito) return;
      feito = true;
      window.removeEventListener("scrollend", fim);
      focar();
    };
    window.addEventListener("scrollend", fim, { once: true });
    window.setTimeout(fim, 1200); // navegador sem scrollend
  }

  return (
    <a href={`#${ID_CARTAO}`} onClick={ir} className={className}>
      {children}
    </a>
  );
}
