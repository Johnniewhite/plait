
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 px-4 md:px-12 py-8 md:py-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center md:flex-row md:justify-between md:items-start md:text-left gap-6 md:gap-0">
        <div>
          <Link to="/" className="block">
            <span className="logo-text text-3xl md:text-4xl uppercase text-black">Plaited</span>
          </Link>
          <p className="text-xs md:text-sm text-slate-500 mt-2">@2026 PLAITED LLC</p>
        </div>

        <div className="md:text-right">
          <h3 className="text-lg md:text-2xl font-bold text-black uppercase mb-2">Contact</h3>
          <p className="text-xs md:text-sm text-slate-600">official@plaitapp.com</p>
          <p className="text-xs md:text-sm text-slate-600">(347) 259-5477</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
