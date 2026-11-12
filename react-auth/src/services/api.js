// src/services/api.js

/**
 *
 * There is currently no backend API.
 * This file is intentionally kept as an extension point
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
