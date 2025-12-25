<template>
  <div
    class="liquid-glass-review-card flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl group transition-all duration-500">
    <!-- Reviewer Avatar -->
    <img
      :src="review.reviewer.avatar"
      :alt="review.reviewer.name"
      class="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-3 border-white shadow-lg ring-2 ring-pink-100/50" />

    <!-- Review Content -->
    <div class="relative z-10 flex-grow space-y-3">
      <!-- Reviewer Info & Date -->
      <div
        class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span class="text-sm sm:text-base font-bold text-neutral-900">
            {{ review.reviewer.name }}
          </span>
          <span
            class="text-xs sm:text-sm text-[#F5A3B7] font-semibold ml-2 bg-[#F5A3B7]/15 px-2.5 py-1 rounded-full backdrop-blur-sm">
            {{ $t('review.verified_buyer') }}
          </span>
        </div>
        <span class="text-xs sm:text-sm text-gray-600 font-medium">
          {{ review.date }}
        </span>
      </div>

      <!-- Star Rating -->
      <div class="flex items-center gap-1">
        <svg
          v-for="i in 5"
          :key="i"
          :class="[
            'w-4 h-4 fill-current drop-shadow-md',
            i <= review.rating ? 'text-yellow-400' : 'text-gray-300'
          ]"
          viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <!-- Review Title -->
      <h4
        v-if="review.title"
        class="text-sm sm:text-base font-bold text-neutral-900">
        {{ review.title }}
      </h4>

      <!-- Review Content -->
      <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
        {{ review.content }}
      </p>

      <!-- Review Images (if any) -->
      <div v-if="review.images && review.images.length > 0" class="flex gap-3">
        <img
          v-for="(image, index) in review.images"
          :key="index"
          :src="image"
          :alt="`Review image ${index + 1}`"
          class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-white/70 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
          @click="$emit('image-click', image)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, defineEmits} from "vue";

/**
 * ProductReviewCard - Individual product review card
 * 
 * Displays a user review with avatar, name, verification badge,
 * rating, title, content, and optional images
 */

const props = defineProps({
  // Review object
  review: {
    type: Object,
    required: true,
    validator: (review) => {
      return (
        review.reviewer &&
        typeof review.reviewer.name === "string" &&
        typeof review.reviewer.avatar === "string" &&
        typeof review.rating === "number" &&
        review.rating >= 1 &&
        review.rating <= 5 &&
        typeof review.content === "string" &&
        typeof review.date === "string"
      );
    },
  },
});

const emit = defineEmits(["image-click"]);

// Expected review shape:
// {
//   id: number,
//   reviewer: {
//     name: string,
//     avatar: string,
//     verified: boolean
//   },
//   date: string,
//   rating: number (1-5),
//   title?: string,
//   content: string,
//   images?: string[]
// }
</script>

<style scoped>
/* Additional review card styles if needed */
</style>
