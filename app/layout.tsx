import type { Metadata } from "next";
import { Jost, Fira_Sans } from "next/font/google";
import Script from "next/script";
import { GTAG_ID } from "./lib/gtag";
import "./globals.css";

/**
 * Tipografia derivada da identidade de setembro/2026.
 *
 * O logotipo e Nexa Light — geometrica, peso 300, com "a" de andar unico. Nexa
 * e comercial (Fontfabric) e nao pode ser servida na web sem licenca, entao o
 * display usa Jost, que e a geometrica livre mais proxima: mesma raiz Futura,
 * mesmo "a" de andar unico, e tem os pesos leves que a marca pede.
 *
 * Fira Sans nao e substituicao: ela ESTA no kit da marca (aparece nos SVGs, na
 * frase de impacto). Fica com o texto corrido, onde a humanista le melhor que a
 * geometrica em paragrafo longo.
 *
 * O serif Merriweather saiu — nao tinha relacao nenhuma com a marca nova.
 */
const jost = Jost({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const firaSans = Fira_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  // sem isso og:image relativo vira localhost no build — a prévia do link no WhatsApp sai sem foto
  metadataBase: new URL("https://folhasolucoesambientais.com"),
  title: "Folha Soluções Ambientais | Licenciamento Ambiental no Paraná",
  description:
    "Licenciamento ambiental no Paraná para indústria, agronegócio, portos e pátios de caminhões: LP, LO, renovação e outorga. Equipe com ART, protocolo no IAT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${jost.variable} ${firaSans.variable}`}>
      <body className="antialiased">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
