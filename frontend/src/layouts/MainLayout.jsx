import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/common/Navbar.jsx";
import { Footer } from "../components/common/Footer.jsx";
import { MotionPage } from "../components/motion/MotionPage.jsx";

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="app-shell text-slate-950 dark:text-slate-100">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <MotionPage key={location.pathname}>
          <Outlet />
        </MotionPage>
      </main>
      <Footer />
    </div>
  );
}
