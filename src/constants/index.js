/**
 * Application Constants
 * Centralized constant values used throughout the app
 */

// App Information
export const APP_NAME = "Kraoop Beauty";
export const APP_DESCRIPTION = "Premium Korean Skincare E-commerce";
export const APP_VERSION = "1.0.0";

// API Endpoints
export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  CATEGORIES: "/categories",
  CART: "/cart",
  ORDERS: "/orders",
  AUTH: "/auth",
  WISHLIST: "/wishlist",
  REVIEWS: "/reviews",
  USER: "/user",
};

// Product Categories
export const CATEGORIES = [
  "Sunscreen",
  "Cleansing Balm",
  "Serum",
  "Toner",
  "Oil Cleanser",
  "Essence",
  "Moisturizer",
  "Exfoliator",
  "Foam Cleanser",
  "Eye Care",
  "Face Mask",
];

// Skin Types
export const SKIN_TYPES = [
  "All Skin",
  "Dry",
  "Oily",
  "Combination",
  "Sensitive",
  "Normal",
  "Acne-Prone",
  "Mature",
  "Dull",
];

// Brands
export const BRANDS = [
  "COSRX",
  "Banila Co",
  "Klairs",
  "Hada Labo",
  "DHC",
  "Some By Mi",
  "Innisfree",
  "The Ordinary",
  "Mediheal",
  "Dr. Jart+",
];

// Sort Options
export const SORT_OPTIONS = [
  {label: "Featured", value: "featured"},
  {label: "Price: Low to High", value: "price_asc"},
  {label: "Price: High to Low", value: "price_desc"},
  {label: "Rating: High to Low", value: "rating_desc"},
  {label: "Name: A to Z", value: "name_asc"},
  {label: "Name: Z to A", value: "name_desc"},
  {label: "Newest First", value: "newest"},
  {label: "Best Selling", value: "best_selling"},
];

// Price Ranges
export const PRICE_RANGES = [
  {label: "Under $25", min: 0, max: 25},
  {label: "$25 - $50", min: 25, max: 50},
  {label: "$50 - $75", min: 50, max: 75},
  {label: "$75 - $100", min: 75, max: 100},
  {label: "Over $100", min: 100, max: Infinity},
];

// Rating Options
export const RATING_OPTIONS = [
  {label: "4 Stars & Up", value: 4},
  {label: "3 Stars & Up", value: 3},
  {label: "2 Stars & Up", value: 2},
  {label: "1 Star & Up", value: 1},
];

// Order Status
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
};

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.SHIPPED]: "Shipped",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
  [ORDER_STATUS.REFUNDED]: "Refunded",
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  PAYPAL: "paypal",
  STRIPE: "stripe",
  BITCOIN: "bitcoin",
  CASH_ON_DELIVERY: "cod",
};

// Shipping Methods
export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    cost: 9.99,
    freeThreshold: 50,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    cost: 19.99,
    freeThreshold: 100,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    cost: 29.99,
    freeThreshold: null,
  },
];

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Local Storage Keys (duplicated from config for easy access)
export const STORAGE_KEYS = {
  CART: "kraoop_cart",
  WISHLIST: "kraoop_wishlist",
  AUTH_TOKEN: "kraoop_auth_token",
  USER: "kraoop_user",
  RECENT_SEARCHES: "kraoop_recent_searches",
  THEME: "kraoop_theme",
  LANGUAGE: "kraoop_language",
};

// Pagination
export const ITEMS_PER_PAGE = 12;
export const MAX_PAGE_BUTTONS = 5;

// Images
export const PLACEHOLDER_IMAGE = "/placeholder-product.jpg";
export const DEFAULT_AVATAR = "/default-avatar.jpg";

// Limits
export const MAX_CART_ITEMS = 99;
export const MAX_WISHLIST_ITEMS = 100;
export const MAX_QUANTITY_PER_ITEM = 10;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_REVIEW_LENGTH = 1000;
export const MAX_RECENT_SEARCHES = 10;

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
};

// Social Media Links
export const SOCIAL_LINKS = {
  FACEBOOK: "https://facebook.com/kraoop",
  INSTAGRAM: "https://instagram.com/kraoop",
  TWITTER: "https://twitter.com/kraoop",
  YOUTUBE: "https://youtube.com/kraoop",
  TIKTOK: "https://tiktok.com/@kraoop",
};

// Contact Information
export const CONTACT_INFO = {
  EMAIL: "support@kraoop.com",
  PHONE: "(555) 123-4567",
  ADDRESS: "123 Beauty Street, Seoul, South Korea",
  HOURS: "Mon-Fri: 9AM-6PM KST",
};

// Feature Flags (for gradual rollout)
export const FEATURES = {
  WISHLIST: true,
  REVIEWS: true,
  COMPARISON: false,
  LIVE_CHAT: false,
  NEWSLETTER: true,
  SOCIAL_LOGIN: false,
  GUEST_CHECKOUT: true,
  PRODUCT_RECOMMENDATIONS: true,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  AUTH_REQUIRED: "Please login to continue.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
  PRODUCT_OUT_OF_STOCK: "This product is currently out of stock.",
  CART_LIMIT_REACHED: `You can only add up to ${MAX_CART_ITEMS} items to your cart.`,
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: "Product added to cart!",
  ADDED_TO_WISHLIST: "Product added to wishlist!",
  REMOVED_FROM_CART: "Product removed from cart.",
  REMOVED_FROM_WISHLIST: "Product removed from wishlist.",
  ORDER_PLACED: "Order placed successfully!",
  PROFILE_UPDATED: "Profile updated successfully.",
  REVIEW_SUBMITTED: "Thank you for your review!",
};

// Timeouts (in milliseconds)
export const TIMEOUTS = {
  TOAST: 3000,
  API_REQUEST: 10000,
  DEBOUNCE: 300,
  THROTTLE: 300,
  AUTO_LOGOUT: 3600000, // 1 hour
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

export default {
  APP_NAME,
  APP_DESCRIPTION,
  APP_VERSION,
  CATEGORIES,
  SKIN_TYPES,
  BRANDS,
  SORT_OPTIONS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  STORAGE_KEYS,
  FEATURES,
};
