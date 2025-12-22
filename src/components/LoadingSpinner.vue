<script setup>
import {defineProps} from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "medium", // small, medium, large
  },
  color: {
    type: String,
    default: "#F5A3B7",
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  text: {
    type: String,
    default: "",
  },
});

const getSizeClass = () => {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };
  return sizes[props.size] || sizes.medium;
};
</script>

<template>
  <div
    v-if="fullscreen"
    class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-[200]">
    <div class="flex flex-col items-center gap-4">
      <div :class="getSizeClass()" class="relative">
        <div
          class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div
          :style="{borderColor: color}"
          class="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p v-if="text" class="text-base sm:text-lg text-gray-700 font-medium">
        {{ text }}
      </p>
    </div>
  </div>

  <div v-else class="flex flex-col items-center justify-center gap-3">
    <div :class="getSizeClass()" class="relative">
      <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
      <div
        :style="{borderColor: color}"
        class="absolute inset-0 border-4 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p v-if="text" class="text-sm sm:text-base text-gray-600 font-medium">
      {{ text }}
    </p>
  </div>
</template>
