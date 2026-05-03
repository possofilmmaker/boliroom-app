"use client";

import { Home, Target, Zap, Info, ArrowLeft, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const Onda = ({ color = "#FF4D3D", className = "" }) => (
  <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 8C6 8 10 3 16 3C22 3 26 13 32 13C38 13 42 3 48 3C54 3 58 13 64 13C70 13 74 8 80 8" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const Leaf = ({ className = "" }) => (
  <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M60 190 C60 190 5 140 10 80 C15 20 60 10 60 10 C60 10 105 20 110 80 C115 140 60 190 60 190Z" fill="currentColor" opacity="0.6"/>
    <path d="M60 10 L60 190" stroke="currentColor" strokeWidth="3" opacity="0.4" strokeLinecap="round"/>
    <path d="M60 50 C40 60 20 70 15 85" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
    <path d="M60 80 C40 90 25 100 18 115" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
    <path d="M60 50 C80 60 100 70 105 85" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
    <path d="M60 80 C80 90 95 100 102 115" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round"/>
  </svg>
);

export default function JuegosPage() {
  const games = [
    {
      id: "beerpong",
      title: "BEER PONG",
      desc: "El clásico de clásicos. Puntería, estrategia y mucha vibra. Reta a tus amigos y demuestra quién manda en la mesa.",
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
      accent: "text-melao-coral",
      border: "border-melao-coral/20",
      rules: ["2 personas o equipos", "10 vasos por lado", "El que encesta, ellos toman"]
    },
    {
      id: "subsoccer",
      title: "SUBSOCCER",
      desc: "Fútbol de mesa sentado. Un duelo de agilidad y reflejos único en la ciudad. ¡Gritar el gol es obligatorio!",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
      accent: "text-melao-teal",
      border: "border-melao-teal/20",
      rules: ["Sentados cara a cara", "Goles con los pies", "Rapidez máxima"]
    },
    {
      id: "arcade",
      title: "ARCADE RETRO",
      desc: "Vuelve a los 90s con nuestros sistemas de arcade. Street Fighter, Pac-Man y más para los amantes de lo retro.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      accent: "text-melao-yellow",
      border: "border-melao-yellow/20",
      rules: ["High scores semanales", "Multijugador", "Vibras 100% retro"]
    },
    {
      id: "mesa",
      title: "JUEGOS DE MESA",
      desc: "Desde Jenga gigante hasta los dados más tradicionales. El complemento perfecto para una buena ronda de tragos.",
      img: "https://images.unsplash.com/photo-1610890716171-6b1bb71ff1d2?auto=format&fit=crop&q=80&w=800",
      accent: "text-melao-pink",
      border: "border-melao-pink/20",
      rules: ["Jenga Gigante", "Uno / Naipes", "Dados Sociales"]
    }
  ];

  return (
    <main className="min-h-screen pt-28 pb-24 overflow-hidden relative">
      {/* Decoración de fondo */}
      <Leaf className="absolute top-20 -right-10 w-40 text-melao-teal opacity-5 animate-float pointer-events-none" />
      <Leaf className="absolute top-[60%] -left-12 w-52 text-melao-coral opacity-5 animate-float-rev rotate-45 pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full bg-melao-yellow/5 blur-[120px] pointer-events-none" />

      {/* Header de página */}
      <header className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-melao-cream/30 hover:text-melao-coral transition-colors text-[10px] font-black uppercase tracking-widest mb-10">
          <ArrowLeft size={14} /> Inicio
        </Link>

        <div className="space-y-4">
          <span className="text-melao-teal font-black uppercase tracking-[0.5em] text-[10px]">Diversión Real</span>
          <h1 className="text-7xl md:text-[9rem] font-black font-monument tracking-tighter leading-[0.85]">
            <span className="text-melao-cream">MÁS QUE</span><br />
            <span className="text-melao-coral">JUEGOS</span>
          </h1>
          <div className="flex items-center gap-4">
            <Onda className="w-16" />
            <p className="text-melao-cream/30 font-black uppercase tracking-[0.4em] text-[10px]">Melao Social Club</p>
          </div>
        </div>
      </header>

      {/* Grilla de juegos */}
      <section className="px-6 max-w-7xl mx-auto space-y-24">
        {games.map((game, i) => (
          <div key={game.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
            {/* Info */}
            <div className="flex-1 space-y-8">
              <div className="space-y-3">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-melao-cream/30">Modalidad Social</span>
                <h2 className={`text-5xl md:text-7xl font-black font-monument tracking-tighter ${game.accent}`}>
                  {game.title}
                </h2>
              </div>

              <p className="text-melao-cream/50 text-lg font-medium leading-relaxed max-w-md">
                {game.desc}
              </p>

              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-melao-cream/30">Reglas de la casa:</p>
                <ul className="space-y-2">
                  {game.rules.map((rule, idx) => (
                    <li key={idx} className={`flex items-center gap-3 font-bold uppercase text-[11px] tracking-widest ${game.accent}`}>
                      <Star size={10} className="fill-current shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/reserva" className={`melao-button melao-button-primary inline-flex`}>
                RESERVAR PARA JUGAR <ChevronRight size={18} />
              </Link>
            </div>

            {/* Imagen */}
            <div className="flex-1 w-full">
              <div className={`relative aspect-square rounded-3xl overflow-hidden border ${game.border} group`}>
                <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-melao-bg/70 to-transparent" />
                {/* Badge número */}
                <div className="absolute top-6 left-6 bg-melao-bg border border-white/10 rounded-2xl w-14 h-14 flex items-center justify-center">
                  <span className={`font-black text-2xl ${game.accent}`}>0{i+1}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-6 py-24 max-w-7xl mx-auto mt-16">
        <div className="section-accent rounded-[3rem] p-16 text-center relative overflow-hidden">
          <Leaf className="absolute -top-8 -right-4 w-44 text-melao-yellow opacity-5 pointer-events-none" />
          <div className="absolute inset-0 bg-melao-coral/5 rounded-[3rem]" />
          <div className="relative z-10 space-y-8">
            <h3 className="text-5xl md:text-7xl font-black font-monument tracking-tighter text-melao-cream leading-none">
              ¿ACEPTAS EL<br /><span className="text-melao-yellow">RETO?</span>
            </h3>
            <p className="text-melao-cream/40 text-xl font-medium max-w-xl mx-auto">
              Ven con tu parche, pide una ronda y que empiecen los juegos. El que pierde, paga la siguiente.
            </p>
            <Link href="/reserva" className="melao-button melao-button-primary px-14 py-6 text-lg inline-flex">
              RESERVAR MESA <ArrowLeft size={24} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center">
        <Onda className="w-14 mx-auto mb-6" />
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-melao-cream/15">Melao Social Club · 2025</p>
      </footer>
    </main>
  );
}
