<script setup>
import {ref, watch, onUnmounted, computed} from "vue";
import LiquidButton from "./LiquidButton.vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", // success, error, info, warning
  },
  duration: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const isVisible = ref(props.show);
const toastRef = ref(null);
const touchStartX = ref(0);
const touchEndX = ref(0);
const isDragging = ref(false);
const dragOffset = ref(0);
const progressWidth = ref(100);
const isAnimating = ref(false);

let autoCloseTimer = null;
let progressAnimationFrame = null;
let startTime = null;
let pausedTime = 0;

// Optimized progress animation using CSS transitions
const animateProgress = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime - pausedTime;
  const remaining = Math.max(0, props.duration - elapsed);

  progressWidth.value = (remaining / props.duration) * 100;

  if (remaining > 0 && isAnimating.value) {
    progressAnimationFrame = requestAnimationFrame(animateProgress);
  } else if (remaining <= 0) {
    progressWidth.value = 0;
  }
};

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;

      if (props.duration > 0) {
        // Reset state
        progressWidth.value = 100;
        startTime = null;
        pausedTime = 0;
        isAnimating.value = true;

        // Use requestAnimationFrame for next frame to ensure DOM is ready
        requestAnimationFrame(() => {
          progressAnimationFrame = requestAnimationFrame(animateProgress);
        });

        // Set auto-close timer
        autoCloseTimer = setTimeout(() => {
          closeToast();
        }, props.duration);
      }
    } else {
      isVisible.value = false;
    }
  },
  {immediate: true}
);

onUnmounted(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
  }
  if (progressAnimationFrame) {
    cancelAnimationFrame(progressAnimationFrame);
  }
});

const closeToast = () => {
  isVisible.value = false;
  isAnimating.value = false;
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
  if (progressAnimationFrame) {
    cancelAnimationFrame(progressAnimationFrame);
    progressAnimationFrame = null;
  }
  emit("close");
};

// Optimized touch swipe to dismiss
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
  isDragging.value = true;

  // Add liquid dragging effect
  if (toastRef.value) {
    toastRef.value.classList.add("dragging");
  }

  // Pause timers
  const currentTime = performance.now();
  if (startTime && isAnimating.value) {
    pausedTime = currentTime - startTime - pausedTime;
  }
  isAnimating.value = false;

  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }
  if (progressAnimationFrame) {
    cancelAnimationFrame(progressAnimationFrame);
    progressAnimationFrame = null;
  }
};

const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  touchEndX.value = e.touches[0].clientX;
  dragOffset.value = touchEndX.value - touchStartX.value;

  // Only allow right swipe (positive offset)
  if (dragOffset.value < 0) {
    dragOffset.value = 0;
  }
};

const handleTouchEnd = () => {
  isDragging.value = false;

  // Remove liquid dragging effect
  if (toastRef.value) {
    toastRef.value.classList.remove("dragging");
  }

  // If swiped more than 100px, close the toast
  if (dragOffset.value > 100) {
    closeToast();
  } else {
    // Reset position
    dragOffset.value = 0;

    // Resume auto-close and progress if duration remaining
    if (props.duration > 0 && progressWidth.value > 0) {
      isAnimating.value = true;
      const remainingDuration = (progressWidth.value / 100) * props.duration;

      startTime = performance.now();
      progressAnimationFrame = requestAnimationFrame(animateProgress);

      autoCloseTimer = setTimeout(() => {
        closeToast();
      }, remainingDuration);
    }
  }
};

// Computed styles for better performance with liquid glass effects
const typeStyles = computed(() => {
  const styles = {
    success: {
      bg: "liquid-toast liquid-toast-success",
      border: "",
      text: "text-green-800",
      icon: "text-green-500",
      glow: "shadow-green-400/20",
    },
    error: {
      bg: "liquid-toast liquid-toast-error",
      border: "",
      text: "text-red-800",
      icon: "text-red-500",
      glow: "shadow-red-400/20",
    },
    warning: {
      bg: "liquid-toast liquid-toast-warning",
      border: "",
      text: "text-yellow-800",
      icon: "text-yellow-500",
      glow: "shadow-yellow-400/20",
    },
    info: {
      bg: "liquid-toast liquid-toast-info",
      border: "",
      text: "text-blue-800",
      icon: "text-blue-500",
      glow: "shadow-blue-400/20",
    },
  };
  return styles[props.type] || styles.success;
});

const iconPath = computed(() => {
  const icons = {
    success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    error: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`,
    info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
  };
  return icons[props.type] || icons.success;
});

const transformStyle = computed(() => {
  if (isDragging.value) {
    return {
      transform: `translateX(${dragOffset.value}px)`,
      transition: "none",
    };
  }
  return {
    transform: "",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };
});
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-200 transform"
    enter-from-class="opacity-0 translate-x-full scale-95"
    enter-to-class="opacity-100 translate-x-0 scale-100"
    leave-active-class="transition ease-in duration-150 transform"
    leave-from-class="opacity-100 translate-x-0 scale-100"
    leave-to-class="opacity-0 translate-x-full scale-95">
    <div
      v-if="isVisible"
      ref="toastRef"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      :style="transformStyle"
      :class="[
        typeStyles.bg,
        typeStyles.glow,
        'w-full rounded-2xl sm:rounded-3xl p-3 sm:p-5',
        'touch-pan-y select-none',
        'max-w-full relative',
      ]"
      role="alert"
      aria-live="polite"
      aria-atomic="true">
      <div class="flex items-start gap-2.5 sm:gap-4">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <div
            class="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/50 backdrop-blur-sm">
            <svg
              :class="[typeStyles.icon, 'w-4 h-4 sm:w-6 sm:h-6']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              v-html="iconPath"></svg>
          </div>
        </div>

        <!-- Message -->
        <div class="flex-1 min-w-0 pt-0.5">
          <p
            :class="[
              typeStyles.text,
              'text-xs sm:text-sm md:text-base font-bold leading-relaxed break-words',
            ]">
            {{ message }}
          </p>
          <!-- Swipe hint on mobile (shown briefly) -->
          <p
            v-if="isDragging"
            class="text-[10px] sm:hidden text-gray-500 mt-1 font-medium">
            Swipe right to dismiss →
          </p>
        </div>

        <!-- Close Button -->
        <LiquidButton
          @click="closeToast"
          variant="glass"
          size="sm"
          icon-only
          :class="'flex-shrink-0'"
          aria-label="Close notification">
          <template #icon-left>
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </template>
        </LiquidButton>
      </div>

      <!-- Optimized progress bar -->
      <div
        v-if="props.duration > 0"
        class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-2xl sm:rounded-b-3xl overflow-hidden">
        <div
          :class="[
            typeStyles.icon,
            'h-full bg-current ease-linear origin-left will-change-transform',
          ]"
          :style="{
            width: `${progressWidth}%`,
            opacity: isDragging ? 0.5 : 1,
            transition: 'width 0.05s linear, opacity 0.2s ease',
          }"></div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* CSS Custom Properties for Liquid Animation */
@property --liquid-angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}

@property --liquid-angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}

:root {
  --liquid-anim-time: 400ms;
  --liquid-anim-ease: cubic-bezier(0.25, 1, 0.5, 1);
  --liquid-border-width: clamp(1px, 0.0625em, 2px);
}

/* Base Liquid Toast Styles */
.liquid-toast {
  @apply relative;

  /* Advanced Glass Background */
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.08)
  );

  /* Complex Shadow System */
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(255, 255, 255, 0.3),
    0 3px 6px -2px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2);

  /* Advanced Backdrop Filter */
  backdrop-filter: blur(clamp(2px, 0.125em, 8px));
  -webkit-backdrop-filter: blur(clamp(2px, 0.125em, 8px));

  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

/* Animated Border for Toast */
.liquid-toast::after {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: 1rem; /* sm:1.5rem for responsive */
  padding: var(--liquid-border-width);
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0) 5% 40%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 60% 95%,
    rgba(0, 0, 0, 0.2)
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  animation: liquidBorderRotate 3s linear infinite;
}

@media (min-width: 640px) {
  .liquid-toast::after {
    border-radius: 1.5rem;
  }
}

/* Type-specific Liquid Glass Effects */
.liquid-toast-success {
  background: linear-gradient(
    -75deg,
    rgba(34, 197, 94, 0.08),
    rgba(34, 197, 94, 0.18),
    rgba(34, 197, 94, 0.08)
  );
  border-color: rgba(34, 197, 94, 0.3);
}

.liquid-toast-success::after {
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(34, 197, 94, 0.4),
    rgba(34, 197, 94, 0) 5% 40%,
    rgba(34, 197, 94, 0.4) 50%,
    rgba(34, 197, 94, 0) 60% 95%,
    rgba(34, 197, 94, 0.4)
  );
}

.liquid-toast-error {
  background: linear-gradient(
    -75deg,
    rgba(239, 68, 68, 0.08),
    rgba(239, 68, 68, 0.18),
    rgba(239, 68, 68, 0.08)
  );
  border-color: rgba(239, 68, 68, 0.3);
}

.liquid-toast-error::after {
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(239, 68, 68, 0.4),
    rgba(239, 68, 68, 0) 5% 40%,
    rgba(239, 68, 68, 0.4) 50%,
    rgba(239, 68, 68, 0) 60% 95%,
    rgba(239, 68, 68, 0.4)
  );
}

.liquid-toast-warning {
  background: linear-gradient(
    -75deg,
    rgba(245, 158, 11, 0.08),
    rgba(245, 158, 11, 0.18),
    rgba(245, 158, 11, 0.08)
  );
  border-color: rgba(245, 158, 11, 0.3);
}

.liquid-toast-warning::after {
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(245, 158, 11, 0.4),
    rgba(245, 158, 11, 0) 5% 40%,
    rgba(245, 158, 11, 0.4) 50%,
    rgba(245, 158, 11, 0) 60% 95%,
    rgba(245, 158, 11, 0.4)
  );
}

.liquid-toast-info {
  background: linear-gradient(
    -75deg,
    rgba(59, 130, 246, 0.08),
    rgba(59, 130, 246, 0.18),
    rgba(59, 130, 246, 0.08)
  );
  border-color: rgba(59, 130, 246, 0.3);
}

.liquid-toast-info::after {
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(59, 130, 246, 0.4),
    rgba(59, 130, 246, 0) 5% 40%,
    rgba(59, 130, 246, 0.4) 50%,
    rgba(59, 130, 246, 0) 60% 95%,
    rgba(59, 130, 246, 0.4)
  );
}

/* Border Animation */
@keyframes liquidBorderRotate {
  0% {
    --liquid-angle-1: -75deg;
  }
  100% {
    --liquid-angle-1: 285deg;
  }
}

/* Advanced Shadow and Reflection System */
.liquid-toast::before {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    var(--liquid-angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  background-size: 200% 200%;
  background-position: 0% 50%;
  transition: background-position calc(var(--liquid-anim-time) * 1.25)
      var(--liquid-anim-ease),
    --liquid-angle-2 calc(var(--liquid-anim-time) * 1.25)
      var(--liquid-anim-ease);
  z-index: 1;
}

/* Enhanced Hover Effects for Liquid Glass */
.liquid-toast:hover {
  transform: scale(1.01);
  backdrop-filter: blur(clamp(3px, 0.1875em, 10px));
  -webkit-backdrop-filter: blur(clamp(3px, 0.1875em, 10px));

  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -1px 1px rgba(255, 255, 255, 0.4),
    0 8px 20px -4px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3);
}

.liquid-toast:hover::after {
  --liquid-angle-1: -125deg;
}

.liquid-toast:hover::before {
  background-position: 25% 50%;
}

/* Touch and Drag Interaction Effects */
.liquid-toast.dragging {
  backdrop-filter: blur(clamp(4px, 0.25em, 12px));
  -webkit-backdrop-filter: blur(clamp(4px, 0.25em, 12px));

  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.2),
    0 12px 30px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.liquid-toast.dragging::after {
  animation-play-state: paused;
}

.liquid-toast.dragging::before {
  background-position: 50% 15%;
  --liquid-angle-2: -15deg;
}

/* Performance optimizations for liquid glass */
.liquid-toast {
  contain: layout style paint;
  transform: translateZ(0);
  will-change: transform, backdrop-filter, box-shadow;
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .liquid-toast,
  .liquid-toast::before,
  .liquid-toast::after {
    transition: none;
    animation: none;
  }

  .liquid-toast::after {
    --liquid-angle-1: -75deg;
  }

  .liquid-toast::before {
    background-position: 25% 50%;
    --liquid-angle-2: -45deg;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .liquid-toast:hover {
    transform: none;
  }

  .liquid-toast::after,
  .liquid-toast:hover::after {
    --liquid-angle-1: -75deg;
  }

  .liquid-toast::before,
  .liquid-toast:hover::before {
    --liquid-angle-2: -45deg;
  }
}
/* Optimize rendering with GPU acceleration */
.will-change-transform {
  will-change: width, opacity;
}

/* Improve touch handling */
.touch-pan-y {
  touch-action: pan-y;
}

/* Prevent text selection while dragging */
.select-none {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Smooth transitions with hardware acceleration */
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Better touch targets for mobile */
button {
  min-width: 28px;
  min-height: 28px;
}

@media (min-width: 640px) {
  button {
    min-width: 32px;
    min-height: 32px;
  }
}

/* Performance optimizations */
[role="alert"] {
  contain: layout style paint;
  transform: translateZ(0);
}
</style>
