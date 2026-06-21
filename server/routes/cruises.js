const express = require('express');
const router  = express.Router();

const CRUISES = [
  { id: 'c-001', name: 'Caribbean Dream',          line: 'Royal Caribbean', destination: 'Caribbean',     nights: 7,  price: 899,  rating: 4.7 },
  { id: 'c-002', name: 'Mediterranean Odyssey',    line: 'Norwegian',       destination: 'Mediterranean', nights: 12, price: 1299, rating: 4.8 },
  { id: 'c-003', name: 'Alaska Wilderness Explorer',line: 'Princess',       destination: 'Alaska',        nights: 7,  price: 1099, rating: 4.6 },
  { id: 'c-004', name: 'Bahamas Escape',           line: 'Carnival',        destination: 'Bahamas',       nights: 4,  price: 499,  rating: 4.3 },
  { id: 'c-005', name: 'European River Journey',   line: 'Viking',          destination: 'Europe',        nights: 8,  price: 2499, rating: 4.9 },
];

router.get('/search', (req, res) => {
  const { destination, line, maxNights, maxPrice = 9999 } = req.query;
  let results = CRUISES.filter(c => c.price <= +maxPrice);
  if (destination && destination !== 'Any') results = results.filter(c => c.destination === destination);
  if (line && line !== 'Any') results = results.filter(c => c.line === line);
  if (maxNights) results = results.filter(c => c.nights <= +maxNights);
  res.json({ success: true, results, total: results.length });
});

router.post('/book', (req, res) => {
  const { cruiseId, guests, cabin } = req.body;
  if (!cruiseId) return res.status(400).json({ success: false, error: 'cruiseId required' });
  res.status(201).json({ success: true, bookingId: `VYG-CR-${Date.now()}`, cruiseId, guests, cabin: cabin || 'Interior', status: 'Pending Payment' });
});

module.exports = router;
