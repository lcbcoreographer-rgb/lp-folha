import type { Classificacao, LeadData } from "./leadTypes";

const SERVICO_PONTOS: Record<string, number> = {
  "Licenciamento Ambiental": 30,
  "PRAD (Plano de Recuperação de Áreas Degradadas)": 30,
  "Outorga de Uso da Água": 25,
  "Consultoria Ambiental": 20,
  "Plano de Gerenciamento de Resíduos (PGRS)": 20,
  "Cadastro Ambiental Rural (CAR)": 15,
};
const SERVICO_PONTOS_PADRAO = 10;

const FATURAMENTO_PONTOS: Record<string, number> = {
  "Até R$ 360 mil/ano (MEI)": 5,
  "R$ 360 mil a R$ 4,8 milhões/ano (Pequena empresa)": 10,
  "R$ 4,8 milhões a R$ 300 milhões/ano (Média empresa)": 15,
  "Acima de R$ 300 milhões/ano (Grande empresa)": 20,
};

const SEGMENTO_PONTOS: Record<string, number> = {
  "Postos de Combustíveis": 20,
  "Portuário": 20,
  "Transporte / Logística": 15,
  "Indústria": 15,
  "Agronegócio": 15,
};
const SEGMENTO_PONTOS_PADRAO = 10;

export function calculateScore(data: LeadData): {
  score: number;
  classificacao: Classificacao;
} {
  const pontosServico = data.servicos.reduce((max, servico) => {
    const pontos = SERVICO_PONTOS[servico] ?? SERVICO_PONTOS_PADRAO;
    return Math.max(max, pontos);
  }, 0);

  const pontosFaturamento = FATURAMENTO_PONTOS[data.faturamento] ?? 0;

  const pontosSegmento = data.segmento
    ? (SEGMENTO_PONTOS[data.segmento] ?? SEGMENTO_PONTOS_PADRAO)
    : 0;

  const score = pontosServico + pontosFaturamento + pontosSegmento;

  const classificacao: Classificacao =
    score >= 70 ? "quente" : score >= 40 ? "morno" : "frio";

  return { score, classificacao };
}
