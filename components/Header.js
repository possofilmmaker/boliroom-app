"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles, Target } from "lucide-react";

const Logo = () => (
  <div className="flex flex-col items-center">
    {/* La Onda */}
    <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
      <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke="#FF5A4F" strokeWidth="4" strokeLinecap="round"/>
    </svg>
    <span className="text-3xl font-black tracking-tighter text-melao-green leading-none font-monument">MELAO</span>
    <div className="flex items-center gap-2 mt-1">
      <div className="h-[1px] w-4 bg-melao-yellow"></div>
      <span className="text-[8px] font-black text-melao-green tracking-[0.3em] uppercase">Social Club</span>
      <div className="h-[1px] w-4 bg-melao-yellow"></div>
    </div>
  </div>
);

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Eventos", path: "/eventos", icon: Sparkles },
    { name: "Menú", path: "/menu", icon: Beer },
    { name: "Juegos", path: "/juegos", icon: Target },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel h-24">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Navigation - Left (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${
                pathname === item.path ? "text-melao-coral" : "text-melao-green hover:text-melao-coral"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logo Central */}
        <Link href="/" className="hover:scale-105 transition-transform duration-300">
          <Logo />
        </Link>

        {/* Navigation - Right (Desktop) */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(2).map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-[11px] uppercase font-bold tracking-widest transition-colors ${
                  pathname === item.path ? "text-melao-coral" : "text-melao-green hover:text-melao-coral"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Link 
            href="/reserva"
            className="melao-button melao-button-primary py-3 px-6 text-[10px] hidden md:flex"
          >
            RESERVA TU MESA
          </Link>

          {/* Mobile CTA */}
          <Link 
            href="/reserva"
            className="melao-button melao-button-primary py-3 px-6 text-[10px] md:hidden"
          >
            RESERVAR
          </Link>
        </div>
      </div>
    </header>
  );
}
