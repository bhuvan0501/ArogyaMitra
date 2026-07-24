import { NavLink } from "react-router-dom";
import { FiActivity, FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../hooks/useAuth.js";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/workouts", label: "Workouts" },
  { to: "/nutrition", label: "Nutrition" },
  { to: "/ai-coach", label: "AI Coach" }
];

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/72 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/72">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 font-semibold text-brand-700 dark:text-brand-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700 shadow-sm dark:bg-brand-900/50 dark:text-brand-100">
            <FiActivity aria-hidden="true" />
          </span>
          <span>ArogyaMitra</span>
        </NavLink>
        <div className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-100"
                    : "text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button type="button" onClick={toggleTheme} className="btn-secondary inline-flex items-center gap-2 px-3" aria-label="Toggle dark mode">
            {isDark ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
          </button>
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
                {user?.full_name || "Profile"}
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="btn-secondary inline-flex items-center gap-2 px-3"
              >
                <FiLogOut aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-700">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
