import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane, Building2, Car, Truck, Package, Users, Wrench,
  Navigation, Heart, UtensilsCrossed, Anchor, Globe, Star,
  ChevronDown, ChevronUp, ArrowRight, ArrowLeft, CheckCircle,
  SlidersHorizontal, MapPin, ExternalLink,
} from 'lucide-react';
import PlanStepIndicator from '../components/PlanStepIndicator';
import { buildAffiliateUrl } from '../utils/affiliateUrls';

/* ─── Category metadata ─── */
const CAT_META = {
  flights:          { label: 'Flights',                 icon: Plane,           color: 'bg-blue-500',    actionLabel: 'Search Flights' },
  hotel:            { label: 'Hotel or Lodging',        icon: Building2,       color: 'bg-violet-500',  actionLabel: 'Book Hotel' },
  rental_car:       { label: 'Rental Car',              icon: Car,             color: 'bg-amber-500',   actionLabel: 'Reserve Car' },
  moving_truck:     { label: 'Moving Truck',            icon: Truck,           color: 'bg-orange-500',  actionLabel: 'Get Quote' },
  storage_pod:      { label: 'Storage Pod',             icon: Package,         color: 'bg-teal-500',    actionLabel: 'Get Quote' },
  full_service:     { label: 'Full Service Movers',     icon: Users,           color: 'bg-emerald-600', actionLabel: 'Request Bid' },
  labor_movers:     { label: 'Labor Only Movers',       icon: Wrench,          color: 'bg-lime-600',    actionLabel: 'Request Bid' },
  vehicle_shipping: { label: 'Vehicle Shipping',        icon: Navigation,      color: 'bg-cyan-600',    actionLabel: 'Get Quote' },
  pet_travel:       { label: 'Pet Travel',              icon: Heart,           color: 'bg-pink-500',    actionLabel: 'Learn More' },
  restaurants:      { label: 'Restaurant Reservations', icon: UtensilsCrossed, color: 'bg-rose-500',    actionLabel: 'Reserve Table' },
  cruise:           { label: 'Cruise',                  icon: Anchor,          color: 'bg-sky-500',     actionLabel: 'View Cruise' },
  international:    { label: 'International Travel',    icon: Globe,           color: 'bg-indigo-500',  actionLabel: 'Learn More' },
  concierge:        { label: 'Concierge Help',          icon: Star,            color: 'bg-brand-500',   actionLabel: 'Book Consult' },
};

/* ─── All vendor data ─── */
const VENDORS = {
  flights: [
    { id: 'f1', vendorName: 'Delta Air Lines',    detail: 'JFK → LAX · Nonstop · 5h 15m',          priceLabel: '$289/person', estimatedCost: 289,  rating: 4.8, badge: 'Nonstop',    petFriendly: false, longDistance: true },
    { id: 'f2', vendorName: 'United Airlines',    detail: 'ORD → MIA · Nonstop · 3h 15m',          priceLabel: '$198/person', estimatedCost: 198,  rating: 4.6, badge: null,         petFriendly: false, longDistance: true },
    { id: 'f3', vendorName: 'JetBlue',            detail: 'BOS → FLL · Nonstop · 3h 20m',          priceLabel: '$215/person', estimatedCost: 215,  rating: 4.7, badge: 'Wi-Fi',      petFriendly: false, longDistance: true },
    { id: 'f4', vendorName: 'Southwest Airlines', detail: 'ATL → DEN · Nonstop · 3h 15m',          priceLabel: '$178/person', estimatedCost: 178,  rating: 4.5, badge: 'Best Value', petFriendly: false, longDistance: true },
  ],
  hotel: [
    { id: 'h1', vendorName: 'The Grand Hyatt',       detail: 'New York, NY · 5 stars · Pool & Spa',   priceLabel: '$449/night', estimatedCost: 449,  rating: 4.8, badge: 'Featured',   petFriendly: false, longDistance: false },
    { id: 'h2', vendorName: 'Westin Waterfront',     detail: 'Boston, MA · 4 stars · Pool & Gym',     priceLabel: '$289/night', estimatedCost: 289,  rating: 4.6, badge: 'Top Rated',  petFriendly: true,  longDistance: false },
    { id: 'h3', vendorName: 'The Ritz-Carlton',      detail: 'Miami Beach, FL · 5 stars · Luxury Spa', priceLabel: '$689/night', estimatedCost: 689,  rating: 4.9, badge: 'Luxury',     petFriendly: false, longDistance: false },
    { id: 'h4', vendorName: 'Courtyard by Marriott', detail: 'Denver, CO · 3 stars · Free Parking',   priceLabel: '$129/night', estimatedCost: 129,  rating: 4.1, badge: null,         petFriendly: true,  longDistance: false },
  ],
  rental_car: [
    { id: 'r1', vendorName: 'Enterprise — Toyota Corolla',    detail: 'Economy · Auto · 36 mpg · Unlimited miles', priceLabel: '$35/day', estimatedCost: 35,  rating: 4.6, badge: 'Best Value', petFriendly: true, longDistance: true },
    { id: 'r2', vendorName: 'Hertz — Honda CR-V',             detail: 'SUV · Auto · AWD · Apple CarPlay',          priceLabel: '$69/day', estimatedCost: 69,  rating: 4.7, badge: 'Top Rated', petFriendly: true, longDistance: true },
    { id: 'r3', vendorName: 'Avis — Ford Mustang',            detail: 'Luxury · Manual · Sport Package',           priceLabel: '$89/day', estimatedCost: 89,  rating: 4.8, badge: '🔥 Hot Deal', petFriendly: false, longDistance: true },
    { id: 'r4', vendorName: 'National — Jeep Grand Cherokee', detail: 'SUV · 4WD · Navigation · 5 seats',          priceLabel: '$79/day', estimatedCost: 79,  rating: 4.6, badge: null,         petFriendly: true, longDistance: true },
  ],
  moving_truck: [
    { id: 'mt1', vendorName: 'U-Haul',        detail: 'One-way nationwide · Trucks 10ft–26ft · Pets allowed in cab',  priceLabel: '$99–$499',   estimatedCost: 299,  rating: 4.4, badge: 'Most Popular', petFriendly: true,  longDistance: true,  extraA: 'One-way, nationwide', extraB: 'Pets allowed in cab' },
    { id: 'mt2', vendorName: 'Penske',        detail: 'One-way nationwide · Premium fleet 12ft–26ft · Pets allowed',  priceLabel: '$149–$599',  estimatedCost: 399,  rating: 4.6, badge: 'Best Rated',  petFriendly: true,  longDistance: true,  extraA: 'One-way, nationwide', extraB: 'Pets allowed in cab' },
    { id: 'mt3', vendorName: 'Budget Truck',  detail: 'One-way or local · Trucks 10ft–24ft · No pets policy',         priceLabel: '$79–$399',   estimatedCost: 249,  rating: 4.2, badge: 'Best Value',  petFriendly: false, longDistance: true,  extraA: 'One-way or local',    extraB: 'No pets policy' },
  ],
  storage_pod: [
    { id: 'sp1', vendorName: 'PODS',           detail: '7ft, 12ft, 16ft containers · Available in 50 states',          priceLabel: '$149–$349/mo',      estimatedCost: 249,  rating: 4.7, badge: 'Top Rated',   petFriendly: false, longDistance: true, extraA: '50 states', extraB: 'Up to 4 weeks free storage' },
    { id: 'sp2', vendorName: 'U-Pack',         detail: 'ReloCube or 28ft trailer · Flat rate pricing nationwide',       priceLabel: '$899–$2,199 flat',  estimatedCost: 1299, rating: 4.8, badge: 'Best Price',  petFriendly: false, longDistance: true, extraA: '48 contiguous states', extraB: 'You-pack, we-drive model' },
    { id: 'sp3', vendorName: '1-800-PACK-RAT', detail: '8ft, 12ft, 16ft containers · Climate-controlled storage',      priceLabel: '$129–$329/mo',      estimatedCost: 229,  rating: 4.5, badge: null,         petFriendly: false, longDistance: true, extraA: 'Major metro areas', extraB: 'Climate-controlled options' },
  ],
  full_service: [
    { id: 'fs1', vendorName: 'Two Men and a Truck', detail: 'Packing · Loading · Transport · Unloading included',       priceLabel: '$1,200–$3,800', estimatedCost: 2200, rating: 4.7, badge: 'Most Trusted', petFriendly: false, longDistance: true, extraA: 'Available Jul 2026', extraB: 'Licensed & insured' },
    { id: 'fs2', vendorName: 'Bellhops Moving',     detail: 'Full service + debris removal · Background-checked movers', priceLabel: '$800–$2,800',   estimatedCost: 1800, rating: 4.8, badge: 'Top Rated',   petFriendly: false, longDistance: true, extraA: 'Available Jun 2026', extraB: 'Same-day quotes' },
    { id: 'fs3', vendorName: 'Allied Van Lines',    detail: 'White glove packing · Long-distance specialist · Storage', priceLabel: '$2,000–$6,500', estimatedCost: 3500, rating: 4.5, badge: 'White Glove',  petFriendly: false, longDistance: true, extraA: 'Available Jul 2026', extraB: 'Storage available' },
  ],
  labor_movers: [
    { id: 'lm1', vendorName: 'Moving Help',        detail: '2-hr minimum · Book online · Background checked',  priceLabel: '$60–$100/hr', estimatedCost: 320, rating: 4.6, badge: 'On-Demand',    petFriendly: false, longDistance: false, extraA: 'Same-day available', extraB: '2-hour minimum' },
    { id: 'lm2', vendorName: 'TaskRabbit Movers',  detail: 'Flexible scheduling · Insured · 2-hr minimum',    priceLabel: '$55–$110/hr', estimatedCost: 280, rating: 4.7, badge: 'Flexible',     petFriendly: false, longDistance: false, extraA: 'Available today',    extraB: '2-hour minimum' },
    { id: 'lm3', vendorName: 'Lugg',               detail: '1-hr minimum · On-demand 24/7 · App-based',       priceLabel: '$75–$130/hr', estimatedCost: 350, rating: 4.8, badge: 'Tech-Enabled', petFriendly: false, longDistance: false, extraA: 'On-demand, 24/7',   extraB: '1-hour minimum' },
  ],
  vehicle_shipping: [
    { id: 'vs1', vendorName: 'AmeriFreight',             detail: 'Open & enclosed transport · Door-to-door',           priceLabel: '$599–$1,299', estimatedCost: 949,  rating: 4.7, badge: 'Best Rated',   petFriendly: false, longDistance: true, extraA: '7–14 day transit', extraB: 'Enclosed available' },
    { id: 'vs2', vendorName: 'Montway Auto Transport',   detail: 'Door-to-door · Fastest transit in the industry',     priceLabel: '$549–$1,199', estimatedCost: 874,  rating: 4.8, badge: 'Most Popular', petFriendly: false, longDistance: true, extraA: '5–10 day transit', extraB: 'Open & enclosed' },
    { id: 'vs3', vendorName: 'Sherpa Auto Transport',    detail: 'Price-lock guarantee · Open & enclosed options',     priceLabel: '$699–$1,499', estimatedCost: 1099, rating: 4.6, badge: 'Price Lock',   petFriendly: false, longDistance: true, extraA: '7–14 day transit', extraB: 'Price-lock guarantee' },
  ],
  pet_travel: [
    { id: 'pt1', vendorName: 'Pet Relocation',           detail: 'International specialist · Vet coordination & crates', priceLabel: '$500–$3,000', estimatedCost: 1200, rating: 4.8, badge: 'International', petFriendly: true, longDistance: true, extraA: 'Air & ground options', extraB: 'Health cert assistance' },
    { id: 'pt2', vendorName: 'Air Animal Pet Movers',    detail: 'Air transport specialist · Health certificates',       priceLabel: '$350–$1,800', estimatedCost: 750,  rating: 4.7, badge: 'Stress-Free',   petFriendly: true, longDistance: true, extraA: 'Air transport only',   extraB: 'All breeds accepted' },
    { id: 'pt3', vendorName: 'PetVan Ground Transport',  detail: 'Climate-controlled vans · Multiple pets welcome',     priceLabel: '$200–$900',   estimatedCost: 450,  rating: 4.6, badge: 'Budget-Friendly',petFriendly: true, longDistance: true, extraA: 'Ground transport only','extraB': 'Multiple pets discount' },
  ],
  restaurants: [
    { id: 'res1', vendorName: 'The River Grill',      detail: 'New York, NY · American · Fine Dining',      priceLabel: '$$$$', estimatedCost: 120, rating: 4.9, badge: 'Michelin ⭐', petFriendly: false, longDistance: false },
    { id: 'res2', vendorName: 'Trattoria Roma',       detail: 'Miami, FL · Italian · Vegetarian options',   priceLabel: '$$$',  estimatedCost: 80,  rating: 4.7, badge: 'Top Rated',  petFriendly: true,  longDistance: false },
    { id: 'res3', vendorName: 'Spice Route',          detail: 'Seattle, WA · Indian · Vegan & GF menu',    priceLabel: '$$',   estimatedCost: 45,  rating: 4.6, badge: 'Popular',    petFriendly: true,  longDistance: false },
    { id: 'res4', vendorName: 'Maison Élysée',        detail: 'San Francisco, CA · French · Tasting menu', priceLabel: '$$$$', estimatedCost: 150, rating: 4.9, badge: null,         petFriendly: false, longDistance: false },
  ],
  cruise: [
    { id: 'cr1', vendorName: 'Caribbean Dream',         detail: 'Royal Caribbean · 7 nights · Wonder of the Seas',   priceLabel: '$899/person',   estimatedCost: 899,  rating: 4.7, badge: 'Best Seller', petFriendly: false, longDistance: true },
    { id: 'cr2', vendorName: 'Mediterranean Odyssey',   detail: 'Norwegian · 12 nights · Barcelona to Athens',       priceLabel: '$1,299/person', estimatedCost: 1299, rating: 4.8, badge: 'Top Rated',  petFriendly: false, longDistance: true },
    { id: 'cr3', vendorName: 'Bahamas Escape',          detail: 'Carnival · 4 nights · Nassau & Freeport',           priceLabel: '$499/person',   estimatedCost: 499,  rating: 4.3, badge: 'Great Value',petFriendly: false, longDistance: true },
    { id: 'cr4', vendorName: 'European River Journey',  detail: 'Viking · 8 nights · Amsterdam to Basel',            priceLabel: '$2,499/person', estimatedCost: 2499, rating: 4.9, badge: 'Luxury',     petFriendly: false, longDistance: true },
  ],
  international: [
    { id: 'int1', vendorName: 'Document & Visa Service',       detail: 'Visa applications · Passport renewals · Travel auth', priceLabel: '$79–$299',    estimatedCost: 149, rating: 4.7, badge: 'Most Used',    petFriendly: false, longDistance: true },
    { id: 'int2', vendorName: 'Travel Insurance Pro',          detail: 'Medical · Trip cancellation · Evacuation coverage',   priceLabel: '$25–$150',    estimatedCost: 75,  rating: 4.8, badge: 'Essential',    petFriendly: false, longDistance: true },
    { id: 'int3', vendorName: 'International Trip Concierge',  detail: 'Custom itineraries · Local guides · Language support', priceLabel: '$200–$1,500', estimatedCost: 500, rating: 4.9, badge: 'Full Service', petFriendly: false, longDistance: true },
  ],
  concierge: [
    { id: 'con1', vendorName: 'Starter Package', detail: 'Itinerary outline · Restaurant recs · Email support',          priceLabel: '$99 flat',   estimatedCost: 99,  rating: 4.8, badge: 'Best Value',   petFriendly: false, longDistance: false },
    { id: 'con2', vendorName: 'Premium Package', detail: 'Full planning · Booking assistance · Priority support',        priceLabel: '$249 flat',  estimatedCost: 249, rating: 4.9, badge: 'Most Popular', petFriendly: false, longDistance: false },
    { id: 'con3', vendorName: 'Elite Package',   detail: 'Dedicated concierge · White glove service · On-call support', priceLabel: '$599 flat',  estimatedCost: 599, rating: 5.0, badge: 'White Glove',  petFriendly: false, longDistance: false },
  ],
};

/* ─── Vendor Card ─── */
function VendorCard({ vendor, isSelected, onSelect, actionLabel, affiliateUrl }) {
  return (
    <div className={`rounded-2xl border-2 p-4 transition-all duration-200 flex flex-col gap-3 ${
      isSelected
        ? 'border-brand-500 bg-brand-50 shadow-md shadow-brand-500/10'
        : 'border-gray-100 bg-white hover:border-brand-200 hover:shadow-sm'
    }`}>
      {/* Badge + rating */}
      <div className="flex items-center justify-between">
        {vendor.badge
          ? <span className="badge badge-amber text-xs">{vendor.badge}</span>
          : <span />}
        <div className="flex items-center gap-1 text-xs">
          <Star size={11} className="text-amber-400 fill-amber-400" />
          <span className="font-semibold text-gray-700">{vendor.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Name & detail */}
      <div>
        <p className={`font-bold text-sm leading-tight mb-1 ${isSelected ? 'text-brand-700' : 'text-gray-900'}`}>
          {vendor.vendorName}
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">{vendor.detail}</p>
      </div>

      {/* Extra fields (distance coverage, pet policy, availability, transit, etc.) */}
      {(vendor.extraA || vendor.extraB) && (
        <div className="space-y-1">
          {vendor.extraA && (
            <p className="text-xs text-gray-600 flex items-center gap-1.5">
              <MapPin size={10} className="text-gray-400 shrink-0" />{vendor.extraA}
            </p>
          )}
          {vendor.extraB && (
            <p className="text-xs text-gray-600 flex items-center gap-1.5">
              <CheckCircle size={10} className="text-brand-400 shrink-0" />{vendor.extraB}
            </p>
          )}
        </div>
      )}

      {/* Price */}
      <div>
        <span className={`text-lg font-black ${isSelected ? 'text-brand-600' : 'text-gray-900'}`}>
          {vendor.priceLabel}
        </span>
        <span className="text-xs text-gray-400 ml-1">est.</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        {affiliateUrl ? (
          <a
            href={affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary py-1.5 px-3 text-xs flex-1 justify-center"
          >
            {actionLabel} <ExternalLink size={10} />
          </a>
        ) : (
          <button className="btn-secondary py-1.5 px-3 text-xs flex-1">{actionLabel}</button>
        )}
        <button
          onClick={onSelect}
          className={`py-1.5 px-3 text-xs rounded-xl font-semibold border-2 transition-all flex items-center gap-1 shrink-0 ${
            isSelected
              ? 'bg-brand-500 border-brand-500 text-white'
              : 'border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600'
          }`}
        >
          {isSelected ? <><CheckCircle size={11} /> Selected</> : 'Select'}
        </button>
      </div>
    </div>
  );
}

/* ─── Category Section ─── */
function CategorySection({ catId, vendors, isOpen, onToggle, selections, onSelect, filters, tripData }) {
  const meta = CAT_META[catId];
  if (!meta) return null;
  const Icon = meta.icon;

  const affiliateUrl = buildAffiliateUrl(catId, { ...filters, ...tripData });

  const filtered = vendors.filter(v => {
    if (filters.petFriendly === 'yes' && !v.petFriendly) return false;
    if (filters.petFriendly === 'no' && v.petFriendly) return false;
    if (filters.longDistance === 'yes' && !v.longDistance) return false;
    if (filters.longDistance === 'no' && v.longDistance) return false;
    if (v.estimatedCost > filters.maxBudget) return false;
    return true;
  });

  return (
    <div className="card mb-4 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className={`${meta.color} p-2.5 rounded-xl`}>
            <Icon size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm">{meta.label}</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              {filtered.length} option{filtered.length !== 1 ? 's' : ''}
              {selections[catId] ? ` · ${selections[catId].vendorName} selected` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {selections[catId] && (
            <span className="badge badge-green text-xs">Selected</span>
          )}
          {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
              No options match your current filters. Try adjusting the filters above.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(vendor => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  isSelected={selections[catId]?.id === vendor.id}
                  onSelect={() => onSelect(catId, vendor)}
                  actionLabel={meta.actionLabel}
                  affiliateUrl={affiliateUrl}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Filters Panel ─── */
function FiltersPanel({ filters, setFilters }) {
  const [open, setOpen] = useState(true);

  const toggle = (key, val) => setFilters(f => ({ ...f, [key]: f[key] === val ? 'any' : val }));

  const ToggleGroup = ({ label, filterKey, options }) => (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{label}</p>
      <div className="flex gap-1.5 flex-wrap">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => toggle(filterKey, val)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
              filters[filterKey] === val
                ? 'bg-brand-500 text-white border-brand-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="card mb-6 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
          <SlidersHorizontal size={16} className="text-brand-500" />
          Filters
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-100 pt-4">
          <ToggleGroup label="Long Distance" filterKey="longDistance" options={[['yes', 'Yes'], ['no', 'No']]} />
          <ToggleGroup label="Pet Friendly"  filterKey="petFriendly"  options={[['yes', 'Yes'], ['no', 'No']]} />

          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Move Size</p>
            <select
              className="input-field text-sm py-2 appearance-none"
              value={filters.moveSize}
              onChange={e => setFilters(f => ({ ...f, moveSize: e.target.value }))}
            >
              {['Any', 'Studio', '1BR', '2BR', '3BR', '4BR+'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className="sm:col-span-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Max Budget per Item: <span className="text-brand-600 font-black">${filters.maxBudget.toLocaleString()}</span>
            </p>
            <input
              type="range"
              min="50"
              max="10000"
              step="50"
              value={filters.maxBudget}
              onChange={e => setFilters(f => ({ ...f, maxBudget: +e.target.value }))}
              className="w-full accent-brand-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$50</span><span>$10,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default function PlanStep2() {
  const navigate = useNavigate();

  const selectedCats = (() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_categories') || '[]'); }
    catch { return []; }
  })();

  const [selections, setSelections] = useState(() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_selections') || '{}'); }
    catch { return {}; }
  });

  const [openSections, setOpenSections] = useState(() => new Set(selectedCats));

  const tripData = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('voyager_plan_filters') || '{}');
      return {
        originCity: saved.originCity || '',
        destCity: saved.destCity || '',
        moveDate: saved.moveDate || '',
        travelers: saved.travelers || '',
      };
    } catch { return { originCity: '', destCity: '', moveDate: '', travelers: '' }; }
  })();

  const [filters, setFilters] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('voyager_plan_filters') || '{}');
      return {
        longDistance: saved.longDistance || 'any',
        petFriendly: saved.petFriendly || 'any',
        moveSize: saved.moveSize || 'Any',
        maxBudget: saved.maxBudget || 5000,
      };
    } catch {
      return { longDistance: 'any', petFriendly: 'any', moveSize: 'Any', maxBudget: 5000 };
    }
  });

  const toggleSection = (catId) => setOpenSections(prev => {
    const next = new Set(prev);
    next.has(catId) ? next.delete(catId) : next.add(catId);
    return next;
  });

  const handleSelect = (catId, vendor) => {
    setSelections(prev => {
      if (prev[catId]?.id === vendor.id) {
        const next = { ...prev };
        delete next[catId];
        return next;
      }
      return { ...prev, [catId]: vendor };
    });
  };

  const handleViewSummary = () => {
    localStorage.setItem('voyager_plan_selections', JSON.stringify(selections));
    localStorage.setItem('voyager_plan_filters', JSON.stringify({ ...filters, ...tripData }));
    navigate('/plan/summary');
  };

  const selectedCount = Object.keys(selections).length;

  if (selectedCats.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-xl font-bold text-gray-700 mb-4">No categories selected yet.</p>
        <button onClick={() => navigate('/plan')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Step 1
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-black">Compare Your Options</h1>
          <p className="text-gray-300 text-sm mt-1">Step 2 of 3 — Select the best option in each category</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <PlanStepIndicator current={2} />

        <FiltersPanel filters={filters} setFilters={setFilters} />

        {/* Trip context chip */}
        {(tripData.originCity || tripData.destCity) && (
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 bg-brand-50 border border-brand-100 rounded-xl px-4 py-2.5 w-fit flex-wrap">
            <MapPin size={13} className="text-brand-500 shrink-0" />
            <span>
              <span className="font-semibold">{tripData.originCity || '—'}</span>
              {' → '}
              <span className="font-semibold">{tripData.destCity || '—'}</span>
              {tripData.moveDate && <span className="text-gray-400"> · {tripData.moveDate}</span>}
              {tripData.travelers && <span className="text-gray-400"> · {tripData.travelers} traveler{tripData.travelers !== '1' ? 's' : ''}</span>}
            </span>
          </div>
        )}

        {selectedCats.map(catId => (
          <CategorySection
            key={catId}
            catId={catId}
            vendors={VENDORS[catId] || []}
            isOpen={openSections.has(catId)}
            onToggle={() => toggleSection(catId)}
            selections={selections}
            onSelect={handleSelect}
            filters={filters}
            tripData={tripData}
          />
        ))}

        {/* Sticky bottom bar */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl py-4 px-5 -mx-4 rounded-t-2xl mt-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <button onClick={() => navigate('/plan')} className="btn-secondary text-sm py-2.5 px-5">
              <ArrowLeft size={15} /> Back to Checklist
            </button>
            <div className="flex items-center gap-4">
              <p className="text-sm text-gray-500 font-medium">
                {selectedCount === 0
                  ? 'Select at least one option to continue'
                  : `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`}
              </p>
              <button
                onClick={handleViewSummary}
                disabled={selectedCount === 0}
                className="btn-primary px-6 text-sm"
              >
                View My Summary <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
