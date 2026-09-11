import Header from "../components/Header";
import Hero from "../components/Hero";
import Autoridade from "../components/Autoridade";
import Posicionamento from "../components/Posicionamento";
import Servicos from "../components/Servicos";
import ComoFunciona from "../components/ComoFunciona";
import Segmentos from "../components/Segmentos";
import ProvaSocial from "../components/ProvaSocial";
import Legislacao from "../components/Legislacao";
import Depoimentos from "../components/Depoimentos";
import CTAFinal from "../components/CTAFinal";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Autoridade />
        <Posicionamento />
        <Servicos />
        <ComoFunciona />
        <Segmentos />
        <ProvaSocial />
        <Legislacao />
        <Depoimentos />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
