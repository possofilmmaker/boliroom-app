"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, MapPin, Beer } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // No mostrar en el panel de administración
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio", path: "/", icon: Home, isExternal: false },
    { name: "Reservar", path: "/reserva", icon: CalendarPlus, isExternal: false },
    { name: "Eventos", path: "/eventos", icon: Beer, isExternal: false },
    { name: "Menú", path: "/menu", icon: Beer, isExternal: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 h-16 md:h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-purple flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <span className="text-white font-black">B</span>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">BOLIROOM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-brand-cyan ${
                  isActive ? "text-brand-cyan" : "text-slate-400"
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
            className="px-5 py-2 rounded-full bg-slate-800 text-white text-sm font-medium border border-slate-700 hover:bg-slate-700 transition"
          >
            Cómo Llegar
          </a>
        </nav>

        {/* Mobile "CTA" or simple title */}
        <div className="md:hidden">
          <Link 
            href="/reserva" 
            className="text-xs font-bold px-4 py-2 rounded-full bg-brand-purple text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            RESERVAR
          </Link>
        </div>
      </div>
    </header>
  );
}
