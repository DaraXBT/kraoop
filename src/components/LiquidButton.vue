<template>
  <component
    :is="tag"
    ref="button"
    :class="computedClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
    @mouseenter="onHover"
    @mouseleave="offHover"
    @mousedown="onActive"
    @mouseup="offActive">
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
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
    <slot name="icon-left" v-if="$slots['icon-left']"></slot>
    <component v-else-if="iconLeft" :is="iconLeft" :class="iconClasses" />

    <!-- Button content -->
    <span v-if="$slots.default" class="relative z-10">
      <slot></slot>
    </span>

    <!-- Icon (right) -->
    <slot name="icon-right" v-if="$slots['icon-right']"></slot>
    <component
      v-else-if="iconRight"
      :is="iconRight"
      :class="[iconClasses, 'ml-2']" />

    <!-- Ripple effect container -->
    <span
      ref="rippleContainer"
      class="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"></span>
  </component>
</template>

<script>
export default {
  name: "LiquidButton",
  props: {
    // Button variants
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        ["primary", "secondary", "accent", "danger", "glass", "ghost"].includes(value),
    },

    // Button sizes
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },

    // HTML tag to render
    tag: {
      type: String,
      default: "button",
    },

    // States
    disabled: {
      type: Boolean,
      default: false,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    // Layout
    fullWidth: {
      type: Boolean,
      default: false,
    },

    // Icons
    iconLeft: {
      type: [String, Object],
      default: null,
    },

    iconRight: {
      type: [String, Object],
      default: null,
    },

    // Icon only button
    iconOnly: {
      type: Boolean,
      default: false,
    },

    // Enable ripple effect
    ripple: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    computedClasses() {
      const baseClasses = [];

      // Base liquid glass button class
      baseClasses.push("liquid-glass-btn");

      // Variant classes
      switch (this.variant) {
        case "primary":
          baseClasses.push("liquid-glass-btn-primary");
          break;
        case "secondary":
          baseClasses.push("liquid-glass-btn-secondary");
          break;
        case "accent":
          baseClasses.push("liquid-glass-btn-accent");
          break;
        case "danger":
          baseClasses.push("liquid-glass-btn-danger");
          break;
        case "glass":
          baseClasses.push("liquid-glass-btn-glass");
          break;
        case "ghost":
          baseClasses.push("liquid-glass-btn-ghost");
          break;
      }

      // Size classes
      switch (this.size) {
        case "sm":
          baseClasses.push("liquid-glass-btn-sm");
          break;
        case "lg":
          baseClasses.push("liquid-glass-btn-lg");
          break;
      }

      // Layout classes
      if (this.fullWidth) {
        baseClasses.push("liquid-glass-btn-full");
      }

      if (this.iconOnly) {
        baseClasses.push("liquid-glass-btn-icon");
        if (this.size === "sm") {
          baseClasses.push("liquid-glass-btn-icon-sm");
        }
      }

      return baseClasses;
    },

    iconClasses() {
      return [
        "flex-shrink-0",
        this.size === "sm"
          ? "w-3 h-3"
          : this.size === "lg"
          ? "w-5 h-5"
          : "w-4 h-4",
        this.iconOnly ? "" : "mr-2",
      ];
    },
  },

  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault();
        return;
      }

      // Add ripple effect
      if (this.ripple) {
        this.createRipple(event);
      }

      // Note: We don't emit a custom click event here because v-bind="$attrs"
      // already passes through the native click event to the parent component.
      // Emitting would cause the handler to fire twice in Vue 3.
    },

    createRipple(event) {
      const button = this.$refs.rippleContainer || event.currentTarget;
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("liquid-ripple");

      button.appendChild(ripple);

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 800);
    },

    onHover() {
      this.$el.classList.add("liquid-button-hover");
    },

    offHover() {
      this.$el.classList.remove("liquid-button-hover");
    },

    onActive() {
      this.$el.classList.add("liquid-button-active");
    },

    offActive() {
      this.$el.classList.remove("liquid-button-active");
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

/* Enhanced Ripple Effect */
.liquid-ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: liquidRipple 800ms cubic-bezier(0.25, 1, 0.5, 1);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  mix-blend-mode: screen;
  pointer-events: none;
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
</style>
