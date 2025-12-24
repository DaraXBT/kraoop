<script setup>
import NavbarComponent from "../components/NavBarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import LiquidButton from "../components/LiquidButton.vue";
</script>

<template>
  <div class="min-h-screen w-full relative">
    <!-- Dashed Grid -->
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

    <div class="relative z-10">
      <!-- Navbar -->
      <NavbarComponent />

      <!-- Hero Section with iOS-inspired gradient -->
      <div
        class="w-full bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-pink-50/50 py-12 sm:py-16 lg:py-20 px-4">
        <div class="w-full max-w-7xl mx-auto text-center">
          <h1
            class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#383838] mb-4 sm:mb-6">
            About <span class="text-[#F5A3B7]">Kraoop Beauty</span>
          </h1>
          <p
            class="text-base sm:text-lg lg:text-xl text-[#697586] max-w-3xl mx-auto px-4">
            Discover nature's beauty with our natural care products. We believe
            in harnessing the power of natural ingredients to bring out your
            inner radiance.
          </p>
        </div>
      </div>

      <!-- Our Story Section -->
      <div
        class="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2
              class="text-3xl sm:text-4xl font-bold text-[#383838] mb-4 sm:mb-6">
              Our Story
            </h2>
            <p class="text-sm sm:text-base text-[#697586] leading-relaxed mb-4">
              Founded in the heart of Phnom Penh, Cambodia, Kraoop Beauty was
              born from a passion for natural skincare and a commitment to
              sustainability. Our journey began with a simple belief: beauty
              should be natural, ethical, and accessible to everyone.
            </p>
            <p class="text-sm sm:text-base text-[#697586] leading-relaxed mb-4">
              We carefully curate and create products that combine ancient
              beauty secrets with modern science. Each product is crafted with
              love, using ingredients sourced responsibly from nature.
            </p>
            <p class="text-sm sm:text-base text-[#697586] leading-relaxed">
              Today, we're proud to serve customers who share our values of
              sustainability, cruelty-free beauty, and the celebration of
              natural ingredients.
            </p>
          </div>
          <div class="rounded-2xl overflow-hidden">
            <img
              src="../assets/images/innisfree.jpg"
              alt="Our Story"
              class="w-full h-64 sm:h-80 lg:h-[500px] object-cover" />
          </div>
        </div>
      </div>

      <!-- Our Values Section with iOS-inspired background -->
      <div
        class="w-full bg-gradient-to-br from-gray-50/80 via-purple-50/30 to-pink-50/30 py-12 sm:py-16 lg:py-20 px-4">
        <div class="w-full max-w-7xl mx-auto">
          <h2
            class="text-3xl sm:text-4xl font-bold text-[#383838] text-center mb-10 sm:mb-12 lg:mb-16">
            Our Values
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <!-- Value 1 -->
            <div class="bg-white p-8 rounded-xl hover: transition-shadow">
              <div
                class="w-16 h-16 bg-[#F5A3B7] bg-opacity-20 rounded-full flex items-center justify-center mb-6">
                <svg
                  class="w-8 h-8 text-[#F5A3B7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-[#383838] mb-4">
                100% Natural
              </h3>
              <p class="text-[#697586] leading-relaxed">
                We use only the finest natural ingredients, carefully selected
                for their purity and effectiveness. No harmful chemicals, just
                nature's best.
              </p>
            </div>

            <!-- Value 2 -->
            <div class="bg-white p-8 rounded-xl hover: transition-shadow">
              <div
                class="w-16 h-16 bg-[#B2D8B7] bg-opacity-30 rounded-full flex items-center justify-center mb-6">
                <svg
                  class="w-8 h-8 text-[#4A9B52]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-[#383838] mb-4">
                Cruelty-Free
              </h3>
              <p class="text-[#697586] leading-relaxed">
                We love animals and never test on them. Our products are
                certified cruelty-free, ensuring ethical beauty for conscious
                consumers.
              </p>
            </div>

            <!-- Value 3 -->
            <div class="bg-white p-8 rounded-xl hover: transition-shadow">
              <div
                class="w-16 h-16 bg-[#A6CAF0] bg-opacity-30 rounded-full flex items-center justify-center mb-6">
                <svg
                  class="w-8 h-8 text-[#4A90E2]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-2xl font-semibold text-[#383838] mb-4">
                Eco-Friendly
              </h3>
              <p class="text-[#697586] leading-relaxed">
                Sustainability is at our core. From recyclable packaging to
                sustainable sourcing, we minimize our environmental impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Our Mission Section -->
      <div
        class="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div class="rounded-2xl overflow-hidden">
            <img
              src="../assets/images/sunscreen.jpg"
              alt="Our Mission"
              class="w-full h-64 sm:h-80 lg:h-[500px] object-cover" />
          </div>
          <div>
            <h2
              class="text-3xl sm:text-4xl font-bold text-[#383838] mb-4 sm:mb-6">
              Our Mission
            </h2>
            <p class="text-sm sm:text-base text-[#697586] leading-relaxed mb-4">
              At Kraoop Beauty, our mission is to empower individuals to embrace
              their natural beauty through sustainable, ethical, and effective
              skincare products.
            </p>
            <p
              class="text-sm sm:text-base text-[#697586] leading-relaxed mb-4 sm:mb-6">
              We strive to:
            </p>
            <ul class="space-y-3 mb-4 sm:mb-6">
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-[#F5A3B7] mr-3 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-[#697586]"
                  >Provide high-quality natural skincare that delivers real
                  results</span
                >
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-[#F5A3B7] mr-3 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-[#697586]"
                  >Champion ethical practices and cruelty-free beauty</span
                >
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-[#F5A3B7] mr-3 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-[#697586]"
                  >Protect our planet through sustainable and eco-friendly
                  practices</span
                >
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-[#F5A3B7] mr-3 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-[#697586]"
                  >Make natural beauty accessible to everyone</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="w-full bg-[#F9F9F9] py-12 sm:py-16 lg:py-20 px-4">
        <div class="w-full max-w-7xl mx-auto">
          <h2
            class="text-3xl sm:text-4xl font-bold text-[#383838] text-center mb-4 sm:mb-6">
            Meet Our Team
          </h2>
          <p
            class="text-sm sm:text-base text-[#697586] text-center mb-10 sm:mb-12 lg:mb-16 max-w-2xl mx-auto px-4">
            Our passionate team of skincare experts and enthusiasts work
            tirelessly to bring you the best natural beauty products.
          </p>
          <div
            class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            <!-- Team Member 1 -->
            <div class="text-center">
              <div
                class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[#F5A3B7] to-[#FFC0CB] overflow-hidden">
                <img
                  src="../assets/images/jennie.png"
                  alt="Team Member"
                  class="w-full h-full object-cover" />
              </div>
              <h3
                class="text-base sm:text-lg lg:text-xl font-semibold text-[#383838] mb-1">
                Sarah Johnson
              </h3>
              <p
                class="text-sm sm:text-base text-[#F5A3B7] font-medium mb-1 sm:mb-2">
                Founder & CEO
              </p>
              <p class="text-xs sm:text-sm text-[#697586]">Skincare Expert</p>
            </div>

            <!-- Team Member 2 -->
            <div class="text-center">
              <div
                class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[#A6CAF0] to-[#B2D8E8] flex items-center justify-center">
                <span
                  class="text-4xl sm:text-5xl lg:text-6xl text-white font-bold"
                  >MK</span
                >
              </div>
              <h3
                class="text-base sm:text-lg lg:text-xl font-semibold text-[#383838] mb-1">
                Michael Kim
              </h3>
              <p
                class="text-sm sm:text-base text-[#F5A3B7] font-medium mb-1 sm:mb-2">
                Chief Product Officer
              </p>
              <p class="text-xs sm:text-sm text-[#697586]">
                Formulation Specialist
              </p>
            </div>

            <!-- Team Member 3 -->
            <div class="text-center">
              <div
                class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[#B2D8B7] to-[#C8E6C9] flex items-center justify-center">
                <span
                  class="text-4xl sm:text-5xl lg:text-6xl text-white font-bold"
                  >EP</span
                >
              </div>
              <h3
                class="text-base sm:text-lg lg:text-xl font-semibold text-[#383838] mb-1">
                Emma Patel
              </h3>
              <p
                class="text-sm sm:text-base text-[#F5A3B7] font-medium mb-1 sm:mb-2">
                Head of Research
              </p>
              <p class="text-xs sm:text-sm text-[#697586]">
                Botanist & Chemist
              </p>
            </div>

            <!-- Team Member 4 -->
            <div class="text-center">
              <div
                class="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-[#FFD1DC] to-[#FFB6C1] flex items-center justify-center">
                <span
                  class="text-4xl sm:text-5xl lg:text-6xl text-white font-bold"
                  >DL</span
                >
              </div>
              <h3
                class="text-base sm:text-lg lg:text-xl font-semibold text-[#383838] mb-1">
                David Lee
              </h3>
              <p
                class="text-sm sm:text-base text-[#F5A3B7] font-medium mb-1 sm:mb-2">
                Sustainability Director
              </p>
              <p class="text-xs sm:text-sm text-[#697586]">
                Environmental Expert
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA Section -->
      <div
        class="w-full max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div
          class="bg-gradient-to-r from-[#F5A3B7] to-[#FFC0CB] rounded-2xl p-8 sm:p-12 lg:p-16 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Join Our Beauty Community
          </h2>
          <p
            class="text-white text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Stay connected with us for exclusive offers, beauty tips, and the
            latest product launches. Together, let's embrace natural beauty!
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <LiquidButton
              variant="primary"
              size="lg"
              tag="router-link"
              to="/product">
              Shop Now
            </LiquidButton>
            <button
              class="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-center text-sm sm:text-base font-semibold text-white bg-transparent border-2 border-white rounded-lg hover:bg-white hover:text-[#F5A3B7] transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <FooterComponent />
    </div>
  </div>
</template>

<style scoped>
/* Add any additional custom styles if needed */
</style>
