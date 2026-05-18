import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 glass-panel border-r border-slate-700/50 hidden md:flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Smart Vision
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </Link>
        <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
