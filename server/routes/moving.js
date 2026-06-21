const express = require('express');
const router  = express.Router();

const ESTIMATES = {
  'Studio / 1 BR':    { min: 800,  max: 2000  },
  '2–3 Bedroom':      { min: 1800, max: 5000  },
  '4–5 Bedroom':      { min: 4000, max: 10000 },
  '6+ Bedroom / Large':{ min: 8000,max: 20000 },
};

const MOVERS = [
  { id: 'm-001', name: 'Allied Van Lines',     rating: 4.7, specialty: 'Long Distance',    priceRange: '$2,800–$5,200' },
  { id: 'm-002', name: 'Two Men and a Truck',  rating: 4.5, specialty: 'Local Moves',      priceRange: '$800–$2,100'  },
  { id: 'm-003', name: 'North American Van',   rating: 4.6, specialty: 'Long Distance',    priceRange: '$2,500–$4,800' },
  { id: 'm-004', name: 'PODS Moving & Storage',rating: 4.4, specialty: 'Flexible Storage', priceRange: '$1,200–$3,400' },
];

router.post('/calculate', (req, res) => {
  const { homeSize, moveType, addOns = [] } = req.body;
  const estimate = ESTIMATES[homeSize] || ESTIMATES['2–3 Bedroom'];
  const addOnCost = addOns.length * 250;
  res.json({
    success: true,
    estimate: { min: estimate.min + addOnCost, max: estimate.max + addOnCost },
    homeSize,
    moveType: moveType || 'Long Distance',
    currency: 'USD',
  });
});

router.get('/movers', (req, res) => {
  res.json({ success: true, movers: MOVERS });
});

router.post('/quote-request', (req, res) => {
  const { from, to, moveDate, homeSize, services = [] } = req.body;
  if (!from || !to) return res.status(400).json({ success: false, error: 'from and to locations required' });
  res.status(201).json({
    success: true,
    quoteRequestId: `VYG-MV-${Date.now()}`,
    from, to, moveDate, homeSize,
    services,
    status: 'Quotes Requested',
    message: 'We\'ve sent your move details to 3 top-rated movers. Expect quotes within 2 hours.',
  });
});

module.exports = router;
