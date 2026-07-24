import { useState } from "react";
import { FiCalendar, FiTrendingUp, FiZap } from "react-icons/fi";
import { NutritionDayCard } from "./NutritionDayCard.jsx";

const DAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function NutritionPlanCard({ plan }) {
  const [activeDay, setActiveDay] = useState(0);
  const days = plan.plan.days;
  const current = days[activeDay];

  const avgCal  = Math.round(days.reduce((s, d) => s + (d.total_calories  || 0), 0) / days.length);
  const avgProt = Math.round(days.reduce((s, d) => s + (d.total_protein   || 0), 0) / days.length);
  const minCal  = Math.min(...days.map((d) => d.total_calories || 0));
  const maxCal  = Math.max(...days.map((d) => d.total_calories || 0));

  return (
    <section className="space-y-5 animate-fade-in">

      {/* ── Plan summary banner ── */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
        {/* Subtle tinted bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-transparent to-amber-50/60 dark:from-brand-900/20 dark:to-amber-900/10" />

        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: title + date */}
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              <FiZap className="h-3.5 w-3.5" />
              AI Nutrition Plan
            </p>
            <h2 className="mt-1 truncate text-xl font-bold text-slate-900 dark:text-white">
              {plan.title}
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Generated{" "}
              {new Date(plan.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Right: stat chips */}
          <div className="flex shrink-0 flex-wrap gap-3">
            <StatChip
              icon={<FiCalendar className="h-4 w-4 text-brand-500" />}
              value={days.length}
              label="Days"
              bg="bg-brand-50 dark:bg-brand-900/20"
            />
            <StatChip
              icon={<FiZap className="h-4 w-4 text-amber-500" />}
              value={avgCal}
              label="Avg kcal"
              bg="bg-amber-50 dark:bg-amber-900/20"
            />
            <StatChip
              icon={<FiTrendingUp className="h-4 w-4 text-emerald-500" />}
              value={`${avgProt}g`}
              label="Avg protein"
              bg="bg-emerald-50 dark:bg-emerald-900/20"
            />
          </div>
        </div>

        {/* Calorie range bar */}
        <div className="border-t border-slate-100 px-6 py-3 dark:border-slate-800">
          <div className="mb-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Weekly calorie range</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {minCal} – {maxCal} kcal
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-400 to-amber-400" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      {/* ── Day selector tabs ── */}
      <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
        {days.map((day, i) => {
          const isActive = activeDay === i;
          return (
            <button
              key={day.day}
              type="button"
              onClick={() => setActiveDay(i)}
              className={`flex shrink-0 flex-col items-center gap-0.5 rounded-xl px-3.5 py-2.5 text-center transition-all duration-200 ${
                isActive
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-105"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-brand-900/20 dark:hover:text-brand-400"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">
                {DAY_LABELS[i]}
              </span>
              <span className="text-base font-extrabold leading-none">{day.day}</span>
              <span className={`text-[9px] font-medium leading-none ${isActive ? "text-white/70" : "text-slate-400 dark:text-slate-500"}`}>
                {day.total_calories}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Active day card ── */}
      {current && <NutritionDayCard key={current.day} day={current} />}
    </section>
  );
}

/* ─── StatChip sub-component ─────────────────────────────────── */
function StatChip({ icon, value, label, bg }) {
  return (
    <div className={`flex flex-col items-center rounded-xl px-4 py-2.5 ${bg}`}>
      {icon}
      <span className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-200">{value}</span>
      <span className="text-[10px] text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}
