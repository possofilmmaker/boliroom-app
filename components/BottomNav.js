"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Reservar", path: "/reserva?step=1", icon: CalendarPlus },
    { name: "Eventos", path: "/eventos", icon: Sparkles },
    { name: "Menú", path: "/menu", icon: Beer },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-cream border-t-4 border-brand-dark z-50">
      <div className="flex justify-around items-center p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? "text-brand-coral scale-110" : "text-brand-dark/50 hover:text-brand-dark"
              }`}
            >
              <item.icon size={24} strokeWidth={isActive ? 3 : 2} />
              <span className={`text-[10px] uppercase font-black tracking-widest ${isActive ? "opacity-100" : "opacity-60"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

