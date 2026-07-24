import { FiCheckCircle, FiClock, FiExternalLink } from "react-icons/fi";

/* ── Meal type themes ────────────────────────────────────────── */
const THEME = {
  Breakfast: {
    badge:      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:ring-amber-700/40",
    icon:       "🌅",
    imgOverlay: "from-amber-400/20 to-transparent",
    linkBg:     "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/40",
  },
  Lunch: {
    badge:      "bg-sky-50 text-sky-700 ring-1 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:ring-sky-700/40",
    icon:       "☀️",
    imgOverlay: "from-sky-400/20 to-transparent",
    linkBg:     "bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:bg-sky-900/40",
  },
  Dinner: {
    badge:      "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-indigo-700/40",
    icon:       "🌙",
    imgOverlay: "from-indigo-400/20 to-transparent",
    linkBg:     "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/40",
  },
  Snacks: {
    badge:      "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:ring-rose-700/40",
    icon:       "🍎",
    imgOverlay: "from-rose-400/20 to-transparent",
    linkBg:     "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-900/20 dark:text-rose-300 dark:hover:bg-rose-900/40",
  },
};

const FOOD_IMAGES = {
  Breakfast: [
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&q=80",
  ],
  Lunch: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop&q=80",
  ],
  Snacks: [
    "https://images.unsplash.com/photo-1490567674331-8a9a7c95a7ac?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519996529931-28324d5a630e?w=200&h=200&fit=crop&q=80",
  ],
  Dinner: [
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&q=80",
  ],
};
const FALLBACK = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop&q=80";

function pickImage(type, name) {
  const pool = FOOD_IMAGES[type] ?? FOOD_IMAGES.Lunch;
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  return pool[Math.abs(h) % pool.length];
}

function prepTime(type) {
  return { Breakfast: "10–15 min", Lunch: "20–25 min", Snacks: "5–10 min", Dinner: "25–30 min" }[type] ?? "15–20 min";
}

function parseIngredients(desc = "") {
  return desc
    .replace(/\b(served with|topped with|garnished|drizzled with|mixed with|cooked in|along with)\b/gi, ",")
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && s.length < 35)
    .slice(0, 4);
}

function MacroBar({ label, value, unit, max, barClass }) {
  const pct = Math.min(100, Math.round(((value || 0) / max) * 100));
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</span>
        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{value ?? 0}{unit}</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div className={`h-full rounded-full ${barClass} transition-[width] duration-700 ease-out`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/**
 * MealCard – rich meal card with image, macro bars, ingredients, and Spoonacular CTA.
 *
 * Props:
 *   title              {string}   "Breakfast" | "Lunch" | "Dinner" | "Snacks"
 *   meal               {object}   { name, calories, protein, carbs, fat, description, recipe_search_query }
 *   spoonacularImageUrl {string}  optional override image
 */
export function MealCard({ title, meal, spoonacularImageUrl = null }) {
  const theme = THEME[title] ?? THEME.Lunch;
  const imgSrc = spoonacularImageUrl || pickImage(title, meal?.name ?? "");
  const ingredients = parseIngredients(meal?.description);
  const spoonUrl = `https://spoonacular.com/recipes/search?query=${encodeURIComponent(meal?.recipe_search_query ?? meal?.name ?? "")}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-900">
      {/* Header: text left, image top-right */}
      <div className="flex items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4 pr-3">
          {/* Pill row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${theme.badge}`}>
              <span aria-hidden="true">{theme.icon}</span>
              {title}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700 ring-1 ring-green-200 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-700/40">
              <FiCheckCircle className="h-2.5 w-2.5" />
              Healthy
            </span>
          </div>
          <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">{meal?.name}</h4>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <FiClock className="h-3 w-3" />
              {prepTime(title)}
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              🔥 {meal?.calories} kcal
            </span>
          </div>
        </div>
        {/* Square image – top-right corner */}
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-tr-2xl rounded-bl-2xl">
          <img
            src={imgSrc}
            alt={meal?.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.currentTarget.src = FALLBACK; }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.imgOverlay}`} />
        </div>
      </div>

      <div className="mx-4 h-px bg-slate-100 dark:bg-slate-800" />

      {/* Macros */}
      <div className="space-y-2 px-4 py-3">
        <MacroBar label="Protein" value={meal?.protein} unit="g" max={60}  barClass="bg-brand-500" />
        <MacroBar label="Carbs"   value={meal?.carbs}   unit="g" max={120} barClass="bg-amber-400" />
        <MacroBar label="Fat"     value={meal?.fat}      unit="g" max={50}  barClass="bg-rose-400" />
      </div>

      {/* Ingredients */}
      {ingredients.length > 0 && (
        <>
          <div className="mx-4 h-px bg-slate-100 dark:bg-slate-800" />
          <div className="px-4 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Ingredients</p>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map((ing, i) => (
                <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Description */}
      <p className="line-clamp-2 px-4 pb-4 text-[11px] leading-[1.6] text-slate-400 dark:text-slate-500">
        {meal?.description}
      </p>

      {/* Footer CTA */}
      <div className="mt-auto border-t border-slate-100 dark:border-slate-800">
        <a
          href={spoonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-[11px] font-semibold transition-colors duration-200 ${theme.linkBg}`}
        >
          <FiExternalLink className="h-3 w-3" />
          Find Recipe on Spoonacular
        </a>
      </div>
    </article>
  );
}
