/**
 * LoadingCard – animated skeleton placeholder card.
 *
 * Props:
 *   rows    {number} number of skeleton text rows (default 3)
 *   hasImage {boolean} show an image skeleton at top (default false)
 */
function SkeletonLine({ className = "", style }) {
  return (
    <motion.div
      className={`rounded-lg bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 ${className}`}
      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: "200% 100%", ...style }}
    />
  );
}

export function LoadingCard({ rows = 3, hasImage = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {hasImage && (
        <SkeletonLine className="h-36 w-full rounded-none rounded-t-2xl" />
      )}
      <div className="flex flex-col gap-3 p-4">
        <SkeletonLine className="h-3 w-24" />
        <SkeletonLine className="h-5 w-3/4" />
        {Array.from({ length: rows }).map((_, i) => (
          <SkeletonLine
            key={i}
            className="h-3"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
        <SkeletonLine className="mt-2 h-8 w-full rounded-xl" />
      </div>
    </motion.div>
  );
}

/**
 * LoadingGrid – a responsive grid of LoadingCards.
 *
 * Props:
 *   count    {number} cards to show (default 4)
 *   hasImage {boolean}
 *   cols     {string} Tailwind grid-cols class (default "sm:grid-cols-2 xl:grid-cols-3")
 */
export function LoadingGrid({ count = 4, hasImage = true, cols = "sm:grid-cols-2 xl:grid-cols-3" }) {
  return (
    <div className={`grid gap-4 ${cols}`}>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} hasImage={hasImage} />
      ))}
    </div>
  );
}
import { motion } from "framer-motion";
