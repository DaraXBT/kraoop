<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        variant === 'liquid-glass' ? 'liquid-glass-select' : 'standard-select',
        'w-full appearance-none pr-10',
        customClass
      ]">
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
    
    <!-- Dropdown Icon -->
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

/**
 * SelectDropdown - Reusable select dropdown with liquid glass styling
 * 
 * A styled select component that can be used with either liquid glass
 * or standard styling, includes an icon indicator
 */

const props = defineProps({
  // Current selected value
  modelValue: {
    type: [String, Number],
    default: "",
  },
  // Array of options {value, label}
  options: {
    type: Array,
    required: true,
    validator: (options) =>
      options.every(
        (opt) =>
          typeof opt === "object" &&
          opt.hasOwnProperty("value") &&
          opt.hasOwnProperty("label")
      ),
  },
  // Placeholder text when no value selected
  placeholder: {
    type: String,
    default: "",
  },
  // Visual variant
  variant: {
    type: String,
    default: "liquid-glass",
    validator: (val) => ["liquid-glass", "standard"].includes(val),
  },
  // Additional custom classes
  customClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
.standard-select {
  @apply px-4 py-2 border border-gray-300 rounded-lg 
         focus:outline-none focus:ring-2 focus:ring-primary-400
         bg-white text-gray-900;
}
</style>
