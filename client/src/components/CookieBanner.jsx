import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem('cookieConsent') !== 'accepted');

  if (!visible) return null;

  function accept() {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4" style={{ backgroundColor: '#1D9E75' }}>
      <p className="text-white text-sm text-center sm:text-left">
        We use cookies to improve your experience. By continuing, you agree to our{' '}
        <Link to="/cookie-policy" className="underline font-semibold">Cookie Policy</Link>.
      </p>
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/cookie-policy"
          className="px-4 py-2 rounded-lg bg-white text-sm font-semibold border border-white"
          style={{ color: '#1D9E75' }}
        >
          Learn More
        </Link>
        <button
          onClick={accept}
          className="px-4 py-2 rounded-lg bg-white text-sm font-semibold border border-white"
          style={{ color: '#1D9E75' }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
