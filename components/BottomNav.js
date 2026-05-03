"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // No mostrar en el panel de administración
  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Reservar", path: "/reserva", icon: CalendarPlus },
    { name: "Eventos", path: "/eventos", icon: Sparkles },
    { name: "Menú", path: "/menu", icon: Beer },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] melao-glass border border-white/10 rounded-[2.5rem] z-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden">
      <div className="flex justify-around items-center p-6 relative">
        {/* Active background indicator light */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/5 to-transparent pointer-events-none"></div>
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center gap-2 transition-all duration-500 relative group ${
                isActive ? "text-brand-yellow scale-110" : "text-white/40 hover:text-white"
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? "bg-brand-coral/10" : ""}`}>
                <item.icon size={22} strokeWidth={isActive ? 3 : 2} className={isActive ? "animate-pulse" : ""} />
              </div>
              <span className={`text-[8px] uppercase font-black tracking-[0.2em] ${isActive ? "opacity-100" : "opacity-40"}`}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -bottom-2 w-1 h-1 bg-brand-yellow rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
