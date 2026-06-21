const express = require('express');
const router  = express.Router();

const RENTALS = [
  { id: 'r-001', title: 'Oceanfront Beach House', city: 'Malibu, CA',       type: 'house', beds: 3, guests: 6, price: 450, rating: 4.95 },
  { id: 'r-002', title: 'Cozy Mountain Cabin',    city: 'Aspen, CO',        type: 'cabin', beds: 2, guests: 4, price: 385, rating: 4.88 },
  { id: 'r-003', title: 'Downtown Loft',           city: 'New York, NY',     type: 'apt',   beds: 1, guests: 2, price: 295, rating: 4.72 },
  { id: 'r-004', title: 'Luxury Villa',            city: 'Miami Beach, FL',  type: 'villa', beds: 4, guests: 8, price: 650, rating: 4.97 },
  { id: 'r-005', title: 'Historic Bungalow',       city: 'Austin, TX',       type: 'house', beds: 2, guests: 4, price: 185, rating: 4.61 },
];

router.get('/search', (req, res) => {
  const { location, type, guests = 1, maxPrice = 9999 } = req.query;
  let results = RENTALS.filter(r => r.price <= +maxPrice && r.guests >= +guests);
  if (location) results = results.filter(r => r.city.toLowerCase().includes(location.toLowerCase()));
  if (type && type !== 'all') results = results.filter(r => r.type === type);
  res.json({ success: true, results, total: results.length });
});

router.post('/book', (req, res) => {
  const { rentalId, checkIn, checkOut, guests } = req.body;
  if (!rentalId) return res.status(400).json({ success: false, error: 'rentalId required' });
  res.status(201).json({ success: true, bookingId: `VYG-RT-${Date.now()}`, rentalId, checkIn, checkOut, guests, status: 'Confirmed' });
});

module.exports = router;
