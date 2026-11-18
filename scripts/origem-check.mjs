// Checagem da origem da visita (app/lib/origem.ts). Roda sem instalar nada:
//   node scripts/origem-check.mjs
// (Node 23.6+ lê o .ts direto; no Node 22 use --experimental-strip-types. O aviso
// MODULE_TYPELESS_PACKAGE_JSON é inofensivo: o site não declara "type" no package.json.)
import assert from "node:assert/strict";
import {
  classificarCanal as canal,
  codigoOrigem,
  escolherOrigem,
  lerGuardada,
  lerVisita,
  limparVisita,
  mensagemComCodigo,
} from "../app/lib/origem.ts";
import { buildWhatsAppUrl } from "../app/lib/whatsapp.ts";

const SITE = "folhasolucoesambientais.com";

// A: anúncio do Google
assert.equal(canal("?gclid=abc", "", SITE), "A");
assert.equal(canal("?gbraid=x", "https://www.google.com/", SITE), "A", "anúncio vence a busca");
assert.equal(canal("?wbraid=x", "", SITE), "A");
assert.equal(canal("?utm_source=google&utm_medium=cpc", "", SITE), "A");
assert.equal(canal("?utm_medium=PPC", "", SITE), "A", "cpc sem fonte conta como Google");
assert.equal(canal("?utm_source=googleads&utm_medium=paid", "", SITE), "A");
assert.equal(canal("?utm_source=bing&utm_medium=cpc", "", SITE), "O", "anúncio de outro lugar é outra campanha");
// M: Instagram/Facebook
assert.equal(canal("?utm_source=instagram&utm_medium=social", "", SITE), "M");
assert.equal(canal("?utm_source=ig", "", SITE), "M");
assert.equal(canal("?utm_source=facebook&utm_medium=cpc", "", SITE), "M", "anúncio da Meta não é Google Ads");
assert.equal(canal("?utm_medium=fb", "", SITE), "M");
assert.equal(canal("?fbclid=xyz", "", SITE), "M");
assert.equal(canal("?utm_source=meta&utm_medium=paid_social", "", SITE), "M", "fonte meta é Meta");
assert.equal(canal("?utm_source=Meta&utm_medium=cpc", "", SITE), "M");
assert.equal(canal("?utm_source=metacritic", "", SITE), "O", "só meta exato");
for (const ref of ["https://instagram.com/", "https://l.instagram.com/", "https://www.facebook.com/", "https://m.facebook.com/", "https://lm.facebook.com/l.php", "android-app://com.instagram.android/"]) {
  assert.equal(canal("", ref, SITE), "M", ref);
}
// E: e-mail
assert.equal(canal("?utm_medium=email&utm_source=newsletter", "", SITE), "E");
assert.equal(canal("?utm_medium=e-mail", "", SITE), "E");
// B: busca no Google
for (const ref of ["https://www.google.com/", "https://www.google.com.br/", "https://google.pt/", "android-app://com.google.android.googlequicksearchbox/"]) {
  assert.equal(canal("", ref, SITE), "B", ref);
}
assert.equal(canal("", "https://docs.google.com/", SITE), "O", "só a página de busca conta");
// O: outro site ou outra campanha
assert.equal(canal("", "https://www.bing.com/", SITE), "O");
assert.equal(canal("", "https://iat.pr.gov.br/licencas", SITE), "O");
assert.equal(canal("?utm_campaign=feira", "", SITE), "O");
assert.equal(canal("?utm_source=whatsapp", "", SITE), "O");
// S: direto, ou navegação dentro do próprio site
assert.equal(canal("", "", SITE), "S");
assert.equal(canal("?q=licenca", "", SITE), "S", "parâmetro que não é marcação não conta");
assert.equal(canal("", "https://www.folhasolucoesambientais.com/blog", SITE), "S");
assert.equal(canal("", "https://folhasolucoesambientais.com/", "www." + SITE), "S");
assert.equal(canal("", "lixo", SITE), "S");

// guardar: anúncio sempre vence; fora isso, a primeira origem fica por 90 dias
const agora = Date.parse("2026-09-24T12:00:00Z");
const dia = 24 * 60 * 60 * 1000;
const guardada = { canal: "B", em: agora - 10 * dia };
assert.deepEqual(escolherOrigem(null, "S", agora), { canal: "S", em: agora });
assert.deepEqual(escolherOrigem(guardada, "M", agora), guardada, "primeira origem fica");
assert.deepEqual(escolherOrigem(guardada, "S", agora), guardada);
assert.deepEqual(escolherOrigem(guardada, "A", agora), { canal: "A", em: agora }, "anúncio sobrescreve");
assert.deepEqual(escolherOrigem({ canal: "A", em: agora - dia }, "M", agora), { canal: "A", em: agora - dia });
assert.deepEqual(lerGuardada(JSON.stringify(guardada), agora), guardada);
assert.equal(lerGuardada(JSON.stringify({ canal: "B", em: agora - 91 * dia }), agora), null, "vence em 90 dias");
assert.equal(lerGuardada(JSON.stringify({ canal: "Z", em: agora }), agora), null);
assert.equal(lerGuardada("{quebrado", agora), null);
assert.equal(lerGuardada(null, agora), null);


// parâmetros da visita (UTM, cliques de anúncio, chegada, referência)
const LINK = "?utm_source=organico&utm_medium=linkedin&utm_campaign=post&utm_content=perfil-denise";
assert.deepEqual(lerVisita(LINK, "", SITE, "/cases/zona-de-raizes"), {
  source: "organico",
  medium: "linkedin",
  campaign: "post",
  content: "perfil-denise",
  chegada: "/cases/zona-de-raizes",
});
assert.deepEqual(
  lerVisita("?utm_term=licenca+ambiental&gclid=ABC&fbclid=XYZ&q=1", "https://l.instagram.com/x?y=1", SITE, "/"),
  { term: "licenca ambiental", gclid: "ABC", fbclid: "XYZ", chegada: "/", referencia: "l.instagram.com" },
  "só o domínio do referrer; query que não é marcação fica de fora"
);
assert.deepEqual(lerVisita("", "https://www.folhasolucoesambientais.com/blog", SITE, "/x"), { chegada: "/x" }, "referrer do próprio site não conta");
assert.deepEqual(lerVisita("", "https://www.bing.com/search?q=a", SITE, "/x"), { chegada: "/x", referencia: "bing.com" });
assert.deepEqual(lerVisita("?utm_source=%20%20", "", SITE, "/x?a=1#b"), { chegada: "/x" }, "vazio some; caminho sem query");
assert.equal(lerVisita("?utm_source=" + "a".repeat(300) + "&gclid=" + "g".repeat(150), "", SITE, "/").source.length, 100, "corta em 100");
assert.equal(lerVisita("?gclid=" + "g".repeat(150), "", SITE, "/").gclid.length, 100);
assert.equal(lerVisita("?utm_source=a%00b%0Ac%07d", "", SITE, "/").source, "abcd", "tira caracteres de controle");
assert.deepEqual(limparVisita({ source: 5, medium: "x", extra: "y", term: null }), { medium: "x" }, "só chaves conhecidas, só texto");
assert.deepEqual(limparVisita("lixo"), {});

// a visita acompanha o canal: anúncio sobrescreve; senão fica a primeira visita marcada
const li = lerVisita(LINK, "", SITE, "/cases/zona-de-raizes");
const g1 = { canal: "O", em: agora - dia, utm: li };
assert.deepEqual(escolherOrigem(null, "O", agora, li), { canal: "O", em: agora, utm: li });
assert.deepEqual(escolherOrigem(g1, "S", agora, { chegada: "/" }), g1, "visita sem nada não apaga uma marcada");
assert.deepEqual(escolherOrigem(g1, "M", agora, { source: "instagram" }), g1, "primeira marcada fica");
assert.deepEqual(
  escolherOrigem(g1, "A", agora, { gclid: "ABC", chegada: "/" }),
  { canal: "A", em: agora, utm: { gclid: "ABC", chegada: "/" } },
  "anúncio sobrescreve, com a UTM dele"
);
const direta = { canal: "S", em: agora - dia, utm: { chegada: "/" } };
assert.deepEqual(escolherOrigem(direta, "O", agora, li), { canal: "O", em: agora, utm: li }, "marcada toma o lugar de uma visita direta");
assert.deepEqual(escolherOrigem(direta, "S", agora, { chegada: "/blog" }), direta, "direta não troca direta");
assert.deepEqual(lerGuardada(JSON.stringify(g1), agora), g1, "volta do localStorage com a UTM");
assert.deepEqual(lerGuardada(JSON.stringify({ canal: "B", em: agora }), agora), { canal: "B", em: agora }, "guardada antiga, sem UTM, continua valendo");
assert.deepEqual(
  lerGuardada(JSON.stringify({ canal: "O", em: agora, utm: { source: "x".repeat(300), lixo: 1 } }), agora),
  { canal: "O", em: agora, utm: { source: "x".repeat(100) } },
  "UTM guardada é limpa de novo na leitura"
);
assert.equal(lerGuardada(JSON.stringify({ canal: "O", em: agora - 91 * dia, utm: li }), agora), null, "UTM vence junto, em 90 dias");

// anúncio da Meta também sobrescreve: canal M com fbclid, ou mídia paga com fonte da Meta
const visita = (search, ref = "") => escolherOrigem(guardada, canal(search, ref, SITE), agora, lerVisita(search, ref, SITE, "/"));
assert.equal(visita("?fbclid=XYZ").canal, "M", "fbclid sobrescreve");
assert.deepEqual(visita("?fbclid=XYZ"), { canal: "M", em: agora, utm: { fbclid: "XYZ", chegada: "/" } }, "leva a UTM do anúncio");
for (const meio of ["cpc", "ppc", "paid", "paid_social", "ads", "CPC", "Paid_Social"]) {
  for (const fonte of ["facebook", "instagram", "fb", "ig", "meta", "Facebook"]) {
    assert.equal(visita(`?utm_source=${fonte}&utm_medium=${meio}`).canal, "M", `${fonte}/${meio} sobrescreve`);
  }
}
assert.deepEqual(visita("?utm_source=instagram&utm_medium=social"), guardada, "post orgânico da Meta não sobrescreve");
assert.deepEqual(visita("?utm_source=ig"), guardada);
assert.deepEqual(visita("", "https://l.instagram.com/"), guardada, "só o referrer não sobrescreve");
assert.deepEqual(visita("?utm_source=bing&utm_medium=cpc"), guardada, "anúncio de outro lugar não sobrescreve");
assert.deepEqual(visita("?utm_source=newsletter&utm_medium=paid"), guardada, "pago sem fonte da Meta não sobrescreve");
assert.equal(escolherOrigem({ canal: "A", em: agora - dia }, "M", agora, { fbclid: "XYZ" }).canal, "A", "só fbclid (pode ser orgânico) não apaga Google Ads guardado");
assert.equal(escolherOrigem({ canal: "A", em: agora - dia }, "M", agora, { medium: "cpc", source: "facebook", fbclid: "XYZ" }).canal, "M", "anúncio pago da Meta sobrescreve Google Ads guardado");
assert.equal(escolherOrigem({ canal: "M", em: agora - dia, utm: { fbclid: "XYZ" } }, "A", agora, { gclid: "ABC" }).canal, "A", "e Google Ads sobrescreve Meta guardado");
assert.equal(escolherOrigem(guardada, "O", agora, { fbclid: "XYZ" }).canal, "B", "fbclid sem canal M não sobrescreve");

// código e mensagem (contrato com o CRM: /\(\s*c[oó]d\.?\s*([ABMEOS])-(\d{4})\s*\)/i)
const CONTRATO = /\(\s*c[oó]d\.?\s*([ABMEOS])-(\d{4})\s*\)/i;
assert.equal(codigoOrigem("A", 42), "(cód. A-0042)");
assert.equal(codigoOrigem("S", 9999.9), "(cód. S-9999)");
assert.equal(codigoOrigem("M", 10000), "(cód. M-0000)");
for (const c of ["A", "B", "M", "E", "O", "S"]) {
  const m = CONTRATO.exec(codigoOrigem(c, Math.random() * 10000));
  assert.ok(m && m[1] === c && m[2].length === 4, c);
}
assert.equal(
  mensagemComCodigo("Olá, vi o site da Folha. Minha operação: ", "(cód. A-0042)"),
  "Olá, vi o site da Folha. Minha operação:\n(cód. A-0042)",
  "código em linha própria no fim"
);
assert.equal(mensagemComCodigo("Olá", null), "Olá", "sem código (servidor, antes de montar) a mensagem fica igual");

// o link de cada canal, para conferir à mão
const PRONTA = "Olá, vi o site da Folha e preciso saber quais licenças o meu caso exige. Minha operação: ";
const exemplos = [
  ["anúncio (gclid)", "?gclid=abc", ""],
  ["busca no Google", "", "https://www.google.com.br/"],
  ["Instagram", "?utm_source=instagram", ""],
  ["e-mail", "?utm_medium=email", ""],
  ["outro site", "", "https://iat.pr.gov.br/"],
  ["direto", "", ""],
];
for (const [nome, search, ref] of exemplos) {
  const c = canal(search, ref, SITE);
  console.log(`${c} ${nome.padEnd(16)} ${buildWhatsAppUrl(mensagemComCodigo(PRONTA, codigoOrigem(c, 1234)))}`);
}
console.log("origem ok");
