import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

const NAV_ITEMS = [
  { name: "Diferenciais", href: "#diferenciais" },
  { name: "Segmentos", href: "#segmentos" },
  { name: "Legislação", href: "#legislacao" },
  { name: "Depoimentos", href: "#depoimentos" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5">
              <span className="relative h-11 w-11 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Folha Soluções Ambientais"
                  fill
                  sizes="44px"
                  className="object-contain"
                  unoptimized
                />
              </span>
              <span className="font-heading font-bold text-lg">Folha</span>
            </div>
            <p className="mt-4 max-w-xs text-white/60">
              Soluções inteligentes em licenciamento ambiental para um futuro
              sustentável.
            </p>
          </div>

          <div>
            <p className="font-semibold text-white text-lg">Contato</p>
            <ul className="mt-4 space-y-3 text-white/70">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone size={18} className="text-forest-600 flex-shrink-0" />
                <a href="tel:+554134231690" className="hover:text-amber-400 transition-colors">
                  (41) 3423-1690
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-forest-600 flex-shrink-0" />
                <span>R. Nestor Víctor, 657 - Paranaguá - PR</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white text-lg">Navegação</p>
            <ul className="mt-4 space-y-2 text-white/70">
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-white/40 text-sm">
          <p>© {year} Folha Soluções Ambientais. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
