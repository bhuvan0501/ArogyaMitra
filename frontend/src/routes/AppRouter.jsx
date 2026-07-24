import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout.jsx";
import { ProtectedRoute } from "../components/auth/ProtectedRoute.jsx";
import { HomePage } from "../pages/HomePage.jsx";
import { LoginPage } from "../pages/auth/LoginPage.jsx";
import { RegisterPage } from "../pages/auth/RegisterPage.jsx";
import { DashboardPage } from "../pages/dashboard/DashboardPage.jsx";
import { WorkoutsPage } from "../pages/workouts/WorkoutsPage.jsx";
import { NutritionPage } from "../pages/nutrition/NutritionPage.jsx";
import { AiCoachPage } from "../pages/ai/AiCoachPage.jsx";
import { VideosPage } from "../pages/videos/VideosPage.jsx";
import { ProfilePage } from "../pages/profile/ProfilePage.jsx";
import { NotFoundPage } from "../pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "workouts", element: <WorkoutsPage /> },
          { path: "nutrition", element: <NutritionPage /> },
          { path: "ai-coach", element: <AiCoachPage /> },
          { path: "videos", element: <VideosPage /> },
          { path: "profile", element: <ProfilePage /> }
        ]
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
