<!-- Loading Component for Page Transitions -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/10 via-purple-50/15 to-pink-50/20">
    <div class="text-center">
      <div
        class="animate-spin rounded-full h-20 w-20 border-b-4 border-t-4 border-[#F5A3B7] mx-auto mb-6"></div>
      <p class="text-gray-700 text-xl font-semibold animate-pulse">
        Loading...
      </p>
      <p class="text-gray-500 text-sm mt-2">Please wait a moment</p>
    </div>
  </div>
</template>

<script setup>
// Enhanced loading component for smooth page transitions
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
