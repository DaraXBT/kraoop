<template>
  <aside
    :class="[
      'lg:w-80 flex-shrink-0',
      showFilters ? 'block' : 'hidden lg:block'
    ]">
    <div class="space-y-6">
      <!-- Collection Section -->
      <div
        v-if="showCollectionSection"
        class="menu-product bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="font-bold text-xl sm:text-2xl text-[#383838] mb-6">
          {{ collectionTitle }}
        </h3>
        <div class="flex flex-col space-y-4">
          <!-- Collection Link (if provided) -->
          <router-link
            v-if="collectionLink"
            class="option-shop py-3.5 px-4 hover:bg-gray-50 rounded-lg transition-colors text-base min-h-[48px] flex items-center font-medium text-[#383838]"
            :to="collectionLink.to">
            {{ collectionLink.label }}
          </router-link>

          <!-- Collection Dropdowns -->
          <SelectDropdown
            v-for="dropdown in collectionDropdowns"
            :key="dropdown.key"
            :model-value="modelValue[dropdown.key]"
            :options="dropdown.options"
            :placeholder="dropdown.placeholder"
            custom-class="min-h-[48px]"
            @update:model-value="handleUpdate(dropdown.key, $event)" />
        </div>
      </div>

      <!-- Filters Section -->
      <div
        class="menu-product bg-white p-5 sm:p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-xl sm:text-2xl text-[#383838]">
            {{ filtersTitle }}
          </h3>
          <button
            v-if="showClearAll"
            @click="$emit('clear-filters')"
            class="text-sm font-medium text-gray-400 hover:text-[#F5A3B7] transition-colors underline decoration-2 decoration-transparent hover:decoration-[#F5A3B7] underline-offset-4 cursor-pointer">
            Clear All
          </button>
        </div>
        <div class="flex flex-col space-y-4">
          <!-- Filter Dropdowns -->
          <SelectDropdown
            v-for="filter in filterDropdowns"
            :key="filter.key"
            :model-value="modelValue[filter.key]"
            :options="filter.options"
            :placeholder="filter.placeholder"
            custom-class="min-h-[48px]"
            @update:model-value="handleUpdate(filter.key, $event)" />
        </div>
      </div>

      <!-- Mobile Filter Toggle Button (shown only on mobile) -->
      <div class="lg:hidden mt-4">
        <LiquidButton
          variant="secondary"
          size="md"
          full-width
          @click="$emit('update:showFilters', !showFilters)">
          {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
        </LiquidButton>
      </div>
    </div>
  </aside>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";
import SelectDropdown from "./SelectDropdown.vue";
import LiquidButton from "./LiquidButton.vue";

/**
 * ProductFilterSidebar - Reusable filter sidebar for product listings
 * 
 * Provides collection navigation and filter controls with
 * support for multiple dropdown filters
 */

const props = defineProps({
  // Current filter values (v-model)
  modelValue: {
    type: Object,
    required: true,
  },
  // Show/hide filters on mobile
  showFilters: {
    type: Boolean,
    default: false,
  },
  // Show collection section
  showCollectionSection: {
    type: Boolean,
    default: true,
  },
  // Collection section title
  collectionTitle: {
    type: String,
    default: "COLLECTION",
  },
  // Collection link (optional)
  collectionLink: {
    type: Object,
    default: null,
    // Shape: { label: string, to: string }
  },
  // Collection dropdown configurations
  collectionDropdowns: {
    type: Array,
    default: () => [],
    // Shape: [{ key: string, placeholder: string, options: [{value, label}] }]
  },
  // Filters section title
  filtersTitle: {
    type: String,
    default: "FILTERS",
  },
  // Filter dropdown configurations
  filterDropdowns: {
    type: Array,
    default: () => [],
    // Shape: [{ key: string, placeholder: string, options: [{value, label}] }]
  },
  // Show "Clear All" button
  showClearAll: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "update:showFilters", "clear-filters"]);

const handleUpdate = (key, value) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [key]: value,
  });
};
</script>

<style scoped>
.menu-product {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.option-shop {
  background-color: #fff;
  cursor: pointer;
}
</style>
