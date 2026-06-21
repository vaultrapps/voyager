/**
 * Builds a pre-filled affiliate URL for each category using the user's
 * filter values (originCity, destCity, moveDate) from the Plan My Trip flow.
 * Returns null for categories with no affiliate partner.
 */
export function buildAffiliateUrl(catId, filters = {}) {
  const origin    = (filters.originCity || '').trim();
  const dest      = (filters.destCity   || '').trim();
  const date      = (filters.moveDate   || '').trim(); // YYYY-MM-DD
  const travelers = (filters.travelers  || '').trim();

  switch (catId) {

    case 'flights': {
      // google.com/travel/flights?q=Flights+from+X+to+Y
      const url = new URL('https://www.google.com/travel/flights');
      const parts = ['Flights'];
      if (origin) parts.push(`from ${origin}`);
      if (dest)   parts.push(`to ${dest}`);
      url.searchParams.set('q', parts.join(' '));
      if (travelers && travelers !== '1') url.searchParams.set('adults', travelers.replace('+', ''));
      return url.toString();
    }

    case 'hotel': {
      // booking.com/searchresults.html?ss=CITY&checkin=YYYY-MM-DD
      const url = new URL('https://www.booking.com/searchresults.html');
      const city = dest || origin;
      if (city) url.searchParams.set('ss', city);
      if (date) url.searchParams.set('checkin', date);
      return url.toString();
    }

    case 'rental_car': {
      // kayak.com/cars/CITY/DATE/DATE
      const city = origin || dest;
      if (city && date) return `https://www.kayak.com/cars/${encodeURIComponent(city)}/${date}/${date}`;
      if (city)         return `https://www.kayak.com/cars/${encodeURIComponent(city)}`;
      return 'https://www.kayak.com/cars';
    }

    case 'moving_truck': {
      // uhaul.com/Trucks/?from=ORIGIN&to=DEST
      const url = new URL('https://www.uhaul.com/Trucks/');
      if (origin) url.searchParams.set('from', origin);
      if (dest)   url.searchParams.set('to',   dest);
      return url.toString();
    }

    case 'storage_pod': {
      // pods.com with origin city pre-filled
      const url = new URL('https://www.pods.com/moving-storage-containers');
      const city = origin || dest;
      if (city) url.searchParams.set('fromLocation', city);
      return url.toString();
    }

    case 'full_service':
    case 'labor_movers': {
      // moving.com mover search with city
      const url = new URL('https://www.moving.com/movers/');
      const city = origin || dest;
      if (city) url.searchParams.set('city', city);
      return url.toString();
    }

    case 'vehicle_shipping': {
      // uship.com with origin and destination
      const url = new URL('https://www.uship.com/vehicles/');
      if (origin) url.searchParams.set('origin',      origin);
      if (dest)   url.searchParams.set('destination', dest);
      return url.toString();
    }

    case 'restaurants': {
      // opentable.com/s/?term=CITY&dateTime=YYYY-MM-DDTHH:MM
      const url = new URL('https://www.opentable.com/s/');
      const city = dest || origin;
      if (city) url.searchParams.set('term', city);
      if (date) url.searchParams.set('dateTime', `${date}T19:00`);
      return url.toString();
    }

    case 'cruise': {
      // cruises.com/cruise-search/?destination=CITY
      const url = new URL('https://www.cruises.com/cruise-search/');
      const port = dest || origin;
      if (port) url.searchParams.set('destination', port);
      return url.toString();
    }

    default:
      return null; // pet_travel, international, concierge have no affiliate partner
  }
}
