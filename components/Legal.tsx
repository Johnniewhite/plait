import React from 'react';
import Footer from './Footer.js';
import Navbar from './Navbar.js';

type LegalPageProps = {
  kind: 'terms' | 'privacy';
};

const content = {
  terms: {
    title: 'Terms of Service',
    updated: 'Last updated August 2, 2026',
    sections: [
      {
        heading: 'Using PLAITED',
        body: 'PLAITED helps people document hair experiences, discover styling work, share reviews, and connect with stylists. Use the platform respectfully and only submit content you have the right to share',
      },
      {
        heading: 'Bookings and Reviews',
        body: 'Booking details, pricing, availability, and stylist policies may vary by provider. Reviews should reflect real styling experiences and may be moderated if they are abusive, misleading, or unrelated',
      },
      {
        heading: 'Accounts',
        body: 'You are responsible for keeping your account information accurate and your login credentials secure. Contact us if you need help with access or account deletion',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated August 2, 2026',
    sections: [
      {
        heading: 'Information We Collect',
        body: 'We collect the information needed to run PLAITED, including account details, posts, ratings, diary entries, booking details, preferences, and support messages',
      },
      {
        heading: 'How We Use Information',
        body: 'We use information to provide the app, personalize discovery, support bookings, improve safety, send service updates, and respond to support requests',
      },
      {
        heading: 'Contact',
        body: 'Questions about privacy or account data can be sent to contact@plaitedapp.com',
      },
    ],
  },
};

const Legal: React.FC<LegalPageProps> = ({ kind }) => {
  const page = content[kind];
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="px-4 md:px-12 py-8 md:py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-primary font-light mb-3">{page.updated}</p>
          <h1 className="text-4xl md:text-7xl font-bold text-black tracking-tighter uppercase leading-[1.05] mb-10">
            {page.title}
          </h1>
          <div className="space-y-8">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl md:text-2xl font-bold text-primary uppercase mb-3">
                  {section.heading}
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
