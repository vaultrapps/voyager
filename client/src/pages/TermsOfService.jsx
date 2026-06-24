export default function TermsOfService() {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-gray-300 max-w-3xl leading-8 mb-10">
            These Terms of Service govern your use of Voyager’s website and services. By accessing our platform, you agree to the terms below and acknowledge our commitment to helping you travel smarter.
          </p>

          <div className="space-y-10 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Acceptance of Terms</h2>
              <p className="leading-8">
                By using Voyager, you accept these terms, including any updates we publish. Please review them regularly to stay informed about your rights and responsibilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Service Use</h2>
              <p className="leading-8">
                Voyager provides travel planning tools, booking support, and concierge services. You agree to use these services lawfully and not to interfere with our platform or other travelers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Pricing & Payments</h2>
              <p className="leading-8">
                All prices and fees are provided in accordance with the service selected. Voyager may work with partners to complete bookings, and payment terms are subject to the specific provider agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Limitation of Liability</h2>
              <p className="leading-8">
                Voyager strives to provide accurate travel information, but we are not responsible for errors, partner availability, or travel disruptions beyond our control.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
