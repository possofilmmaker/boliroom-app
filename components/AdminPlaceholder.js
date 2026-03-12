"use client";

import { LayoutDashboard, Users, Grid, Settings } from "lucide-react";

export default function AdminPlaceholder({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
      <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
        <Settings size={32} />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-slate-400 max-w-md">
        Esta sección está en desarrollo. Pronto podrás gestionar {title.toLowerCase()} desde aquí.
      </p>
    </div>
  );
}
