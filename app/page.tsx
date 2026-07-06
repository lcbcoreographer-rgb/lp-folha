import Header from "./components/Header";
import Hero from "./components/Hero";
import Diferenciais from "./components/Diferenciais";
import Segmentos from "./components/Segmentos";
import Legislacao from "./components/Legislacao";
import Depoimentos from "./components/Depoimentos";
import CTAFinal from "./components/CTAFinal";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Diferenciais />
        <Segmentos />
        <Legislacao />
        <Depoimentos />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
