import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu, X,
  Plane, Building2, Home, Anchor, UtensilsCrossed,
  Truck, Shield, Globe, Star, User, Bell, Tag,
} from 'lucide-react';

const PRIMARY_NAV = [
  { label: 'Flights',       path: '/flights',     icon: Plane },
  { label: 'Hotels',        path: '/hotels',      icon: Building2 },
  { label: 'Rentals',       path: '/rentals',     icon: Home },
  { label: 'Cruises',       path: '/cruises',     icon: Anchor },
  { label: 'Restaurants',   path: '/restaurants', icon: UtensilsCrossed },
  { label: 'Travel Deals',  path: '/deals',       icon: Tag, highlight: true },
];

const SERVICE_NAV = [
  { label: 'Moving',        path: '/moving',        icon: Truck,  accent: null },
  { label: 'Military PCS',  path: '/military',      icon: Shield, accent: 'amber' },
  { label: 'International', path: '/international', icon: Globe,  accent: null },
  { label: 'Concierge',     path: '/concierge',     icon: Star,   accent: 'brand' },
];

const ALL_NAV = [...PRIMARY_NAV, ...SERVICE_NAV];

function accentClass(accent, active) {
  if (active) return 'bg-brand-500 text-white';
  if (accent === 'amber')  return 'text-amber-200 hover:text-white hover:bg-amber-500/20';
  if (accent === 'brand')  return 'text-brand-300 hover:text-white hover:bg-brand-500/30';
  return 'text-gray-300 hover:text-white hover:bg-white/10';
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`bg-navy-900 text-white sticky top-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-xl' : 'shadow-md'}`}>

      {/* ── Row 1: logo + motto + auth ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 border-b border-white/10 relative">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img src="/Voyager_Logo.png" alt="Voyager" style={{ height: '72px' }} />
        </Link>

        {/* Motto — centered in the row */}
        <span
          className="absolute left-1/2 -translate-x-1/2 text-xs tracking-widest font-medium pointer-events-none hidden lg:block"
          style={{ color: '#1D9E75' }}
        >
          You think it, we plan it!
        </span>

        {/* Desktop auth */}
        <div className="hidden lg:flex items-center gap-2">
          <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <Bell size={17} />
          </button>
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors font-medium">
            <User size={14} /> Sign In
          </Link>
          <Link to="/dashboard" className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm">
            Sign Up Free
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Row 2: all nav links (desktop) ── */}
      <div className="hidden lg:block bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10">

            {/* Primary travel items */}
            {PRIMARY_NAV.map(({ label, path, icon: Icon, highlight }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 h-full text-xs font-semibold transition-colors whitespace-nowrap ${
                  isActive(path)
                    ? 'bg-brand-500 text-white'
                    : highlight
                      ? 'text-amber-300 hover:text-white hover:bg-amber-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon size={13} />
                {label}
                {highlight && !isActive(path) && (
                  <span className="bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">SALE</span>
                )}
              </Link>
            ))}

            {/* Visual divider */}
            <div className="w-px h-5 bg-white/20 mx-2 shrink-0" />

            {/* Service items */}
            {SERVICE_NAV.map(({ label, path, icon: Icon, accent }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 h-full text-xs font-semibold transition-colors whitespace-nowrap ${accentClass(accent, isActive(path))}`}
              >
                <Icon size={13} />
                {label}
                {accent === 'amber' && !isActive(path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                )}
                {accent === 'brand' && !isActive(path) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy-800 border-t border-white/10 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-3">

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">Travel</p>
            <div className="space-y-0.5 mb-3">
              {PRIMARY_NAV.map(({ label, path, icon: Icon, highlight }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(path) ? 'bg-brand-500 text-white' : highlight ? 'text-amber-300 hover:bg-amber-500/20 hover:text-amber-100' : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} />{label}
                  {highlight && !isActive(path) && <span className="ml-auto bg-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">SALE</span>}
                </Link>
              ))}
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">Services</p>
            <div className="space-y-0.5 mb-4">
              {SERVICE_NAV.map(({ label, path, icon: Icon, accent }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(path)
                      ? 'bg-brand-500 text-white'
                      : accent === 'amber'
                        ? 'text-amber-300 hover:bg-amber-500/20 hover:text-amber-100'
                        : accent === 'brand'
                          ? 'text-brand-300 hover:bg-brand-500/20 hover:text-brand-100'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={15} />{label}
                </Link>
              ))}
            </div>

            <div className="flex gap-2 border-t border-white/10 pt-3">
              <Link to="/dashboard" className="flex-1 text-center text-sm text-gray-300 border border-white/20 rounded-xl py-2.5 hover:bg-white/10 transition-colors font-medium">Sign In</Link>
              <Link to="/dashboard" className="flex-1 text-center bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">Sign Up Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
