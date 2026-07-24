import { FiCpu } from "react-icons/fi";

export function HealthBriefCard() {
  return (
    <section className="glass-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
          <FiCpu className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">Today's AI Health Brief</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Static preview, AI integration coming later</p>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
        Keep hydration steady, complete a moderate workout, and prioritize protein-rich meals aligned with your goal.
      </p>
    </section>
  );
}
