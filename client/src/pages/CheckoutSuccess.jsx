import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
  return (
    <div className="min-h-[80vh] bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-brand-400" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">You're in!</h1>
        <p className="text-gray-400 leading-relaxed mb-8">
          Your subscription is confirmed. Welcome to Voyager — your concierge team is ready when you are.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/concierge"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Submit a Concierge Request
          </Link>
        </div>
      </div>
    </div>
  );
}
