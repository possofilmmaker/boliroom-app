"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles, Target } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // No mostrar en el panel de administración
  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Juegos", path: "/juegos", icon: Target },
    { name: "Reservar", path: "/reserva", icon: CalendarPlus },
    { name: "Eventos", path: "/eventos", icon: Sparkles },
    { name: "Menú", path: "/menu", icon: Beer },
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-white/90 border border-melao-green/5 rounded-full z-50 shadow-2xl backdrop-blur-xl overflow-hidden">
      <div className="flex justify-around items-center p-4 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative group ${
                isActive ? "text-melao-coral" : "text-melao-green/40 hover:text-melao-green"
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? "bg-melao-coral/10" : ""}`}>
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
              </div>
              <span className={`text-[8px] uppercase font-black tracking-[0.2em] ${isActive ? "opacity-100" : "opacity-0"}`}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-melao-coral rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
