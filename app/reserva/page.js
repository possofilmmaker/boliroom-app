"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Calendar as CalendarIcon, Clock, Users, User, Phone, CheckCircle2, Mail, Info, CalendarDays, Sparkles, Tv, Mic, Target, Wine, ChevronRight, ArrowLeft } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import ReservationPolicyModal from "@/components/ReservationPolicyModal";

function ReservaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventoParam = searchParams.get("evento");
  const stepParam = parseInt(searchParams.get("step")) || 1;
  
  const [step, setStep] = useState(stepParam);

  // Sincronizar estado local con URL cuando cambie el parámetro
  useEffect(() => {
    if (stepParam !== step) {
      setStep(stepParam);
    }
  }, [stepParam]);

  // Función para cambiar de paso actualizando la URL (historial)
  const navigateToStep = (nextStep) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("step", nextStep);
    router.push(`/reserva?${params.toString()}`);
  };
  const [loading, setLoading] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(true);
  const [formData, setFormData] = useState({
    ambiente: "", // 'vip_karaoke' o 'terraza'
    fecha: "",
    hora: "",
    personas: 2,
    nombre: "",
    telefono: "",
    correo: "",
    evento: eventoParam || ""
  });
  const [ocupacion, setOcupacion] = useState({});

  const horasDisponibles = [
    "14:00", "16:00", "18:00", "20:00", "22:00"
  ];

  // Configuración de capacidades por ambiente
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
      capacidadMax: 10, // Por mesa individual en terraza
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
            // En VIP, grupos > 8 ocupan los 2 salones
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
    e.preventDefault();
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
      alert("Error al crear la reserva. Verifica que todos los campos estén llenos.");
    } finally {
      setLoading(false);
    }
  };

  const generateGoogleCalendarLink = () => {
    const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
    const title = encodeURIComponent(`Boliroom - ${formData.nombre} [${formData.ambiente.toUpperCase()}]`);
    const details = encodeURIComponent(`Reserva para ${formData.personas} personas en ${formData.ambiente === 'vip_karaoke' ? 'Salón VIP' : 'Terraza'}.`);
    const dateStr = formData.fecha.replace(/-/g, "");
    const timeParts = formData.hora.split(":");
    const hour = parseInt(timeParts[0]);
    const endTime = `${dateStr}T${(hour + 2).toString().padStart(2, "0")}${timeParts[1]}00Z`;
    return `${baseUrl}&text=${title}&details=${details}&dates=${dateStr}T${hour}${timeParts[1]}00Z/${endTime}`;
  };

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto min-h-screen">
      <form onSubmit={handleSubmit}>
      
      {/* Search Param Banner */}
      {eventoParam && step === 1 && (
        <div className="mb-6 animate-in slide-in-from-top-2">
           <div className="bg-brand-purple/20 border border-brand-purple/30 rounded-2xl p-4 flex items-center gap-3">
              <Sparkles className="text-brand-cyan" size={18} />
              <p className="text-xs text-white uppercase font-black italic tracking-tighter">Reservando para: {eventoParam}</p>
           </div>
        </div>
      )}

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

      {/* Step 1: Ambiente / Experience Selection */}
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
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-brand-purple text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {amb.piso}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">{amb.titulo}</h3>
                    <p className="text-slate-300 text-xs mb-4 line-clamp-2 leading-relaxed">{amb.descripcion}</p>
                    
                    <div className="flex flex-wrap gap-2">
                       {amb.features.map(f => (
                         <span key={f} className="bg-white/10 backdrop-blur-md text-[8px] text-white font-bold px-2 py-1 rounded-md uppercase border border-white/5">
                           {f}
                         </span>
                       ))}
                    </div>
                  </div>
                  
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="text-white" />
                  </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* Step 2: Pax, Date, Time */}
      {step === 2 && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <button 
            type="button"
            onClick={() => navigateToStep(1)} 
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={16} /> Cambiar Ambiente
          </button>

          <section>
             <div className="flex items-center gap-2 mb-4">
                <Users className="text-brand-purple" size={18} />
                <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">¿Cuántas personas?</h3>
             </div>
             <div className="glass-panel p-6 rounded-3xl flex items-center justify-between border border-white/5">
                <button type="button" onClick={() => handlePaxChange(-1)} className="w-12 h-12 rounded-xl bg-slate-800 text-white font-black hover:bg-slate-700 transition-all">-</button>
                <div className="text-center">
                  <span className="text-4xl font-black text-white">{formData.personas}</span>
                  <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">
                    {formData.ambiente === 'vip_karaoke' && formData.personas > 8 ? "Unificando 2 Salones" : "Asistentes"}
                  </p>
                </div>
                <button type="button" onClick={() => handlePaxChange(1)} className="w-12 h-12 rounded-xl bg-brand-cyan text-brand-darker font-black hover:bg-cyan-300 transition-all shadow-lg shadow-brand-cyan/20">+</button>
             </div>
             {formData.ambiente === 'vip_karaoke' && (
               <p className="mt-3 text-[10px] text-slate-500 text-center font-medium italic">
                 * Para grupos mayores a 8 personas unificamos los dos salones VIP automáticamente (Máx 18).
               </p>
             )}
          </section>

          <section>
             <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="text-brand-purple" size={18} />
                <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">Elige la Fecha</h3>
             </div>
             <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.fecha}
                onChange={handleChange}
                name="fecha"
                className="w-full glass-panel p-5 rounded-2xl text-white border border-white/5 focus:border-brand-cyan/50 focus:outline-none transition-all"
              />
          </section>

          {formData.fecha && (
            <section className="animate-in fade-in duration-500">
               <div className="flex items-center gap-2 mb-4">
                  <Clock className="text-brand-purple" size={18} />
                  <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">Turno (2 Horas cada uno)</h3>
               </div>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {horasDisponibles.map((h) => {
                    const totalEspacios = formData.ambiente === 'vip_karaoke' ? 2 : 8; // 2 salones o 8 mesas terraza
                    const ocupados = ocupacion[h] || 0;
                    const cuposDisponibles = totalEspacios - ocupados;
                    
                    // Si el grupo es > 8 en VIP, necesita 2 cupos
                    const cuposNecesarios = (formData.ambiente === 'vip_karaoke' && formData.personas > 8) ? 2 : 1;
                    const estaLleno = cuposDisponibles < cuposNecesarios;
                    
                    const selected = formData.hora === h;
                    return (
                      <button
                        key={h}
                        type="button"
                        disabled={estaLleno}
                        onClick={() => setFormData(p => ({...p, hora: h}))}
                        className={`py-4 rounded-2xl text-sm font-black transition-all border ${
                          estaLleno ? 'bg-slate-900 border-slate-800 text-slate-700 opacity-50 cursor-not-allowed' :
                          selected ? 'bg-brand-cyan border-brand-cyan text-brand-darker shadow-lg shadow-brand-cyan/30 scale-105' :
                          'bg-slate-800/40 border-white/5 text-slate-300 hover:border-brand-cyan/50'
                        }`}
                      >
                         {h}
                         <div className={`text-[8px] uppercase mt-1 ${cuposDisponibles === 1 && !estaLleno ? 'text-red-400 font-black animate-pulse' : 'opacity-40'}`}>
                           {estaLleno ? (cuposDisponibles > 0 ? 'Falta Espacio' : 'Lleno') : cuposDisponibles === 1 ? 'Último Cupo' : `${cuposDisponibles} Libres`}
                         </div>
                      </button>
                    );
                  })}
               </div>
            </section>
          )}

          <button
            type="button"
            disabled={!formData.fecha || !formData.hora}
            onClick={() => navigateToStep(3)}
            className="w-full neon-button py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-brand-purple/20"
          >
            Siguiente Paso
          </button>
        </div>
      )}

      {/* Step 3: Registration */}
      {step === 3 && (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
           <button 
            type="button"
            onClick={() => navigateToStep(2)} 
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="text-center mb-6">
             <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5 mb-4">
                <CheckCircle2 size={16} className="text-brand-cyan" />
                <span className="text-[10px] text-white font-black uppercase tracking-tighter">Resumen: {formData.fecha} @ {formData.hora}</span>
             </div>
             <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">¿A nombre de quién?</h2>
          </div>

          <div className="space-y-4">
             <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="text" name="nombre" required placeholder="Nombre para la reserva" value={formData.nombre} onChange={handleChange} className="w-full glass-panel pl-14 pr-5 py-5 rounded-2xl text-white border border-white/5 focus:border-brand-cyan/50 focus:outline-none transition-all" />
             </div>
             <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input type="tel" name="telefono" required placeholder="WhatsApp de contacto" value={formData.telefono} onChange={handleChange} className="w-full glass-panel pl-14 pr-5 py-5 rounded-2xl text-white border border-white/5 focus:border-brand-cyan/50 focus:outline-none transition-all" />
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full neon-button py-5 rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl shadow-brand-purple/40"
          >
            {loading ? "Procesando..." : "Realizar Reserva 🔥"}
          </button>
        </div>
      )}

      {/* Step 4: Success Ticket */}
      {step === 4 && (
        <div className="animate-in zoom-in-95 duration-500 py-4">
          <div className="bg-white text-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
             <div className={`p-8 text-center text-white relative ${formData.ambiente === 'vip_karaoke' ? 'bg-brand-purple' : 'bg-brand-cyan'}`}>
                <div className="relative z-10 flex flex-col items-center">
                   <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-md">
                      <CheckCircle2 size={40} className="text-white" />
                   </div>
                   <h2 className="text-2xl font-black tracking-tighter uppercase italic">{formData.ambiente === 'vip_karaoke' ? 'PASS VIP' : 'PASS TERRAZA'}</h2>
                   <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Boliroom Bogotá • Reserva Confirmada</p>
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-brand-darker rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-darker rounded-full"></div>
             </div>

             <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                   <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Invitado</p>
                      <p className="font-black text-sm uppercase">{formData.nombre}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Ambiente</p>
                      <p className="font-black text-sm uppercase text-brand-purple">{formData.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - ROOF'}</p>
                   </div>
                   <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Fecha & Hora</p>
                      <p className="font-black text-sm uppercase">{formData.fecha} • {formData.hora}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Invitados</p>
                      <p className="font-black text-sm uppercase">{formData.personas} Pax</p>
                   </div>
                </div>

                <div className="pt-6 border-t border-dashed border-slate-200 flex flex-col items-center">
                   <div className="w-24 h-24 grid grid-cols-6 grid-rows-6 gap-1 opacity-80 mb-4">
                      {Array.from({length:36}).map((_, i) => (
                        <div key={i} className={`rounded-[2px] ${Math.random() > 0.4 ? 'bg-slate-800' : 'bg-transparent'}`}></div>
                      ))}
                   </div>
                   <p className="text-[9px] font-mono text-slate-400 uppercase">#BLRM-{Math.floor(Math.random()*9000)+1000}</p>
                </div>
             </div>

             <div className="bg-slate-50 p-6 border-t border-slate-100 italic">
                <p className="text-[9px] text-slate-400 font-bold text-center leading-relaxed">
                  * Tolerancia 15 min. Consumo min $200k consumibles por mesa. {formData.ambiente === 'vip_karaoke' ? 'Incluye Karaoke y juegos.' : 'Acceso a Terraza social.'}
                </p>
             </div>
          </div>

          <div className="mt-8 space-y-4">
             <button onClick={() => {
                const text = `¡Hola Boliroom 🍹! Acabo de reservar en ${formData.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - TERRAZA'}.\n👤 Nombre: ${formData.nombre}\n📅 Fecha: ${formData.fecha}\n⏰ Hora: ${formData.hora}\n👥 Pax: ${formData.personas}`;
                window.open(`https://wa.me/573000000000?text=${encodeURIComponent(text)}`, '_blank');
             }} className="w-full bg-[#25D366] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl">
                REPORTAR EN WHATSAPP
             </button>
             <button onClick={() => window.location.href = '/'} className="w-full text-slate-500 font-black text-[10px] uppercase tracking-widest text-center py-4">Finalizar y Volver</button>
          </div>
        </div>
      )}

      {/* Footer / Location */}
      <section className="mt-12 text-center opacity-40">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Boliroom Bogotá © 2026</p>
      </section>

      <ReservationPolicyModal 
        isOpen={isPolicyModalOpen} 
        onClose={() => setIsPolicyModalOpen(false)} 
      />
      </form>
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
