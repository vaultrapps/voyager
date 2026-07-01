const express = require('express');
const fs      = require('fs');
const path    = require('path');

const router   = express.Router();
const CSV_PATH = path.join(__dirname, '../data/founding_member_signups.csv');

function appendToCSV(email) {
  const header = 'email,signedUpAt\n';
  const row    = `"${email}","${new Date().toISOString()}"\n`;
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, header + row, 'utf8');
  } else {
    fs.appendFileSync(CSV_PATH, row, 'utf8');
  }
}

router.post('/', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid email required' });
  }
  try {
    appendToCSV(email.trim().toLowerCase());
    res.status(201).json({ success: true, message: 'Signup saved' });
  } catch (err) {
    console.error('founding-member signup error:', err);
    res.status(500).json({ success: false, error: 'Failed to save signup' });
  }
});

module.exports = router;
