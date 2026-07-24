import { Link } from "react-router-dom";

export function QuickNavCard({ to, title, description, icon: Icon }) {
  return (
    <Link
      to={to}
      className="glass-card group p-5 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-xl"
    >
      <div className="mb-4 inline-flex rounded-lg bg-slate-100 p-3 text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="text-base font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
    </Link>
  );
}
