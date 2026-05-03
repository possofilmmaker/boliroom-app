"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarPlus, Beer, Sparkles, Target } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const navItems = [
    { name: "Inicio",   path: "/",        icon: Home },
    { name: "Juegos",   path: "/juegos",   icon: Target },
    { name: "Reservar", path: "/reserva",  icon: CalendarPlus },
    { name: "Eventos",  path: "/eventos",  icon: Sparkles },
    { name: "Menú",     path: "/menu",     icon: Beer },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] bg-melao-card border border-white/10 rounded-full z-50 shadow-2xl overflow-hidden">
      <div className="flex justify-around items-center px-2 py-3 relative">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex flex-col items-center gap-1 transition-all duration-300 px-2 ${
                isActive ? "text-melao-coral" : "text-melao-cream/30 hover:text-melao-cream/70"
              }`}
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? "bg-melao-coral/15" : ""}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              </div>
              <span className={`text-[7px] uppercase font-black tracking-[0.2em] transition-all ${isActive ? "opacity-100" : "opacity-0 h-0"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
