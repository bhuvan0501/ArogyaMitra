import { useState } from "react";
import { FiBell, FiClock, FiInfo, FiMoon, FiSun } from "react-icons/fi";
import { ExerciseCard } from "./ExerciseCard.jsx";
import { AnimatePresence, motion } from "framer-motion";

const FOCUS_GRADIENTS = [
  "from-brand-500 to-emerald-400",
  "from-sky-500 to-brand-400",
  "from-violet-500 to-indigo-400",
  "from-orange-500 to-amber-400",
  "from-rose-500 to-pink-400",
  "from-teal-500 to-cyan-400",
  "from-purple-500 to-violet-400",
];

const DAY_INDEX_BY_NAME = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function getDayNumber(day) {
  if (typeof day === "number") return day;
  return DAY_INDEX_BY_NAME[day] || 1;
}

export function WorkoutDayCard({ day, isActive }) {
  const [showTip, setShowTip] = useState(false);
  const dayNumber = getDayNumber(day.day);
  const gradient = FOCUS_GRADIENTS[(dayNumber - 1) % FOCUS_GRADIENTS.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={`overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
        isActive ? "ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-950" : ""
      }`}
    >
      {/* ── Day header gradient banner ── */}
      <div className={`bg-gradient-to-r ${gradient} px-6 py-5`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Day {day.day}
            </p>
            <h3 className="mt-0.5 text-2xl font-extrabold text-white">{day.focus}</h3>
            {day.total_calories !== null && day.total_calories !== undefined ? (
              <p className="mt-1 text-sm font-semibold text-white/80">{day.total_calories} kcal estimated</p>
            ) : null}
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-2 backdrop-blur-sm">
            <FiClock className="h-4 w-4 text-white" />
            <span className="text-sm font-semibold text-white">{day.rest_time}</span>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">

        {/* ── Warm-up & Cool-down ── */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 dark:bg-amber-900/20">
            <FiSun className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Warm-up</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-600 dark:text-amber-300">{day.warm_up}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 p-4 dark:bg-indigo-900/20">
            <FiMoon className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">Cool-down</p>
              <p className="mt-1 text-sm leading-relaxed text-indigo-600 dark:text-indigo-300">{day.cool_down}</p>
            </div>
          </div>
        </div>

        {/* ── Exercises ── */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Exercises
            </h4>
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-400">
              {day.exercises.length}
            </span>
          </div>
          {/* 3-column on xl, 2 on md, 1 on mobile – cards breathe */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {day.exercises.map((exercise) => (
              <ExerciseCard
                key={`${day.day}-${exercise.name}`}
                exercise={exercise}
                youtubeSearchQuery={day.youtube_search_query}
              />
            ))}
          </div>
        </div>

        {/* ── Daily Tip (collapsible) ── */}
        <div>
          <motion.button
            type="button"
            onClick={() => setShowTip((v) => !v)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="flex w-full items-center justify-between rounded-2xl bg-brand-50 px-5 py-3.5 text-sm font-semibold text-brand-700 transition hover:bg-brand-100 dark:bg-brand-900/20 dark:text-brand-400 dark:hover:bg-brand-900/30"
          >
            <span className="flex items-center gap-2">
              <FiBell className="h-4 w-4" />
              Daily Tip
            </span>
            <FiInfo
              className={`h-4 w-4 transition-transform duration-200 ${showTip ? "rotate-180" : ""}`}
            />
          </motion.button>
          <AnimatePresence>
            {showTip && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4 text-sm leading-relaxed text-brand-800 dark:border-brand-900/40 dark:bg-brand-900/10 dark:text-brand-300"
            >
              {day.daily_tip}
            </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.article>
  );
}
