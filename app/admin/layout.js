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
      <div className="h-screen w-full flex items-center justify-center bg-brand-cream">
        <Loader2 className="animate-spin text-brand-coral" size={40} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-brand-cream text-brand-dark overflow-hidden font-sans">
      
      {/* Sidebar for Desktop Admin */}
      <aside className="w-72 bg-white border-r-2 border-brand-dark flex flex-col hidden md:flex">
        <div className="p-8 border-b-2 border-brand-dark">
          <div className="bg-brand-coral p-2 border-2 border-brand-dark shadow-[3px_3px_0px_#1a202c] mb-2 inline-block">
            <h2 className="text-xl font-black text-white tracking-tighter italic leading-none uppercase">
              MELAO
            </h2>
          </div>
          <p className="text-[10px] text-brand-dark/40 font-black tracking-[0.2em] uppercase">Social Club Admin</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
          {adminNav.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path}
                className={`flex items-center gap-4 px-5 py-4 border-2 transition-all group ${
                  isActive 
                    ? "bg-brand-teal text-white border-brand-dark shadow-[4px_4px_0px_#1a202c]" 
                    : "text-brand-dark/60 border-transparent hover:border-brand-dark hover:bg-brand-cream"
                }`}
              >
                <item.icon size={20} className={`${isActive ? "text-brand-yellow" : "text-brand-dark/30 group-hover:text-brand-teal"} transition-colors`} />
                <span className="font-bold text-sm uppercase tracking-wider">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t-2 border-brand-dark">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-5 py-4 border-2 border-transparent hover:border-brand-dark hover:bg-brand-coral/10 text-brand-dark/60 hover:text-brand-coral transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm uppercase tracking-wider">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b-2 border-brand-dark flex items-center justify-between px-10 z-10">
          <h1 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">
            {adminNav.find(n => n.path === pathname)?.name || "Panel de Control"}
          </h1>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-brand-dark/40 hover:text-brand-teal transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-coral border border-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l-2 border-brand-dark/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-brand-dark uppercase tracking-widest">Jonathan P.</p>
                <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-widest">Manager</p>
              </div>
              <div className="w-10 h-10 border-2 border-brand-dark shadow-[3px_3px_0px_#1a202c] overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jonathan" alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-10 scroll-smooth bg-brand-cream">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

