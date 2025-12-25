<template>
  <!-- Modal Backdrop -->
  <Transition name="modal-backdrop">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
      @click="closeModal">
    </div>
  </Transition>

  <!-- Modal Content -->
  <Transition name="modal-slide">
    <div
      v-if="modelValue"
      class="fixed inset-x-0 bottom-0 z-[101] max-h-[90vh] overflow-hidden">
      <!-- Modal Container with Liquid Glass Design -->
      <div class="mobile-filter-modal">
        <!-- Drag Handle -->
        <div class="flex justify-center py-3 pb-4">
          <div class="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>

        <!-- Header -->
        <div class="px-6 pb-4 border-b border-white/20">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-neutral-900">{{ $t('filter.filters_title') }}</h2>
            <button
              @click="closeModal"
              class="p-2 rounded-xl hover:bg-white/50 transition-all"
              aria-label="Close filters">
              <svg
                class="w-6 h-6 text-gray-600"
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
          <p v-if="activeFilterCount > 0" class="text-sm text-gray-600 mt-2">
            {{ $t('filter.filter_active_nav', { count: activeFilterCount }, activeFilterCount) }}
          </p>
        </div>

        <!-- Scrollable Filter Content -->
        <div class="overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4">
          <div class="space-y-6">
            <!-- Categories Section -->
            <div v-if="categories && categories.length > 0" class="filter-section">
              <h3 class="filter-section-title">
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
                {{ title }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="(category, index) in categories"
                  :key="index"
                  class="filter-checkbox-label">
                  <input
                    type="checkbox"
                    :checked="category.selected"
                    class="filter-checkbox"
                    @change="$emit('category-change', category)" />
                  <span class="filter-checkbox-text">{{ category.label }}</span>
                  <span v-if="category.count !== undefined" class="filter-count">
                    {{ category.count }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Brands Section -->
            <div v-if="brands && brands.length > 0" class="filter-section">
              <h3 class="filter-section-title">
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
                {{ $t('filter.brands') }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="(brand, index) in brands"
                  :key="index"
                  class="filter-checkbox-label">
                  <input
                    type="checkbox"
                    :checked="brand.selected"
                    class="filter-checkbox"
                    @change="$emit('brand-change', brand)" />
                  <span class="filter-checkbox-text">{{ brand.label }}</span>
                  <span v-if="brand.count !== undefined" class="filter-count">
                    {{ brand.count }}
                  </span>
                </label>
              </div>
            </div>

            <!-- Skin Type Section -->
            <div v-if="skinTypes && skinTypes.length > 0" class="filter-section">
              <h3 class="filter-section-title">
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
                {{ $t('filter.skin_type') }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="(skinType, index) in skinTypes"
                  :key="index"
                  class="filter-checkbox-label">
                  <input
                    type="checkbox"
                    :checked="skinType.selected"
                    class="filter-checkbox"
                    @change="$emit('skin-type-change', skinType)" />
                  <span class="filter-checkbox-text">{{ skinType.label }}</span>
                </label>
              </div>
            </div>

            <!-- Price Range Section -->
            <div v-if="priceRange" class="filter-section">
              <h3 class="filter-section-title">
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
                {{ $t('filter.price_range') }}
              </h3>
              <div class="space-y-4">
                <input
                  type="range"
                  :min="priceRange.min"
                  :max="priceRange.max"
                  :value="priceRange.current"
                  @input="updatePriceRange"
                  class="price-slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div class="flex justify-between text-sm text-gray-600 font-semibold">
                  <span>${{ priceRange.min }}</span>
                  <span class="text-[#F5A3B7] text-base font-bold">${{ priceRange.current }}</span>
                  <span>${{ priceRange.max }}</span>
                </div>
              </div>
            </div>

            <!-- Rating Section -->
            <div v-if="selectedRating !== undefined" class="filter-section">
              <h3 class="filter-section-title">
                <svg
                  class="w-5 h-5 text-[#F5A3B7]"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {{ $t('filter.rating') }}
              </h3>
              <div class="space-y-2">
                <button
                  v-for="rating in [5, 4, 3, 2, 1]"
                  :key="rating"
                  @click="$emit('rating-change', rating)"
                  :class="[
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all',
                    selectedRating === rating
                      ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-[#E392A6]/10 border-2 border-[#F5A3B7] text-neutral-900'
                      : 'bg-white/50 border border-white/40 text-gray-600 hover:bg-white/80 hover:border-[#F5A3B7]/50',
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
                  <span>{{ $t('filter.up') }}</span>
                </button>
              </div>
            </div>

            <!-- Additional Filters Section -->
            <div v-if="additionalFilters && additionalFilters.length > 0" class="filter-section">
              <h3 class="filter-section-title">
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
                {{ $t('filter.more_filters') }}
              </h3>
              <div class="space-y-2">
                <label
                  v-for="(filter, index) in additionalFilters"
                  :key="index"
                  class="filter-checkbox-label">
                  <input
                    type="checkbox"
                    :checked="filter.selected"
                    class="filter-checkbox"
                    @change="$emit('filter-change', filter)" />
                  <span class="filter-checkbox-text">{{ filter.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="border-t border-white/20 p-6 bg-white/80 backdrop-blur-xl">
          <div class="flex gap-3">
            <LiquidButton
              @click="$emit('clear-filters')"
              variant="glass"
              size="lg"
              class="flex-1">
              {{ $t('filter.clear_all') }}
            </LiquidButton>
            <LiquidButton
              @click="applyFilters"
              variant="primary"
              size="lg"
              class="flex-1">
              {{ $t('filter.apply_filters') }}
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import LiquidButton from './LiquidButton.vue';

/**
 * MobileFilterModal - Full-screen filter modal for mobile devices
 * 
 * Provides a mobile-optimized filter experience with liquid glass design,
 * smooth animations, and touch-friendly interactions
 */

const props = defineProps({
  // Modal visibility
  modelValue: {
    type: Boolean,
    required: true,
  },
  // Filter section title
  title: {
    type: String,
    default: '',
  },
  // Categories array
  categories: {
    type: Array,
    default: () => [],
  },
  // Brands array
  brands: {
    type: Array,
    default: () => [],
  },
  // Skin types array
  skinTypes: {
    type: Array,
    default: () => [],
  },
  // Additional filters array
  additionalFilters: {
    type: Array,
    default: () => [],
  },
  // Price range object
  priceRange: {
    type: Object,
    default: () => ({
      min: 0,
      max: 200,
      current: 200,
    }),
  },
  // Selected rating
  selectedRating: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits([
  'update:modelValue',
  'category-change',
  'brand-change',
  'skin-type-change',
  'filter-change',
  'price-change',
  'rating-change',
  'clear-filters',
  'apply-filters',
]);

const activeFilterCount = computed(() => {
  let count = 0;
  
  if (props.categories) {
    count += props.categories.filter(c => c.selected).length;
  }
  if (props.brands) {
    count += props.brands.filter(b => b.selected).length;
  }
  if (props.skinTypes) {
    count += props.skinTypes.filter(s => s.selected).length;
  }
  if (props.additionalFilters) {
    count += props.additionalFilters.filter(f => f.selected).length;
  }
  if (props.selectedRating) {
    count += 1;
  }
  
  return count;
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const applyFilters = () => {
  emit('apply-filters');
  closeModal();
};

const updatePriceRange = (event) => {
  const value = parseInt(event.target.value);
  emit('price-change', { min: props.priceRange.min, max: value });
};
</script>

<style scoped>
/* Mobile Filter Modal Container */
.mobile-filter-modal {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.9) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.1),
    0 -2px 10px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: none;
}

/* Filter Section */
.filter-section {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.filter-section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

/* Filter Checkbox Label */
.filter-checkbox-label {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-checkbox-label:hover {
  background: rgba(255, 255, 255, 0.7);
}

.filter-checkbox {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background: white;
  position: relative;
  flex-shrink: 0;
}

.filter-checkbox:checked {
  background: linear-gradient(135deg, #f5a3b7 0%, #e89aae 100%);
  border-color: #f5a3b7;
}

.filter-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0.5rem;
  height: 0.75rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -60%) rotate(45deg);
}

.filter-checkbox-text {
  margin-left: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  flex: 1;
}

.filter-count {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 700;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
}

/* Price Slider */
.price-slider {
  -webkit-appearance: none;
  appearance: none;
}

.price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #f5a3b7;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.price-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 8px rgba(245, 163, 183, 0.4);
}

.price-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #f5a3b7;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.price-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 3px 8px rgba(245, 163, 183, 0.4);
}

/* Modal Transitions */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

.modal-slide-enter-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-slide-leave-active {
  transition: transform 0.3s ease-in;
}

.modal-slide-enter-from {
  transform: translateY(100%);
}

.modal-slide-leave-to {
  transform: translateY(100%);
}
</style>
