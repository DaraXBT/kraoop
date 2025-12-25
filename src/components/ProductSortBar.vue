<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <!-- Product Count -->
    <div class="text-[#B0A6BD] text-base sm:text-lg">
      {{ productCount }} {{ productCount === 1 ? 'Product' : 'Products' }}
    </div>

    <!-- Sort Dropdown -->
    <div class="flex items-center gap-3 text-base w-full sm:w-auto">
      <span class="text-gray-700">Sort By</span>
      <div class="relative flex-1 sm:flex-none">
        <SelectDropdown
          :model-value="modelValue"
          :options="sortOptions"
          variant="liquid-glass"
          custom-class="min-h-[48px]"
          @update:model-value="$emit('update:modelValue', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";
import SelectDropdown from "./SelectDropdown.vue";

/**
 * ProductSortBar - Sort controls with product count
 * 
 * Displays the total product count and provides sorting controls
 * for product listings
 */

const props = defineProps({
  // Total number of products
  productCount: {
    type: Number,
    required: true,
    validator: (val) => val >= 0,
  },
  // Currently selected sort value
  modelValue: {
    type: String,
    default: "best-selling",
  },
  // Available sort options
  sortOptions: {
    type: Array,
    default: () => [
      {value: "best-selling", label: "Best Selling"},
      {value: "price-low", label: "Price: Low to High"},
      {value: "price-high", label: "Price: High to Low"},
      {value: "a-z", label: "A-Z"},
      {value: "z-a", label: "Z-A"},
      {value: "newest", label: "Newest First"},
    ],
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
