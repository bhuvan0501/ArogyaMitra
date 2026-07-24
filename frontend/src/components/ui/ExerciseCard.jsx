import { FiClock, FiPlay, FiZap } from "react-icons/fi";

/* ── Difficulty badge styles ─────────────────────────────────── */
const DIFFICULTY = {
  Easy:   "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Medium: "bg-amber-100   text-amber-700   dark:bg-amber-900/40   dark:text-amber-300",
  Hard:   "bg-red-100     text-red-700     dark:bg-red-900/40     dark:text-red-300",
};

/* ── Muscle-group chip colours ───────────────────────────────── */
const MUSCLE = {
  Chest:       "bg-rose-50     text-rose-700   dark:bg-rose-900/30   dark:text-rose-300",
  Back:        "bg-indigo-50   text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Shoulders:   "bg-sky-50      text-sky-700    dark:bg-sky-900/30    dark:text-sky-300",
  Biceps:      "bg-violet-50   text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Triceps:     "bg-purple-50   text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Legs:        "bg-orange-50   text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Core:        "bg-yellow-50   text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Cardio:      "bg-pink-50     text-pink-700   dark:bg-pink-900/30   dark:text-pink-300",
  "Full Body": "bg-teal-50     text-teal-700   dark:bg-teal-900/30   dark:text-teal-300",
};

const IMAGES = [
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=220&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=220&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=400&h=220&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=220&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=400&h=220&fit=crop&q=80",
];

function pickImg(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  return IMAGES[Math.abs(h) % IMAGES.length];
}

/**
 * ExerciseCard – compact exercise tile with image, difficulty badge,
 * muscle chip, stats, and a YouTube tutorial CTA.
 *
 * Props:
 *   exercise            {object}  { name, sets, reps, instructions, duration, difficulty, calories, muscle_group }
 *   youtubeSearchQuery  {string}  optional base query for YouTube link
 */
export function ExerciseCard({ exercise, youtubeSearchQuery }) {
  const {
    name        = "",
    sets        = "",
    reps        = "",
    instructions = "",
    duration    = "",
    difficulty  = "Medium",
    calories    = "",
    muscle_group = "Full Body",
  } = exercise ?? {};

  const diffKey    = DIFFICULTY[difficulty]  ? difficulty  : "Medium";
  const muscleStyle = MUSCLE[muscle_group] ?? MUSCLE["Full Body"];
  const imgUrl     = pickImg(name);

  const ytUrl = youtubeSearchQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(youtubeSearchQuery + " " + name)}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(name + " exercise tutorial")}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image banner */}
      <div className="relative h-36 overflow-hidden bg-gradient-to-br from-brand-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
        <img
          src={imgUrl}
          alt={`${name} exercise`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <span className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold shadow-sm ${DIFFICULTY[diffKey]}`}>
          {diffKey}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Title + muscle chip */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold leading-snug text-slate-900 dark:text-white">{name}</h4>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${muscleStyle}`}>
            {muscle_group}
          </span>
        </div>

        {/* Sets × Reps */}
        <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
          {sets} sets &times; {reps} reps
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          {calories && (
            <span className="flex items-center gap-1">
              <FiZap className="h-3.5 w-3.5 text-amber-500" />
              {calories}
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1">
              <FiClock className="h-3.5 w-3.5 text-sky-500" />
              {duration}
            </span>
          )}
        </div>

        {/* Instructions */}
        {instructions && (
          <p className="line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {instructions}
          </p>
        )}

        {/* CTA */}
        <a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-brand-600 hover:to-brand-700 hover:shadow-md active:scale-95"
        >
          <FiPlay className="h-4 w-4" />
          Watch Tutorial
        </a>
      </div>
    </article>
  );
}
