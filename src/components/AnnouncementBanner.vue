<template>
  <div
    v-if="showBanner"
    class="relative isolate flex items-center gap-x-6 overflow-hidden liquid-glass-banner px-6 py-1.5 sm:py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1">
    <!-- Marquee Content -->
    <div class="flex-1 min-w-0 overflow-hidden">
      <div class="marquee-container">
        <div class="marquee-content">
          <span class="marquee-item" id="marquee-text">
            <strong class="font-semibold">KRAOOP Beauty Sale 2025</strong>
            <svg
              viewBox="0 0 2 2"
              class="mx-2 inline size-0.5 fill-current"
              aria-hidden="true">
              <circle cx="1" cy="1" r="1" />
            </svg>
            Get 25% off all skincare products – Limited time offer ending soon!
          </span>
        </div>
      </div>
    </div>

    <div class="flex flex-none justify-end">
      <button
        type="button"
        class="-m-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        @click="dismissBanner">
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5 text-gray-100" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {XMarkIcon} from "@heroicons/vue/20/solid";
import LiquidButton from "./LiquidButton.vue";

// Banner visibility state
const showBanner = ref(true);

// Banner dismiss function
const dismissBanner = () => {
  showBanner.value = false;
};
</script>

<style scoped>
/* Liquid Glass Banner Styling - Pink Primary */
.liquid-glass-banner {
  /* Pink-tinted glass background */
  background: linear-gradient(
    -75deg,
    rgba(236, 72, 153, 0.08),
    rgba(236, 72, 153, 0.18),
    rgba(236, 72, 153, 0.08)
  );

  /* Enhanced backdrop filter with pink tint */
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));

  /* Pink-tinted border */
  border: 1px solid rgba(236, 72, 153, 0.3);

  /* Subtle pink glow */
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(236, 72, 153, 0.1);
}

/* Marquee Animation - Edge to Edge for All Devices */
.marquee-container {
  overflow: hidden;
  width: 100%;
  position: relative;
}

.marquee-content {
  display: flex;
  align-items: center;
  width: max-content;
  position: relative;
  animation: marquee-loop 18s linear infinite;
}

.marquee-content::after {
  content: attr(data-text);
  display: inline-block;
  white-space: nowrap;
  margin-left: 8rem;
  color: inherit;
  font: inherit;
  font-weight: inherit;
  pointer-events: none;
  opacity: 0.5;
}

.marquee-content[data-text]::after {
  opacity: 1;
}

.marquee-item {
  @apply text-sm/6 text-gray-900 font-medium;
  white-space: nowrap;
  margin-right: 8rem;
  flex-shrink: 0;
}

@keyframes marquee-loop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-content:hover {
  animation-play-state: paused;
}

/* Responsive adjustments for all devices */

@media (max-width: 480px) {
  .marquee-content {
    animation-duration: 20s;
  }
  .marquee-item {
    @apply text-xs;
    margin-right: 4rem;
  }
  .marquee-content::after {
    margin-left: 4rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .marquee-content {
    animation-duration: 22s;
  }
  .marquee-item {
    margin-right: 6rem;
  }
  .marquee-content::after {
    margin-left: 6rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .marquee-content {
    animation-duration: 25s;
  }
  .marquee-item {
    margin-right: 8rem;
  }
  .marquee-content::after {
    margin-left: 8rem;
  }
}

@media (min-width: 1025px) {
  .marquee-content {
    animation-duration: 30s;
  }
  .marquee-item {
    margin-right: 10rem;
  }
  .marquee-content::after {
    margin-left: 10rem;
  }
}

/* Performance optimization */
.marquee-content {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
