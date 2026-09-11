import SectionHead from "./motion/SectionHead";
import ProcessLine from "./motion/ProcessLine";

const ETAPAS = [
  {
    titulo: "Diagnóstico técnico",
    descricao:
      "Levantamento completo da situação ambiental do empreendimento: o que está regular, o que precisa de atenção e qual o caminho mais rápido para a conformidade.",
  },
  {
    titulo: "Mediação com o órgão ambiental",
    descricao:
      "Atuação direta junto ao IAT e demais órgãos competentes, com relacionamento construído ao longo de anos de presença local — não um processo genérico à distância.",
  },
  {
    titulo: "Execução com responsabilidade técnica",
    descricao:
      "Cada projeto é assinado com ART, por profissionais habilitados, do licenciamento à recuperação de área degradada.",
  },
  {
    titulo: "Acompanhamento contínuo",
    descricao:
      "Prazos, condicionantes e renovações são monitorados proativamente — a regularização não termina na entrega do documento, ela é sustentada no tempo.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-paper py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              titulo="Como a Folha protege a continuidade da sua operação"
              centralizado={false}
            />
          </div>

          <ProcessLine etapas={ETAPAS} />
        </div>
      </div>
    </section>
  );
}
