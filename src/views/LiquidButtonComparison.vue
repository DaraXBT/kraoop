<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
    <!-- Background Pattern -->
    <svg
      class="absolute inset-0 w-full h-full opacity-20"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="liquidGrid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.3)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#liquidGrid)" />
    </svg>

    <div class="relative z-10 container mx-auto px-6 py-12">
      <div class="max-w-6xl mx-auto space-y-16">
        <!-- Header -->
        <div class="text-center space-y-6">
          <h1 class="text-5xl font-bold text-white mb-4">
            Advanced Liquid Glass Buttons
          </h1>
          <p class="text-xl text-white/80 max-w-2xl mx-auto">
            Comparing our original liquid glass implementation with the advanced
            version featuring CSS custom properties, conic gradients, and
            complex animations.
          </p>
        </div>

        <!-- Comparison Section -->
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Original Implementation -->
          <div class="space-y-8">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-white mb-2">
                Original Implementation
              </h2>
              <p class="text-white/70">
                Basic liquid glass with static effects
              </p>
            </div>

            <div
              class="p-8 rounded-3xl backdrop-blur-sm bg-white/10 border border-white/20 space-y-6"
              style="
                background-image: url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&auto=format&fit=crop&q=90');
              ">
              <!-- Original buttons -->
              <div class="flex flex-col items-center space-y-4">
                <button class="liquid-glass-btn">Standard Button</button>

                <button
                  class="liquid-glass-btn"
                  @click="showToast('Original button clicked!')">
                  With Click Action
                </button>

                <button class="liquid-glass-btn" disabled>
                  Disabled State
                </button>
              </div>

              <!-- Features list -->
              <div class="mt-6 space-y-2 text-sm text-white/90">
                <h3 class="font-semibold text-white">Features:</h3>
                <ul class="space-y-1 pl-4">
                  <li>• Static backdrop blur</li>
                  <li>• Basic inset shadows</li>
                  <li>• Simple gradient overlays</li>
                  <li>• Static border styling</li>
                  <li>• Basic hover effects</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Advanced Implementation -->
          <div class="space-y-8">
            <div class="text-center">
              <h2 class="text-2xl font-bold text-white mb-2">
                Advanced Implementation
              </h2>
              <p class="text-white/70">
                CSS custom properties + animated gradients
              </p>
            </div>

            <div
              class="p-8 rounded-3xl backdrop-blur-sm bg-white/10 border border-white/20 space-y-6"
              style="
                background-image: url('https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&auto=format&fit=crop&q=90');
              ">
              <!-- Advanced buttons -->
              <div class="flex flex-col items-center space-y-4">
                <AdvancedLiquidButton size="md" variant="primary">
                  Advanced Button
                </AdvancedLiquidButton>

                <AdvancedLiquidButton
                  size="md"
                  variant="secondary"
                  @click="showToast('Advanced button clicked!')">
                  With Ripple Effect
                </AdvancedLiquidButton>

                <AdvancedLiquidButton
                  size="md"
                  variant="ghost"
                  :loading="isLoading"
                  @click="toggleLoading">
                  {{ isLoading ? "Loading..." : "Toggle Loading" }}
                </AdvancedLiquidButton>

                <AdvancedLiquidButton size="md" disabled>
                  Disabled State
                </AdvancedLiquidButton>
              </div>

              <!-- Features list -->
              <div class="mt-6 space-y-2 text-sm text-white/90">
                <h3 class="font-semibold text-white">Features:</h3>
                <ul class="space-y-1 pl-4">
                  <li>• Animated CSS custom properties</li>
                  <li>• Conic gradient borders</li>
                  <li>• Complex shadow system</li>
                  <li>• Flowing light reflections</li>
                  <li>• 3D transform interactions</li>
                  <li>• Responsive scaling with clamp()</li>
                  <li>• Advanced ripple effects</li>
                  <li>• Touch device optimizations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Size Variations -->
        <div class="text-center space-y-8">
          <h2 class="text-3xl font-bold text-white">Size Variations</h2>

          <div class="flex flex-wrap justify-center items-end gap-6">
            <AdvancedLiquidButton size="xs" variant="primary"
              >XS</AdvancedLiquidButton
            >
            <AdvancedLiquidButton size="sm" variant="primary"
              >Small</AdvancedLiquidButton
            >
            <AdvancedLiquidButton size="md" variant="primary"
              >Medium</AdvancedLiquidButton
            >
            <AdvancedLiquidButton size="lg" variant="primary"
              >Large</AdvancedLiquidButton
            >
            <AdvancedLiquidButton size="xl" variant="primary"
              >Extra Large</AdvancedLiquidButton
            >
          </div>
        </div>

        <!-- Variant Showcase -->
        <div class="text-center space-y-8">
          <h2 class="text-3xl font-bold text-white">Style Variants</h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">Primary</h3>
              <AdvancedLiquidButton variant="primary" size="md">
                Primary Button
              </AdvancedLiquidButton>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">Secondary</h3>
              <AdvancedLiquidButton variant="secondary" size="md">
                Secondary Button
              </AdvancedLiquidButton>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">Ghost</h3>
              <AdvancedLiquidButton variant="ghost" size="md">
                Ghost Button
              </AdvancedLiquidButton>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-white">Outline</h3>
              <AdvancedLiquidButton variant="outline" size="md">
                Outline Button
              </AdvancedLiquidButton>
            </div>
          </div>
        </div>

        <!-- Technical Comparison -->
        <div class="grid lg:grid-cols-2 gap-12">
          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-white">Original CSS Approach</h3>
            <pre
              class="bg-black/30 rounded-xl p-6 text-green-300 text-sm overflow-x-auto"><code>.liquid-glass-btn {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    inset 0 1px 0px rgba(255, 255, 255, 0.75),
    0 0 9px rgba(0, 0, 0, 0.2);
}

.liquid-glass-btn::before {
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.6) 0%,
    transparent 50%
  );
}</code></pre>
          </div>

          <div class="space-y-6">
            <h3 class="text-2xl font-bold text-white">Advanced CSS Approach</h3>
            <pre
              class="bg-black/30 rounded-xl p-6 text-green-300 text-sm overflow-x-auto"><code>@property --liquid-angle-1 {
  syntax: "&lt;angle&gt;";
  initial-value: -75deg;
}

.liquid-button-advanced {
  background: conic-gradient(
    from var(--liquid-angle-1),
    rgba(0, 0, 0, 0.3),
    transparent 40%,
    rgba(0, 0, 0, 0.3) 50%
  );
  backdrop-filter: blur(clamp(1px, 0.125em, 4px));
  transition: --liquid-angle-1 400ms ease;
}

.liquid-button-hover::after {
  --liquid-angle-1: -125deg;
}</code></pre>
          </div>
        </div>

        <!-- Performance Notes -->
        <div
          class="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-8 space-y-4">
          <h3 class="text-xl font-bold text-yellow-200">
            ⚡ Performance Considerations
          </h3>
          <div class="grid md:grid-cols-2 gap-6 text-yellow-100/90">
            <div>
              <h4 class="font-semibold mb-2">Browser Support</h4>
              <ul class="space-y-1 text-sm">
                <li>• @property: Chrome 85+, Firefox 128+</li>
                <li>• :has(): Chrome 105+, Firefox 121+</li>
                <li>• conic-gradient: All modern browsers</li>
                <li>• backdrop-filter: Most modern browsers</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Optimizations</h4>
              <ul class="space-y-1 text-sm">
                <li>• Transform-based animations</li>
                <li>• Hardware acceleration</li>
                <li>• Reduced motion support</li>
                <li>• Touch device fallbacks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast notifications -->
    <ToastNotification
      v-if="toast.show"
      :message="toast.message"
      :type="toast.type"
      @close="toast.show = false" />
  </div>
</template>

<script>
import AdvancedLiquidButton from "@/components/AdvancedLiquidButton.vue";
import ToastNotification from "@/components/ToastNotification.vue";

export default {
  name: "LiquidButtonComparison",
  components: {
    AdvancedLiquidButton,
    ToastNotification,
  },
  data() {
    return {
      isLoading: false,
      toast: {
        show: false,
        message: "",
        type: "info",
      },
    };
  },
  methods: {
    showToast(message, type = "info") {
      this.toast = {
        show: true,
        message,
        type,
      };

      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },

    async toggleLoading() {
      this.isLoading = true;
      this.showToast("Loading started...", "info");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.isLoading = false;
      this.showToast("Loading completed!", "success");
    },
  },
};
</script>

<style scoped>
/* This ensures our original liquid glass styles are available */
@import "@/style.css";
</style>
