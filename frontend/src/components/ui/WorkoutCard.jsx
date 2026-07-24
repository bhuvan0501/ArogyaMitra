import { FiActivity, FiCalendar, FiChevronRight } from "react-icons/fi";

/**
 * WorkoutCard – summary card for a full workout plan or workout day.
 *
 * Props:
 *   title       {string}    plan / day name
 *   description {string}    optional subtitle
 *   exerciseCount {number}  how many exercises
 *   duration    {string}    e.g. "45 min"
 *   date        {string}    e.g. "Day 1" or ISO date string
 *   onClick     {function}  called when card is clicked
 *   badge       {string}    optional label e.g. "Active"
 *   gradient    {string}    Tailwind gradient for accent stripe
 */
export function WorkoutCard({
  title,
  description,
  exerciseCount,
  duration,
  date,
  onClick,
  badge,
  gradient = "from-brand-500 to-brand-600",
}) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : ""}`}
    >
      {/* Accent stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            {badge && (
              <span className="mb-1 inline-block self-start rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                {badge}
              </span>
            )}
            <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
            {description && (
              <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{description}</p>
            )}
          </div>
          {onClick && (
            <FiChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-500 dark:text-slate-600" />
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {exerciseCount !== undefined && (
            <span className="flex items-center gap-1">
              <FiActivity className="h-3.5 w-3.5 text-brand-500" />
              {exerciseCount} exercise{exerciseCount !== 1 ? "s" : ""}
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1">
              <FiActivity className="h-3.5 w-3.5 text-sky-500" />
              {duration}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1">
              <FiCalendar className="h-3.5 w-3.5 text-amber-500" />
              {date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
