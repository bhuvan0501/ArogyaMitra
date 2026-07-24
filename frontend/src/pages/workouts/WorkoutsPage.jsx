import { useEffect, useState } from "react";
import { FiActivity, FiAlertCircle, FiZap } from "react-icons/fi";
import { LoadingGrid, EmptyState, SectionHeader } from "../../components/ui/index.js";
import { WorkoutPlanCard } from "../../components/workouts/WorkoutPlanCard.jsx";
import { fitnessService } from "../../services/fitnessService.js";
import { motion } from "framer-motion";

export function WorkoutsPage() {
  const [plans,        setPlans]        = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error,        setError]        = useState("");

  async function loadPlans() {
    try {
      const response = await fitnessService.getWorkoutPlans();
      setPlans(response.data);
    } catch {
      setError("Unable to load workout plans.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => { loadPlans(); }, []);

  const handleGenerate = async () => {
    setError("");
    setIsGenerating(true);
    try {
      const response = await fitnessService.generateWorkoutPlan();
      setPlans((current) => [response.data, ...current]);
    } catch (requestError) {
      setError(requestError.response?.data?.detail || "Unable to generate workout plan.");
    } finally {
      setIsGenerating(false);
    }
  };

  const latestPlan = plans[0];

  return (
    <div className="space-y-8">

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-emerald-400 p-7 shadow-lg sm:p-10">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20h40M20 0v40' stroke='white' stroke-width='1' fill='none'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <FiZap className="h-3.5 w-3.5" />
              Powered by AI
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">AI Workout Planner</h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
              Generate personalised 7-day workout plans tailored to your health profile.
              Each plan includes exercises with image guides, warm-ups, cool-downs, and YouTube tutorials.
            </p>
          </div>
          <motion.button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="flex shrink-0 items-center gap-2.5 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-brand-700 shadow-md transition-all duration-200 hover:bg-brand-50 hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiZap className={`h-4.5 w-4.5 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Generating plan…" : "Generate 7-Day Plan"}
          </motion.button>
        </div>
      </div>

      {/* ── Error banner ── */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Loading ── */}
      {isLoading && (
        <section>
          <SectionHeader title="Loading your plans…" icon={FiActivity} />
          <LoadingGrid count={4} hasImage cols="sm:grid-cols-2 xl:grid-cols-4" />
        </section>
      )}

      {/* ── Empty state ── */}
      {!isLoading && !latestPlan && (
        <EmptyState
          icon={FiActivity}
          title="No workout plans yet"
          description="Complete your health profile, then hit 'Generate 7-Day Plan' above to get your first AI-powered workout."
          action={
            <motion.button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 disabled:opacity-60"
            >
              <FiZap className="h-4 w-4" />
              Generate Now
            </motion.button>
          }
        />
      )}

      {/* ── Plan ── */}
      {latestPlan && <WorkoutPlanCard plan={latestPlan} />}

    </div>
  );
}
