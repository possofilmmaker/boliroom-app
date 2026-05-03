"use client";

import { X, Info, Target, Beer, Zap, Clock, Users, Star, ArrowRight, Sparkles } from "lucide-react";

export default function ReservationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-melao-green/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-melao-cream border border-melao-green/5 rounded-[3.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="h-40 bg-melao-green relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-5 onda-bg scale-150"></div>
            
            <div className="relative text-center px-10">
                <div className="w-14 h-14 bg-melao-coral flex items-center justify-center rounded-2xl mx-auto mb-4 rotate-3 shadow-xl">
                    <Info size={28} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-none font-monument">REGLAS DEL CLUB</h3>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 bg-white/10 text-white flex items-center justify-center rounded-xl hover:bg-melao-coral transition-all duration-500 active:scale-90"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-10 space-y-8">
            {/* Main Note */}
            <div className="space-y-6">
                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-melao-yellow/20 text-melao-green flex items-center justify-center rounded-xl shrink-0">
                        <Beer size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-melao-green font-black uppercase text-[10px] tracking-[0.3em]">Costo de Reserva</h4>
                        <p className="text-melao-green/60 text-sm font-medium leading-relaxed">
                          Abono de <span className="text-melao-green font-black text-xl">$100.000 COP</span> <br/>
                          <span className="text-melao-coral font-black uppercase text-[9px] border border-melao-coral/30 px-3 py-1 rounded-full inline-block mt-2 tracking-widest bg-melao-coral/5">100% Consumibles</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-melao-teal/20 text-melao-green flex items-center justify-center rounded-xl shrink-0">
                        <Users size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-melao-green font-black uppercase text-[10px] tracking-[0.3em]">Integrantes</h4>
                        <p className="text-melao-green/60 text-sm font-medium leading-relaxed">
                            Máximo <span className="text-melao-green font-black">12 personas</span> por bolirana.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-melao-coral/20 text-melao-green flex items-center justify-center rounded-xl shrink-0">
                        <Clock size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-melao-green font-black uppercase text-[10px] tracking-[0.3em]">Tiempo de Juego</h4>
                        <p className="text-melao-green/60 text-sm font-medium leading-relaxed">
                            Reserva inicial por <span className="text-melao-green font-black">2 horas</span>. <br/>
                            <span className="text-[10px] text-melao-green/30 italic font-medium leading-tight block mt-2">Extensión sujeta a consumo y disponibilidad.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Other Games */}
            <div className="bg-white p-6 border border-melao-green/5 rounded-[2rem] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-melao-yellow" size={18} />
                    <h4 className="text-melao-green font-black uppercase tracking-tighter text-lg font-monument">MÁS QUE JUEGOS</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {['Arcade Retro', 'Beerpong', 'Subsoccer', 'Juegos de Mesa'].map((game) => (
                        <div key={game} className="flex items-center gap-2 text-[8px] font-black text-melao-green/60 uppercase tracking-widest bg-melao-cream p-2.5 rounded-xl">
                            <Zap size={10} className="text-melao-coral" />
                            {game}
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full melao-button melao-button-primary py-8 text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
                VIVIR LA EXPERIENCIA
                <ArrowRight size={24} strokeWidth={3} />
            </button>
        </div>
      </div>
    </div>
  );
}
