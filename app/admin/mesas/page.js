"use client";

import { useState } from "react";
import { MapPin, Users, Info, ChevronRight, Star, Grid, Layout } from "lucide-react";

const TABLES_PISO_2 = [
  { id: "V1", name: "VIP 1", cap: 12, status: "occupied" },
  { id: "V2", name: "VIP 2", cap: 10, status: "reserved" },
  { id: "V3", name: "VIP 3", cap: 8, status: "available" },
  { id: "V4", name: "VIP 4", cap: 12, status: "available" },
  { id: "V5", name: "VIP 5", cap: 6, status: "occupied" },
  { id: "V6", name: "VIP 6", cap: 8, status: "available" },
];

const TABLES_PISO_3 = [
  { id: "T1", name: "TERRAZA 1", cap: 4, status: "available" },
  { id: "T2", name: "TERRAZA 2", cap: 4, status: "occupied" },
  { id: "T3", name: "TERRAZA 3", cap: 6, status: "available" },
  { id: "T4", name: "TERRAZA 4", cap: 4, status: "reserved" },
  { id: "T5", name: "TERRAZA 5", cap: 8, status: "available" },
  { id: "T6", name: "TERRAZA 6", cap: 4, status: "available" },
  { id: "T7", name: "TERRAZA 7", cap: 6, status: "occupied" },
  { id: "T8", name: "TERRAZA 8", cap: 4, status: "available" },
];

export default function MesasPage() {
  const [activeFloor, setActiveFloor] = useState(2);

  const renderTable = (table) => {
    const statusColors = {
      available: "bg-white border-brand-dark text-brand-dark",
      reserved: "bg-brand-yellow border-brand-dark text-brand-dark",
      occupied: "bg-brand-coral border-brand-dark text-white shadow-[4px_4px_0px_#085454]"
    };

    return (
      <div 
        key={table.id}
        className={`group relative p-6 border-4 flex flex-col items-center justify-center transition-all cursor-pointer ${statusColors[table.status] || statusColors.available} ${table.status !== 'occupied' ? 'shadow-[6px_6px_0px_#1a202c] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#1a202c]' : 'active:translate-y-[2px] active:shadow-none'}`}
      >
        <div className="absolute top-2 left-2 text-[8px] font-black uppercase opacity-40">{table.id}</div>
        <Users size={20} className="mb-2" />
        <span className="text-xs font-black uppercase tracking-widest">{table.name}</span>
        <span className="text-[10px] font-bold mt-1 opacity-60">CAP: {table.cap} PAX</span>
        
        {table.status === 'reserved' && (
          <div className="absolute -top-3 -right-3 bg-brand-dark text-white p-1 border-2 border-brand-yellow rotate-12">
            <Star size={10} className="fill-brand-yellow" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-10">
      {/* Header & Floor Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-brand-coral mb-2">
            <Layout size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Planificación Espacial</span>
          </div>
          <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Plano de Mesas</h2>
        </div>

        <div className="flex bg-white border-4 border-brand-dark p-2 shadow-[8px_8px_0px_#1a202c]">
          <button 
            onClick={() => setActiveFloor(2)}
            className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-all ${activeFloor === 2 ? 'bg-brand-teal text-white' : 'text-brand-dark hover:bg-brand-cream'}`}
          >
            PISO 2: VIP
          </button>
          <button 
            onClick={() => setActiveFloor(3)}
            className={`px-6 py-3 font-black text-xs uppercase tracking-widest transition-all ${activeFloor === 3 ? 'bg-brand-coral text-white' : 'text-brand-dark hover:bg-brand-cream'}`}
          >
            PISO 3: TERRAZA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Main Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="melao-card bg-brand-cream/30 p-10 min-h-[600px] flex items-center justify-center relative overflow-hidden">
             {/* Decorative Grid */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 relative z-10 w-full max-w-4xl">
                {(activeFloor === 2 ? TABLES_PISO_2 : TABLES_PISO_3).map(renderTable)}
             </div>

             {/* Floor Label */}
             <div className="absolute bottom-6 right-6 flex items-center gap-3">
                <MapPin size={16} className="text-brand-dark" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark opacity-40">
                    {activeFloor === 2 ? 'Ubicación: Zona VIP Karaoke' : 'Ubicación: Terraza Social Club'}
                </span>
             </div>
          </div>
        </div>

        {/* Sidebar Stats & Legend */}
        <div className="space-y-6">
          <div className="melao-card p-6 bg-white">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 border-b-2 border-brand-dark pb-2">Estado Real</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-dark/60 uppercase">Capacidad Total</span>
                <span className="text-sm font-black text-brand-dark">124 PAX</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-dark/60 uppercase">Mesas Libres</span>
                <span className="text-sm font-black text-brand-teal">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-brand-dark/60 uppercase">Ocupación %</span>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-3 border-2 border-brand-dark bg-white overflow-hidden">
                    <div className="h-full bg-brand-coral" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs font-black text-brand-dark text-right">65%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="melao-card p-6 bg-brand-dark text-white">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 border-b-2 border-white/10 pb-2">Leyenda</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-2 border-white bg-white"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Disponible</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-2 border-white bg-brand-yellow"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Reservada</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-2 border-white bg-brand-coral"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">En Uso</span>
              </div>
            </div>
          </div>

          <div className="melao-card p-6 bg-brand-yellow text-brand-dark border-brand-dark">
            <div className="flex items-center gap-2 mb-2">
                <Info size={16} />
                <h4 className="text-[10px] font-black uppercase">Nota del Club</h4>
            </div>
            <p className="text-[10px] font-bold leading-tight">
                "El área VIP Karaoke (Piso 2) siempre tiene prioridad para reservas de más de 10 personas."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

