<template>
  <div
    class="relative isolate overflow-hidden liquid-glass-banner py-1.5 sm:py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
    <!-- Marquee Content - Full Width Edge to Edge -->
    <div class="w-full overflow-hidden">
      <div class="marquee-container">
        <div
          class="marquee-content"
          :data-text="'KRAOOP Beauty Sale 2025 \u00A0\u00A0·\u00A0\u00A0 Get 25% off all skincare products – Limited time offer ending soon!'"
        >
          <span class="marquee-item">
            KRAOOP Beauty Sale 2025 &nbsp;&nbsp;·&nbsp;&nbsp; Get 25% off all skincare products – Limited time offer ending soon!
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No imports or state needed - banner is always visible
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

/* Marquee Animation - Edge to Edge for All Devices - OPTIMIZED */
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
  animation: marquee-loop 20s linear infinite;
  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0) translateX(0);
  backface-visibility: hidden;
}

.marquee-content::after {
  content: attr(data-text);
  display: inline-block;
  white-space: nowrap;
  margin-left: 2rem;
  color: inherit;
  font-size: 0.75rem; /* text-xs */
  font-weight: 400; /* font-normal */
  pointer-events: none;
}

.marquee-content[data-text]::after {
  opacity: 1;
}

.marquee-item {
  @apply text-xs text-gray-900 font-normal;
  white-space: nowrap;
  margin-right: 2rem;
  flex-shrink: 0;
}

.bullet-separator {
  font-size: 0.5rem;
  display: inline-block;
  vertical-align: middle;
}

@keyframes marquee-loop {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

.marquee-content:hover {
  animation-play-state: paused;
}

/* Responsive adjustments for all devices */

@media (max-width: 480px) {
  .marquee-content {
    animation-duration: 15s;
  }
  .marquee-item {
    @apply text-xs;
    margin-right: 1.5rem;
  }
  .marquee-content::after {
    margin-left: 1.5rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .marquee-content {
    animation-duration: 18s;
  }
  .marquee-item {
    margin-right: 2rem;
  }
  .marquee-content::after {
    margin-left: 2rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .marquee-content {
    animation-duration: 22s;
  }
  .marquee-item {
    margin-right: 2.5rem;
  }
  .marquee-content::after {
    margin-left: 2.5rem;
  }
}

@media (min-width: 1025px) {
  .marquee-content {
    animation-duration: 25s;
  }
  .marquee-item {
    margin-right: 3rem;
  }
  .marquee-content::after {
    margin-left: 3rem;
  }
}

/* Performance optimization */
.marquee-content {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style>
