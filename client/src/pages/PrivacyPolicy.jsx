export default function PrivacyPolicy() {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-300 max-w-3xl leading-8 mb-10">
            At Voyager, protecting your personal information is a core priority. This Privacy Policy explains how we collect, use, and safeguard the data you share with us when using our platform.
          </p>

          <div className="space-y-10 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Information We Collect</h2>
              <p className="leading-8">
                We collect information you provide directly, such as name, email, travel preferences, and booking details. We also gather device and usage data to deliver a seamless travel planning experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">How We Use Your Data</h2>
              <p className="leading-8">
                Your information helps us process reservations, personalize recommendations, improve our services, and communicate important updates. We never sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Data Security</h2>
              <p className="leading-8">
                We implement industry-standard security measures to protect your information. Our systems are designed to keep your travel plans private and secure while you explore with confidence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Contact</h2>
              <p className="leading-8">
                If you have questions about this policy, please email us at <a href="mailto:hello@choosevoyager.com" className="text-brand-400 hover:text-brand-300">hello@choosevoyager.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
