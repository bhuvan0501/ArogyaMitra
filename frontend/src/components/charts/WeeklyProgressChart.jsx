import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function WeeklyProgressChart({ data = [] }) {
  return (
    <div className="glass-card h-72 p-4">
      <h2 className="mb-3 text-base font-semibold text-slate-950 dark:text-white">Weekly Progress</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="water_intake" name="Water (L)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="workout_completed" name="Workout Complete" fill="#22a06b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
