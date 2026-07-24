import {
  FiActivity,
  FiBarChart2,
  FiDroplet,
  FiFlag,
  FiInfo,
  FiTarget,
  FiUser,
  FiVideo,
  FiZap,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { ProgressChart }        from "../../components/charts/ProgressChart.jsx";
import { WeeklyProgressChart }  from "../../components/charts/WeeklyProgressChart.jsx";
import { DashboardSkeleton }    from "../../components/common/Skeleton.jsx";
import { AdaptationExplanation } from "../../components/dashboard/AdaptationExplanation.jsx";
import { AdaptationPanel }      from "../../components/dashboard/AdaptationPanel.jsx";
import { HealthBriefCard }      from "../../components/dashboard/HealthBriefCard.jsx";
import { ProgressUpdateForm }   from "../../components/dashboard/ProgressUpdateForm.jsx";
import { QuickNavCard }         from "../../components/dashboard/QuickNavCard.jsx";
import { WelcomeCard }          from "../../components/dashboard/WelcomeCard.jsx";
import {
  MetricCard,
  ProgressRing,
  SectionHeader,
  StatBadge,
} from "../../components/ui/index.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useAuth }  from "../../hooks/useAuth.js";
import { fitnessService } from "../../services/fitnessService.js";

/* ── Quick-nav link definitions ────────────────────────────────── */
const QUICK_LINKS = [
  { to: "/profile",   title: "Health Profile",  description: "Update body metrics, goals, preferences, and medical context.", icon: FiUser },
  { to: "/workouts",  title: "Workouts",         description: "Open your workout planning area and training preferences.",      icon: FiActivity },
  { to: "/nutrition", title: "Nutrition",        description: "Review meal planning and dietary preference placeholders.",      icon: FiTarget },
  { to: "/videos",    title: "Fitness Videos",   description: "Browse the future video discovery space for guided sessions.",   icon: FiVideo },
];

/* ── ErrorBanner – inline helper, not worth a separate file ─────── */
function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400">
      {message}
    </div>
  );
}

/* ── DashboardPage ──────────────────────────────────────────────── */
export function DashboardPage() {
  const { user }      = useAuth();
  const { showToast } = useToast();
  const firstName     = user?.full_name?.split(" ")[0] || "there";

  const [adaptation,       setAdaptation]       = useState(null);
  const [adaptError,       setAdaptError]       = useState("");
  const [isAdapting,       setIsAdapting]       = useState(false);
  const [dashboard,        setDashboard]        = useState(null);
  const [progressError,    setProgressError]    = useState("");
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  /* ── Data fetching ── */
  async function loadDashboard() {
    try {
      const response = await fitnessService.getDashboard();
      setDashboard(response.data);
    } catch {
      setProgressError("Unable to load progress dashboard.");
      showToast("Unable to load progress dashboard.", "error");
    }
  }

  useEffect(() => { loadDashboard(); }, []);

  /* ── Handlers ── */
  const handleAdapt = async (payload) => {
    setAdaptError("");
    setIsAdapting(true);
    try {
      const response = await fitnessService.adaptPlans(payload);
      setAdaptation(response.data.explanation);
      showToast("Plans adapted successfully.", "success");
    } catch (err) {
      const msg = err.response?.data?.detail || "Unable to adapt plans.";
      setAdaptError(msg);
      showToast(msg, "error");
    } finally {
      setIsAdapting(false);
    }
  };

  const handleProgressSubmit = async (payload) => {
    setProgressError("");
    setIsSavingProgress(true);
    try {
      await fitnessService.updateProgress(payload);
      await loadDashboard();
      showToast("Daily progress saved.", "success");
    } catch (err) {
      const msg = err.response?.data?.detail || "Unable to save progress.";
      setProgressError(msg);
      showToast(msg, "error");
    } finally {
      setIsSavingProgress(false);
    }
  };

  /* ── Derived values ── */
  const latest           = dashboard?.latest_entry;
  const hydrationPercent = Math.min(Math.round(((latest?.water_intake || 0) / 3) * 100), 100);
  const workoutPercent   = latest?.workout_completed ? 100 : 40;
  const caloriesBurned   = latest?.calories_burned  || 0;
  const caloriesGoal     = dashboard?.calories_goal || 2000;
  const caloriePercent   = Math.min(Math.round((caloriesBurned / caloriesGoal) * 100), 100);

  /* ── Metric card data – single source of truth ── */
  const metrics = [
    {
      title:    "Today's Workout",
      value:    latest?.workout_completed ? "Completed ✓" : "Pending",
      icon:     FiZap,
      gradient: "from-amber-400 to-amber-600",
      subtitle: latest?.workout_completed ? "Great job!" : "Get moving today",
    },
    {
      title:    "Calories Goal",
      value:    `${caloriesBurned} / ${caloriesGoal}`,
      icon:     FiTarget,
      gradient: "from-rose-400 to-rose-600",
      subtitle: "kcal burned",
      progress: caloriePercent,
    },
    {
      title:    "Water Intake",
      value:    `${latest?.water_intake || 0} L`,
      icon:     FiDroplet,
      gradient: "from-sky-400 to-sky-600",
      subtitle: "Daily goal: 3 L",
      progress: hydrationPercent,
    },
    {
      title:    "BMI",
      value:    dashboard?.bmi ? dashboard.bmi.toFixed(1) : "—",
      icon:     FiActivity,
      gradient: "from-emerald-400 to-emerald-600",
      subtitle: "Body Mass Index",
    },
    {
      title:    "Workout Streak",
      value:    `${dashboard?.workout_streak || 0} days`,
      icon:     FiFlag,
      gradient: "from-purple-400 to-purple-600",
      subtitle: "Keep it going!",
    },
    {
      title:    "AI Health Tip",
      value:    dashboard?.health_tip || "Stay active and hydrate!",
      icon:     FiInfo,
      gradient: "from-slate-500 to-slate-700",
    },
  ];

  return (
    <div className="space-y-8">

      {/* ── Welcome ── */}
      <WelcomeCard name={firstName} />

      {/* ── Progress update form ── */}
      <section>
        <ProgressUpdateForm onSubmit={handleProgressSubmit} isSubmitting={isSavingProgress} />
        <ErrorBanner message={progressError} />
      </section>

      {/* ── Adaptation panel ── */}
      <section>
        <AdaptationPanel onAdapt={handleAdapt} isSubmitting={isAdapting} />
        <ErrorBanner message={adaptError} />
        <AdaptationExplanation explanation={adaptation} />
      </section>

      {/* ── Metric cards ── */}
      <section>
        <SectionHeader
          title="Today's Overview"
          subtitle="Your key health and fitness metrics at a glance"
          icon={FiBarChart2}
        />
        {!dashboard
          ? <DashboardSkeleton />
          : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metrics.map((m) => <MetricCard key={m.title} {...m} />)}
            </div>
          )
        }
      </section>

      {/* ── Today at a Glance ── */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <HealthBriefCard />

        <section className="glass-card p-5">
          <SectionHeader
            title="Today at a Glance"
            subtitle="Live activity summary"
            icon={FiActivity}
          />

          {/* Ring row */}
          <div className="flex flex-wrap items-center justify-around gap-6 py-2">
            {/* Hydration ring */}
            <div className="flex flex-col items-center gap-2">
              <ProgressRing
                percent={hydrationPercent}
                size={72}
                stroke={6}
                color="stroke-sky-500"
              >
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                  {hydrationPercent}%
                </span>
              </ProgressRing>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hydration</span>
                <StatBadge
                  icon={FiDroplet}
                  value={`${latest?.water_intake || 0} L`}
                  variant="sky"
                />
              </div>
            </div>

            {/* Workout ring */}
            <div className="flex flex-col items-center gap-2">
              <ProgressRing
                percent={workoutPercent}
                size={72}
                stroke={6}
                color="stroke-brand-500"
              >
                <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                  {workoutPercent}%
                </span>
              </ProgressRing>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Workout</span>
                <StatBadge
                  icon={FiActivity}
                  value={latest?.workout_completed ? "Done" : "Pending"}
                  variant={latest?.workout_completed ? "green" : "amber"}
                />
              </div>
            </div>

            {/* Calories ring */}
            <div className="flex flex-col items-center gap-2">
              <ProgressRing
                percent={caloriePercent}
                size={72}
                stroke={6}
                color="stroke-rose-500"
              >
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  {caloriePercent}%
                </span>
              </ProgressRing>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Calories</span>
                <StatBadge
                  icon={FiZap}
                  value={`${caloriesBurned} kcal`}
                  variant="rose"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          {latest?.notes && (
            <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
              {latest.notes}
            </p>
          )}
        </section>
      </div>

      {/* ── Charts ── */}
      <section>
        <SectionHeader
          title="Progress Charts"
          subtitle="Track your weekly activity and weight trend"
          icon={FiBarChart2}
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <WeeklyProgressChart data={dashboard?.weekly_progress || []} />
          <ProgressChart data={dashboard?.weight_trend || []} title="Weight Trend" />
        </div>
      </section>

      {/* ── Quick Navigation ── */}
      <section>
        <SectionHeader
          title="Quick Navigation"
          subtitle="Jump to any section of the app"
          icon={FiTarget}
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <QuickNavCard key={link.to} {...link} />
          ))}
        </div>
      </section>

    </div>
  );
}
