import { useEffect, useState } from "react";
import { FiZap } from "react-icons/fi";
import { EmptyState } from "../../components/common/EmptyState.jsx";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { NutritionPlanCard } from "../../components/nutrition/NutritionPlanCard.jsx";
import { fitnessService } from "../../services/fitnessService.js";
import { motion } from "framer-motion";

export function NutritionPage() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fitnessService.getNutritionPlans();
        setPlans(response.data);
      } catch {
        setError("Unable to load nutrition plans.");
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, []);

  const handleGenerate = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const response = await fitnessService.generateNutritionPlan();
      setPlans((prev) => [response.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to generate nutrition plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const latestPlan = plans[0];

  return (
    <div className="space-y-6">

      {/* ── Hero banner ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-400 to-rose-400 p-6 shadow-lg sm:p-8">
        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70">
              Powered by AI
            </p>
            <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
              AI Nutrition Planner
            </h1>
            <p className="mt-1.5 max-w-md text-sm text-white/80">
              Personalized 7-day meal plans with balanced macros, calorie targets, and
              Spoonacular recipe links — built from your health profile.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="flex shrink-0 items-center gap-2 self-start rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-600 shadow-md transition-all duration-200 hover:bg-orange-50 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:self-center"
          >
            <FiZap className={`h-4 w-4 ${isGenerating ? "animate-pulse" : ""}`} />
            {isGenerating ? "Generating..." : "Generate Meal Plan"}
          </motion.button>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* ── Loading ── */}
      {isLoading && <LoadingSpinner label="Loading nutrition plans" />}

      {/* ── Empty state ── */}
      {!isLoading && !latestPlan && (
        <EmptyState
          title="No nutrition plans yet"
          description="Create your health profile, then generate your first personalized meal plan."
        />
      )}

      {/* ── Plan ── */}
      {latestPlan && <NutritionPlanCard plan={latestPlan} />}
    </div>
  );
}
