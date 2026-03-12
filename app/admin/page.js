"use client";

import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, XCircle, MoreVertical, Edit2, Check, X } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Listen to real-time updates from Firebase
    const q = query(collection(db, "reservas"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resData = [];
      querySnapshot.forEach((doc) => {
        resData.push({ id: doc.id, ...doc.data() });
      });
      setReservations(resData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const resRef = doc(db, "reservas", id);
      await updateDoc(resRef, { estado: newStatus });
    } catch (error) {
      console.error("Error actuailzando estado:", error);
      alert("Error al actualizar la reserva.");
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmada':
        return <span className="px-2.5 py-1 flex items-center gap-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle size={12}/> Confirmada</span>;
      case 'llego':
        return <span className="px-2.5 py-1 flex items-center gap-1.5 rounded-full text-xs font-medium bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20"><Users size={12}/> En el Bar</span>;
      case 'cancelada':
        return <span className="px-2.5 py-1 flex items-center gap-1.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20"><XCircle size={12}/> Cancelada</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300">Pendiente</span>;
    }
  };

  const openWhatsApp = (res) => {
    const text = `Hola ${res.nombre}, te saludamos de Boliroom 🍹. Confirmamos tu reserva para hoy ${res.fecha} a las ${res.hora} para ${res.personas} personas. ¡Te esperamos!`;
    window.open(`https://wa.me/57${res.telefono}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const reservadasHoy = reservations.filter(r => r.fecha === today && r.estado !== 'cancelada');
  const ventaProyectada = reservadasHoy.length * 200000;

  return (
    <div className="space-y-6">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Confirmadas Hoy</p>
          <h3 className="text-3xl font-bold text-white mb-1">
            {reservations.filter(r => r.fecha === today && (r.estado === 'confirmada' || r.estado === 'llego')).length}
          </h3>
          <p className="text-[10px] text-emerald-500 font-medium">Reservas activas</p>
        </div>
        
        <div className="glass-panel p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock size={48} className="text-amber-500" />
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total para Hoy</p>
          <h3 className="text-3xl font-bold text-white mb-1">
            {reservations.filter(r => r.fecha === today).length}
          </h3>
          <p className="text-[10px] text-slate-500 font-medium">Incluye canceladas</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users size={48} className="text-brand-cyan" />
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Personas Esperadas</p>
          <h3 className="text-3xl font-bold text-white mb-1">
            {reservadasHoy.reduce((acc, curr) => acc + curr.personas, 0)}
          </h3>
          <p className="text-[10px] text-brand-cyan font-medium">Aforo total proyectado</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-brand-purple/20 bg-brand-purple/5 relative overflow-hidden group">
          <p className="text-xs font-bold text-brand-purple uppercase tracking-widest mb-1">Venta Proyectada</p>
          <h3 className="text-3xl font-bold text-white mb-1">
            ${ventaProyectada.toLocaleString('es-CO')}
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">Mínimo consumible ($200k/res)</p>
        </div>
      </div>

      {/* Main Content: Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl overflow-hidden border border-white/5">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h2 className="text-lg font-bold text-white">Últimas Reservas</h2>
            <button 
              onClick={() => window.location.href = '/admin/reservas'}
              className="text-xs font-bold text-brand-cyan hover:text-white transition-colors uppercase tracking-widest"
            >
              Ver Todas →
            </button>
          </div>
          <div className="p-4 space-y-3">
            {reservations.slice(0, 5).map((res) => (
              <div key={res.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-purple/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-white font-bold text-xl shadow-lg ring-2 ring-white/10 group-hover:scale-105 transition-transform">
                    {res.nombre[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition-colors">{res.nombre}</h4>
                    <p className="text-[10px] text-slate-500 uppercase font-medium tracking-tighter">{res.fecha} • {res.hora}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-white">{res.personas} pax</div>
                    {getStatusBadge(res.estado)}
                  </div>
                  {res.estado === 'confirmada' && (
                    <button 
                      onClick={() => openWhatsApp(res)}
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20 shadow-sm"
                      title="Confirmar por WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-white/5 space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tight">Acciones Rápidas</h2>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-900/50 hover:bg-brand-purple/20 border border-white/5 tracking-tight transition-all">
              <span className="text-sm font-medium text-slate-300">Ver Plano de Mesas</span>
              <Edit2 size={16} className="text-brand-purple" />
            </button>
            
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">Tip de Gestión</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                "Usa el botón de WhatsApp para reconfirmar las reservas del día. Un mensaje directo reduce el 'No-Show' en un 40%."
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-4">
                <span>Estado del Sistema</span>
                <span className="text-emerald-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  En Línea
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
