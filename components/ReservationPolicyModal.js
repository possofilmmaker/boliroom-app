"use client";

import { X, Info, Target, Beer, Zap, Clock, Users, Star, ArrowRight, Sparkles } from "lucide-react";

export default function ReservationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Background Overlay with heavy blur */}
      <div 
        className="absolute inset-0 bg-[#042D2D]/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      ></div>

      {/* Modal Content - Glassmorphism */}
      <div className="relative w-full max-w-lg melao-glass-dark border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 backdrop-blur-3xl">
        
        {/* Header with Brand Pattern */}
        <div className="h-48 bg-gradient-to-br from-brand-teal/40 to-brand-coral/20 relative overflow-hidden flex items-center justify-center border-b border-white/5">
            <div className="absolute inset-0 opacity-5 tropical-pattern scale-150"></div>
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-brand-yellow rounded-full blur-[100px] opacity-10 animate-pulse"></div>
            <Star className="text-white/5 absolute -right-12 -bottom-12 rotate-12" size={200} />
            
            <div className="relative text-center px-10">
                <div className="w-16 h-16 melao-glass border border-white/20 flex items-center justify-center rounded-3xl mx-auto mb-6 rotate-3 shadow-2xl">
                    <Info size={32} className="text-brand-yellow" />
                </div>
                <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">Reglas de <br/><span className="text-brand-coral">Melao</span></h3>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-8 right-8 w-12 h-12 melao-glass border border-white/10 text-white flex items-center justify-center rounded-2xl hover:bg-brand-coral hover:border-brand-coral transition-all duration-500 active:scale-90"
            >
                <X size={24} />
            </button>
        </div>

        <div className="p-12 space-y-10 bg-black/20">
            {/* Main Note */}
            <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 melao-glass border border-white/10 flex items-center justify-center rounded-2xl shrink-0 group-hover:border-brand-yellow transition-all duration-500">
                        <Beer className="text-brand-yellow" size={28} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-brand-yellow font-black uppercase text-[10px] tracking-[0.3em]">Costo de Reserva</h4>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                          Abono de <span className="text-white font-black text-xl">$100.000 COP</span> <br/>
                          <span className="text-brand-coral font-black uppercase text-[9px] border border-brand-coral/30 px-3 py-1 rounded-full inline-block mt-2 tracking-widest bg-brand-coral/5">100% Consumibles</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 melao-glass border border-white/10 flex items-center justify-center rounded-2xl shrink-0 group-hover:border-brand-teal transition-all duration-500">
                        <Users className="text-brand-teal" size={28} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-brand-yellow font-black uppercase text-[10px] tracking-[0.3em]">Integrantes</h4>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            Máximo <span className="text-white font-black px-3 py-1 bg-white/5 rounded-lg">12 personas</span> por bolirana.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-6 group">
                    <div className="w-14 h-14 melao-glass border border-white/10 flex items-center justify-center rounded-2xl shrink-0 group-hover:border-brand-coral transition-all duration-500">
                        <Clock className="text-brand-coral" size={28} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-brand-yellow font-black uppercase text-[10px] tracking-[0.3em]">Tiempo de Juego</h4>
                        <p className="text-white/60 text-sm font-medium leading-relaxed">
                            Reserva inicial por <span className="text-white font-black">2 horas</span>. <br/>
                            <span className="text-[10px] text-white/30 italic font-medium leading-tight block mt-2">Extensión sujeta a consumo y disponibilidad.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Other Games */}
            <div className="melao-glass p-8 border border-white/5 rounded-[2.5rem] relative overflow-hidden group/social">
                <div className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover/social:opacity-100 transition-opacity duration-700"></div>
                <div className="flex items-center gap-4 mb-6">
                    <Sparkles className="text-brand-yellow animate-pulse" size={20} />
                    <h4 className="text-white font-black italic uppercase tracking-tighter text-xl">Social Club Fun</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {['Arcade Classics', 'Beerpong Tables', 'Subsoccer', 'Juegos de Mesa'].map((game) => (
                        <div key={game} className="flex items-center gap-3 text-[9px] font-black text-brand-yellow uppercase tracking-widest bg-white/5 p-3 rounded-xl border border-white/5">
                            <Zap size={10} className="text-brand-coral" />
                            {game}
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full melao-button-primary py-10 rounded-[2.5rem] text-2xl shadow-[0_20px_40px_rgba(232,84,58,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4"
            >
                VIVIR LA EXPERIENCIA
                <ArrowRight size={28} strokeWidth={3} />
            </button>
        </div>
      </div>
    </div>
  );
}
