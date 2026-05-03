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
      titulo: "VIP Suites & Gaming",
      piso: "Piso 2",
      descripcion: "Salones privados con TV Karaoke y Bolirana propia. Ideal para parches que quieren exclusividad.",
      features: ["Karaoke Pro", "Bolirana Privada", "VIP Lounge"],
      capacidadMax: 18,
      imagen: "/images/salon.jpg"
    },
    {
      id: "terraza",
      titulo: "Melao-Roof Terrace",
      piso: "Piso 3",
      descripcion: "Nuestra terraza al aire libre. 3 boliranas pro y el mejor ambiente social de Chapinero.",
      features: ["Al Aire Libre", "Bolirana Pro", "City View"],
      capacidadMax: 12,
      imagen: "/images/terraza.jpg"
    },
    {
      id: "empresarial",
      titulo: "Eventos Corporativos",
      piso: "Melao Corporate",
      descripcion: "¿Evento de empresa? Ofrecemos planes a medida, catering premium y privacidad total.",
      features: ["Catering", "Privacidad", "Eventos Pro"],
      isExternal: true,
      whatsappMsg: "¡Hola Melao! 🏢 Estoy interesado en una reserva empresarial.",
      imagen: "/images/mesavip.jpg" 
    }
  ];

  // Sincronizar estado local con URL
  useEffect(() => {
    if (stepParam !== step) {
      setStep(stepParam);
    }
  }, [stepParam, step]);

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
      
      const message = `¡Hola ${formData.nombre}! 🍹 Gracias por elegir Melao Social Club para tu parche. 🎳\n\nConfirmamos tu solicitud de reserva:\n📅 Fecha: ${formData.fecha}\n⏰ Hora: ${formData.hora}\n👥 Pax: ${formData.personas}\n📍 Ambiente: ${formData.ambiente === 'vip_karaoke' ? 'VIP Suites & Gaming' : 'Melao-Roof Terrace'}\n\nPara asegurar tu mesa, por favor realiza el abono de $100.000 COP (consumibles):\n\n🏦 BANCOLOMBIA (Ahorros)\n🔢 Cuenta: 123-456789-01\n🆔 Nit: 900.000.000-1\n\nEnvíanos el comprobante por este medio. ¡Nos vemos pronto! 🔥`;
      
      const whatsappUrl = `https://wa.me/573138139634?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      navigateToStep(4);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear la reserva.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-24 max-w-2xl mx-auto min-h-screen bg-brand-cream">
      {/* Progress */}
      {step < 4 && (
        <div className="flex justify-between items-center mb-16 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 border-2 border-brand-dark flex items-center justify-center text-xs font-black transition-all ${step >= s ? 'bg-brand-coral text-white' : 'bg-white text-brand-dark/30'}`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-brand-dark' : 'bg-brand-dark/10'}`}></div>}
            </div>
          ))}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter mb-2">ELIGE TU <span className="text-brand-coral">AMBIENTE</span></h2>
              <p className="text-brand-teal font-black uppercase tracking-widest text-[10px]">¿Donde empieza el plan hoy?</p>
           </div>
           <div className="grid grid-cols-1 gap-8">
              {ambientes.map((amb) => (
                <button
                  key={amb.id}
                  onClick={() => {
                    if (amb.isExternal) {
                      window.open(`https://wa.me/573138139634?text=${encodeURIComponent(amb.whatsappMsg)}`, '_blank');
                    } else {
                      setFormData(prev => ({ ...prev, ambiente: amb.id }));
                      navigateToStep(2);
                    }
                  }}
                  className="melao-card group relative h-80 overflow-hidden"
                >
                  <img src={amb.imagen} alt={amb.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-left">
                    <span className="bg-brand-yellow text-brand-dark text-[9px] font-black px-3 py-1 border-2 border-brand-dark uppercase tracking-widest mb-3 inline-block">{amb.piso}</span>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{amb.titulo}</h3>
                    <p className="text-brand-cream/80 text-xs mb-4 line-clamp-2 font-medium leading-relaxed">{amb.descripcion}</p>
                    <div className="flex flex-wrap gap-2">
                       {amb.features.map(f => (
                         <span key={f} className="bg-white/10 backdrop-blur-md text-[8px] text-white font-bold px-3 py-1 rounded-full uppercase border border-white/20">{f}</span>
                       ))}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white border-2 border-brand-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <ChevronRight className="text-brand-dark" size={24} />
                  </div>
                </button>
              ))}
           </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
          <button type="button" onClick={() => navigateToStep(1)} className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={16} /> Cambiar Ambiente
          </button>
          
          <div className="space-y-12">
            <section>
               <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-6 flex items-center gap-3">
                 <Users className="text-brand-coral" size={24} /> ¿Cuántas personas?
               </h3>
               <div className="melao-card p-8 flex items-center justify-between">
                  <button type="button" onClick={() => handlePaxChange(-1)} className="w-14 h-14 border-2 border-brand-dark bg-white font-black text-xl hover:bg-brand-cream active:bg-brand-yellow transition-colors">-</button>
                  <div className="text-center">
                    <span className="text-5xl font-black text-brand-dark">{formData.personas}</span>
                    <p className="text-[10px] text-brand-teal uppercase font-black tracking-widest mt-1">Pax</p>
                  </div>
                  <button type="button" onClick={() => handlePaxChange(1)} className="w-14 h-14 border-2 border-brand-dark bg-brand-yellow font-black text-xl hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">+</button>
               </div>
            </section>

            <section>
               <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-6 flex items-center gap-3">
                 <CalendarIcon className="text-brand-coral" size={24} /> ¿Cuándo vienen?
               </h3>
               <input 
                 type="date" 
                 required 
                 min={new Date().toISOString().split("T")[0]} 
                 value={formData.fecha} 
                 onChange={handleChange} 
                 name="fecha" 
                 className="w-full melao-card p-6 text-brand-dark font-black uppercase tracking-widest focus:outline-none" 
               />
            </section>

            {formData.fecha && (
              <section className="animate-in fade-in duration-500">
                 <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-6 flex items-center gap-3">
                   <Clock className="text-brand-coral" size={24} /> Turno (2 Horas)
                 </h3>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {horasDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        disabled={(ocupacion[h] || 0) >= (formData.ambiente === 'vip_karaoke' ? 2 : 8)}
                        onClick={() => setFormData(p => ({...p, hora: h}))}
                        className={`p-5 font-black uppercase tracking-widest transition-all border-2 border-brand-dark ${formData.hora === h ? 'bg-brand-coral text-white shadow-[4px_4px_0px_#1a202c] translate-x-[-2px] translate-y-[-2px]' : 'bg-white text-brand-dark hover:bg-brand-cream'}`}
                      >
                         {h}
                      </button>
                    ))}
                 </div>
              </section>
            )}
          </div>

          <button 
            type="button" 
            disabled={!formData.fecha || !formData.hora} 
            onClick={() => navigateToStep(3)} 
            className="w-full melao-button-primary py-6 rounded-2xl text-lg disabled:opacity-30 disabled:pointer-events-none"
          >
            Siguiente Paso
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
          <button type="button" onClick={() => navigateToStep(2)} className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-dark transition-colors text-xs font-black uppercase tracking-widest"><ArrowLeft size={16} /> Volver</button>
          
          <div className="text-center mb-12">
             <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">¿A NOMBRE DE <span className="text-brand-coral">QUIÉN?</span></h2>
             <p className="text-brand-teal font-black uppercase tracking-widest text-[10px] mt-2">Necesitamos tus datos para el ticket</p>
          </div>
          
          <div className="space-y-6">
             <div className="relative">
                <User className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/30" size={24} />
                <input 
                  type="text" 
                  name="nombre" 
                  required 
                  placeholder="TU NOMBRE COMPLETO" 
                  value={formData.nombre} 
                  onChange={handleChange} 
                  className="w-full melao-card pl-16 pr-6 py-6 text-brand-dark font-black uppercase tracking-widest outline-none" 
                />
             </div>
             <div className="relative">
                <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-dark/30" size={24} />
                <input 
                  type="tel" 
                  name="telefono" 
                  required 
                  placeholder="WHATSAPP DE CONTACTO" 
                  value={formData.telefono} 
                  onChange={handleChange} 
                  className="w-full melao-card pl-16 pr-6 py-6 text-brand-dark font-black uppercase tracking-widest outline-none" 
                />
             </div>
          </div>
          
          <button 
            type="button" 
            disabled={loading} 
            onClick={handleSubmit} 
            className="w-full melao-button-primary py-6 rounded-2xl text-lg"
          >
            {loading ? "GENERANDO..." : "REALIZAR RESERVA 🔥"}
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="animate-in zoom-in-95 duration-500 py-4 space-y-8">
          <div className="bg-white border-4 border-brand-dark rounded-3xl overflow-hidden shadow-[12px_12px_0px_#1a202c] relative">
             <div className={`p-10 text-center text-white border-b-4 border-brand-dark ${formData.ambiente === 'vip_karaoke' ? 'bg-brand-coral' : 'bg-brand-teal'}`}>
                <div className="flex flex-col items-center">
                   <div className="w-20 h-20 bg-white border-4 border-brand-dark flex items-center justify-center mb-6 rotate-[-3deg]">
                     <CheckCircle2 size={48} className="text-brand-dark" />
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2">RESREVA REGISTRADA</h2>
                   <p className="text-white font-black text-[10px] uppercase tracking-[0.2em]">Melao Social Club • Bogotá</p>
                </div>
             </div>
             
             <div className="p-10 space-y-10">
                <div className="grid grid-cols-2 gap-10">
                   <div>
                     <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-2">Invitado</p>
                     <p className="font-black text-lg text-brand-dark uppercase leading-none">{formData.nombre}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-2">Ambiente</p>
                     <p className="font-black text-lg text-brand-dark uppercase leading-none">{formData.ambiente === 'vip_karaoke' ? 'PISO 2 - VIP' : 'PISO 3 - ROOF'}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-2">Fecha & Hora</p>
                     <p className="font-black text-lg text-brand-dark uppercase leading-none">{formData.fecha} • {formData.hora}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-2">Pax</p>
                     <p className="font-black text-lg text-brand-dark uppercase leading-none">{formData.personas} Personas</p>
                   </div>
                </div>

                {/* Bancolombia Info */}
                <div className="p-8 bg-brand-cream border-2 border-brand-dark border-dashed space-y-4">
                   <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-coral">
                      <Sparkles size={16} /> Instrucciones de Abono
                   </div>
                   <p className="text-sm text-brand-dark/70 font-bold leading-relaxed">
                     Para asegurar tu mesa, realiza el abono de <span className="text-brand-dark font-black">$100.000 COP</span>:
                   </p>
                   <div className="bg-white p-5 border-2 border-brand-dark">
                      <p className="text-lg font-black text-brand-dark">CUENTA: 123-456789-01</p>
                      <p className="text-[10px] text-brand-teal uppercase font-black tracking-widest">Ahorros Bancolombia • Nit: 900.000.000-1</p>
                   </div>
                </div>

                <div className="pt-10 border-t-2 border-brand-dark border-dashed flex flex-col items-center">
                   <div className="w-32 h-32 grid grid-cols-6 grid-rows-6 gap-1.5 p-3 border-2 border-brand-dark bg-brand-cream">
                      {qrPattern.map((isBlack, i) => (
                        <div key={i} className={`${isBlack ? 'bg-brand-dark' : 'bg-transparent'}`}></div>
                      ))}
                   </div>
                   <p className="text-[10px] font-black text-brand-dark/30 uppercase mt-4 tracking-widest">#MELA-{ticketId}</p>
                </div>
             </div>
             
             <div className="bg-brand-yellow p-6 border-t-4 border-brand-dark text-center">
                <p className="text-[10px] text-brand-dark font-black uppercase tracking-widest">Envía el comprobante por WhatsApp para confirmar</p>
             </div>
          </div>
          
          <div className="space-y-6 pt-4">
             <button 
               type="button" 
               onClick={() => window.location.href = '/'} 
               className="w-full melao-button-secondary py-6 rounded-2xl text-lg"
             >
                VOLVER AL INICIO
             </button>
          </div>
        </div>
      )}

      <footer className="mt-20 text-center opacity-30">
        <p className="text-[10px] text-brand-dark font-black uppercase tracking-widest">Melao Social Club © 2026 • Bogotá</p>
      </footer>

      <ReservationPolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
    </main>
  );
}

export default function ReservaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-cream flex items-center justify-center text-brand-dark font-black uppercase tracking-widest italic">Cargando Melao...</div>}>
      <ReservaForm />
    </Suspense>
  );
}

