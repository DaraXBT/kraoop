/**
 * Form Validation Composable
 * Provides validation utilities for forms
 */

import {ref, computed, watch} from "vue";

/**
 * Validation rules
 */
export const validationRules = {
  required: (value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    return value !== null && value !== undefined;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  minLength: (min) => (value) => {
    return value && value.length >= min;
  },

  maxLength: (max) => (value) => {
    return value && value.length <= max;
  },

  min: (minValue) => (value) => {
    return Number(value) >= minValue;
  },

  max: (maxValue) => (value) => {
    return Number(value) <= maxValue;
  },

  pattern: (regex) => (value) => {
    return regex.test(value);
  },

  phone: (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(value) && value.replace(/\D/g, "").length >= 10;
  },

  url: (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  match: (otherValue) => (value) => {
    return value === otherValue;
  },

  number: (value) => {
    return !isNaN(Number(value));
  },

  integer: (value) => {
    return Number.isInteger(Number(value));
  },

  alphanumeric: (value) => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },

  alpha: (value) => {
    return /^[a-zA-Z]+$/.test(value);
  },

  creditCard: (value) => {
    // Basic Luhn algorithm check
    const sanitized = value.replace(/\s/g, "");
    if (!/^\d+$/.test(sanitized)) return false;

    let sum = 0;
    let double = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized[i]);

      if (double) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      double = !double;
    }

    return sum % 10 === 0;
  },

  zipCode: (value) => {
    return /^\d{5}(-\d{4})?$/.test(value);
  },
};

/**
 * Error messages
 */
export const errorMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`,
  min: (min) => `Value must be at least ${min}`,
  max: (max) => `Value must be at most ${max}`,
  phone: "Please enter a valid phone number",
  url: "Please enter a valid URL",
  match: "Values do not match",
  number: "Please enter a valid number",
  integer: "Please enter a whole number",
  alphanumeric: "Only letters and numbers are allowed",
  alpha: "Only letters are allowed",
  creditCard: "Please enter a valid credit card number",
  zipCode: "Please enter a valid ZIP code",
};

/**
 * useValidation Composable
 */
export function useValidation(initialFields = {}) {
  const fields = ref({...initialFields});
  const errors = ref({});
  const touched = ref({});
  const rules = ref({});

  /**
   * Set validation rules for fields
   */
  function setRules(fieldRules) {
    rules.value = fieldRules;
  }

  /**
   * Validate a single field
   */
  function validateField(fieldName) {
    const fieldRules = rules.value[fieldName];
    if (!fieldRules) return true;

    const value = fields.value[fieldName];
    const fieldErrors = [];

    for (const rule of fieldRules) {
      let isValid = false;
      let errorMessage = "";

      if (typeof rule === "function") {
        isValid = rule(value);
        errorMessage = "Invalid value";
      } else if (typeof rule === "object") {
        isValid = rule.validator(value);
        errorMessage = rule.message;
      }

      if (!isValid) {
        fieldErrors.push(errorMessage);
      }
    }

    if (fieldErrors.length > 0) {
      errors.value[fieldName] = fieldErrors[0];
      return false;
    } else {
      delete errors.value[fieldName];
      return true;
    }
  }

  /**
   * Validate all fields
   */
  function validate() {
    let isValid = true;

    for (const fieldName in rules.value) {
      const fieldValid = validateField(fieldName);
      if (!fieldValid) isValid = false;
    }

    return isValid;
  }

  /**
   * Mark field as touched
   */
  function touch(fieldName) {
    touched.value[fieldName] = true;
  }

  /**
   * Reset field value and error
   */
  function resetField(fieldName) {
    if (initialFields[fieldName] !== undefined) {
      fields.value[fieldName] = initialFields[fieldName];
    } else {
      delete fields.value[fieldName];
    }
    delete errors.value[fieldName];
    delete touched.value[fieldName];
  }

  /**
   * Reset all fields
   */
  function reset() {
    fields.value = {...initialFields};
    errors.value = {};
    touched.value = {};
  }

  /**
   * Set field value
   */
  function setFieldValue(fieldName, value) {
    fields.value[fieldName] = value;
  }

  /**
   * Get field error
   */
  function getError(fieldName) {
    return touched.value[fieldName] ? errors.value[fieldName] : null;
  }

  /**
   * Check if field has error
   */
  function hasError(fieldName) {
    return touched.value[fieldName] && !!errors.value[fieldName];
  }

  /**
   * Check if form is valid
   */
  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });

  /**
   * Check if form has been touched
   */
  const isTouched = computed(() => {
    return Object.keys(touched.value).length > 0;
  });

  /**
   * Get all errors
   */
  const allErrors = computed(() => {
    const result = {};
    for (const field in errors.value) {
      if (touched.value[field]) {
        result[field] = errors.value[field];
      }
    }
    return result;
  });

  return {
    fields,
    errors: allErrors,
    touched,
    isValid,
    isTouched,
    setRules,
    validateField,
    validate,
    touch,
    resetField,
    reset,
    setFieldValue,
    getError,
    hasError,
  };
}

/**
 * useField Composable for individual field
 */
export function useField(fieldName, rules = [], initialValue = "") {
  const value = ref(initialValue);
  const error = ref(null);
  const touched = ref(false);

  /**
   * Validate field
   */
  function validate() {
    for (const rule of rules) {
      let isValid = false;
      let errorMessage = "";

      if (typeof rule === "function") {
        isValid = rule(value.value);
        errorMessage = "Invalid value";
      } else if (typeof rule === "object") {
        isValid = rule.validator(value.value);
        errorMessage = rule.message;
      }

      if (!isValid) {
        error.value = errorMessage;
        return false;
      }
    }

    error.value = null;
    return true;
  }

  /**
   * Handle blur event
   */
  function onBlur() {
    touched.value = true;
    validate();
  }

  /**
   * Handle input event
   */
  function onInput(newValue) {
    value.value = newValue;
    if (touched.value) {
      validate();
    }
  }

  /**
   * Reset field
   */
  function reset() {
    value.value = initialValue;
    error.value = null;
    touched.value = false;
  }

  const hasError = computed(() => touched.value && !!error.value);
  const isValid = computed(() => !error.value);

  return {
    value,
    error,
    touched,
    hasError,
    isValid,
    validate,
    onBlur,
    onInput,
    reset,
  };
}
