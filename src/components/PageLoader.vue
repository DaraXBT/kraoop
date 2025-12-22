<!-- Loading Component for Page Transitions -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-16 w-16 border-b-4 border-[#F5A3B7] mx-auto mb-4"></div>
      <p class="text-gray-600 text-lg font-medium">Loading...</p>
    </div>
  </div>
</template>

<script setup>
// Simple loading component for page transitions
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
