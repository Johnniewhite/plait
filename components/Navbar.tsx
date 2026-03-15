
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 md:px-12 py-12 flex justify-between items-center bg-white">
      <Link to="/" className="flex items-center">
        <span className="logo-text text-2xl md:text-2xl uppercase text-black">Plait</span>
      </Link>
      <div className="flex items-center gap-8">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-[15.236px] font-light text-primary transition-colors ${isActive ? 'underline underline-offset-4' : ''}`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-[15.236px] font-light text-primary transition-colors ${isActive ? 'underline underline-offset-4' : ''}`
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
