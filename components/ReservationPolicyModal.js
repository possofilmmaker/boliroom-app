"use client";

import { X, Info, Target, Beer, Zap, Clock, Users, Star, ArrowRight } from "lucide-react";

export default function ReservationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-brand-cream border-4 border-brand-dark shadow-[12px_12px_0px_#1a202c] overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header with Brand Pattern */}
        <div className="h-40 bg-brand-coral relative overflow-hidden flex items-center justify-center border-b-4 border-brand-dark">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-brand-yellow rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <Star className="text-white/20 absolute -right-6 -bottom-6 rotate-12" size={160} />
            
            <div className="relative text-center px-6">
                <div className="bg-brand-dark text-white w-14 h-14 border-2 border-white flex items-center justify-center mx-auto mb-4 rotate-3 shadow-[4px_4px_0px_white]">
                    <Info size={28} />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Políticas de Reserva</h3>
                <p className="text-[10px] font-black text-brand-dark uppercase tracking-[0.2em] mt-2 opacity-80">Melao Social Club Experience</p>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 border-2 border-brand-dark bg-white text-brand-dark flex items-center justify-center hover:bg-brand-yellow transition-all shadow-[2px_2px_0px_#1a202c] active:translate-y-[2px] active:shadow-none"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-8 space-y-8 bg-white/50">
            {/* Main Note */}
            <div className="space-y-6">
                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-brand-yellow border-2 border-brand-dark flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#1a202c] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                        <Beer className="text-brand-dark" size={24} />
                    </div>
                    <div>
                        <h4 className="text-brand-dark font-black uppercase text-xs tracking-widest mb-1">Costo de Reserva</h4>
                        <p className="text-brand-dark/70 text-sm font-bold leading-relaxed">
                            Valor: <span className="text-brand-coral font-black text-lg">$200.000</span> <br/>
                            <span className="text-brand-dark font-black uppercase text-[10px] bg-brand-teal/10 px-2 py-0.5 rounded border border-brand-teal/20">100% Consumibles</span> en bebidas y comida.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-brand-teal border-2 border-brand-dark flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#1a202c] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                        <Users className="text-white" size={24} />
                    </div>
                    <div>
                        <h4 className="text-brand-dark font-black uppercase text-xs tracking-widest mb-1">Capacidad Cilindro</h4>
                        <p className="text-brand-dark/70 text-sm font-bold leading-relaxed">
                            Máximo <span className="text-brand-dark font-black px-2 bg-brand-yellow/30">12 personas</span> por bolirana.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-white border-2 border-brand-dark flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#1a202c] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all">
                        <Clock className="text-brand-coral" size={24} />
                    </div>
                    <div>
                        <h4 className="text-brand-dark font-black uppercase text-xs tracking-widest mb-1">Tiempo de Juego</h4>
                        <p className="text-brand-dark/70 text-sm font-bold leading-relaxed">
                            Reserva por <span className="text-brand-dark font-black">2 horas</span>. <br/>
                            <span className="text-[10px] text-brand-dark/50 italic font-medium leading-tight block mt-1">Sujeto a consumo y disponibilidad para extender tu tiempo.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Other Games */}
            <div className="bg-brand-dark text-white p-6 shadow-[8px_8px_0px_#f5ba42] rotate-[-1deg]">
                <div className="flex items-center gap-3 mb-4">
                    <Target className="text-brand-yellow" size={20} />
                    <h4 className="text-white font-black italic uppercase tracking-tighter text-lg">Social Club Fun</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {['Arcade Classics', 'Beerpong Tables', 'Subsoccer', 'Juegos de Mesa'].map((game) => (
                        <div key={game} className="flex items-center gap-2 text-[9px] font-black text-brand-yellow uppercase tracking-widest bg-white/10 p-2 border border-white/10">
                            <ArrowRight size={10} className="text-brand-coral" />
                            {game}
                        </div>
                    ))}
                </div>
            </div>

            <button 
                onClick={onClose}
                className="w-full bg-brand-dark text-white py-6 border-4 border-brand-dark font-black text-sm uppercase tracking-[0.3em] shadow-[6px_6px_0px_#f26955] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#f26955] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-3"
            >
                Entendido, Continuar
                <ArrowRight size={20} />
            </button>
        </div>
      </div>
    </div>
  );
}

