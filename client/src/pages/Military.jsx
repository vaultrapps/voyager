import { useState } from 'react';
import {
  Shield, Calculator, Home, GraduationCap, CheckCircle, DollarSign,
  MapPin, Calendar, FileText, ChevronDown, ChevronUp, Star, Phone,
  Car, Package, Users, AlertCircle,
} from 'lucide-react';

const PAY_GRADES = ['E-1','E-2','E-3','E-4','E-5','E-6','E-7','E-8','E-9','W-1','W-2','W-3','W-4','W-5','O-1','O-2','O-3','O-4','O-5','O-6','O-7','O-8','O-9','O-10'];

const BAH_RATES = {
  'O-6': { with: 3456, without: 2845 },
  'O-5': { with: 2987, without: 2456 },
  'O-4': { with: 2765, without: 2234 },
  'O-3': { with: 2543, without: 2012 },
  'O-2': { with: 2234, without: 1789 },
  'O-1': { with: 1987, without: 1567 },
  'E-9': { with: 2654, without: 2123 },
  'E-8': { with: 2345, without: 1876 },
  'E-7': { with: 2123, without: 1698 },
  'E-6': { with: 1987, without: 1567 },
  'E-5': { with: 1765, without: 1398 },
  'E-4': { with: 1543, without: 1234 },
  'E-3': { with: 1321, without: 1089 },
  'E-2': { with: 1234, without: 987  },
  'E-1': { with: 1145, without: 923  },
};

const PCS_TIMELINE = [
  { phase: '90+ Days Out',   color: 'bg-blue-500',   items: ['Receive PCS orders','Schedule IPAC/Household Goods appointment','Research new duty station','Notify children\'s schools','Start house-hunting research'] },
  { phase: '60 Days Out',    color: 'bg-indigo-500',  items: ['Schedule DITY/PPM move or HHG pickup','Contact housing office at gaining installation','Begin decluttering and selling/donating','Transfer healthcare providers','Update wills and POA documents'] },
  { phase: '30 Days Out',    color: 'bg-violet-500',  items: ['Confirm housing arrangements','Schedule vehicle transport if needed','Pack essential documents bag','Close local accounts or transfer banks','Forward mail with USPS'] },
  { phase: '2 Weeks Out',    color: 'bg-purple-500',  items: ['Final HHG survey and pickup','Clean and hand back base housing','Ensure all prescriptions are filled (90-day supply)','Arrange care for pets during travel','Check vehicle and plan route/hotels'] },
  { phase: 'Arrival Week',   color: 'bg-brand-500',   items: ['Report to gaining unit','In-process at IPAC/S1/G1','Enroll children in new school','Register vehicles in new state','Set up banking and local services'] },
];

const WEIGHT_ALLOWANCES = {
  'E-1': 5000, 'E-2': 5000, 'E-3': 5000, 'E-4': 7000, 'E-5': 7000,
  'E-6': 11000, 'E-7': 11000, 'E-8': 12000, 'E-9': 13500,
  'O-1': 10000, 'O-2': 12500, 'O-3': 13000, 'O-4': 14000, 'O-5': 14500, 'O-6': 17500,
};

const RESOURCES = [
  { title: 'VA Home Loan',              desc: 'No down payment, no PMI — exclusive benefit for veterans and active duty', icon: Home, link: '#' },
  { title: 'Spouse Employment',         desc: 'MyCAA scholarships and spouse employment resources', icon: Users, link: '#' },
  { title: 'SCRA Benefits',             desc: 'Servicemembers Civil Relief Act — interest rate caps and lease protections', icon: Shield, link: '#' },
  { title: 'TRICARE Enrollment',        desc: 'Transfer your TRICARE coverage to your new region', icon: AlertCircle, link: '#' },
  { title: 'Pet Travel & Quarantine',   desc: 'Rules for moving pets internationally (OCONUS)', icon: Package, link: '#' },
  { title: 'Vehicle Shipment (POV)',    desc: 'Personally Owned Vehicle shipping through TMO', icon: Car, link: '#' },
];

export default function Military() {
  const [bahGrade, setBahGrade]     = useState('O-3');
  const [hasDeps, setHasDeps]       = useState(true);
  const [bahZip, setBahZip]         = useState('');
  const [bahResult, setBahResult]   = useState(null);
  const [expandedPhase, setExpandedPhase] = useState('90+ Days Out');
  const [checkedItems, setCheckedItems]   = useState({});
  const [weightGrade, setWeightGrade] = useState('E-5');

  const calculateBAH = () => {
    const rate = BAH_RATES[bahGrade] || BAH_RATES['E-5'];
    setBahResult({ rate: hasDeps ? rate.with : rate.without, grade: bahGrade, deps: hasDeps, zip: bahZip || '22314 (Arlington, VA)' });
  };

  const toggleCheck = (phase, item) => {
    const key = `${phase}::${item}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const weightAllowance = WEIGHT_ALLOWANCES[weightGrade] || 10000;

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-800 to-navy-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={22} className="text-amber-400" />
            <span className="badge badge-amber">Military &amp; Government</span>
          </div>
          <h1 className="text-3xl font-black mt-2">Military PCS Tools</h1>
          <p className="text-gray-300 text-sm mt-2 max-w-lg">Everything active duty, veterans, and military families need to make PCS moves and travel seamless.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* BAH Calculator */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Calculator size={20} className="text-brand-500" /> BAH Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-5">Calculate your Basic Allowance for Housing at any installation</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Pay Grade</label>
              <select className="input-field appearance-none" value={bahGrade} onChange={e => setBahGrade(e.target.value)}>
                {PAY_GRADES.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Dependency Status</label>
              <div className="flex gap-3 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="deps" checked={hasDeps} onChange={() => setHasDeps(true)} className="accent-brand-500" />
                  <span className="text-sm text-gray-700">With Dependents</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="deps" checked={!hasDeps} onChange={() => setHasDeps(false)} className="accent-brand-500" />
                  <span className="text-sm text-gray-700">Without</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Installation Zip Code</label>
              <input
                className="input-field"
                placeholder="e.g. 22314"
                value={bahZip}
                onChange={e => setBahZip(e.target.value)}
                maxLength={5}
              />
            </div>
          </div>
          <button onClick={calculateBAH} className="btn-primary">
            <Calculator size={15} /> Calculate BAH
          </button>
          {bahResult && (
            <div className="mt-5 bg-gradient-to-r from-brand-50 to-emerald-50 border border-brand-200 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">Monthly BAH Rate</p>
                  <p className="text-4xl font-black text-brand-700 mt-1">${bahResult.rate.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{bahResult.grade} · {bahResult.deps ? 'With Dependents' : 'Without Dependents'} · {bahResult.zip}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Annual:</span> ${(bahResult.rate * 12).toLocaleString()}</p>
                  <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Taxable:</span> No — BAH is tax-free</p>
                  <p className="text-xs text-gray-500"><span className="font-semibold text-gray-700">Note:</span> Rates vary by zip code</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weight Allowance Calculator */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <Package size={20} className="text-brand-500" /> HHG Weight Allowance
          </h2>
          <p className="text-gray-500 text-sm mb-5">Check your Household Goods weight entitlement by pay grade</p>
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Pay Grade</label>
              <select className="input-field appearance-none" value={weightGrade} onChange={e => setWeightGrade(e.target.value)}>
                {Object.keys(WEIGHT_ALLOWANCES).map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="bg-brand-50 border border-brand-200 rounded-xl px-5 py-3">
              <p className="text-xs text-brand-600 font-semibold">Weight Entitlement</p>
              <p className="text-3xl font-black text-brand-700">{weightAllowance.toLocaleString()} <span className="text-base font-medium">lbs</span></p>
              <p className="text-xs text-gray-500 mt-1">Approximately {Math.round(weightAllowance / 2000 * 10) / 10} tons</p>
            </div>
          </div>
        </div>

        {/* PCS Checklist */}
        <div className="card p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <FileText size={20} className="text-brand-500" /> PCS Timeline Checklist
          </h2>
          <p className="text-gray-500 text-sm mb-5">Your complete month-by-month PCS action plan</p>
          <div className="space-y-3">
            {PCS_TIMELINE.map(({ phase, color, items }) => (
              <div key={phase} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  onClick={() => setExpandedPhase(expandedPhase === phase ? null : phase)}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${color} shrink-0`} />
                  <span className="font-semibold text-gray-800 text-sm flex-1">{phase}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{items.filter(i => checkedItems[`${phase}::${i}`]).length}/{items.length} complete</span>
                    {expandedPhase === phase ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
                  </div>
                </button>
                {expandedPhase === phase && (
                  <div className="p-4 space-y-2 bg-white">
                    {items.map(item => (
                      <label key={item} className="flex items-start gap-3 cursor-pointer group">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checkedItems[`${phase}::${item}`] ? 'bg-brand-500 border-brand-500' : 'border-gray-300 group-hover:border-brand-400'}`}
                          onClick={() => toggleCheck(phase, item)}
                        >
                          {checkedItems[`${phase}::${item}`] && <CheckCircle size={10} className="text-white" />}
                        </div>
                        <span className={`text-sm transition-colors ${checkedItems[`${phase}::${item}`] ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">PCS Resources & Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map(({ title, desc, icon: Icon, link }) => (
              <a key={title} href={link} className="card p-5 group hover:border-brand-200 transition-colors">
                <div className="bg-brand-50 group-hover:bg-brand-100 rounded-xl p-3 w-fit mb-3 transition-colors">
                  <Icon size={20} className="text-brand-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
