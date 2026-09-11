import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

const NAV_ITEMS = [
  { name: "Serviços", href: "/#servicos" },
  { name: "Como atuamos", href: "/#como-funciona" },
  { name: "Segmentos", href: "/#segmentos" },
  { name: "Legislação", href: "/#legislacao" },
  { name: "Blog", href: "/blog" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 border-t border-white/15 pt-12 text-left md:grid-cols-3">
          <div className="flex flex-col items-start">
            <Image
              src="/marca/horizontal-claro.svg"
              alt="Folha Soluções Ambientais"
              width={200}
              height={55}
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-xs text-white/60">
              Consultoria em licenciamento ambiental em Paranaguá. Atendemos portos, pátios de caminhões, armazenagem de fertilizantes, empreendimentos náuticos e indústrias em todo o Paraná.</p>
          </div>

          <div>
            <p className="text-lg font-normal text-white">Contato</p>
            <ul className="mt-4 space-y-3 text-white/70">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-forest-600 flex-shrink-0" />
                <a href="tel:+554134231690" className="hover:text-amber-400 transition-colors">
                  (41) 3423-1690
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-forest-600 flex-shrink-0" />
                <span>R. Nestor Víctor, 657 - Paranaguá - PR</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-lg font-normal text-white">Navegação</p>
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
