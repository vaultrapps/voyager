export default function PlanStepIndicator({ current }) {
  const steps = ['Select Needs', 'Compare Options', 'Your Summary'];
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
              active ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/25' :
              done   ? 'bg-brand-100 text-brand-700' :
                       'bg-gray-100 text-gray-400'
            }`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                active ? 'bg-white text-brand-600' :
                done   ? 'bg-brand-500 text-white' :
                         'bg-gray-300 text-white'
              }`}>
                {done ? '✓' : step}
              </div>
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">Step {step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-5 sm:w-8 h-0.5 ${step < current ? 'bg-brand-300' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
