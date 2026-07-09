import "server-only";
import type { LeadData } from "./leadTypes";
import type { Classificacao } from "./leadTypes";

function buildMessage(data: LeadData, score: number, classificacao: Classificacao) {
  const emoji = classificacao === "quente" ? "🔥" : classificacao === "morno" ? "🟡" : "⚪";
  const linhas = [
    `${emoji} Novo lead — Folha Soluções Ambientais`,
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `Telefone: ${data.telefone}`,
    `E-mail: ${data.email}`,
    data.segmento ? `Segmento: ${data.segmento}` : null,
    data.servicos.length ? `Serviço(s): ${data.servicos.join(", ")}` : null,
    data.urgencia ? `Urgência: ${data.urgencia}` : null,
    `Score: ${score} (${classificacao})`,
  ].filter(Boolean);
  return linhas.join("\n");
}

export async function notifyNewLead(
  data: LeadData,
  score: number,
  classificacao: Classificacao
) {
  const baseUrl = process.env.UAZAPI_BASE_URL;
  const token = process.env.UAZAPI_TOKEN;
  const phones = process.env.UAZAPI_ADMIN_PHONE;

  if (!baseUrl || !token || !phones) {
    throw new Error(
      "UazAPI não configurada: defina UAZAPI_BASE_URL, UAZAPI_TOKEN e UAZAPI_ADMIN_PHONE."
    );
  }

  const text = buildMessage(data, score, classificacao);
  const numbers = phones.split(",").map((p) => p.trim()).filter(Boolean);

  await Promise.all(
    numbers.map(async (number) => {
      const response = await fetch(`${baseUrl}/send/text`, {
        method: "POST",
        headers: {
          Token: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number, text, token }),
      });
      if (!response.ok) {
        throw new Error(
          `UazAPI respondeu ${response.status} ao notificar ${number}`
        );
      }
    })
  );
}
