const express = require('express');
const router  = express.Router();

const RESTAURANTS = [
  { id: 'res-001', name: 'The River Grill',    city: 'New York, NY',     cuisine: 'American',  price: '$$$$', rating: 4.9 },
  { id: 'res-002', name: 'Sakura Garden',      city: 'Chicago, IL',      cuisine: 'Japanese',  price: '$$$',  rating: 4.8 },
  { id: 'res-003', name: 'Trattoria Roma',     city: 'Miami, FL',        cuisine: 'Italian',   price: '$$$',  rating: 4.7 },
  { id: 'res-004', name: 'Maison Élysée',      city: 'San Francisco, CA',cuisine: 'French',    price: '$$$$', rating: 4.9 },
  { id: 'res-005', name: 'El Rancho Authentic',city: 'Austin, TX',       cuisine: 'Mexican',   price: '$$',   rating: 4.5 },
  { id: 'res-006', name: 'Spice Route',        city: 'Seattle, WA',      cuisine: 'Indian',    price: '$$',   rating: 4.6 },
];

router.get('/search', (req, res) => {
  const { location, cuisine, party = 2 } = req.query;
  let results = [...RESTAURANTS];
  if (location) results = results.filter(r => r.city.toLowerCase().includes(location.toLowerCase()));
  if (cuisine && cuisine !== 'All') results = results.filter(r => r.cuisine === cuisine);
  res.json({ success: true, results, total: results.length, party: +party });
});

router.post('/reserve', (req, res) => {
  const { restaurantId, date, time, party, name, email } = req.body;
  if (!restaurantId || !date || !time || !party) return res.status(400).json({ success: false, error: 'restaurantId, date, time, and party required' });
  res.status(201).json({
    success: true,
    reservationId: `VYG-RS-${Date.now()}`,
    restaurantId, date, time, party, name,
    status: 'Confirmed',
    message: `Your table for ${party} is confirmed for ${date} at ${time}. See you there!`,
  });
});

module.exports = router;
