"use client";

import Link from "next/link";
import {
  CalendarCheck,
  Sparkles,
  ArrowRight,
  Beer,
  Music,
  Target,
  Instagram,
  Phone,
  MapPin,
  Zap,
} from "lucide-react";

/* ── Onda SVG decorativa ── */
const Onda = ({ color = "#FF4D3D", className = "" }) => (
  <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 8C6 8 10 3 16 3C22 3 26 13 32 13C38 13 42 3 48 3C54 3 58 13 64 13C70 13 74 8 80 8" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

/* ── Ticker infinito ── */
const Ticker = () => {
  const items = ["SE JUEGA", "•", "SE BRINDA", "•", "SE BAILA", "•", "MELAO SOCIAL CLUB", "•", "BOGOTÁ LA 15", "•", "BUEN PLAN", "•", "BUENA GENTE", "•"];
  return (
    <div className="overflow-hidden bg-melao-coral py-4 -mx-0">
      <div className="flex gap-12 animate-ticker whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="text-white font-black uppercase tracking-[0.3em] text-sm shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Hoja decorativa SVG inline ── */
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

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO — Fondo oscuro, letras grandes, energía
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-0 px-6 overflow-hidden">

        {/* Hojas de fondo decorativas */}
        <Leaf className="absolute top-20 -right-16 w-40 text-melao-teal opacity-10 animate-float pointer-events-none" />
        <Leaf className="absolute bottom-10 -left-16 w-52 text-melao-coral opacity-8 animate-float-rev pointer-events-none rotate-45" />

        {/* Círculos de neón difuso */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-melao-coral/8 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-melao-teal/8 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Texto hero */}
          <div className="space-y-8">
            {/* Pill / badge */}
            <div className="inline-flex items-center gap-3 border border-melao-coral/30 text-melao-coral px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
              <span className="w-2 h-2 rounded-full bg-melao-coral animate-pulse-glow inline-block" />
              Bogotá · Carrera 15
            </div>

            <h1 className="font-monument font-black leading-[0.85] tracking-tighter">
              <span className="block text-[clamp(3.5rem,10vw,9rem)] text-melao-coral">SE JUEGA</span>
              <span className="block text-[clamp(3.5rem,10vw,9rem)] text-melao-yellow">SE BRINDA</span>
              <span className="block text-[clamp(3.5rem,10vw,9rem)] text-melao-teal">SE BAILA</span>
            </h1>

            <div className="flex items-center gap-4">
              <Onda className="w-20" />
              <p className="text-melao-cream/40 font-black uppercase tracking-[0.4em] text-[10px]">VIVE EL MELAO</p>
            </div>

            <p className="text-melao-cream/60 text-lg md:text-xl font-medium max-w-md leading-relaxed">
              El punto de encuentro donde la música, los juegos y los buenos tragos crean noches que no se olvidan.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/reserva" className="melao-button melao-button-primary px-10 py-5 text-base">
                RESERVA TU MESA <ArrowRight size={20} />
              </Link>
              <Link href="/juegos" className="melao-button border border-white/15 text-melao-cream hover:border-melao-yellow hover:text-melao-yellow px-10 py-5 text-base">
                VER JUEGOS
              </Link>
            </div>
          </div>

          {/* Imagen hero */}
          <div className="relative group hidden lg:block">
            {/* Borde decorativo */}
            <div className="absolute inset-0 rounded-[3rem] border-2 border-melao-coral/20 translate-x-4 translate-y-4" />
            <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] border border-white/10">
              <img
                src="/images/salon.jpg"
                alt="Melao Social Club"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-melao-bg/80 via-melao-bg/10 to-transparent" />

              {/* Badge LA 15 */}
              <div className="absolute top-8 right-8 bg-melao-yellow text-melao-green p-6 rounded-[2rem] shadow-2xl rotate-6 font-black text-center">
                <span className="text-[9px] block uppercase tracking-widest opacity-60 mb-1">Bogotá</span>
                <span className="text-2xl block">LA&nbsp;15</span>
              </div>

              {/* Pill inferior */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-3 h-3 rounded-full bg-melao-lime animate-pulse-glow" />
                <span className="text-melao-cream font-black text-xs uppercase tracking-widest">Abierto esta noche</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TICKER
      ══════════════════════════════════════════ */}
      <Ticker />

      {/* ══════════════════════════════════════════
          FEATURES — Cards oscuras con íconos de neón
      ══════════════════════════════════════════ */}
      <section className="px-6 py-24 max-w-7xl mx-auto relative">
        {/* Hojas decorativas */}
        <Leaf className="absolute -top-10 -left-10 w-36 text-melao-yellow opacity-5 rotate-[-30deg] pointer-events-none" />
        <Leaf className="absolute -bottom-10 -right-10 w-48 text-melao-teal opacity-5 rotate-[120deg] pointer-events-none" />

        <div className="text-center mb-16 space-y-4">
          <p className="text-melao-coral font-black uppercase tracking-[0.5em] text-[10px]">TODO EN UN SOLO PARCHE</p>
          <h2 className="text-5xl md:text-7xl font-black font-monument tracking-tighter text-melao-cream">
            LO QUE <span className="text-melao-yellow">OFRECEMOS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "TRAGOS DE AUTOR", desc: "Cócteles creativos con el sabor de Melao.", icon: Beer, color: "text-melao-coral", glow: "melao-glow-coral", link: "/menu", accent: "border-melao-coral/20" },
            { title: "JUEGOS Y RETOS", desc: "Beer pong, dados y más. ¿Aceptas el reto?", icon: Target, color: "text-melao-yellow", glow: "melao-glow-yellow", link: "/juegos", accent: "border-melao-yellow/20" },
            { title: "MÚSICA EN VIVO", desc: "Los mejores DJs y la energía que te mueve.", icon: Music, color: "text-melao-teal", glow: "melao-glow-teal", link: "/eventos", accent: "border-melao-teal/20" },
            { title: "EVENTOS CADA SEMANA", desc: "Noches temáticas que no te puedes perder.", icon: CalendarCheck, color: "text-melao-pink", glow: "", link: "/eventos", accent: "border-melao-pink/20" },
          ].map((item, i) => (
            <Link key={i} href={item.link} className={`melao-card group flex flex-col gap-6 border ${item.accent} hover:scale-[1.02]`}>
              <div className={`w-14 h-14 rounded-2xl bg-melao-bg border border-white/10 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                <item.icon size={28} />
              </div>
              <div>
                <h3 className={`text-lg font-black tracking-tight mb-2 ${item.color}`}>{item.title}</h3>
                <p className="text-melao-cream/40 font-medium text-sm leading-relaxed">{item.desc}</p>
              </div>
              <div className={`mt-auto inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${item.color} group-hover:gap-4 transition-all`}>
                VER MÁS <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          EVENTOS — Grilla con fotos grandes
      ══════════════════════════════════════════ */}
      <section className="section-dark py-24 overflow-hidden relative">
        {/* Hojas laterales */}
        <Leaf className="absolute top-10 -right-8 w-40 text-melao-coral opacity-5 animate-float pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <div className="space-y-4">
              <p className="text-melao-coral font-black uppercase tracking-[0.5em] text-[10px]">PRÓXIMAS NOCHES</p>
              <h2 className="text-6xl md:text-8xl font-black font-monument tracking-tighter text-melao-cream leading-none">
                NOCHES QUE<br /><span className="text-melao-yellow">SE VIVEN</span>
              </h2>
            </div>
            <Link href="/eventos" className="melao-button melao-button-secondary shrink-0">
              TODOS LOS EVENTOS <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { date: "31 MAY", title: "MELAO SATURDAYS", tags: "DJ SET + JUEGOS", time: "8:00 PM", img: "/images/salon.jpg", color: "bg-melao-coral" },
              { date: "07 JUN", title: "REGGAETON NIGHT", tags: "DJ INVITADO", time: "9:00 PM", img: "/images/terraza.jpg", color: "bg-melao-teal" },
              { date: "14 JUN", title: "RUMBA Y PERREO", tags: "OPEN FORMAT", time: "9:00 PM", img: "/images/salon.jpg", color: "bg-melao-yellow" },
              { date: "21 JUN", title: "BEERPONG TORNEO", tags: "PREMIOS + SHOTS", time: "7:00 PM", img: "/images/salon.jpg", color: "bg-melao-pink" },
            ].map((ev, i) => (
              <Link href="/eventos" key={i} className="group cursor-pointer">
                <div className="relative h-96 rounded-3xl overflow-hidden border border-white/5">
                  <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-melao-bg via-melao-bg/30 to-transparent" />

                  {/* Fecha */}
                  <div className={`absolute top-5 left-5 ${ev.color} text-melao-bg font-black text-sm px-4 py-2 rounded-2xl shadow-lg`}>
                    {ev.date}
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-melao-cream/50 text-[9px] font-black uppercase tracking-widest mb-2">{ev.tags}</p>
                    <h4 className="text-xl font-black text-melao-cream uppercase font-monument tracking-tight leading-tight mb-3">{ev.title}</h4>
                    <div className="flex items-center gap-2 text-melao-cream/40 text-[10px] font-bold">
                      <span>{ev.time}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-2 transition-transform text-melao-coral" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALERÍA RÁPIDA
      ══════════════════════════════════════════ */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <p className="text-melao-teal font-black uppercase tracking-[0.5em] text-[10px] mb-3">EL AMBIENTE</p>
            <h2 className="text-6xl md:text-7xl font-black font-monument tracking-tighter text-melao-cream leading-none">
              MOMENTOS<br /><span className="text-melao-coral">MELAO</span>
            </h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="melao-button border border-melao-pink/30 text-melao-pink hover:bg-melao-pink hover:text-white gap-3">
            <Instagram size={18} /> SÍGUENOS
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {['salon.jpg','terraza.jpg','salon.jpg','terraza.jpg','salon.jpg'].map((img, i) => (
            <div key={i} className={`rounded-3xl overflow-hidden border border-white/5 ${i % 2 === 0 ? 'h-64 md:h-80 mt-6' : 'h-64 md:h-80'}`}>
              <img src={`/images/${img}`} alt="Momento Melao" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL — Bloque full verde oscuro
      ══════════════════════════════════════════ */}
      <section className="mx-4 md:mx-8 rounded-[3rem] section-accent py-24 px-8 relative overflow-hidden">
        {/* Hojas decorativas */}
        <Leaf className="absolute -top-10 -right-6 w-52 text-melao-teal opacity-8 rotate-[20deg] pointer-events-none" />
        <Leaf className="absolute -bottom-10 -left-6 w-44 text-melao-coral opacity-8 rotate-[-40deg] pointer-events-none" />

        {/* Círculo de neón */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-melao-coral/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-melao-lime font-black uppercase tracking-[0.5em] text-[10px]">¿QUÉ ESPERAS?</p>
            <h2 className="text-5xl md:text-8xl font-black font-monument tracking-tighter text-melao-cream leading-none">
              ¿LISTO PARA<br /><span className="text-melao-coral">TU PRÓXIMA<br />NOCHE?</span>
            </h2>
            <p className="text-melao-cream/50 text-xl font-medium">
              Reserva tu mesa y asegura tu mejor parche en Melao.
            </p>
          </div>
          <Link href="/reserva" className="melao-button melao-button-primary px-14 py-7 text-lg shrink-0">
            RESERVA TU MESA <ArrowRight size={28} strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="px-6 pt-24 pb-12 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6 md:col-span-2">
            <div>
              <Onda className="w-16 mb-2" />
              <span className="text-5xl font-black tracking-tighter font-monument text-melao-cream block">MELAO</span>
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-melao-cream/30">Social Club · Bogotá</span>
            </div>
            <p className="text-melao-cream/40 text-sm font-medium max-w-xs">
              El lugar donde siempre hay buen plan, buena gente y mejor música.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-melao-cream/50 hover:border-melao-coral hover:text-melao-coral transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://wa.me/573138139634" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-melao-cream/50 hover:border-melao-teal hover:text-melao-teal transition-all">
                <Phone size={18} />
              </a>
              <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-2xl border border-white/10 flex items-center justify-center text-melao-cream/50 hover:border-melao-yellow hover:text-melao-yellow transition-all">
                <MapPin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-melao-coral">PÁGINAS</h4>
            <div className="flex flex-col gap-3">
              {[{name:'Inicio',path:'/'},{name:'Eventos',path:'/eventos'},{name:'Menú',path:'/menu'},{name:'Juegos',path:'/juegos'},{name:'Reservas',path:'/reserva'}].map(l => (
                <Link key={l.name} href={l.path} className="text-sm font-medium text-melao-cream/40 hover:text-melao-cream transition-colors">{l.name}</Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-melao-coral">CONTACTO</h4>
            <p className="text-sm font-medium text-melao-cream/40 leading-loose">
              📍 Cra 15 # 67-27, Bogotá<br />
              📞 +57 313 813 9634<br />
              ✉️ hola@melaosocialclub.com
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-melao-cream/15">
            © 2025 Melao Social Club · Todos los derechos reservados
          </p>
        </div>
      </footer>

    </main>
  );
}
