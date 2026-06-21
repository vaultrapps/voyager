const express = require('express');
const router  = express.Router();

const COUNTRIES = [
  { code: 'FR', name: 'France',    region: 'Europe',  advisory: 1, visa: 'Visa-free (90 days)', currency: 'EUR', capital: 'Paris'     },
  { code: 'JP', name: 'Japan',     region: 'Asia',    advisory: 1, visa: 'Visa-free (90 days)', currency: 'JPY', capital: 'Tokyo'     },
  { code: 'MX', name: 'Mexico',    region: 'Americas',advisory: 2, visa: 'Visa-free (180 days)',currency: 'MXN', capital: 'Mexico City'},
  { code: 'TH', name: 'Thailand',  region: 'Asia',    advisory: 1, visa: 'Visa-free (30 days)', currency: 'THB', capital: 'Bangkok'   },
  { code: 'IT', name: 'Italy',     region: 'Europe',  advisory: 1, visa: 'Visa-free (90 days)', currency: 'EUR', capital: 'Rome'      },
  { code: 'BR', name: 'Brazil',    region: 'Americas',advisory: 2, visa: 'Visa-free (90 days)', currency: 'BRL', capital: 'Brasília'  },
  { code: 'AU', name: 'Australia', region: 'Oceania', advisory: 1, visa: 'eVisa required',       currency: 'AUD', capital: 'Canberra' },
  { code: 'IN', name: 'India',     region: 'Asia',    advisory: 2, visa: 'eVisa required',       currency: 'INR', capital: 'New Delhi'},
];

const EXCHANGE_RATES = { EUR: 0.92, JPY: 149.50, MXN: 17.12, THB: 35.80, BRL: 4.97, AUD: 1.53, INR: 83.12 };

router.get('/countries', (req, res) => {
  const { region, advisory } = req.query;
  let results = [...COUNTRIES];
  if (region && region !== 'All') results = results.filter(c => c.region === region);
  if (advisory) results = results.filter(c => c.advisory <= +advisory);
  res.json({ success: true, countries: results, total: results.length });
});

router.get('/countries/:code', (req, res) => {
  const country = COUNTRIES.find(c => c.code === req.params.code.toUpperCase());
  if (!country) return res.status(404).json({ success: false, error: 'Country not found' });
  res.json({ success: true, country });
});

router.get('/currency', (req, res) => {
  const { from = 'USD', to, amount = 1 } = req.query;
  if (!to) return res.status(400).json({ success: false, error: 'to currency required' });
  const rate = EXCHANGE_RATES[to] || 1;
  res.json({
    success: true,
    from, to,
    rate,
    amount: +amount,
    converted: +(+amount * rate).toFixed(2),
    note: 'Rates are indicative. Check with your bank for live rates.',
  });
});

router.get('/advisory/:country', (req, res) => {
  const country = COUNTRIES.find(c => c.name.toLowerCase() === req.params.country.toLowerCase() || c.code === req.params.country.toUpperCase());
  if (!country) return res.status(404).json({ success: false, error: 'Country not found' });
  const levels = { 1: 'Exercise Normal Precautions', 2: 'Exercise Increased Caution', 3: 'Reconsider Travel', 4: 'Do Not Travel' };
  res.json({ success: true, country: country.name, level: country.advisory, description: levels[country.advisory] });
});

module.exports = router;
