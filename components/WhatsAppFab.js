"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  const phoneNumber = "573000000000"; // Reemplazar con el número real de Boliroom
  const message = "¡Hola Boliroom! 🍹 Quisiera consultar sobre un evento empresarial o tengo una necesidad especial para mi reserva.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all animate-in fade-in zoom-in duration-500 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-100 pointer-events-none uppercase tracking-tighter">
        ¿Eventos Corporativos? 🏢
      </div>
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
