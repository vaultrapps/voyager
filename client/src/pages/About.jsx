import { Link } from 'react-router-dom';
import { Globe, Shield, Users, Heart } from 'lucide-react';

const PILLARS = [
  {
    icon: Globe,
    title: 'One Platform',
    desc: 'Flights, hotels, rentals, cruises, restaurants, and full relocation support — all in a single place so you never have to stitch together a dozen tabs again.',
  },
  {
    icon: Shield,
    title: 'Built for Military Families',
    desc: 'PCS moves are some of the most stressful events a family can face. We built dedicated tools for military relocations because generic travel apps were never designed for them.',
  },
  {
    icon: Users,
    title: 'For Every Traveler',
    desc: 'Whether you\'re a solo adventurer, a family relocating across the country, or a retiree planning a cruise — Voyager meets you where you are.',
  },
  {
    icon: Heart,
    title: 'Concierge-Level Care',
    desc: 'When you need a human touch, our concierge team steps in. Real people, real help, whenever the trip gets complicated.',
  },
];

export default function About() {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur">

          {/* Header */}
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Voyager</h1>
          <p className="text-gray-300 max-w-3xl leading-8 mb-12">
            Travel planning is broken. Booking a trip means juggling five browser tabs, three apps, and two phone calls —
            and relocation is even worse. Voyager was built to fix that: one place to plan any move or trip, for anyone.
          </p>

          {/* Origin story */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Where We Started</h2>
            <div className="text-gray-300 space-y-4 leading-8 max-w-3xl">
              <p>
                Choose Voyager LLC was founded in 2026 in Florida with a simple frustration: why does planning a trip —
                or a full relocation — require so many disconnected tools? Flight aggregators don't talk to hotel
                platforms. Moving apps don't account for military housing timelines. Restaurant reservations live in a
                completely separate universe.
              </p>
              <p>
                We set out to build the platform we wished existed. Not just a booking engine, but a full travel and
                relocation companion — intelligent enough to handle the complexity, simple enough that anyone can use it
                on day one.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-8 max-w-3xl">
              To give every traveler and relocator — especially military PCS families — a single, intelligent platform
              that handles the logistics so they can focus on what matters: the journey, the destination, and the people
              they're going with.
            </p>
          </section>

          {/* Pillars grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-6">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {PILLARS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Who it's for */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Who Voyager Is For</h2>
            <ul className="text-gray-300 space-y-3 leading-8">
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-0.5">→</span>
                <span><strong className="text-white">Travelers</strong> — weekend getaways to international adventures, all planned in one place.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-0.5">→</span>
                <span><strong className="text-white">Relocators</strong> — people moving across the state or across the country who need flights, housing, and logistics in sync.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-500 font-bold mt-0.5">→</span>
                <span><strong className="text-white">Military PCS families</strong> — service members and their families navigating one of the most logistically demanding moves there is.</span>
              </li>
            </ul>
          </section>

          {/* Company info */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold text-white mb-3">Company Info</h2>
            <div className="text-gray-400 text-sm space-y-1">
              <p><span className="text-gray-300 font-medium">Legal name:</span> Choose Voyager LLC</p>
              <p><span className="text-gray-300 font-medium">Founded:</span> 2026</p>
              <p><span className="text-gray-300 font-medium">Headquarters:</span> Florida, USA</p>
              <p><span className="text-gray-300 font-medium">Website:</span>{' '}
                <a href="https://choosevoyager.com" className="text-brand-400 hover:text-brand-300">choosevoyager.com</a>
              </p>
              <p><span className="text-gray-300 font-medium">Contact:</span>{' '}
                <a href="mailto:hello@choosevoyager.com" className="text-brand-400 hover:text-brand-300">hello@choosevoyager.com</a>
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/founding-member"
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Become a Founding Member
            </Link>
            <Link
              to="/contact"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Get in Touch
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
