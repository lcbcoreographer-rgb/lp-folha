import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade | Folha Soluções Ambientais",
  description: "Como a Folha Soluções Ambientais coleta, usa e protege os seus dados pessoais, conforme a LGPD.",
};

const CONTATO = "comercial@folhasolucoesambientais.com.br";
const ATUALIZADA = "24 de setembro de 2026";

const SECOES: { titulo: string; paragrafos: React.ReactNode[] }[] = [
  {
    titulo: "Quem somos",
    paragrafos: [
      "A Folha Soluções Ambientais é uma consultoria em licenciamento ambiental com sede na R. Nestor Víctor, 657, Paranaguá, PR. Somos a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018, LGPD).",
    ],
  },
  {
    titulo: "Quais dados coletamos",
    paragrafos: [
      "Dados que você nos informa: nome, e-mail, telefone ou WhatsApp, empresa, cargo e segmento de atuação, quando preenche um formulário (por exemplo, para baixar um estudo de caso), e o conteúdo das mensagens que você nos envia pelo WhatsApp.",
      "Dados coletados automaticamente: páginas visitadas, tipo de dispositivo e navegador, e de onde veio a sua visita (por exemplo, um anúncio, uma busca no Google ou uma rede social). Para saber de onde veio a visita, o site guarda no seu navegador uma marcação simples por até 90 dias e acrescenta um código curto à mensagem pronta do WhatsApp.",
    ],
  },
  {
    titulo: "Para que usamos",
    paragrafos: [
      "Para responder o seu contato e enviar o material que você pediu; para entender a sua necessidade e preparar uma proposta; para enviar comunicações sobre licenciamento ambiental que possam interessar à sua empresa; e para medir quais canais trazem visitas e contatos, melhorando o site e os anúncios.",
      "As bases legais são o seu consentimento, as providências preliminares a um contrato que você solicitou e o nosso legítimo interesse em atender e comunicar com quem nos procurou.",
    ],
  },
  {
    titulo: "Atendimento pelo WhatsApp",
    paragrafos: [
      "O primeiro atendimento pelo WhatsApp pode ser feito por um assistente automatizado, que registra as informações da conversa no nosso sistema de atendimento para que a equipe continue de onde parou. Você pode pedir para falar com uma pessoa a qualquer momento.",
    ],
  },
  {
    titulo: "Com quem compartilhamos",
    paragrafos: [
      "Não vendemos os seus dados. Eles ficam em fornecedores que nos ajudam a operar: hospedagem e banco de dados, o serviço de WhatsApp, o envio de e-mails e ferramentas de medição de visitas e anúncios (como o Google Analytics e o Google Ads). Alguns desses fornecedores podem armazenar dados fora do Brasil, com as garantias previstas na LGPD. Também podemos compartilhar dados quando a lei ou uma autoridade exigir.",
    ],
  },
  {
    titulo: "Cookies e medição",
    paragrafos: [
      "Usamos cookies e tecnologias parecidas do Google para medir visitas e resultados de anúncios. Você pode bloquear ou apagar cookies nas configurações do seu navegador; o site continua funcionando.",
    ],
  },
  {
    titulo: "Por quanto tempo guardamos",
    paragrafos: [
      "Guardamos os dados enquanto houver relação comercial ou interesse no atendimento e pelo prazo necessário para cumprir obrigações legais. Depois disso, eles são apagados ou tornados anônimos.",
    ],
  },
  {
    titulo: "Seus direitos",
    paragrafos: [
      <>
        Você pode, a qualquer momento, pedir confirmação de que tratamos seus dados, acesso, correção, anonimização, portabilidade ou
        exclusão, informação sobre com quem compartilhamos, e revogar o consentimento, inclusive para parar de receber e-mails (todo
        e-mail nosso tem o link para descadastrar). Basta escrever para{" "}
        <a href={`mailto:${CONTATO}`} className="text-forest-800 underline underline-offset-4 hover:text-amber-600">
          {CONTATO}
        </a>
        . Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
      </>,
    ],
  },
  {
    titulo: "Segurança",
    paragrafos: [
      "Adotamos medidas técnicas e administrativas para proteger os dados, como acesso restrito à equipe, conexões criptografadas e sistemas com login individual.",
    ],
  },
  {
    titulo: "Mudanças nesta política",
    paragrafos: [
      "Podemos atualizar esta política. A versão válida é sempre a publicada nesta página, com a data da última atualização.",
    ],
  },
];

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />
      <main className="bg-paper pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <article className="max-w-3xl">
            <div className="fio" />
            <p className="rotulo mt-4 text-amber-600">Documento</p>
            <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] text-forest-950">
              Política de Privacidade
            </h1>
            <p className="mt-4 text-ink-soft">Última atualização: {ATUALIZADA}</p>

            <div className="mt-12 space-y-10">
              {SECOES.map((s) => (
                <section key={s.titulo}>
                  <h2 className="text-2xl font-normal text-forest-950">{s.titulo}</h2>
                  {s.paragrafos.map((p, i) => (
                    <p key={i} className="mt-3 text-lg leading-relaxed text-ink-soft">
                      {p}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
