const express = require('express');
const Stripe  = require('stripe');

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  premium:  process.env.STRIPE_PRICE_PREMIUM,
  vip:      process.env.STRIPE_PRICE_VIP,
  founding: process.env.STRIPE_PRICE_FOUNDING,
};

router.post('/', async (req, res) => {
  const { tier } = req.body;
  const priceId = PRICE_IDS[tier];
  if (!priceId) {
    return res.status(400).json({ success: false, error: 'Invalid tier' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ success: false, error: 'Failed to create checkout session' });
  }
});

module.exports = router;
