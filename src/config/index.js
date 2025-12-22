/**
 * Application Configuration
 * Centralized configuration using environment variables
 */

export const config = {
  // API Configuration
  api: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  },

  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || "Kraoop Beauty",
    url: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  },

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
    errorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === "true",
  },

  // Payment Configuration
  payment: {
    stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || "",
  },

  // Storage Keys
  storage: {
    cartKey: "kraoop_cart",
    wishlistKey: "kraoop_wishlist",
    authTokenKey: "kraoop_auth_token",
    userKey: "kraoop_user",
    recentSearchesKey: "kraoop_recent_searches",
  },
};

/**
 * Validate required environment variables
 */
export function validateConfig() {
  const warnings = [];

  if (!config.api.baseURL) {
    warnings.push("VITE_API_BASE_URL is not set");
  }

  if (warnings.length > 0) {
    console.warn("Configuration warnings:", warnings);
  }

  return warnings.length === 0;
}

// Validate on module load
validateConfig();
