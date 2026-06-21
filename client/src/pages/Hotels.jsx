import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2, Calendar, Users, Search, Star, Wifi, Car, Coffee,
  Dumbbell, Waves, UtensilsCrossed, SlidersHorizontal, Filter, Heart, MapIcon,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const HOTELS = [
  { id: 1, name: 'The Grand Hyatt',      city: 'New York, NY',      stars: 5, rating: 4.8, reviews: 2341, price: 449, grad: 'from-slate-600 to-blue-800',   amenities: ['wifi','pool','gym','restaurant','parking'], badge: 'Featured' },
  { id: 2, name: 'Hilton Garden Inn',    city: 'Chicago, IL',        stars: 4, rating: 4.4, reviews: 891,  price: 189, grad: 'from-blue-600 to-indigo-700',  amenities: ['wifi','gym','restaurant'] },
  { id: 3, name: 'The Ritz-Carlton',     city: 'Miami Beach, FL',    stars: 5, rating: 4.9, reviews: 3102, price: 689, grad: 'from-amber-500 to-orange-600', amenities: ['wifi','pool','spa','restaurant','parking'], badge: 'Luxury' },
  { id: 4, name: 'Courtyard by Marriott',city: 'Denver, CO',         stars: 3, rating: 4.1, reviews: 562,  price: 129, grad: 'from-emerald-600 to-teal-700', amenities: ['wifi','parking','coffee'] },
  { id: 5, name: 'Westin Waterfront',    city: 'Boston, MA',         stars: 4, rating: 4.6, reviews: 1234, price: 289, grad: 'from-cyan-600 to-sky-700',     amenities: ['wifi','pool','gym','restaurant'], badge: 'Top Rated' },
  { id: 6, name: 'W Hollywood',          city: 'Los Angeles, CA',    stars: 4, rating: 4.5, reviews: 1876, price: 359, grad: 'from-purple-600 to-pink-700',  amenities: ['wifi','pool','spa','restaurant','parking'] },
  { id: 7, name: 'Marriott Marquis',     city: 'Atlanta, GA',        stars: 4, rating: 4.3, reviews: 2010, price: 219, grad: 'from-rose-600 to-red-700',     amenities: ['wifi','gym','restaurant','parking'] },
  { id: 8, name: 'Holiday Inn Express',  city: 'Nashville, TN',      stars: 3, rating: 3.9, reviews: 445,  price: 99,  grad: 'from-green-600 to-emerald-700',amenities: ['wifi','breakfast','parking'] },
];

const AMENITY_ICONS = {
  wifi: { icon: Wifi, label: 'Wi-Fi' },
  pool: { icon: Waves, label: 'Pool' },
  gym: { icon: Dumbbell, label: 'Gym' },
  restaurant: { icon: UtensilsCrossed, label: 'Restaurant' },
  parking: { icon: Car, label: 'Parking' },
  coffee: { icon: Coffee, label: 'Breakfast' },
  breakfast: { icon: Coffee, label: 'Breakfast' },
  spa: { icon: Star, label: 'Spa' },
};

function HotelCard({ hotel }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="card group">
      {/* Image area */}
      <div className={`bg-gradient-to-br ${hotel.grad} h-44 relative`}>
        {hotel.badge && (
          <span className="absolute top-3 left-3 badge badge-amber">{hotel.badge}</span>
        )}
        <button onClick={() => setSaved(!saved)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart size={14} className={saved ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
        </button>
        <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
          {hotel.city}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">{hotel.name}</h3>
          <div className="flex gap-0.5 shrink-0">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="bg-brand-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">{hotel.rating}</div>
          <span className="text-xs text-gray-500">({hotel.reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 4).map(key => {
            const info = AMENITY_ICONS[key];
            if (!info) return null;
            const Icon = info.icon;
            return (
              <span key={key} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                <Icon size={10} />
                {info.label}
              </span>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-black text-brand-600">${hotel.price}</span>
            <span className="text-xs text-gray-400">/night</span>
          </div>
          <button className="btn-primary py-2 px-4 text-sm">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default function Hotels() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    location: searchParams.get('location') || '',
    checkIn: '',
    checkOut: '',
    guests: '2',
    rooms: '1',
  });
  const [searched, setSearched] = useState(false);
  const [maxPrice, setMaxPrice] = useState(800);
  const [minStars, setMinStars] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMap, setViewMap] = useState(false);

  const locationQuery = form.location.trim().toLowerCase();
  const results = HOTELS
    .filter(h => {
      if (!searched || !locationQuery) return true;
      return h.name.toLowerCase().includes(locationQuery) || h.city.toLowerCase().includes(locationQuery);
    })
    .filter(h => h.price <= maxPrice && h.stars >= minStars)
    .sort((a, b) => sortBy === 'price' ? a.price - b.price : sortBy === 'rating' ? b.rating - a.rating : 0);

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Building2 size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Find Hotels</h1>
          </div>
          <p className="text-gray-300 text-sm">From boutique inns to luxury resorts — find your perfect stay</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 items-end">
            <LocationAutocomplete
              value={form.location}
              onChange={v => setForm(f => ({ ...f, location: v }))}
              placeholder="City, hotel, or landmark"
              className="flex-1 min-w-[160px]"
              inputClassName="py-2.5"
            />
            <div className="relative min-w-[140px]">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.checkIn} onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))} />
            </div>
            <div className="relative min-w-[140px]">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.checkOut} onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))} />
            </div>
            <div className="relative min-w-[120px]">
              <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-8 text-sm py-2.5 appearance-none" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
              </select>
            </div>
            <select className="input-field text-sm py-2.5 min-w-[100px] appearance-none" value={form.rooms} onChange={e => setForm(f => ({ ...f, rooms: e.target.value }))}>
              {[1,2,3,4].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Room' : 'Rooms'}</option>)}
            </select>
            <button onClick={() => setSearched(true)} className="btn-primary py-2.5 px-5 text-sm">
              <Search size={15} /> Search
            </button>
          </div>
        </div>
      </div>

      {searched ? (
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* Filters */}
          <aside className="hidden lg:block shrink-0 w-56">
            <div className="card p-5 sticky top-44">
              <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-brand-500" /> Filters
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Max Price / Night</p>
                  <input type="range" min="50" max="1000" step="10" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-brand-500" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50</span><span className="font-semibold text-brand-600">${maxPrice}</span><span>$1,000</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Star Rating</p>
                  {[0,3,4,5].map(n => (
                    <label key={n} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="radio" name="stars" checked={minStars === n} onChange={() => setMinStars(n)} className="accent-brand-500" />
                      <span className="text-sm text-gray-600">{n === 0 ? 'Any' : `${n}+ stars`}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Amenities</p>
                  {['Pool','Gym','Restaurant','Parking','Spa','Free Breakfast'].map(a => (
                    <label key={a} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input type="checkbox" className="accent-brand-500" />
                      <span className="text-sm text-gray-600">{a}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 font-medium">{results.length} hotels found</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMap(!viewMap)} className="btn-secondary text-sm py-2 px-3">
                  <MapIcon size={14} /> {viewMap ? 'List' : 'Map'} View
                </button>
                <select className="input-field text-sm py-2 w-auto appearance-none" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="recommended">Recommended</option>
                  <option value="price">Price: Low to High</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {viewMap ? (
              <div className="card h-96 flex items-center justify-center bg-gradient-to-br from-teal-50 to-brand-50 border-2 border-dashed border-brand-200">
                <div className="text-center">
                  <MapIcon size={40} className="text-brand-400 mx-auto mb-2" />
                  <p className="text-brand-600 font-semibold">Interactive Map</p>
                  <p className="text-gray-500 text-sm mt-1">Map integration would load here</p>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-16">
                <Building2 size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-lg font-bold text-gray-600">No hotels match "{form.location}"</p>
                <p className="text-gray-400 text-sm mt-1">Try a different city or hotel name</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map(h => <HotelCard key={h.id} hotel={h} />)}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Building2 size={56} className="text-gray-200 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">Search for hotels above to see results</p>
          <p className="text-gray-400 mt-2">Compare prices across thousands of properties</p>
        </div>
      )}
    </div>
  );
}
