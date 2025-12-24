<template>
  <aside class="w-full lg:w-72 flex-shrink-0">
    <!-- Mobile Filter Toggle Button -->
    <LiquidButton
      @click="$emit('toggle-filters')"
      variant="secondary"
      size="lg"
      full-width
      class="lg:hidden mb-4">
      <span class="text-sm">{{
        showFilters ? "Hide Filters" : "Show Filters"
      }}</span>
      <template v-slot:icon-right>
        <svg
          :class="{'rotate-180': showFilters}"
          class="w-5 h-5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7" />
        </svg>
      </template>
    </LiquidButton>

    <div :class="{'hidden lg:block': !showFilters}" class="space-y-5">
      <!-- Active Filters Display -->
      <div
        v-if="hasActiveFilters"
        class="glass-pink p-5 rounded-3xl border border-pink-200/40 shadow-glass">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-sm font-bold text-gray-800">Active Filters</h4>
          <span
            class="text-xs bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] text-white px-3 py-1.5 rounded-full font-bold shadow-glass-sm"
            >{{ activeFilterCount }}</span
          >
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(filter, index) in activeFiltersList"
            :key="index"
            class="inline-flex items-center gap-2 px-4 py-2 glass-card text-sm text-gray-700 rounded-full border border-white/30 group hover:border-red-300 transition-smooth hover:shadow-glass font-semibold">
            {{ filter.label }}
            <LiquidButton
              @click="$emit('remove-filter', filter)"
              variant="danger"
              size="sm"
              icon-only
              class="w-4 h-4 !p-0">
              <template v-slot:icon-left>
                <svg
                  class="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </template>
            </LiquidButton>
          </span>
        </div>
      </div>

      <!-- Categories Section -->
      <div
        class="glass-card-strong p-6 rounded-3xl shadow-glass border border-white/30">
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
      <div
        class="glass-card-strong p-6 rounded-3xl shadow-glass border border-white/30">
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
                class="w-full px-4 py-3 text-sm glass-card border border-white/30 rounded-2xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-smooth font-semibold shadow-glass-sm"
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
                class="w-full px-4 py-3 text-sm glass-card border border-white/30 rounded-2xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-smooth font-semibold shadow-glass-sm"
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
        class="glass-card-strong p-6 rounded-3xl shadow-glass border border-white/30">
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
        class="glass-card-strong p-6 rounded-3xl shadow-glass border border-white/30">
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
      <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3
          class="font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
          <svg
            class="w-5 h-5 text-[#F5A3B7]"
            fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Rating
        </h3>

        <div class="flex flex-col space-y-2">
          <button
            v-for="rating in [5, 4, 3, 2, 1]"
            :key="rating"
            @click="$emit('rating-change', rating)"
            :class="[
              'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
              selectedRating === rating
                ? 'bg-[#F5A3B7]/10 border-2 border-[#F5A3B7] text-neutral-900'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-[#F5A3B7]/30 hover:bg-gray-50',
            ]">
            <div class="flex items-center gap-1">
              <svg
                v-for="star in rating"
                :key="'filled-' + star"
                class="w-4 h-4 text-yellow-400 fill-current"
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
        class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3
          class="font-bold text-lg text-neutral-900 mb-4 flex items-center gap-2">
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
          More Filters
        </h3>

        <div class="flex flex-col space-y-2">
          <div
            v-for="(filter, index) in additionalFilters"
            :key="index"
            class="group">
            <label
              :for="`filter-${index}`"
              class="flex items-center cursor-pointer p-2 rounded-lg hover:bg-white/50 transition-smooth">
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
                class="ml-3 text-sm font-medium text-gray-700 group-hover:text-neutral-900 transition-colors">
                {{ filter.label }}
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <button
        @click="$emit('clear-filters')"
        class="w-full py-3 px-4 bg-gradient-to-r from-gray-100 to-gray-50 text-neutral-900 rounded-xl text-sm font-semibold hover:from-gray-200 hover:to-gray-100 transition-all duration-200 shadow-sm border border-gray-200 flex items-center justify-center gap-2">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Clear All Filters
      </button>
    </div>
  </aside>
</template>

<script setup>
import {ref, computed} from "vue";
import LiquidButton from "./LiquidButton.vue";

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
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
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
</style>
