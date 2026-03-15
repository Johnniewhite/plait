
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Hero from './components/Hero.js';
import Features from './components/Features.js';
import WaitlistSection from './components/WaitlistSection.js';
import Footer from './components/Footer.js';
import AboutUs from './components/AboutUs.js';
import Contact from './components/Contact.js';
import Admin from './components/Admin.js';

export enum ModalType {
  USER_WAITLIST = 'USER_WAITLIST',
  STYLIST_WAITLIST = 'STYLIST_WAITLIST',
  NOMINATE = 'NOMINATE',
  LEARN_MORE = 'LEARN_MORE',
  NONE = 'NONE'
}

const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <main>
        <Hero />
        <Features />
        <WaitlistSection />
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
