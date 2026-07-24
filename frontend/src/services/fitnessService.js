import { apiClient } from "./apiClient.js";

export const fitnessService = {
  getDashboard: () => apiClient.get("/fitness/dashboard"),
  updateProgress: (payload) => apiClient.post("/fitness/progress", payload),
  getWorkouts: () => apiClient.get("/fitness/workouts"),
  getWorkoutPlans: () => apiClient.get("/fitness/workout-plans"),
  generateWorkoutPlan: () => apiClient.post("/fitness/workout-plans/generate"),
  getNutrition: () => apiClient.get("/fitness/nutrition"),
  getNutritionPlans: () => apiClient.get("/fitness/nutrition-plans"),
  generateNutritionPlan: () => apiClient.post("/fitness/nutrition-plans/generate"),
  adaptPlans: (payload) => apiClient.post("/fitness/plans/adapt", payload)
};
