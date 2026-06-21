import { useState } from 'react';
import {
  Car, Calendar, Users, Search, Star, Gauge, Settings,
  Wind, ArrowRight, Shield, Fuel, CheckCircle,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const CAR_TYPES = ['All', 'Economy', 'Compact', 'Standard', 'SUV', 'Luxury', 'Van', 'Truck'];

const CARS = [
  {
    id: 1, company: 'Enterprise', model: 'Toyota Corolla', type: 'Economy',
    doors: 4, seats: 5, bags: 2, mpg: '36 mpg', transmission: 'Auto',
    price: 35, rating: 4.6, reviews: 2341,
    features: ['Air Conditioning', 'Unlimited Miles', 'Bluetooth'],
    badge: 'Best Value', badgeColor: 'badge-green',
    grad: 'from-blue-500 to-blue-700',
  },
  {
    id: 2, company: 'Hertz', model: 'Honda CR-V', type: 'SUV',
    doors: 4, seats: 5, bags: 3, mpg: '30 mpg', transmission: 'Auto',
    price: 69, rating: 4.7, reviews: 1892,
    features: ['Air Conditioning', 'AWD', 'Unlimited Miles', 'Apple CarPlay'],
    badge: 'Top Rated', badgeColor: 'badge-amber',
    grad: 'from-amber-500 to-orange-600',
  },
  {
    id: 3, company: 'Avis', model: 'Ford Mustang', type: 'Luxury',
    doors: 2, seats: 4, bags: 2, mpg: '28 mpg', transmission: 'Manual',
    price: 89, rating: 4.8, reviews: 945,
    features: ['Air Conditioning', 'Premium Sound', 'Sport Package'],
    badge: '🔥 Hot Deal', badgeColor: 'badge-amber',
    grad: 'from-red-600 to-rose-700',
  },
  {
    id: 4, company: 'Budget', model: 'Nissan Sentra', type: 'Compact',
    doors: 4, seats: 5, bags: 2, mpg: '38 mpg', transmission: 'Auto',
    price: 28, rating: 4.3, reviews: 3102,
    features: ['Air Conditioning', 'Unlimited Miles', 'Fuel Efficient'],
    grad: 'from-green-600 to-emerald-700',
  },
  {
    id: 5, company: 'National', model: 'Jeep Grand Cherokee', type: 'SUV',
    doors: 4, seats: 5, bags: 4, mpg: '24 mpg', transmission: 'Auto',
    price: 79, rating: 4.6, reviews: 1456,
    features: ['Air Conditioning', '4WD', 'Unlimited Miles', 'Navigation'],
    grad: 'from-slate-600 to-gray-700',
  },
  {
    id: 6, company: 'Dollar', model: 'Chrysler Pacifica', type: 'Van',
    doors: 4, seats: 7, bags: 5, mpg: '22 mpg', transmission: 'Auto',
    price: 65, rating: 4.4, reviews: 876,
    features: ['Air Conditioning', 'Unlimited Miles', 'Stow-N-Go Seats'],
    grad: 'from-purple-500 to-violet-700',
  },
  {
    id: 7, company: 'Hertz', model: 'Cadillac Escalade', type: 'Luxury',
    doors: 4, seats: 7, bags: 5, mpg: '19 mpg', transmission: 'Auto',
    price: 149, rating: 4.9, reviews: 412,
    features: ['Air Conditioning', 'AWD', 'Premium Sound', 'Navigation', 'Heated Seats'],
    badge: 'Premium', badgeColor: 'badge-amber',
    grad: 'from-yellow-600 to-amber-700',
  },
  {
    id: 8, company: 'Enterprise', model: 'Ford F-150', type: 'Truck',
    doors: 4, seats: 5, bags: 0, mpg: '22 mpg', transmission: 'Auto',
    price: 75, rating: 4.5, reviews: 987,
    features: ['Air Conditioning', '4WD', 'Tow Package', 'Bed Liner'],
    grad: 'from-teal-600 to-cyan-700',
  },
];

function CarCard({ car }) {
  return (
    <div className="card group">
      <div className={`bg-gradient-to-br ${car.grad} h-44 relative flex items-end p-4`}>
        {car.badge && (
          <span className={`absolute top-3 left-3 badge ${car.badgeColor || 'badge-green'}`}>{car.badge}</span>
        )}
        <Car size={52} className="text-white/30 absolute right-4 top-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-white font-black text-lg leading-tight">{car.model}</p>
          <p className="text-white/70 text-xs">{car.company}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold">{car.rating}</span>
            <span className="text-xs text-gray-400">({car.reviews.toLocaleString()})</span>
          </div>
          <span className="badge badge-green text-xs">{car.type}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Users size={10} />{car.seats} seats</span>
          <span className="flex items-center gap-1"><Wind size={10} />{car.bags} bags</span>
          <span className="flex items-center gap-1"><Settings size={10} />{car.transmission}</span>
          <span className="flex items-center gap-1 col-span-3"><Fuel size={10} />{car.mpg} · {car.doors} doors</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {car.features.slice(0, 3).map(f => (
            <span key={f} className="flex items-center gap-1 text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">
              <CheckCircle size={9} className="text-brand-500" />{f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-brand-600">${car.price}</span>
            <span className="text-xs text-gray-400">/day</span>
          </div>
          <button className="btn-primary py-2 px-4 text-sm">
            Reserve <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Rentals() {
  const [form, setForm] = useState({ pickup: '', dropoff: '', pickupDate: '', dropoffDate: '', sameReturn: true });
  const [searched, setSearched] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200);

  const results = CARS
    .filter(c => typeFilter === 'All' || c.type === typeFilter)
    .filter(c => c.price <= maxPrice);

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Car size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Rental Cars</h1>
          </div>
          <p className="text-gray-300 text-sm">Compare top rental companies — Economy to Luxury, trucks to vans</p>
        </div>
      </div>

      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 items-end">
            <LocationAutocomplete
              value={form.pickup}
              onChange={v => setForm(f => ({ ...f, pickup: v }))}
              placeholder="Pick-up city or airport"
              showAirportCode
              className="flex-1 min-w-[180px]"
              inputClassName="py-2.5"
            />
            {!form.sameReturn && (
              <LocationAutocomplete
                value={form.dropoff}
                onChange={v => setForm(f => ({ ...f, dropoff: v }))}
                placeholder="Drop-off city or airport"
                showAirportCode
                className="flex-1 min-w-[180px]"
                inputClassName="py-2.5"
              />
            )}
            <div className="relative min-w-[140px]">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.pickupDate} onChange={e => setForm(f => ({ ...f, pickupDate: e.target.value }))} />
            </div>
            <div className="relative min-w-[140px]">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.dropoffDate} onChange={e => setForm(f => ({ ...f, dropoffDate: e.target.value }))} />
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-600 whitespace-nowrap cursor-pointer">
              <input type="checkbox" checked={form.sameReturn} onChange={e => setForm(f => ({ ...f, sameReturn: e.target.checked }))} className="accent-brand-500" />
              Same return location
            </label>
            <button onClick={() => setSearched(true)} className="btn-primary py-2.5 px-5 text-sm">
              <Search size={15} /> Search Cars
            </button>
          </div>
        </div>
      </div>

      {/* Type filter pills + price slider */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-2 items-center">
          {CAR_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                typeFilter === t ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <span className="text-xs text-gray-500">Max:</span>
            <input type="range" min="25" max="200" step="5" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-24 accent-brand-500" />
            <span className="text-xs font-semibold text-brand-600 w-16">${maxPrice}/day</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {!searched && (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-4 mb-6 text-center text-sm text-brand-700">
            Showing all available vehicles · Enter your pickup details above to check availability
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600 font-medium">{results.length} vehicles available</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <Shield size={13} className="text-brand-500" /> Free cancellation on most rentals
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map(c => <CarCard key={c.id} car={c} />)}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <Car size={52} className="text-gray-200 mx-auto mb-4" />
            <p className="text-lg font-bold text-gray-600">No vehicles match your filters</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting the car type or price range</p>
          </div>
        )}
      </div>
    </div>
  );
}
