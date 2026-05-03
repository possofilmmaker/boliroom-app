"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  const phoneNumber = "573000000000"; // Reemplazar con el número real de Melao Social Club
  const message = "¡Hola Melao Social Club! 🍹 Quisiera consultar sobre un evento empresarial o tengo una necesidad especial para mi reserva.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-32 right-6 z-[90] bg-[#25D366] text-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all animate-in fade-in zoom-in duration-700 group md:bottom-10"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute -top-14 right-0 melao-glass border border-white/20 text-white text-[10px] font-black px-4 py-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-2xl pointer-events-none uppercase tracking-widest translate-y-2 group-hover:translate-y-0">
        ¿Eventos Corporativos? 🏢
      </div>
      <MessageCircle size={32} fill="currentColor" />
    </a>
  );
}
