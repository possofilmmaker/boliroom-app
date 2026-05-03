"use client";

import { useState, useEffect } from "react";
import { Beer, Flame, UtensilsCrossed, GlassWater, Star, Zap, Info, ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

const Onda = ({ color = "#FF5A4F", className = "" }) => (
  <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M0 6C5 6 7.5 2 12.5 2C17.5 2 20 10 25 10C30 10 32.5 2 37.5 2C42.5 2 45 10 50 10C55 10 57.5 6 60 6" stroke={color} strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

export default function MenuDigitalPage() {
  const [activeTab, setActiveTab] = useState("cocteles");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuData = {
    cocteles: [
      { 
        id: 1, 
        nombre: "Melao Coral Dream", 
        descripcion: "Ron añejo premium, licor de mora silvestre, zumo de limón fresco y el toque secreto Melao.", 
        precio: "$32k",
        imagen: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
        badge: "Firma",
        popular: true
      },
      { 
        id: 2, 
        nombre: "Margarita Social", 
        descripcion: "Tequila reposado, Cointreau, agave orgánico y escarcha de sal de gusano cítrica.", 
        precio: "$28k",
        imagen: "https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=800",
        popular: true
      },
      { 
        id: 3, 
        nombre: "Tropical Gin Tonic", 
        descripcion: "Ginebra premium, tónica artesanal, fresas deshidratadas, pimienta rosa y enebro.", 
        precio: "$35k",
        imagen: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800"
      },
      { 
        id: 4, 
        nombre: "Mojito de la Casa", 
        descripcion: "Ron blanco, hierbabuena fresca de nuestra huerta, azúcar de caña y soda.", 
        precio: "$25k",
        imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800"
      },
    ],
    comida: [
      { 
        id: 5, 
        nombre: "Nachos Melao Supreme", 
        descripcion: "Totopos de maíz morado, blend de quesos, chili artesanal, guacamole y pico de gallo.", 
        precio: "$35k",
        imagen: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800",
        badge: "Social Fav",
        popular: true
      },
      { 
        id: 6, 
        nombre: "Alitas Social Club (12 und)", 
        descripcion: "Alitas crujientes bañadas en salsa Melao BBQ o Búfalo picante. Servidas con dip ranch.", 
        precio: "$42k",
        imagen: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800",
        popular: true
      },
      { 
        id: 7, 
        nombre: "Picada Social (Para 4)", 
        descripcion: "Selección de carnes premium, chorizo, morcilla artesanal, papa criolla y patacón.", 
        precio: "$65k",
        imagen: "https://images.unsplash.com/photo-1629814249584-bd4d53cf0e7d?auto=format&fit=crop&q=80&w=800",
        badge: "Para Compartir"
      },
    ],
    cervezas: [
      { id: 8, nombre: "Balde de Corona (x5)", descripcion: "5 botellas heladas con rodajas de limón fresco.", precio: "$75k", imagen: "https://images.unsplash.com/photo-1550225102-1262d5f0e132?auto=format&fit=crop&q=80&w=800", popular: true },
      { id: 9, nombre: "Club Colombia Dorada", descripcion: "La clásica premium colombiana.", precio: "$12k" },
      { id: 10, nombre: "Stella Artois", descripcion: "Lager premium europea.", precio: "$15k" },
      { id: 11, nombre: "Balde Nacional (x5)", descripcion: "Cervezas nacionales (Pilsen, Águila o Poker).", precio: "$45k" },
    ],
    shots: [
      { id: 12, nombre: "Don Julio 70", descripcion: "Tequila añejo cristalino premium.", precio: "$35k", badge: "Premium" },
      { id: 13, nombre: "Aguardiente Mil Demonios", descripcion: "Aguardiente premium galardonado.", precio: "$15k" },
      { id: 14, nombre: "Melao Bomb", descripcion: "Nuestra versión del clásico con un toque tropical.", precio: "$22k", popular: true },
      { id: 15, nombre: "B-52 Layered", descripcion: "Kahlúa, Baileys y licor de naranja.", precio: "$18k" },
    ]
  };

  const categories = [
    { id: "cocteles", label: "Cócteles", icon: GlassWater, color: "text-melao-coral" },
    { id: "comida", label: "Para Picar", icon: UtensilsCrossed, color: "text-melao-teal" },
    { id: "cervezas", label: "Cervezas", icon: Beer, color: "text-melao-yellow" },
    { id: "shots", label: "Shots", icon: Flame, color: "text-melao-pink" },
  ];

  return (
    <main className="pb-32 bg-melao-cream min-h-screen pt-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-40 right-0 w-96 h-96 opacity-5 pointer-events-none translate-x-1/3">
        <img src="/images/palm_leaf.svg" alt="" className="w-full h-full rotate-45" />
      </div>
      <div className="absolute bottom-40 left-0 w-96 h-96 opacity-5 pointer-events-none -translate-x-1/3">
        <img src="/images/palm_leaf.svg" alt="" className="w-full h-full -rotate-12" />
      </div>
      {/* Floating Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-melao-green/5' : 'bg-transparent'}`}>
        <Link href="/" className="w-10 h-10 bg-white border border-melao-green/5 flex items-center justify-center rounded-full shadow-md hover:bg-melao-coral hover:text-white transition-all">
          <ArrowLeft size={20} />
        </Link>
        <div className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-melao-green italic font-monument">Melao Social Club</span>
        </div>
        <div className="w-10 h-10 bg-melao-yellow border border-melao-green/5 flex items-center justify-center rounded-full shadow-md">
          <ShoppingBag size={20} className="text-melao-green" />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-12 relative overflow-hidden max-w-7xl mx-auto">
        <div className="relative z-10">
            <span className="text-[10px] font-black text-melao-teal uppercase tracking-[0.4em] mb-4 block">Experiencia Gastronómica</span>
            <h1 className="text-7xl sm:text-9xl font-black text-melao-green tracking-tighter leading-[0.8] uppercase mb-8 font-monument">
                MENU <br/>
                <span className="text-melao-coral">SOCIAL</span><br/>
                <span className="text-melao-yellow">CLUB</span>
            </h1>
            <div className="flex items-center gap-4">
                <Onda className="w-16" />
                <p className="text-[10px] font-black uppercase tracking-widest text-melao-green/40">Bogotá • Carrera 15 # 67 - 27</p>
            </div>
        </div>
      </header>

      {/* Categories Tabs */}
      <div className="sticky top-24 z-40 bg-melao-cream/80 backdrop-blur-lg border-y border-melao-green/5">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto hide-scrollbar">
          <div className="flex py-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  relative flex items-center gap-3 px-8 py-4 rounded-full border border-melao-green/5 transition-all whitespace-nowrap font-bold
                  ${activeTab === cat.id 
                    ? 'bg-melao-green text-white shadow-xl scale-105' 
                    : 'bg-white text-melao-green hover:bg-melao-cream'}
                `}
              >
                <cat.icon size={18} className={activeTab === cat.id ? "text-melao-yellow" : cat.color} />
                <span className="text-[11px] uppercase tracking-widest">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-4xl mx-auto px-6 mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {menuData[activeTab].map((item, index) => (
          <div 
            key={item.id} 
            className="melao-card group animate-in fade-in slide-in-from-bottom-8 duration-500 overflow-hidden !p-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.imagen && (
              <div className="relative h-64 overflow-hidden">
                <img 
                   src={item.imagen} 
                   alt={item.nombre} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-melao-green/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {item.badge && (
                  <div className="absolute top-6 left-6 bg-melao-yellow text-melao-green border border-melao-green/5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg rotate-[-2deg]">
                    {item.badge}
                  </div>
                )}
              </div>
            )}

            <div className="p-8 relative bg-white">
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                   <h3 className="text-2xl font-black text-melao-green uppercase tracking-tighter leading-none mb-2 font-monument">
                    {item.nombre}
                  </h3>
                  {item.popular && (
                    <div className="flex items-center gap-1.5">
                      <Star size={10} className="text-melao-yellow fill-melao-yellow" />
                      <span className="text-[10px] font-black text-melao-teal uppercase tracking-widest">Favorito</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                    <span className="text-2xl font-black text-melao-coral block leading-none italic">
                    {item.precio}
                    </span>
                </div>
              </div>
              
              <p className="text-melao-green/60 text-sm font-medium leading-relaxed">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-6 mt-24">
        <div className="p-16 bg-melao-green text-white rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 onda-bg scale-[3]"></div>
            
            <div className="relative z-10">
                <h4 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none font-monument">
                    ¿TIENES EL<br/>
                    <span className="text-melao-yellow">PARCHE LISTO?</span>
                </h4>
                <p className="text-white/60 text-lg mb-12 font-medium">
                    No dejes al azar tu noche. Reserva tu mesa ahora y asegura el mejor lugar del club.
                </p>
                <Link 
                  href="/reserva"
                  className="melao-button melao-button-primary bg-melao-coral inline-flex px-12 py-6 text-lg"
                >
                  RESERVAR MESA AHORA
                </Link>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 text-center pb-20 px-6">
        <Onda className="w-16 mx-auto mb-10" />
        <p className="text-[10px] text-melao-green font-black uppercase tracking-[0.5em] opacity-20">
            Melao Social Club • Bogotá • 2024
        </p>
      </footer>
    </main>
  );
}
