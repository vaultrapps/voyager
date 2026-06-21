import { useNavigate } from 'react-router-dom';
import {
  Plane, Building2, Car, Truck, Package, Users, Wrench,
  Navigation, Heart, UtensilsCrossed, Anchor, Globe, Star,
  Download, Mail, ArrowLeft, CheckCircle, ClipboardList, RotateCcw, ExternalLink,
} from 'lucide-react';
import PlanStepIndicator from '../components/PlanStepIndicator';
import { buildAffiliateUrl } from '../utils/affiliateUrls';

const CAT_META = {
  flights:          { label: 'Flights',                 icon: Plane,           color: 'bg-blue-500',    affiliate: { url: 'https://www.google.com/flights',                 btnLabel: 'Book Now' } },
  hotel:            { label: 'Hotel or Lodging',        icon: Building2,       color: 'bg-violet-500',  affiliate: { url: 'https://www.booking.com',                         btnLabel: 'Book Now' } },
  rental_car:       { label: 'Rental Car',              icon: Car,             color: 'bg-amber-500',   affiliate: { url: 'https://www.kayak.com/cars',                      btnLabel: 'Book Now' } },
  moving_truck:     { label: 'Moving Truck',            icon: Truck,           color: 'bg-orange-500',  affiliate: { url: 'https://www.uhaul.com',                           btnLabel: 'Get Quote' } },
  storage_pod:      { label: 'Storage Pod',             icon: Package,         color: 'bg-teal-500',    affiliate: { url: 'https://www.pods.com',                            btnLabel: 'Get Quote' } },
  full_service:     { label: 'Full Service Movers',     icon: Users,           color: 'bg-emerald-600', affiliate: { url: 'https://www.moving.com',                          btnLabel: 'Request Quote' } },
  labor_movers:     { label: 'Labor Only Movers',       icon: Wrench,          color: 'bg-lime-600',    affiliate: { url: 'https://www.moving.com',                          btnLabel: 'Request Quote' } },
  vehicle_shipping: { label: 'Vehicle Shipping',        icon: Navigation,      color: 'bg-cyan-600',    affiliate: { url: 'https://www.uship.com',                           btnLabel: 'Get Quote' } },
  pet_travel:       { label: 'Pet Travel',              icon: Heart,           color: 'bg-pink-500' },
  restaurants:      { label: 'Restaurant Reservations', icon: UtensilsCrossed, color: 'bg-rose-500',    affiliate: { url: 'https://www.opentable.com',                       btnLabel: 'Reserve Now' } },
  cruise:           { label: 'Cruise',                  icon: Anchor,          color: 'bg-sky-500',     affiliate: { url: 'https://www.cruises.com',                         btnLabel: 'Book Now' } },
  international:    { label: 'International Travel',    icon: Globe,           color: 'bg-indigo-500' },
  concierge:        { label: 'Concierge Help',          icon: Star,            color: 'bg-brand-500' },
};

export default function PlanStep3() {
  const navigate = useNavigate();

  const categories = (() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_categories') || '[]'); }
    catch { return []; }
  })();

  const selections = (() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_selections') || '{}'); }
    catch { return {}; }
  })();

  const planFilters = (() => {
    try { return JSON.parse(localStorage.getItem('voyager_plan_filters') || '{}'); }
    catch { return {}; }
  })();

  const tripLine = [
    planFilters.originCity && planFilters.destCity
      ? `${planFilters.originCity} → ${planFilters.destCity}`
      : planFilters.originCity || planFilters.destCity || null,
    planFilters.moveDate || null,
    planFilters.travelers ? `${planFilters.travelers} traveler${planFilters.travelers !== '1' ? 's' : ''}` : null,
  ].filter(Boolean).join(' · ');

  const items = categories
    .filter(catId => selections[catId])
    .map(catId => ({
      catId,
      meta: CAT_META[catId],
      vendor: selections[catId],
    }));

  const total = items.reduce((sum, item) => sum + (item.vendor.estimatedCost || 0), 0);

  const handleStartOver = () => {
    localStorage.removeItem('voyager_plan_categories');
    localStorage.removeItem('voyager_plan_selections');
    localStorage.removeItem('voyager_plan_filters');
    navigate('/plan');
  };

  const handleDownload = () => window.print();

  const handleEmail = () => {
    const subject = 'My Voyager Trip Plan';
    const lines = items.map(i =>
      `${i.meta?.label}: ${i.vendor.vendorName} — Est. $${i.vendor.estimatedCost?.toLocaleString() || 'TBD'}`
    );
    const body = [
      'My Voyager Trip Plan',
      '='.repeat(40),
      ...lines,
      '='.repeat(40),
      `TOTAL ESTIMATED COST: $${total.toLocaleString()}`,
      '',
      'Prices are estimates. Contact each vendor to confirm final pricing.',
      '',
      'Plan created at choosevoyager.com',
    ].join('\n');
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <ClipboardList size={52} className="text-gray-200 mx-auto mb-4" />
        <p className="text-xl font-bold text-gray-700 mb-2">No selections yet</p>
        <p className="text-gray-400 text-sm mb-6">Go back and select options to build your summary.</p>
        <button onClick={() => navigate('/plan/compare')} className="btn-primary">
          <ArrowLeft size={16} /> Back to Compare
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero print:hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <ClipboardList size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">Your Trip Summary</h1>
          </div>
          <p className="text-gray-300 text-sm">Step 3 of 3 — Review your personalized plan</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="print:hidden">
          <PlanStepIndicator current={3} />
        </div>

        {/* Invoice card */}
        <div className="card overflow-hidden" id="voyager-summary">
          {/* Invoice header */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white px-6 py-8 text-center print:bg-gray-900">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="bg-brand-500 rounded-lg p-1.5">
                <ClipboardList size={18} className="text-white" />
              </div>
              <span className="text-xl font-black">Voyager</span>
            </div>
            <h2 className="text-2xl font-black mt-3">Trip Plan Summary</h2>
            <p className="text-gray-400 text-sm mt-1">choosevoyager.com · Estimated costs only</p>
            {tripLine && (
              <p className="text-brand-300 text-xs mt-2 font-medium">{tripLine}</p>
            )}
          </div>

          {/* Line items */}
          <div className="divide-y divide-gray-100">
            {items.map(({ catId, meta, vendor }) => {
              const Icon = meta?.icon || Star;
              const aff = meta?.affiliate;
              const affiliateUrl = buildAffiliateUrl(catId, planFilters);
              return (
                <div key={catId} className="flex items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors">
                  <div className={`${meta?.color || 'bg-gray-400'} p-2.5 rounded-xl shrink-0 mt-0.5`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{meta?.label}</p>
                    <p className="font-bold text-gray-900 text-sm leading-tight">{vendor.vendorName}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{vendor.detail}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <div>
                      <p className="text-lg font-black text-brand-600">
                        ${(vendor.estimatedCost || 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-400">estimate</p>
                    </div>
                    {aff && affiliateUrl && (
                      <a
                        href={affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg transition-colors print:hidden whitespace-nowrap"
                      >
                        {aff.btnLabel} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Total Estimated Cost</p>
              <p className="text-xs text-gray-400 mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''} selected</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-black text-brand-600">${total.toLocaleString()}</p>
              <p className="text-xs text-gray-400">USD · estimated</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="px-6 py-4 bg-brand-50 border-t border-brand-100">
            <p className="text-xs text-brand-700 leading-relaxed">
              <strong>Pricing Disclaimer:</strong> All costs shown are estimates based on typical market rates. Final pricing may vary based on dates, availability, location, and vendor-specific terms. Contact each vendor directly to confirm pricing and availability.
            </p>
          </div>
        </div>

        {/* Checklist of selected items */}
        <div className="mt-6 card p-5">
          <h3 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <CheckCircle size={15} className="text-brand-500" /> What's included in your plan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map(({ catId, meta, vendor }) => (
              <div key={catId} className="flex items-center gap-2.5">
                <CheckCircle size={14} className="text-brand-400 shrink-0" />
                <span className="text-sm text-gray-700">
                  <span className="font-semibold">{meta?.label}:</span> {vendor.vendorName}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={() => navigate('/plan/compare')}
            className="btn-secondary text-sm py-3 flex-1"
          >
            <ArrowLeft size={15} /> Edit Selections
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary text-sm py-3 flex-1"
          >
            <Download size={15} /> Download PDF
          </button>
          <button
            onClick={handleEmail}
            className="btn-primary text-sm py-3 flex-1"
          >
            <Mail size={15} /> Email Summary
          </button>
        </div>

        <div className="mt-4 text-center print:hidden">
          <button
            onClick={handleStartOver}
            className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1.5 mx-auto transition-colors"
          >
            <RotateCcw size={13} /> Start a new plan
          </button>
        </div>
      </div>
    </div>
  );
}
