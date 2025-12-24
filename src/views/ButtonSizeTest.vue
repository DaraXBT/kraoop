<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-8 text-center">
        Button Size Consistency Test
      </h1>

      <!-- Size Comparison Section -->
      <div class="space-y-12">
        <!-- Small Size Comparison -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            Small Size (sm)
          </h2>
          <div class="flex flex-wrap gap-4 items-center">
            <LiquidButton size="sm" variant="primary">
              LiquidButton Small
            </LiquidButton>
            <AdvancedLiquidButton size="sm" variant="primary">
              AdvancedLiquid Small
            </AdvancedLiquidButton>
          </div>
        </div>

        <!-- Medium Size Comparison -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            Medium Size (md) - Default
          </h2>
          <div class="flex flex-wrap gap-4 items-center">
            <LiquidButton size="md" variant="primary">
              LiquidButton Medium
            </LiquidButton>
            <AdvancedLiquidButton size="md" variant="primary">
              AdvancedLiquid Medium
            </AdvancedLiquidButton>
          </div>
        </div>

        <!-- Large Size Comparison -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            Large Size (lg)
          </h2>
          <div class="flex flex-wrap gap-4 items-center">
            <LiquidButton size="lg" variant="primary">
              LiquidButton Large
            </LiquidButton>
            <AdvancedLiquidButton size="lg" variant="primary">
              AdvancedLiquid Large
            </AdvancedLiquidButton>
          </div>
        </div>

        <!-- All Variants Side by Side -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            All Variants (Medium Size)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-medium text-white mb-4">LiquidButton</h3>
              <div class="space-y-3">
                <LiquidButton variant="primary">Primary Button</LiquidButton>
                <LiquidButton variant="secondary"
                  >Secondary Button</LiquidButton
                >
                <LiquidButton variant="accent">Accent Button</LiquidButton>
                <LiquidButton variant="danger">Danger Button</LiquidButton>
                <LiquidButton variant="glass">Glass Button</LiquidButton>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-medium text-white mb-4">
                AdvancedLiquidButton
              </h3>
              <div class="space-y-3">
                <AdvancedLiquidButton variant="primary"
                  >Primary Button</AdvancedLiquidButton
                >
                <AdvancedLiquidButton variant="secondary"
                  >Secondary Button</AdvancedLiquidButton
                >
                <AdvancedLiquidButton variant="ghost"
                  >Ghost Button</AdvancedLiquidButton
                >
                <AdvancedLiquidButton variant="outline"
                  >Outline Button</AdvancedLiquidButton
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Border Radius Test -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            Border Radius Consistency
          </h2>
          <p class="text-white/80 mb-4">
            Both buttons should have the same border radius (rounded-xl =
            0.75rem)
          </p>
          <div class="flex flex-wrap gap-4 items-center">
            <LiquidButton variant="primary" class="border-2 border-red-400">
              LiquidButton
            </LiquidButton>
            <AdvancedLiquidButton
              variant="primary"
              class="border-2 border-green-400">
              AdvancedLiquidButton
            </AdvancedLiquidButton>
          </div>
        </div>

        <!-- Width and Height Test -->
        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 class="text-2xl font-semibold text-white mb-4">
            Width & Height Consistency
          </h2>
          <p class="text-white/80 mb-4">
            Buttons with the same content should have similar dimensions
          </p>
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4 items-center">
              <span class="text-white">Short text:</span>
              <LiquidButton variant="primary">Click</LiquidButton>
              <AdvancedLiquidButton variant="primary"
                >Click</AdvancedLiquidButton
              >
            </div>
            <div class="flex flex-wrap gap-4 items-center">
              <span class="text-white">Medium text:</span>
              <LiquidButton variant="primary">Submit Form</LiquidButton>
              <AdvancedLiquidButton variant="primary"
                >Submit Form</AdvancedLiquidButton
              >
            </div>
            <div class="flex flex-wrap gap-4 items-center">
              <span class="text-white">Long text:</span>
              <LiquidButton variant="primary"
                >Continue to Next Step</LiquidButton
              >
              <AdvancedLiquidButton variant="primary"
                >Continue to Next Step</AdvancedLiquidButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LiquidButton from "@/components/LiquidButton.vue";
import AdvancedLiquidButton from "@/components/AdvancedLiquidButton.vue";

export default {
  name: "ButtonSizeTest",
  components: {
    LiquidButton,
    AdvancedLiquidButton,
  },
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
