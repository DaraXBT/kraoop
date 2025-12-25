<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <!-- Product Count -->
    <div class="text-[#B0A6BD] text-base sm:text-lg">
      {{ productCount }} {{ productCount === 1 ? $t('product.count_product') : $t('product.count_products') }}
    </div>

    <!-- Sort Dropdown -->
    <div class="flex items-center gap-3 text-base w-full sm:w-auto">
      <span class="text-gray-700">{{ $t('product.sort_by') }}</span>
      <div class="relative flex-1 sm:flex-none">
          <SelectDropdown
            :model-value="modelValue"
            :options="computedSortOptions"
            variant="liquid-glass"
          custom-class="min-h-[48px]"
          @update:model-value="$emit('update:modelValue', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from "vue";
import SelectDropdown from "./SelectDropdown.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

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
    default: () => null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const defaultSortOptions = computed(() => [
  {value: "best-selling", label: t('sort.best_selling')},
  {value: "price-low", label: t('sort.price_low')},
  {value: "price-high", label: t('sort.price_high')},
  {value: "a-z", label: t('sort.az')},
  {value: "z-a", label: t('sort.za')},
  {value: "newest", label: t('sort.newest')},
]);

const computedSortOptions = computed(() => props.sortOptions || defaultSortOptions.value);
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
