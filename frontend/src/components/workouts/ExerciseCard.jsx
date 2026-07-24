import { FiClock, FiExternalLink, FiPlay, FiZap } from "react-icons/fi";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────
   Difficulty badge styles
   ────────────────────────────────────────────────────────────────── */
const DIFFICULTY = {
  Beginner: { cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", dot: "bg-emerald-500" },
  Intermediate: { cls: "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300",   dot: "bg-amber-500"   },
  Advanced: { cls: "bg-red-100     text-red-700     dark:bg-red-900/40     dark:text-red-300",     dot: "bg-red-500"     },
  Easy:   { cls: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300", dot: "bg-emerald-500" },
  Medium: { cls: "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300",   dot: "bg-amber-500"   },
  Hard:   { cls: "bg-red-100     text-red-700     dark:bg-red-900/40     dark:text-red-300",     dot: "bg-red-500"     },
};

/* ──────────────────────────────────────────────────────────────────
   Muscle group chip colours
   ────────────────────────────────────────────────────────────────── */
const MUSCLE = {
  Chest:       "bg-rose-50   text-rose-700   dark:bg-rose-900/30   dark:text-rose-300",
  Back:        "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Shoulders:   "bg-sky-50    text-sky-700    dark:bg-sky-900/30    dark:text-sky-300",
  Biceps:      "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Triceps:     "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Legs:        "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Core:        "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Cardio:      "bg-pink-50   text-pink-700   dark:bg-pink-900/30   dark:text-pink-300",
  Glutes:      "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  Hamstrings:  "bg-amber-50  text-amber-700  dark:bg-amber-900/30  dark:text-amber-300",
  "Full Body": "bg-teal-50   text-teal-700   dark:bg-teal-900/30   dark:text-teal-300",
};

/* ──────────────────────────────────────────────────────────────────
   Exercise image mapping.
   Public assets are served by Vite from /images/exercises/{file}.
   ────────────────────────────────────────────────────────────────── */
const IMAGE_BY_EXACT_NAME = {
  "barbell rows": "/images/exercises/barbellrows.jpg",
  "barbell row": "/images/exercises/barbellrows.jpg",
  "bench press": "/images/exercises/benchpress.jpg",
  "bicep curl": "/images/exercises/bicepcurl.jpg",
  "biceps curl": "/images/exercises/bicepcurl.jpg",
  "burpees": "/images/exercises/burpees.jpg",
  "burpee": "/images/exercises/burpees.jpg",
  "calf raises": "/images/exercises/calfraises.jpg",
  "calf raise": "/images/exercises/calfraises.jpg",
  "deadlift": "/images/exercises/deadlift.jpg",
  "incline dumbbell press": "/images/exercises/incline-dumbbell-press.jpg",
  "jumping jacks": "/images/exercises/jumpingjacks.jpg",
  "jumping jack": "/images/exercises/jumpingjacks.jpg",
  "lateral raises": "/images/exercises/lateralraises.jpg",
  "lateral raise": "/images/exercises/lateralraises.jpg",
  "leg press": "/images/exercises/legpress.jpg",
  "lunges": "/images/exercises/lunges.jpg",
  "lunge": "/images/exercises/lunges.jpg",
  "mountain climbers": "/images/exercises/mountainclimbers.jpg",
  "mountain climber": "/images/exercises/mountainclimbers.jpg",
  "plank": "/images/exercises/plank.jpg",
  "pullups": "/images/exercises/pullups.jpg",
  "pull ups": "/images/exercises/pullups.jpg",
  "pull-ups": "/images/exercises/pullups.jpg",
  "pullup": "/images/exercises/pullups.jpg",
  "pull up": "/images/exercises/pullups.jpg",
  "pull-up": "/images/exercises/pullups.jpg",
  "pushup": "/images/exercises/pushup.jpg",
  "push up": "/images/exercises/pushup.jpg",
  "push-up": "/images/exercises/pushup.jpg",
  "running": "/images/exercises/running.jpg",
  "run": "/images/exercises/running.jpg",
  "shoulder press": "/images/exercises/shoulderpress.jpg",
  "squat": "/images/exercises/squat.jpg",
  "swimming": "/images/exercises/swimming.jpg",
  "swim": "/images/exercises/swimming.jpg",
  "tricep pushdown": "/images/exercises/triceppushdown.jpg",
  "triceps pushdown": "/images/exercises/triceppushdown.jpg",
  "walking": "/images/exercises/walking.jpg",
  "walk": "/images/exercises/walking.jpg",
  "yoga": "/images/exercises/yoga.jpg",
};

const KEYWORD_IMAGES = [
  ["incline dumbbell press", "/images/exercises/incline-dumbbell-press.jpg"],
  ["triceps pushdown", "/images/exercises/triceppushdown.jpg"],
  ["tricep pushdown", "/images/exercises/triceppushdown.jpg"],
  ["lateral raises", "/images/exercises/lateralraises.jpg"],
  ["lateral raise", "/images/exercises/lateralraises.jpg"],
  ["mountain climbers", "/images/exercises/mountainclimbers.jpg"],
  ["mountain climber", "/images/exercises/mountainclimbers.jpg"],
  ["jumping jacks", "/images/exercises/jumpingjacks.jpg"],
  ["jumping jack", "/images/exercises/jumpingjacks.jpg"],
  ["barbell rows", "/images/exercises/barbellrows.jpg"],
  ["barbell row", "/images/exercises/barbellrows.jpg"],
  ["bench press", "/images/exercises/benchpress.jpg"],
  ["bicep curl", "/images/exercises/bicepcurl.jpg"],
  ["biceps curl", "/images/exercises/bicepcurl.jpg"],
  ["calf raises", "/images/exercises/calfraises.jpg"],
  ["calf raise", "/images/exercises/calfraises.jpg"],
  ["shoulder press", "/images/exercises/shoulderpress.jpg"],
  ["leg press", "/images/exercises/legpress.jpg"],
  ["pull-up", "/images/exercises/pullups.jpg"],
  ["pull up", "/images/exercises/pullups.jpg"],
  ["pullup", "/images/exercises/pullups.jpg"],
  ["push-up", "/images/exercises/pushup.jpg"],
  ["push up", "/images/exercises/pushup.jpg"],
  ["pushup", "/images/exercises/pushup.jpg"],
  ["deadlift", "/images/exercises/deadlift.jpg"],
  ["burpee", "/images/exercises/burpees.jpg"],
  ["lateral", "/images/exercises/lateralraises.jpg"],
  ["tricep", "/images/exercises/triceppushdown.jpg"],
  ["triceps", "/images/exercises/triceppushdown.jpg"],
  ["shoulder", "/images/exercises/shoulderpress.jpg"],
  ["overhead", "/images/exercises/shoulderpress.jpg"],
  ["bicep", "/images/exercises/bicepcurl.jpg"],
  ["curl", "/images/exercises/bicepcurl.jpg"],
  ["squat", "/images/exercises/squat.jpg"],
  ["lunge", "/images/exercises/lunges.jpg"],
  ["calf", "/images/exercises/calfraises.jpg"],
  ["plank", "/images/exercises/plank.jpg"],
  ["crunch", "/images/exercises/plank.jpg"],
  ["core", "/images/exercises/plank.jpg"],
  ["running", "/images/exercises/running.jpg"],
  ["sprint", "/images/exercises/running.jpg"],
  ["walking", "/images/exercises/walking.jpg"],
  ["mountain", "/images/exercises/mountainclimbers.jpg"],
  ["swim", "/images/exercises/swimming.jpg"],
  ["yoga", "/images/exercises/yoga.jpg"],
  ["row", "/images/exercises/barbellrows.jpg"],
  ["bench", "/images/exercises/benchpress.jpg"],
  ["press", "/images/exercises/shoulderpress.jpg"],
  ["jump", "/images/exercises/jumpingjacks.jpg"],
  ["pull", "/images/exercises/pullups.jpg"],
  ["push", "/images/exercises/pushup.jpg"],
  ["run", "/images/exercises/running.jpg"],
  ["walk", "/images/exercises/walking.jpg"],
  ["leg", "/images/exercises/legpress.jpg"],
  ["lat", "/images/exercises/pullups.jpg"],
  ["chest", "/images/exercises/benchpress.jpg"],
  ["barbell", "/images/exercises/barbellrows.jpg"],
  ["dumbbell", "/images/exercises/incline-dumbbell-press.jpg"],
  ["cable", "/images/exercises/triceppushdown.jpg"],
];

const FALLBACK_IMAGES = [
  "/images/exercises/placeholder.jpg",
  "/images/exercises/pushup.jpg",
  "/images/exercises/squat.jpg",
  "/images/exercises/running.jpg",
  "/images/exercises/plank.jpg",
  "/images/exercises/yoga.jpg",
];

function pickImage(name = "", muscle_group = "") {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const exactMatch = IMAGE_BY_EXACT_NAME[normalizedName];
  if (exactMatch) return exactMatch;

  const lower = `${normalizedName} ${muscle_group.toLowerCase()}`;
  for (const [kw, url] of KEYWORD_IMAGES) {
    if (lower.includes(kw)) return url;
  }
  // deterministic fallback based on name hash
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  return FALLBACK_IMAGES[Math.abs(h) % FALLBACK_IMAGES.length];
}

/* ──────────────────────────────────────────────────────────────────
   Stat chip sub-component
   ────────────────────────────────────────────────────────────────── */
function StatChip({ icon: Icon, value, color = "text-slate-500 dark:text-slate-400" }) {
  if (!value) return null;
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${color}`}>
      <Icon className="h-3.5 w-3.5 shrink-0" />
      {value}
    </span>
  );
}

function formatSetsReps(sets, reps) {
  const setLabel = Number(sets) === 1 ? "set" : "sets";
  const repLabel = Number(reps) === 1 ? "rep" : "reps";
  return `${sets} ${setLabel} x ${reps} ${repLabel}`;
}

function formatCalories(calories) {
  if (calories === "" || calories === null || calories === undefined) return "";
  return typeof calories === "number" ? `${calories} kcal` : calories;
}

/* ──────────────────────────────────────────────────────────────────
   ExerciseCard
   ────────────────────────────────────────────────────────────────── */
export function ExerciseCard({ exercise, youtubeSearchQuery }) {
  const {
    name         = "",
    sets         = "",
    reps         = "",
    instructions = "",
    duration     = "",
    difficulty   = "Medium",
    calories     = "",
    muscle_group = "Full Body",
  } = exercise ?? {};

  const diffKey    = DIFFICULTY[difficulty] ? difficulty : "Intermediate";
  const diff       = DIFFICULTY[diffKey];
  const muscleStyle = MUSCLE[muscle_group] ?? MUSCLE["Full Body"];
  const imgUrl     = pickImage(name, muscle_group);
  const calorieLabel = formatCalories(calories);

  const ytUrl = youtubeSearchQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeSearchQuery + " " + name)}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise tutorial")}`;

  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >

      {/* ── Top section: text left + image square top-right corner ── */}
      <div className="flex items-start">

        {/* Left – all text content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-5 pr-3">

          {/* Muscle chip + difficulty badge row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${muscleStyle}`}>
              {muscle_group}
            </span>
            <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${diff.cls}`}>
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${diff.dot}`} />
              {diffKey}
            </span>
          </div>

          {/* Exercise name */}
          <h4 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
            {name}
          </h4>

          {/* Sets × Reps */}
          <p className="text-sm font-bold text-brand-600 dark:text-brand-400">
            {formatSetsReps(sets, reps)}
          </p>

          {/* Stat chips */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <StatChip icon={FiZap}   value={calorieLabel} color="text-amber-600 dark:text-amber-400" />
            <StatChip icon={FiClock} value={duration} color="text-sky-600 dark:text-sky-400" />
          </div>

          {/* AI Recommendation chip */}
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:ring-brand-700/40">
            ✦ AI Recommended
          </span>
        </div>

        {/* Right – small square image clipped to top-right corner */}
        <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-tr-2xl rounded-bl-2xl">
          <img
            src={imgUrl}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGES[0];
            }}
          />
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-bl from-black/10 via-transparent to-transparent" />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-5 h-px bg-slate-100 dark:bg-slate-800" />

      {/* ── Instructions ── */}
      {instructions && (
        <p className="line-clamp-2 px-5 pt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {instructions}
        </p>
      )}

      {/* ── Watch Tutorial CTA ── */}
      <div className="mt-auto p-5 pt-3">
        <motion.a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-brand-600 hover:to-brand-700 hover:shadow-md active:scale-95"
        >
          <FiPlay className="h-4 w-4" />
          Watch Tutorial
          <FiExternalLink className="h-3.5 w-3.5 opacity-70" />
        </motion.a>
      </div>
    </motion.article>
  );
}
