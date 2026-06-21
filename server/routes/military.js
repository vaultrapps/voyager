const express = require('express');
const router  = express.Router();

const BAH_RATES = {
  'O-6': { with: 3456, without: 2845 }, 'O-5': { with: 2987, without: 2456 },
  'O-4': { with: 2765, without: 2234 }, 'O-3': { with: 2543, without: 2012 },
  'O-2': { with: 2234, without: 1789 }, 'O-1': { with: 1987, without: 1567 },
  'E-9': { with: 2654, without: 2123 }, 'E-8': { with: 2345, without: 1876 },
  'E-7': { with: 2123, without: 1698 }, 'E-6': { with: 1987, without: 1567 },
  'E-5': { with: 1765, without: 1398 }, 'E-4': { with: 1543, without: 1234 },
  'E-3': { with: 1321, without: 1089 }, 'E-2': { with: 1234, without: 987  },
  'E-1': { with: 1145, without: 923  },
};

const WEIGHT_ALLOWANCES = {
  'E-1': 5000, 'E-2': 5000, 'E-3': 5000, 'E-4': 7000, 'E-5': 7000,
  'E-6': 11000,'E-7': 11000,'E-8': 12000,'E-9': 13500,
  'O-1': 10000,'O-2': 12500,'O-3': 13000,'O-4': 14000,'O-5': 14500,'O-6': 17500,
};

router.get('/bah', (req, res) => {
  const { payGrade, dependents, zipCode } = req.query;
  if (!payGrade) return res.status(400).json({ success: false, error: 'payGrade required' });
  const rates = BAH_RATES[payGrade] || BAH_RATES['E-5'];
  const hasDeps = dependents === 'true' || dependents === '1';
  const monthly = hasDeps ? rates.with : rates.without;
  res.json({
    success: true,
    payGrade,
    dependents: hasDeps,
    zipCode: zipCode || 'N/A',
    monthly,
    annual: monthly * 12,
    taxable: false,
    note: 'Rates are approximate. Actual BAH varies by installation zip code.',
  });
});

router.get('/weight-allowance', (req, res) => {
  const { payGrade } = req.query;
  if (!payGrade) return res.status(400).json({ success: false, error: 'payGrade required' });
  const pounds = WEIGHT_ALLOWANCES[payGrade] || 10000;
  res.json({ success: true, payGrade, pounds, tons: +(pounds / 2000).toFixed(2) });
});

router.post('/concierge-request', (req, res) => {
  const { name, email, branch, payGrade, fromBase, toBase, reportDate } = req.body;
  res.status(201).json({
    success: true,
    requestId: `VYG-PCS-${Date.now()}`,
    status: 'A Military PCS specialist will contact you within 2 business hours.',
  });
});

module.exports = router;
