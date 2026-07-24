/**
 * StatBadge – a small pill badge for stats / labels.
 *
 * Props:
 *   label    {string}
 *   value    {string|number}
 *   icon     {ReactComponent} optional react-icon
 *   variant  {"green"|"amber"|"rose"|"sky"|"purple"|"slate"} (default "slate")
 */
const VARIANTS = {
  green:  "bg-emerald-50  text-emerald-700  ring-emerald-200  dark:bg-emerald-900/30 dark:text-emerald-300 dark:ring-emerald-700/40",
  amber:  "bg-amber-50    text-amber-700    ring-amber-200    dark:bg-amber-900/30   dark:text-amber-300   dark:ring-amber-700/40",
  rose:   "bg-rose-50     text-rose-700     ring-rose-200     dark:bg-rose-900/30    dark:text-rose-300    dark:ring-rose-700/40",
  sky:    "bg-sky-50      text-sky-700      ring-sky-200      dark:bg-sky-900/30     dark:text-sky-300     dark:ring-sky-700/40",
  purple: "bg-purple-50   text-purple-700   ring-purple-200   dark:bg-purple-900/30  dark:text-purple-300  dark:ring-purple-700/40",
  slate:  "bg-slate-100   text-slate-700    ring-slate-200    dark:bg-slate-800      dark:text-slate-300   dark:ring-slate-700",
};

export function StatBadge({ label, value, icon: Icon, variant = "slate" }) {
  const cls = VARIANTS[variant] ?? VARIANTS.slate;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      {label && <span className="opacity-70">{label}</span>}
      {value !== undefined && <span>{value}</span>}
    </span>
  );
}
