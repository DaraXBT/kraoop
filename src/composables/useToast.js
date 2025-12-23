import {ref} from "vue";

const toasts = ref([]);
let toastIdCounter = 0;
const MAX_TOASTS = 3; // Limit toasts on screen
const duplicateCheckWindow = 500; // ms to prevent duplicate toasts

export function useToast() {
  const showToast = (message, type = "success", duration = 3000) => {
    // Fast duplicate check - only check recent toasts
    const now = Date.now();
    const existingToast = toasts.value.find(
      (t) =>
        t.message === message &&
        t.type === type &&
        now - t.timestamp < duplicateCheckWindow
    );
    if (existingToast) {
      return existingToast.id;
    }

    const id = toastIdCounter++;
    const toast = {
      id,
      message,
      type,
      duration,
      show: true,
      timestamp: now,
    };

    toasts.value.push(toast);

    // Limit the number of visible toasts (FIFO)
    if (toasts.value.length > MAX_TOASTS) {
      toasts.value.shift();
    }

    // Auto remove after duration (optimized)
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration + 200); // Add buffer for animation
    }

    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clearAll = () => {
    toasts.value = [];
  };

  const success = (message, duration = 3000) =>
    showToast(message, "success", duration);
  const error = (message, duration = 4000) =>
    showToast(message, "error", duration);
  const warning = (message, duration = 3500) =>
    showToast(message, "warning", duration);
  const info = (message, duration = 3000) =>
    showToast(message, "info", duration);

  return {
    toasts,
    showToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
  };
}
