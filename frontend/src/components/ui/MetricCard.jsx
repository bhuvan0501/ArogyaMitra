/**
 * MetricCard – gradient dashboard metric card.
 *
 * Props:
 *   title    {string}
 *   value    {string|ReactNode}
 *   icon     {ReactComponent}
 *   gradient {string}  Tailwind bg-gradient classes  e.g. "from-amber-400 to-amber-600"
 *   progress {number}  optional 0-100 – shows a linear progress bar
 *   subtitle {string}  optional small label below value
 */
export function MetricCard({ title, value, icon: Icon, gradient, progress, subtitle }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-5 text-white shadow-md`}
    >
      {/* Watermark icon */}
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
        {subtitle && (
          <p className="mt-0.5 text-xs opacity-70">{subtitle}</p>
        )}
      </div>

      {/* Optional progress bar */}
      {typeof progress === "number" && (
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs opacity-80">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/30">
            <motion.div
              className="h-1.5 rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
import { motion } from "framer-motion";
