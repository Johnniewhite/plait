
import React, { useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const WaitlistSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '' as '' | 'STYLIST' | 'USER',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role: 'STYLIST' | 'USER') => {
    setFormData((prev) => ({ ...prev, role: prev.role === role ? '' : role }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.role) return;
    setStatus('submitting');
    setErrorMsg('');

    const formType = formData.role === 'STYLIST' ? 'STYLIST_WAITLIST' : 'USER_WAITLIST';

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', role: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section id="waitlist" className="py-10 md:py-16 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20">

        {/* Left side */}
        <div className="lg:w-2/5 text-primary">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[1.05] mb-4 md:mb-6">
            Join The<br />Waitlist
          </h2>
          <p className="text-[15.236px] font-[300] leading-relaxed mb-3">
            Join the PLAIT community and get notified when the app launches!
          </p>
          <p className="text-[15.236px] font-[300] text-primary leading-relaxed">
            The review platform your hair has been waiting for.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="lg:w-3/5">
          {status === 'success' ? (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-primary mb-2">You're on the list!</p>
              <p className="text-slate-500">We'll be in touch soon.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-primary text-sm font-semibold hover:underline"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <p className="text-sm font-medium text-slate-800 mb-1">Name</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-primary mb-1">
                      First Name <span className="text-primary font-light">(required)</span>
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border border-primary/30 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-primary mb-1">
                      Last Name <span className="text-primary font-light">(required)</span>
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border border-primary/30 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-primary mb-1">
                  Email <span className="text-primary font-light">(required)</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-primary/30 rounded-full px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 bg-white"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs text-primary mb-2">
                  Interested in joining as? <span className="text-primary font-light">(required)</span>
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => handleRoleChange('STYLIST')}
                      className={`w-5 h-5 border border-primary/30 rounded flex items-center justify-center transition-colors ${
                        formData.role === 'STYLIST'
                          ? 'border-primary bg-primary'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {formData.role === 'STYLIST' && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">Stylist</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div
                      onClick={() => handleRoleChange('USER')}
                      className={`w-5 h-5 border border-primary/30 rounded flex items-center justify-center transition-colors ${
                        formData.role === 'USER'
                          ? 'border-primary bg-primary'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {formData.role === 'USER' && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">User</span>
                  </label>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs text-primary mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
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
                className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-full font-normal text-xs font-['Epilogue'] tracking-widest transition-all uppercase"
              >
                {status === 'submitting' ? 'Joining...' : 'Join'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
