
import React from 'react';

const features = [
  {
    title: 'Review & Rank',
    desc: 'Rate your experiences and help the community discover the best stylists for a desired style',
  },
  {
    title: 'Document & Track',
    desc: 'Save every style \u2014 how it felt, how long it lasted, and how it held up. Your personal hair diary, beautifully organized',
  },
  {
    title: 'Explore & Share',
    desc: 'Explore trending styles in your area and share your latest hair updates with your friends',
  },
  {
    title: 'Booking',
    desc: 'Search by style category, hair type, and location. No more guessing \u2014 see real results from people with hair just like yours before you book',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-10 md:py-16 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
        {features.map((f, i) => (
          <div key={i} className="text-center">
            <h3 className="text-base md:text-2xl tracking-tighter font-bold text-black uppercase mb-3">
              {f.title}
            </h3>
            <div className="w-14 h-0.5 bg-primary mx-auto mb-5"></div>
            <p className="text-xs md:text-[15.236px] text-primary font-light leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
