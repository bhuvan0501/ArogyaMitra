import { apiClient } from "./apiClient.js";

export const externalService = {
  searchVideos: (params) => apiClient.get("/external/videos", { params }),
  searchRecipes: (params) => apiClient.get("/external/recipes", { params })
};
