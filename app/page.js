"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  CalendarCheck, 
  MapPin, 
  CalendarDays, 
  Sparkles, 
  Target, 
  Tv, 
  Mic, 
  Music,
  ArrowRight,
  Zap,
  Monitor as Arcade
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-darker">
      {/* Hero Section - Pro Redesign */}
      <section className="relative h-screen flex flex-col justify-end pb-24 px-6 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.15)_0%,transparent_50%)]"></div>
          {/* Main Background Image - Using the same placeholder strategy but cleaner */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 transition-transform duration-[10s] hover:scale-110" 
            style={{backgroundImage: "url('/images/fachada.jpg')"}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-brand-darker/40 to-transparent"></div>
          
          {/* Animated Glows */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-brand-cyan/10 blur-[100px] rounded-full animate-pulse delay-700"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
           <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-6 animate-in slide-in-from-bottom-4 duration-500">
                <Sparkles className="text-brand-cyan" size={16} />
                <span className="text-[10px] text-white font-black uppercase tracking-[0.3em]">The Ultimate Social Spot</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white uppercase mb-4 leading-[0.8]">
                BOLI<span className="text-brand-purple neon-text-purple">ROOM</span>
              </h1>
              
              <p className="text-slate-400 text-sm md:text-lg max-w-md mx-auto mb-10 font-bold uppercase tracking-widest leading-relaxed">
                Coctelería de autor • Bolirana Pro • <span className="text-brand-cyan">Karaoke VIP</span> • Arcade
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <Link href="/reserva" className="group">
                  <div className="neon-button py-5 px-8 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <CalendarCheck size={20} className="text-white" />
                    <span className="text-white font-black text-xs uppercase tracking-widest">Reserva tu Experiencia</span>
                  </div>
                </Link>
                <Link href="/menu" className="group">
                  <div className="glass-panel border-white/10 py-5 px-8 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-white/5">
                    <span className="text-slate-300 font-bold text-xs uppercase tracking-widest group-hover:text-white">Ver Menú Digital</span>
                    <ArrowRight size={18} className="text-slate-500 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
           <div className="w-[2px] h-10 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Experience Areas Section */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div>
              <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-4">
                NUESTROS <span className="text-brand-cyan underline decoration-brand-purple underline-offset-8">AMBIENTES</span>
              </h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Dos niveles cargados de pura diversión</p>
           </div>
           <div className="hidden md:block h-px flex-1 mx-12 bg-white/5"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Level 2: VIP Karaoke & Games */}
           <div className="group glass-panel rounded-[2.5rem] border border-white/20 hover:border-brand-purple/50 transition-all duration-500 relative overflow-hidden h-[400px]">
              <img src="/images/salon.jpg" alt="Piso 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-brand-purple/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-brand-purple/30 group-hover:scale-110 transition-transform">
                  <Mic className="text-brand-purple" size={28} />
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase mb-3">Piso 2: VIP Suites & Gaming</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
                  Salones privados unificables con Karaoke Pro. Además, disfruta de nuestra zona de máquinas arcade clásicas y mesas de beerpong oficiales.
                </p>
                <ul className="grid grid-cols-2 gap-3">
                   {['Karaoke Pro', 'Arcade Classics', 'Beerpong Area', 'Salones VIP'].map(item => (
                     <li key={item} className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-purple"></div> {item}
                     </li>
                   ))}
                </ul>
              </div>
           </div>

           {/* Level 3: Boli-Roof */}
           <div className="group glass-panel rounded-[2.5rem] border border-white/20 hover:border-brand-cyan/50 transition-all duration-500 relative overflow-hidden h-[400px]">
              <img src="/images/terraza.jpg" alt="Piso 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <div className="w-14 h-14 bg-brand-cyan/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-brand-cyan/30 group-hover:scale-110 transition-transform">
                  <Target className="text-brand-cyan" size={28} />
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase mb-3">Piso 3: Boli-Roof Terrace</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-2">
                  Nuestra terraza social al aire libre. 3 boliranas pro, mesas de subsoccer y el mejor spot para parchar con comida y cócteles bajo el cielo.
                </p>
                <ul className="grid grid-cols-2 gap-3">
                   {['3 Boliranas Pro', 'Subsoccer Tables', 'Outdoor Vibe', 'Best City View'].map(item => (
                     <li key={item} className="flex items-center gap-2 text-[10px] font-black text-white/70 uppercase tracking-widest">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div> {item}
                     </li>
                   ))}
                </ul>
              </div>
           </div>
        </div>
      </section>

      {/* Events Quick Peek */}
      <section className="px-6 py-24 bg-slate-900/40 border-y border-white/5">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
               <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">
                  VIVE LAS <br/><span className="text-brand-purple">MEJORES NOCHES</span>
               </h2>
               <p className="text-slate-400 leading-relaxed font-medium">
                  Desde torneos relámpago de Beerpong hasta noches de DJ en vivo y fiestas temáticas. En Boliroom siempre está pasando algo.
               </p>
               <Link href="/eventos" className="inline-flex items-center gap-2 text-brand-cyan font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all">
                  Explorar todos los eventos <ArrowRight size={16} />
               </Link>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
               <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group h-48 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Music className="mb-4 text-brand-purple" size={32} />
                  <h4 className="text-white font-bold text-sm uppercase">DJ Live Sets</h4>
               </div>
               <div className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden group h-48 flex flex-col justify-end">
                  <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Target className="mb-4 text-brand-cyan" size={32} />
                  <h4 className="text-white font-bold text-sm uppercase">Beerpong Cups</h4>
               </div>
            </div>
         </div>
      </section>

      {/* Corporate Reservations Section */}
      <section className="px-6 py-24 relative overflow-hidden">
         <div className="absolute inset-0">
            <img src="/images/mesavip.jpg" alt="Corporativo" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-darker via-brand-darker/60 to-brand-darker"></div>
         </div>
         
         <div className="max-w-4xl mx-auto glass-panel p-10 md:p-16 rounded-[3rem] border border-brand-purple/20 text-center relative z-10 shadow-3xl shadow-brand-purple/10">
            <div className="bg-brand-purple/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 border border-brand-purple/30">
               <Zap className="text-brand-purple" size={40} fill="currentColor" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter mb-6 leading-[0.9]">
               RESERVAS <br/> <span className="text-brand-cyan">EMPRESARIALES</span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed font-medium">
               Eleva el nivel de tus eventos corporativos, lanzamientos de marca o cierres de año. Ofrecemos privacidad total, catering premium y la mejor experiencia de integración en Bogotá.
            </p>
            
            <a 
              href="https://wa.me/573000000000?text=Hola Boliroom! 🏢 Estoy interesado en una reserva empresarial o evento corporativo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 neon-button py-6 px-12 rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-brand-purple/30 active:scale-95 transition-all"
            >
              Cotizar Mi Evento 🏢
            </a>
         </div>
      </section>

      {/* Footer / Location - Clean & Pro */}
      <section className="px-6 py-24 max-w-4xl mx-auto text-center border-t border-white/5 mt-12">
          <div className="mb-12">
            <MapPin className="mx-auto text-brand-purple mb-4" size={32} />
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Boliroom Bogotá</h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Carrera 15 # 67 - 27 • Chapinero</p>
          </div>
          <a 
            href="https://maps.google.com/?q=Carrera+15+%23+67+-+27+Bogota" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black py-5 px-10 rounded-2xl hover:bg-white/10 transition-all active:scale-95 uppercase text-xs tracking-widest shadow-xl"
          >
            ¿Cómo llegar?
          </a>
      </section>
    </main>
  );
}
