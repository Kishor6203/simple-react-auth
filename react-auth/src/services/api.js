// src/services/api.js

/**
 * Frontend-only application.
 *
 * There is currently no backend API.
 * This file is intentionally kept as an extension point
 * for future Java/Spring Boot integration.
 */

const api = {
    async get() {
      throw new Error("API is not configured. This application is frontend-only.");
    },
  
    async post() {
      throw new Error("API is not configured. This application is frontend-only.");
    },
  
    async put() {
      throw new Error("API is not configured. This application is frontend-only.");
    },
  
    async delete() {
      throw new Error("API is not configured. This application is frontend-only.");
    },
  };
  
  export default api;