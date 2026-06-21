import { useState } from 'react';
import {
  UtensilsCrossed, Calendar, Users, Search, Star, Clock,
  MapPin, Leaf, Flame, Heart, Phone,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const CUISINES = ['All', 'American', 'Italian', 'Japanese', 'French', 'Mexican', 'Indian', 'Mediterranean', 'Chinese', 'Thai'];
const PRICE_LEVELS = ['Any', '$', '$$', '$$$', '$$$$'];

const RESTAURANTS = [
  { id: 1, name: 'The River Grill',     city: 'New York, NY',    cuisine: 'American',      price: '$$$$', rating: 4.9, reviews: 1234, grad: 'from-slate-600 to-gray-800',    times: ['5:00 PM','6:00 PM','8:30 PM'],        dietary: ['vegan','gluten-free'], badge: "Michelin ⭐" },
  { id: 2, name: 'Sakura Garden',       city: 'Chicago, IL',     cuisine: 'Japanese',      price: '$$$',  rating: 4.8, reviews: 892,  grad: 'from-rose-500 to-pink-600',     times: ['5:30 PM','7:00 PM','9:00 PM'],        dietary: ['gluten-free'] },
  { id: 3, name: 'Trattoria Roma',      city: 'Miami, FL',       cuisine: 'Italian',       price: '$$$',  rating: 4.7, reviews: 2103, grad: 'from-amber-500 to-red-600',     times: ['6:00 PM','6:30 PM','8:00 PM','9:30 PM'], dietary: ['vegetarian','gluten-free'], badge: 'Top Rated' },
  { id: 4, name: 'Maison Élysée',       city: 'San Francisco, CA', cuisine: 'French',      price: '$$$$', rating: 4.9, reviews: 567,  grad: 'from-indigo-500 to-purple-600', times: ['7:00 PM','7:30 PM'],                  dietary: ['vegetarian'] },
  { id: 5, name: 'El Rancho Authentic', city: 'Austin, TX',      cuisine: 'Mexican',       price: '$$',   rating: 4.5, reviews: 3456, grad: 'from-orange-500 to-amber-600',  times: ['4:30 PM','5:00 PM','6:00 PM','7:30 PM','9:00 PM'], dietary: ['vegetarian','vegan'] },
  { id: 6, name: 'Spice Route',         city: 'Seattle, WA',     cuisine: 'Indian',        price: '$$',   rating: 4.6, reviews: 1122, grad: 'from-yellow-500 to-orange-500', times: ['5:00 PM','6:30 PM','8:00 PM'],        dietary: ['vegetarian','vegan','gluten-free'], badge: 'Popular' },
  { id: 7, name: 'Coastal Blue',        city: 'San Diego, CA',   cuisine: 'Mediterranean', price: '$$$',  rating: 4.7, reviews: 891,  grad: 'from-cyan-500 to-teal-600',    times: ['5:30 PM','7:00 PM','8:30 PM'],        dietary: ['gluten-free'] },
  { id: 8, name: 'The Smokehouse',      city: 'Nashville, TN',   cuisine: 'American',      price: '$$',   rating: 4.4, reviews: 4210, grad: 'from-red-600 to-rose-700',     times: ['11:30 AM','12:30 PM','5:00 PM','6:30 PM','8:00 PM'], dietary: [] },
];

const DIETARY_ICONS = {
  vegan: { icon: Leaf, label: 'Vegan', color: 'text-green-600' },
  vegetarian: { icon: Leaf, label: 'Vegetarian', color: 'text-emerald-600' },
  'gluten-free': { icon: Flame, label: 'GF', color: 'text-amber-600' },
};

function RestaurantCard({ restaurant }) {
  const [saved, setSaved] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <div className="card">
      <div className={`bg-gradient-to-br ${restaurant.grad} h-40 relative`}>
        {restaurant.badge && <span className="absolute top-3 left-3 badge badge-amber">{restaurant.badge}</span>}
        <button onClick={() => setSaved(!saved)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart size={14} className={saved ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-sm">{restaurant.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold">{restaurant.rating}</span>
            <span className="text-xs text-gray-400">({restaurant.reviews.toLocaleString()})</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-0.5"><MapPin size={10} />{restaurant.city}</span>
          <span>·</span>
          <span className="text-brand-600 font-semibold">{restaurant.cuisine}</span>
          <span>·</span>
          <span className="text-gray-600 font-medium">{restaurant.price}</span>
        </div>

        {/* Dietary badges */}
        {restaurant.dietary.length > 0 && (
          <div className="flex gap-1 mb-3">
            {restaurant.dietary.map(d => {
              const info = DIETARY_ICONS[d];
              if (!info) return null;
              const Icon = info.icon;
              return (
                <span key={d} className={`flex items-center gap-1 text-xs ${info.color} bg-gray-50 px-2 py-0.5 rounded-full`}>
                  <Icon size={9} />{info.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Available times */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-600 mb-2">Available Times</p>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.times.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors border ${
                  selectedTime === time
                    ? 'bg-brand-500 text-white border-brand-500'
                    : 'bg-white text-brand-600 border-brand-200 hover:bg-brand-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button disabled={!selectedTime} className="btn-primary w-full py-2.5 text-sm">
          {selectedTime ? `Reserve for ${selectedTime}` : 'Select a time to reserve'}
        </button>
      </div>
    </div>
  );
}

export default function Restaurants() {
  const [form, setForm] = useState({ location: '', date: '', time: '', party: '2', cuisine: 'All' });
  const [searched, setSearched] = useState(false);
  const [cuisineFilter, setCuisineFilter] = useState('All');

  const results = RESTAURANTS.filter(r => cuisineFilter === 'All' || r.cuisine === cuisineFilter);

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Restaurant Reservations</h1>
          </div>
          <p className="text-gray-300 text-sm">Discover and reserve the best tables in any city</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-2 items-end">
          <LocationAutocomplete
            value={form.location}
            onChange={v => setForm(f => ({ ...f, location: v }))}
            placeholder="City or neighborhood"
            className="flex-1 min-w-[160px]"
            inputClassName="py-2.5"
          />
          <div className="relative min-w-[140px]">
            <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="relative min-w-[120px]">
            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="time" className="input-field pl-8 text-sm py-2.5" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
          </div>
          <div className="relative min-w-[110px]">
            <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select className="input-field pl-8 text-sm py-2.5 appearance-none" value={form.party} onChange={e => setForm(f => ({ ...f, party: e.target.value }))}>
              {[1,2,3,4,5,6,7,8,10,12].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
            </select>
          </div>
          <select className="input-field text-sm py-2.5 min-w-[140px] appearance-none" value={form.cuisine} onChange={e => { setForm(f => ({ ...f, cuisine: e.target.value })); setCuisineFilter(e.target.value); }}>
            {CUISINES.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => setSearched(true)} className="btn-primary py-2.5 px-5 text-sm">
            <Search size={15} /> Find Tables
          </button>
        </div>
      </div>

      {/* Cuisine filter pills */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {CUISINES.map(c => (
            <button key={c} onClick={() => setCuisineFilter(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${cuisineFilter === c ? 'bg-brand-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {!searched && (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-6 text-center text-sm text-brand-700">
            Showing restaurants in all cities · Enter your details above to filter by availability
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600 font-medium">{results.length} restaurants available</p>
          <select className="input-field text-sm py-2 w-auto appearance-none">
            <option>Best Match</option>
            <option>Highest Rated</option>
            <option>Most Reviews</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      </div>
    </div>
  );
}
