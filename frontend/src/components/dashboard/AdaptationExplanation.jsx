export function AdaptationExplanation({ explanation }) {
  if (!explanation) {
    return null;
  }

  return (
    <section className="glass-card border-brand-100/70 bg-brand-50/70 p-5 dark:border-brand-900/40 dark:bg-brand-900/20">
      <h2 className="text-lg font-semibold text-brand-900 dark:text-brand-100">AI Changes Made</h2>
      <p className="mt-2 text-sm leading-6 text-brand-800 dark:text-brand-100">{explanation.summary}</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <ChangeList title="Workout Changes" items={explanation.workout_changes} />
        <ChangeList title="Meal Changes" items={explanation.nutrition_changes} />
        <ChangeList title="Kept Unchanged" items={explanation.unchanged} />
      </div>
    </section>
  );
}

function ChangeList({ title, items }) {
  return (
    <div className="rounded-lg bg-white/75 p-4 dark:bg-slate-950/50">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
        {(items?.length ? items : ["No specific items reported."]).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
