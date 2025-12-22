/**
 * Authentication Composable
 * Handles user authentication state and operations
 */

import {ref, computed} from "vue";
import {authAPI} from "../services/api";
import {config} from "../config";

// Global auth state
const user = ref(null);
const token = ref(null);
const isLoading = ref(false);
const error = ref(null);

/**
 * Initialize auth state from storage
 */
function initializeAuth() {
  const storedToken = localStorage.getItem(config.storage.authTokenKey);
  const storedUser = localStorage.getItem(config.storage.userKey);

  if (storedToken) {
    token.value = storedToken;
  }

  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse stored user:", e);
      localStorage.removeItem(config.storage.userKey);
    }
  }
}

// Initialize on module load
initializeAuth();

/**
 * useAuth Composable
 */
export function useAuth() {
  const isAuthenticated = computed(() => !!token.value && !!user.value);

  /**
   * Login user
   */
  async function login(email, password) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authAPI.login(email, password);

      // Store token and user
      token.value = response.token;
      user.value = response.user;

      localStorage.setItem(config.storage.authTokenKey, response.token);
      localStorage.setItem(
        config.storage.userKey,
        JSON.stringify(response.user)
      );

      return {success: true, user: response.user};
    } catch (err) {
      error.value = err.message || "Login failed";
      return {success: false, error: error.value};
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Register new user
   */
  async function register(userData) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authAPI.register(userData);

      // Store token and user
      token.value = response.token;
      user.value = response.user;

      localStorage.setItem(config.storage.authTokenKey, response.token);
      localStorage.setItem(
        config.storage.userKey,
        JSON.stringify(response.user)
      );

      return {success: true, user: response.user};
    } catch (err) {
      error.value = err.message || "Registration failed";
      return {success: false, error: error.value};
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Logout user
   */
  async function logout() {
    isLoading.value = true;

    try {
      await authAPI.logout();
    } catch (err) {
      console.error("Logout API call failed:", err);
    }

    // Clear state and storage
    token.value = null;
    user.value = null;
    error.value = null;

    localStorage.removeItem(config.storage.authTokenKey);
    localStorage.removeItem(config.storage.userKey);

    isLoading.value = false;
  }

  /**
   * Get current user from API
   */
  async function fetchCurrentUser() {
    if (!token.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await authAPI.getCurrentUser();
      user.value = response.user || response;
      localStorage.setItem(config.storage.userKey, JSON.stringify(user.value));
    } catch (err) {
      error.value = err.message;
      // If token is invalid, logout
      if (err.status === 401) {
        await logout();
      }
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Update user profile
   */
  async function updateProfile(userData) {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await authAPI.updateProfile(userData);
      user.value = response.user || response;
      localStorage.setItem(config.storage.userKey, JSON.stringify(user.value));
      return {success: true, user: user.value};
    } catch (err) {
      error.value = err.message || "Profile update failed";
      return {success: false, error: error.value};
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Request password reset
   */
  async function requestPasswordReset(email) {
    isLoading.value = true;
    error.value = null;

    try {
      await authAPI.requestPasswordReset(email);
      return {success: true};
    } catch (err) {
      error.value = err.message || "Password reset request failed";
      return {success: false, error: error.value};
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Reset password with token
   */
  async function resetPassword(resetToken, newPassword) {
    isLoading.value = true;
    error.value = null;

    try {
      await authAPI.resetPassword(resetToken, newPassword);
      return {success: true};
    } catch (err) {
      error.value = err.message || "Password reset failed";
      return {success: false, error: error.value};
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Check if user has specific role
   */
  function hasRole(role) {
    return user.value?.role === role;
  }

  /**
   * Check if user has specific permission
   */
  function hasPermission(permission) {
    return user.value?.permissions?.includes(permission);
  }

  return {
    // State
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),

    // Methods
    login,
    register,
    logout,
    fetchCurrentUser,
    updateProfile,
    requestPasswordReset,
    resetPassword,
    hasRole,
    hasPermission,
  };
}
