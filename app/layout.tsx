import type { Metadata } from "next";
import { Fraunces, Archivo, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { GTAG_ID } from "./lib/gtag";
import "./globals.css";

/**
 * Fraunces tem eixos ópticos e um "wonk" que dá personalidade ao display sem
 * cair no serif institucional sem graça. Archivo é grotesca de engenharia —
 * combina com laudo técnico. Plex Mono carrega os rótulos e números: é o que
 * transforma a página em dossiê em vez de mais uma landing verde.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  // fonte variável: os eixos só existem sem weight fixo
  axes: ["SOFT", "WONK", "opsz"],
});

const archivo = Archivo({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
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
    <html lang="pt-BR" className={`${fraunces.variable} ${archivo.variable} ${plexMono.variable}`}>
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
