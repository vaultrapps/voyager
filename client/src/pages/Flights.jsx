import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plane, Calendar, Users, ArrowLeftRight, Search, Filter,
  Wifi, Luggage, ArrowRight, Star, SlidersHorizontal, ExternalLink,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const MOCK_FLIGHTS = [
  { id: 1, airline: 'Delta Air Lines',    code: 'DL', num: 'DL 1234', from: 'JFK', fromCity: 'New York',     to: 'LAX', toCity: 'Los Angeles', dep: '06:00', arr: '09:15', dur: '5h 15m', stops: 0, price: 289, seats: 4,  amenities: ['wifi','carry-on'] },
  { id: 2, airline: 'United Airlines',    code: 'UA', num: 'UA 891',  from: 'ORD', fromCity: 'Chicago',      to: 'MIA', toCity: 'Miami',       dep: '08:30', arr: '12:45', dur: '3h 15m', stops: 0, price: 198, seats: 7,  amenities: ['wifi','carry-on','meals'] },
  { id: 3, airline: 'American Airlines',  code: 'AA', num: 'AA 2210', from: 'DFW', fromCity: 'Dallas',       to: 'SEA', toCity: 'Seattle',     dep: '11:00', arr: '14:45', dur: '4h 45m', stops: 1, price: 245, seats: 2,  amenities: ['carry-on'] },
  { id: 4, airline: 'Southwest Airlines', code: 'WN', num: 'WN 437',  from: 'ATL', fromCity: 'Atlanta',      to: 'DEN', toCity: 'Denver',      dep: '09:15', arr: '11:30', dur: '3h 15m', stops: 0, price: 178, seats: 12, amenities: ['carry-on'] },
  { id: 5, airline: 'JetBlue',            code: 'B6', num: 'B6 1019', from: 'BOS', fromCity: 'Boston',       to: 'FLL', toCity: 'Ft Lauderdale', dep: '07:00', arr: '10:20', dur: '3h 20m', stops: 0, price: 215, seats: 5, amenities: ['wifi','carry-on','tv'] },
  { id: 6, airline: 'Alaska Airlines',    code: 'AS', num: 'AS 320',  from: 'LAX', fromCity: 'Los Angeles',  to: 'SFO', toCity: 'San Francisco', dep: '14:00', arr: '15:10', dur: '1h 10m', stops: 0, price: 89,  seats: 18, amenities: ['wifi','carry-on'] },
  { id: 7, airline: 'Southwest Airlines', code: 'WN', num: 'WN 2891', from: 'PHX', fromCity: 'Phoenix',       to: 'LAS', toCity: 'Las Vegas',   dep: '15:20', arr: '16:30', dur: '1h 10m', stops: 0, price: 99,  seats: 28, amenities: ['carry-on'] },
];

const AIRLINE_COLORS = {
  DL: 'bg-blue-700', UA: 'bg-blue-500', AA: 'bg-gray-700',
  WN: 'bg-orange-500', B6: 'bg-cyan-600', AS: 'bg-teal-600',
};

function FlightCard({ flight, cls }) {
  return (
    <div className="card p-5 hover:border-brand-200 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Airline */}
        <div className="flex items-center gap-3 sm:w-44 shrink-0">
          <div className={`${AIRLINE_COLORS[flight.code] || 'bg-gray-500'} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
            {flight.code}
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">{flight.airline}</p>
            <p className="text-xs text-gray-400">{flight.num}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-4 flex-1">
          <div className="text-center">
            <p className="text-xl font-black text-gray-900">{flight.dep}</p>
            <p className="text-xs font-bold text-gray-600">{flight.from}</p>
            <p className="text-xs text-gray-400">{flight.fromCity}</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <p className="text-xs text-gray-400 mb-1">{flight.dur}</p>
            <div className="w-full flex items-center gap-1">
              <div className="flex-1 h-px bg-gray-200" />
              <Plane size={14} className="text-brand-500 rotate-90" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <span className={`text-xs font-medium mt-1 ${flight.stops === 0 ? 'text-green-600' : 'text-amber-600'}`}>
              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop`}
            </span>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-gray-900">{flight.arr}</p>
            <p className="text-xs font-bold text-gray-600">{flight.to}</p>
            <p className="text-xs text-gray-400">{flight.toCity}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {flight.amenities.includes('wifi') && <span title="Wi-Fi"><Wifi size={14} className="text-gray-400" /></span>}
          {flight.amenities.includes('carry-on') && <span title="Carry-on"><Luggage size={14} className="text-gray-400" /></span>}
        </div>

        {/* Price & CTA */}
        <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-1 sm:w-32 shrink-0">
          <div className="text-right">
            <p className="text-2xl font-black text-brand-600">${flight.price}</p>
            <p className="text-xs text-gray-400">per person · {cls}</p>
            {flight.seats <= 5 && <p className="text-xs text-red-500 font-medium">{flight.seats} seats left!</p>}
          </div>
          <a
            href={`https://www.google.com/travel/flights?q=Flights+from+${encodeURIComponent(flight.fromCity)}+to+${encodeURIComponent(flight.toCity)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-2 px-4 text-sm whitespace-nowrap"
          >
            Search <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Flights() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    returnDate: '',
    passengers: searchParams.get('passengers') || '1',
    class: searchParams.get('class') || 'Economy',
    tripType: searchParams.get('tripType') || 'round',
  });
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [stopsFilter, setStopsFilter] = useState('any');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleSearch = () => setSearched(true);
  const swap = () => setForm(f => ({ ...f, from: f.to, to: f.from }));

  const results = MOCK_FLIGHTS
    .filter(f => stopsFilter === 'any' || (stopsFilter === '0' && f.stops === 0) || (stopsFilter === '1' && f.stops === 1))
    .filter(f => f.price <= maxPrice)
    .sort((a, b) => sortBy === 'price' ? a.price - b.price : sortBy === 'duration' ? a.dur.localeCompare(b.dur) : 0);

  return (
    <div>
      {/* Header */}
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Plane size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Find Flights</h1>
          </div>
          <p className="text-gray-300 text-sm">Compare hundreds of airlines and book with confidence</p>
        </div>
      </div>

      {/* Search form */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Trip type */}
          <div className="flex gap-4 mb-3 text-sm">
            {[['round','Round Trip'],['oneway','One Way'],['multi','Multi-City']].map(([val,lbl]) => (
              <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" name="tripType" value={val} checked={form.tripType === val} onChange={e => setForm(f => ({ ...f, tripType: e.target.value }))} className="accent-brand-500" />
                <span className="text-gray-600 font-medium">{lbl}</span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-end">
            {/* From */}
            <LocationAutocomplete
              value={form.from}
              onChange={v => setForm(f => ({ ...f, from: v }))}
              placeholder="From (city or airport)"
              showAirportCode
              icon={Plane}
              className="flex-1 min-w-[140px]"
              inputClassName="py-2.5"
            />
            <button onClick={swap} className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors shrink-0">
              <ArrowLeftRight size={15} className="text-gray-500" />
            </button>
            {/* To */}
            <LocationAutocomplete
              value={form.to}
              onChange={v => setForm(f => ({ ...f, to: v }))}
              placeholder="To (city or airport)"
              showAirportCode
              icon={Plane}
              className="flex-1 min-w-[140px]"
              inputClassName="py-2.5"
            />
            {/* Depart */}
            <div className="relative min-w-[130px]">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8 text-sm py-2.5" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            {form.tripType === 'round' && (
              <div className="relative min-w-[130px]">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="date" className="input-field pl-8 text-sm py-2.5" placeholder="Return" value={form.returnDate} onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))} />
              </div>
            )}
            {/* Passengers */}
            <div className="relative min-w-[120px]">
              <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="input-field pl-8 text-sm py-2.5 appearance-none" value={form.passengers} onChange={e => setForm(f => ({ ...f, passengers: e.target.value }))}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Traveler' : 'Travelers'}</option>)}
              </select>
            </div>
            {/* Class */}
            <select className="input-field text-sm py-2.5 min-w-[120px] appearance-none" value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))}>
              {['Economy','Premium Economy','Business','First'].map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={handleSearch} className="btn-primary py-2.5 px-5 text-sm">
              <Search size={15} /> Search
            </button>
          </div>
        </div>
      </div>

      {searched ? (
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* Sidebar filters */}
          <aside className={`shrink-0 w-56 space-y-6 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="card p-5">
              <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
                <SlidersHorizontal size={15} className="text-brand-500" /> Filters
              </h3>
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Max Price</p>
                  <input type="range" min="50" max="1500" step="10" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} className="w-full accent-brand-500" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50</span><span className="font-semibold text-brand-600">${maxPrice}</span><span>$1,500</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Stops</p>
                  {[['any','Any'],['0','Nonstop only'],['1','1 stop or less']].map(([v,l]) => (
                    <label key={v} className="flex items-center gap-2 py-1.5 cursor-pointer">
                      <input type="radio" name="stops" value={v} checked={stopsFilter === v} onChange={() => setStopsFilter(v)} className="accent-brand-500" />
                      <span className="text-sm text-gray-600">{l}</span>
                    </label>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Airlines</p>
                  {['Delta','United','American','Southwest','JetBlue','Alaska'].map(a => (
                    <label key={a} className="flex items-center gap-2 py-1 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-brand-500" />
                      <span className="text-sm text-gray-600">{a}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600 font-medium">{results.length} flights found</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden btn-secondary text-sm py-2 px-3">
                  <Filter size={14} /> Filters
                </button>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden text-sm">
                  {[['price','Cheapest'],['duration','Fastest'],['stops','Fewest Stops']].map(([v,l]) => (
                    <button key={v} onClick={() => setSortBy(v)} className={`px-3 py-2 font-medium transition-colors ${sortBy === v ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {results.map(f => <FlightCard key={f.id} flight={f} cls={form.class} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Plane size={56} className="text-gray-200 mx-auto mb-4" />
          <p className="text-xl font-bold text-gray-700">Search for flights above to see results</p>
          <p className="text-gray-400 mt-2">Compare prices across hundreds of airlines</p>
        </div>
      )}
    </div>
  );
}
