
import React, { useState } from 'react';
import Navbar from './Navbar.js';
import Footer from './Footer.js';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'CONTACT',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />

      {/* Main content */}
      <section className="px-4 md:px-12 py-8 md:py-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20">

          {/* Left - Heading + Form */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl md:text-7xl font-bold text-primary tracking-tighter uppercase leading-[1.05] mb-4 md:mb-6">
              Contact Us
            </h1>

            <p className="text-sm font-[300] md:text-base text-primary mb-10 md:mb-20">contact@plaitedapp.com</p>

            {status === 'success' ? (
              <div className="py-8">
                <p className="text-2xl font-bold text-primary mb-2">Message sent!</p>
                <p className="text-slate-500">We'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-primary text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
                {/* Name */}
                <div>
                  <p className="text-sm font-medium text-primary mb-1">Name</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-primary/70 mb-1">
                        First Name <span className="text-primary/40">(required)</span>
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-primary/30 rounded-full px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-primary/70 mb-1">
                        Last Name <span className="text-primary/40">(required)</span>
                      </label>
                      <input
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-primary/30 rounded-full px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-primary/70 mb-1">
                    Email <span className="text-primary/40">(required)</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-primary/30 rounded-full px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs text-primary/70 mb-1">
                    Message <span className="text-primary/40">(required)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-primary/30 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white resize-vertical"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-10 py-6 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-full font-normal text-[14px] font-['Epilogue'] transition-all uppercase"
                >
                  {status === 'submitting' ? 'Sending...' : 'Send'}
                </button>
              </form>
            )}
          </div>

          {/* Right - Image */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/contact.webp"
              alt="Natural hair close-up"
              className="w-full max-w-[550px] h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
