"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", path: "/", icon: Home, isExternal: false },
    { name: "Reservar", path: "/reserva?step=1", icon: CalendarPlus, isExternal: false },
    { name: "Eventos", path: "/eventos", icon: Sparkles, isExternal: false },
    { name: "Menú", path: "/menu", icon: Beer, isExternal: false },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/5 z-50">
      <div className="flex justify-around items-center p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-brand-cyan scale-110" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <item.icon size={22} className={isActive ? "neon-text-cyan" : ""} />
              <span className={`text-[10px] uppercase font-bold tracking-tighter ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
