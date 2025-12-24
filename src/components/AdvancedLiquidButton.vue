<template>
  <div class="liquid-button-wrap" ref="buttonWrap">
    <button
      ref="button"
      :class="computedClasses"
      :disabled="disabled || loading"
      @click="handleClick"
      @mouseenter="onHover"
      @mouseleave="offHover"
      @mousedown="onActive"
      @mouseup="offActive">
      <!-- Loading spinner -->
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>

      <!-- Icon (left) -->
      <span v-if="$slots['icon-left']" class="mr-3 flex-shrink-0">
        <slot name="icon-left"></slot>
      </span>
      <component
        v-else-if="iconLeft"
        :is="iconLeft"
        class="w-4 h-4 mr-3 flex-shrink-0" />

      <!-- Button content with advanced reflections -->
      <span class="liquid-button-text" v-if="$slots.default">
        <slot></slot>
      </span>

      <!-- Icon (right) -->
      <span v-if="$slots['icon-right']" class="ml-3 flex-shrink-0">
        <slot name="icon-right"></slot>
      </span>
      <component
        v-else-if="iconRight"
        :is="iconRight"
        class="w-4 h-4 ml-3 flex-shrink-0" />
    </button>

    <!-- Advanced shadow element -->
    <div class="liquid-button-shadow"></div>
  </div>
</template>

<script>
export default {
  name: "AdvancedLiquidButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        ["primary", "secondary", "ghost", "outline"].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    iconLeft: {
      type: [String, Object],
      default: null,
    },
    iconRight: {
      type: [String, Object],
      default: null,
    },
    ripple: {
      type: Boolean,
      default: true,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClasses() {
      return [
        // Base liquid button classes
        "liquid-button-advanced",
        `liquid-button-${this.variant}`,
        `liquid-button-${this.size}`,
        {
          "liquid-button-disabled": this.disabled,
          "liquid-button-loading": this.loading,
          "liquid-button-full": this.fullWidth,
        },
      ];
    },
  },
  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) return;

      if (this.ripple) {
        this.addRippleEffect(event);
      }

      this.$emit("click", event);
    },

    addRippleEffect(event) {
      const button = this.$refs.button;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("liquid-ripple-advanced");

      button.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 800);
    },

    onHover() {
      this.$refs.buttonWrap.classList.add("liquid-button-hover");
    },

    offHover() {
      this.$refs.buttonWrap.classList.remove("liquid-button-hover");
    },

    onActive() {
      this.$refs.buttonWrap.classList.add("liquid-button-active");
    },

    offActive() {
      this.$refs.buttonWrap.classList.remove("liquid-button-active");
    },
  },
};
</script>

<style scoped>
/* CSS Custom Properties for Animation */
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
  --liquid-border-width: clamp(1px, 0.0625em, 3px);
}

/* Advanced Liquid Button Container */
.liquid-button-wrap {
  @apply relative inline-block;
  border-radius: inherit;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
  min-width: fit-content;
  /* No max-width constraint - allow natural flex growth */
  /* Ensure flexibility in flex containers */
  width: auto;
}

/* Advanced Shadow Element */
.liquid-button-shadow {
  @apply absolute pointer-events-none;
  --shadow-offset: 1.5em;
  width: calc(100% + var(--shadow-offset));
  height: calc(100% + var(--shadow-offset));
  top: calc(0% - var(--shadow-offset) / 2);
  left: calc(0% - var(--shadow-offset) / 2);
  border-radius: inherit;
  filter: blur(clamp(2px, 0.125em, 8px));
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

.liquid-button-shadow::after {
  @apply absolute;
  content: "";
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.05));
  width: calc(100% - var(--shadow-offset) - 0.25em);
  height: calc(100% - var(--shadow-offset) - 0.25em);
  top: calc(var(--shadow-offset) / 2 - 0.25em);
  left: calc(var(--shadow-offset) / 2 - 0.5em);
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

/* Base Button Styles */
.liquid-button-advanced {
  @apply relative cursor-pointer select-none;
  @apply font-medium tracking-tight;
  @apply border-0 outline-none;
  @apply transition-all duration-300;
  @apply inline-flex items-center justify-center; /* Add flex layout for proper alignment */
  border-radius: inherit;

  /* Ensure flexible width behavior */
  width: 100%;

  /* Advanced Glass Background */
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );

  /* Complex Shadow System */
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(255, 255, 255, 0.3),
    0 3px 6px -2px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 0 0 rgba(255, 255, 255, 1);

  /* Advanced Backdrop Filter */
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));
}

/* Button Text with Advanced Reflections */
.liquid-button-text {
  @apply relative block;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

/* Primary Reflection Layer */
.liquid-button-text::before {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    var(--liquid-angle-2),
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.4) 40% 50%,
    rgba(255, 255, 255, 0) 55%
  );
  mix-blend-mode: screen;
  background-size: 200% 200%;
  background-position: 0% 50%;
  transition: background-position calc(var(--liquid-anim-time) * 1.25)
      var(--liquid-anim-ease),
    --liquid-angle-2 calc(var(--liquid-anim-time) * 1.25)
      var(--liquid-anim-ease);
}

/* Animated Border */
.liquid-button-advanced::after {
  content: "";
  @apply absolute pointer-events-none;
  inset: 0;
  border-radius: inherit; /* Match LiquidButton's rounded-xl */
  padding: var(--liquid-border-width);
  background: conic-gradient(
    from var(--liquid-angle-1) at 50% 50%,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0) 5% 40%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0) 60% 95%,
    rgba(0, 0, 0, 0.3)
  );
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: xor;
  transition: all var(--liquid-anim-time) var(--liquid-anim-ease);
}

/* Size Variants - Match LiquidButton exactly */
.liquid-button-sm {
  @apply px-3 py-1.5 text-xs; /* Match LiquidButton small exactly */
}

.liquid-button-md {
  @apply px-6 py-3 text-sm; /* Match LiquidButton default size exactly */
}

.liquid-button-lg {
  @apply px-8 py-4 text-base; /* Match LiquidButton large exactly */
}

/* Full Width Variant */
.liquid-button-full {
  @apply w-full;
}

.liquid-button-full .liquid-button-wrap {
  @apply w-full block;
}

.liquid-button-full .liquid-button-advanced {
  @apply w-full;
}

/* Color Variants */
.liquid-button-primary {
  @apply text-gray-900;
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.18),
    rgba(255, 255, 255, 0.08)
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.liquid-button-secondary {
  @apply text-gray-600;
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.03),
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.03)
  );
}

.liquid-button-ghost {
  @apply text-white;
  background: linear-gradient(
    -75deg,
    rgba(255, 255, 255, 0.02),
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
}

/* Hover Effects */
.liquid-button-hover .liquid-button-advanced {
  transform: scale(0.98);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.7),
    inset 0 -1px 1px rgba(255, 255, 255, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3), 0 0 0 0 rgba(255, 255, 255, 1);
}

.liquid-button-hover .liquid-button-advanced::after {
  --liquid-angle-1: -125deg;
}

.liquid-button-hover .liquid-button-text::before {
  background-position: 25% 50%;
}

.liquid-button-hover .liquid-button-shadow {
  filter: blur(clamp(1px, 0.0625em, 4px));
}

/* Active Effects */
.liquid-button-active {
  transform: rotate3d(1, 0, 0, 15deg);
}

.liquid-button-active .liquid-button-advanced {
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1px rgba(255, 255, 255, 0.2),
    0 1px 3px -1px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.15),
    0 2px 0 0 rgba(255, 255, 255, 0.6), inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.liquid-button-active .liquid-button-text::before {
  background-position: 50% 15%;
  --liquid-angle-2: -15deg;
}

.liquid-button-active .liquid-button-shadow {
  filter: blur(clamp(2px, 0.125em, 10px));
}

/* Disabled State */
.liquid-button-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Advanced Ripple Effect */
.liquid-ripple-advanced {
  @apply absolute rounded-full pointer-events-none;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: scale(0);
  animation: liquidRipple 800ms cubic-bezier(0.25, 1, 0.5, 1);
  mix-blend-mode: screen;
}

@keyframes liquidRipple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
  .liquid-button-advanced::after,
  .liquid-button-hover .liquid-button-advanced::after,
  .liquid-button-active .liquid-button-advanced::after {
    --liquid-angle-1: -75deg;
  }

  .liquid-button-text::before,
  .liquid-button-active .liquid-button-text::before {
    --liquid-angle-2: -45deg;
  }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
  .liquid-button-wrap,
  .liquid-button-advanced,
  .liquid-button-shadow,
  .liquid-button-text {
    transition: none;
  }

  .liquid-button-text::before {
    animation: none;
    background-position: 25% 50%;
  }
}
</style>
