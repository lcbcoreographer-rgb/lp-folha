"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import FormTriggerButton from "./FormTriggerButton";

const NAV_ITEMS = [
  { name: "Diferenciais", href: "#diferenciais" },
  { name: "Segmentos", href: "#segmentos" },
  { name: "Legislação", href: "#legislacao" },
  { name: "Depoimentos", href: "#depoimentos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(11,61,46,0.08)]"
          : "bg-paper/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="relative h-11 w-11 flex-shrink-0 transition-transform duration-300 group-hover:rotate-6">
              <Image
                src="/logo.png"
                alt="Folha Soluções Ambientais"
                fill
                sizes="44px"
                className="object-contain"
                priority
                unoptimized
              />
            </span>
            <span className="leading-tight">
              <span className="block font-heading font-bold text-lg text-forest-900">
                Folha
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-soft">
                Soluções Ambientais
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="underline-swipe text-sm font-medium text-ink-soft hover:text-forest-800 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <FormTriggerButton
              eventLabel="header_orcamento"
              className="inline-flex items-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5"
            >
              Solicitar Orçamento
            </FormTriggerButton>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-forest-900"
            aria-label="Abrir menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 bg-paper pb-6 pt-2">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-ink-soft font-medium hover:text-forest-800"
            >
              {item.name}
            </a>
          ))}
          <FormTriggerButton
            eventLabel="header_mobile_orcamento"
            className="mt-2 inline-flex items-center rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white"
          >
            Solicitar Orçamento
          </FormTriggerButton>
        </nav>
      </div>
    </header>
  );
}
