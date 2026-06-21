const express = require('express');
const router  = express.Router();

const HOTELS = [
  { id: 'h-001', name: 'The Grand Hyatt',       city: 'New York, NY',   stars: 5, rating: 4.8, price: 449, amenities: ['wifi','pool','gym','restaurant','parking'] },
  { id: 'h-002', name: 'Hilton Garden Inn',     city: 'Chicago, IL',    stars: 4, rating: 4.4, price: 189, amenities: ['wifi','gym','restaurant'] },
  { id: 'h-003', name: 'The Ritz-Carlton',      city: 'Miami Beach, FL',stars: 5, rating: 4.9, price: 689, amenities: ['wifi','pool','spa','restaurant','parking'] },
  { id: 'h-004', name: 'Courtyard by Marriott', city: 'Denver, CO',     stars: 3, rating: 4.1, price: 129, amenities: ['wifi','parking','coffee'] },
  { id: 'h-005', name: 'Westin Waterfront',     city: 'Boston, MA',     stars: 4, rating: 4.6, price: 289, amenities: ['wifi','pool','gym','restaurant'] },
];

router.get('/search', (req, res) => {
  const { location, guests = 2, minStars = 0, maxPrice = 9999 } = req.query;
  let results = HOTELS.filter(h => h.stars >= +minStars && h.price <= +maxPrice);
  if (location) results = results.filter(h => h.city.toLowerCase().includes(location.toLowerCase()));
  res.json({ success: true, results, total: results.length });
});

router.get('/:id', (req, res) => {
  const hotel = HOTELS.find(h => h.id === req.params.id);
  if (!hotel) return res.status(404).json({ success: false, error: 'Hotel not found' });
  res.json({ success: true, hotel });
});

router.post('/book', (req, res) => {
  const { hotelId, checkIn, checkOut, guests, rooms } = req.body;
  if (!hotelId || !checkIn || !checkOut) return res.status(400).json({ success: false, error: 'hotelId, checkIn, checkOut required' });
  res.status(201).json({
    success: true,
    bookingId: `VYG-HT-${Date.now()}`,
    hotelId, checkIn, checkOut, guests, rooms,
    status: 'Confirmed',
    message: 'Hotel booked! Confirmation details sent to your email.',
  });
});

module.exports = router;
