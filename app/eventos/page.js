"use client";

import { Calendar, Users, Music, Star, ArrowRight, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const Onda = ({ color = "#FF5A4F", className = "" }) => (
  <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function EventosPage() {
  const handleShare = (evento) => {
    const shareData = {
      title: `Melao Social Club - ${evento.titulo}`,
      text: `¡No te pierdas este evento en Melao! ${evento.titulo} el ${evento.fecha}.`,
      url: window.location.origin + `/eventos#${evento.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Enlace copiado al portapapeles 🔗");
    }
  };

  const eventos = [
    {
      id: 1,
      titulo: "TROPICAL VIBES NIGHT",
      fecha: "SÁBADO 14 DE JUNIO",
      hora: "08:00 PM",
      descripcion: "La noche más fresca del mes. DJ residente, mixología de autor y el mejor ambiente social de la ciudad.",
      imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
      categoria: "Social Experience",
      precio: "Cover $20k"
    },
    {
      id: 2,
      titulo: "AFTER OFFICE SESSIONS",
      fecha: "JUEVES 19 DE JUNIO",
      hora: "06:00 PM",
      descripcion: "Relájate después del trabajo con 2x1 en cócteles seleccionados y música lounge para calentar motores.",
      imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      categoria: "Social Mix",
      precio: "Entrada Libre"
    },
    {
      id: 3,
      titulo: "URBAN BEATS LIVE",
      fecha: "VIERNES 27 DE JUNIO",
      hora: "09:00 PM",
      descripcion: "Los mejores hits del género urbano con nuestro DJ residente. Una noche para no parar de bailar.",
      imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      categoria: "Club Night",
      precio: "Cover $15k"
    }
  ];

  return (
    <main className="px-6 pb-32 pt-32 max-w-4xl mx-auto min-h-screen bg-melao-cream relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-20 right-0 w-80 h-80 opacity-5 pointer-events-none translate-x-1/4">
        <img src="/images/palm_leaf.svg" alt="" className="w-full h-full rotate-12" />
      </div>
      <div className="absolute top-[40%] left-0 w-96 h-96 opacity-5 pointer-events-none -translate-x-1/3">
        <img src="/images/palm_leaf.svg" alt="" className="w-full h-full -rotate-45" />
      </div>
      <Link href="/" className="inline-flex items-center gap-2 text-melao-green/40 hover:text-melao-green transition-colors text-[10px] font-black uppercase tracking-widest mb-12">
        <ArrowLeft size={16} /> Volver al Inicio
      </Link>

      <div className="mb-20">
        <h1 className="text-7xl md:text-9xl font-black text-melao-green tracking-tighter leading-[0.8] mb-6 uppercase font-monument">
          PRÓXIMOS <br/><span className="text-melao-coral">EVENTOS</span>
        </h1>
        <div className="flex items-center gap-4">
            <Onda className="w-16" />
            <p className="text-melao-teal font-black uppercase tracking-[0.4em] text-[10px]">Melao Social Club • Bogotá</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {eventos.map((evento) => (
          <div key={evento.id} id={evento.id.toString()} className="group relative scroll-mt-24">
            <div className="melao-card !p-0 overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={evento.imagen} 
                  alt={evento.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-melao-green via-transparent to-transparent"></div>
                
                <div className="absolute top-6 left-6 bg-melao-yellow text-melao-green font-black text-[10px] px-4 py-2 rounded-xl shadow-lg uppercase tracking-wider rotate-[-3deg]">
                  {evento.fecha}
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-white/20 backdrop-blur-md text-[9px] text-white font-black px-3 py-1 border border-white/10 rounded-lg uppercase tracking-widest mb-3 inline-block">
                    {evento.categoria}
                  </span>
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none font-monument">
                    {evento.titulo}
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-melao-green/60 text-sm font-medium leading-relaxed">
                  {evento.descripcion}
                </p>

                <div className="flex items-center justify-between py-6 border-y border-melao-green/5 border-dashed">
                  <div className="flex items-center gap-3 text-melao-green">
                    <Calendar size={18} className="text-melao-coral" />
                    <span className="text-xs font-black uppercase tracking-widest">{evento.hora}</span>
                  </div>
                  <div className="flex items-center gap-3 text-melao-green">
                    <Star size={18} className="text-melao-yellow fill-melao-yellow" />
                    <span className="text-xs font-black uppercase tracking-widest">{evento.precio}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    href={`/reserva?evento=${encodeURIComponent(evento.titulo)}`}
                    className="flex-[3] melao-button melao-button-primary py-5 text-sm"
                  >
                    RESERVAR CUPO
                  </Link>
                  <button 
                    onClick={() => handleShare(evento)}
                    className="flex-1 bg-white border border-melao-green/5 flex items-center justify-center text-melao-green rounded-3xl hover:bg-melao-cream transition-all active:scale-90 shadow-sm"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-16 bg-melao-green text-white rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 onda-bg scale-[3]"></div>
        <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none font-monument">¿TIENES UN<br/><span className="text-melao-yellow">EVENTO PRIVADO?</span></h3>
            <p className="text-white/60 text-lg mb-12 font-medium px-4 leading-relaxed">Celebra cumpleaños, despedidas o eventos corporativos con nosotros. ¡Hacemos que sea inolvidable!</p>
            <a 
              href="https://wa.me/573138139634?text=Hola! Quiero cotizar un evento privado en Melao 🥂"
              className="melao-button melao-button-secondary inline-block px-12 py-6 text-lg"
            >
              COTIZAR MI EVENTO
            </a>
        </div>
      </div>

      <footer className="mt-32 text-center pb-20">
        <Onda className="w-16 mx-auto mb-10" />
        <p className="text-[10px] text-melao-green font-black uppercase tracking-widest opacity-20">Melao Social Club • 2024 • Bogotá</p>
      </footer>
    </main>
  );
}
