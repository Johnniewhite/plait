
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 md:px-12 py-6 flex justify-between items-center bg-white">
      <Link to="/" className="flex items-center">
        <span className="logo-text text-2xl md:text-3xl uppercase text-black">Plait</span>
      </Link>
      <div className="flex items-center gap-8">
        <Link
          to="/about"
          className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-sm font-medium text-slate-700 hover:text-primary transition-colors"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
