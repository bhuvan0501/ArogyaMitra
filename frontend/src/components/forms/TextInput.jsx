export function TextInput({ label, id, error, ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input
        id={id}
        className="field-input mt-1 w-full shadow-sm"
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
