<template>
  <div class="relative w-full">
    <!-- Search Input Container with Liquid Glass Effect -->
    <div class="liquid-search-wrap">
      <!-- Advanced shadow element for depth -->
      <div class="liquid-search-shadow"></div>
      
      <!-- Main Search Container -->
      <div class="relative liquid-search-container">
        <div
          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg
            class="h-5 w-5 text-gray-900/80 drop-shadow-sm"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd" />
          </svg>
        </div>
        
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          class="liquid-glass-search-input w-full pl-11 pr-12 py-3.5 text-gray-900 text-base placeholder:text-gray-700/70 min-h-[48px] relative z-10"
          @input="onSearch"
          @focus="handleFocus"
          @blur="handleBlur" />

        <!-- Reflective overlay -->
        <div class="liquid-search-reflection"></div>

        <!-- Clear Button - Visible standalone button -->
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 z-20 
                 w-6 h-6 rounded-full 
                 bg-gray-900/10 hover:bg-gray-900/20 
                 backdrop-blur-sm
                 flex items-center justify-center
                 transition-all duration-200 hover:scale-110
                 group"
          aria-label="Clear search">
          <svg 
            class="h-3.5 w-3.5 text-gray-900/70 group-hover:text-gray-900" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <!-- Search Suggestions Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1">
      <div
        v-if="
          showSuggestions &&
          (filteredSuggestions.length > 0 || recentSearches.length > 0)
        "
        class="absolute z-50 w-full mt-2 overflow-hidden max-h-96 overflow-y-auto liquid-glass-dropdown">
        <!-- Recent Searches -->
        <div
          v-if="recentSearches.length > 0 && !searchQuery"
          class="p-3 border-b border-white/10">
          <div class="flex items-center justify-between mb-2 px-2">
            <h4
              class="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              Recent Searches
            </h4>
            <button
              @click="clearRecentSearches"
              class="text-xs px-2.5 py-1 rounded-lg
                     bg-red-500/10 hover:bg-red-500/20
                     text-red-600 hover:text-red-700
                     backdrop-blur-sm
                     transition-all duration-200
                     font-medium">
              Clear
            </button>
          </div>
          <button
            v-for="(search, index) in recentSearches"
            :key="'recent-' + index"
            @click="selectSuggestion(search)"
            class="liquid-suggestion-item">
            <svg
              class="h-4 w-4 text-gray-400 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm text-gray-700 group-hover:text-gray-900">{{
              search
            }}</span>
          </button>
        </div>

        <!-- Popular Searches -->
        <div
          v-if="!searchQuery && popularSearches.length > 0"
          class="p-3 border-b border-white/10">
          <h4
            class="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-2">
            Popular Searches
          </h4>
          <button
            v-for="(search, index) in popularSearches"
            :key="'popular-' + index"
            @click="selectSuggestion(search)"
            class="liquid-suggestion-item">
            <svg
              class="h-4 w-4 text-gray-400 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span class="text-sm text-gray-700 group-hover:text-gray-900">{{
              search
            }}</span>
          </button>
        </div>

        <!-- Search Suggestions -->
        <div v-if="filteredSuggestions.length > 0" class="p-3">
          <h4
            v-if="searchQuery"
            class="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2 px-2">
            Suggestions
          </h4>
          <button
            v-for="(suggestion, index) in filteredSuggestions"
            :key="'suggestion-' + index"
            @click="selectSuggestion(suggestion)"
            class="liquid-suggestion-item">
            <svg
              class="h-4 w-4 text-gray-400 group-hover:text-[#F5A3B7] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span class="text-sm text-gray-700 group-hover:text-gray-900">
              <span v-html="highlightMatch(suggestion)"></span>
            </span>
          </button>
        </div>

        <!-- No Results -->
        <div
          v-if="searchQuery && filteredSuggestions.length === 0"
          class="p-6 text-center">
          <svg
            class="h-12 w-12 text-gray-300 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="text-sm text-gray-500">No suggestions found</p>
          <p class="text-xs text-gray-400 mt-1">Try different keywords</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, computed, watch} from "vue";
import LiquidButton from "./LiquidButton.vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "Search products, brands, categories...",
  },
  suggestions: {
    type: Array,
    default: () => [
      "Cleansing Balm",
      "Oil Cleanser",
      "Foam Cleanser",
      "Toner",
      "Eye Cream",
      "Serum",
      "Moisturizer",
      "Sunscreen",
      "Exfoliator",
      "Face Mask",
      "Essence",
      "Ampoule",
    ],
  },
  popularSearches: {
    type: Array,
    default: () => [
      "Double Cleanse",
      "Hydrating Toner",
      "Vitamin C Serum",
      "SPF 50+",
    ],
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

const searchQuery = ref(props.modelValue);
const showSuggestions = ref(false);
const recentSearches = ref([]);

// Load recent searches from localStorage
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("recentSearches");
  if (saved) {
    try {
      recentSearches.value = JSON.parse(saved);
    } catch (e) {
      recentSearches.value = [];
    }
  }
}

// Watch for external changes
watch(
  () => props.modelValue,
  (newValue) => {
    searchQuery.value = newValue;
  }
);

const filteredSuggestions = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  return props.suggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(query))
    .slice(0, 8);
});

const onSearch = () => {
  emit("update:modelValue", searchQuery.value);
  emit("search", searchQuery.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  emit("update:modelValue", "");
  emit("search", "");
  showSuggestions.value = false;
};

const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion;
  emit("update:modelValue", suggestion);
  emit("search", suggestion);
  showSuggestions.value = false;

  // Add to recent searches
  if (!recentSearches.value.includes(suggestion)) {
    recentSearches.value.unshift(suggestion);
    if (recentSearches.value.length > 5) {
      recentSearches.value = recentSearches.value.slice(0, 5);
    }
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "recentSearches",
        JSON.stringify(recentSearches.value)
      );
    }
  }
};

const clearRecentSearches = () => {
  recentSearches.value = [];
  if (typeof window !== "undefined") {
    localStorage.removeItem("recentSearches");
  }
};

const handleFocus = () => {
  showSuggestions.value = true;
};

const handleBlur = () => {
  // Delay to allow click events on suggestions
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const highlightMatch = (text) => {
  if (!searchQuery.value) return text;

  const regex = new RegExp(`(${searchQuery.value})`, "gi");
  return text.replace(
    regex,
    '<span class="font-semibold text-[#F5A3B7]">$1</span>'
  );
};
</script>

<style scoped>
/* CSS Custom Properties for Animation */
@property --search-angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}

@property --search-angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

:root {
  --liquid-anim-time: 400ms;
  --liquid-anim-ease: cubic-bezier(0.25, 1, 0.5, 1);
  --liquid-border-width: clamp(1px, 0.0625em, 3px);
}

/* Advanced Liquid Search Container - Matching button structure */
.liquid-search-wrap {
  @apply relative w-full inline-block;
  border-radius: 9999px;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  perspective: 1000px;
}

/* Advanced Shadow Element - Matching button's shadow system */
.liquid-search-shadow {
  @apply absolute pointer-events-none;
  --shadow-offset: 1.5em;
  width: calc(100% + var(--shadow-offset));
  height: calc(100% + var(--shadow-offset));
  top: calc(0% - var(--shadow-offset) / 2);
  left: calc(0% - var(--shadow-offset) / 2);
  border-radius: inherit;
  filter: blur(clamp(2px, 0.125em, 8px));
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

.liquid-search-shadow::after {
  @apply absolute;
  content: "";
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05));
  width: calc(100% - var(--shadow-offset) - 0.25em);
  height: calc(100% - var(--shadow-offset) - 0.25em);
  top: calc(var(--shadow-offset) / 2 - 0.25em);
  left: calc(var(--shadow-offset) / 2 - 0.5em);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

/* Main Search Container - Matching button's border system */
.liquid-search-container {
  @apply relative;
  border-radius: inherit;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  will-change: transform;
}

/* Animated border - exactly like button */
.liquid-search-container::before {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  padding: var(--liquid-border-width);
  background: conic-gradient(
    from var(--search-angle-1) at 50% 50%,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0) 5% 40%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 60% 95%,
    rgba(0, 0, 0, 0.3)
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  z-index: 1;
}

/* Liquid Glass Search Input - Matching button's glass effect exactly */
.liquid-glass-search-input {
  @apply relative cursor-text select-none;
  @apply font-medium tracking-tight;
  @apply border-0 outline-none;
  border-radius: inherit;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  
  /* Advanced Glass Background - Same as button */
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  
  /* Complex Shadow System - Matching button exactly */
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(255, 255, 255, 0.3),
    0 3px 6px -2px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 0 0 rgba(255, 255, 255, 1);
  
  /* Advanced Backdrop Filter - Same as button */
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Reflective Overlay - Matching button text reflection */
.liquid-search-reflection {
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    var(--search-angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  background-size: 200% 200%;
  background-position: 0% 50%;
  transition: 
    background-position calc(var(--liquid-anim-time) * 1.25) var(--liquid-anim-ease),
    --search-angle-2 calc(var(--liquid-anim-time) * 1.25) var(--liquid-anim-ease);
  z-index: 15;
}

/* Hover Effects - Matching button hover exactly */
.liquid-search-wrap:hover .liquid-search-container {
  transform: scale(0.98);
}

.liquid-search-wrap:hover .liquid-glass-search-input {
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -1px 1px rgba(255, 255, 255, 0.4),
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    0 0 0 0 rgba(255, 255, 255, 1);
}

.liquid-search-wrap:hover .liquid-search-container::before {
  --search-angle-1: -125deg;
}

.liquid-search-wrap:hover .liquid-search-reflection {
  background-position: 25% 50%;
}

.liquid-search-wrap:hover .liquid-search-shadow {
  filter: blur(clamp(1px, 0.0625em, 4px));
}

/* Focus State - Enhanced version of button's active state */
.liquid-glass-search-input:focus {
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.08)
  );
  
  /* Active state shadows from button */
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.2),
    0 1px 3px -1px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    0 2px 0 0 rgba(255, 255, 255, 0.6),
    inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.liquid-glass-search-input:focus ~ .liquid-search-reflection {
  background-position: 50% 15%;
  --search-angle-2: -15deg;
}

.liquid-search-wrap:has(.liquid-glass-search-input:focus) .liquid-search-shadow {
  filter: blur(clamp(2px, 0.125em, 10px));
}

/* Enhanced Dropdown Styling with liquid glass */
.liquid-glass-dropdown {
  border-radius: 1rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98),
    rgba(255, 255, 255, 0.95)
  );
  backdrop-filter: blur(clamp(16px, 1em, 32px)) saturate(180%);
  -webkit-backdrop-filter: blur(clamp(16px, 1em, 32px)) saturate(180%);
  
  /* Matching shadow complexity with liquid glass theme */
  box-shadow: 
    0 10px 40px -8px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.9),
    inset 0 0 20px 0 rgba(255, 255, 255, 0.4),
    0 4px 8px -2px rgba(0, 0, 0, 0.08);
  
  border: 1px solid rgba(255, 255, 255, 0.7);
}

/* Advanced Liquid Glass Suggestion Item */
.liquid-suggestion-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.875rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  /* Base glass effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1)
  );
  backdrop-filter: blur(4px) saturate(120%);
  -webkit-backdrop-filter: blur(4px) saturate(120%);
  
  /* Subtle border and shadow */
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.04);
}

/* Reflective overlay - diagonal shine effect */
.liquid-suggestion-item::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 75%,
    rgba(255, 255, 255, 0.3) 100%
  );
  opacity: 0.3;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

/* Bubble highlight effect */
.liquid-suggestion-item::after {
  content: "";
  position: absolute;
  top: 0.25rem;
  left: 0.5rem;
  width: 3rem;
  height: 1.25rem;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.6),
    transparent 70%
  );
  opacity: 0.4;
  filter: blur(4px);
  pointer-events: none;
}

.liquid-suggestion-item:hover {
  /* Enhanced glass effect on hover */
  background: linear-gradient(
    135deg,
    rgba(245, 163, 183, 0.25),
    rgba(255, 255, 255, 0.35),
    rgba(245, 163, 183, 0.15)
  );
  backdrop-filter: blur(8px) saturate(150%);
  -webkit-backdrop-filter: blur(8px) saturate(150%);
  
  transform: translateX(3px) scale(1.01);
  
  /* Advanced layered shadows */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    inset 0 0 20px rgba(255, 255, 255, 0.2),
    0 4px 12px -2px rgba(245, 163, 183, 0.2),
    0 2px 6px -1px rgba(0, 0, 0, 0.08);
  
  border-color: rgba(245, 163, 183, 0.4);
}

.liquid-suggestion-item:hover::before {
  opacity: 0.6;
}

.liquid-suggestion-item:hover::after {
  opacity: 0.7;
  transform: scale(1.1);
}

.liquid-suggestion-item:active {
  transform: translateX(2px) scale(0.99);
  background: linear-gradient(
    135deg,
    rgba(245, 163, 183, 0.3),
    rgba(255, 255, 255, 0.25)
  );
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.08),
    inset 0 0 10px rgba(245, 163, 183, 0.15);
}

/* Custom scrollbar for suggestions dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(241, 245, 249, 0.5);
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    rgba(209, 213, 219, 0.9),
    rgba(156, 163, 175, 0.9)
  );
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    rgba(156, 163, 175, 1),
    rgba(107, 114, 128, 1)
  );
}

/* Touch Device Optimizations - Matching button */
@media (hover: none) and (pointer: coarse) {
  .liquid-search-container::before,
  .liquid-search-wrap:hover .liquid-search-container::before {
    --search-angle-1: -75deg;
  }
  
  .liquid-search-reflection,
  .liquid-glass-search-input:focus ~ .liquid-search-reflection {
    --search-angle-2: -45deg;
  }
}

/* Reduced Motion Support - Matching button */
@media (prefers-reduced-motion: reduce) {
  .liquid-search-wrap,
  .liquid-search-container,
  .liquid-glass-search-input,
  .liquid-search-shadow,
  .liquid-search-reflection,
  .liquid-search-container::before {
    transition: none;
    animation: none;
  }
  
  .liquid-search-reflection {
    background-position: 25% 50%;
  }
}
</style>
