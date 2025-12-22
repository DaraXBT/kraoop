<template>
  <div class="relative w-full">
    <!-- Search Input -->
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-11 pr-12 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 bg-white min-h-[48px]"
        @input="onSearch"
        @focus="showSuggestions = true"
        @blur="handleBlur" />

      <!-- Clear Button -->
      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
        class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">
        <!-- Recent Searches -->
        <div
          v-if="recentSearches.length > 0 && !searchQuery"
          class="p-3 border-b border-gray-100">
          <div class="flex items-center justify-between mb-2 px-2">
            <h4
              class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Recent Searches
            </h4>
            <button
              @click="clearRecentSearches"
              class="text-xs text-[#F5A3B7] hover:text-[#e392a6] font-medium">
              Clear
            </button>
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
