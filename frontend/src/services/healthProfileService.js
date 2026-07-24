import { apiClient } from "./apiClient.js";

export const healthProfileService = {
  getMine: () => apiClient.get("/health-profile/me"),
  createMine: (payload) => apiClient.post("/health-profile/me", payload),
  updateMine: (payload) => apiClient.put("/health-profile/me", payload),
  deleteMine: () => apiClient.delete("/health-profile/me")
};
