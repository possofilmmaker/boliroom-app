"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  User, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft 
} from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import ReservationPolicyModal from "@/components/ReservationPolicyModal";

function ReservaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventoParam = searchParams.get("evento");
  const stepParam = parseInt(searchParams.get("step")) || 1;
  
  const [step, setStep] = useState(stepParam);
  const [loading, setLoading] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(true);
  const [ocupacion, setOcupacion] = useState({});
  const [formData, setFormData] = useState({
    ambiente: "",
    fecha: "",
    hora: "",
    personas: 2,
    nombre: "",
    telefono: "",
    correo: "",
    evento: eventoParam || ""
  });
  
  const [ticketId, setTicketId] = useState("");
  const [qrPattern, setQrPattern] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const horasDisponibles = ["14:00", "16:00", "18:00", "20:00", "22:00"];

  useEffect(() => {
    setIsMounted(true);
    setTicketId(Math.floor(Math.random() * 9000) + 1000);
    setQrPattern(Array.from({ length: 36 }).map(() => Math.random() > 0.4));
  }, []);

  const ambientes = [
    {
      id: "vip_karaoke",
      titulo: "Salones VIP Karaoke",
      piso: "Piso 2",
      descripcion: "Salones privados con TV, Karaoke y Bolirana propia. Ideal para parches que quieren privacidad.",
      features: ["TV Karaoke", "Bolirana Privada", "Juegos de Mesa"],
      capacidadMax: 18,
      imagen: "/vip_room.png"
    },
    {
      id: "terraza",
      titulo: "Terraza Boli-Roof",
      piso: "Piso 3",
      descripcion: "Ambiente social al aire libre con vista a la ciudad. 3 boliranas y servicio de restaurante/bar.",
      features: ["Al Aire Libre", "3 Boliranas", "Vista 360°"],
      capacidadMax: 10,
      imagen: "/terrace.png"
    },
    {
      id: "empresarial",
      titulo: "Eventos Empresariales",
      piso: "Boliroom Corporativo",
      descripcion: "¿Planeas un evento de empresa? Ofrecemos planes a medida, catering y privacidad total para tu equipo.",
      features: ["Planes a Medida", "Privacidad Total", "Catering Premium"],
      isExternal: true,
      whatsappMsg: "¡Hola Boliroom! 🏢 Estoy interesado en una reserva empresarial o evento corporativo.",
      imagen: "/images/mesavip.jpg" 
    }
  ];

  // Sincronizar estado local con URL
  useEffect(() => {
    if (stepParam !== step) {
      setStep(stepParam);
    }
  }, [stepParam, step]);

  // Protección Ticket Vacío
  useEffect(() => {
    if (step === 4 && (!formData.nombre || !formData.fecha)) {
      navigateToStep(1);
    }
  }, [step, formData.nombre, formData.fecha]);

  useEffect(() => {
    async function consultarOcupacion() {
      if (!formData.fecha || !formData.ambiente) return;
      try {
        const q = query(
          collection(db, "reservas"), 
          where("fecha", "==", formData.fecha),
          where("ambiente", "==", formData.ambiente)
        );
        const querySnapshot = await getDocs(q);
        const conteo = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.hora) {
            const peso = (data.ambiente === 'vip_karaoke' && data.personas > 8) ? 2 : 1;
            conteo[data.hora] = (conteo[data.hora] || 0) + peso;
          }
        });
        setOcupacion(conteo);
      } catch (error) {
        console.error("Error consultando ocupación:", error);
      }
    }
    consultarOcupacion();
  }, [formData.fecha, formData.ambiente]);

  const navigateToStep = (nextStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", nextStep);
    router.push(`/reserva?${params.toString()}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaxChange = (increment) => {
    setFormData(prev => {
      const max = prev.ambiente === 'vip_karaoke' ? 18 : 12;
      const newPax = prev.personas + increment;
      if (newPax >= 1 && newPax <= max) return { ...prev, personas: newPax };
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "reservas"), {
        ...formData,
        estado: "confirmada",
        label_reserva: formData.ambiente === 'vip_karaoke' 
          ? (formData.personas > 8 ? "VIP UNIFICADO (A+B)" : "SALÓN VIP") 
          : "TERRAZA",
        createdAt: new Date().toISOString()
      });

      try {
        await fetch("/api/calendar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } catch (calError) {
        console.error("Calendar Error:", calError);
      }
      navigateToStep(4);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear la reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto min-h-screen">
      {/* Progress */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-10 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'bg-brand-cyan text-brand-darker' : 'bg-slate-800 text-slate-600'}`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-px mx-2 ${step > s ? 'bg-brand-cyan' : 'bg-slate-800'}`}></div>}
            </div>
          ))}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-500">
           <div className="text-center mb-8">
              <h2 className="text-3xl font-black italic text-white tracking-tighter uppercase mb-2">Elige tu <span className="text-brand-cyan">Ambiente</span></h2>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">¿Dónde quieres parchar hoy?</p>
           </div>
           <div className="grid grid-cols-1 gap-6">
              {ambientes.map((amb) => (
                <button
                  key={amb.id}
                  onClick={() => {
                    if (amb.isExternal) {
                      window.open(`https://wa.me/573000000000?text=${encodeURIComponent(amb.whatsappMsg)}`, '_blank');
                    } else {
                      setFormData(prev => ({ ...prev, ambiente: amb.id }));
                      navigateToStep(2);
                    }
                  }}
                  className="group relative h-72 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-purple/50 transition-all duration-500 text-left"
                >
                  <img src={amb.imagen} alt={amb.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-brand-purple text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">{amb.piso}</span>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">{amb.titulo}</h3>
                    <p className="text-slate-300 text-xs mb-4 line-clamp-2 leading-relaxed">{amb.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                       {amb.features.map(f => (
                         <span key={f} className="bg-white/10 backdrop-blur-md text-[8px] text-white font-bold px-2 py-1 rounded-md uppercase border border-white/5">{f}</span>
                       ))}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="text-white" size={20} />
                  </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <button type="button" onClick={() => navigateToStep(1)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4">
            <ArrowLeft size={16} /> Cambiar Ambiente
          </button>
          <section>
             <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-4 flex items-center gap-2"><Users className="text-brand-purple" size={18} /> ¿Cuántas personas?</h3>
             <div className="glass-panel p-6 rounded-3xl flex items-center justify-between border border-white/5">
                <button type="button" onClick={() => handlePaxChange(-1)} className="w-12 h-12 rounded-xl bg-slate-800 text-white font-black">-</button>
                <div className="text-center">
                  <span className="text-4xl font-black text-white">{formData.personas}</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">Asistentes</p>
                </div>
                <button type="button" onClick={() => handlePaxChange(1)} className="w-12 h-12 rounded-xl bg-brand-cyan text-brand-darker font-black">+</button>
             </div>
          </section>
          <section>
             <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-4 flex items-center gap-2"><CalendarIcon className="text-brand-purple" size={18} /> Elige la Fecha</h3>
             <input type="date" required min={new Date().toISOString().split("T")[0]} value={formData.fecha} onChange={handleChange} name="fecha" className="w-full glass-panel p-5 rounded-2xl text-white border border-white/5 focus:border-brand-cyan/50 focus:outline-none transition-all" />
          </section>
          {formData.fecha && (
            <section className="animate-in fade-in duration-500">
               <h3 className="text-lg font-black text-white italic uppercase tracking-tighter mb-4 flex items-center gap-2"><Clock className="text-brand-purple" size={18} /> Turno (2 Horas)</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {horasDisponibles.map((h) => (
                    <button
                      key={h}
                      type="button"
                      disabled={(ocupacion[h] || 0) >= (formData.ambiente === 'vip_karaoke' ? 2 : 8)}
                      onClick={() => setFormData(p => ({...p, hora: h}))}
                      className={`py-4 rounded-2xl text-sm font-black transition-all border ${formData.hora === h ? 'bg-brand-cyan text-brand-darker' : 'bg-slate-800/40 text-slate-300'}`}
                    >
                       {h}
                    </button>
                  ))}
               </div>
            </section>
          )}
          <button type="button" disabled={!formData.fecha || !formData.hora} onClick={() => navigateToStep(3)} className="w-full neon-button py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-brand-purple/20">Siguiente Paso</button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <button type="button" onClick={() => navigateToStep(2)} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4"><ArrowLeft size={16} /> Volver</button>
          <div className="text-center mb-6">
             <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">¿A nombre de quién?</h2>
          </div>
          <div className="space-y-4">
             <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" name="nombre" required placeholder="Nombre para la reserva" value={formData.nombre} onChange={handleChange} className="w-full glass-panel pl-14 pr-5 py-5 rounded-2xl text-white border focus:border-brand-cyan/50 outline-none" />
             </div>
             <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="tel" name="telefono" required placeholder="WhatsApp de contacto" value={formData.telefono} onChange={handleChange} className="w-full glass-panel pl-14 pr-5 py-5 rounded-2xl text-white border focus:border-brand-cyan/50 outline-none" />
             </div>
          </div>
          <button type="button" disabled={loading} onClick={handleSubmit} className="w-full neon-button py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-2xl shadow-brand-purple/40">
            {loading ? "Procesando..." : "Realizar Reserva 🔥"}
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="animate-in zoom-in-95 duration-500 py-4">
          <div className="bg-white text-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
             <div className={`p-8 text-center text-white relative ${formData.ambiente === 'vip_karaoke' ? 'bg-brand-purple' : 'bg-brand-cyan'}`}>
                <div className="relative z-10 flex flex-col items-center">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4"><CheckCircle2 size={40} className="text-white" /></div>
                   <h2 className="text-2xl font-black tracking-tighter uppercase italic">{formData.ambiente === 'vip_karaoke' ? 'PASS VIP' : 'PASS TERRAZA'}</h2>
                   <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Boliroom Bogotá • Reserva Confirmada</p>
                </div>
             </div>
             <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                   <div><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Invitado</p><p className="font-black text-sm uppercase">{formData.nombre}</p></div>
                   <div className="text-right"><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Ambiente</p><p className="font-black text-sm uppercase">{formData.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - ROOF'}</p></div>
                   <div><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Fecha & Hora</p><p className="font-black text-sm uppercase">{formData.fecha} • {formData.hora}</p></div>
                   <div className="text-right"><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Invitados</p><p className="font-black text-sm uppercase">{formData.personas} Pax</p></div>
                </div>
                <div className="pt-6 border-t border-dashed border-slate-200 flex flex-col items-center">
                   <div className="w-24 h-24 grid grid-cols-6 grid-rows-6 gap-1 opacity-80 mb-4">
                      {qrPattern.map((isBlack, i) => (
                        <div key={i} className={`rounded-[2px] ${isBlack ? 'bg-slate-800' : 'bg-transparent'}`}></div>
                      ))}
                   </div>
                   <p className="text-[9px] font-mono text-slate-400 uppercase">#BLRM-{ticketId}</p>
                </div>
             </div>
             <div className="bg-slate-50 p-6 border-t border-slate-100 italic">
                <p className="text-[9px] text-slate-400 font-bold text-center leading-relaxed">* Tolerancia 15 min. Consumo min $200k consumibles por mesa.</p>
             </div>
          </div>
          <div className="mt-8 space-y-4">
             <button type="button" onClick={() => {
                const text = `¡Hola Boliroom 🍹! Acabo de reservar en ${formData.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - TERRAZA'}.\n👤 Nombre: ${formData.nombre}\n📅 Fecha: ${formData.fecha}\n⏰ Hora: ${formData.hora}\n👥 Pax: ${formData.personas}`;
                window.open(`https://wa.me/573000000000?text=${encodeURIComponent(text)}`, '_blank');
             }} className="w-full bg-[#25D366] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl">REPORTAR EN WHATSAPP</button>
             <button type="button" onClick={() => window.location.href = '/'} className="w-full text-slate-500 font-black text-[10px] uppercase tracking-widest text-center py-4">Finalizar y Volver</button>
          </div>
        </div>
      )}

      <footer className="mt-12 text-center opacity-40">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Boliroom Bogotá © 2026</p>
      </footer>

      <ReservationPolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
    </main>
  );
}

export default function ReservaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white italic">Cargando Boliroom...</div>}>
      <ReservaForm />
    </Suspense>
  );
}
