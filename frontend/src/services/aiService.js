import { apiClient } from "./apiClient.js";

export const aiService = {
  getCoachHistory: () => apiClient.get("/ai/coach/history"),
  createCoachResponse: (payload) => apiClient.post("/ai/coach", payload),
  clearCoachHistory: () => apiClient.delete("/ai/coach/history")
};
