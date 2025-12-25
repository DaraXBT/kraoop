<template>
  <aside class="w-full lg:w-72 flex-shrink-0">
    <!-- Mobile Filter Modal Button -->
    <LiquidButton
      @click="openMobileModal"
      variant="secondary"
      size="lg"
      full-width
      class="lg:hidden mb-4">
      <span class="text-sm">Filters</span>
      <template v-slot:icon-right>
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </template>
    </LiquidButton>

    <!-- Mobile Filter Modal -->
    <MobileFilterModal
      v-model="showMobileModal"
      :title="title"
      :categories="categories"
      :brands="brands"
      :skinTypes="skinTypes"
      :additionalFilters="additionalFilters"
      :priceRange="priceRange"
      :selectedRating="selectedRating"
      @category-change="$emit('category-change', $event)"
      @brand-change="$emit('brand-change', $event)"
      @skin-type-change="$emit('skin-type-change', $event)"
      @filter-change="$emit('filter-change', $event)"
      @price-change="$emit('price-change', $event)"
      @rating-change="$emit('rating-change', $event)"
      @clear-filters="$emit('clear-filters')"
      @apply-filters="handleApplyFilters" />

    <!-- Desktop Sidebar (Hidden on mobile, always visible on desktop) -->
    <div class="hidden lg:block space-y-5">
      <!-- Active Filters Display -->
      <div
        v-if="hasActiveFilters"
        class="liquid-filter-container">
        <!-- Shadow element for depth -->
        <div class="liquid-filter-shadow"></div>
        
        <!-- Main content -->
        <div class="liquid-filter-content">
          <!-- Reflective overlay -->
          <div class="liquid-filter-reflection"></div>
          
          <div class="flex items-center justify-between mb-4 relative z-10">
            <h4 class="text-sm font-bold text-gray-900 drop-shadow-sm">Active Filters</h4>
            <span
              class="liquid-filter-badge"
              >{{ activeFilterCount }}</span
            >
          </div>
          <div class="flex flex-wrap gap-2 relative z-10">
            <span
              v-for="(filter, index) in activeFiltersList"
              :key="index"
              class="liquid-filter-tag">
              <!-- Tag reflection overlay -->
              <span class="liquid-tag-reflection"></span>
              
              <span class="relative z-10 text-sm text-gray-800 font-semibold drop-shadow-sm">
                {{ filter.label }}
              </span>
              <button
                @click="$emit('remove-filter', filter)"
                class="liquid-remove-btn"
                aria-label="Remove filter">
                <svg
                  class="w-3 h-3"
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
            </span>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          {{ title }}
        </h3>

        <!-- Category Filters with Checkboxes -->
        <div class="flex flex-col space-y-3">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="group p-2 rounded-xl hover:bg-white/50 transition-smooth">
            <label
              :for="`category-${index}`"
              class="flex items-center cursor-pointer">
              <div class="checkbox-wrapper">
                <input
                  :id="`category-${index}`"
                  type="checkbox"
                  :checked="category.selected"
                  class="modern-checkbox"
                  @change="$emit('category-change', category)" />
                <span class="checkbox-custom">
                  <svg
                    class="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <span
                class="ml-3 text-sm font-semibold text-gray-700 group-hover:text-neutral-900 transition-smooth flex-1">
                {{ category.label }}
              </span>
              <span
                v-if="category.count !== undefined"
                class="ml-auto text-xs text-gray-500 font-bold glass-card px-3 py-1 rounded-full">
                {{ category.count }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Price Range Filter -->
      <div class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Price Range
        </h3>

        <div class="space-y-4">
          <!-- Price Slider -->
          <div class="px-1">
            <input
              type="range"
              :min="priceRange.min"
              :max="priceRange.max"
              :value="priceRange.current"
              @input="updatePriceRange"
              class="price-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
            <div
              class="flex justify-between mt-3 text-xs text-gray-500 font-bold">
              <span>${{ priceRange.min }}</span>
              <span class="text-[#F5A3B7] text-base"
                >${{ priceRange.current }}</span
              >
              <span>${{ priceRange.max }}</span>
            </div>
          </div>

          <!-- Price Input Fields -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <label class="text-xs text-gray-600 mb-2 block font-bold"
                >Min</label
              >
              <input
                type="number"
                v-model="minPrice"
                :placeholder="`$${priceRange.min}`"
                class="w-full px-4 py-3 text-sm glass-card border border-white/30 rounded-2xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-smooth font-semibold"
                @change="
                  $emit('price-change', {min: minPrice, max: maxPrice})
                " />
            </div>
            <div class="text-gray-400 mt-6 font-bold">-</div>
            <div class="flex-1">
              <label class="text-xs text-gray-600 mb-2 block font-bold"
                >Max</label
              >
              <input
                type="number"
                v-model="maxPrice"
                :placeholder="`$${priceRange.max}`"
                class="w-full px-4 py-3 text-sm glass-card border border-white/30 rounded-2xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-smooth font-semibold"
                @change="
                  $emit('price-change', {min: minPrice, max: maxPrice})
                " />
            </div>
          </div>
        </div>
      </div>

      <!-- Brand Filter -->
      <div
        v-if="brands && brands.length > 0"
        class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          Brands
        </h3>

        <div class="flex flex-col space-y-3">
          <div
            v-for="(brand, index) in brands"
            :key="index"
            class="group p-2 rounded-xl hover:bg-white/50 transition-smooth">
            <label
              :for="`brand-${index}`"
              class="flex items-center cursor-pointer">
              <div class="checkbox-wrapper">
                <input
                  :id="`brand-${index}`"
                  type="checkbox"
                  :checked="brand.selected"
                  class="modern-checkbox"
                  @change="$emit('brand-change', brand)" />
                <span class="checkbox-custom">
                  <svg
                    class="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <span
                class="ml-3 text-sm font-semibold text-gray-700 group-hover:text-neutral-900 transition-smooth flex-1">
                {{ brand.label }}
              </span>
              <span
                v-if="brand.count !== undefined"
                class="ml-auto text-xs text-gray-500 font-bold glass-card px-3 py-1 rounded-full">
                {{ brand.count }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Skin Type Filter -->
      <div
        v-if="skinTypes && skinTypes.length > 0"
        class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Skin Type
        </h3>

        <div class="flex flex-col space-y-3">
          <div
            v-for="(skinType, index) in skinTypes"
            :key="index"
            class="group p-2 rounded-xl hover:bg-white/50 transition-smooth">
            <label
              :for="`skin-${index}`"
              class="flex items-center cursor-pointer">
              <div class="checkbox-wrapper">
                <input
                  :id="`skin-${index}`"
                  type="checkbox"
                  :checked="skinType.selected"
                  class="modern-checkbox"
                  @change="$emit('skin-type-change', skinType)" />
                <span class="checkbox-custom">
                  <svg
                    class="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <span
                class="ml-3 text-sm font-semibold text-gray-700 group-hover:text-neutral-900 transition-smooth">
                {{ skinType.label }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Rating Filter -->
      <div class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          Rating
        </h3>

        <div class="flex flex-col space-y-2">
          <button
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            @click="$emit('rating-change', rating)"
            :class="[
              'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group relative overflow-hidden',
              selectedRating === rating
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-[#E392A6]/10 border-2 border-[#F5A3B7] text-neutral-900 shadow-lg'
                : 'bg-white/50 border border-white/40 text-gray-600 hover:bg-white/80 hover:border-[#F5A3B7]/50 hover:shadow-md hover:text-neutral-900 hover:scale-[1.02]',
            ]">
            <div class="flex items-center gap-1">
              <svg
                v-for="star in rating"
                :key="'filled-' + star"
                class="w-4 h-4 text-yellow-400 fill-current drop-shadow-sm"
                viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg
                v-for="star in 5 - rating"
                :key="'empty-' + star"
                class="w-4 h-4 text-gray-300 fill-current"
                viewBox="0 0 24 24">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span>& Up</span>
          </button>
        </div>
      </div>

      <!-- Additional Filters -->
      <div
        v-if="additionalFilters && additionalFilters.length > 0"
        class="glass-card-strong p-6 rounded-3xl border border-white/30">
        <h3
          class="font-bold text-xl text-neutral-900 mb-5 flex items-center gap-2">
          <div
            class="p-2 rounded-xl bg-gradient-to-br from-[#F5A3B7]/20 to-[#E392A6]/10">
            <svg
              class="w-5 h-5 text-[#F5A3B7]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          More Filters
        </h3>

        <div class="flex flex-col space-y-2">
          <div
            v-for="(filter, index) in additionalFilters"
            :key="index"
            class="group p-2 rounded-xl hover:bg-white/50 transition-smooth">
            <label
              :for="`filter-${index}`"
              class="flex items-center cursor-pointer">
              <div class="checkbox-wrapper checkbox-sm">
                <input
                  :id="`filter-${index}`"
                  type="checkbox"
                  :checked="filter.selected"
                  class="modern-checkbox"
                  @change="$emit('filter-change', filter)" />
                <span class="checkbox-custom">
                  <svg
                    class="checkbox-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
              <span
                class="ml-3 text-sm font-semibold text-gray-700 group-hover:text-neutral-900 transition-smooth">
                {{ filter.label }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Clear Filters Button - Liquid Glass Inspired -->
  <button
        @click="$emit('clear-filters')"
        class="liquid-glass-clear-btn w-full mt-2"
        aria-label="Clear all filters">
        <div class="flex items-center justify-center gap-2 relative z-20">
          <svg
            class="w-4 h-4 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span class="text-sm font-bold text-gray-800">Clear All Filters</span>
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup>
import {ref, computed} from "vue";
import LiquidButton from "./LiquidButton.vue";
import MobileFilterModal from "./MobileFilterModal.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Categories",
  },
  categories: {
    type: Array,
    default: () => [],
  },
  brands: {
    type: Array,
    default: () => [],
  },
  skinTypes: {
    type: Array,
    default: () => [],
  },
  additionalFilters: {
    type: Array,
    default: () => [],
  },
  showFilters: {
    type: Boolean,
    default: true,
  },
  priceRange: {
    type: Object,
    default: () => ({
      min: 0,
      max: 200,
      current: 100,
    }),
  },
  selectedRating: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits([
  "toggle-filters",
  "category-change",
  "brand-change",
  "skin-type-change",
  "filter-change",
  "price-change",
  "rating-change",
  "clear-filters",
  "remove-filter",
]);

// Mobile modal state
const showMobileModal = ref(false);

const openMobileModal = () => {
  showMobileModal.value = true;
};

const handleApplyFilters = () => {
  showMobileModal.value = false;
};

const minPrice = ref(props.priceRange.min);
const maxPrice = ref(props.priceRange.max);

const updatePriceRange = (event) => {
  const value = parseInt(event.target.value);
  emit("price-change", {min: props.priceRange.min, max: value});
};

const hasActiveFilters = computed(() => {
  return activeFilterCount.value > 0;
});

const activeFilterCount = computed(() => {
  let count = 0;

  // Count selected categories
  count += props.categories.filter((c) => c.selected).length;

  // Count selected brands
  if (props.brands) {
    count += props.brands.filter((b) => b.selected).length;
  }

  // Count selected skin types
  if (props.skinTypes) {
    count += props.skinTypes.filter((s) => s.selected).length;
  }

  // Count selected additional filters
  if (props.additionalFilters) {
    count += props.additionalFilters.filter((f) => f.selected).length;
  }

  // Count rating filter
  if (props.selectedRating) {
    count += 1;
  }

  return count;
});

const activeFiltersList = computed(() => {
  const filters = [];

  // Add selected categories
  props.categories
    .filter((c) => c.selected)
    .forEach((c) => filters.push({type: "category", label: c.label, data: c}));

  // Add selected brands
  if (props.brands) {
    props.brands
      .filter((b) => b.selected)
      .forEach((b) => filters.push({type: "brand", label: b.label, data: b}));
  }

  // Add selected skin types
  if (props.skinTypes) {
    props.skinTypes
      .filter((s) => s.selected)
      .forEach((s) =>
        filters.push({type: "skinType", label: s.label, data: s})
      );
  }

  // Add selected additional filters
  if (props.additionalFilters) {
    props.additionalFilters
      .filter((f) => f.selected)
      .forEach((f) => filters.push({type: "filter", label: f.label, data: f}));
  }

  // Add rating filter
  if (props.selectedRating) {
    filters.push({
      type: "rating",
      label: `${props.selectedRating}+ Stars`,
      data: props.selectedRating,
    });
  }

  return filters;
});
</script>

<style scoped>
/* Modern Custom Checkbox Styling */
.checkbox-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.modern-checkbox {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkbox-custom {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 2.5px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.checkbox-wrapper:hover .checkbox-custom {
  border-color: #f5a3b7;
  background: rgba(245, 163, 183, 0.05);
  transform: scale(1.05);
}

.checkbox-icon {
  width: 70%;
  height: 70%;
  color: white;
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-checkbox:checked ~ .checkbox-custom {
  background: linear-gradient(135deg, #f5a3b7 0%, #e89aae 100%);
  border-color: #f5a3b7;
  box-shadow: 0 4px 12px rgba(245, 163, 183, 0.4),
    0 2px 4px rgba(245, 163, 183, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modern-checkbox:checked ~ .checkbox-custom .checkbox-icon {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.modern-checkbox:checked ~ .checkbox-custom::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 0.75rem;
  background: radial-gradient(
    circle,
    rgba(245, 163, 183, 0.2) 0%,
    transparent 70%
  );
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.modern-checkbox:focus ~ .checkbox-custom {
  outline: 2px solid #f5a3b7;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(245, 163, 183, 0.1);
}

/* Small checkbox variant */
.checkbox-sm .checkbox-custom {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 0.375rem;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Custom price slider styling */
.price-slider {
  -webkit-appearance: none;
  appearance: none;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #f5a3b7;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.price-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(245, 163, 183, 0.4);
}

.price-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #f5a3b7;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.price-slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 3px 6px rgba(245, 163, 183, 0.4);
}

.price-slider::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    #e5e7eb 0%,
    #f5a3b7 var(--value),
    #e5e7eb var(--value)
  );
  border-radius: 10px;
}

/* ========================================
   LIQUID GLASS ACTIVE FILTERS STYLING
   ======================================== */

/* CSS Custom Properties for Filter Animations */
@property --filter-angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: 135deg;
}

@property --filter-angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

/* Main Liquid Filter Container */
.liquid-filter-container {
  position: relative;
  border-radius: 1.5rem;
  transition: all var(--liquid-anim-time, 400ms) cubic-bezier(0.25, 1, 0.5, 1);
  perspective: 1000px;
  margin-bottom: 1.25rem;
}

/* Advanced Shadow Element */
.liquid-filter-shadow {
  position: absolute;
  pointer-events: none;
  --shadow-offset: 1.5em;
  width: calc(100% + var(--shadow-offset));
  height: calc(100% + var(--shadow-offset));
  top: calc(0% - var(--shadow-offset) / 2);
  left: calc(0% - var(--shadow-offset) / 2);
  border-radius: inherit;
  filter: blur(clamp(2px, 0.125em, 8px));
  transition: all var(--liquid-anim-time, 400ms) cubic-bezier(0.25, 1, 0.5, 1);
}

.liquid-filter-shadow::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(245, 163, 183, 0.2), rgba(227, 146, 166, 0.1));
  width: calc(100% - var(--shadow-offset) - 0.25em);
  height: calc(100% - var(--shadow-offset) - 0.25em);
  top: calc(var(--shadow-offset) / 2 - 0.25em);
  left: calc(var(--shadow-offset) / 2 - 0.5em);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: all var(--liquid-anim-time, 400ms) cubic-bezier(0.25, 1, 0.5, 1);
}

/* Main Content Container with Glass Effect */
.liquid-filter-content {
  position: relative;
  padding: 1.25rem;
  border-radius: 1.5rem;
  overflow: hidden;
  
  /* Advanced Glass Background */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.85)
  );
  
  /* Complex Shadow System */
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.8),
    inset 0 -1px 1px rgba(255, 255, 255, 0.4),
    0 4px 12px -2px rgba(245, 163, 183, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.5),
    0 2px 4px rgba(0, 0, 0, 0.05);
  
  /* Advanced Backdrop Filter */
  backdrop-filter: blur(clamp(8px, 0.5em, 16px)) saturate(150%);
  -webkit-backdrop-filter: blur(clamp(8px, 0.5em, 16px)) saturate(150%);
  
  border: 1px solid rgba(245, 163, 183, 0.3);
  transition: all var(--liquid-anim-time, 400ms) cubic-bezier(0.25, 1, 0.5, 1);
}

/* Animated border */
.liquid-filter-content::before {
  content: "";
  position: absolute;
  pointer-events: none;
  inset: 0;
  border-radius: inherit;
  padding: clamp(1px, 0.0625em, 2px);
  background: conic-gradient(
    from var(--filter-angle-1) at 50% 50%,
    rgba(245, 163, 183, 0.6),
    rgba(255, 255, 255, 0.2) 15% 35%,
    rgba(245, 163, 183, 0.6) 50%,
    rgba(255, 255, 255, 0.2) 65% 85%,
    rgba(245, 163, 183, 0.6)
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  transition: all var(--liquid-anim-time, 400ms) cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1;
}

/* Reflective Overlay */
.liquid-filter-reflection {
  position: absolute;
  pointer-events: none;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    var(--filter-angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.6) 35% 45%,
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  background-size: 200% 200%;
  background-position: 0% 50%;
  transition: 
    background-position calc(var(--liquid-anim-time, 400ms) * 1.25) cubic-bezier(0.25, 1, 0.5, 1),
    --filter-angle-2 calc(var(--liquid-anim-time, 400ms) * 1.25) cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 5;
}

/* Hover Effects */
.liquid-filter-container:hover .liquid-filter-content {
  transform: scale(0.99);
  backdrop-filter: blur(clamp(12px, 0.75em, 20px)) saturate(160%);
  -webkit-backdrop-filter: blur(clamp(12px, 0.75em, 20px)) saturate(160%);
  
  box-shadow: 
    inset 0 1px 1px rgba(255, 255, 255, 0.9),
    inset 0 -1px 1px rgba(255, 255, 255, 0.5),
    0 6px 16px -2px rgba(245, 163, 183, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.6),
    0 2px 4px rgba(0, 0, 0, 0.08);
}

.liquid-filter-container:hover .liquid-filter-content::before {
  --filter-angle-1: 225deg;
}

.liquid-filter-container:hover .liquid-filter-reflection {
  background-position: 50% 50%;
}

.liquid-filter-container:hover .liquid-filter-shadow {
  filter: blur(clamp(3px, 0.1875em, 10px));
}

/* Liquid Filter Badge */
.liquid-filter-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  overflow: hidden;
  
  /* Glass background with gradient */
  background: linear-gradient(
    135deg,
    rgba(245, 163, 183, 0.95),
    rgba(227, 146, 166, 0.9)
  );
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 2px 6px rgba(245, 163, 183, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.1);
  
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-filter-badge::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 100%
  );
  opacity: 0.6;
  pointer-events: none;
}

.liquid-filter-container:hover .liquid-filter-badge {
  transform: scale(1.05);
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 3px 8px rgba(245, 163, 183, 0.4),
    0 1px 3px rgba(0, 0, 0, 0.15);
}

/* Liquid Filter Tag */
.liquid-filter-tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 9999px;
  overflow: hidden;
  cursor: default;
  
  /* Glass effect */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.65)
  );
  
  border: 1px solid rgba(255, 255, 255, 0.6);
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 1px 2px rgba(0, 0, 0, 0.03);
  
  backdrop-filter: blur(8px) saturate(130%);
  -webkit-backdrop-filter: blur(8px) saturate(130%);
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tag Reflection */
.liquid-tag-reflection {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 40% 50%,
    rgba(255, 255, 255, 0) 60%
  );
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.liquid-filter-tag:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85),
    rgba(245, 163, 183, 0.15),
    rgba(255, 255, 255, 0.75)
  );
  
  border-color: rgba(245, 163, 183, 0.4);
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 3px 8px rgba(245, 163, 183, 0.15),
    0 1px 3px rgba(0, 0, 0, 0.08);
  
  transform: translateY(-1px);
}

.liquid-filter-tag:hover .liquid-tag-reflection {
  opacity: 0.7;
}

/* Liquid Remove Button */
.liquid-remove-btn {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  overflow: hidden;
  cursor: pointer;
  
  /* Glass effect */
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.15),
    rgba(220, 38, 38, 0.1)
  );
  
  border: 1px solid rgba(239, 68, 68, 0.2);
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.05);
  
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  
  color: rgba(220, 38, 38, 0.8);
  
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.liquid-remove-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 50%
  );
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 0.25s ease;
}

.liquid-remove-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.25),
    rgba(220, 38, 38, 0.2)
  );
  
  border-color: rgba(239, 68, 68, 0.4);
  
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 2px 6px rgba(239, 68, 68, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.1);
  
  color: rgba(220, 38, 38, 1);
  transform: scale(1.1);
}

.liquid-remove-btn:hover::before {
  opacity: 0.7;
}

.liquid-remove-btn:active {
  transform: scale(0.95);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

/* ========================================
   LIQUID GLASS CLEAR ALL BUTTON
   ======================================== */

.liquid-glass-clear-btn {
  @apply relative overflow-hidden py-3 px-4 rounded-2xl transition-all duration-300;
  @apply flex items-center justify-center;
  
  /* Advanced Glass Background - Matching AdvancedLiquidButton */
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );

  /* Shadow system matching AdvancedLiquidButton */
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(255, 255, 255, 0.3),
    0 3px 6px -2px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
}

.liquid-glass-clear-btn:hover {
  transform: scale(0.98);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -1px 1px rgba(255, 255, 255, 0.4), 
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3);
}

.liquid-glass-clear-btn::before {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    var(--filter-angle-2, -45deg),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  background-size: 200% 200%;
  background-position: 0% 50%;
  transition: background-position 0.5s ease;
  z-index: 1;
}

.liquid-glass-clear-btn:hover::before {
  background-position: 25% 50%;
}

.liquid-glass-clear-btn::after {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  padding: clamp(1px, 0.0625em, 2px);
  background: conic-gradient(
    from var(--filter-angle-1, -75deg) at 50% 50%,
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
  transition: all 0.4s ease;
}

.liquid-glass-clear-btn:hover::after {
  --filter-angle-1: -125deg;
}

@media (prefers-reduced-motion: reduce) {
  .liquid-filter-container,
  .liquid-filter-content,
  .liquid-filter-shadow,
  .liquid-filter-reflection,
  .liquid-filter-content::before,
  .liquid-filter-tag,
  .liquid-remove-btn,
  .liquid-glass-clear-btn {
    transition: none;
    animation: none;
  }
  
  .liquid-filter-reflection {
    background-position: 25% 50%;
  }
}
</style>
