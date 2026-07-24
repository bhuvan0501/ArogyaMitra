/**
 * EmptyState – illustrated empty / zero-data placeholder.
 *
 * Props:
 *   icon        {ReactComponent} large icon (optional)
 *   title       {string}
 *   description {string}
 *   action      {ReactNode}  CTA element (button / link)
 */
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 py-14 text-center dark:border-slate-700 dark:bg-slate-900/40">
      {Icon && (
        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-400 dark:bg-brand-900/30 dark:text-brand-400">
          <Icon className="h-8 w-8" />
        </span>
      )}
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
