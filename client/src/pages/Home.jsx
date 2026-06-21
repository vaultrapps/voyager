import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationAutocomplete from '../components/LocationAutocomplete';
import {
  Plane, Building2, Home as HomeIcon, Anchor, UtensilsCrossed, Truck, Shield, Globe, Star,
  Search, ArrowRight, CheckCircle, Users, MapPin, Calendar, ChevronRight,
  TrendingUp, Award, Clock, HeartHandshake, Car, ClipboardList,
} from 'lucide-react';

/* ─── Data ─── */
const TABS = [
  { id: 'flights',     label: 'Flights',     icon: Plane,           path: '/flights' },
  { id: 'hotels',      label: 'Hotels',      icon: Building2,       path: '/hotels' },
  { id: 'rentals',     label: 'Rentals',     icon: HomeIcon,        path: '/rentals' },
  { id: 'cruises',     label: 'Cruises',     icon: Anchor,          path: '/cruises' },
  { id: 'restaurants', label: 'Restaurants', icon: UtensilsCrossed, path: '/restaurants' },
];

const SERVICES = [
  { icon: Plane,           label: 'Flights',             path: '/flights',       bg: 'bg-blue-500',   desc: 'Search & compare flights' },
  { icon: Building2,       label: 'Hotels',              path: '/hotels',        bg: 'bg-violet-500', desc: 'Find your perfect stay' },
  { icon: HomeIcon,        label: 'Short-Term Rentals',  path: '/rentals',       bg: 'bg-orange-500', desc: 'Homes away from home' },
  { icon: Anchor,          label: 'Cruises',             path: '/cruises',       bg: 'bg-cyan-500',   desc: 'Set sail in style' },
  { icon: UtensilsCrossed, label: 'Restaurants',         path: '/restaurants',   bg: 'bg-rose-500',   desc: 'Reserve top tables' },
  { icon: Truck,           label: 'Moving & Relocation', path: '/moving',        bg: 'bg-amber-500',  desc: 'Stress-free moves' },
  { icon: Shield,          label: 'Military PCS',        path: '/military',      bg: 'bg-emerald-700',desc: 'PCS tools & resources' },
  { icon: Globe,           label: 'International',       path: '/international', bg: 'bg-teal-500',   desc: 'Visas, advisories & more' },
  { icon: Star,            label: 'Concierge',           path: '/concierge',     bg: 'bg-brand-500',  desc: 'Your personal travel agent' },
];

const DESTINATIONS = [
  { city: 'Paris',     country: 'France',    emoji: '🗼', grad: 'from-indigo-600 to-purple-700',  price: 'from $649' },
  { city: 'Tokyo',     country: 'Japan',     emoji: '⛩️', grad: 'from-rose-600 to-orange-600',   price: 'from $899' },
  { city: 'Cancún',    country: 'Mexico',    emoji: '🏖️', grad: 'from-cyan-500 to-blue-600',     price: 'from $299' },
  { city: 'Bali',      country: 'Indonesia', emoji: '🌴', grad: 'from-green-500 to-teal-600',    price: 'from $749' },
  { city: 'New York',  country: 'USA',       emoji: '🗽', grad: 'from-slate-600 to-gray-800',    price: 'from $99' },
  { city: 'Rome',      country: 'Italy',     emoji: '🏛️', grad: 'from-amber-500 to-red-600',    price: 'from $699' },
];

const STATS = [
  { value: '190+',   label: 'Countries covered',    icon: Globe },
  { value: '9+',     label: 'Service categories',   icon: Award },
  { value: '4.9★',   label: 'Average app rating',   icon: TrendingUp },
  { value: '48hr',   label: 'Max email response',   icon: Clock },
];

const STEPS = [
  { step: '01', title: 'Tell us your plans', desc: 'Search flights, hotels, cruises, or describe your dream trip to our concierge.' },
  { step: '02', title: 'We handle the rest', desc: 'Compare prices, read reviews, and book everything in one seamless platform.' },
  { step: '03', title: 'Travel with confidence', desc: 'Real-time updates and a concierge team ready to help by email whenever you need us.' },
];

const TESTIMONIALS = [
  {
    name: 'Sgt. Marcus Williams', role: 'U.S. Army, Fort Liberty NC',
    text: "Voyager made my PCS to Germany seamless. The BAH calculator, housing finder, and school search saved me hours. Hands down the best tool for military families.",
    avatar: 'MW', rating: 5,
  },
  {
    name: 'Jennifer Okafor', role: 'Digital Nomad, Austin TX',
    text: "I booked flights, a villa in Bali, and restaurant reservations for my birthday trip all in one place. The concierge even arranged a private cooking class. Incredible!",
    avatar: 'JO', rating: 5,
  },
  {
    name: 'Robert & Lisa Chen', role: 'Retired, San Diego CA',
    text: "We used Voyager for our Mediterranean cruise. The international travel guide told us exactly what visas we needed and the currency converter was a lifesaver.",
    avatar: 'RC', rating: 5,
  },
];

/* ─── Search Widget ─── */
function SearchWidget() {
  const [tab, setTab] = useState('flights');
  const [form, setForm] = useState({ from: '', to: '', location: '', checkIn: '', checkOut: '', date: '', guests: '1', passengers: '1', class: 'Economy', tripType: 'round' });
  const navigate = useNavigate();

  const activeTab = TABS.find(t => t.id === tab);

  const handleSearch = () => {
    const params = new URLSearchParams(form).toString();
    navigate(`${activeTab.path}?${params}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors shrink-0 border-b-2 ${
              tab === id
                ? 'border-brand-500 text-brand-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon size={15} />
            {label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {tab === 'flights' && (
          <>
            <div className="flex gap-4 mb-4 text-sm">
              {['round', 'oneway', 'multi'].map(t => (
                <label key={t} className="flex items-center gap-1.5 cursor-pointer">
                  <input type="radio" name="tripType" value={t} checked={form.tripType === t} onChange={e => setForm(f => ({ ...f, tripType: e.target.value }))} className="accent-brand-500" />
                  <span className="text-gray-600 font-medium capitalize">{t === 'round' ? 'Round Trip' : t === 'oneway' ? 'One Way' : 'Multi-City'}</span>
                </label>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <LocationAutocomplete
                value={form.from}
                onChange={v => setForm(f => ({ ...f, from: v }))}
                placeholder="From (city or airport)"
                showAirportCode
                icon={Plane}
              />
              <LocationAutocomplete
                value={form.to}
                onChange={v => setForm(f => ({ ...f, to: v }))}
                placeholder="To (city or airport)"
                showAirportCode
                icon={Plane}
              />
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" className="input-field pl-9" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="relative">
                <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="input-field pl-9 appearance-none" value={form.passengers} onChange={e => setForm(f => ({ ...f, passengers: e.target.value }))}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
            </div>
          </>
        )}

        {(tab === 'hotels' || tab === 'rentals') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <LocationAutocomplete
              value={form.location}
              onChange={v => setForm(f => ({ ...f, location: v }))}
              placeholder="Destination or address"
            />
            <div className="relative">
              <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-9" placeholder="Check-in" value={form.checkIn} onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))} />
            </div>
            <div className="relative">
              <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-9" placeholder="Check-out" value={form.checkOut} onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))} />
            </div>
            <div className="relative">
              <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-9 appearance-none" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
        )}

        {tab === 'cruises' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-9 appearance-none">
                <option>Caribbean</option>
                <option>Mediterranean</option>
                <option>Alaska</option>
                <option>Bahamas</option>
                <option>Europe Rivers</option>
              </select>
            </div>
            <div className="relative">
              <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-9" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div className="relative">
              <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-9 appearance-none">
                {[1,2,3,4,5,6].map(n => <option key={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
        )}

        {tab === 'restaurants' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <LocationAutocomplete
              placeholder="City or neighborhood"
              onChange={() => {}}
            />
            <div className="relative">
              <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="datetime-local" className="input-field pl-9" />
            </div>
            <div className="relative">
              <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-9 appearance-none">
                {[1,2,3,4,5,6,7,8].map(n => <option key={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
              </select>
            </div>
          </div>
        )}

        <button onClick={handleSearch} className="btn-primary mt-4 w-full sm:w-auto px-10">
          <Search size={16} />
          Search {activeTab?.label}
        </button>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[75vh] flex flex-col items-center justify-center px-4 py-16 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f2132 0%, #152d3e 40%, #0e3d2a 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-500/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-500/40 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium mb-6">
            <Star size={13} className="fill-brand-400 text-brand-400" />
Your all-in-one travel and relocation platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            What can we<br />
            <span className="text-brand-400">plan for you today?</span>
          </h1>
          <p className="mt-5 text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
            Flights, hotels, cruises, relocations, rental cars, and more — all in one place.
          </p>
          <a
            href="/plan"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-brand-500/30 mt-8 text-base group"
          >
            <ClipboardList size={18} />
            Get Started — Plan My Trip
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                label: 'I want to Travel',
                desc: 'Flights, hotels, cruises & restaurant reservations',
                icon: Plane,
                catPath: '/flights',
                grad: 'from-blue-500 to-indigo-600',
              },
              {
                label: 'I need to Relocate',
                desc: 'Moving services, cost estimates & relocation checklists',
                icon: Truck,
                catPath: '/moving',
                grad: 'from-brand-500 to-brand-700',
              },
              {
                label: 'I want to Rent a Vehicle',
                desc: 'Rental cars, trucks & specialty vehicles near you',
                icon: Car,
                catPath: '/rentals',
                grad: 'from-amber-500 to-orange-600',
              },
            ].map(({ label, desc, icon: Icon, catPath, grad }) => (
              <div
                key={catPath}
                className={`group bg-gradient-to-br ${grad} rounded-2xl p-7 text-white hover:scale-[1.03] transition-transform duration-200 shadow-xl flex flex-col`}
              >
                <a href={catPath} className="block">
                  <div className="bg-white/20 rounded-xl p-3.5 w-fit mb-5 group-hover:bg-white/30 transition-colors">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{label}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
                </a>
                <a
                  href="/plan"
                  className="inline-flex items-center gap-1.5 mt-5 text-white font-bold text-sm bg-white/20 hover:bg-white/35 px-4 py-2.5 rounded-xl transition-colors w-fit"
                >
                  Get Started <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-header">Everything you need to travel</h2>
            <p className="section-subheader">One platform. Every journey.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-9 gap-4">
            {SERVICES.map(({ icon: Icon, label, path, bg, desc }) => (
              <a
                key={path}
                href={path}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-all duration-200 cursor-pointer xl:col-span-1"
              >
                <div className={`${bg} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">{label}</p>
                <p className="text-xs text-gray-400 mt-1 hidden sm:block">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-500">
        <div className="container px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={24} className="text-brand-200 mx-auto mb-2" />
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-brand-100 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="section-header">Popular Destinations</h2>
              <p className="section-subheader">Trending trips this season</p>
            </div>
            <a href="/flights" className="text-brand-600 hover:text-brand-700 font-semibold text-sm flex items-center gap-1">
              View all <ChevronRight size={14} />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DESTINATIONS.map(({ city, country, emoji, grad, price }) => (
              <a
                key={city}
                href={`/flights?to=${city}`}
                className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br ${grad} h-52 flex items-end p-5 cursor-pointer`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-4 right-4 text-3xl">{emoji}</div>
                <div className="relative z-10">
                  <p className="text-white font-bold text-xl">{city}</p>
                  <p className="text-white/70 text-sm">{country}</p>
                  <p className="text-white font-semibold mt-1 text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-0.5 inline-block">{price}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Military PCS Callout */}
      <section className="section bg-navy-900">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="text-center lg:text-left flex-1">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-5">
                <Shield size={14} />
                Military &amp; Government
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                PCS made painless.<br />
                <span className="text-brand-400">For those who serve.</span>
              </h2>
              <p className="text-gray-300 mt-4 leading-relaxed max-w-lg">
                BAH calculator, base housing finder, school search, VA loan guidance, and a complete PCS checklist — built specifically for military families.
              </p>
              <a href="/military" className="btn-primary mt-6 inline-flex">
                Explore Military Tools <ArrowRight size={16} />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-shrink-0">
              {['BAH Calculator','Housing Finder','School Search','PCS Checklist','VA Loan Info','Pet & Vehicle Shipping'].map(item => (
                <div key={item} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex items-center gap-2">
                  <CheckCircle size={14} className="text-brand-400 shrink-0" />
                  <span className="text-white text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-header">How Voyager works</h2>
            <p className="section-subheader">From idea to itinerary in minutes</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-brand-200 to-brand-200" />
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 text-white text-2xl font-black flex items-center justify-center mx-auto mb-5 shadow-lg">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="section-header">Loved by travelers everywhere</h2>
            <p className="section-subheader">Don't take our word for it</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, avatar, rating }) => (
              <div key={name} className="card p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #1D9E75 0%, #116b4e 100%)' }}>
        <div className="container text-center">
          <HeartHandshake size={40} className="text-brand-100 mx-auto mb-5" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Let our concierge plan it all for you
          </h2>
          <p className="text-brand-100 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            From surprise anniversary getaways to complex international itineraries, our expert travel concierge team handles every detail so you can focus on the adventure.
          </p>
          <a href="/concierge" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors shadow-lg text-base">
            Meet Your Concierge <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
