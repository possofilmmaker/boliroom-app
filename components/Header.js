"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, MapPin, Beer, Sparkles, Zap } from "lucide-react";

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
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl melao-glass border border-white/10 rounded-[2.5rem] h-24 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-3xl">
      <div className="px-10 h-full flex items-center justify-between relative">
        {/* Decorative background pulse */}
        <div className="absolute top-[-50%] left-[-10%] w-64 h-64 bg-brand-coral/10 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-64 h-64 bg-brand-teal/10 blur-[80px] rounded-full"></div>

        {/* Logo — Melao Social Club */}
        <Link href="/" className="flex items-center gap-2 group relative z-10">
          <div className="flex flex-col items-center leading-none">
            {/* Wavy squiggle — elemento signature */}
            <svg width="50" height="10" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1 group-hover:scale-125 transition-transform duration-700">
              <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke="#E8543A" strokeWidth="4" strokeLinecap="round"/>
            </svg>
            <div className="flex items-end gap-0">
              <span className="text-2xl font-black tracking-tighter text-white leading-none italic">MELAO</span>
            </div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="h-[1px] w-3 bg-white"></div>
              <span className="text-[7px] font-black text-white tracking-[0.4em] leading-none uppercase">Social Club</span>
              <div className="h-[1px] w-3 bg-white"></div>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 relative z-10">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2.5 text-[11px] uppercase font-black tracking-[0.2em] transition-all duration-500 ${
                  isActive ? "text-brand-yellow" : "text-white/40 hover:text-white hover:scale-105"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 3 : 2} className={isActive ? "text-brand-coral" : ""} />
                {item.name}
              </Link>
            );
          })}
          <Link 
            href="/reserva"
            className="px-8 py-3.5 melao-button-primary rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Zap size={14} />
            Reservar
          </Link>
        </nav>

        {/* Mobile Reservation CTA */}
        <div className="md:hidden relative z-10">
          <Link 
            href="/reserva" 
            className="text-[10px] font-black px-6 py-3.5 bg-brand-coral text-white rounded-2xl uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(232,84,58,0.3)] active:scale-90 transition-all block"
          >
            BOOK NOW
          </Link>
        </div>
      </div>
    </header>
  );
}
