"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  CalendarCheck, 
  MapPin, 
  Sparkles, 
  Target, 
  Mic, 
  Music,
  ArrowRight,
  Zap,
  Monitor as Arcade,
  Instagram,
  Phone,
  Crown,
  PlayCircle
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen melao-nocturnal overflow-x-hidden relative">
      {/* Cinematic Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Hero Section - High-End Nocturnal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
        {/* Dynamic Light Orbs */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] bg-brand-coral/20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-brand-teal/20 blur-[150px] rounded-full animate-pulse delay-700"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
           <div className="inline-flex items-center gap-3 px-8 py-3 melao-glass border border-white/10 rounded-full text-brand-yellow font-black uppercase tracking-[0.4em] text-[10px] mb-16 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
             <span className="w-2.5 h-2.5 bg-brand-coral rounded-full animate-ping"></span>
             NOCTURNAL TROPICAL SOPHISTICATION
           </div>
           
           <div className="relative mb-16 animate-in zoom-in-95 duration-1000">
              <h1 className="text-[10rem] md:text-[18rem] font-black tracking-tighter text-white uppercase leading-[0.75] mb-4 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                MELAO
              </h1>
              <div className="flex items-center justify-center gap-6 md:gap-12">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block"></div>
                <h2 className="text-4xl md:text-8xl font-black text-brand-coral uppercase tracking-[0.25em] italic drop-shadow-lg">
                  SOCIAL CLUB
                </h2>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent hidden md:block"></div>
              </div>
              
              {/* Premium Floating Badge */}
              <div className="absolute -top-12 -right-4 md:-top-20 md:right-32 melao-glass border border-white/20 text-white px-8 py-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] rotate-12 font-black text-xl md:text-3xl uppercase tracking-tighter z-20 backdrop-blur-3xl group cursor-default hover:rotate-0 transition-transform duration-700">
                Bogotá <br/> <span className="text-[10px] opacity-40 tracking-[0.2em]">CARRERA 15</span>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center border-2 border-[#042D2D] animate-bounce">
                  <Crown size={14} className="text-brand-dark" />
                </div>
              </div>
           </div>
           
           <p className="text-white/80 text-2xl md:text-4xl max-w-4xl mx-auto mb-20 font-medium leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
             Donde el <span className="text-brand-coral font-black italic">ritmo caribeño</span> se encuentra con la <span className="text-brand-yellow font-black">clase mundial</span>. Una experiencia diseñada para los que saben vivir.
           </p>

           <div className="flex flex-col sm:flex-row gap-8 justify-center w-full max-w-4xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
             <Link href="/reserva" className="group flex-1">
               <div className="melao-button-primary py-10 px-12 rounded-[2.5rem] flex items-center justify-center gap-5 text-2xl shadow-[0_30px_60px_rgba(232,84,58,0.4)] group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-500">
                 <CalendarCheck size={32} strokeWidth={2.5} />
                 <span>RESERVAR AHORA</span>
               </div>
             </Link>
             <Link href="/menu" className="group flex-1">
               <div className="melao-glass border border-white/10 py-10 px-12 rounded-[2.5rem] flex items-center justify-center gap-5 text-2xl text-white shadow-2xl group-hover:bg-white/10 group-hover:scale-[1.02] group-hover:-translate-y-1 transition-all duration-500">
                 <Sparkles size={32} strokeWidth={2.5} className="text-brand-yellow" />
                 <span>VER MENÚ</span>
               </div>
             </Link>
           </div>
        </div>
        
        {/* Scroll indicator with animation */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">The Experience</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-coral animate-scroll-indicator"></div>
          </div>
        </div>
      </section>

      {/* Experience Areas - Glass Editorial */}
      <section className="px-6 py-48 max-w-[90rem] mx-auto relative">
        <div className="absolute top-[20%] right-[10%] w-[60rem] h-[60rem] bg-brand-teal/5 blur-[150px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
           <div className="space-y-4">
              <h2 className="text-8xl md:text-[12rem] font-black text-white uppercase tracking-tighter leading-[0.75]">
                DOS <br/><span className="text-brand-yellow italic">MUNDOS</span>
              </h2>
              <div className="flex items-center gap-8 pt-6">
                 <div className="h-[2px] w-32 bg-brand-coral"></div>
                 <p className="text-brand-teal font-black uppercase tracking-[0.4em] text-sm">Altos estándares • Alta vibración</p>
              </div>
           </div>
           <p className="text-white/40 text-xl max-w-md font-medium uppercase tracking-widest leading-relaxed">
             Cada nivel es una atmósfera distinta. Cada rincón una historia por contar.
           </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
           {/* Level 2: VIP Karaoke & Games */}
           <div className="group relative">
              <div className="relative h-[700px] rounded-[4rem] overflow-hidden melao-glass border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] group-hover:translate-y-[-20px] transition-all duration-1000">
                <img src="/images/salon.jpg" alt="Piso 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#042D2D] via-[#042D2D]/20 to-transparent"></div>
                
                <div className="absolute top-12 left-12 melao-glass border border-white/20 px-8 py-3 rounded-full font-black uppercase text-xs text-white tracking-[0.3em]">
                  Level 02
                </div>

                <div className="absolute bottom-16 left-16 right-16">
                  <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                    VIP SUITES <br/><span className="text-brand-coral">& GAMING</span>
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {['Karaoke High-End', 'Arcade Classics', 'Private Lounges', 'Cocktail Bar'].map(item => (
                      <div key={item} className="px-6 py-3 melao-glass border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl group-hover:border-brand-yellow transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 px-8 space-y-8">
                <p className="text-white/60 text-2xl font-medium leading-relaxed italic">
                  "El secreto mejor guardado de Bogotá. Donde la exclusividad no es una opción, es la esencia."
                </p>
                <Link href="/reserva" className="inline-flex items-center gap-4 text-brand-yellow font-black uppercase tracking-[0.4em] text-sm group/link">
                  RESERVAR MI ESPACIO <div className="w-12 h-12 melao-glass rounded-full flex items-center justify-center group-hover/link:bg-brand-yellow group-hover/link:text-brand-dark transition-all duration-500"><ArrowRight size={24} /></div>
                </Link>
              </div>
           </div>

           {/* Level 3: Melao-Roof */}
           <div className="group relative lg:mt-48">
              <div className="relative h-[700px] rounded-[4rem] overflow-hidden melao-glass border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] group-hover:translate-y-[-20px] transition-all duration-1000">
                <img src="/images/terraza.jpg" alt="Piso 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#042D2D] via-[#042D2D]/20 to-transparent"></div>
                
                <div className="absolute top-12 left-12 melao-glass border border-white/20 px-8 py-3 rounded-full font-black uppercase text-xs text-white tracking-[0.3em]">
                  Level 03
                </div>

                <div className="absolute bottom-16 left-16 right-16">
                  <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-none">
                    MELAO <br/><span className="text-brand-teal">ROOF-TOP</span>
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {['Bolirana Pro', 'Sky View Bar', 'Outdoor Beats', 'Tropical Vibes'].map(item => (
                      <div key={item} className="px-6 py-3 melao-glass border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white rounded-2xl group-hover:border-brand-teal transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-12 px-8 space-y-8">
                <p className="text-white/60 text-2xl font-medium leading-relaxed italic">
                  "Bajo las estrellas, con la 15 a tus pies. El spot donde el atardecer se convierte en leyenda."
                </p>
                <Link href="/reserva" className="inline-flex items-center gap-4 text-brand-teal font-black uppercase tracking-[0.4em] text-sm group/link">
                  EXPLORAR LA TERRAZA <div className="w-12 h-12 melao-glass rounded-full flex items-center justify-center group-hover/link:bg-brand-teal group-hover/link:text-white transition-all duration-500"><ArrowRight size={24} /></div>
                </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Events / Community - High Contrast */}
      <section className="bg-white py-48 px-6 relative overflow-hidden">
         {/* Sharp Geometric Decoration */}
         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#042D2D] to-transparent"></div>
         <div className="absolute -right-20 top-1/4 opacity-5 rotate-12">
            <h2 className="text-[30rem] font-black text-brand-dark leading-none select-none">M</h2>
         </div>

         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-12">
               <div className="space-y-6">
                 <h3 className="text-brand-coral font-black uppercase tracking-[0.5em] text-xs">Agenda Exclusiva</h3>
                 <h2 className="text-8xl md:text-[10rem] font-black text-brand-dark uppercase tracking-tighter leading-[0.75]">
                    NOCHES <br/><span className="text-brand-teal">MELAO</span>
                  </h2>
               </div>
               <p className="text-brand-dark/60 text-2xl md:text-3xl font-medium leading-tight max-w-xl">
                  Desde torneos Pro de Bolirana hasta DJ sets de talla internacional. El pulso de Bogotá late aquí.
               </p>
               <Link href="/eventos" className="melao-button-primary py-8 px-12 rounded-[2rem] text-xl inline-flex items-center gap-6 shadow-[0_20px_40px_rgba(232,84,58,0.3)] hover:scale-105 transition-transform duration-500">
                  CALENDARIO COMPLETO <ArrowRight size={28} />
               </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               <div className="bg-brand-dark p-12 rounded-[3.5rem] shadow-2xl transform lg:-translate-y-12 rotate-[-2deg] hover:rotate-0 transition-transform duration-700">
                  <Music className="text-brand-yellow mb-8" size={64} strokeWidth={2} />
                  <h4 className="text-white font-black uppercase text-3xl tracking-tighter mb-4">DJ SELECTORS</h4>
                  <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest font-bold">Residencias exclusivas • Afro & Latin Beats</p>
               </div>
               <div className="bg-brand-teal p-12 rounded-[3.5rem] shadow-2xl transform lg:translate-y-12 rotate-[2deg] hover:rotate-0 transition-transform duration-700">
                  <Zap className="text-white mb-8" size={64} strokeWidth={2} />
                  <h4 className="text-white font-black uppercase text-3xl tracking-tighter mb-4">TAKEOVERS</h4>
                  <p className="text-white/20 text-sm leading-relaxed uppercase tracking-widest font-bold">Noches temáticas • Experiencias Inmersivas</p>
               </div>
            </div>
         </div>
      </section>

      {/* Corporate - Premium Section */}
      <section className="px-6 py-64 text-center relative overflow-hidden melao-nocturnal">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-brand-coral/5 blur-[200px] rounded-full animate-pulse"></div>
         
         <div className="relative z-10 max-w-6xl mx-auto">
            <div className="inline-flex items-center justify-center w-28 h-28 melao-glass border border-white/20 rounded-[3rem] mb-16 shadow-2xl transform rotate-12 hover:rotate-0 transition-all duration-700">
               <Arcade className="text-brand-yellow" size={56} strokeWidth={2} />
            </div>
            <h2 className="text-8xl md:text-[13rem] font-black text-white uppercase tracking-tighter mb-12 leading-[0.75]">
              CORPORATE <br/> <span className="text-brand-coral italic">ELITE</span>
            </h2>
            <p className="text-white/60 text-2xl md:text-4xl font-medium max-w-4xl mx-auto mb-20 leading-[1.1] tracking-tight">
               El escenario perfecto para marcas que no siguen reglas. Lanzamientos, team buildings y eventos con <span className="text-brand-yellow font-black">carácter disruptivo</span>.
            </p>
            <a 
              href="https://wa.me/573000000000?text=Hola%20Melao%20Social%20Club!%20%F0%9F%8F%A2%20Estoy%20interesado%20en%20una%20reserva%20empresarial."
              target="_blank"
              rel="noopener noreferrer"
              className="melao-button-primary py-10 px-20 rounded-[2.5rem] text-2xl inline-flex items-center gap-6 shadow-[0_30px_60px_rgba(232,84,58,0.4)] hover:scale-[1.05] transition-all duration-500"
            >
              COTIZAR EXPERIENCIA <Phone size={32} />
            </a>
         </div>
      </section>

      {/* Footer - Cinematic Ending */}
      <footer className="bg-black text-white px-6 py-32 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 tropical-pattern opacity-5 scale-150 grayscale"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 items-start mb-32">
              <div className="space-y-12">
                 <div className="flex flex-col items-start gap-4">
                   <h3 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">MELAO</h3>
                   <div className="flex items-center gap-4">
                      <div className="h-[1px] w-12 bg-brand-coral"></div>
                      <span className="text-[10px] font-black text-brand-yellow tracking-[0.6em] uppercase opacity-60">Est. 2024 • BOG</span>
                   </div>
                 </div>
                 <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-[11px] leading-loose">
                   CARRERA 15 # 67 - 27 <br/> 
                   BOGOTÁ D.C. • COLOMBIA
                 </p>
                 <div className="flex gap-6">
                    <a href="#" className="w-16 h-16 melao-glass border border-white/10 rounded-3xl flex items-center justify-center hover:bg-brand-coral hover:border-brand-coral transition-all duration-500 group">
                       <Instagram size={28} className="group-hover:scale-110 transition-transform" />
                    </a>
                    <a href="#" className="w-16 h-16 melao-glass border border-white/10 rounded-3xl flex items-center justify-center hover:bg-brand-teal hover:border-brand-teal transition-all duration-500 group">
                       <PlayCircle size={28} className="group-hover:scale-110 transition-transform" />
                    </a>
                 </div>
              </div>
              
              <div className="lg:col-span-2">
                 <div className="relative group cursor-pointer">
                   <div className="absolute inset-0 bg-brand-coral rounded-[4rem] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                   <div className="melao-glass-dark p-2 h-[500px] rounded-[4rem] relative overflow-hidden flex items-center justify-center border-white/5 shadow-2xl transition-all duration-700">
                      <div className="text-center z-20 p-12 melao-glass border border-white/10 rounded-[3rem] backdrop-blur-3xl">
                         <div className="w-20 h-20 bg-brand-coral rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <MapPin className="text-white" size={40} />
                         </div>
                         <h4 className="font-black uppercase text-4xl tracking-tighter mb-4 italic">JOIN THE CLUB</h4>
                         <p className="text-white/40 text-sm font-medium mb-12 tracking-[0.2em] uppercase">Estamos en el epicentro de la energía.</p>
                         <a 
                           href="https://maps.google.com/?q=Carrera+15+%23+67+-+27+Bogota" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="px-12 py-5 melao-button-primary rounded-full text-sm font-black uppercase tracking-[0.3em] shadow-xl"
                         >
                           OBTENER DIRECCIONES
                         </a>
                      </div>
                      <div className="absolute inset-0 opacity-20 grayscale group-hover:opacity-30 group-hover:scale-105 transition-all duration-[3s]">
                        <div className="w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-74.0628,4.6543,15,0/1200x800?access_token=none')] bg-cover"></div>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
            
            <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="flex gap-12">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-brand-coral cursor-pointer transition-colors">Terminos</span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-brand-coral cursor-pointer transition-colors">Privacidad</span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">© 2024 MELAO SOCIAL CLUB. THE NOCTURNAL EXPERIENCE.</p>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">BOGOTÁ • COL</span>
              </div>
            </div>
          </div>
      </footer>
    </main>
  );
}
