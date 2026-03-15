
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="px-6 md:px-12 pt-8 md:pt-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-24">

        {/* Left - Image */}
        <div className="lg:w-6/12 flex items-start justify-center -mt-24">
          <img
            src="/Beta+Program+Flyer+(1).webp"
            alt="PLAIT - Join the Waitlist - Beauty Powered by Community"
            className="w-full max-w-[650px] h-auto block"
          />
        </div>

        {/* Right content */}
        <div className="lg:w-7/12 max-w-xl text-left pt-0">
          <h1 className="text-4xl md:text-[66.392px] lg:text-[66.392px] font-bold tracking-tighter leading-[1.05] mb-6">
            <span className="text-black">THE </span>
            <span className="text-primary">SOCIAL<br />HAIRCARE APP</span>
          </h1>

          <p className="text-[24.056px] italic font-light text-slate-800 leading-relaxed mb-6">
            Log your looks, rate your styling <br className="hidden md:block" /> experiences, and discover stylists through <br className="hidden md:block" /> real reviews from your community
          </p>

          <p className="text-[15.236px] font-light text-primary leading-relaxed mb-3">
            PLAIT is a community-driven platform that makes sharing beauty care experiences, discovering, and booking effortless
          </p>

          <p className="text-[15.236px] font-light text-primary leading-relaxed mb-8">
            We put real people's experiences front and center, helping you find stylists and services that truly meet your beauty goals
          </p>

          <a
            href="#waitlist"
            className="inline-block px-10 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-normal text-[17px] font-['Epilogue'] tracking-[0.15em] transition-all uppercase"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
