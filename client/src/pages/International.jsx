import { useState } from 'react';
import {
  Globe, Search, AlertTriangle, CheckCircle, Info, DollarSign,
  Clock, Phone, Syringe, FileText, ChevronRight, MapPin, Shield,
} from 'lucide-react';
import LocationAutocomplete from '../components/LocationAutocomplete';

const COUNTRIES = [
  { name: 'France',       flag: '🇫🇷', region: 'Europe',        advisory: 1, visa: 'Visa-free (90 days)', currency: 'EUR', capital: 'Paris',    tz: 'CET (UTC+1)', vaccines: ['None required'] },
  { name: 'Japan',        flag: '🇯🇵', region: 'Asia',           advisory: 1, visa: 'Visa-free (90 days)', currency: 'JPY', capital: 'Tokyo',    tz: 'JST (UTC+9)', vaccines: ['None required'] },
  { name: 'Mexico',       flag: '🇲🇽', region: 'Americas',       advisory: 2, visa: 'Visa-free (180 days)',currency: 'MXN', capital: 'Mexico City',tz: 'CST (UTC-6)',vaccines: ['Hep A', 'Typhoid'] },
  { name: 'Thailand',     flag: '🇹🇭', region: 'Asia',           advisory: 1, visa: 'Visa-free (30 days)', currency: 'THB', capital: 'Bangkok',  tz: 'ICT (UTC+7)', vaccines: ['Hep A', 'Typhoid', 'Malaria prophylaxis'] },
  { name: 'Italy',        flag: '🇮🇹', region: 'Europe',         advisory: 1, visa: 'Visa-free (90 days)', currency: 'EUR', capital: 'Rome',     tz: 'CET (UTC+1)', vaccines: ['None required'] },
  { name: 'Brazil',       flag: '🇧🇷', region: 'Americas',       advisory: 2, visa: 'Visa-free (90 days)', currency: 'BRL', capital: 'Brasília', tz: 'BRT (UTC-3)', vaccines: ['Yellow Fever', 'Hep A', 'Typhoid'] },
  { name: 'Australia',    flag: '🇦🇺', region: 'Oceania',        advisory: 1, visa: 'eVisa required',       currency: 'AUD', capital: 'Canberra', tz: 'AEST (UTC+10)',vaccines: ['None required'] },
  { name: 'India',        flag: '🇮🇳', region: 'Asia',           advisory: 2, visa: 'eVisa required',       currency: 'INR', capital: 'New Delhi',tz: 'IST (UTC+5:30)',vaccines: ['Hep A','Typhoid','Malaria prophylaxis','Rabies'] },
  { name: 'Egypt',        flag: '🇪🇬', region: 'Africa',         advisory: 2, visa: 'Visa on arrival',      currency: 'EGP', capital: 'Cairo',   tz: 'EET (UTC+2)', vaccines: ['Hep A','Typhoid'] },
  { name: 'Colombia',     flag: '🇨🇴', region: 'Americas',       advisory: 2, visa: 'Visa-free (90 days)', currency: 'COP', capital: 'Bogotá',  tz: 'COT (UTC-5)', vaccines: ['Yellow Fever','Hep A','Typhoid'] },
  { name: 'Germany',      flag: '🇩🇪', region: 'Europe',         advisory: 1, visa: 'Visa-free (90 days)', currency: 'EUR', capital: 'Berlin',  tz: 'CET (UTC+1)', vaccines: ['None required'] },
  { name: 'Kenya',        flag: '🇰🇪', region: 'Africa',         advisory: 3, visa: 'eVisa required',       currency: 'KES', capital: 'Nairobi', tz: 'EAT (UTC+3)', vaccines: ['Yellow Fever','Malaria','Typhoid','Hep A'] },
];

const ADVISORY_CONFIG = {
  1: { label: 'Exercise Normal Precautions', color: 'bg-green-100 text-green-800 border-green-200',  dot: 'bg-green-500',  icon: CheckCircle },
  2: { label: 'Exercise Increased Caution',  color: 'bg-yellow-100 text-yellow-800 border-yellow-200', dot: 'bg-yellow-500', icon: Info },
  3: { label: 'Reconsider Travel',           color: 'bg-orange-100 text-orange-800 border-orange-200', dot: 'bg-orange-500', icon: AlertTriangle },
  4: { label: 'Do Not Travel',               color: 'bg-red-100 text-red-800 border-red-200',          dot: 'bg-red-500',    icon: AlertTriangle },
};

const EXCHANGE_RATES = {
  EUR: 0.92, JPY: 149.50, MXN: 17.12, THB: 35.80, BRL: 4.97,
  AUD: 1.53, INR: 83.12, EGP: 30.90, COP: 3952, KES: 129.50,
};

const REGIONS = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

function CountryCard({ country, onClick }) {
  const adv = ADVISORY_CONFIG[country.advisory];
  const AdvIcon = adv.icon;
  return (
    <button onClick={() => onClick(country)} className="card p-4 text-left hover:border-brand-300 group transition-all w-full">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{country.flag}</span>
        <div>
          <p className="font-bold text-gray-900 text-sm">{country.name}</p>
          <p className="text-xs text-gray-400">{country.region}</p>
        </div>
      </div>
      <div className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${adv.color}`}>
        <AdvIcon size={11} />
        Level {country.advisory}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-gray-500">{country.visa}</span>
        <ChevronRight size={13} className="text-gray-300 group-hover:text-brand-500 transition-colors" />
      </div>
    </button>
  );
}

function CountryDetail({ country, onClose }) {
  const adv = ADVISORY_CONFIG[country.advisory];
  const AdvIcon = adv.icon;
  const [usdAmount, setUsdAmount] = useState('100');
  const rate = EXCHANGE_RATES[country.currency] || 1;
  const converted = (parseFloat(usdAmount || 0) * rate).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h2 className="text-2xl font-black">{country.name}</h2>
                <p className="text-gray-300 text-sm">{country.capital} · {country.region}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Advisory */}
          <div className={`flex items-start gap-3 p-4 rounded-xl border ${adv.color}`}>
            <AdvIcon size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Travel Advisory Level {country.advisory}</p>
              <p className="text-sm mt-0.5">{adv.label}</p>
            </div>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Entry Requirement', value: country.visa,     icon: FileText },
              { label: 'Currency',          value: country.currency, icon: DollarSign },
              { label: 'Time Zone',         value: country.tz,       icon: Clock },
              { label: 'Capital',           value: country.capital,  icon: MapPin },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={13} className="text-brand-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-sm font-bold text-gray-800">{value}</p>
              </div>
            ))}
          </div>

          {/* Health & Vaccines */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Syringe size={16} className="text-brand-500" /> Health & Vaccination Requirements
            </h3>
            <ul className="space-y-1.5">
              {country.vaccines.map(v => (
                <li key={v} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className={v === 'None required' ? 'text-green-500' : 'text-amber-500'} />
                  {v}
                </li>
              ))}
            </ul>
          </div>

          {/* Currency Converter */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign size={16} className="text-brand-500" /> Currency Converter
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-sm">$</span>
                <input type="number" className="input-field pl-7" value={usdAmount} onChange={e => setUsdAmount(e.target.value)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">USD</span>
              </div>
              <span className="text-gray-400 font-bold">=</span>
              <div className="flex-1 bg-brand-50 border border-brand-200 rounded-xl px-4 py-3 flex items-center justify-between">
                <span className="font-black text-brand-700 text-lg">{parseFloat(converted).toLocaleString()}</span>
                <span className="text-xs text-brand-500 font-semibold">{country.currency}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Rate: 1 USD = {rate} {country.currency} (indicative)</p>
          </div>

          {/* Emergency */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h3 className="font-bold text-red-800 text-sm mb-2 flex items-center gap-2">
              <Phone size={14} /> Emergency Contacts
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-red-700">US Embassy: <span className="font-bold">+1-202-501-4444</span></p>
              <p className="text-red-700">Smart Traveler Enrollment Program (STEP): <a href="#" className="underline">step.state.gov</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function International() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [selected, setSelected] = useState(null);
  const [fromCur, setFromCur] = useState('USD');
  const [amount, setAmount] = useState('100');

  const filtered = COUNTRIES.filter(c =>
    (region === 'All' || c.region === region) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {selected && <CountryDetail country={selected} onClose={() => setSelected(null)} />}

      <div className="page-hero">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Globe size={22} className="text-brand-400" />
            <h1 className="text-2xl font-black">International Travel</h1>
          </div>
          <p className="text-gray-300 text-sm">Visa requirements, travel advisories, currency rates & more for 190+ countries</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-24 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap gap-3 items-center">
          <LocationAutocomplete
            placeholder="Departing from (city or airport)"
            showAirportCode
            onChange={() => {}}
            className="min-w-[200px]"
            inputClassName="py-2.5"
          />
          <div className="relative min-w-[200px] flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input-field pl-8 text-sm py-2.5" placeholder="Search destination country..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            {REGIONS.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${region === r ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Advisory legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(ADVISORY_CONFIG).map(([level, config]) => {
            const Icon = config.icon;
            return (
              <div key={level} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${config.color}`}>
                <Icon size={11} />Level {level}: {config.label}
              </div>
            );
          })}
        </div>

        <p className="text-sm text-gray-500 mb-4">{filtered.length} countries · Click any country for details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(c => <CountryCard key={c.name} country={c} onClick={setSelected} />)}
        </div>

        {/* STEP Enrollment CTA */}
        <div className="mt-10 bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-brand-100 shrink-0" />
            <div>
              <p className="font-bold text-lg">Register with STEP before you travel</p>
              <p className="text-brand-100 text-sm">The Smart Traveler Enrollment Program lets the US Embassy contact you in an emergency.</p>
            </div>
          </div>
          <a href="#" className="bg-white text-brand-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap shrink-0">
            Enroll Now →
          </a>
        </div>
      </div>
    </div>
  );
}
