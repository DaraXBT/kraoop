<script setup>
import {RouterView} from "vue-router";
import ToastNotification from "./components/ToastNotification.vue";
import PageLoader from "./components/PageLoader.vue";
import {useToast} from "./composables/useToast";
import {ref, onErrorCaptured, watch} from "vue";
import {isNavigating} from "./router";

const {toasts, removeToast, error} = useToast();

// Error handling
const hasError = ref(false);
const errorMessage = ref("");

// Watch navigation state and add body class
watch(isNavigating, (isNav) => {
  if (isNav) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

onErrorCaptured((err, instance, info) => {
  console.error("Component error caught:", err, info);
  hasError.value = true;
  errorMessage.value = err.message || "An error occurred";
  error("Something went wrong. Please refresh the page.");
  return false;
});
</script>

<template>
  <!-- Page Transition Wrapper with overflow prevention -->
  <div class="overflow-x-hidden min-h-screen w-full relative">
    <!-- Animated background -->
    <div
      class="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-blue-50/10"></div>

    <!-- Error Boundary -->
    <div
      v-if="hasError"
      class="min-h-screen flex items-center justify-center p-4">
      <div
        class="text-center max-w-md glass-card-strong p-8 rounded-2xl shadow-glass-xl border border-white/30 animate-fade-in">
        <div class="mb-5">
          <div
            class="w-16 h-16 mx-auto bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg
              class="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h1
          class="text-2xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Oops!
        </h1>
        <p class="text-gray-600 mb-6 font-medium text-sm">{{ errorMessage }}</p>
        <button
          @click="() => window.location.reload()"
          class="px-6 py-3 bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] text-white rounded-xl hover:shadow-glass-lg transition-smooth font-bold hover:scale-105 active:scale-95 border-2 border-white/30 text-sm">
          Reload Page
        </button>
      </div>
    </div>

    <!-- Main App Content with Suspense -->
    <RouterView v-else v-slot="{Component, route}">
      <!-- Global Navigation Loading Overlay - Always shows during navigation -->
      <div
        v-show="isNavigating"
        class="fixed inset-0 z-[99] bg-white flex items-center justify-center"
        style="background-color: rgba(255, 255, 255, 0.98)">
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-[#F5A3B7] mx-auto mb-5"
            style="border-width: 3px"></div>
          <p
            class="text-gray-800 text-lg font-bold animate-pulse"
            style="font-weight: 700">
            Loading...
          </p>
          <p class="text-gray-500 text-xs mt-2">Please wait</p>
        </div>
      </div>

      <!-- Suspense with proper fallback - handles async component loading -->
      <Suspense>
        <template #default>
          <Transition name="page" mode="out-in">
            <KeepAlive :max="3">
              <component :is="Component" :key="route.path" />
            </KeepAlive>
          </Transition>
        </template>
        <template #fallback>
          <PageLoader />
        </template>
      </Suspense>
    </RouterView>

    <!-- Toast Container -->
    <div
      class="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <ToastNotification
        v-for="toast in toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        :show="toast.show"
        @close="removeToast(toast.id)"
        class="pointer-events-auto" />
    </div>
  </div>
</template>

<style>
/* Enhanced Page Transition Animations with Glass Effect */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  filter: blur(4px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
  filter: blur(4px);
}

/* Global Navigation Loading Overlay Transition */
.fade-overlay-enter-active {
  transition: opacity 0.15s ease-out;
}

.fade-overlay-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-overlay-enter-from {
  opacity: 0;
}

.fade-overlay-leave-to {
  opacity: 0;
}

.fade-overlay-enter-to,
.fade-overlay-leave-from {
  opacity: 1;
}

/* Prevent horizontal scrolling globally */
html,
body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Smooth scrolling for the entire app */
html {
  scroll-behavior: smooth;
}

/* Ensure all elements respect viewport width */
* {
  max-width: 100%;
}

/* Enhanced iOS-style scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #f5a3b7, #e392a6);
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #e392a6, #d07b8f);
}

/* Selection styling */
::selection {
  background-color: rgba(245, 163, 183, 0.3);
  color: #383838;
}

::-moz-selection {
  background-color: rgba(245, 163, 183, 0.3);
  color: #383838;
}
</style>
