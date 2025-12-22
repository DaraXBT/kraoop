/**
 * Local Storage Utility
 * Safely interact with localStorage
 */

/**
 * Get item from localStorage
 */
export function getItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Set item in localStorage
 */
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Remove item from localStorage
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 */
export function clear() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
}

/**
 * Check if localStorage is available
 */
export function isAvailable() {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all keys from localStorage
 */
export function getAllKeys() {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error("Error getting localStorage keys:", error);
    return [];
  }
}

/**
 * Get storage size in bytes
 */
export function getSize() {
  try {
    let size = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  } catch (error) {
    console.error("Error calculating localStorage size:", error);
    return 0;
  }
}

export default {
  getItem,
  setItem,
  removeItem,
  clear,
  isAvailable,
  getAllKeys,
  getSize,
};
