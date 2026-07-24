/**
 * SectionHeader – titled section with optional subtitle and action slot.
 *
 * Props:
 *   title    {string}
 *   subtitle {string}
 *   action   {ReactNode} optional right-side element (e.g. a button)
 *   icon     {ReactComponent} optional react-icon beside title
 */
export function SectionHeader({ title, subtitle, action, icon: Icon }) {
  return (
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
