import { useState } from "react";
import { FiInfo, FiChevronDown } from "react-icons/fi";
import { MealCard } from "./MealCard.jsx";

/* ─── SVG Donut ring (protein / carbs / fat split) ───────────── */
function MacroDonut({ protein = 0, carbs = 0, fat = 0 }) {
  const total = (protein + carbs + fat) || 1;
  const p = (protein / total) * 100;
  const c = (carbs   / total) * 100;
  const f = (fat     / total) * 100;
  // Circle r=15.9 → circumference ≈ 100
  const C = 100;
  const segs = [
    { pct: p, color: "#34d399", offset: 0 },          // emerald  → protein
    { pct: c, color: "#fbbf24", offset: p },           // amber    → carbs
    { pct: f, color: "#f87171", offset: p + c },       // red-400  → fat
  ];

  return (
    <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90" aria-hidden="true">
      {/* track */}
      <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
      {segs.map((s, i) => (
        <circle
          key={i}
          cx="18" cy="18" r="15.9"
          fill="none"
          stroke={s.color}
          strokeWidth="3"
          strokeDasharray={`${(s.pct * C) / 100} ${C}`}
          strokeDashoffset={`-${(s.offset * C) / 100}`}
        />
      ))}
    </svg>
  );
}

/* ─── Stat pill inside header ─────────────────────────────────── */
function HeaderStat({ label, value, unit, dotClass }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${dotClass}`} />
      <span className="text-xs text-white/80">
        {label}:{" "}
        <span className="font-semibold text-white">
          {value}
          {unit}
        </span>
      </span>
    </div>
  );
}

/* ─── NutritionDayCard ────────────────────────────────────────── */
export function NutritionDayCard({ day }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-900">

      {/* ── Gradient header ── */}
      <div className="flex flex-col gap-5 bg-gradient-to-br from-brand-600 to-emerald-500 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Left: day label + calorie total */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
            Day {day.day}
          </p>
          <p className="mt-0.5 text-2xl font-extrabold text-white">
            {day.total_calories}
            <span className="ml-1 text-sm font-normal text-white/70">kcal / day</span>
          </p>

          {/* Macro legend */}
          <div className="mt-3 flex flex-col gap-1.5">
            <HeaderStat label="Protein" value={Math.round(day.total_protein)} unit="g" dotClass="bg-emerald-300" />
            <HeaderStat label="Carbs"   value={Math.round(day.total_carbs)}   unit="g" dotClass="bg-amber-300" />
            <HeaderStat label="Fat"     value={Math.round(day.total_fat)}     unit="g" dotClass="bg-red-300" />
          </div>
        </div>

        {/* Right: donut ring */}
        <div className="flex items-center gap-4">
          <MacroDonut
            protein={day.total_protein}
            carbs={day.total_carbs}
            fat={day.total_fat}
          />
          {/* Small legend */}
          <div className="hidden space-y-1.5 sm:block">
            {[
              { label: "Protein", color: "#34d399" },
              { label: "Carbs",   color: "#fbbf24" },
              { label: "Fat",     color: "#f87171" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: l.color }} />
                <span className="text-[11px] text-white/70">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Meal cards — 2×2 grid ── */}
      <div className="grid gap-4 p-5 sm:grid-cols-2">
        <MealCard title="Breakfast" meal={day.breakfast} />
        <MealCard title="Lunch"     meal={day.lunch} />
        <MealCard title="Snacks"    meal={day.snacks} />
        <MealCard title="Dinner"    meal={day.dinner} />
      </div>

      {/* ── Collapsible daily tip ── */}
      <div className="border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowTip((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-3.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2 font-semibold">
            <FiInfo className="h-4 w-4 text-amber-500" />
            Daily Nutrition Tip
          </span>
          <FiChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${showTip ? "rotate-180" : ""}`}
          />
        </button>
        {showTip && (
          <p className="border-t border-slate-100 bg-amber-50/60 px-5 py-4 text-sm leading-relaxed text-amber-900 dark:border-slate-800 dark:bg-amber-900/10 dark:text-amber-200">
            {day.daily_tip}
          </p>
        )}
      </div>
    </article>
  );
}
