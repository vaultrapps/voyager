const express = require('express');
const router  = express.Router();

const FLIGHTS = [
  { id: 'fl-001', airline: 'Delta Air Lines',    code: 'DL', num: 'DL 1234', from: 'JFK', to: 'LAX', dep: '06:00', arr: '09:15', dur: '5h 15m', stops: 0, price: 289, seats: 4  },
  { id: 'fl-002', airline: 'United Airlines',    code: 'UA', num: 'UA 891',  from: 'ORD', to: 'MIA', dep: '08:30', arr: '12:45', dur: '3h 15m', stops: 0, price: 198, seats: 7  },
  { id: 'fl-003', airline: 'American Airlines',  code: 'AA', num: 'AA 2210', from: 'DFW', to: 'SEA', dep: '11:00', arr: '14:45', dur: '4h 45m', stops: 1, price: 245, seats: 2  },
  { id: 'fl-004', airline: 'Southwest Airlines', code: 'WN', num: 'WN 437',  from: 'ATL', to: 'DEN', dep: '09:15', arr: '11:30', dur: '3h 15m', stops: 0, price: 178, seats: 12 },
  { id: 'fl-005', airline: 'JetBlue',            code: 'B6', num: 'B6 1019', from: 'BOS', to: 'FLL', dep: '07:00', arr: '10:20', dur: '3h 20m', stops: 0, price: 215, seats: 5  },
  { id: 'fl-006', airline: 'Alaska Airlines',    code: 'AS', num: 'AS 320',  from: 'LAX', to: 'SFO', dep: '14:00', arr: '15:10', dur: '1h 10m', stops: 0, price: 89,  seats: 18 },
];

router.get('/search', (req, res) => {
  const { from, to, passengers = 1 } = req.query;
  let results = [...FLIGHTS];
  if (from) results = results.filter(f => f.from.toLowerCase().includes(from.toLowerCase()));
  if (to)   results = results.filter(f => f.to.toLowerCase().includes(to.toLowerCase()));
  res.json({ success: true, results, total: results.length, passengers: +passengers });
});

router.post('/book', (req, res) => {
  const { flightId, passengers, class: cls, paymentMethod } = req.body;
  if (!flightId) return res.status(400).json({ success: false, error: 'flightId required' });
  res.status(201).json({
    success: true,
    bookingId: `VYG-FL-${Date.now()}`,
    flightId,
    passengers,
    class: cls || 'Economy',
    status: 'Confirmed',
    message: 'Flight booked successfully! Confirmation sent to your email.',
  });
});

module.exports = router;
