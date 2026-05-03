"use client";

import Link from "next/link";
import { 
  CalendarCheck, 
  Sparkles, 
  ArrowRight,
  Zap,
  Beer,
  Music,
  Target,
  Instagram,
  Phone,
  Play
} from "lucide-react";

const Onda = ({ color = "#FF5A4F", className = "" }) => (
  <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function Home() {
  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
               <h1 className="text-7xl md:text-[10rem] font-black leading-[0.8] tracking-tighter font-monument">
                 <span className="text-melao-coral block">SE JUEGA</span>
                 <span className="text-melao-yellow block">SE BRINDA</span>
                 <span className="text-melao-teal block">SE BAILA</span>
               </h1>
               <Onda className="w-24 md:w-32" />
            </div>
            
            <p className="text-xl md:text-2xl font-medium text-melao-green/70 max-w-lg leading-snug">
              El punto de encuentro donde la música, los juegos y los buenos tragos crean noches inolvidables.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/reserva" className="melao-button melao-button-primary px-10 py-5">
                RESERVA TU MESA <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-square">
              <img 
                src="/images/salon.jpg" 
                alt="Melao Social Club" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-melao-green/40 to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 bg-melao-yellow text-melao-green p-6 rounded-[2rem] shadow-xl rotate-12 font-black text-center">
                <span className="text-xs block uppercase tracking-widest opacity-60">Ubicación</span>
                <span className="text-xl">LA 15 <br/> BOGOTÁ</span>
              </div>
            </div>
            
            {/* Decorative Palm Icons or similar could go here */}
          </div>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="bg-melao-green py-20 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 onda-bg scale-150 animate-wave"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <p className="text-melao-coral font-bold uppercase tracking-[0.4em] text-xs">MÁS QUE UN BAR, UNA EXPERIENCIA</p>
          <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-monument">BUEN PLAN</h2>
            <Onda color="#FFC80B" className="w-12 md:w-20" />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-monument">BUENA GENTE</h2>
            <Onda color="#20BCB7" className="w-12 md:w-20" />
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter font-monument">BUENA MÚSICA</h2>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-32 max-w-7xl mx-auto relative">
        {/* Decorative Leaf */}
        <img src="/images/palm_leaf.svg" alt="" className="absolute -top-20 -left-20 w-64 h-64 opacity-5 rotate-45 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "TRAGOS DE AUTOR", desc: "Cócteles creativos con el sabor de Melao.", icon: Beer, color: "bg-melao-coral", link: "/menu" },
            { title: "JUEGOS Y RETOS", desc: "Beer pong, dados y más. ¿Aceptas el reto?", icon: Target, color: "bg-melao-yellow", link: "/juegos" },
            { title: "MÚSICA EN VIVO", desc: "Los mejores DJs y la energía que te mueve.", icon: Music, color: "bg-melao-teal", link: "/eventos" },
            { title: "EVENTOS CADA SEMANA", desc: "Noches temáticas que no te puedes perder.", icon: CalendarCheck, color: "bg-melao-pink", link: "/eventos" },
          ].map((item, i) => (
            <div key={i} className="melao-card group">
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                <item.icon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-black mb-3">{item.title}</h3>
              <p className="text-melao-green/60 font-medium mb-6">{item.desc}</p>
              <Link href={item.link} className="inline-flex items-center gap-2 text-melao-coral font-bold text-xs tracking-widest hover:gap-4 transition-all">
                VER MÁS <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="px-6 py-20 bg-melao-cream relative overflow-hidden">
        {/* Decorative Leaf */}
        <img src="/images/palm_leaf.svg" alt="" className="absolute -bottom-20 -right-20 w-80 h-80 opacity-5 -rotate-12 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <p className="text-melao-coral font-bold uppercase tracking-[0.4em] text-xs">PRÓXIMOS EVENTOS</p>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-monument">
                NOCHES QUE <br/>SE VIVEN
              </h2>
            </div>
            <Link href="/eventos" className="melao-button melao-button-secondary">
              VER TODOS LOS EVENTOS <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { date: "31 MAY", title: "MELAO SATURDAYS", tags: "DJ SET + JUEGOS", time: "8:00 PM", img: "/images/salon.jpg" },
              { date: "07 JUN", title: "REGGAETON NIGHT", tags: "DJ INVITADO", time: "9:00 PM", img: "/images/terraza.jpg" },
              { date: "14 JUN", title: "RUMBA Y PERREO", tags: "OPEN FORMAT", time: "9:00 PM", img: "/images/salon.jpg" },
              { date: "21 JUN", title: "BEERPONG TOURNAMENT", tags: "PREMIOS + SHOTS", time: "7:00 PM", img: "/images/salon.jpg" },
            ].map((event, i) => (
              <Link href="/eventos" key={i} className="group cursor-pointer">
                <div className="relative h-96 rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                  <img src={event.img} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-melao-green to-transparent opacity-60"></div>
                  
                  <div className="absolute top-6 left-6 bg-melao-teal text-white p-4 rounded-2xl text-center shadow-lg">
                    <span className="text-xl font-black block leading-none">{event.date.split(' ')[0]}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">{event.date.split(' ')[1]}</span>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8">
                    <h4 className="text-2xl font-black text-white uppercase mb-2">{event.title}</h4>
                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-4">{event.tags}</p>
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold">
                      <span>{event.time}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-6 py-32 max-w-7xl mx-auto relative">
        <div className="mb-16 space-y-4">
          <p className="text-melao-teal font-bold uppercase tracking-[0.4em] text-xs">GALERÍA</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter font-monument">MOMENTOS <br/><span className="text-melao-coral">MELAO</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {['salon.jpg', 'terraza.jpg', 'salon.jpg', 'terraza.jpg', 'salon.jpg'].map((img, i) => (
            <div key={i} className={`rounded-[2rem] overflow-hidden shadow-lg h-64 md:h-80 ${i % 2 === 0 ? 'mt-8' : ''}`}>
              <img src={`/images/${img}`} alt="Melao Moment" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="https://instagram.com" target="_blank" className="melao-button melao-button-primary bg-melao-teal inline-flex">
            SÍGUENOS EN INSTAGRAM <Instagram size={20} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <section className="px-6 py-20 bg-melao-green rounded-[4rem] mx-6 relative overflow-hidden mt-20">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          {/* Wave pattern */}
          <div className="onda-bg w-full h-full scale-[3]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter font-monument">
              ¿LISTO PARA <br/>TU PRÓXIMA NOCHE?
            </h2>
            <p className="text-white/60 text-xl font-medium">Reserva tu mesa y asegura tu mejor parche en Melao.</p>
          </div>
          <Link href="/reserva" className="melao-button melao-button-primary bg-melao-coral px-16 py-8 text-xl shadow-[0_20px_40px_rgba(255,90,79,0.3)]">
            RESERVA TU MESA <ArrowRight size={32} strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* Actual Footer */}
      <footer className="px-6 pt-32 pb-12 max-w-7xl mx-auto relative">
        {/* Decorative Leaf */}
        <img src="/images/palm_leaf.svg" alt="" className="absolute top-40 right-10 w-48 h-48 opacity-5 rotate-180 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <div className="flex flex-col items-start">
               <Onda className="w-16 mb-2" />
               <span className="text-4xl font-black tracking-tighter font-monument">MELAO</span>
               <span className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Social Club Bogotá</span>
            </div>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center hover:bg-melao-coral hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/573138139634" target="_blank" className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center hover:bg-melao-coral hover:text-white transition-all">
                <Phone size={20} />
              </a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">GOOD PEOPLE • GOOD VIBES</p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-melao-coral">ENLACES</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Eventos', path: '/eventos' },
                { name: 'Menú', path: '/menu' },
                { name: 'Juegos', path: '/juegos' },
                { name: 'Reservas', path: '/reserva' }
              ].map(link => (
                <Link key={link.name} href={link.path} className="text-sm font-medium text-melao-green/60 hover:text-melao-green transition-colors">{link.name}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-melao-coral">INFORMACIÓN</h4>
            <div className="flex flex-col gap-4">
              {['Acerca de nosotros', 'Trabaja con nosotros', 'Términos y condiciones', 'Política de privacidad'].map(link => (
                <Link key={link} href="/" className="text-sm font-medium text-melao-green/60 hover:text-melao-green transition-colors">{link}</Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-melao-coral">CONTACTO</h4>
            <div className="space-y-4">
              <p className="text-sm font-medium text-melao-green/60 leading-loose">
                📍 Bogotá, Colombia<br/>
                📞 +57 313 813 9634<br/>
                ✉️ hola@melaosocialclub.com
              </p>
              <img src="/images/palm_leaf.svg" alt="" className="w-12 opacity-10" />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-melao-green/10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">© 2024 Melao Social Club. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
