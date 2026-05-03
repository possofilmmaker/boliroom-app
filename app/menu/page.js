"use client";

import { useState, useEffect } from "react";
import { Beer, Flame, UtensilsCrossed, GlassWater, Star, Zap, Info, ArrowLeft, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

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
    { id: "cocteles", label: "Cócteles", icon: GlassWater, color: "text-brand-coral" },
    { id: "comida", label: "Para Picar", icon: UtensilsCrossed, color: "text-brand-teal" },
    { id: "cervezas", label: "Cervezas", icon: Beer, color: "text-brand-yellow" },
    { id: "shots", label: "Shots", icon: Flame, color: "text-brand-coral" },
  ];

  return (
    <main className="pb-32 bg-brand-cream min-h-screen font-outfit">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      {/* Floating Navigation (Mobile Optimized) */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-between items-center ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b-2 border-brand-dark' : 'bg-transparent'}`}>
        <Link href="/" className="w-10 h-10 border-2 border-brand-dark bg-white flex items-center justify-center shadow-[2px_2px_0px_#1a202c] active:translate-y-[2px] active:shadow-none">
          <ArrowLeft size={20} className="text-brand-dark" />
        </Link>
        <div className={`transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark italic">Melao Social Club</span>
        </div>
        <div className="w-10 h-10 border-2 border-brand-dark bg-brand-yellow flex items-center justify-center shadow-[2px_2px_0px_#1a202c]">
          <ShoppingBag size={20} className="text-brand-dark" />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-24 pb-12 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-brand-coral/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 top-1/2 w-48 h-48 bg-brand-yellow/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.4em] mb-4 block">Experiencia Gastronómica</span>
            <h1 className="text-7xl sm:text-8xl font-black text-brand-dark tracking-tighter leading-[0.85] uppercase mb-6 drop-shadow-sm">
                MENU <br/>
                <span className="text-brand-coral">SOCIAL</span><br/>
                <span className="text-brand-yellow outline-text">CLUB</span>
            </h1>
            <div className="flex items-center gap-4">
                <div className="h-0.5 w-12 bg-brand-dark"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40">Bogotá • Piso 2 & 3</p>
            </div>
        </div>
      </header>

      {/* Categories Tabs - Sticky with custom indicator */}
      <div className="sticky top-[72px] z-40 bg-brand-cream/80 backdrop-blur-lg border-y-2 border-brand-dark">
        <div className="max-w-2xl mx-auto px-6 overflow-x-auto hide-scrollbar">
          <div className="flex py-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  relative flex items-center gap-3 px-6 py-4 border-2 border-brand-dark transition-all whitespace-nowrap
                  ${activeTab === cat.id 
                    ? 'bg-brand-dark text-white shadow-[4px_4px_0px_#f26955] translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-white text-brand-dark hover:bg-brand-cream'}
                `}
              >
                <cat.icon size={18} className={activeTab === cat.id ? "text-brand-yellow" : cat.color} />
                <span className="text-[11px] font-black uppercase tracking-widest">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items Grid */}
      <div className="max-w-2xl mx-auto px-6 mt-12 space-y-12 relative z-10">
        {menuData[activeTab].map((item, index) => (
          <div 
            key={item.id} 
            className="melao-card group animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {item.imagen && (
              <div className="relative h-72 overflow-hidden border-b-2 border-brand-dark">
                <img 
                   src={item.imagen} 
                   alt={item.nombre} 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {item.badge && (
                  <div className="absolute top-6 left-6 bg-brand-yellow text-brand-dark border-2 border-brand-dark text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-[4px_4px_0px_#1a202c] rotate-[-2deg]">
                    {item.badge}
                  </div>
                )}
                
                <button className="absolute bottom-6 right-6 w-12 h-12 bg-white border-2 border-brand-dark flex items-center justify-center shadow-[4px_4px_0px_#085454] hover:bg-brand-coral hover:text-white transition-all transform translate-y-20 group-hover:translate-y-0 duration-300">
                    <Heart size={20} />
                </button>
              </div>
            )}

            <div className="p-8 sm:p-10 relative bg-white">
              <div className="flex justify-between items-start gap-4 mb-6">
                <div className="flex-1">
                   <h3 className="text-3xl font-black text-brand-dark uppercase tracking-tighter leading-[0.9] mb-2">
                    {item.nombre}
                  </h3>
                  {item.popular && (
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1, 2, 3].map(i => <Star key={i} size={10} className="text-brand-yellow fill-brand-yellow" />)}
                      </div>
                      <span className="text-[10px] font-black text-brand-teal uppercase tracking-widest">Favorito del Club</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                    <span className="text-3xl font-black text-brand-dark block leading-none italic underline decoration-brand-yellow decoration-4 underline-offset-4">
                    {item.precio}
                    </span>
                </div>
              </div>
              
              <p className="text-brand-dark/70 text-sm font-bold leading-relaxed max-w-[85%]">
                {item.descripcion}
              </p>

              <div className="mt-10 pt-8 border-t-2 border-brand-dark/5 flex items-center justify-between">
                <button className="flex items-center gap-2 text-[10px] font-black text-brand-dark/40 hover:text-brand-coral transition-all uppercase tracking-[0.2em] group/info">
                  <Info size={14} className="group-hover/info:rotate-12 transition-transform" /> 
                  Detalles & Alérgenos
                </button>
                
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-brand-dark/20 uppercase tracking-widest mr-2">Disfrútalo hoy</span>
                    <div className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Card */}
      <div className="max-w-2xl mx-auto px-6 mt-20">
        <div className="p-12 melao-card bg-brand-teal text-white border-brand-dark text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
            <Zap className="text-brand-yellow/20 absolute -right-10 -bottom-10 rotate-12" size={200} />
            
            <div className="relative z-10">
                <h4 className="text-4xl font-black mb-6 uppercase tracking-tighter leading-none">
                    ¿TIENES EL<br/>
                    <span className="text-brand-yellow">PARCHE LISTO?</span>
                </h4>
                <p className="text-white/80 text-xs mb-10 font-bold px-8 leading-relaxed tracking-wide uppercase">
                    No dejes al azar tu noche. Reserva tu mesa ahora y asegura el mejor lugar del Social Club.
                </p>
                <Link 
                href="/reserva"
                className="w-full bg-brand-yellow text-brand-dark border-4 border-brand-dark py-6 px-10 font-black text-xs uppercase tracking-[0.3em] shadow-[8px_8px_0px_#1a202c] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#1a202c] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all inline-block"
                >
                RESERVAR MESA AHORA
                </Link>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-32 text-center pb-20 px-6">
        <div className="w-12 h-1 bg-brand-dark/10 mx-auto mb-10"></div>
        <p className="text-[10px] text-brand-dark font-black uppercase tracking-[0.5em] opacity-40">
            Melao Social Club • Bogotá • 2026
        </p>
        <div className="mt-8 flex justify-center gap-6 opacity-20">
            <div className="w-8 h-8 border-2 border-brand-dark rounded-full"></div>
            <div className="w-8 h-8 border-2 border-brand-dark rounded-full"></div>
            <div className="w-8 h-8 border-2 border-brand-dark rounded-full"></div>
        </div>
      </footer>
    </main>
  );
}


