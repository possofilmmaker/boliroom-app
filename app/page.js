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
  Phone
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-cream overflow-x-hidden">
      {/* Hero Section - Melao Style */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(232,84,58,0.06)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(8,92,92,0.06)_0%,transparent_50%)]"></div>
          
          {/* Wavy squiggles decorativos — signature Melao Social Club */}
          <div className="absolute top-20 right-10 opacity-25 rotate-12">
            <svg width="220" height="44" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20C20 20 30 10 50 10C70 10 80 30 100 30C120 30 130 10 150 10C170 10 180 30 200 30" stroke="#E8543A" strokeWidth="8" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute bottom-40 left-[-50px] opacity-20 -rotate-12">
            <svg width="300" height="60" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20C20 20 30 10 50 10C70 10 80 30 100 30C120 30 130 10 150 10C170 10 180 30 200 30" stroke="#085C5C" strokeWidth="6" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-10">
            <svg width="120" height="24" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20C20 20 30 10 50 10C70 10 80 30 100 30C120 30 130 10 150 10C170 10 180 30 200 30" stroke="#F5B942" strokeWidth="8" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
           <div className="inline-block px-6 py-2 bg-brand-yellow text-brand-dark font-black uppercase tracking-[0.2em] text-[10px] border-2 border-brand-dark mb-8 rotate-[-2deg]">
             BUEN PLAN • BUENA GENTE • BUENA MÚSICA
           </div>
           
           {/* Logo hero — wavy squiggle signature */}
           <div className="flex justify-center mb-3">
             <svg width="120" height="22" viewBox="0 0 120 22" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 11C10 11 15 4 25 4C35 4 40 18 50 18C60 18 65 4 75 4C85 4 90 18 100 18C110 18 115 11 120 11" stroke="#085C5C" strokeWidth="4" strokeLinecap="round"/>
             </svg>
           </div>

           <div className="relative mb-6">
              <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-brand-teal uppercase leading-[0.85] relative z-10">
                MELAO
              </h1>
              <div className="absolute -top-4 -right-4 md:-top-8 md:-right-8 bg-brand-coral text-white px-4 py-2 md:px-6 md:py-3 border-4 border-brand-dark rotate-[10deg] font-black text-xl md:text-3xl uppercase tracking-widest z-20">
                SOCIAL CLUB
              </div>
           </div>
           
           <p className="text-brand-dark text-lg md:text-2xl max-w-2xl mx-auto mb-12 font-bold leading-relaxed">
             No es solo un bar, es un universo donde <span className="wavy-underline">pasan cosas</span>.
           </p>

           <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl mx-auto px-4">
             <Link href="/reserva" className="flex-1">
               <div className="melao-button-primary py-5 px-8 rounded-2xl flex items-center justify-center gap-3">
                 <CalendarCheck size={24} />
                 <span className="text-base">Reserva tu Mesa</span>
               </div>
             </Link>
             <Link href="/menu" className="flex-1">
               <div className="melao-button-secondary py-5 px-8 rounded-2xl flex items-center justify-center gap-3">
                 <Music size={24} />
                 <span className="text-base">Ver el Menú</span>
               </div>
             </Link>
           </div>
        </div>
      </section>

      {/* Experience Areas Section */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter mb-2 leading-none">
             NUESTRO <span className="text-brand-coral">MUNDO</span>
           </h2>
           {/* Squiggle decorativo bajo el título */}
           <div className="flex justify-center mb-4">
             <svg width="80" height="14" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 7C8 7 12 2 20 2C28 2 32 12 40 12C48 12 52 2 60 2C68 2 72 12 80 12" stroke="#085C5C" strokeWidth="3" strokeLinecap="round"/>
             </svg>
           </div>
           <p className="text-brand-teal font-black uppercase tracking-widest text-sm">Dos niveles de pura actitud en Bogotá</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {/* Level 2: VIP Karaoke & Games */}
           <div className="melao-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden border-b-2 border-brand-dark">
                <img src="/images/salon.jpg" alt="Piso 2" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-brand-coral text-white px-4 py-1 font-black uppercase text-xs border-2 border-brand-dark">
                  Piso 2
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-yellow border-2 border-brand-dark rounded-xl">
                    <Mic className="text-brand-dark" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">VIP Suites & Gaming</h3>
                </div>
                <p className="text-brand-dark/70 font-medium mb-8 leading-relaxed">
                  Salones privados con Karaoke Pro unificables para parches grandes. Además, zona arcade clásica y beerpong.
                </p>
                <div className="flex flex-wrap gap-2">
                   {['Karaoke Pro', 'Arcade', 'Beerpong', 'VIP Rooms'].map(item => (
                     <span key={item} className="px-3 py-1 bg-brand-cream border-2 border-brand-dark text-[10px] font-black uppercase tracking-wider rounded-full">
                       {item}
                     </span>
                   ))}
                </div>
              </div>
           </div>

           {/* Level 3: Melao-Roof */}
           <div className="melao-card overflow-hidden group">
              <div className="relative h-64 overflow-hidden border-b-2 border-brand-dark">
                <img src="/images/terraza.jpg" alt="Piso 3" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-brand-mint text-white px-4 py-1 font-black uppercase text-xs border-2 border-brand-dark">
                  Piso 3
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-coral border-2 border-brand-dark rounded-xl">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Melao-Roof Terrace</h3>
                </div>
                <p className="text-brand-dark/70 font-medium mb-8 leading-relaxed">
                  Nuestra terraza social al aire libre. 3 boliranas pro, subsoccer y el mejor spot para comer y tomar bajo el cielo.
                </p>
                <div className="flex flex-wrap gap-2">
                   {['Bolirana Pro', 'Subsoccer', 'Outdoor', 'Cocktails'].map(item => (
                     <span key={item} className="px-3 py-1 bg-brand-cream border-2 border-brand-dark text-[10px] font-black uppercase tracking-wider rounded-full">
                       {item}
                     </span>
                   ))}
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Events / Community Section */}
      <section className="bg-brand-teal py-24 px-6 border-y-4 border-brand-dark relative overflow-hidden">
         {/* Squiggle background */}
         <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
         </div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
               <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
                  VIVE LA <br/><span className="text-brand-yellow">EXPERIENCIA</span>
               </h2>
               {/* Squiggle amarillo — acento energizante */}
               <div>
                 <svg width="90" height="16" viewBox="0 0 90 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M0 8C9 8 13.5 2 22.5 2C31.5 2 36 14 45 14C54 14 58.5 2 67.5 2C76.5 2 81 14 90 14" stroke="#F5B942" strokeWidth="3.5" strokeLinecap="round"/>
                 </svg>
               </div>
               <p className="text-brand-cream/80 text-xl font-medium leading-relaxed">
                  Desde torneos de Beerpong hasta noches de DJ en vivo y fiestas temáticas. Melao Social Club es el punto de encuentro de la cultura social en Bogotá.
               </p>
               <Link href="/eventos" className="inline-flex items-center gap-4 bg-brand-coral text-white px-8 py-4 border-2 border-brand-dark shadow-[4px_4px_0px_#1C1C1C] font-black uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1C1C1C] transition-all">
                  Próximos Eventos <ArrowRight size={20} />
               </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white border-2 border-brand-dark p-6 rounded-3xl transform rotate-[-3deg] hover:rotate-0 transition-transform">
                  <Music className="text-brand-coral mb-4" size={40} />
                  <h4 className="text-brand-dark font-black uppercase text-lg">DJ Sets</h4>
               </div>
               <div className="bg-brand-yellow border-2 border-brand-dark p-6 rounded-3xl transform rotate-[3deg] hover:rotate-0 transition-transform">
                  <Zap className="text-brand-dark mb-4" size={40} />
                  <h4 className="text-brand-dark font-black uppercase text-lg">Fiestas</h4>
               </div>
            </div>
         </div>
      </section>

      {/* Corporate Section */}
      <section className="px-6 py-32 text-center relative">
         <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center p-4 bg-brand-coral border-2 border-brand-dark rounded-full mb-8">
               <Arcade className="text-white" size={32} />
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-brand-dark uppercase tracking-tighter mb-8 leading-none">
              RESERVAS <br/> <span className="text-brand-mint italic">EMPRESARIALES</span>
            </h2>
            <p className="text-brand-dark/70 text-lg md:text-xl font-bold max-w-2xl mx-auto mb-12">
               Eleva el nivel de tus eventos corporativos o cierres de año. Ofrecemos privacidad, catering y la mejor integración de la ciudad.
            </p>
            <a 
              href="https://wa.me/573000000000?text=Hola%20Melao%20Social%20Club!%20%F0%9F%8F%A2%20Estoy%20interesado%20en%20una%20reserva%20empresarial."
              target="_blank"
              rel="noopener noreferrer"
              className="melao-button-primary py-6 px-12 rounded-2xl text-lg inline-flex items-center gap-3"
            >
              Cotizar Evento <Zap size={24} />
            </a>
         </div>
      </section>

      {/* Footer / Location */}
      <footer className="bg-brand-cream border-t-4 border-brand-dark px-6 py-20 pb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="space-y-6">
               {/* Footer Logo */}
               <div className="flex flex-col items-start">
                 <svg width="56" height="11" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
                   <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke="#085C5C" strokeWidth="3" strokeLinecap="round"/>
                 </svg>
                 <h3 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">MELAO</h3>
                 <div className="flex items-center gap-1 mt-0.5">
                   <div className="h-[1.5px] w-4 bg-brand-dark"></div>
                   <span className="text-[9px] font-black text-brand-dark tracking-[0.3em]">SOCIAL CLUB</span>
                   <div className="h-[1.5px] w-4 bg-brand-dark"></div>
                 </div>
               </div>
               <p className="text-brand-dark font-bold uppercase tracking-widest text-xs">Carrera 15 # 67 - 27 • Chapinero, Bogotá</p>
               <div className="flex gap-4">
                  <a href="#" className="p-3 bg-white border-2 border-brand-dark rounded-full hover:bg-brand-yellow transition-colors">
                     <Instagram size={20} />
                  </a>
                  <a href="#" className="p-3 bg-white border-2 border-brand-dark rounded-full hover:bg-brand-coral hover:text-white transition-colors">
                     <Phone size={20} />
                  </a>
               </div>
            </div>
            
            <div className="md:col-span-2">
               <div className="melao-card p-6 h-64 bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  {/* Map Placeholder */}
                  <div className="text-center z-10">
                     <MapPin className="mx-auto text-brand-coral mb-2" size={40} />
                     <p className="font-black uppercase text-brand-dark">Ver en Google Maps</p>
                  </div>
                  <a 
                    href="https://maps.google.com/?q=Carrera+15+%23+67+-+27+Bogota" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-20"
                  ></a>
               </div>
            </div>
          </div>
      </footer>
    </main>
  );
}

