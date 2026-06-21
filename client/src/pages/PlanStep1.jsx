import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane, Building2, Car, Truck, Package, Users, Wrench,
  Navigation, Heart, UtensilsCrossed, Anchor, Globe, Star,
  ArrowRight, CheckCircle, ClipboardList, MapPin, Calendar, PawPrint,
} from 'lucide-react';
import PlanStepIndicator from '../components/PlanStepIndicator';
import LocationAutocomplete from '../components/LocationAutocomplete';

const CATEGORIES = [
  { id: 'flights',          label: 'Flights',                 icon: Plane,           color: 'bg-blue-500',    desc: 'Search & compare airfare across all major airlines' },
  { id: 'hotel',            label: 'Hotel or Lodging',        icon: Building2,       color: 'bg-violet-500',  desc: 'Find hotels, inns, and extended-stay accommodations' },
  { id: 'rental_car',       label: 'Rental Car',              icon: Car,             color: 'bg-amber-500',   desc: 'Compare rental car companies and daily rates' },
  { id: 'moving_truck',     label: 'Moving Truck',            icon: Truck,           color: 'bg-orange-500',  desc: 'Reserve a moving truck for your DIY move' },
  { id: 'storage_pod',      label: 'Storage Pod',             icon: Package,         color: 'bg-teal-500',    desc: 'Portable storage containers delivered to your door' },
  { id: 'full_service',     label: 'Full Service Movers',     icon: Users,           color: 'bg-emerald-600', desc: 'Professional movers who pack, load, and deliver everything' },
  { id: 'labor_movers',     label: 'Labor Only Movers',       icon: Wrench,          color: 'bg-lime-600',    desc: 'Muscle & expertise — you provide the truck or pod' },
  { id: 'vehicle_shipping', label: 'Vehicle Shipping',        icon: Navigation,      color: 'bg-cyan-600',    desc: 'Ship your car, truck, or motorcycle safely across country' },
  { id: 'pet_travel',       label: 'Pet Travel',              icon: Heart,           color: 'bg-pink-500',    desc: 'Safe travel arrangements for your furry family members' },
  { id: 'restaurants',      label: 'Restaurant Reservations', icon: UtensilsCrossed, color: 'bg-rose-500',    desc: 'Reserve top tables at the best restaurants in your destination' },
  { id: 'cruise',           label: 'Cruise',                  icon: Anchor,          color: 'bg-sky-500',     desc: 'Set sail on the perfect cruise for any budget or destination' },
  { id: 'international',    label: 'International Travel',    icon: Globe,           color: 'bg-indigo-500',  desc: 'Visas, travel advisories, currency, and international planning' },
  { id: 'concierge',        label: 'Concierge Help',          icon: Star,            color: 'bg-brand-500',   desc: 'Let our expert team handle every detail of your trip for you' },
];

export default function PlanStep1() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_categories') || '[]'); }
    catch { return []; }
  });

  const [tripDetails, setTripDetails] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('voyager_plan_filters') || '{}');
      return {
        from: saved.originCity || '',
        to: saved.destCity || '',
        date: saved.moveDate || '',
        travelers: saved.travelers || '1',
        petFriendly: saved.petFriendly || 'any',
        longDistance: saved.longDistance || 'any',
        moveSize: saved.moveSize || 'Any',
        maxBudget: saved.maxBudget || 5000,
      };
    } catch { return { from: '', to: '', date: '', travelers: '1', petFriendly: 'any', longDistance: 'any', moveSize: 'Any', maxBudget: 5000 }; }
  });

  const toggle = (id) => setSelected(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const canContinue = selected.length > 0 && tripDetails.from.trim() && tripDetails.to.trim() && tripDetails.date;

  const handleContinue = () => {
    localStorage.setItem('voyager_plan_categories', JSON.stringify(selected));
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('voyager_plan_filters') || '{}'); }
      catch { return {}; }
    })();
    localStorage.setItem('voyager_plan_filters', JSON.stringify({
      ...existing,
      originCity: tripDetails.from.trim(),
      destCity: tripDetails.to.trim(),
      moveDate: tripDetails.date,
      travelers: tripDetails.travelers,
      petFriendly: tripDetails.petFriendly,
      longDistance: tripDetails.longDistance,
      moveSize: tripDetails.moveSize,
      maxBudget: tripDetails.maxBudget,
    }));
    navigate('/plan/compare');
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Plan My Trip</h1>
          </div>
          <p className="text-gray-300 text-sm">Your personalized travel &amp; relocation planner</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <PlanStepIndicator current={1} />

        {/* Trip Details */}
        <div className="card p-6 mb-8">
          <h2 className="font-bold text-gray-900 text-base mb-5 flex items-center gap-2">
            <MapPin size={16} className="text-brand-500" /> Where are you going?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                From <span className="text-red-400">*</span>
              </label>
              <LocationAutocomplete
                value={tripDetails.from}
                onChange={v => setTripDetails(d => ({ ...d, from: v }))}
                placeholder="City or airport"
                showAirportCode
                icon={MapPin}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                To <span className="text-red-400">*</span>
              </label>
              <LocationAutocomplete
                value={tripDetails.to}
                onChange={v => setTripDetails(d => ({ ...d, to: v }))}
                placeholder="City or airport"
                showAirportCode
                icon={MapPin}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Travel / Move Date <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="date"
                  className="input-field pl-8 text-sm"
                  value={tripDetails.date}
                  onChange={e => setTripDetails(d => ({ ...d, date: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-100">
            {/* Number of Travelers */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                <Users size={11} className="inline mr-1 text-gray-400" /> Travelers
              </label>
              <select
                className="input-field text-sm"
                value={tripDetails.travelers}
                onChange={e => setTripDetails(d => ({ ...d, travelers: e.target.value }))}
              >
                {['1','2','3','4','5','6','7','8','9','10+'].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Pets */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                <PawPrint size={11} className="inline mr-1 text-gray-400" /> Traveling with Pets
              </label>
              <div className="flex gap-1.5">
                {[['yes', 'Yes'], ['no', 'No'], ['any', 'Any']].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTripDetails(d => ({ ...d, petFriendly: val }))}
                    className={`flex-1 px-2 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      tripDetails.petFriendly === val
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Long Distance */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Long Distance
              </label>
              <div className="flex gap-1.5">
                {[['yes', 'Yes'], ['no', 'No'], ['any', 'Any']].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setTripDetails(d => ({ ...d, longDistance: val }))}
                    className={`flex-1 px-2 py-2 rounded-xl text-xs font-medium border transition-colors ${
                      tripDetails.longDistance === val
                        ? 'bg-brand-500 text-white border-brand-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Move Size */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Move Size
              </label>
              <select
                className="input-field text-sm"
                value={tripDetails.moveSize}
                onChange={e => setTripDetails(d => ({ ...d, moveSize: e.target.value }))}
              >
                {['Any', 'Studio', '1BR', '2BR', '3BR', '4BR+'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>

            {/* Max Budget */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                Max Budget: <span className="text-brand-600 font-black">${tripDetails.maxBudget.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50"
                max="10000"
                step="50"
                value={tripDetails.maxBudget}
                onChange={e => setTripDetails(d => ({ ...d, maxBudget: +e.target.value }))}
                className="w-full accent-brand-500 mt-1"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$50</span><span>$10k</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">What do you need?</h2>
          <p className="text-gray-500 mt-2">Check everything that applies — we'll build a personalized comparison just for you.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {CATEGORIES.map(({ id, label, icon: Icon, color, desc }) => {
            const checked = selected.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                  checked
                    ? 'border-brand-500 bg-brand-50 shadow-md'
                    : 'border-gray-100 bg-white hover:border-brand-200 shadow-sm'
                }`}
              >
                <div className={`${color} p-3 rounded-xl shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`font-bold text-sm leading-tight ${checked ? 'text-brand-700' : 'text-gray-900'}`}>{label}</span>
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                      checked ? 'bg-brand-500 border-brand-500' : 'border-gray-300 bg-white'
                    }`}>
                      {checked && <CheckCircle size={11} className="text-white" />}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-500">
            {!tripDetails.from.trim() || !tripDetails.to.trim() || !tripDetails.date
              ? 'Enter your origin, destination, and date to continue'
              : selected.length === 0
              ? 'Select at least one item to continue'
              : `${selected.length} item${selected.length !== 1 ? 's' : ''} selected`}
          </p>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="btn-primary px-8"
          >
            Continue to Compare <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
