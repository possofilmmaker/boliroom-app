"use client";

import { Calendar, Users, Music, Star, ArrowRight, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

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
      fecha: "SÁBADO 14 DE MAYO",
      hora: "08:00 PM",
      descripcion: "La noche más fresca del mes. DJ residente, mixología de autor y el mejor ambiente social de la ciudad.",
      imagen: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800",
      categoria: "Social Experience",
      precio: "Cover $20k"
    },
    {
      id: 2,
      titulo: "AFTER OFFICE SESSIONS",
      fecha: "JUEVES 19 DE MAYO",
      hora: "06:00 PM",
      descripcion: "Relájate después del trabajo con 2x1 en cócteles seleccionados y música lounge para calentar motores.",
      imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
      categoria: "Social Mix",
      precio: "Entrada Libre"
    },
    {
      id: 3,
      titulo: "URBAN BEATS LIVE",
      fecha: "VIERNES 27 DE MAYO",
      hora: "09:00 PM",
      descripcion: "Los mejores hits del género urbano con nuestro DJ residente. Una noche para no parar de bailar.",
      imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      categoria: "Club Night",
      precio: "Cover $15k"
    }
  ];

  return (
    <main className="px-6 pb-32 pt-24 max-w-2xl mx-auto min-h-screen bg-brand-cream">
      <Link href="/" className="inline-flex items-center gap-2 text-brand-dark/40 hover:text-brand-dark transition-colors text-[10px] font-black uppercase tracking-widest mb-8">
        <ArrowLeft size={16} /> Volver al Inicio
      </Link>

      <div className="mb-16">
        <h1 className="text-6xl font-black text-brand-dark tracking-tighter leading-none mb-4 uppercase">
          PRÓXIMOS <br/><span className="text-brand-coral">EVENTOS</span>
        </h1>
        <p className="text-brand-teal font-black uppercase tracking-[0.2em] text-[10px]">Melao Social Club • Bogotá</p>
      </div>

      <div className="space-y-16">
        {eventos.map((evento) => (
          <div key={evento.id} id={evento.id.toString()} className="group relative scroll-mt-24">
            {/* Date Badge */}
            <div className="absolute -top-4 -left-2 z-20 bg-brand-yellow text-brand-dark border-2 border-brand-dark font-black text-[10px] px-4 py-2 shadow-[4px_4px_0px_#1a202c] uppercase tracking-wider">
              {evento.fecha}
            </div>

            <div className="melao-card overflow-hidden group">
              <div className="relative h-72 overflow-hidden border-b-2 border-brand-dark">
                <img 
                  src={evento.imagen} 
                  alt={evento.titulo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="bg-white/10 backdrop-blur-md text-[9px] text-white font-black px-3 py-1 border-2 border-white/20 uppercase tracking-widest mb-3 inline-block">
                    {evento.categoria}
                  </span>
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
                    {evento.titulo}
                  </h2>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <p className="text-brand-dark/70 text-sm font-medium leading-relaxed">
                  {evento.descripcion}
                </p>

                <div className="flex items-center justify-between py-6 border-y-2 border-brand-dark border-dashed">
                  <div className="flex items-center gap-3 text-brand-dark">
                    <Calendar size={18} className="text-brand-coral" />
                    <span className="text-xs font-black uppercase tracking-widest">{evento.hora}</span>
                  </div>
                  <div className="flex items-center gap-3 text-brand-dark">
                    <Star size={18} className="text-brand-yellow fill-brand-yellow" />
                    <span className="text-xs font-black uppercase tracking-widest">{evento.precio}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    href={`/reserva?evento=${encodeURIComponent(evento.titulo)}`}
                    className="flex-[3] melao-button-primary py-5 text-center"
                  >
                    RESERVAR CUPO
                  </Link>
                  <button 
                    onClick={() => handleShare(evento)}
                    className="flex-1 bg-white border-2 border-brand-dark flex items-center justify-center text-brand-dark hover:bg-brand-cream transition-all active:scale-90"
                  >
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-10 melao-card bg-brand-teal text-white border-brand-dark text-center">
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">¿TIENES UN<br/><span className="text-brand-yellow">EVENTO PRIVADO?</span></h3>
        <p className="text-white/80 text-xs mb-8 font-medium px-4 leading-relaxed tracking-wide uppercase">Celebra cumpleaños, despedidas o eventos corporativos con nosotros. ¡Hacemos que sea inolvidable!</p>
        <a 
          href="https://wa.me/573138139634?text=Hola! Quiero cotizar un evento privado en Melao 🥂"
          className="melao-button-secondary inline-block w-full text-center py-6"
        >
          COTIZAR MI EVENTO
        </a>
      </div>

      <footer className="mt-24 text-center opacity-30 pb-12">
        <p className="text-[10px] text-brand-dark font-black uppercase tracking-widest">Melao Social Club • 2026 • Bogotá</p>
      </footer>
    </main>
  );
}

