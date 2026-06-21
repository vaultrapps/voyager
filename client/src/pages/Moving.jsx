import { useState } from 'react';
import {
  Truck, MapPin, Calendar, Package, Star, Phone, CheckCircle, ArrowRight,
  Calculator, ClipboardList, Home, DollarSign, ChevronDown, ChevronUp,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const MOVERS = [
  { id: 1, name: 'Allied Van Lines',      rating: 4.7, reviews: 8231, price: '$2,800–$5,200', specialty: 'Long Distance', badge: 'Top Rated',   grad: 'bg-blue-600' },
  { id: 2, name: 'Two Men and a Truck',   rating: 4.5, reviews: 15432, price: '$800–$2,100',  specialty: 'Local Moves',   badge: 'Best Value', grad: 'bg-orange-500' },
  { id: 3, name: 'North American Van',    rating: 4.6, reviews: 5678, price: '$2,500–$4,800', specialty: 'Long Distance',                        grad: 'bg-green-600' },
  { id: 4, name: 'PODS Moving & Storage', rating: 4.4, reviews: 9823, price: '$1,200–$3,400', specialty: 'Flexible Storage', badge: 'Flexible',  grad: 'bg-yellow-500' },
  { id: 5, name: 'U-Pack',               rating: 4.6, reviews: 6123, price: '$1,800–$3,200', specialty: 'Self-Pack',     badge: 'DIY Friendly', grad: 'bg-red-500' },
];

const CHECKLIST = {
  '8 Weeks Before': [
    'Research and book moving company or truck rental',
    'Start sorting and decluttering belongings',
    'Notify employer of new address (HR)',
    'Research schools if moving with children',
    'Begin collecting moving boxes and supplies',
  ],
  '6 Weeks Before': [
    'Change address with USPS (forward mail)',
    'Notify bank, credit cards, and financial institutions',
    'Transfer medical and dental records',
    'Contact utility companies to schedule transfers',
    'Create an inventory of all valuables',
  ],
  '4 Weeks Before': [
    'Confirm moving date with moving company',
    'Pack non-essential items and seasonal belongings',
    'Arrange childcare and pet care for moving day',
    'Transfer vehicle registration and insurance',
    'Notify subscriptions and memberships',
  ],
  '2 Weeks Before': [
    'Pack most belongings (leave out essentials)',
    'Clean out refrigerator and freezer',
    'Confirm utility start dates at new location',
    'Set up mail forwarding if not done',
    'Make travel arrangements for moving day',
  ],
  'Moving Day': [
    'Do a final walkthrough of old home',
    'Document the condition of old and new homes',
    'Photograph all rooms before and after',
    'Ensure utilities are on at new home',
    'Keep important documents with you (not in moving truck)',
  ],
};

const HOME_SIZES = [
  { label: 'Studio / 1 BR',    est: '$800–$2,000' },
  { label: '2–3 Bedroom',      est: '$1,800–$5,000' },
  { label: '4–5 Bedroom',      est: '$4,000–$10,000' },
  { label: '6+ Bedroom / Large',est: '$8,000+' },
];

export default function Moving() {
  const [form, setForm] = useState({ from: '', to: '', moveDate: '', homeSize: '2–3 Bedroom', services: [] });
  const [calcResult, setCalcResult] = useState(null);
  const [expandedWeek, setExpandedWeek] = useState('8 Weeks Before');
  const [checkedItems, setCheckedItems] = useState({});

  const toggleService = (svc) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(svc) ? f.services.filter(s => s !== svc) : [...f.services, svc],
    }));
  };

  const calculate = () => {
    const size = HOME_SIZES.find(h => h.label === form.homeSize);
    setCalcResult(size?.est || '$1,500–$4,000');
  };

  const toggleCheck = (week, item) => {
    const key = `${week}::${item}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Truck size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Moving & Relocation</h1>
          </div>
          <p className="text-gray-300 text-sm">Stress-free moves with trusted movers, cost estimates, and checklists</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Get Quotes */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Truck size={20} className="text-brand-500" /> Get Moving Quotes
          </h2>
          <p className="text-gray-500 text-sm mb-5">Compare quotes from top-rated movers in minutes</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <LocationAutocomplete
              value={form.from}
              onChange={v => setForm(f => ({ ...f, from: v }))}
              placeholder="Moving from (city)"
            />
            <LocationAutocomplete
              value={form.to}
              onChange={v => setForm(f => ({ ...f, to: v }))}
              placeholder="Moving to (city)"
            />
            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="input-field pl-8" value={form.moveDate} onChange={e => setForm(f => ({ ...f, moveDate: e.target.value }))} />
            </div>
            <select className="input-field appearance-none" value={form.homeSize} onChange={e => setForm(f => ({ ...f, homeSize: e.target.value }))}>
              {HOME_SIZES.map(h => <option key={h.label}>{h.label}</option>)}
            </select>
          </div>
          <div className="mb-5">
            <p className="text-sm font-semibold text-gray-700 mb-2">Additional services needed:</p>
            <div className="flex flex-wrap gap-2">
              {['Full-service packing','Unpacking','Auto transport','Storage','Piano moving','Art & antiques','Junk removal'].map(svc => (
                <button
                  key={svc}
                  onClick={() => toggleService(svc)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    form.services.includes(svc) ? 'bg-brand-500 text-white border-brand-500' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
                  }`}
                >
                  {svc}
                </button>
              ))}
            </div>
          </div>
          <button className="btn-primary">
            <Truck size={15} /> Get Free Quotes
          </button>
        </div>

        {/* Cost Calculator */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calculator size={20} className="text-brand-500" /> Moving Cost Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-5">Get an instant estimate based on your move details</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Home Size</label>
              <select className="input-field appearance-none" value={form.homeSize} onChange={e => setForm(f => ({ ...f, homeSize: e.target.value }))}>
                {HOME_SIZES.map(h => <option key={h.label}>{h.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Move Type</label>
              <select className="input-field appearance-none">
                <option>Long Distance (100+ miles)</option>
                <option>Local (under 100 miles)</option>
                <option>Cross-country</option>
                <option>International</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Move Month</label>
              <select className="input-field appearance-none">
                <option>June (Peak)</option>
                <option>July (Peak)</option>
                <option>August (Peak)</option>
                <option>September (Shoulder)</option>
                <option>October–May (Off-peak)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} className="btn-primary mb-4">
            <Calculator size={15} /> Calculate Estimate
          </button>
          {calcResult && (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 inline-flex items-center gap-3">
              <DollarSign size={20} className="text-brand-600" />
              <div>
                <p className="text-xs text-brand-600 font-medium">Estimated Moving Cost</p>
                <p className="text-2xl font-black text-brand-700">{calcResult}</p>
                <p className="text-xs text-brand-500 mt-0.5">Based on average moving company rates</p>
              </div>
            </div>
          )}
        </div>

        {/* Moving Companies */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Top-Rated Moving Companies</h2>
          <p className="text-gray-500 text-sm mb-4">Verified reviews from thousands of customers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOVERS.map(mover => (
              <div key={mover.id} className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`${mover.grad} w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {mover.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900 text-sm">{mover.name}</p>
                      {mover.badge && <span className="badge badge-green">{mover.badge}</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold">{mover.rating}</span>
                      <span className="text-xs text-gray-400">({mover.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">Specialty: <span className="font-medium text-gray-700">{mover.specialty}</span></p>
                <p className="text-xs text-gray-500 mb-4">Estimate range: <span className="font-bold text-brand-600">{mover.price}</span></p>
                <div className="flex gap-2">
                  <button className="btn-primary flex-1 py-2 text-sm">Get Quote</button>
                  <button className="btn-secondary py-2 px-3 text-sm">
                    <Phone size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Moving Checklist */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <ClipboardList size={20} className="text-brand-500" /> Moving Checklist
          </h2>
          <p className="text-gray-500 text-sm mb-5">Everything you need to do, organized by timeline</p>
          <div className="space-y-3">
            {Object.entries(CHECKLIST).map(([week, items]) => (
              <div key={week} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedWeek(expandedWeek === week ? null : week)}
                >
                  <span className="font-semibold text-gray-800 text-sm">{week}</span>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-green text-xs">
                      {items.filter(i => checkedItems[`${week}::${i}`]).length}/{items.length} done
                    </span>
                    {expandedWeek === week ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>
                {expandedWeek === week && (
                  <div className="p-4 space-y-2">
                    {items.map(item => (
                      <label key={item} className="flex items-start gap-3 cursor-pointer group">
                        <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checkedItems[`${week}::${item}`] ? 'bg-brand-500 border-brand-500' : 'border-gray-300 group-hover:border-brand-400'}`}
                          onClick={() => toggleCheck(week, item)}
                        >
                          {checkedItems[`${week}::${item}`] && <CheckCircle size={10} className="text-white" />}
                        </div>
                        <span className={`text-sm transition-colors ${checkedItems[`${week}::${item}`] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
