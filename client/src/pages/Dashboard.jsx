import { useState } from 'react';
import {
  User, Plane, Building2, Anchor, Calendar, MapPin, Clock, Star,
  CheckCircle, Bell, Settings, CreditCard, Heart, LogOut, ChevronRight,
  TrendingUp, Award, Package, Plus,
} from 'lucide-react';

const UPCOMING = [
  { id: 1, type: 'flight',  icon: Plane,     title: 'DL 1234 · JFK → LAX',   date: 'Jul 15, 2026', status: 'Confirmed', conf: 'VYG-112345', color: 'bg-blue-500'   },
  { id: 2, type: 'hotel',   icon: Building2, title: 'The Grand Hyatt, NYC',   date: 'Jul 15–18, 2026', status: 'Confirmed', conf: 'VYG-112398', color: 'bg-violet-500' },
  { id: 3, type: 'cruise',  icon: Anchor,    title: 'Caribbean Dream · 7 nights', date: 'Aug 1, 2026', status: 'Pending', conf: 'VYG-113210', color: 'bg-cyan-500'    },
];

const PAST = [
  { title: 'Paris & Amsterdam Trip', dates: 'Mar 10–22, 2026', items: '3 flights, 2 hotels', rating: 5 },
  { title: 'Miami Beach Getaway',    dates: 'Jan 3–7, 2026',   items: '1 flight, 1 rental',  rating: 5 },
  { title: 'Tokyo Business Trip',    dates: 'Nov 15–20, 2025', items: '2 flights, 1 hotel',  rating: 4 },
];

const STATS = [
  { label: 'Trips Taken',    value: '12',    icon: Plane,    color: 'text-blue-500',   bg: 'bg-blue-50' },
  { label: 'Miles Traveled', value: '42,300', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Saved',          value: '$1,240', icon: CreditCard, color: 'text-brand-500', bg: 'bg-brand-50' },
  { label: 'Rewards Points', value: '8,750',  icon: Award,    color: 'text-amber-500', bg: 'bg-amber-50' },
];

const NAV_ITEMS = [
  { icon: Plane,        label: 'My Trips',       id: 'trips' },
  { icon: Heart,        label: 'Saved',          id: 'saved' },
  { icon: Star,         label: 'Concierge',      id: 'concierge' },
  { icon: Bell,         label: 'Notifications',  id: 'notifications' },
  { icon: CreditCard,   label: 'Payments',       id: 'payments' },
  { icon: Settings,     label: 'Settings',       id: 'settings' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('trips');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* Profile card */}
            <div className="card p-5 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-black text-xl shrink-0">
                  JD
                </div>
                <div>
                  <p className="font-bold text-gray-900">Jane Doe</p>
                  <p className="text-xs text-gray-500">jane@example.com</p>
                  <span className="badge badge-amber mt-1">Premium Member</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
                <span>Member since Jan 2024</span>
                <Star size={12} className="text-amber-400 fill-amber-400" />
              </div>
            </div>

            {/* Nav */}
            <nav className="card overflow-hidden">
              {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-b border-gray-50 last:border-0 ${
                    activeTab === id
                      ? 'bg-brand-50 text-brand-700 border-l-2 border-l-brand-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} className={activeTab === id ? 'text-brand-500' : 'text-gray-400'} />
                  {label}
                  {id === 'notifications' && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
                  )}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {activeTab === 'trips' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATS.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="card p-4">
                      <div className={`${bg} rounded-xl p-2.5 w-fit mb-3`}>
                        <Icon size={18} className={color} />
                      </div>
                      <p className="text-xl font-black text-gray-900">{value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Upcoming */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-900">Upcoming Trips</h2>
                    <button className="btn-primary py-2 px-4 text-sm">
                      <Plus size={14} /> New Trip
                    </button>
                  </div>
                  {UPCOMING.length === 0 ? (
                    <div className="text-center py-10">
                      <Plane size={36} className="text-gray-200 mx-auto mb-3" />
                      <p className="text-gray-500">No upcoming trips. Start planning!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {UPCOMING.map(trip => {
                        const Icon = trip.icon;
                        return (
                          <div key={trip.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className={`${trip.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">{trip.title}</p>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Calendar size={10} />{trip.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`badge ${trip.status === 'Confirmed' ? 'badge-green' : 'badge-amber'}`}>
                                {trip.status}
                              </span>
                              <p className="text-xs text-gray-400 mt-1">{trip.conf}</p>
                            </div>
                            <ChevronRight size={15} className="text-gray-300 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Past trips */}
                <div className="card p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-5">Past Trips</h2>
                  <div className="space-y-3">
                    {PAST.map(trip => (
                      <div key={trip.title} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{trip.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{trip.dates} · {trip.items}</p>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: trip.rating }).map((_, i) => (
                            <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">Re-book</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'trips' && (
              <div className="card p-12 text-center">
                <Package size={48} className="text-gray-200 mx-auto mb-4" />
                <p className="text-xl font-bold text-gray-700 capitalize">{activeTab}</p>
                <p className="text-gray-400 mt-2 text-sm">This section is coming soon in the full release.</p>
                <button onClick={() => setActiveTab('trips')} className="btn-primary mt-6 text-sm">
                  Back to My Trips
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
