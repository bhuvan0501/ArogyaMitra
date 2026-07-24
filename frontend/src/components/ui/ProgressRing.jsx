/**
 * ProgressRing – SVG circular progress indicator.
 *
 * Props:
 *   percent  {number}  0-100
 *   size     {number}  px diameter (default 56)
 *   stroke   {number}  stroke width (default 5)
 *   color    {string}  Tailwind stroke class (default "stroke-brand-500")
 *   children {ReactNode} centre content
 */
export function ProgressRing({
  percent = 0,
  size = 56,
  stroke = 5,
  color = "stroke-brand-500",
  children,
}) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, Math.max(0, percent)) / 100) * circ;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          className="stroke-slate-100 dark:stroke-slate-800"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className={`${color} transition-all duration-700 ease-out`}
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      </svg>
      {children && (
        <span className="absolute inset-0 flex items-center justify-center">
          {children}
        </span>
      )}
    </div>
  );
}
import { motion } from "framer-motion";
