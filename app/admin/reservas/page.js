"use client";

import { useState, useEffect } from "react";
import { Users, Clock, Check, X, CheckCircle, XCircle } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-xl overflow-hidden border border-slate-800">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-lg font-semibold text-white">Listado de Reservas</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 uppercase font-bold">Ver Mes:</span>
            <input 
              type="month" 
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-purple"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs text-slate-500 uppercase bg-slate-900/80">
              <tr>
                <th className="px-6 py-4 font-medium">Cliente</th>
                <th className="px-6 py-4 font-medium">Fecha & Hora</th>
                <th className="px-6 py-4 font-medium">Pax</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Cargando...</td></tr>
              ) : reservations.filter(r => !filterMonth || r.fecha.startsWith(filterMonth)).length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No hay reservas para este mes.</td></tr>
              ) : (
                reservations
                  .filter(r => !filterMonth || r.fecha.startsWith(filterMonth))
                  .map((res) => (
                  <tr key={res.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{res.nombre}</div>
                      <div className="text-xs text-slate-500">{res.telefono}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-300">{res.fecha}</div>
                      <div className="font-mono text-brand-cyan">{res.hora}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-300 font-medium">{res.personas}</td>
                    <td className="px-6 py-4">{getStatusBadge(res.estado)}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      {res.estado === 'confirmada' && (
                        <>
                          <button 
                            onClick={() => openWhatsApp(res)}
                            className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all border border-emerald-500/20"
                            title="WhatsApp"
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                          </button>
                          <button onClick={() => updateStatus(res.id, 'llego')} className="text-xs px-2 py-1 bg-brand-purple/20 text-brand-purple hover:bg-brand-purple hover:text-white rounded border border-brand-purple transition">
                            Marcar Llegada
                          </button>
                        </>
                      )}
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
