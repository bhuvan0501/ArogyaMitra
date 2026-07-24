import { useEffect, useState } from "react";
import { EmptyState } from "../../components/common/EmptyState.jsx";
import { LoadingSpinner } from "../../components/common/LoadingSpinner.jsx";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { SelectInput } from "../../components/forms/SelectInput.jsx";
import { TextAreaInput } from "../../components/forms/TextAreaInput.jsx";
import { TextInput } from "../../components/forms/TextInput.jsx";
import { healthProfileService } from "../../services/healthProfileService.js";

const emptyProfile = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  goal: "",
  activity_level: "",
  workout_preference: "",
  time_available: "",
  dietary_preference: "",
  allergies: "",
  medical_conditions: ""
};

const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];
const goalOptions = ["Weight loss", "Muscle gain", "Endurance", "Flexibility", "General fitness"];
const activityOptions = ["Sedentary", "Lightly active", "Moderately active", "Very active", "Athlete"];
const workoutOptions = ["Gym", "Home", "Yoga", "Running", "Sports", "Mixed"];
const dietaryOptions = ["Vegetarian", "Vegan", "Eggetarian", "Non-vegetarian", "Pescatarian", "No preference"];

export function ProfilePage() {
  const [form, setForm] = useState(emptyProfile);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await healthProfileService.getMine();
        setForm({
          ...emptyProfile,
          ...response.data,
          allergies: response.data.allergies || "",
          medical_conditions: response.data.medical_conditions || ""
        });
        setHasProfile(true);
      } catch (requestError) {
        if (requestError.response?.status !== 404) {
          setError("Unable to load your health profile.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const buildPayload = () => ({
    ...form,
    age: Number(form.age),
    height: Number(form.height),
    weight: Number(form.weight),
    time_available: Number(form.time_available),
    allergies: form.allergies || null,
    medical_conditions: form.medical_conditions || null
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const request = hasProfile ? healthProfileService.updateMine : healthProfileService.createMine;
      const response = await request(buildPayload());
      setForm({
        ...emptyProfile,
        ...response.data,
        allergies: response.data.allergies || "",
        medical_conditions: response.data.medical_conditions || ""
      });
      setHasProfile(true);
      setMessage(hasProfile ? "Health profile updated." : "Health profile created.");
    } catch (requestError) {
      const detail = requestError.response?.data?.detail;
      setError(Array.isArray(detail) ? "Please check all required fields." : detail || "Unable to save health profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner label="Loading health profile" />;
  }

  return (
    <>
      <PageHeader title="Health Profile" description="Manage your fitness, nutrition, and medical context." />
      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">{error}</div> : null}
      {message ? <div className="mb-4 rounded-md border border-green-200 bg-green-50/90 px-4 py-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200">{message}</div> : null}
      {!hasProfile ? (
        <div className="mb-6">
          <EmptyState title="No health profile yet" description="Create one to personalize future fitness and nutrition features." />
        </div>
      ) : null}
      <form className="glass-card grid gap-5 p-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <TextInput id="name" name="name" label="Name" value={form.name} onChange={handleChange} required minLength={2} />
        <TextInput id="age" name="age" label="Age" type="number" value={form.age} onChange={handleChange} required min={13} max={120} />
        <SelectInput id="gender" name="gender" label="Gender" value={form.gender} onChange={handleChange} options={genderOptions} required />
        <TextInput id="height" name="height" label="Height (cm)" type="number" value={form.height} onChange={handleChange} required min={1} max={300} step="0.1" />
        <TextInput id="weight" name="weight" label="Weight (kg)" type="number" value={form.weight} onChange={handleChange} required min={1} max={500} step="0.1" />
        <SelectInput id="goal" name="goal" label="Goal" value={form.goal} onChange={handleChange} options={goalOptions} required />
        <SelectInput id="activity_level" name="activity_level" label="Activity Level" value={form.activity_level} onChange={handleChange} options={activityOptions} required />
        <SelectInput id="workout_preference" name="workout_preference" label="Workout Preference" value={form.workout_preference} onChange={handleChange} options={workoutOptions} required />
        <TextInput id="time_available" name="time_available" label="Time Available (minutes/day)" type="number" value={form.time_available} onChange={handleChange} required min={5} max={300} />
        <SelectInput id="dietary_preference" name="dietary_preference" label="Dietary Preference" value={form.dietary_preference} onChange={handleChange} options={dietaryOptions} required />
        <div className="md:col-span-2">
          <TextAreaInput id="allergies" name="allergies" label="Allergies" value={form.allergies} onChange={handleChange} maxLength={1000} />
        </div>
        <div className="md:col-span-2">
          <TextAreaInput id="medical_conditions" name="medical_conditions" label="Medical Conditions" value={form.medical_conditions} onChange={handleChange} maxLength={1000} />
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </form>
    </>
  );
}
