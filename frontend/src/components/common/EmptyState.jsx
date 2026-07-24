export function EmptyState({ title, description }) {
  return (
    <div className="glass-card border-dashed p-8 text-center animate-fade-in">
      <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      {description ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
    </div>
  );
}
