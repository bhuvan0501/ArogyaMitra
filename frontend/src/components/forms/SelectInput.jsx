export function SelectInput({ label, id, error, options = [], ...props }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <select
        id={id}
        className="field-input mt-1 w-full shadow-sm"
        {...props}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
