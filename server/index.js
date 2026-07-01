require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'https://choosevoyager.com'] }));
app.use(express.json());

app.use('/api/flights',       require('./routes/flights'));
app.use('/api/hotels',        require('./routes/hotels'));
app.use('/api/rentals',       require('./routes/rentals'));
app.use('/api/cruises',       require('./routes/cruises'));
app.use('/api/restaurants',   require('./routes/restaurants'));
app.use('/api/moving',        require('./routes/moving'));
app.use('/api/military',      require('./routes/military'));
app.use('/api/international', require('./routes/international'));
app.use('/api/concierge',        require('./routes/concierge'));
app.use('/api/founding-member',  require('./routes/foundingMember'));

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'Voyager API', version: '1.0.0' }));

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🧭 Voyager API running on http://localhost:${PORT}`));
