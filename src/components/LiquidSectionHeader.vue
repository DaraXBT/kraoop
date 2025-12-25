<template>
  <div
    class="relative px-4 py-4 border-b overflow-hidden group"
    :class="customClass"
    :style="headerStyle">
    <!-- Subtle shine overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div class="flex items-center justify-between relative z-10">
      <!-- Title with Icon -->
      <h2 :class="titleClass">
        <!-- Icon Slot or SVG -->
        <slot name="icon">
          <svg
            v-if="icon"
            class="w-5 h-5"
            :class="iconClass"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              :d="icon" />
          </svg>
        </slot>
        {{ title }}
      </h2>

      <!-- Badge Slot or Default Badge -->
      <slot name="badge">
        <span
          v-if="badge !== null && badge !== undefined"
          class="relative px-4 py-1.5 text-xs font-bold rounded-full overflow-hidden shadow-sm transition-all duration-300 hover:scale-105"
          :style="badgeStyle">
          <!-- Glass shine effect -->
          <span
            class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></span>
          <span class="relative z-10 text-white font-bold">
            {{ badge }}
          </span>
        </span>
      </slot>

      <!-- Actions Slot (for buttons, etc) -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps} from "vue";

/**
 * LiquidSectionHeader - Reusable section header with liquid glass styling
 * 
 * Used for prominent section headers across pages like Payment, Account, etc.
 * Features liquid glass background with pink gradient, optional icon, badge, and actions
 */

const props = defineProps({
  // Header title text
  title: {
    type: String,
    required: true,
  },
  // SVG path data for icon (optional)
  icon: {
    type: String,
    default: "",
  },
  // Badge text/number (optional)
  badge: {
    type: [String, Number],
    default: null,
  },
  // Visual variant
  variant: {
    type: String,
    default: "primary",
    validator: (val) => ["primary", "secondary"].includes(val),
  },
  // Additional custom classes
  customClass: {
    type: String,
    default: "",
  },
  // Custom title classes
  titleClass: {
    type: String,
    default: "text-lg font-bold text-white flex items-center gap-2",
  },
  // Custom icon classes
  iconClass: {
    type: String,
    default: "text-white",
  },
});

// Compute header background style based on variant
const headerStyle = computed(() => {
  if (props.variant === "primary") {
    return "background: #f5a3b7; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(clamp(1px, 0.125em, 4px)); -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));";
  } else {
    return "background: linear-gradient(135deg, rgba(176, 166, 189, 0.8) 0%, rgba(176, 166, 189, 0.6) 100%); border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);";
  }
});

// Compute badge style
const badgeStyle = computed(() => {
  return "background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(255, 255, 255, 0.15);";
});
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
