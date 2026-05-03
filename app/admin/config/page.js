"use client";

import { useState } from "react";
import { Settings, Save, Shield, Bell, Clock, DollarSign, Users, Globe, Eye, Palette } from "lucide-react";

export default function ConfigPage() {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'reservas', label: 'Reservas', icon: Clock },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 text-brand-teal mb-2">
            <Settings size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Panel de Control</span>
          </div>
          <h2 className="text-4xl font-black text-brand-dark uppercase tracking-tighter">Configuración</h2>
        </div>

        <button className="flex items-center gap-3 bg-brand-dark text-white px-8 py-4 border-2 border-brand-dark shadow-[6px_6px_0px_#f26955] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#f26955] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all font-black uppercase tracking-widest text-xs">
          <Save size={18} />
          Guardar Cambios
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-5 border-2 transition-all font-black uppercase tracking-widest text-[10px] shadow-[4px_4px_0px_#1a202c] active:translate-y-[2px] active:shadow-none ${activeTab === tab.id ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-dark border-brand-dark hover:bg-brand-cream'}`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="melao-card bg-white p-10 min-h-[500px]">
            {activeTab === 'general' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b-2 border-brand-dark pb-4 mb-8">
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">Información del Negocio</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Nombre Comercial</label>
                    <input type="text" defaultValue="Melao Social Club" className="w-full p-4 border-2 border-brand-dark bg-brand-cream/20 font-bold focus:outline-none focus:bg-brand-yellow/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Eslogan</label>
                    <input type="text" defaultValue="Melao es carácter, Social Club es mundo." className="w-full p-4 border-2 border-brand-dark bg-brand-cream/20 font-bold focus:outline-none focus:bg-brand-yellow/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">WhatsApp de Contacto</label>
                    <input type="text" defaultValue="+57 300 000 0000" className="w-full p-4 border-2 border-brand-dark bg-brand-cream/20 font-bold focus:outline-none focus:bg-brand-yellow/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Dirección</label>
                    <input type="text" defaultValue="Calle Tropical #12-34, Bogotá" className="w-full p-4 border-2 border-brand-dark bg-brand-cream/20 font-bold focus:outline-none focus:bg-brand-yellow/10" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reservas' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b-2 border-brand-dark pb-4 mb-8">
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">Políticas de Reserva</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="melao-card bg-brand-yellow/10 p-6 border-brand-yellow">
                    <div className="flex items-center gap-3 mb-6">
                        <DollarSign className="text-brand-dark" size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Finanzas</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-brand-dark/40">Costo Base ($)</label>
                            <input type="number" defaultValue="200000" className="w-full p-3 border-2 border-brand-dark font-black" />
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked id="consumible" className="w-5 h-5 border-2 border-brand-dark rounded-none appearance-none checked:bg-brand-teal transition-all cursor-pointer" />
                            <label htmlFor="consumible" className="text-[10px] font-black uppercase cursor-pointer">100% Consumible</label>
                        </div>
                    </div>
                  </div>

                  <div className="melao-card bg-brand-teal/5 p-6 border-brand-teal">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="text-brand-dark" size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Logística</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-brand-dark/40">Max Pax por Mesa</label>
                            <input type="number" defaultValue="12" className="w-full p-3 border-2 border-brand-dark font-black" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase text-brand-dark/40">Tiempo Reserva (Horas)</label>
                            <input type="number" defaultValue="2" className="w-full p-3 border-2 border-brand-dark font-black" />
                        </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                    <div className="flex items-center gap-3 text-brand-coral mb-4">
                        <Bell size={16} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Notificaciones Automáticas</h4>
                    </div>
                    <textarea 
                        className="w-full p-6 border-2 border-brand-dark bg-brand-cream/10 font-bold text-sm min-h-[120px] focus:outline-none"
                        defaultValue="¡Hola {nombre}! 🥂 Te saludamos de Melao Social Club. Confirmamos tu reserva para hoy {fecha} a las {hora} para {personas} personas. ¡Te esperamos! ✨"
                    ></textarea>
                    <p className="text-[9px] text-brand-dark/40 italic mt-2">Usa {`{nombre}, {fecha}, {hora}, {personas}`} para personalizar el mensaje.</p>
                </div>
              </div>
            )}

            {activeTab === 'branding' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b-2 border-brand-dark pb-4 mb-8">
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">Identidad Visual</h3>
                </div>
                
                <div className="flex items-center justify-center p-20 border-4 border-dashed border-brand-dark/20 rounded-3xl bg-brand-cream/5">
                    <div className="text-center">
                        <Palette size={48} className="mx-auto text-brand-dark/20 mb-4" />
                        <p className="text-xs font-black text-brand-dark/40 uppercase tracking-widest">Gestión de Activos en proceso</p>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'seguridad' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="border-b-2 border-brand-dark pb-4 mb-8">
                  <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">Control de Acceso</h3>
                </div>
                
                <div className="max-w-md space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Usuario Administrador</label>
                        <input type="text" defaultValue="admin_melao" className="w-full p-4 border-2 border-brand-dark bg-white font-black" readOnly />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-brand-dark/50">Nueva Contraseña</label>
                        <div className="relative">
                            <input type="password" placeholder="••••••••••••" className="w-full p-4 border-2 border-brand-dark bg-white font-black" />
                            <Eye size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark/30 cursor-pointer" />
                        </div>
                    </div>
                    <p className="text-[10px] text-brand-coral font-bold italic">El cambio de contraseña cerrará todas las sesiones activas.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

