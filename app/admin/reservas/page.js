"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Check, X, CheckCircle, XCircle, Calendar, Phone, MapPin } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function ReservasPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7)); // Formato YYYY-MM

  useEffect(() => {
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
      console.error("Error updating status:", error);
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
    const text = `¡Hola ${res.nombre}! 🥂 Te saludamos de Melao Social Club. Confirmamos tu reserva para hoy ${res.fecha} a las ${res.hora} para ${res.personas} personas. ¡Te esperamos! ✨`;
    window.open(`https://wa.me/57${res.telefono}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-10">
      <div className="melao-card bg-white overflow-hidden">
        <div className="p-8 border-b-2 border-brand-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-brand-cream/30">
          <div>
            <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">Historial de Reservas</h2>
            <p className="text-[10px] text-brand-dark/40 font-black uppercase tracking-widest mt-1">Gestión y control de aforo</p>
          </div>
          <div className="flex items-center gap-4 bg-white border-2 border-brand-dark px-4 py-2 shadow-[4px_4px_0px_#1a202c]">
            <Calendar size={16} className="text-brand-coral" />
            <span className="text-[10px] text-brand-dark font-black uppercase tracking-widest">Ver Mes:</span>
            <input 
              type="month" 
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="bg-transparent border-none text-brand-dark text-xs font-black uppercase focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Cliente</th>
                <th className="px-8 py-5">Fecha & Hora</th>
                <th className="px-8 py-5">Personas</th>
                <th className="px-8 py-5">Ubicación</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-brand-dark/5">
              {loading ? (
                <tr><td colSpan="6" className="px-8 py-16 text-center text-brand-dark/40 font-black uppercase tracking-widest text-xs">Sincronizando con Melao...</td></tr>
              ) : reservations.filter(r => !filterMonth || r.fecha.startsWith(filterMonth)).length === 0 ? (
                <tr><td colSpan="6" className="px-8 py-16 text-center text-brand-dark/40 font-black uppercase tracking-widest text-xs">No hay registros para este período.</td></tr>
              ) : (
                reservations
                  .filter(r => !filterMonth || r.fecha.startsWith(filterMonth))
                  .map((res) => (
                  <tr key={res.id} className="hover:bg-brand-cream/20 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="font-black text-brand-dark uppercase tracking-tight text-sm">{res.nombre}</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-brand-dark/40 font-bold mt-1">
                        <Phone size={10} />
                        {res.telefono}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-xs font-black text-brand-dark/60 uppercase">{res.fecha}</div>
                      <div className="text-xs font-black text-brand-coral mt-1 italic tracking-widest">{res.hora}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center justify-center w-10 h-10 border-2 border-brand-dark bg-brand-yellow text-brand-dark font-black text-sm shadow-[2px_2px_0px_#1a202c]">
                        {res.personas}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-teal">
                        <MapPin size={12} />
                        {res.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - TERRAZA'}
                      </div>
                    </td>
                    <td className="px-8 py-6">{getStatusBadge(res.estado)}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-3">
                        {res.estado === 'confirmada' && (
                          <>
                            <button 
                              onClick={() => openWhatsApp(res)}
                              className="p-3 border-2 border-brand-dark bg-brand-teal text-white shadow-[2px_2px_0px_#1a202c] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
                              title="WhatsApp"
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={() => updateStatus(res.id, 'llego')} 
                              className="px-4 py-2 border-2 border-brand-dark bg-brand-coral text-white font-black text-[9px] uppercase tracking-widest shadow-[2px_2px_0px_#1a202c] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
                            >
                              MARCAR LLEGADA
                            </button>
                          </>
                        )}
                        {res.estado === 'pendiente' && (
                          <button 
                            onClick={() => updateStatus(res.id, 'confirmada')} 
                            className="px-4 py-2 border-2 border-brand-dark bg-brand-teal text-white font-black text-[9px] uppercase tracking-widest shadow-[2px_2px_0px_#1a202c] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-none transition-all"
                          >
                            CONFIRMAR
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

