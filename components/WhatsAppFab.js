"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  const phoneNumber = "573138850650"; // Número proporcionado por el usuario en sesiones previas o genérico
  const message = "¡Hola Melao Social Club! 🍹 Quisiera más información sobre reservas o eventos corporativos.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-32 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all animate-in fade-in zoom-in duration-700 group md:bottom-10"
      aria-label="Contactar por WhatsApp"
    >
      <div className="absolute -top-14 right-0 bg-white border border-melao-green/5 text-melao-green text-[10px] font-black px-4 py-2.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap shadow-2xl pointer-events-none uppercase tracking-widest translate-y-2 group-hover:translate-y-0">
        ¿Eventos Corporativos? 🏢
      </div>
      <MessageCircle size={28} fill="currentColor" />
    </a>
  );
}
