import SectionHead from "./motion/SectionHead";
import ProcessLine from "./motion/ProcessLine";

const ETAPAS = [
  {
    titulo: "Diagnóstico do empreendimento",
    descricao:
      "Levantamos a atividade, o porte e a localização para saber exatamente quais licenças o seu caso exige — e quais não exige.",
  },
  {
    titulo: "Documentação e estudos",
    descricao:
      "Reunimos plantas, memoriais e estudos ambientais. É aqui que a maioria dos processos trava, e é aqui que a nossa equipe assume.",
  },
  {
    titulo: "Protocolo no órgão ambiental",
    descricao:
      "Entrada no IAT, prefeitura ou órgão competente, com acompanhamento de cada exigência e prazo.",
  },
  {
    titulo: "Licença emitida",
    descricao:
      "Você recebe a licença e o calendário de renovação. Avisamos antes de vencer, para a regularidade não depender de memória.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-paper py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHead
              rotulo="Como funciona"
              titulo="Do papel parado à licença na mão."
              descricao="Licenciamento não é um formulário: é uma sequência de exigências que precisa ser cumprida na ordem certa. Nós percorremos essa sequência por você."
              centralizado={false}
            />
            {/* Aqui havia "12+ anos de atuação" e "4 etapas". O primeiro numero
                nao tinha fonte — foi inventado; o segundo so contava os bullets
                da coluna ao lado. Numero fabricado em site comercial e passivo.
                O espaco fica reservado para dado real: quantidade de licencas
                emitidas, ano de fundacao, numero de municipios atendidos. */}
          </div>

          <ProcessLine etapas={ETAPAS} />
        </div>
      </div>
    </section>
  );
}
