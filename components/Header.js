"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, MapPin, Beer, Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // No mostrar en el panel de administración
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Reservar", path: "/reserva", icon: CalendarPlus },
    { name: "Eventos", path: "/eventos", icon: Sparkles },
    { name: "Menú", path: "/menu", icon: Beer },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-cream border-b-4 border-brand-dark h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo — Melao Social Club */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex flex-col items-center leading-none">
            {/* Wavy squiggle — elemento signature */}
            <svg width="48" height="10" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-0.5 group-hover:scale-110 transition-transform">
              <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke="#085C5C" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
            <div className="flex items-end gap-0">
              <span className="text-2xl font-black tracking-tighter text-brand-dark leading-none">MELAO</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-[1.5px] w-3 bg-brand-dark"></div>
              <span className="text-[8px] font-black text-brand-dark tracking-[0.25em] leading-none">SOCIAL CLUB</span>
              <div className="h-[1.5px] w-3 bg-brand-dark"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`text-xs uppercase font-black tracking-widest transition-colors ${
                  isActive ? "text-brand-coral" : "text-brand-dark/60 hover:text-brand-coral"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <a 
            href="https://maps.google.com/?q=Carrera+15+%23+67+-+27+Bogota"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-brand-yellow border-2 border-brand-dark text-brand-dark text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_#1C1C1C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1C1C1C] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            Ubicación
          </a>
        </nav>

        {/* Mobile Reservation CTA */}
        <div className="md:hidden">
          <Link 
            href="/reserva" 
            className="text-[10px] font-black px-5 py-2 bg-brand-coral text-white border-2 border-brand-dark uppercase tracking-widest shadow-[4px_4px_0px_#1a202c]"
          >
            RESERVAR
          </Link>
        </div>
      </div>
    </header>
  );
}

