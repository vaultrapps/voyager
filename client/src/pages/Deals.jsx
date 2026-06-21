import { useState } from 'react';
import {
  Tag, Plane, Building2, Anchor, Car, Clock, ArrowRight,
  ExternalLink, Star, Zap,
} from 'lucide-react';

const DEALS = [
  {
    id: 1, category: 'flight',
    title: 'New York → Cancún',
    subtitle: 'American Airlines · Nonstop · Jul 10–17',
    originalPrice: 449, salePrice: 199,
    discount: '56% OFF', endsIn: 3,
    grad: 'from-blue-500 to-indigo-600',
    icon: Plane,
    badge: 'Flash Sale',
    link: 'https://www.google.com/travel/flights?q=Flights+from+New+York+to+Cancun',
  },
  {
    id: 2, category: 'flight',
    title: 'Los Angeles → Tokyo',
    subtitle: 'United Airlines · 1 Stop · Aug 5–19',
    originalPrice: 1299, salePrice: 749,
    discount: '42% OFF', endsIn: 7,
    grad: 'from-rose-500 to-red-700',
    icon: Plane,
    badge: 'Limited Seats',
    link: 'https://www.google.com/travel/flights?q=Flights+from+Los+Angeles+to+Tokyo',
  },
  {
    id: 3, category: 'flight',
    title: 'Chicago → Miami',
    subtitle: 'Southwest Airlines · Nonstop · Jul 20',
    originalPrice: 289, salePrice: 99,
    discount: '66% OFF', endsIn: 1,
    grad: 'from-orange-500 to-amber-600',
    icon: Plane,
    badge: '🔥 Today Only',
    link: 'https://www.google.com/travel/flights?q=Flights+from+Chicago+to+Miami',
  },
  {
    id: 4, category: 'hotel',
    title: 'The Ritz-Carlton Miami',
    subtitle: 'Miami Beach · 5-Star · 3 nights',
    originalPrice: 689, salePrice: 389,
    discount: '44% OFF', endsIn: 5,
    grad: 'from-amber-400 to-orange-600',
    icon: Building2,
    badge: 'Weekend Deal',
  },
  {
    id: 5, category: 'hotel',
    title: 'Westin Waterfront Boston',
    subtitle: 'Boston, MA · 4-Star · Per night',
    originalPrice: 289, salePrice: 159,
    discount: '45% OFF', endsIn: 10,
    grad: 'from-cyan-600 to-sky-700',
    icon: Building2,
    badge: 'Members Only',
  },
  {
    id: 6, category: 'hotel',
    title: 'W Hollywood Los Angeles',
    subtitle: 'LA, CA · 4-Star · Per night',
    originalPrice: 359, salePrice: 199,
    discount: '45% OFF', endsIn: 4,
    grad: 'from-purple-600 to-pink-700',
    icon: Building2,
    badge: 'Hot Deal',
  },
  {
    id: 7, category: 'cruise',
    title: 'Caribbean Dream — 7 Nights',
    subtitle: 'Royal Caribbean · Miami → Nassau → CocoCay',
    originalPrice: 1299, salePrice: 899,
    discount: '31% OFF', endsIn: 14,
    grad: 'from-cyan-500 to-blue-600',
    icon: Anchor,
    badge: 'Early Bird',
  },
  {
    id: 8, category: 'cruise',
    title: 'Bahamas Escape — 4 Nights',
    subtitle: 'Carnival · Port Canaveral → Nassau → Freeport',
    originalPrice: 799, salePrice: 499,
    discount: '38% OFF', endsIn: 6,
    grad: 'from-amber-500 to-orange-500',
    icon: Anchor,
    badge: 'Last Minute',
  },
  {
    id: 9, category: 'car',
    title: 'Toyota Corolla — Economy',
    subtitle: 'Enterprise · Unlimited Miles · Any city',
    originalPrice: 55, salePrice: 35,
    discount: '36% OFF', endsIn: 8,
    grad: 'from-blue-500 to-blue-700',
    icon: Car,
    badge: 'Best Value',
  },
  {
    id: 10, category: 'car',
    title: 'Honda CR-V — SUV',
    subtitle: 'Hertz · AWD · Unlimited Miles',
    originalPrice: 99, salePrice: 69,
    discount: '30% OFF', endsIn: 5,
    grad: 'from-amber-500 to-orange-600',
    icon: Car,
    badge: 'Top Rated',
  },
];

const TABS = [
  { id: 'all',    label: 'All Deals',     icon: Tag },
  { id: 'flight', label: 'Flights',       icon: Plane },
  { id: 'hotel',  label: 'Hotels',        icon: Building2 },
  { id: 'cruise', label: 'Cruises',       icon: Anchor },
  { id: 'car',    label: 'Car Rentals',   icon: Car },
];

function DealCard({ deal }) {
  const Icon = deal.icon;
  const savings = deal.originalPrice - deal.salePrice;

  return (
    <div className="card group overflow-hidden">
      <div className={`bg-gradient-to-br ${deal.grad} h-36 relative flex items-end p-4`}>
        <span className="absolute top-3 left-3 badge badge-amber">{deal.badge}</span>
        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-2 py-1 rounded-full">{deal.discount}</span>
        <Icon size={48} className="text-white/20 absolute right-4 top-1/2 -translate-y-1/2" />
        <div className="relative z-10">
          <p className="text-white font-black text-base leading-tight">{deal.title}</p>
          <p className="text-white/70 text-xs mt-0.5">{deal.subtitle}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 line-through">${deal.originalPrice.toLocaleString()}</p>
            <p className="text-2xl font-black text-brand-600">${deal.salePrice.toLocaleString()}</p>
            <p className="text-xs text-green-600 font-semibold">Save ${savings.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
            <Clock size={11} />
            <span className="font-semibold">
              {deal.endsIn === 1 ? 'Ends today' : `${deal.endsIn} days left`}
            </span>
          </div>
        </div>

        {deal.link ? (
          <a
            href={deal.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2"
          >
            Book This Deal <ExternalLink size={13} />
          </a>
        ) : (
          <button className="btn-primary w-full text-sm py-2.5">
            Book This Deal <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function Deals() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? DEALS : DEALS.filter(d => d.category === activeTab);
  const endingSoon = DEALS.filter(d => d.endsIn <= 3).length;

  return (
    <div>
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2132 0%, #1D9E75 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 text-amber-300 text-sm font-medium mb-5">
            <Zap size={13} className="fill-amber-400 text-amber-400" />
            {endingSoon} deals ending soon
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Travel Deals
          </h1>
          <p className="text-gray-200 text-lg max-w-xl mx-auto">
            Exclusive discounts on flights, hotels, cruises & car rentals — updated daily.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-3">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === id ? 'bg-brand-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={14} /> {label}
                {id === 'all' && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeTab === id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {DEALS.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Urgency banner */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <Zap size={18} className="text-red-500 shrink-0" />
          <p className="text-sm text-red-700 font-medium">
            <span className="font-black">{endingSoon} deals ending in 3 days or less.</span> Book now before they're gone.
          </p>
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-600 font-medium">{filtered.length} deals available</p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Star size={12} className="text-amber-400 fill-amber-400" /> Deals updated daily
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(deal => <DealCard key={deal.id} deal={deal} />)}
        </div>
      </div>
    </div>
  );
}
