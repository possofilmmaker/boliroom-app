"use client";

import { X, Info, Target, Beer, Zap, Clock, Users } from "lucide-react";

export default function ReservationPolicyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel rounded-[2.5rem] border border-white/10 shadow-2xl shadow-brand-purple/20 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Decor */}
        <div className="h-32 bg-brand-purple relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_60%)]"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <Zap className="text-white/20 absolute -right-4 -top-4" size={120} />
            
            <div className="relative text-center">
                <div className="bg-white/20 backdrop-blur-md w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Info className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Políticas de Reserva</h3>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-8 space-y-8">
            {/* Main Note */}
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center shrink-0 border border-brand-cyan/20">
                        <Beer className="text-brand-cyan" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Costo de Reserva</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Valor: <span className="text-brand-cyan font-black">$200.000</span> <span className="text-white">consumibles</span> en bebidas y comida del bar.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-brand-purple/10 rounded-xl flex items-center justify-center shrink-0 border border-brand-purple/20">
                        <Users className="text-brand-purple" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Capacidad Cilindro</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Máximo <span className="text-white font-black">12 personas</span> por bolirana.
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0 border border-amber-500/20">
                        <Clock className="text-amber-500" size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-1">Tiempo de Juego</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            La reserva es por <span className="text-white font-black">2 horas</span>. Según consumo y disponibilidad, pueden continuar en la bolirana sin inconveniente.
                        </p>
                    </div>
                </div>
            </div>

            {/* Other Games */}
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
                <div className="flex items-center gap-2 mb-4">
                    <Target className="text-brand-cyan" size={18} />
                    <h4 className="text-white font-black italic uppercase tracking-tighter">Más diversión incluida</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {['Arcade Classics', 'Beerpong Tables', 'Subsoccer', 'Juegos de Mesa'].map((game) => (
                        <div key={game} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900/50 p-2 rounded-lg border border-white/5">
                            <div className="w-1 h-1 bg-brand-purple rounded-full"></div>
                            {game}
                        </div>
                    ))}
                </div>
                <p className="text-[9px] text-slate-500 mt-4 text-center">Disponibles durante toda tu estadía en el bar.</p>
            </div>

            <button 
                onClick={onClose}
                className="w-full neon-button py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
                Entendido, Continuar
            </button>
        </div>
      </div>
    </div>
  );
}
