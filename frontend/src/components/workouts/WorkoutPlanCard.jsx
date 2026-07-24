import { useState } from "react";
import { FiCalendar, FiActivity, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { WorkoutDayCard } from "./WorkoutDayCard.jsx";

const DAY_ABBR = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export function WorkoutPlanCard({ plan }) {
  const [activeDay, setActiveDay] = useState(0);
  const days = plan.plan.days;
  const currentDay = days[activeDay];

  return (
    <motion.section
      className="space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      {/* Plan Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-transparent to-clinic-aqua/10 dark:from-brand-500/5 dark:to-clinic-aqua/5" />
        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              <FiActivity className="h-4 w-4" />
              AI Generated Workout Plan
            </div>
            <h2 className="mt-1.5 text-2xl font-bold text-slate-900 dark:text-white">{plan.title}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Created {new Date(plan.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          {/* Plan Stats */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center rounded-xl bg-brand-50 px-5 py-3 dark:bg-brand-900/20">
              <FiCalendar className="h-5 w-5 text-brand-500" />
              <span className="mt-1 text-xl font-bold text-brand-700 dark:text-brand-300">{days.length}</span>
              <span className="text-xs text-brand-600 dark:text-brand-400">Days</span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-amber-50 px-5 py-3 dark:bg-amber-900/20">
              <FiZap className="h-5 w-5 text-amber-500" />
              <span className="mt-1 text-xl font-bold text-amber-700 dark:text-amber-300">
                {days.reduce((t, d) => t + d.exercises.length, 0)}
              </span>
              <span className="text-xs text-amber-600 dark:text-amber-400">Exercises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {days.map((day, index) => (
          <motion.button
            key={day.day}
            type="button"
            onClick={() => setActiveDay(index)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className={`flex shrink-0 flex-col items-center rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
              activeDay === index
                ? "bg-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                : "bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-brand-900/20 dark:hover:text-brand-400 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <span className="text-[10px] uppercase tracking-widest opacity-70">{DAY_ABBR[index]}</span>
            <span className="text-base font-bold leading-none">{day.day}</span>
            <span className="mt-0.5 max-w-[70px] truncate text-center leading-tight opacity-80">
              {day.focus.split(" ").slice(0, 2).join(" ")}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active Day Card */}
      {currentDay && (
        <WorkoutDayCard key={currentDay.day} day={currentDay} isActive />
      )}
    </motion.section>
  );
}
