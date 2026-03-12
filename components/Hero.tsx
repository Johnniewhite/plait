
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="px-6 md:px-12 pt-8 md:pt-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-end gap-8 lg:gap-16">

        {/* Left - Image */}
        <div className="lg:w-5/12 flex items-end justify-center">
          <img
            src="/Beta+Program+Flyer+(1).webp"
            alt="PLAIT - Join the Waitlist - Beauty Powered by Community"
            className="w-full max-w-[450px] h-auto block"
          />
        </div>

        {/* Right content */}
        <div className="lg:w-7/12 max-w-xl text-left pb-8 lg:pb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
            <span className="text-black">THE </span>
            <span className="text-primary">SOCIAL<br />HAIRCARE APP</span>
          </h1>

          <p className="text-lg md:text-xl italic text-slate-800 leading-relaxed mb-6">
            Log your looks, rate your styling experiences, and discover stylists through real reviews from your community
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            PLAIT is a community-driven platform that makes sharing beauty care experiences, discovering, and booking effortless
          </p>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            We put real people's experiences front and center, helping you find stylists and services that truly meet your beauty goals
          </p>

          <a
            href="#waitlist"
            className="inline-block px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-xs tracking-widest transition-all uppercase"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
