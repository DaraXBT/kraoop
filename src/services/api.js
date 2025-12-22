/**
 * API Service Layer
 * Handles all HTTP requests to the backend API
 */

import {config} from "../config";

/**
 * Custom API Error class
 */
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Base API client with fetch
 */
class APIClient {
  constructor(baseURL, timeout = 10000) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  /**
   * Get authorization token from storage
   */
  getAuthToken() {
    return localStorage.getItem(config.storage.authTokenKey);
  }

  /**
   * Build request headers
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with timeout
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: this.getHeaders(options.headers),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      const data = await response.json().catch(() => null);

      // Handle errors
      if (!response.ok) {
        throw new APIError(
          data?.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data
        );
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new APIError("Request timeout", 408, null);
      }

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(error.message || "Network error occurred", 0, null);
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, {method: "GET"});
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, {method: "DELETE"});
  }
}

// Create API client instance
const apiClient = new APIClient(config.api.baseURL, config.api.timeout);

/**
 * Products API
 */
export const productsAPI = {
  /**
   * Get all products with optional filters
   */
  async getAll(filters = {}) {
    return apiClient.get("/products", filters);
  },

  /**
   * Get product by ID
   */
  async getById(id) {
    return apiClient.get(`/products/${id}`);
  },

  /**
   * Search products
   */
  async search(query, filters = {}) {
    return apiClient.get("/products/search", {q: query, ...filters});
  },

  /**
   * Get featured products
   */
  async getFeatured() {
    return apiClient.get("/products/featured");
  },

  /**
   * Get best selling products
   */
  async getBestSelling() {
    return apiClient.get("/products/best-selling");
  },

  /**
   * Get product reviews
   */
  async getReviews(productId) {
    return apiClient.get(`/products/${productId}/reviews`);
  },

  /**
   * Add product review
   */
  async addReview(productId, reviewData) {
    return apiClient.post(`/products/${productId}/reviews`, reviewData);
  },
};

/**
 * Cart API
 */
export const cartAPI = {
  /**
   * Get user's cart
   */
  async get() {
    return apiClient.get("/cart");
  },

  /**
   * Add item to cart
   */
  async addItem(productId, quantity = 1) {
    return apiClient.post("/cart/items", {productId, quantity});
  },

  /**
   * Update cart item quantity
   */
  async updateItem(itemId, quantity) {
    return apiClient.patch(`/cart/items/${itemId}`, {quantity});
  },

  /**
   * Remove item from cart
   */
  async removeItem(itemId) {
    return apiClient.delete(`/cart/items/${itemId}`);
  },

  /**
   * Clear cart
   */
  async clear() {
    return apiClient.delete("/cart");
  },

  /**
   * Apply coupon
   */
  async applyCoupon(code) {
    return apiClient.post("/cart/coupon", {code});
  },
};

/**
 * Orders API
 */
export const ordersAPI = {
  /**
   * Create new order
   */
  async create(orderData) {
    return apiClient.post("/orders", orderData);
  },

  /**
   * Get order by ID
   */
  async getById(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  },

  /**
   * Get user's orders
   */
  async getAll(filters = {}) {
    return apiClient.get("/orders", filters);
  },

  /**
   * Cancel order
   */
  async cancel(orderId) {
    return apiClient.post(`/orders/${orderId}/cancel`);
  },

  /**
   * Track order
   */
  async track(orderId) {
    return apiClient.get(`/orders/${orderId}/tracking`);
  },
};

/**
 * Auth API
 */
export const authAPI = {
  /**
   * Login user
   */
  async login(email, password) {
    return apiClient.post("/auth/login", {email, password});
  },

  /**
   * Register new user
   */
  async register(userData) {
    return apiClient.post("/auth/register", userData);
  },

  /**
   * Logout user
   */
  async logout() {
    return apiClient.post("/auth/logout");
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    return apiClient.get("/auth/me");
  },

  /**
   * Update user profile
   */
  async updateProfile(userData) {
    return apiClient.patch("/auth/profile", userData);
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    return apiClient.post("/auth/password-reset", {email});
  },

  /**
   * Reset password
   */
  async resetPassword(token, newPassword) {
    return apiClient.post("/auth/password-reset/confirm", {
      token,
      password: newPassword,
    });
  },
};

/**
 * Wishlist API
 */
export const wishlistAPI = {
  /**
   * Get user's wishlist
   */
  async get() {
    return apiClient.get("/wishlist");
  },

  /**
   * Add item to wishlist
   */
  async addItem(productId) {
    return apiClient.post("/wishlist/items", {productId});
  },

  /**
   * Remove item from wishlist
   */
  async removeItem(productId) {
    return apiClient.delete(`/wishlist/items/${productId}`);
  },

  /**
   * Clear wishlist
   */
  async clear() {
    return apiClient.delete("/wishlist");
  },
};

/**
 * Categories API
 */
export const categoriesAPI = {
  /**
   * Get all categories
   */
  async getAll() {
    return apiClient.get("/categories");
  },

  /**
   * Get category by slug
   */
  async getBySlug(slug) {
    return apiClient.get(`/categories/${slug}`);
  },
};

/**
 * Export API client for custom requests
 */
export {apiClient, APIError};

/**
 * Export default API object
 */
export default {
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  auth: authAPI,
  wishlist: wishlistAPI,
  categories: categoriesAPI,
};
