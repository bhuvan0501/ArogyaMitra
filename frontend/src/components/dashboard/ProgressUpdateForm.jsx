import { useState } from "react";
import { motion } from "framer-motion";

const initialForm = {
  weight: "",
  water_intake: "",
  workout_completed: false,
  notes: ""
};

export function ProgressUpdateForm({ onSubmit, isSubmitting }) {
  const [form, setForm] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      weight: form.weight ? Number(form.weight) : null,
      water_intake: form.water_intake ? Number(form.water_intake) : null,
      workout_completed: form.workout_completed,
      notes: form.notes || null
    });
  };

  return (
    <form className="glass-card p-5" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Daily Progress</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Field label="Weight (kg)" name="weight" type="number" min="1" max="500" step="0.1" value={form.weight} onChange={handleChange} />
        <Field label="Water Intake (L)" name="water_intake" type="number" min="0" max="20" step="0.1" value={form.water_intake} onChange={handleChange} />
        <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white/50 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
          <input name="workout_completed" type="checkbox" checked={form.workout_completed} onChange={handleChange} className="h-4 w-4 rounded border-slate-300" />
          Mark workout complete
        </label>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="btn-primary"
        >
          {isSubmitting ? "Saving..." : "Save Progress"}
        </motion.button>
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Daily notes"
        maxLength={1000}
        className="field-input mt-4 min-h-24 w-full"
      />
    </form>
  );
}

function Field({ label, name, ...props }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
      <input id={name} name={name} className="field-input mt-1 w-full" {...props} />
    </label>
  );
}
