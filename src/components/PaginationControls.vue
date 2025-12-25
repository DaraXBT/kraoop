<template>
  <nav class="flex items-center gap-x-1">
    <!-- Previous Button -->
    <LiquidButton
      variant="glass"
      size="sm"
      class="min-h-[38px]"
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)">
      <template v-slot:icon-left>
        <svg
          class="w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </template>
      <span v-if="showLabels" class="hidden sm:inline">Previous</span>
    </LiquidButton>

    <!-- Page Number Buttons -->
    <div class="flex items-center gap-x-1">
      <LiquidButton
        v-for="page in visiblePages"
        :key="page"
        :variant="currentPage === page ? 'secondary' : 'glass'"
        size="sm"
        icon-only
        class="min-h-[38px] min-w-[38px]"
        :class="{'bg-gray-100 font-medium': currentPage === page}"
        @click="handlePageChange(page)">
        {{ page }}
      </LiquidButton>
    </div>

    <!-- Next Button -->
    <LiquidButton
      variant="glass"
      size="sm"
      class="min-h-[38px]"
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)">
      <span v-if="showLabels" class="hidden sm:inline">Next</span>
      <template v-slot:icon-right>
        <svg
          class="w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </template>
    </LiquidButton>
  </nav>
</template>

<script setup>
import {computed, defineProps, defineEmits} from "vue";
import LiquidButton from "./LiquidButton.vue";

/**
 * PaginationControls - Reusable pagination component
 * 
 * Provides navigation controls for paginated content with
 * liquid button styling and responsive design
 */

const props = defineProps({
  // Current active page (1-indexed)
  currentPage: {
    type: Number,
    required: true,
    validator: (val) => val >= 1,
  },
  // Total number of pages
  totalPages: {
    type: Number,
    required: true,
    validator: (val) => val >= 1,
  },
  // Show "Previous" and "Next" labels
  showLabels: {
    type: Boolean,
    default: true,
  },
  // Maximum number of page buttons to show
  maxVisible: {
    type: Number,
    default: 3,
  },
});

const emit = defineEmits(["page-change"]);

// Calculate which page numbers to display
const visiblePages = computed(() => {
  const pages = [];
  const {currentPage, totalPages, maxVisible} = props;
  
  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show current page and surrounding pages
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end === totalPages) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }
  
  return pages;
});

const handlePageChange = (page) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit("page-change", page);
  }
};
</script>

<style scoped>
/* Additional pagination-specific styles can go here */
</style>
