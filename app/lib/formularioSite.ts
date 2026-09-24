/**
 * Formulários do site que caem no CRM (contrato 4 da v4).
 *
 * Quem envia é o NAVEGADOR, direto para a rota pública do CRM, que libera o
 * CORS só para o domínio do site. Aqui fica só lógica pura: máscara, validação
 * e o corpo do envio. A tela mora em cases/zona-de-raizes/FormularioEstudo.tsx.
 */

// `||` e não `??`: variável de build vazia no EasyPanel viraria URL relativa.
export const CRM_URL = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.folhasolucoesambientais.com";
export const ROTA_FORMULARIOS = `${CRM_URL}/api/publico/formularios`;

export type Canal = "A" | "B" | "M" | "E" | "O" | "S";

/**
 * Canal da visita (letra do contrato 1). Por enquanto não sabe: o CRM grava
 * "Site" quando vem vazio.
 */
export function canalDaVisita(): Canal | undefined {
  // ligado na integração com a origem das visitas
  return undefined;
}

export const CARGOS = ["Sócio(a)", "Diretor(a)", "Gerente", "Coordenador(a)", "Analista", "Outro"];

export const SEGMENTOS = [
  "Agronegócio",
  "Operação Portuária",
  "Transporte e Logística",
  "Imobiliário",
  "Indústria e Comércio",
  "Postos de Combustível",
  "Marina e Náutico",
];

export type Campos = {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  segmento: string;
};

export const CAMPOS_VAZIOS: Campos = { nome: "", email: "", telefone: "", cargo: "", segmento: "" };

function digitos(valor: string) {
  let d = valor.replace(/\D/g, "");
  // colaram com o +55 na frente
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}

/** (41) 99999-9999 para celular, (41) 3423-1690 para fixo. */
export function mascaraTelefone(valor: string) {
  const d = digitos(valor);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Mensagem de erro por campo, em português simples. Campo válido não aparece. */
export function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const erros: Partial<Record<keyof Campos, string>> = {};
  const nome = c.nome.trim();
  if (!nome) erros.nome = "Escreva seu nome completo.";
  else if (!/\S+\s+\S+/.test(nome)) erros.nome = "Escreva nome e sobrenome.";

  const email = c.email.trim();
  if (!email) erros.email = "Escreva seu e-mail.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) erros.email = "Confira o e-mail, parece faltar alguma parte.";

  const d = digitos(c.telefone);
  if (!d) erros.telefone = "Escreva um telefone ou WhatsApp com DDD.";
  else if (d.length < 10 || d[0] === "0" || (d.length === 11 && d[2] !== "9"))
    erros.telefone = "Confira o número com DDD, como (41) 99999-9999.";

  if (!c.cargo) erros.cargo = "Escolha o seu cargo.";
  if (!c.segmento) erros.segmento = "Escolha o segmento da sua empresa.";
  return erros;
}

export function corpoDoEnvio(
  c: Campos,
  extra: { formulario: string; formularioNome: string; pagina: string; iniciadoEm: number; site: string }
) {
  return {
    formulario: extra.formulario,
    formulario_nome: extra.formularioNome,
    nome: c.nome.trim().replace(/\s+/g, " "),
    email: c.email.trim(),
    telefone: c.telefone,
    cargo: c.cargo,
    segmento: c.segmento,
    aceite: true,
    canal: canalDaVisita(), // undefined some do JSON
    pagina: extra.pagina,
    iniciado_em: extra.iniciadoEm,
    site: extra.site,
  };
}
