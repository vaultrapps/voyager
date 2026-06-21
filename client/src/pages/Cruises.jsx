import { useState } from 'react';
import {
  Anchor, MapPin, Calendar, Users, Search, Star, ArrowRight, Clock, Utensils,
  Music, Dumbbell, Waves, ChevronRight,
} from 'lucide-react';

const CRUISE_LINES = ['Any', 'Royal Caribbean', 'Norwegian', 'Carnival', 'Princess', 'Viking', 'MSC', 'Celebrity'];
const DESTINATIONS = ['Any', 'Caribbean', 'Mediterranean', 'Alaska', 'Bahamas', 'Europe', 'Pacific', 'South America'];
const DURATIONS = ['Any', '2-4 nights', '5-7 nights', '8-12 nights', '13+ nights'];

const CRUISES = [
  {
    id: 1, name: 'Caribbean Dream',         line: 'Royal Caribbean', destination: 'Caribbean',
    ports: ['Miami, FL', 'Nassau', 'CocoCay', 'Miami, FL'],
    nights: 7, price: 899, rating: 4.7, reviews: 3421,
    grad: 'from-cyan-500 to-blue-600', ship: 'Wonder of the Seas',
    amenities: ['dining','pool','shows','spa','casino'],
    departure: '2026-07-15', badge: 'Best Seller',
  },
  {
    id: 2, name: 'Mediterranean Odyssey',   line: 'Norwegian', destination: 'Mediterranean',
    ports: ['Barcelona', 'Nice', 'Rome', 'Athens', 'Mykonos', 'Barcelona'],
    nights: 12, price: 1299, rating: 4.8, reviews: 2198,
    grad: 'from-indigo-500 to-violet-600', ship: 'Norwegian Prima',
    amenities: ['dining','pool','shows','spa','excursions'],
    departure: '2026-08-01', badge: 'Top Rated',
  },
  {
    id: 3, name: 'Alaska Wilderness Explorer', line: 'Princess', destination: 'Alaska',
    ports: ['Seattle', 'Ketchikan', 'Juneau', 'Skagway', 'Glacier Bay', 'Vancouver'],
    nights: 7, price: 1099, rating: 4.6, reviews: 1876,
    grad: 'from-teal-500 to-emerald-600', ship: 'Crown Princess',
    amenities: ['dining','pool','shows','spa'],
    departure: '2026-06-20',
  },
  {
    id: 4, name: 'Bahamas Escape',           line: 'Carnival', destination: 'Bahamas',
    ports: ['Port Canaveral', 'Nassau', 'Freeport', 'Port Canaveral'],
    nights: 4, price: 499, rating: 4.3, reviews: 5632,
    grad: 'from-amber-500 to-orange-500', ship: 'Carnival Magic',
    amenities: ['dining','pool','shows','casino'],
    departure: '2026-07-04', badge: 'Great Value',
  },
  {
    id: 5, name: 'European River Journey',   line: 'Viking', destination: 'Europe',
    ports: ['Amsterdam', 'Cologne', 'Mainz', 'Heidelberg', 'Strasbourg', 'Basel'],
    nights: 8, price: 2499, rating: 4.9, reviews: 987,
    grad: 'from-rose-500 to-pink-600', ship: 'Viking Rinda',
    amenities: ['dining','excursions','spa','lectures'],
    departure: '2026-09-05', badge: 'Luxury',
  },
  {
    id: 6, name: 'Pacific Paradise',         line: 'Celebrity', destination: 'Pacific',
    ports: ['Los Angeles', 'Ensenada', 'Cabo San Lucas', 'Puerto Vallarta', 'Los Angeles'],
    nights: 7, price: 1149, rating: 4.6, reviews: 1345,
    grad: 'from-purple-500 to-indigo-600', ship: 'Celebrity Edge',
    amenities: ['dining','pool','shows','spa','casino','excursions'],
    departure: '2026-08-22',
  },
];

const AMENITY_LABELS = { dining: '🍽️ Fine Dining', pool: '🏊 Pool', shows: '🎭 Shows', spa: '💆 Spa', casino: '🎰 Casino', excursions: '🗺️ Excursions', lectures: '📚 Lectures' };

function CruiseCard({ cruise }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card">
      <div className={`bg-gradient-to-br ${cruise.grad} h-44 relative`}>
        {cruise.badge && <span className="absolute top-3 left-3 badge badge-amber">{cruise.badge}</span>}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <p className="text-white font-bold">{cruise.destination}</p>
          <p className="text-white/70 text-xs">{cruise.ship}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900">{cruise.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold">{cruise.rating}</span>
            <span className="text-xs text-gray-400">({cruise.reviews.toLocaleString()})</span>
          </div>
        </div>
        <p className="text-xs text-brand-600 font-semibold mb-1">{cruise.line}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1"><Clock size={11} />{cruise.nights} nights</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{new Date(cruise.departure).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        {/* Itinerary */}
        <div className="mb-3">
          <button onClick={() => setExpanded(!expanded)} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            {expanded ? 'Hide' : 'Show'} itinerary ({cruise.ports.length} stops)
            <ChevronRight size={11} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
          {expanded && (
            <div className="mt-2 space-y-1">
              {cruise.ports.map((port, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-4 h-4 rounded-full bg-brand-100 text-brand-600 text-[10px] flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                  {port}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-4">
          {cruise.amenities.map(a => (
            <span key={a} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">{AMENITY_LABELS[a] || a}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">from </span>
            <span className="text-2xl font-black text-brand-600">${cruise.price.toLocaleString()}</span>
            <span className="text-xs text-gray-400">/person</span>
          </div>
          <button className="btn-primary py-2 px-4 text-sm">View Cruise <ArrowRight size={13} /></button>
        </div>
      </div>
    </div>
  );
}

export default function Cruises() {
  const [form, setForm] = useState({ destination: '', date: '', nights: '', line: '', guests: '2' });
  const [searched, setSearched] = useState(false);
  const [destFilter, setDestFilter] = useState('Any');
  const [lineFilter, setLineFilter] = useState('Any');

  const results = CRUISES
    .filter(c => destFilter === 'Any' || c.destination === destFilter)
    .filter(c => lineFilter === 'Any' || c.line === lineFilter);

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Anchor size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Cruise Booking</h1>
          </div>
          <p className="text-gray-300 text-sm">Sail the world's most stunning destinations in style</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-2 items-end">
          <div className="relative flex-1 min-w-[140px]">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="input-field pl-8 text-sm py-2.5 appearance-none" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}>
              {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="relative min-w-[140px]">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <select className="input-field text-sm py-2.5 min-w-[120px] appearance-none" value={form.nights} onChange={e => setForm(f => ({ ...f, nights: e.target.value }))}>
            <option value="">Any duration</option>
            {DURATIONS.slice(1).map(d => <option key={d}>{d}</option>)}
          </select>
          <select className="input-field text-sm py-2.5 min-w-[150px] appearance-none" value={form.line} onChange={e => setForm(f => ({ ...f, line: e.target.value }))}>
            {CRUISE_LINES.map(l => <option key={l}>{l}</option>)}
          </select>
          <div className="relative min-w-[110px]">
            <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="input-field pl-8 text-sm py-2.5 appearance-none" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <button onClick={() => setSearched(true)} className="btn-primary py-2.5 px-5 text-sm">
            <Search size={15} /> Search Cruises
          </button>
        </div>
      </div>

      {/* Quick filters */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-semibold text-gray-500 mr-1">Destination:</span>
          {DESTINATIONS.map(d => (
            <button key={d} onClick={() => setDestFilter(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${destFilter === d ? 'bg-brand-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600 font-medium">{results.length} cruises available</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {results.map(c => <CruiseCard key={c.id} cruise={c} />)}
        </div>
      </div>
    </div>
  );
}
