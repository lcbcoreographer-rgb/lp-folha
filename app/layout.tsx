import type { Metadata } from "next";
import { Merriweather, Archivo } from "next/font/google";
import Script from "next/script";
import { GTAG_ID } from "./lib/gtag";
import "./globals.css";

/**
 * Duas famílias, não três.
 *
 * Fraunces saiu: os eixos SOFT/WONK são justamente o que faz uma página parecer
 * gerada — é a display da moda, aparece em todo site de IA. Merriweather foi
 * desenhada para texto em tela, tem altura de x alta e nenhum modismo; lê como
 * instituição que existe há vinte anos, que é o que a Folha precisa parecer.
 *
 * Archivo cobre corpo, rótulos e os números de lei — o mono decorativo foi
 * embora junto com a terceira família.
 */
const merriweather = Merriweather({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Folha Soluções Ambientais | Licenciamento Ambiental no Paraná",
  description:
    "Licenciamento ambiental completo para diferentes segmentos no Paraná. Equipe técnica com ART, conformidade legal e agilidade para o seu negócio prosperar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${merriweather.variable} ${archivo.variable}`}>
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
