const express = require('express');
const router  = express.Router();

const SERVICES = [
  { id: 'svc-001', name: 'Complex Itinerary Planning', tier: ['Standard','Premium','VIP'] },
  { id: 'svc-002', name: 'Surprise Getaways',          tier: ['Premium','VIP'] },
  { id: 'svc-003', name: 'Luxury Accommodations',      tier: ['Premium','VIP'] },
  { id: 'svc-004', name: 'Private Dining Experiences', tier: ['Premium','VIP'] },
  { id: 'svc-005', name: 'VIP Event Access',           tier: ['VIP'] },
  { id: 'svc-006', name: 'Corporate Travel',           tier: ['Standard','Premium','VIP'] },
];

const requests = [];

router.get('/services', (_req, res) => {
  res.json({ success: true, services: SERVICES });
});

router.post('/request', (req, res) => {
  const { name, email, requestText, dates, budget, tier } = req.body;
  if (!name || !email || !requestText) return res.status(400).json({ success: false, error: 'name, email, and requestText required' });
  const record = {
    id: `VYG-CON-${Date.now()}`,
    name, email, requestText, dates, budget,
    tier: tier || 'Standard',
    status: 'Received',
    createdAt: new Date().toISOString(),
    expectedResponseTime: tier === 'VIP' ? '1 hour' : tier === 'Premium' ? '4 hours' : '24 hours',
  };
  requests.push(record);
  res.status(201).json({
    success: true,
    requestId: record.id,
    status: record.status,
    message: `Request received! Your concierge will respond within ${record.expectedResponseTime}.`,
    expectedResponseTime: record.expectedResponseTime,
  });
});

router.get('/request/:id', (req, res) => {
  const req_ = requests.find(r => r.id === req.params.id);
  if (!req_) return res.status(404).json({ success: false, error: 'Request not found' });
  res.json({ success: true, request: req_ });
});

module.exports = router;
