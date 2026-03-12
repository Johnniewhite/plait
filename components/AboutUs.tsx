
import React from 'react';
import Navbar from './Navbar.js';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      {/* Main content - two column layout */}
      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left - Text content */}
          <div className="lg:w-1/2">
            {/* Who We Are */}
            <h2 className="text-5xl md:text-7xl font-bold text-primary uppercase leading-[1.05] mb-6">
              Who We Are
            </h2>

            <p className="text-base text-slate-700 leading-relaxed mb-4">
              PLAIT was founded by a team of young professionals bonded through a passion for services enabling powerful presentations of cultural identity.
            </p>

            <p className="text-base text-slate-700 leading-relaxed mb-20">
              As people who have relied on word-of-mouth, social media networks and shared experiences to make beauty care decisions, we are building a platform we've wished always existed.
            </p>

            {/* Our Vision */}
            <h2 className="text-5xl md:text-7xl font-bold text-primary uppercase leading-[1.05] mb-6">
              Our Vision
            </h2>

            <p className="text-base text-slate-700 leading-relaxed mb-4">
              Our mission is to create a community-driven platform that consolidates the search for beauty care experiences by bringing the exploration, investigation, booking and reviews all onto one place.
            </p>

            <p className="text-base text-slate-700 leading-relaxed mb-4">
              The vision of PLAIT was borne out of a simple love for haircare and deep understanding of how personal the beauty care experience is, particularly for people whose needs are commonly underserved.
            </p>

            <p className="text-base text-slate-700 leading-relaxed">
              We see hair beyond something that can be styled, but as an important marker of identity, culture and community. PLAIT draws on this point through a platform that brings ease, transparency and interconnection to beauty care.
            </p>
          </div>

          {/* Right - Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/unsplash-image-62wQhEghaw0.webp"
              alt="Woman with natural hair"
              className="w-full max-w-[550px] h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-16 mt-20">
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
    </div>
  );
};

export default AboutUs;
