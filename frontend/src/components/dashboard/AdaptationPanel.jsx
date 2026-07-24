import { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

const initialForm = {
  mood: "",
  injury: "",
  travel: "",
  time_available: ""
};

export function AdaptationPanel({ onAdapt, isSubmitting }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      mood: form.mood || null,
      injury: form.injury || null,
      travel: form.travel || null,
      time_available: form.time_available ? Number(form.time_available) : null
    };
    onAdapt(payload);
  };

  return (
    <form className="glass-card p-5" onSubmit={handleSubmit}>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Agentic Plan Update</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update only the context that changed. AROMI will adjust affected plan parts.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Mood" name="mood" value={form.mood} onChange={handleChange} placeholder="Low energy, stressed..." />
        <Field label="Injury" name="injury" value={form.injury} onChange={handleChange} placeholder="Sore knee, shoulder pain..." />
        <Field label="Travel" name="travel" value={form.travel} onChange={handleChange} placeholder="Hotel room, no gym..." />
        <Field label="Time Available" name="time_available" value={form.time_available} onChange={handleChange} placeholder="25" type="number" min="5" max="300" />
      </div>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className="btn-primary mt-5 inline-flex items-center gap-2"
      >
        <FiRefreshCw aria-hidden="true" />
        {isSubmitting ? "Updating Plans..." : "Adapt Plans"}
      </motion.button>
    </form>
  );
}

function Field({ label, name, ...props }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input
        id={name}
        name={name}
        className="field-input mt-1 w-full"
        {...props}
      />
    </label>
  );
}
