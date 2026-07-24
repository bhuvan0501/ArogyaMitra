import { FiDroplet, FiZap } from "react-icons/fi";

/**
 * NutritionCard – summary card for a full nutrition plan or nutrition day.
 *
 * Props:
 *   title          {string}   e.g. "Day 1" or plan name
 *   totalCalories  {number}
 *   totalProtein   {number}   grams
 *   totalCarbs     {number}   grams
 *   totalFat       {number}   grams
 *   mealCount      {number}
 *   description    {string}   optional subtitle / notes
 *   onClick        {function} optional – makes card clickable
 *   gradient       {string}   Tailwind gradient for accent stripe
 */
export function NutritionCard({
  title,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
  mealCount,
  description,
  onClick,
  gradient = "from-emerald-400 to-teal-500",
}) {
  const macros = [
    { label: "Protein", value: totalProtein, unit: "g", color: "bg-brand-500",  max: 150 },
    { label: "Carbs",   value: totalCarbs,   unit: "g", color: "bg-amber-400",  max: 300 },
    { label: "Fat",     value: totalFat,     unit: "g", color: "bg-rose-400",   max: 100 },
  ];

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-xl" : ""}`}
    >
      {/* Accent stripe */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Header */}
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
          {description && (
            <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>

        {/* Calorie + meal count row */}
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {totalCalories !== undefined && (
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-200">
              <FiZap className="h-3.5 w-3.5 text-amber-500" />
              {totalCalories} kcal
            </span>
          )}
          {mealCount !== undefined && (
            <span className="flex items-center gap-1">
              <FiDroplet className="h-3.5 w-3.5 text-sky-500" />
              {mealCount} meal{mealCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Macro bars */}
        {macros.some((m) => m.value !== undefined) && (
          <div className="space-y-1.5">
            {macros.map(({ label, value, unit, color, max }) => {
              if (value === undefined) return null;
              const pct = Math.min(100, Math.round(((value || 0) / max) * 100));
              return (
                <div key={label}>
                  <div className="mb-0.5 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">{label}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{value}{unit}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={`h-full rounded-full ${color} transition-[width] duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
