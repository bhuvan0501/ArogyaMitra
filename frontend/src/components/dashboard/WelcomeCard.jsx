import { FiHeart } from "react-icons/fi";

export function WelcomeCard({ name = "there" }) {
  return (
    <section className="glass-card animate-fade-in p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">ArogyaMitra Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Welcome back, {name}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Track your daily health signals, stay close to your current goal, and jump into the next action.
          </p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-brand-50 text-brand-700 dark:bg-brand-900/50 dark:text-brand-100">
          <FiHeart className="h-7 w-7" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
