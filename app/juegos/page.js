"use client";

import { Home, Target, Zap, Info, ArrowLeft, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const Onda = ({ color = "#FF5A4F", className = "" }) => (
  <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function JuegosPage() {
  const games = [
    {
      id: "beerpong",
      title: "BEER PONG",
      desc: "El clásico de clásicos. Puntería, estrategia y mucha vibra. Reta a tus amigos y demuestra quién manda en la mesa.",
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
      color: "bg-melao-coral",
      rules: ["2 personas o equipos", "10 vasos por lado", "El que encesta, ellos toman"]
    },
    {
      id: "subsoccer",
      title: "SUBSOCCER",
      desc: "Fútbol de mesa sentado. Un duelo de agilidad y reflejos único en la ciudad. ¡Gritar el gol es obligatorio!",
      img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800",
      color: "bg-melao-teal",
      rules: ["Sentados cara a cara", "Goles con los pies", "Rapidez máxima"]
    },
    {
      id: "arcade",
      title: "ARCADE CLASSICS",
      desc: "Vuelve a los 90s con nuestros sistemas de arcade. Street Fighter, Pac-Man y más para los amantes de lo retro.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      color: "bg-melao-yellow",
      rules: ["High scores semanales", "Multijugador", "Vibras 100% retro"]
    },
    {
      id: "mesa",
      title: "JUEGOS DE MESA",
      desc: "Desde Jenga gigante hasta los dados más tradicionales. El complemento perfecto para una buena ronda de tragos.",
      img: "https://images.unsplash.com/photo-1610890716171-6b1bb71ff1d2?auto=format&fit=crop&q=80&w=800",
      color: "bg-melao-pink",
      rules: ["Jenga Gigante", "Uno / Naipes", "Dados Sociales"]
    }
  ];

  return (
    <main className="min-h-screen bg-melao-cream pt-32 pb-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none -translate-y-1/2 translate-x-1/2">
        <img src="/images/palm_leaf.svg" alt="" className="w-full h-full rotate-45" />
      </div>

      <header className="px-6 max-w-7xl mx-auto mb-20 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-melao-green/40 hover:text-melao-green transition-colors text-[10px] font-black uppercase tracking-widest mb-12">
          <ArrowLeft size={16} /> VOLVER AL INICIO
        </Link>
        
        <div className="space-y-6">
          <h1 className="text-7xl md:text-9xl font-black text-melao-green tracking-tighter leading-[0.8] uppercase font-monument">
            MÁS QUE <br/><span className="text-melao-coral">JUEGOS</span>
          </h1>
          <div className="flex items-center gap-4">
            <Onda className="w-16" />
            <p className="text-melao-teal font-black uppercase tracking-[0.4em] text-[10px]">Melao Social Club • Diversión Real</p>
          </div>
        </div>
      </header>

      <section className="px-6 max-w-7xl mx-auto space-y-32">
        {games.map((game, i) => (
          <div key={game.id} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
            <div className="flex-1 space-y-8 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${game.id === 'beerpong' ? 'text-melao-coral' : 'text-melao-teal'}`}>
                  Modalidad Social
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-melao-green tracking-tighter uppercase font-monument">
                  {game.title}
                </h2>
              </div>
              
              <p className="text-lg md:text-xl text-melao-green/60 font-medium leading-relaxed max-w-xl">
                {game.desc}
              </p>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-melao-green/40 italic">Reglas de la casa:</h4>
                <ul className="space-y-3">
                  {game.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-melao-green font-bold uppercase text-[11px] tracking-widest">
                      <Star size={12} className="text-melao-yellow fill-melao-yellow" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link href="/reserva" className={`melao-button melao-button-primary ${game.color} inline-flex shadow-2xl`}>
                  RESERVAR PARA JUGAR <ChevronRight size={20} />
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
                <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-melao-green/60 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                   <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl">
                      <Target size={32} className="text-melao-green" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto text-center mt-20">
         <div className="p-20 bg-melao-green text-white rounded-[4rem] relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 onda-bg scale-[4] animate-wave"></div>
            <div className="relative z-10 space-y-8">
              <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase font-monument">
                ¿ACEPTAS EL <br/><span className="text-melao-yellow">RETITO?</span>
              </h3>
              <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto">
                Ven con tu parche, pide una ronda y que empiecen los juegos. El que pierde, paga la siguiente.
              </p>
              <Link href="/reserva" className="melao-button melao-button-primary bg-melao-coral px-16 py-8 text-xl inline-flex">
                RESERVAR MESA <ArrowLeft size={32} className="rotate-180" />
              </Link>
            </div>
         </div>
      </section>

      <footer className="py-20 text-center">
        <Onda className="w-16 mx-auto mb-8" />
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-melao-green/20">Melao Social Club • 2024</p>
      </footer>
    </main>
  );
}
