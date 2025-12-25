<template>
  <div class="min-h-screen w-full relative">
    <!-- Dashed Grid Background -->
    <DashedGridBackground v-if="showDashedGrid" />

    <div class="relative z-10">
      <!-- Navigation Bar -->
      <NavBarComponent v-if="showNavbar" />

      <!-- Announcement Banner -->
      <AnnouncementBanner v-if="showBanner" />

      <!-- Main Content Slot -->
      <slot></slot>

      <!-- Footer -->
      <FooterComponent v-if="showFooter" />
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import DashedGridBackground from "./DashedGridBackground.vue";
import NavBarComponent from "./NavBarComponent.vue";
import AnnouncementBanner from "./AnnouncementBanner.vue";
import FooterComponent from "./FooterComponent.vue";

/**
 * PageLayout - Standard page wrapper component
 * 
 * Provides consistent layout structure with:
 * - Dashed grid background
 * - Navigation bar
 * - Announcement banner
 * - Footer
 * 
 * All elements are optional and can be toggled via props
 */
defineProps({
  // Show/hide the navbar
  showNavbar: {
    type: Boolean,
    default: true,
  },
  // Show/hide the announcement banner
  showBanner: {
    type: Boolean,
    default: true,
  },
  // Show/hide the footer
  showFooter: {
    type: Boolean,
    default: true,
  },
  // Show/hide the dashed grid background
  showDashedGrid: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
/* No additional styles needed - layout is handled by the structure */
</style>
