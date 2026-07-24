export function PromptChip({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/70 bg-white/80 px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300"
    >
      {children}
    </button>
  );
}
