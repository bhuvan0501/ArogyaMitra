import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { TextInput } from "../../components/forms/TextInput.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.detail || requestError.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Create account" description="Start using ArogyaMitra securely." />
      <form className="glass-card max-w-md space-y-4 p-5" onSubmit={handleSubmit}>
        <TextInput id="full_name" name="full_name" label="Name" type="text" value={form.full_name} onChange={handleChange} />
        <TextInput id="email" name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
        <TextInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={8}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already registered? <Link className="font-medium text-brand-700" to="/login">Sign in</Link>
        </p>
      </form>
    </>
  );
}
