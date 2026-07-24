import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiHeart,
  FiMessageCircle,
  FiShield,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    title: "Adaptive workouts",
    description: "Plans adjust around time, goals, equipment, travel, and recovery signals.",
    icon: FiActivity,
  },
  {
    title: "AI nutrition planning",
    description: "Structured 7-day meal plans with calories, macros, and simple recipe discovery.",
    icon: FiTarget,
  },
  {
    title: "Progress intelligence",
    description: "Track hydration, weight trends, workout streaks, and daily health signals.",
    icon: FiBarChart2,
  },
  {
    title: "AROMI coach",
    description: "Ask for motivation, safer substitutions, and plan changes in plain language.",
    icon: FiMessageCircle,
  },
];

const stats = [
  { value: "7-day", label: "AI plan cycles" },
  { value: "24/7", label: "coach access" },
  { value: "30 sec", label: "daily check-ins" },
  { value: "100%", label: "profile driven" },
];

const testimonials = [
  {
    quote: "ArogyaMitra feels less like a tracker and more like a calm coach that remembers my real constraints.",
    name: "Priya S.",
    role: "Remote product designer",
  },
  {
    quote: "The workout changes are practical. When I travel, it keeps the plan realistic instead of making me start over.",
    name: "Arjun M.",
    role: "Founder",
  },
  {
    quote: "I like that meals and workouts live together. The dashboard makes consistency feel visible.",
    name: "Meera K.",
    role: "Graduate student",
  },
];

const faqs = [
  {
    question: "Does ArogyaMitra replace a trainer or doctor?",
    answer: "No. It helps with planning, tracking, and coaching support, but medical concerns should go to a qualified professional.",
  },
  {
    question: "Can it adapt my plan after generation?",
    answer: "Yes. You can share changes like low energy, travel, injury context, or less available time, and the plan can be adjusted.",
  },
  {
    question: "Do I need gym equipment?",
    answer: "No. Your profile includes workout preference, so plans can be tailored for home, gym, yoga, running, sports, or mixed routines.",
  },
  {
    question: "What powers the AI features?",
    answer: "The backend sends structured prompts to Groq and stores the returned workout, nutrition, progress, and chat data in the app.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export function HomePage() {
  return (
    <div className="-mx-4 -mt-8 overflow-hidden sm:-mx-6 lg:-mx-8">
      <section className="relative min-h-[calc(100vh-5.5rem)] overflow-hidden px-4 pb-14 pt-12 sm:px-6 lg:px-8">
        <div className="landing-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 dark:opacity-20" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="pt-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/60 dark:text-brand-300">
              <FiCpu className="h-4 w-4" />
              AI fitness operating system
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[1.02] text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              ArogyaMitra
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
              Personalized workouts, nutrition, progress tracking, and an adaptive AI coach in one quiet, modern health workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700">
                  Start Training
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/75 px-6 py-3 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900">
                  Explore Features
                </a>
              </motion.div>
            </div>
          </motion.div>

          <AiIllustration />
        </div>
      </section>

      <main className="bg-white px-4 py-16 dark:bg-slate-950 sm:px-6 lg:px-8">
        <SectionIntro
          eyebrow="Features"
          title="Everything your plan needs, already connected"
          description="ArogyaMitra combines coaching, training, food planning, and measurable progress into a daily loop."
        />

        <section id="features" className="mx-auto mt-10 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.article>
          ))}
        </section>

        <section className="mx-auto mt-16 grid max-w-7xl gap-5 rounded-3xl bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/10 sm:grid-cols-2 lg:grid-cols-4 dark:bg-slate-900">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
            </div>
          ))}
        </section>

        <SectionIntro
          eyebrow="Stories"
          title="Built for real schedules"
          description="Plans are useful only when they can bend. These workflows keep training practical."
        />

        <section className="mx-auto mt-10 grid max-w-7xl gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.article
              key={item.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">"{item.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-sky-400 text-sm font-black text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950 dark:text-white">{item.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </section>

        <SectionIntro
          eyebrow="FAQ"
          title="Questions before your first plan"
          description="A quick look at how the app is meant to fit into your health routine."
        />

        <section className="mx-auto mt-10 grid max-w-4xl gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <summary className="cursor-pointer list-none text-base font-bold text-slate-950 dark:text-white">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{faq.answer}</p>
            </details>
          ))}
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-10 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-600 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 font-bold text-slate-950 dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <FiActivity />
            </span>
            ArogyaMitra
          </div>
          <p>AI-powered fitness planning for everyday consistency.</p>
        </div>
      </footer>
    </div>
  );
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mx-auto max-w-3xl text-center"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
}

function AiIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-[2rem] border border-white/30 bg-white/70 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70"
      >
        <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-300">AROMI Coach</p>
              <h3 className="mt-1 text-2xl font-black">Adaptive plan ready</h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
              <FiCpu className="h-7 w-7" />
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Insight icon={FiZap} label="Workout" value="Chest + Triceps" />
            <Insight icon={FiHeart} label="Recovery" value="Moderate intensity" />
            <Insight icon={FiShield} label="Safety" value="No high-impact swaps" />
          </div>

          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Weekly momentum</span>
              <span>82%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -right-5 -top-5 hidden h-24 w-24 rounded-full border border-brand-300/50 border-t-transparent sm:block"
      />
    </motion.div>
  );
}

function Insight({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-300">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
      <FiCheckCircle className="ml-auto h-5 w-5 text-brand-300" />
    </div>
  );
}
