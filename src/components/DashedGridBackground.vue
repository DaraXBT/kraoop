<template>
  <div
    class="absolute inset-0 z-0"
    style="
      background-image: linear-gradient(
          to right,
          #e7e5e4 1px,
          transparent 1px
        ),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
      background-size: 20px 20px;
      background-position: 0 0, 0 0;
      mask-image: repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        );
      -webkit-mask-image: repeating-linear-gradient(
          to right,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        ),
        repeating-linear-gradient(
          to bottom,
          black 0px,
          black 3px,
          transparent 3px,
          transparent 8px
        );
      mask-composite: intersect;
      -webkit-mask-composite: source-in;
    "></div>
</template>

<script setup>
// Reusable dashed grid background pattern
// Used across all pages for consistent aesthetic
</script>

<style scoped>
/* No additional styles needed - all styling is inline for this component */
</style>
