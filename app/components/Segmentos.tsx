import { Truck, Warehouse, Sailboat, Ship, Factory } from "lucide-react";
import ParallaxImage from "./ParallaxImage";
import ScrollReveal from "./ScrollReveal";

const SEGMENTS = [
  { icon: Truck, name: "Pátio de Caminhões" },
  { icon: Warehouse, name: "Armazenagem de Fertilizantes" },
  { icon: Sailboat, name: "Empreendimentos Náuticos" },
  { icon: Ship, name: "Portos" },
  { icon: Factory, name: "Indústrias Diversas" },
];

export default function Segmentos() {
  return (
    <section id="segmentos" className="relative">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
        alt="Porto com contêineres e guindastes"
        strength={70}
        className="py-24 md:py-28"
      >
        <div className="absolute inset-0 bg-forest-950/85" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
              Onde atuamos
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
              Segmentos Atendidos
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Temos a solução ideal para a regularização ambiental do seu negócio.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {SEGMENTS.map((seg, i) => (
              <ScrollReveal key={seg.name} direction="scale" delay={i * 90}>
                <div className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-amber-400/40 hover:-translate-y-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                    <seg.icon size={26} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{seg.name}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxImage>
    </section>
  );
}
