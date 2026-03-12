"use client";

import { useState } from "react";
import { Beer, Coffee, Flame, UtensilsCrossed, GlassWater, Star, Zap, Info } from "lucide-react";

export default function MenuDigitalPage() {
  const [activeTab, setActiveTab] = useState("cocteles");

  // Estructura de datos pro con soporte para imágenes y badges
  const menuData = {
    cocteles: [
      { 
        id: 1, 
        nombre: "Boliroom Purple Dream", 
        descripcion: "Nuestra especialidad. Ron premium, licor de mora, limón y un toque secreto de la casa.", 
        precio: "$32.000",
        imagen: "/boliroom_signature_cocktail_1773343366899.png",
        badge: "Especialidad",
        popular: true
      },
      { 
        id: 2, 
        nombre: "Margarita Blue Neon", 
        descripcion: "Tequila reposado, blue curacao, limón fresco y borde de sal cítrica.", 
        precio: "$28.000",
        popular: true
      },
      { 
        id: 3, 
        nombre: "Gin Tonic Frutos Rojos", 
        descripcion: "Ginebra importada, tónica premium, mix de bayas silvestres y enebro.", 
        precio: "$35.000" 
      },
      { 
        id: 4, 
        nombre: "Mojito Clásico", 
        descripcion: "El alma de la fiesta. Ron blanco, hierbabuena fresca, azúcar orgánica y soda.", 
        precio: "$25.000" 
      },
    ],
    comida: [
      { 
        id: 5, 
        nombre: "Nachos Boliroom Supreme", 
        descripcion: "Montaña de totopos crujientes, doble queso fundido, chili con carne, guacamole artesanal y pico de gallo.", 
        precio: "$35.000",
        imagen: "/boliroom_nachos_premium_1773343494841.png",
        badge: "Imperdible",
        popular: true
      },
      { 
        id: 6, 
        nombre: "Alitas BBQ Neon (12 und)", 
        descripcion: "Alitas jumbo bañadas en nuestra salsa BBQ secreta con un toque ahumado. Servidas con bastones de apio.", 
        precio: "$42.000",
        imagen: "/boliroom_wings_premium_1773343521970.png",
        popular: true
      },
      { 
        id: 7, 
        nombre: "Picada Boli (Para 4)", 
        descripcion: "Chorizo santarrosano, morcilla, carne, pollo, papa criolla y yuca frita.", 
        precio: "$65.000",
        badge: "Para Compartir"
      },
    ],
    cervezas: [
      { id: 8, nombre: "Balde de Corona (x5)", descripcion: "5 botellas de Corona Extra bien heladas con limón.", precio: "$75.000", popular: true },
      { id: 9, nombre: "Club Colombia Dorada", descripcion: "Tradición colombiana en botella de 330ml.", precio: "$12.000" },
      { id: 10, nombre: "Stella Artois", descripcion: "Lager premium belga importada.", precio: "$15.000" },
      { id: 11, nombre: "Balde Nacional (x5)", descripcion: "Cervezas nacionales a elección (Pilsen, Águila, Poker).", precio: "$45.000" },
    ],
    shots: [
      { id: 12, nombre: "Tequila Don Julio 70", descripcion: "El shot definitivo para celebrar.", precio: "$35.000", badge: "Premium" },
      { id: 13, nombre: "Aguardiente Antioqueño", descripcion: "El que no puede faltar. Media caja o botella disponible.", precio: "$8.000" },
      { id: 14, nombre: "Jägerbomb", descripcion: "Jägermeister con bebida energizante.", precio: "$22.000", popular: true },
      { id: 15, nombre: "B-52", descripcion: "Layered shot: Kahlúa, Baileys y Grand Marnier.", precio: "$18.000" },
    ]
  };

  const categories = [
    { id: "cocteles", label: "Cócteles", icon: GlassWater, color: "text-brand-purple" },
    { id: "comida", label: "Para Picar", icon: UtensilsCrossed, color: "text-brand-cyan" },
    { id: "cervezas", label: "Cervezas", icon: Beer, color: "text-amber-400" },
    { id: "shots", label: "Shots", icon: Flame, color: "text-red-500" },
  ];

  return (
    <main className="px-6 pb-24 max-w-2xl mx-auto">
      {/* Header Pro */}
      <header className="py-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-purple/20 blur-[100px] -z-10"></div>
        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
           MENU <span className="text-brand-cyan">DIGITAL</span>
        </h1>
        <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-slate-800"></span>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em]">Boliroom Experience</p>
            <span className="h-px w-8 bg-slate-800"></span>
        </div>
      </header>

      {/* Categorías Flotantes Pro */}
      <div className="sticky top-16 md:top-20 z-30 py-4 -mx-6 px-6 bg-brand-darker/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex overflow-x-auto gap-3 hide-scrollbar snap-x">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`
                snap-start flex flex-col items-center gap-1 min-w-[80px] py-3 rounded-2xl border transition-all
                ${activeTab === cat.id 
                  ? 'bg-white/10 border-white/20 text-white' 
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300'}
              `}
            >
              <cat.icon size={20} className={activeTab === cat.id ? cat.color : "text-current"} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{cat.label}</span>
              {activeTab === cat.id && (
                <div className={`w-1 h-1 rounded-full ${cat.color} bg-current mt-1 shadow-[0_0_10px_currentColor]`}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Items de Menú con Arte */}
      <div className="mt-8 space-y-6">
        {menuData[activeTab].map((item) => (
          <div 
            key={item.id} 
            className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
          >
            {item.imagen && (
              <div className="relative h-48 overflow-hidden">
                <img 
                   src={item.imagen} 
                   alt={item.nombre} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
                {item.badge && (
                  <div className="absolute top-4 left-4 bg-brand-purple text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    {item.badge}
                  </div>
                )}
              </div>
            )}

            <div className="p-6 relative">
              {item.popular && !item.imagen && (
                <div className="absolute top-6 right-6 text-brand-cyan opacity-20 group-hover:opacity-100 transition-opacity">
                  <Star size={20} fill="currentColor" />
                </div>
              )}
              
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors leading-tight">
                  {item.nombre}
                </h3>
                <span className="text-xl font-black text-white whitespace-nowrap">
                   {item.precio}
                </span>
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {item.descripcion}
              </p>

              <div className="flex items-center gap-4">
                {item.popular && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-brand-cyan uppercase tracking-widest">
                    <Zap size={12} fill="currentColor" /> Popular
                  </span>
                )}
                <div className="h-4 w-px bg-slate-800"></div>
                <button className="text-[10px] font-bold text-slate-500 hover:text-brand-purple transition-colors uppercase tracking-widest flex items-center gap-1">
                  <Info size={12} /> Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-brand-purple/10 border border-brand-purple/20 text-center">
        <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">¿Ganas de algo más?</h4>
        <p className="text-slate-400 text-xs mb-6 px-4">Pregunta a tu mesero por las promociones del día y nuestra carta de licores premium.</p>
        <button 
          onClick={() => window.location.href = '/reserva'}
          className="neon-button text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl"
        >
          ¡Quiero Reservar!
        </button>
      </div>
    </main>
  );
}
