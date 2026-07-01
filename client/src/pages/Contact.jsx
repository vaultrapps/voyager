import { useState } from 'react';
import { Mail, Globe, Send } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href =
      `mailto:hello@choosevoyager.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-500 focus:bg-white/10 transition-colors';

  return (
    <div className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur">

          {/* Header */}
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold mb-4">Get in Touch</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl leading-8 mb-10">
            Have a question, partnership idea, or just want to say hello? We'd love to hear from you.
            Our team typically responds within one business day.
          </p>

          <div className="grid lg:grid-cols-3 gap-10">

            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Reach Us Directly</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@choosevoyager.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-brand-400 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/30 transition-colors">
                      <Mail size={16} className="text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Email</p>
                      <p className="text-sm font-medium">hello@choosevoyager.com</p>
                    </div>
                  </a>
                  <a
                    href="https://choosevoyager.com"
                    className="flex items-center gap-3 text-gray-300 hover:text-brand-400 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0 group-hover:bg-brand-500/30 transition-colors">
                      <Globe size={16} className="text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-0.5">Website</p>
                      <p className="text-sm font-medium">choosevoyager.com</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-white text-sm font-semibold mb-1">Response Time</p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  We aim to respond to all inquiries within one business day. For urgent support,
                  include "URGENT" in your subject line.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                <Send size={15} />
                Send Message
              </button>
              <p className="text-gray-500 text-xs">
                Clicking "Send Message" will open your email client with your message pre-filled.
              </p>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
