import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

export default function CheckoutCancel() {
  return (
    <div className="min-h-[80vh] bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-gray-500" />
        </div>
        <h1 className="text-3xl font-black text-white mb-3">No worries</h1>
        <p className="text-gray-400 leading-relaxed mb-8">
          Your payment was cancelled and you haven't been charged. You can subscribe anytime you're ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/concierge"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Back to Plans
          </Link>
          <Link
            to="/"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
