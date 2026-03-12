
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        <div>
          <Link to="/" className="block">
            <span className="logo-text text-4xl uppercase text-black">Plait</span>
          </Link>
          <p className="text-sm text-slate-500 mt-3">@2026 PLAIT LLC</p>
        </div>

        <div className="mt-8 md:mt-0 text-right">
          <h3 className="text-2xl font-bold text-black uppercase mb-3">Contact</h3>
          <p className="text-sm text-slate-600">official@plaitapp.com</p>
          <p className="text-sm text-slate-600">(347) 259-5477</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
