/**
 * MetricCard – reusable dashboard metric card.
 *
 * Props:
 *   title    {string}           – metric label
 *   value    {string|ReactNode} – primary displayed value
 *   icon     {ReactComponent}   – react-icons component
 *   gradient {string}           – Tailwind bg-gradient classes
 *   progress {number}           – optional 0-100; renders a progress bar
 */
export function MetricCard({ title, value, icon: Icon, gradient, progress }) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* Watermark icon – top-right */}
      <div className="absolute right-3 top-3 opacity-20 transition-opacity duration-300 group-hover:opacity-40">
        {Icon && <Icon className="h-10 w-10" />}
      </div>

      {/* Title */}
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80">{title}</p>

      {/* Value */}
      <div className="mt-2 flex-1">
        {typeof value === "string" ? (
          <p className="text-xl font-bold leading-snug">{value}</p>
        ) : (
          value
        )}
      </div>

      {/* Optional progress bar */}
      {typeof progress === "number" && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs opacity-80 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/30">
            <div
              className="h-1.5 rounded-full bg-white transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
