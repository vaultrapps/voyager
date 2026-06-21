import { useState, useRef, useEffect } from 'react';
import { MapPin, Plane } from 'lucide-react';

const LOCATIONS = [
  // US – Major hubs
  { city: 'Atlanta',            state: 'GA',  code: 'ATL', airport: 'Hartsfield-Jackson International' },
  { city: 'Austin',             state: 'TX',  code: 'AUS', airport: 'Austin-Bergstrom International' },
  { city: 'Baltimore',          state: 'MD',  code: 'BWI', airport: 'Baltimore/Washington International' },
  { city: 'Boston',             state: 'MA',  code: 'BOS', airport: 'Logan International' },
  { city: 'Charlotte',          state: 'NC',  code: 'CLT', airport: 'Douglas International' },
  { city: 'Chicago',            state: 'IL',  code: 'ORD', airport: "O'Hare International" },
  { city: 'Chicago Midway',     state: 'IL',  code: 'MDW', airport: 'Midway International' },
  { city: 'Cincinnati',         state: 'OH',  code: 'CVG', airport: 'Cincinnati/Northern Kentucky International' },
  { city: 'Cleveland',          state: 'OH',  code: 'CLE', airport: 'Hopkins International' },
  { city: 'Columbus',           state: 'OH',  code: 'CMH', airport: 'John Glenn Columbus International' },
  { city: 'Dallas Fort Worth',  state: 'TX',  code: 'DFW', airport: 'Dallas/Fort Worth International' },
  { city: 'Dallas Love Field',  state: 'TX',  code: 'DAL', airport: 'Dallas Love Field' },
  { city: 'Denver',             state: 'CO',  code: 'DEN', airport: 'Denver International' },
  { city: 'Detroit',            state: 'MI',  code: 'DTW', airport: 'Detroit Metro Wayne County' },
  { city: 'El Paso',            state: 'TX',  code: 'ELP', airport: 'El Paso International' },
  { city: 'Fort Lauderdale',    state: 'FL',  code: 'FLL', airport: 'Fort Lauderdale-Hollywood International' },
  { city: 'Fort Myers',         state: 'FL',  code: 'RSW', airport: 'Southwest Florida International' },
  { city: 'Honolulu',           state: 'HI',  code: 'HNL', airport: 'Daniel K. Inouye International' },
  { city: 'Houston',            state: 'TX',  code: 'IAH', airport: 'George Bush Intercontinental' },
  { city: 'Houston Hobby',      state: 'TX',  code: 'HOU', airport: 'William P. Hobby Airport' },
  { city: 'Indianapolis',       state: 'IN',  code: 'IND', airport: 'Indianapolis International' },
  { city: 'Jacksonville',       state: 'FL',  code: 'JAX', airport: 'Jacksonville International' },
  { city: 'Kansas City',        state: 'MO',  code: 'MCI', airport: 'Kansas City International' },
  { city: 'Las Vegas',          state: 'NV',  code: 'LAS', airport: 'Harry Reid International' },
  { city: 'Los Angeles',        state: 'CA',  code: 'LAX', airport: 'Los Angeles International' },
  { city: 'Louisville',         state: 'KY',  code: 'SDF', airport: 'Muhammad Ali International' },
  { city: 'Memphis',            state: 'TN',  code: 'MEM', airport: 'Memphis International' },
  { city: 'Miami',              state: 'FL',  code: 'MIA', airport: 'Miami International' },
  { city: 'Milwaukee',          state: 'WI',  code: 'MKE', airport: 'General Mitchell International' },
  { city: 'Minneapolis',        state: 'MN',  code: 'MSP', airport: 'Minneapolis-Saint Paul International' },
  { city: 'Nashville',          state: 'TN',  code: 'BNA', airport: 'Nashville International' },
  { city: 'New Orleans',        state: 'LA',  code: 'MSY', airport: 'Louis Armstrong International' },
  { city: 'New York JFK',       state: 'NY',  code: 'JFK', airport: 'John F. Kennedy International' },
  { city: 'New York LaGuardia', state: 'NY',  code: 'LGA', airport: 'LaGuardia Airport' },
  { city: 'Newark',             state: 'NJ',  code: 'EWR', airport: 'Newark Liberty International' },
  { city: 'Oakland',            state: 'CA',  code: 'OAK', airport: 'Oakland International' },
  { city: 'Oklahoma City',      state: 'OK',  code: 'OKC', airport: 'Will Rogers World Airport' },
  { city: 'Omaha',              state: 'NE',  code: 'OMA', airport: 'Eppley Airfield' },
  { city: 'Orange County',      state: 'CA',  code: 'SNA', airport: 'John Wayne Airport' },
  { city: 'Orlando',            state: 'FL',  code: 'MCO', airport: 'Orlando International' },
  { city: 'Philadelphia',       state: 'PA',  code: 'PHL', airport: 'Philadelphia International' },
  { city: 'Phoenix',            state: 'AZ',  code: 'PHX', airport: 'Sky Harbor International' },
  { city: 'Pittsburgh',         state: 'PA',  code: 'PIT', airport: 'Pittsburgh International' },
  { city: 'Portland',           state: 'OR',  code: 'PDX', airport: 'Portland International' },
  { city: 'Raleigh-Durham',     state: 'NC',  code: 'RDU', airport: 'Raleigh-Durham International' },
  { city: 'Richmond',           state: 'VA',  code: 'RIC', airport: 'Richmond International' },
  { city: 'Sacramento',         state: 'CA',  code: 'SMF', airport: 'Sacramento International' },
  { city: 'Salt Lake City',     state: 'UT',  code: 'SLC', airport: 'Salt Lake City International' },
  { city: 'San Antonio',        state: 'TX',  code: 'SAT', airport: 'San Antonio International' },
  { city: 'San Diego',          state: 'CA',  code: 'SAN', airport: 'San Diego International' },
  { city: 'San Francisco',      state: 'CA',  code: 'SFO', airport: 'San Francisco International' },
  { city: 'San Jose',           state: 'CA',  code: 'SJC', airport: 'Norman Y. Mineta San Jose International' },
  { city: 'Seattle',            state: 'WA',  code: 'SEA', airport: 'Seattle-Tacoma International' },
  { city: 'St. Louis',          state: 'MO',  code: 'STL', airport: 'Lambert-St. Louis International' },
  { city: 'Tampa',              state: 'FL',  code: 'TPA', airport: 'Tampa International' },
  { city: 'Tulsa',              state: 'OK',  code: 'TUL', airport: 'Tulsa International' },
  { city: 'Washington DC',      state: 'DC',  code: 'DCA', airport: 'Reagan National Airport' },
  { city: 'Washington Dulles',  state: 'VA',  code: 'IAD', airport: 'Dulles International' },
  { city: 'West Palm Beach',    state: 'FL',  code: 'PBI', airport: 'Palm Beach International' },
  // International
  { city: 'Amsterdam',          state: 'Netherlands', code: 'AMS', airport: 'Schiphol Airport' },
  { city: 'Bangkok',            state: 'Thailand',    code: 'BKK', airport: 'Suvarnabhumi Airport' },
  { city: 'Barcelona',          state: 'Spain',       code: 'BCN', airport: 'El Prat Airport' },
  { city: 'Berlin',             state: 'Germany',     code: 'BER', airport: 'Brandenburg Airport' },
  { city: 'Buenos Aires',       state: 'Argentina',   code: 'EZE', airport: 'Ministro Pistarini International' },
  { city: 'Cancún',             state: 'Mexico',      code: 'CUN', airport: 'Cancún International' },
  { city: 'Dubai',              state: 'UAE',         code: 'DXB', airport: 'Dubai International' },
  { city: 'Dublin',             state: 'Ireland',     code: 'DUB', airport: 'Dublin Airport' },
  { city: 'Frankfurt',          state: 'Germany',     code: 'FRA', airport: 'Frankfurt Airport' },
  { city: 'Hong Kong',          state: 'China',       code: 'HKG', airport: 'Hong Kong International' },
  { city: 'London Heathrow',    state: 'UK',          code: 'LHR', airport: 'Heathrow Airport' },
  { city: 'London Gatwick',     state: 'UK',          code: 'LGW', airport: 'Gatwick Airport' },
  { city: 'Madrid',             state: 'Spain',       code: 'MAD', airport: 'Adolfo Suárez Barajas' },
  { city: 'Mexico City',        state: 'Mexico',      code: 'MEX', airport: 'Benito Juárez International' },
  { city: 'Milan',              state: 'Italy',       code: 'MXP', airport: 'Malpensa Airport' },
  { city: 'Montreal',           state: 'Canada',      code: 'YUL', airport: 'Trudeau International' },
  { city: 'Mumbai',             state: 'India',       code: 'BOM', airport: 'Chhatrapati Shivaji International' },
  { city: 'Munich',             state: 'Germany',     code: 'MUC', airport: 'Munich Airport' },
  { city: 'Nairobi',            state: 'Kenya',       code: 'NBO', airport: 'Jomo Kenyatta International' },
  { city: 'New Delhi',          state: 'India',       code: 'DEL', airport: 'Indira Gandhi International' },
  { city: 'Paris',              state: 'France',      code: 'CDG', airport: 'Charles de Gaulle Airport' },
  { city: 'Rome',               state: 'Italy',       code: 'FCO', airport: 'Leonardo da Vinci International' },
  { city: 'São Paulo',          state: 'Brazil',      code: 'GRU', airport: 'Guarulhos International' },
  { city: 'Seoul',              state: 'South Korea', code: 'ICN', airport: 'Incheon International' },
  { city: 'Singapore',          state: 'Singapore',   code: 'SIN', airport: 'Changi Airport' },
  { city: 'Sydney',             state: 'Australia',   code: 'SYD', airport: 'Kingsford Smith Airport' },
  { city: 'Tokyo Narita',       state: 'Japan',       code: 'NRT', airport: 'Narita International' },
  { city: 'Tokyo Haneda',       state: 'Japan',       code: 'HND', airport: 'Haneda Airport' },
  { city: 'Toronto',            state: 'Canada',      code: 'YYZ', airport: 'Pearson International' },
  { city: 'Vancouver',          state: 'Canada',      code: 'YVR', airport: 'Vancouver International' },
  { city: 'Zurich',             state: 'Switzerland', code: 'ZRH', airport: 'Zurich Airport' },
];

export default function LocationAutocomplete({
  value = '',
  onChange,
  placeholder = 'Enter city',
  showAirportCode = false,
  icon: Icon = MapPin,
  className = '',
  inputClassName = '',
}) {
  const [query, setQuery]   = useState(value);
  const [open, setOpen]     = useState(false);
  const ref                 = useRef(null);

  // Sync when parent resets value (e.g. swap button)
  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const suggestions = query.length < 1 ? [] : LOCATIONS.filter(loc =>
    loc.city.toLowerCase().includes(query.toLowerCase())   ||
    loc.code.toLowerCase().startsWith(query.toLowerCase()) ||
    loc.state.toLowerCase().startsWith(query.toLowerCase())
  ).slice(0, 8);

  const handleSelect = (loc) => {
    const display = showAirportCode
      ? `${loc.city}, ${loc.state} (${loc.code})`
      : `${loc.city}, ${loc.state}`;
    setQuery(display);
    onChange(display);
    setOpen(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onChange(e.target.value);
    setOpen(e.target.value.length > 0);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {Icon && (
        <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
      )}
      <input
        className={`input-field pl-8 text-sm ${inputClassName}`}
        value={query}
        onChange={handleChange}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
      />
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-100 z-[300] overflow-hidden">
          {suggestions.map((loc) => (
            <button
              key={loc.code}
              type="button"
              onMouseDown={() => handleSelect(loc)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-50 transition-colors text-left border-b border-gray-50 last:border-0"
            >
              <div className="bg-brand-100 rounded-lg p-1.5 shrink-0">
                {showAirportCode
                  ? <Plane size={12} className="text-brand-600" />
                  : <MapPin size={12} className="text-brand-600" />
                }
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {loc.city}, {loc.state}
                  {showAirportCode && (
                    <span className="ml-2 text-xs font-bold text-brand-500 bg-brand-50 px-1.5 py-0.5 rounded">
                      {loc.code}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 truncate">{loc.airport}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
