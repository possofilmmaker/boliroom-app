"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Por ahora usamos una validación simple local para agilizar. 
    // En producción Jonathan puede cambiar estos valores en el código o .env
    if (username === "admin_boli" && password === "Boliroom2026!") {
      localStorage.setItem("boli_admin_session", "active_" + Date.now());
      router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-darker px-6 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]">
      <div className="w-full max-w-md animate-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-purple rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <Lock className="text-white" size={30} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tighter">ACCESO ADMIN</h1>
          <p className="text-slate-400 text-sm mt-2">Boliroom - Gestión de Reservas</p>
        </div>

        <form onSubmit={handleLogin} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Usuario</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-4 pl-12 pr-12 text-white focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition"
                placeholder="••••••••"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full neon-button py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Entrar al Panel
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </button>
        </form>
        
        <p className="text-center mt-8 text-slate-600 text-[10px] uppercase tracking-widest">
          Sistema de Seguridad Boliroom v2.0
        </p>
      </div>
    </div>
  );
}
