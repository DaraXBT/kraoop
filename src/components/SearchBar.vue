<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <svg
          class="h-5 w-5 text-white/70"
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
        class="liquid-glass-search-input w-full pl-11 pr-12 py-3.5 text-white text-base bg-black/20 border border-white/50 backdrop-blur-sm rounded-full shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] placeholder:text-white/70 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 min-h-[48px] relative z-10"
        @input="onSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur" />

      <!-- Clear Button -->
      <LiquidButton
        v-if="searchQuery"
        @click="clearSearch"
        variant="glass"
        size="sm"
        :class="'absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white z-20 p-1'"
        aria-label="Clear search">
        <template #icon>
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M3.75 12a.75.75 0 0 1 .75-.75h13.19l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06l-6.75 6.75a.75.75 0 1 1-1.06-1.06l5.47-5.47H4.5a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd" />
          </svg>
        </template>
      </LiquidButton>
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
        class="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-white/30 overflow-hidden max-h-96 overflow-y-auto liquid-glass-dropdown">
        <!-- Recent Searches -->
        <div
          v-if="recentSearches.length > 0 && !searchQuery"
          class="p-3 border-b border-gray-100">
          <div class="flex items-center justify-between mb-2 px-2">
            <h4
              class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Recent Searches
            </h4>
            <LiquidButton
              @click="clearRecentSearches"
              variant="danger"
              size="sm"
              class="text-xs">
              Clear
            </LiquidButton>
          </div>
          <button
            v-for="(search, index) in recentSearches"
            :key="'recent-' + index"
            @click="selectSuggestion(search)"
            class="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group flex items-center gap-3">
            <svg
              class="h-4 w-4 text-gray-400"
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
          class="p-3 border-b border-gray-100">
          <h4
            class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            Popular Searches
          </h4>
          <button
            v-for="(search, index) in popularSearches"
            :key="'popular-' + index"
            @click="selectSuggestion(search)"
            class="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group flex items-center gap-3">
            <svg
              class="h-4 w-4 text-gray-400"
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
            class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
            Suggestions
          </h4>
          <button
            v-for="(suggestion, index) in filteredSuggestions"
            :key="'suggestion-' + index"
            @click="selectSuggestion(suggestion)"
            class="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors group flex items-center gap-3">
            <svg
              class="h-4 w-4 text-gray-400 group-hover:text-[#F5A3B7]"
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
/* Custom scrollbar for suggestions dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
