import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="glass-panel border-b border-slate-700/50 p-4 flex items-center justify-between md:hidden">
      <Link to="/" className="font-bold text-lg text-white flex items-center gap-2">
        <span className="text-indigo-400">Smart</span> Vision
      </Link>
      <button className="p-2 text-slate-300 hover:text-white">
        <Menu className="w-6 h-6" />
      </button>
    </nav>
  );
};

export default Navbar;
