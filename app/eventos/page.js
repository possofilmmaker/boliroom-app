"use client";

import { Calendar, Users, Music, Star, ArrowRight, Share2 } from "lucide-react";
import Link from "next/link";

export default function EventosPage() {
  const handleShare = (evento) => {
    const shareData = {
      title: `Boliroom - ${evento.titulo}`,
      text: `¡Mira este evento en Boliroom! ${evento.titulo} el ${evento.fecha}.`,
      url: window.location.origin + `/eventos#${evento.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Enlace de reserva copiado al portapapeles 🔗");
    }
  };
  const eventos = [
    {
      id: 1,
      titulo: "NEON PULSE NIGHT",
      fecha: "SÁBADO 14 DE MARZO",
      hora: "08:00 PM",
      descripcion: "La fiesta más brillante del mes. Pintura neon, DJ en vivo y shots de cortesía para los primeros 50 en llegar.",
      imagen: "/event_dj.png",
      categoria: "Fiesta Temática",
      precio: "Cover $20k"
    },
    {
      id: 2,
      titulo: "AFTER OFFICE SESSIONS",
      fecha: "JUEVES 19 DE MARZO",
      hora: "06:00 PM",
      descripcion: "Relájate después del trabajo con 2x1 en cócteles seleccionados y música lounge para calentar motores.",
      imagen: "/boliroom_signature_cocktail_1773343366899.png",
      categoria: "Social",
      precio: "Entrada Libre"
    },
    {
      id: 3,
      titulo: "URBAN BEATS DJ LIVE",
      fecha: "VIERNES 27 DE MARZO",
      hora: "09:00 PM",
      descripcion: "Los mejores hits del género urbano con nuestro DJ residente. Una noche para no parar de bailar.",
      imagen: "/boliroom_wings_premium_1773343521970.png",
      categoria: "DJ Set",
      precio: "Cover $15k"
    }
  ];

  return (
    <main className="px-6 pb-24 max-w-2xl mx-auto min-h-screen pt-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
          PRÓXIMOS <span className="text-brand-purple">EVENTOS</span>
        </h1>
        <p className="text-slate-500 text-xs uppercase font-bold tracking-[0.2em]">Vive la experiencia Boliroom</p>
      </div>

      <div className="space-y-10">
        {eventos.map((evento) => (
          <div key={evento.id} id={evento.id} className="group relative scroll-mt-24">
            {/* Indicador de Fecha Flotante */}
            <div className="absolute -top-4 -left-2 z-10 bg-brand-cyan text-brand-darker font-black text-[10px] px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,242,254,0.3)] uppercase tracking-tighter">
              {evento.fecha}
            </div>

            <div className="glass-panel rounded-[2rem] overflow-hidden border border-white/5 group-hover:border-brand-purple/30 transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={evento.imagen} 
                  alt={evento.titulo} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-brand-purple text-[10px] font-black uppercase tracking-widest mb-2 block">
                    {evento.categoria}
                  </span>
                  <h2 className="text-2xl font-black italic text-white tracking-tighter uppercase leading-tight">
                    {evento.titulo}
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <p className="text-slate-400 text-sm leading-relaxed">
                  {evento.descripcion}
                </p>

                <div className="flex items-center justify-between py-4 border-y border-white/5">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar size={16} className="text-brand-cyan" />
                    <span className="text-xs font-bold">{evento.hora}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Star size={16} className="text-amber-400" />
                    <span className="text-xs font-bold">{evento.precio}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link 
                    href={`/reserva?evento=${encodeURIComponent(evento.titulo)}`}
                    className="flex-[3] neon-button py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                  >
                    Reservar Cupo
                    <ArrowRight size={16} />
                  </Link>
                  <button 
                    onClick={() => handleShare(evento)}
                    className="flex-1 glass-panel border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center glass-panel p-8 rounded-3xl border-dashed border-white/10">
        <h3 className="text-white font-bold mb-2 uppercase tracking-tight">¿Quieres celebrar algo especial?</h3>
        <p className="text-slate-500 text-xs mb-6">Cumpleaños, despedidas o eventos corporativos. ¡Nosotros nos encargamos!</p>
        <a 
          href="https://wa.me/573000000000?text=Hola! Quiero cotizar un evento privado en Boliroom 🥂"
          className="text-brand-cyan font-bold text-sm hover:underline"
        >
          Contactar para Evento Privado →
        </a>
      </div>
    </main>
  );
}
