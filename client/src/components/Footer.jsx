import { Link } from 'react-router-dom';
import { Compass, Mail, Globe, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const SERVICES = [
  { label: 'Flights',             path: '/flights' },
  { label: 'Hotels',              path: '/hotels' },
  { label: 'Short-Term Rentals',  path: '/rentals' },
  { label: 'Cruise Booking',      path: '/cruises' },
  { label: 'Restaurant Reservations', path: '/restaurants' },
  { label: 'Moving & Relocation', path: '/moving' },
  { label: 'Military PCS',        path: '/military' },
  { label: 'International Travel', path: '/international' },
  { label: 'Concierge Service',   path: '/concierge' },
];

const COMPANY = [
  { label: 'About Voyager',    path: '/' },
  { label: 'How It Works',     path: '/' },
  { label: 'Pricing',          path: '/' },
  { label: 'Partner With Us',  path: '/' },
  { label: 'Careers',          path: '/' },
  { label: 'Press',            path: '/' },
];

const SUPPORT = [
  { label: 'Help Center',       path: '/' },
  { label: 'Contact Us',        path: '/' },
  { label: 'Travel Advisories', path: '/international' },
  { label: 'Refund Policy',     path: '/' },
  { label: 'Accessibility',     path: '/' },
];

const SOCIAL = [
  { icon: Facebook,  label: 'Facebook',  href: '#' },
  { icon: Twitter,   label: 'Twitter',   href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Youtube,   label: 'YouTube',   href: '#' },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-300">
      {/* Top CTA bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-lg">Ready to start your next adventure?</p>
            <p className="text-gray-400 text-sm mt-1">Your all-in-one travel and relocation platform.</p>
          </div>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 w-56"
            />
            <button className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors whitespace-nowrap">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="bg-brand-500 rounded-lg p-1.5">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <span className="text-white text-lg font-bold">Voyager</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              You think it, we plan it! Your all-in-one travel platform for flights, hotels, cruises, and life's biggest moves.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:hello@choosevoyager.com" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Mail size={14} className="text-brand-500" />
                hello@choosevoyager.com
              </a>
              <a href="https://choosevoyager.com" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                <Globe size={14} className="text-brand-500" />
                choosevoyager.com
              </a>
            </div>
            {/* Social */}
            <div className="flex gap-2 mt-5">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="p-2 rounded-lg bg-white/10 hover:bg-brand-500 transition-colors text-gray-400 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {SERVICES.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm hover:text-brand-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {COMPANY.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm hover:text-brand-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2">
              {SUPPORT.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path} className="text-sm hover:text-brand-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-white text-xs font-semibold mb-1">Military &amp; Government</p>
              <p className="text-gray-400 text-xs">Special discounts available for active duty, veterans, and federal employees.</p>
              <Link to="/military" className="text-brand-400 hover:text-brand-300 text-xs font-medium mt-2 inline-block">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Voyager, LLC · choosevoyager.com · All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
