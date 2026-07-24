import { FiLoader } from "react-icons/fi";

export function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <FiLoader className="animate-spin" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
