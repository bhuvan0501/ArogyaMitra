export function TextAreaInput({ label, id, error, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <textarea
        id={id}
        className="field-input mt-1 min-h-28 w-full shadow-sm"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
