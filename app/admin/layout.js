"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Grid, Settings, Bell, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Evitar loop en la página de login
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    const session = localStorage.getItem("boli_admin_session");
    if (!session) {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("boli_admin_session");
    router.push("/admin/login");
  };

  const adminNav = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Reservas", path: "/admin/reservas", icon: Users },
    { name: "Plano de Mesas", path: "/admin/mesas", icon: Grid },
    { name: "Configuración", path: "/admin/config", icon: Settings },
  ];

  if (pathname === "/admin/login") return <>{children}</>;
  
  if (!isAuthorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-brand-darker">
        <Loader2 className="animate-spin text-brand-purple" size={40} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-brand-darker text-slate-50 overflow-hidden">
      
      {/* Sidebar for Desktop Admin */}
      <aside className="w-64 glass-panel border-r border-slate-800 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold neon-text-purple tracking-tighter">
            BOLIROOM
          </h2>
          <span className="text-xs text-slate-400 font-mono">ADMIN PANEL</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${
                  isActive 
                    ? "bg-brand-purple/20 text-brand-purple shadow-inner" 
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <item.icon size={20} className={`${isActive ? "text-brand-purple" : "text-slate-500 group-hover:text-brand-cyan"} transition-colors`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Admin Header */}
        <header className="h-16 glass-panel border-b border-slate-800 flex items-center justify-between px-6 z-10">
          <h1 className="text-xl font-semibold">
            {adminNav.find(n => n.path === pathname)?.name || "Panel de Control"}
          </h1>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-purple rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-brand-cyan overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan" alt="Admin" className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium hidden sm:block">Jonathan P.</span>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(209,37,244,0.05),rgba(255,255,255,0))]">
          {children}
        </div>
      </main>
    </div>
  );
}
