import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { FormModalProvider } from "./components/FormModalContext";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <ScrollProgressBar />
          <FormModalProvider>{children}</FormModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
