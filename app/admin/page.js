"use client";

import { useState, useEffect } from "react";
import { Users, CheckCircle, Clock, XCircle, MoreVertical, Edit2, Check, X, Star, TrendingUp, Grid } from "lucide-react";
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
        return <span className="px-3 py-1 flex items-center gap-2 border-2 border-brand-teal bg-brand-teal/10 text-brand-teal text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#085454]"><CheckCircle size={10}/> Confirmada</span>;
      case 'llego':
        return <span className="px-3 py-1 flex items-center gap-2 border-2 border-brand-dark bg-brand-dark text-white text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#f26955]"><Users size={10}/> En el Bar</span>;
      case 'cancelada':
        return <span className="px-3 py-1 flex items-center gap-2 border-2 border-brand-coral bg-brand-coral/10 text-brand-coral text-[9px] font-black uppercase tracking-widest shadow-[2px_2px_0px_#f26955]"><XCircle size={10}/> Cancelada</span>;
      default:
        return <span className="px-3 py-1 border-2 border-brand-dark/20 text-brand-dark/40 text-[9px] font-black uppercase tracking-widest">Pendiente</span>;
    }
  };

  const openWhatsApp = (res) => {
    const text = `¡Hola ${res.nombre}! 🥂 Bienvenido a Melao Social Club. ✨\n\nConfirmamos tu solicitud de reserva para vivir la experiencia:\n📅 Fecha: ${res.fecha}\n⏰ Hora: ${res.hora}\n👥 Pax: ${res.personas}\n📍 Ubicación: ${res.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - TERRAZA'}\n\nPara garantizar tu espacio premium, por favor realiza el abono de $100.000 COP (100% consumibles) a nuestra cuenta oficial:\n\n🏦 BANCOLOMBIA (Ahorros)\n🔢 Cuenta: 123-456789-01\n🆔 Nit: 900.000.000-1\n\nEnvíanos el comprobante por este medio para finalizar tu reserva. ¡Nos vemos en el club! 🍹`;
    window.open(`https://wa.me/57${res.telefono}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const reservadasHoy = reservations.filter(r => r.fecha === today && r.estado !== 'cancelada');
  const ventaProyectada = reservadasHoy.length * 200000;

  return (
    <div className="space-y-10">
      
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="melao-card p-8 bg-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
            <CheckCircle size={80} className="text-brand-teal" />
          </div>
          <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.2em] mb-2">Confirmadas Hoy</p>
          <h3 className="text-4xl font-black text-brand-dark tracking-tighter mb-2">
            {reservations.filter(r => r.fecha === today && (r.estado === 'confirmada' || r.estado === 'llego')).length}
          </h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <p className="text-[9px] text-brand-teal font-black uppercase tracking-widest">Reservas activas</p>
          </div>
        </div>
        
        <div className="melao-card p-8 bg-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity -rotate-12">
            <Clock size={80} className="text-brand-yellow" />
          </div>
          <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.2em] mb-2">Total para Hoy</p>
          <h3 className="text-4xl font-black text-brand-dark tracking-tighter mb-2">
            {reservations.filter(r => r.fecha === today).length}
          </h3>
          <p className="text-[9px] text-brand-dark/40 font-black uppercase tracking-widest">Flujo total esperado</p>
        </div>

        <div className="melao-card p-8 bg-white relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={80} className="text-brand-coral" />
          </div>
          <p className="text-[10px] font-black text-brand-dark/40 uppercase tracking-[0.2em] mb-2">Aforo Proyectado</p>
          <h3 className="text-4xl font-black text-brand-dark tracking-tighter mb-2">
            {reservadasHoy.reduce((acc, curr) => acc + curr.personas, 0)}
          </h3>
          <p className="text-[9px] text-brand-coral font-black uppercase tracking-widest">Personas confirmadas</p>
        </div>

        <div className="melao-card p-8 bg-brand-dark text-white relative overflow-hidden group border-brand-dark">
          <div className="absolute -top-4 -right-4 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp size={80} className="text-brand-yellow" />
          </div>
          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Venta Estimada</p>
          <h3 className="text-4xl font-black text-brand-yellow tracking-tighter mb-2">
            ${ventaProyectada.toLocaleString('es-CO')}
          </h3>
          <p className="text-[9px] text-white/40 font-black uppercase tracking-widest">Ticket min. $200k</p>
        </div>
      </div>

      {/* Main Content: Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 melao-card bg-white overflow-hidden">
          <div className="p-8 border-b-2 border-brand-dark flex justify-between items-center bg-brand-cream/30">
            <div>
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-tighter">Últimas Reservas</h2>
              <p className="text-[9px] text-brand-dark/40 font-black uppercase tracking-widest mt-1">Actividad en tiempo real</p>
            </div>
            <button 
              onClick={() => window.location.href = '/admin/reservas'}
              className="melao-button-secondary py-3 px-6 text-[10px]"
            >
              VER TODO
            </button>
          </div>
          <div className="p-6 space-y-4">
            {reservations.slice(0, 6).map((res) => (
              <div key={res.id} className="flex items-center justify-between p-6 bg-brand-cream/20 border-2 border-brand-dark/5 hover:border-brand-dark transition-all group shadow-sm hover:shadow-[4px_4px_0px_#1a202c]">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 border-2 border-brand-dark bg-brand-coral flex items-center justify-center text-white font-black text-2xl shadow-[3px_3px_0px_#1a202c] group-hover:scale-105 transition-transform italic">
                    {res.nombre[0]}
                  </div>
                  <div>
                    <h4 className="text-base font-black text-brand-dark uppercase tracking-tight group-hover:text-brand-coral transition-colors">{res.nombre}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-[9px] text-brand-dark/40 font-black uppercase tracking-[0.1em]">{res.fecha}</p>
                      <span className="w-1 h-1 rounded-full bg-brand-dark/20"></span>
                      <p className="text-[9px] text-brand-dark/40 font-black uppercase tracking-[0.1em]">{res.hora}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-black text-brand-dark mb-2 uppercase">{res.personas} PAX</div>
                    {getStatusBadge(res.estado)}
                  </div>
                  {res.estado === 'confirmada' && (
                    <button 
                      onClick={() => openWhatsApp(res)}
                      className="p-4 bg-brand-teal text-white border-2 border-brand-dark shadow-[3px_3px_0px_#1a202c] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
                      title="Confirmar por WhatsApp"
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div className="melao-card p-8 bg-brand-teal text-white border-brand-dark">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-6">Acciones Rápidas</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-5 border-2 border-brand-dark bg-white text-brand-dark hover:bg-brand-yellow transition-all font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_#1a202c]">
                <span>Plano de Mesas</span>
                <Grid size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-5 border-2 border-brand-dark bg-white text-brand-dark hover:bg-brand-yellow transition-all font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_#1a202c]">
                <span>Descargar Reporte</span>
                <Edit2 size={16} />
              </button>
            </div>
          </div>
          
          <div className="melao-card p-8 bg-brand-yellow text-brand-dark border-brand-dark">
            <div className="flex items-center gap-3 mb-4">
              <Star size={20} className="fill-brand-dark" />
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Melao Tip</h4>
            </div>
            <p className="text-xs font-bold leading-relaxed">
              "Personaliza tu mensaje de WhatsApp para que el cliente sienta la calidez del Social Club. Un trato premium reduce cancelaciones."
            </p>
          </div>
          
          <div className="pt-6">
            <div className="flex justify-between items-center text-[10px] text-brand-dark/30 font-black uppercase tracking-widest">
              <span>Estado del Sistema</span>
              <span className="text-brand-teal flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                Sincronizado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

