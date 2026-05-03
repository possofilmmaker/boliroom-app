"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles, Target } from "lucide-react";

const Logo = () => (
  <div className="flex flex-col items-center leading-none">
    <svg width="50" height="10" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
      <path d="M0 8C6 8 10 3 16 3C22 3 26 13 32 13C38 13 42 3 48 3C54 3 58 13 64 13C70 13 74 8 80 8" stroke="#FF4D3D" strokeWidth="4" strokeLinecap="round"/>
    </svg>
    <span className="text-2xl font-black tracking-tighter text-melao-cream font-monument">MELAO</span>
    <div className="flex items-center gap-1.5 mt-0.5">
      <div className="h-px w-3 bg-melao-yellow" />
      <span className="text-[7px] font-black text-melao-cream/50 tracking-[0.35em] uppercase">Social Club</span>
      <div className="h-px w-3 bg-melao-yellow" />
    </div>
  </div>
);

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio",   path: "/",        icon: Home },
    { name: "Eventos",  path: "/eventos",  icon: Sparkles },
    { name: "Menú",     path: "/menu",     icon: Beer },
    { name: "Juegos",   path: "/juegos",   icon: Target },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-melao-bg/90 border-b border-white/5 h-20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Nav izquierda */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 2).map((item) => (
            <Link key={item.name} href={item.path}
              className={`text-[11px] uppercase font-black tracking-widest transition-colors ${
                pathname === item.path ? "text-melao-coral" : "text-melao-cream/40 hover:text-melao-cream"
              }`}>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logo */}
        <Link href="/" className="hover:scale-105 transition-transform duration-300">
          <Logo />
        </Link>

        {/* Nav derecha + botón */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(2).map((item) => (
              <Link key={item.name} href={item.path}
                className={`text-[11px] uppercase font-black tracking-widest transition-colors ${
                  pathname === item.path ? "text-melao-coral" : "text-melao-cream/40 hover:text-melao-cream"
                }`}>
                {item.name}
              </Link>
            ))}
          </nav>

          <Link href="/reserva" className="melao-button melao-button-primary py-3 px-6 text-[10px] hidden md:flex">
            RESERVAR
          </Link>
          <Link href="/reserva" className="melao-button melao-button-primary py-3 px-5 text-[10px] md:hidden">
            RESERVAR
          </Link>
        </div>
      </div>
    </header>
  );
}
