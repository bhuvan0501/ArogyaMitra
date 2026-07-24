export function PageHeader({ title, description }) {
  return (
    <section className="mb-6">
      <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">{title}</h1>
      {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p> : null}
    </section>
  );
}
