export default function CookiePolicy() {
  return (
    <div className="min-h-[80vh] bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-2xl backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-brand-500 font-semibold mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-gray-300 max-w-3xl leading-8 mb-10">
            Voyager uses cookies and similar technologies to improve your experience, make the site more useful, and personalize content. This policy explains how we use those tools.
          </p>

          <div className="space-y-10 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">What Cookies We Use</h2>
              <p className="leading-8">
                We use essential cookies for site operation, analytics cookies to understand usage trends, and preference cookies to remember settings and improve your journey.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Why Cookies Matter</h2>
              <p className="leading-8">
                Cookies help Voyager keep your session active, personalize your recommendations, and deliver faster, more intuitive service across devices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-3">Managing Cookies</h2>
              <p className="leading-8">
                You can control cookies in your browser settings. Disabling non-essential cookies may affect some features and the personalization of the site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
