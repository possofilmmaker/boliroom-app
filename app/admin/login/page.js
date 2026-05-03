"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

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

    // Mantener la lógica existente de Jonathan
    if ((username === "admin_boli" && password === "Boliroom2026!") || (username === "admin_melao" && password === "Melao2026!")) {
      localStorage.setItem("boli_admin_session", "active_" + Date.now());
      router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-brand-coral p-3 border-2 border-brand-dark shadow-[4px_4px_0px_#1a202c] mb-6">
            <span className="text-white font-black text-2xl tracking-tighter uppercase italic">MELAO</span>
          </div>
          <h1 className="text-4xl font-black text-brand-dark tracking-tighter uppercase leading-none">
            ADMIN <span className="text-brand-coral">PORTAL</span>
          </h1>
          <p className="text-brand-teal font-black uppercase tracking-[0.2em] text-[10px] mt-4">Acceso exclusivo de administración</p>
        </div>

        {/* Login Form */}
        <div className="melao-card p-10 bg-white">
          <form onSubmit={handleLogin} className="space-y-8">
            {error && (
              <div className="bg-brand-coral/10 border-2 border-brand-coral p-4 text-brand-coral text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Usuario</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-brand-cream border-2 border-brand-dark py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-coral/20 transition-all placeholder:text-brand-dark/20"
                  placeholder="admin_melao"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/30" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-cream border-2 border-brand-dark py-4 pl-12 pr-12 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-coral/20 transition-all placeholder:text-brand-dark/20"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark/30 hover:text-brand-dark transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full melao-button-primary py-5 flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>ENTRAR AL PANEL</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center opacity-30">
          <p className="text-[10px] text-brand-dark font-black uppercase tracking-widest">
            Melao Social Club • Security System • v2.0
          </p>
        </div>
      </div>
    </main>
  );
}

