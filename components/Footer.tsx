
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 px-4 md:px-12 py-8 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col items-start text-left md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
        <div className="w-full md:w-auto">
          <Link to="/" className="block">
            <img
              src="/logo-black.png"
              alt="Plaited Logo"
              className="h-8 md:h-10 w-auto object-contain object-left mb-2"
            />
          </Link>
          <p className="text-xs md:text-sm text-slate-500 mt-2">@2026 PLAITED LLC</p>
        </div>

        <div className="text-left md:text-right">
          <h3 className="text-lg md:text-2xl font-bold text-black uppercase mb-2">Contact</h3>
          <p className="text-xs md:text-sm text-slate-600">contact@plaitedapp.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
