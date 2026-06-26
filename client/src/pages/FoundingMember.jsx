import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown, Lock, Zap, Star, Users, Gift, Check, ChevronRight, Sparkles, Shield,
} from 'lucide-react';

const SPOTS_TOTAL = 500;
const SPOTS_TAKEN = 347;

const PERKS = [
  {
    icon: Lock,
    title: 'Locked-In Pricing',
    desc: 'Pay $7.99/mo for your first 2 years — 20% off the standard rate. After that, just $9.99/mo.',
  },
  {
    icon: Zap,
    title: 'Early Feature Access',
    desc: 'Every new tool, route planner, and AI feature reaches you before anyone else.',
  },
  {
    icon: Crown,
    title: 'Founder Badge',
    desc: 'A permanent gold crown badge on your profile that marks you as an original.',
  },
  {
    icon: Users,
    title: 'Founder Community',
    desc: 'Private Slack group with direct access to the Voyager founding team.',
  },
  {
    icon: Star,
    title: 'Priority Support',
    desc: 'Your support tickets skip the queue and land with our senior team.',
  },
  {
    icon: Gift,
    title: 'Exclusive Rewards',
    desc: 'Travel credits, partner hotel upgrades, and surprise gifts throughout the year.',
  },
];

const INCLUDED = [
  'All current and future Premium features',
  'AI-powered trip planning (launching Q3)',
  'Price drop alerts & auto-rebooking',
  'Unlimited itinerary builds',
  'Concierge request credits (2/month)',
  'Partner hotel & airline perks',
  'Founding member badge & community',
  'Annual travel credit ($50/year)',
];

export default function FoundingMember() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN;
  const pctFilled = Math.round((SPOTS_TAKEN / SPOTS_TOTAL) * 100);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <div className="bg-white">

      {/* ── Hero ── */}
      <section className="bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <Crown size={13} />
            Limited Founding Membership
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight">
            Be Part of<br />
            <span className="text-amber-400">Voyager's Origin Story</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10">
            We're reserving {SPOTS_TOTAL} founding member spots for people who believe in
            what we're building. Lock in 20% off for your first 2 years, shape the product, and travel smarter.
          </p>

          {/* Spots counter */}
          <div className="max-w-sm mx-auto mb-10">
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-amber-300">{SPOTS_TAKEN} spots claimed</span>
              <span className="text-gray-400">{spotsLeft} remaining</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                style={{ width: `${pctFilled}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1.5">{pctFilled}% of founding spots filled</p>
          </div>

          {/* CTA */}
          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold px-6 py-3 rounded-xl">
              <Check size={16} /> You're on the list — we'll be in touch soon!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm shrink-0"
              >
                <Crown size={15} /> Claim My Spot
              </button>
            </form>
          )}
          <p className="text-gray-500 text-xs mt-4">No credit card required to reserve your spot.</p>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your Founding Member Rate</h2>
          <p className="text-gray-500 mb-10">20% off for your first 2 years — then $9.99/mo after.</p>

          <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl border-2 border-amber-400 overflow-hidden">
            <div className="bg-amber-500 px-6 py-4 text-center">
              <div className="flex items-center justify-center gap-2 text-navy-900 font-black text-sm tracking-widest uppercase">
                <Crown size={16} /> Founding Member
              </div>
            </div>
            <div className="px-8 py-8">
              <div className="flex items-end justify-center gap-1 mb-1">
                <span className="text-5xl font-black text-gray-900">$7.99</span>
                <span className="text-gray-400 font-medium mb-2">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                <span className="line-through">$9.99/mo</span>
                <span className="ml-2 text-amber-600 font-bold">20% off for 2 years</span>
              </p>
              <p className="text-xs text-gray-400 mb-8">Then $9.99/mo · Billed monthly · Cancel anytime</p>

              <ul className="space-y-3 text-left mb-8">
                {INCLUDED.map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check size={15} className="text-amber-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {submitted ? (
                <div className="w-full text-center bg-amber-50 border border-amber-200 text-amber-700 font-semibold px-4 py-3 rounded-xl text-sm">
                  You're on the waitlist!
                </div>
              ) : (
                <button
                  onClick={() => document.querySelector('input[type=email]')?.focus()}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Claim Your Spot — {spotsLeft} Left
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Perks grid ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-gray-900 mb-2">What You Get as a Founder</h2>
            <p className="text-gray-500">Benefits that go beyond any standard subscription.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PERKS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon size={20} className="text-amber-500" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Urgency banner ── */}
      <section className="bg-navy-900 py-12 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <Sparkles size={28} className="text-amber-400 mx-auto mb-3" />
          <h2 className="text-2xl font-black mb-2">Only <span className="text-amber-400">{spotsLeft} spots</span> remaining</h2>
          <p className="text-gray-400 text-sm mb-6">
            Once all founding spots are claimed, this rate disappears permanently.
            Lock in 20% off for 2 years before the door closes.
          </p>
          {!submitted && (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-navy-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm shrink-0"
              >
                <Crown size={15} /> Reserve My Spot
              </button>
            </form>
          )}
          {submitted && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/40 text-amber-300 font-semibold px-6 py-3 rounded-xl">
              <Check size={16} /> You're on the list!
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
