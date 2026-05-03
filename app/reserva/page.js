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
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
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
    <main className="min-h-screen melao-nocturnal relative overflow-x-hidden tropical-pattern pb-20 selection:bg-brand-coral selection:text-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-brand-teal/20 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-brand-coral/10 blur-[120px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-yellow/5 blur-[150px] rounded-full -z-10"></div>

      {/* Header / Nav */}
      <nav className="px-6 py-10 max-w-7xl mx-auto flex items-center justify-between relative z-50">
        <Link href="/" className="group flex items-center gap-3 melao-glass px-6 py-3 rounded-full border-white/10 shadow-lg hover:bg-brand-coral hover:border-brand-coral transition-all duration-500">
           <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-white" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Regresar</span>
        </Link>
        <div className="text-right">
           <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">RESERVAS</h1>
           <div className="flex items-center justify-end gap-2">
             <span className="melao-squiggle-coral"></span>
             <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">Melao Social Club</span>
           </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-10">
        {/* Progress */}
        {step < 4 && (
          <div className="flex justify-between items-center mb-24 px-4 relative">
            <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/10 -translate-y-1/2 -z-10"></div>
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-4">
                <div className={`w-14 h-14 rounded-3xl border-2 flex items-center justify-center transition-all duration-700 shadow-2xl ${step >= s ? 'bg-brand-coral border-brand-coral text-white scale-110' : 'bg-brand-teal/40 border-white/10 text-white/20'}`}>
                  {s === 1 && <Sparkles size={24} />}
                  {s === 2 && <CalendarIcon size={24} />}
                  {s === 3 && <User size={24} />}
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors ${step >= s ? 'text-brand-yellow' : 'text-white/20'}`}>
                  {s === 1 ? 'Ambiente' : s === 2 ? 'Fecha' : 'Datos'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="text-center space-y-6">
                <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">
                  ELIGE TU <br/><span className="text-gradient-melao italic">EXPERIENCIA</span>
                </h2>
                <div className="flex justify-center items-center gap-4">
                  <div className="h-[1px] w-12 bg-brand-coral/30"></div>
                  <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.5em]">Melao Curated Spaces</span>
                  <div className="h-[1px] w-12 bg-brand-coral/30"></div>
                </div>
             </div>
             
             <div className="grid grid-cols-1 gap-12">
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
                    className="group relative h-[500px] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl hover:border-brand-coral/50 transition-all duration-700"
                  >
                    <img src={amb.imagen} alt={amb.titulo} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#042D2D] via-[#042D2D]/40 to-transparent"></div>
                    
                    <div className="absolute bottom-12 left-12 right-12 text-left">
                      <div className="inline-flex items-center gap-3 melao-glass px-5 py-2 rounded-full text-[10px] font-black text-brand-yellow border-white/10 uppercase tracking-[0.2em] mb-6">
                        <Sparkles size={14} className="text-brand-coral" />
                        {amb.piso}
                      </div>
                      <h3 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none group-hover:text-brand-coral transition-colors">
                        {amb.titulo}
                      </h3>
                      <p className="text-white/60 text-base mb-10 font-medium leading-relaxed max-w-md">
                        {amb.descripcion}
                      </p>
                      <div className="flex flex-wrap gap-3">
                         {amb.features.map(f => (
                           <span key={f} className="bg-white/5 backdrop-blur-xl text-[10px] text-white font-black px-5 py-2.5 rounded-2xl uppercase border border-white/10 tracking-widest group-hover:bg-brand-teal/40 transition-colors">
                             {f}
                           </span>
                         ))}
                      </div>
                    </div>
                    
                    <div className="absolute top-12 right-12 w-20 h-20 bg-brand-coral rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-8 group-hover:translate-x-0 duration-700 shadow-[0_0_40px_rgba(232,84,58,0.4)]">
                      <ChevronRight className="text-white" size={36} strokeWidth={3} />
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-20 animate-in slide-in-from-right-8 duration-1000 pb-12">
            <section className="space-y-12">
               <div className="flex items-center gap-8 mb-16">
                  <div className="w-20 h-20 bg-brand-coral/10 border border-brand-coral/30 rounded-[2rem] flex items-center justify-center text-brand-coral shadow-[0_0_30px_rgba(232,84,58,0.1)]">
                    <Users size={36} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">EL PARCHE</h3>
                    <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.4em] mt-2">¿Cuántos vienen a vivir Melao?</p>
                  </div>
               </div>
               
               <div className="melao-glass p-12 rounded-[4rem] flex items-center justify-between border-white/5 shadow-2xl">
                  <button type="button" onClick={() => handlePaxChange(-1)} className="w-20 h-20 border border-white/10 bg-white/5 rounded-3xl font-black text-3xl text-white hover:bg-brand-coral hover:border-brand-coral transition-all active:scale-90">-</button>
                  <div className="text-center">
                    <span className="text-9xl font-black text-white tracking-tighter drop-shadow-2xl">{formData.personas}</span>
                    <p className="text-[12px] text-brand-yellow uppercase font-black tracking-[0.5em] mt-2">Integrantes</p>
                  </div>
                  <button type="button" onClick={() => handlePaxChange(1)} className="w-20 h-20 border border-white/10 bg-brand-coral rounded-3xl font-black text-3xl text-white hover:translate-y-[-4px] transition-all active:scale-90 shadow-lg shadow-brand-coral/20">+</button>
               </div>
            </section>

            <section className="space-y-12">
               <div className="flex items-center gap-8 mb-16">
                  <div className="w-20 h-20 bg-brand-teal/20 border border-brand-teal/40 rounded-[2rem] flex items-center justify-center text-brand-teal shadow-[0_0_30px_rgba(8,92,92,0.2)]">
                    <CalendarIcon size={36} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">LA FECHA</h3>
                    <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.4em] mt-2">Reserva tu lugar en la historia</p>
                  </div>
               </div>
               
               <div className="relative group">
                 <input 
                   type="date" 
                   required 
                   min={new Date().toISOString().split("T")[0]} 
                   value={formData.fecha} 
                   onChange={handleChange} 
                   name="fecha" 
                   className="w-full melao-glass p-12 text-2xl text-white font-black uppercase tracking-widest focus:ring-4 focus:ring-brand-coral/20 rounded-[3.5rem] border-white/5 outline-none text-center appearance-none cursor-pointer group-hover:border-white/20 transition-all" 
                 />
                 <div className="absolute inset-0 rounded-[3.5rem] pointer-events-none border border-white/5 group-hover:border-white/20 transition-all"></div>
               </div>
            </section>

            {formData.fecha && (
              <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
                 <div className="flex items-center gap-8 mb-16">
                    <div className="w-20 h-20 bg-brand-yellow/10 border border-brand-yellow/30 rounded-[2rem] flex items-center justify-center text-brand-yellow shadow-[0_0_30px_rgba(245,185,66,0.1)]">
                      <Clock size={36} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">EL TURNO</h3>
                      <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.4em] mt-2">Bloques de 2 horas pro</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {horasDisponibles.map((h) => (
                      <button
                        key={h}
                        type="button"
                        disabled={(ocupacion[h] || 0) >= (formData.ambiente === 'vip_karaoke' ? 2 : 8)}
                        onClick={() => setFormData(p => ({...p, hora: h}))}
                        className={`p-10 rounded-[2.5rem] font-black text-2xl uppercase tracking-[0.1em] transition-all duration-700 border border-white/5 shadow-2xl ${formData.hora === h ? 'bg-brand-coral border-brand-coral text-white scale-105 -translate-y-4 shadow-[0_20px_40px_rgba(232,84,58,0.4)]' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white hover:border-white/20'}`}
                      >
                         {h}
                      </button>
                    ))}
                 </div>
              </section>
            )}

            <button 
              type="button" 
              disabled={!formData.fecha || !formData.hora} 
              onClick={() => navigateToStep(3)} 
              className="w-full melao-button-primary py-12 rounded-[3rem] text-3xl shadow-[0_20px_50px_rgba(232,84,58,0.3)] disabled:opacity-20 transition-all duration-700 hover:scale-[1.02]"
            >
              CONTINUAR <ArrowRight className="inline-block ml-6" size={40} strokeWidth={3} />
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-20 animate-in slide-in-from-right-8 duration-1000 pb-12">
            <div className="text-center space-y-6">
               <h2 className="text-7xl font-black text-white uppercase tracking-tighter leading-none">
                 TU <span className="text-gradient-melao italic">PERFIL</span>
               </h2>
               <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.5em]">PERSONALIZA TU TICKET DE ACCESO</p>
            </div>
            
            <div className="space-y-10">
               <div className="relative group">
                  <User className="absolute left-12 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-coral transition-all" size={36} strokeWidth={2} />
                  <input 
                    type="text" 
                    name="nombre" 
                    required 
                    placeholder="NOMBRE COMPLETO" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                    className="w-full melao-glass pl-28 pr-12 py-12 text-2xl text-white font-black uppercase tracking-widest outline-none rounded-[3.5rem] border-white/5 focus:ring-4 focus:ring-brand-coral/20 transition-all placeholder:text-white/10" 
                  />
                  <div className="absolute inset-0 rounded-[3.5rem] pointer-events-none border border-white/5 group-hover:border-white/20 transition-all"></div>
               </div>
               <div className="relative group">
                  <Phone className="absolute left-12 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-coral transition-all" size={36} strokeWidth={2} />
                  <input 
                    type="tel" 
                    name="telefono" 
                    required 
                    placeholder="WHATSAPP DE CONTACTO" 
                    value={formData.telefono} 
                    onChange={handleChange} 
                    className="w-full melao-glass pl-28 pr-12 py-12 text-2xl text-white font-black uppercase tracking-widest outline-none rounded-[3.5rem] border-white/5 focus:ring-4 focus:ring-brand-coral/20 transition-all placeholder:text-white/10" 
                  />
                  <div className="absolute inset-0 rounded-[3.5rem] pointer-events-none border border-white/5 group-hover:border-white/20 transition-all"></div>
               </div>
            </div>
            
            <button 
              type="button" 
              disabled={loading || !formData.nombre || !formData.telefono} 
              onClick={handleSubmit} 
              className="w-full melao-button-primary py-12 rounded-[3.5rem] text-3xl shadow-[0_20px_50px_rgba(232,84,58,0.3)] disabled:opacity-20 transition-all duration-700 hover:scale-[1.02]"
            >
              {loading ? "Sincronizando..." : "CONFIRMAR RESERVA 🔥"}
            </button>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="animate-in zoom-in-95 duration-1000 py-10 space-y-16">
            <div className="relative group">
              {/* Ticket Decorative Elements */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-brand-yellow rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-brand-coral rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

              <div className="melao-glass-dark border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-3xl">
                 <div className={`p-20 text-center text-white border-b border-white/10 border-dashed relative overflow-hidden ${formData.ambiente === 'vip_karaoke' ? 'bg-gradient-to-br from-brand-coral to-brand-coral/80' : 'bg-gradient-to-br from-brand-teal to-brand-teal/80'}`}>
                    {/* Tropical background in ticket head */}
                    <div className="absolute inset-0 tropical-pattern opacity-10 scale-150"></div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-6">
                       <div className="w-24 h-24 bg-white border border-white/20 rounded-[2.5rem] flex items-center justify-center rotate-[-8deg] shadow-2xl group-hover:rotate-0 transition-transform duration-700">
                         <CheckCircle2 size={56} className={formData.ambiente === 'vip_karaoke' ? 'text-brand-coral' : 'text-brand-teal'} strokeWidth={3} />
                       </div>
                       <div className="space-y-2">
                         <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8]">ACCESO <br/><span className="italic">CONFIRMADO</span></h2>
                         <p className="text-white font-black text-[10px] uppercase tracking-[0.5em] opacity-60">Melao Social Club • Bogotá</p>
                       </div>
                    </div>
                    
                    {/* Ticket notches with glass effect */}
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-[#042D2D] border-t border-r border-white/10 rounded-tr-full -translate-x-1/2 translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-[#042D2D] border-t border-l border-white/10 rounded-tl-full translate-x-1/2 translate-y-1/2"></div>
                 </div>
                 
                 <div className="p-16 space-y-16">
                    <div className="grid grid-cols-2 gap-y-16 gap-x-12">
                       <div className="space-y-2">
                         <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">Invitado</p>
                         <p className="font-black text-3xl text-white uppercase tracking-tighter">{formData.nombre}</p>
                       </div>
                       <div className="text-right space-y-2">
                         <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">Localidad</p>
                         <p className="font-black text-3xl text-white uppercase tracking-tighter">{formData.ambiente === 'vip_karaoke' ? 'VIP SUITE' : 'ROOF TERRACE'}</p>
                       </div>
                       <div className="space-y-2">
                         <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">Fecha & Hora</p>
                         <p className="font-black text-3xl text-white uppercase tracking-tighter leading-none">{formData.fecha} <br/> <span className="text-brand-coral">{formData.hora}</span></p>
                       </div>
                       <div className="text-right space-y-2">
                         <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">Pax</p>
                         <p className="font-black text-5xl text-white uppercase tracking-tighter leading-none">{formData.personas}</p>
                       </div>
                    </div>

                    {/* Payment Info - Premium Glass */}
                    <div className="p-12 melao-glass border border-white/10 rounded-[3rem] space-y-8 relative overflow-hidden group/info">
                       <div className="absolute top-0 left-0 w-2 h-full bg-brand-yellow"></div>
                       <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-brand-yellow">
                          <Sparkles size={20} className="animate-spin-slow" /> ASEGURA TU MESA
                       </div>
                       <p className="text-base text-white/60 font-medium leading-relaxed">
                         Realiza el abono de <span className="text-white font-black text-2xl underline decoration-brand-coral decoration-4 underline-offset-4">$100.000 COP</span> para activar tu mesa.
                       </p>
                       <div className="bg-white/5 p-8 rounded-3xl border border-white/10 group-hover/info:bg-white/10 transition-colors">
                          <p className="text-2xl font-black text-white tracking-widest text-center">CUENTA: 123-456789-01</p>
                          <p className="text-[10px] text-brand-yellow uppercase font-black tracking-[0.3em] mt-3 text-center">Ahorros Bancolombia • Nit: 900.000.000-1</p>
                       </div>
                    </div>

                    <div className="pt-8 flex flex-col items-center gap-8">
                       <div className="w-48 h-48 grid grid-cols-6 grid-rows-6 gap-2 p-6 border border-white/20 bg-white/5 rounded-[2.5rem] shadow-2xl group-hover:scale-110 transition-transform duration-700">
                          {qrPattern.map((isBlack, i) => (
                            <div key={i} className={`rounded-[3px] transition-colors duration-1000 ${isBlack ? (formData.ambiente === 'vip_karaoke' ? 'bg-brand-coral' : 'bg-brand-teal') : 'bg-white/5'}`}></div>
                          ))}
                       </div>
                       <div className="text-center space-y-2">
                         <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.6em]">TICKET-ID #MELA-{ticketId}</p>
                         <p className="text-[9px] text-brand-yellow font-black uppercase tracking-[0.2em] animate-pulse">Presenta este ticket al llegar</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="bg-brand-coral p-10 text-center">
                    <p className="text-[11px] text-white font-black uppercase tracking-[0.4em]">Envía el comprobante por WhatsApp para validar el QR</p>
                 </div>
              </div>
            </div>
            
            <div className="pt-8">
               <Link 
                 href="/" 
                 className="w-full flex items-center justify-center melao-button-secondary py-10 rounded-[3rem] text-2xl shadow-2xl hover:bg-brand-yellow/80"
               >
                  VOLVER AL CLUB
               </Link>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-32 text-center pb-20">
        <div className="flex flex-col items-center gap-6">
          <div className="melao-squiggle"></div>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.5em]">Melao Social Club © 2024 • Bogotá D.C.</p>
          <div className="flex gap-8 text-[9px] font-black text-brand-coral uppercase tracking-widest">
            <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            <span className="cursor-pointer hover:text-white transition-colors">TikTok</span>
            <span className="cursor-pointer hover:text-white transition-colors">WhatsApp</span>
          </div>
        </div>
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

