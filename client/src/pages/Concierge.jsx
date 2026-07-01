import { useState } from 'react';
import {
  Star, Send, Clock, CheckCircle, Phone, Mail, MessageSquare,
  Plane, Building2, Utensils, Calendar, Gift, Globe, Heart, Sparkles,
  ChevronRight, ArrowRight,
} from 'lucide-react';

const SERVICES = [
  { icon: Plane,     title: 'Complex Itinerary Planning',  desc: 'Multi-city, multi-country trips with perfect timing',    tag: 'Most Popular' },
  { icon: Gift,      title: 'Surprise Getaways',           desc: 'Secret anniversary or birthday trips planned to perfection', tag: 'Romantic' },
  { icon: Building2, title: 'Luxury Accommodations',       desc: 'Exclusive hotel upgrades, suite access & perks',         tag: '' },
  { icon: Utensils,  title: 'Private Dining Experiences',  desc: 'Chef\'s table, exclusive restaurants, private events',   tag: '' },
  { icon: Globe,     title: 'International Logistics',     desc: 'Visas, transfers, translators & on-the-ground support',  tag: '' },
  { icon: Heart,     title: 'Honeymoon Planning',          desc: 'Your perfect first trip as a couple, end to end',        tag: 'Romantic' },
  { icon: Calendar,  title: 'Corporate Travel',            desc: 'Business travel management for teams of all sizes',      tag: '' },
  { icon: Sparkles,  title: 'VIP Event Access',            desc: 'Concerts, sporting events, galas & exclusive experiences', tag: '' },
];

const TIERS = [
  {
    name: 'Standard',
    price: 'Free',
    tier: null,
    color: 'border-gray-200',
    headerColor: 'bg-gray-50',
    features: ['Email support','48-hour response time','Basic itinerary help','Up to 3 booking changes'],
    cta: 'Get Started',
    ctaStyle: 'btn-secondary',
  },
  {
    name: 'Premium',
    price: '$9.99/mo',
    tier: 'premium',
    color: 'border-brand-300 ring-2 ring-brand-200',
    headerColor: 'bg-brand-500',
    headerText: 'text-white',
    badge: 'Most Popular',
    features: ['Priority email support','24-hour response time','Full itinerary planning','Unlimited booking changes','Price monitoring & rebooking','VIP hotel amenity requests'],
    cta: 'Start Premium',
    ctaStyle: 'btn-primary',
  },
  {
    name: 'VIP',
    price: '$19.99/mo',
    tier: 'vip',
    color: 'border-amber-300',
    headerColor: 'bg-amber-500',
    headerText: 'text-white',
    features: ['Same day priority email response','Dedicated concierge agent','White-glove service','Group & corporate trips','Exclusive access & perks','Priority emergency assistance'],
    cta: 'Become VIP',
    ctaStyle: 'btn-primary',
  },
];

const EXAMPLE_REQUESTS = [
  '"Plan a 2-week honeymoon to Bali and Tokyo with a mix of luxury and adventure."',
  '"Arrange a surprise 50th birthday dinner cruise in Miami for 12 guests."',
  '"Book business class to Geneva and hotel near CERN, arrive June 3."',
  '"Find pet-friendly villa in Tuscany for 6 adults, needs pool, July 15-25."',
  '"Relocating from DC to San Diego — need movers, temp housing, and school list."',
];

const FAQS = [
  { q: 'How quickly does the concierge respond?', a: 'Standard members receive an email response within 48 hours. Premium members get priority email support with a 24-hour response time. VIP members receive same day priority email responses from a dedicated concierge agent.' },
  { q: 'Can the concierge book international travel?', a: 'Absolutely! Our concierge specializes in complex international itineraries including visa guidance, airport transfers, local guides, and everything in between.' },
  { q: 'Is there a minimum booking size?', a: 'No minimum! We help with single-day bookings all the way up to multi-week expeditions. Every traveler deserves great service.' },
  { q: 'Can I use the concierge for military PCS moves?', a: 'Yes — our concierge team has deep experience helping military families coordinate PCS moves, including housing research, school enrollment, and moving logistics.' },
];

export default function Concierge() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', request: '', dates: '', budget: '', tier: 'Premium' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleCheckout(tier) {
    setCheckoutError('');
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Server error');
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError('Could not start checkout — please try again.');
    }
  }
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'agent', text: 'Hi! I\'m your Voyager concierge. How can I help you plan your perfect trip today? 🌍' },
  ]);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(m => [
      ...m,
      { from: 'user', text: chatInput },
      { from: 'agent', text: 'Thanks for your message! A senior concierge will follow up within your tier\'s response window. Your request has been logged. Is there anything else I can help clarify? ✈️' },
    ]);
    setChatInput('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2132 0%, #1D9E75 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-5">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            Your Personal Travel Concierge
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">You think it,<br /><span className="text-brand-300">we handle everything.</span></h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8">
            From impossible reservations to last-minute emergencies — our expert concierge team is here to make your travel always perfect.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-300" /> 500+ trips planned weekly</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-300" /> Average 4.9★ satisfaction</span>
            <span className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-300" /> Available in 40+ languages</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">What we can do for you</h2>
          <p className="text-gray-500 text-sm mb-6">Our concierge team handles it all — just ask</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(({ icon: Icon, title, desc, tag }) => (
              <div key={title} className="card p-5 group hover:border-brand-200 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-brand-50 group-hover:bg-brand-100 rounded-xl p-3 transition-colors">
                    <Icon size={18} className="text-brand-600" />
                  </div>
                  {tag && <span className="badge badge-amber text-xs">{tag}</span>}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing tiers */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-1">Choose your level of service</h2>
          <p className="text-gray-500 text-sm text-center mb-8">All plans include access to the Voyager platform</p>
          {checkoutError && (
            <p className="text-red-500 text-sm text-center mb-4">{checkoutError}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {TIERS.map(tier => (
              <div key={tier.name} className={`card border-2 ${tier.color} overflow-visible`}>
                <div className={`${tier.headerColor} px-6 py-5 rounded-t-2xl relative`}>
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">{tier.badge}</span>
                  )}
                  <p className={`font-black text-lg ${tier.headerText || 'text-gray-900'}`}>{tier.name}</p>
                  <p className={`text-2xl font-black mt-1 ${tier.headerText || 'text-gray-900'}`}>{tier.price}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5 mb-6">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={14} className="text-brand-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`${tier.ctaStyle} w-full`}
                    onClick={() => tier.tier && handleCheckout(tier.tier)}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content: request form + chat */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Request form */}
          <div className="card p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Submit a Concierge Request</h2>
            <p className="text-gray-500 text-sm mb-5">Describe your trip and we'll take it from there</p>
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-brand-500 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-900">Request received!</p>
                <p className="text-gray-500 text-sm mt-2">Your concierge will be in touch within your plan's response window.</p>
                <p className="text-xs text-gray-400 mt-4">Reference #VYG-{Math.floor(Math.random() * 90000 + 10000)}</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline mt-5 text-sm">Submit another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                    <input required className="input-field" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                    <input required type="email" className="input-field" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone (optional)</label>
                  <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Travel Dates</label>
                  <input className="input-field" placeholder="e.g. July 10–24, 2026" value={form.dates} onChange={e => setForm(f => ({ ...f, dates: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Budget Range</label>
                  <select className="input-field appearance-none" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                    <option value="">Select budget</option>
                    <option>Under $1,000</option>
                    <option>$1,000–$3,000</option>
                    <option>$3,000–$10,000</option>
                    <option>$10,000–$25,000</option>
                    <option>$25,000+</option>
                    <option>No budget set</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Tell us about your trip</label>
                  <textarea
                    required
                    className="input-field h-28 resize-none"
                    placeholder={EXAMPLE_REQUESTS[0]}
                    value={form.request}
                    onChange={e => setForm(f => ({ ...f, request: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <select className="input-field text-sm appearance-none" value={form.tier} onChange={e => setForm(f => ({ ...f, tier: e.target.value }))}>
                    <option>Standard (Free)</option>
                    <option>Premium ($9.99/mo)</option>
                    <option>VIP ($19.99/mo)</option>
                  </select>
                  <button type="submit" className="btn-primary whitespace-nowrap">
                    <Send size={14} /> Submit
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Live chat */}
          <div className="card p-6 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <MessageSquare size={18} className="text-brand-500" /> Live Concierge Chat
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-medium">2 agents online now</span>
            </div>
            <div className="flex-1 bg-gray-50 rounded-xl p-4 space-y-3 overflow-y-auto mb-4 min-h-[200px] max-h-[300px]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'agent' && (
                    <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 mt-0.5">V</div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.from === 'user' ? 'bg-brand-500 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="input-field text-sm"
                placeholder="Type your request..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="btn-primary py-2.5 px-4 shrink-0">
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3 max-w-3xl">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="card border">
                <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setExpandedFaq(expandedFaq === q ? null : q)}>
                  <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
                  <ChevronRight size={15} className={`text-gray-400 shrink-0 transition-transform ${expandedFaq === q ? 'rotate-90' : ''}`} />
                </button>
                {expandedFaq === q && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
