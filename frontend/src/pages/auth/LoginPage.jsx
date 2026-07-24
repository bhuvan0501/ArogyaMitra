import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/common/PageHeader.jsx";
import { TextInput } from "../../components/forms/TextInput.jsx";
import { useAuth } from "../../hooks/useAuth.js";

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
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
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Login" description="Access your ArogyaMitra account." />
      <form className="glass-card max-w-md space-y-4 p-5" onSubmit={handleSubmit}>
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
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          New to ArogyaMitra? <Link className="font-medium text-brand-700" to="/register">Create an account</Link>
        </p>
      </form>
    </>
  );
}
