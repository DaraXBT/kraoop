<script setup>
import {ref} from "vue";
import LiquidButton from "./LiquidButton.vue";

const email = ref("");

const handleSubscribe = () => {
  if (email.value) {
    console.log("Subscribing email:", email.value);
    // Add your subscription logic here
    email.value = "";
  }
};
</script>

<template>
  <div class="flex flex-col justify-center container-footer overflow-hidden">
    <div class="w-full relative overflow-hidden">
      <!-- Glass effect background -->
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-900/95 to-gray-800/95 backdrop-blur-xl"></div>
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div
        class="footer w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-14 relative z-10">
        <!-- Footer Content Grid -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 text-white overflow-hidden">
          <!-- Kraoop Brand Section -->
          <div class="kraoop col-span-1 sm:col-span-2 lg:col-span-3 min-w-0">
            <div
              class="text-xl sm:text-2xl font-bold logo mb-3 sm:mb-6 lg:mb-8 break-words">
              <router-link
                to="/"
                class="hover:opacity-90 transition-smooth hover:scale-105 block">
                <p class="lg:block hidden">
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] drop-shadow-lg"
                    >Kraoop</span
                  >
                  <span class="text-white"> Beauty</span>
                </p>
                <p class="lg:hidden">
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600"
                    >Kraoop</span
                  >
                  <span class="text-white ml-1">Beauty</span>
                </p>
              </router-link>
            </div>
            <div
              class="text-xs sm:text-sm text-gray-300 mb-4 sm:mb-5 leading-relaxed break-words font-medium">
              <p class="lg:not-italic italic">
                <span class="lg:hidden">✨ </span>Discover nature's beauty with
                our natural care products.
              </p>
            </div>
            <!-- Contact info - Glass cards -->
            <div class="space-y-2.5 lg:space-y-3 text-xs sm:text-sm">
              <div
                class="flex flex-row items-center gap-2.5 phone glass-dark rounded-xl p-2.5 hover:bg-white/10 transition-smooth min-w-0 border border-white/10">
                <div
                  class="icon flex-shrink-0 bg-gradient-to-br from-[#F5A3B7]/30 to-[#E392A6]/20 p-2 rounded-lg">
                  <img
                    src="../assets/icons/Call.svg"
                    alt="phone"
                    class="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
                </div>
                <div class="number text-gray-200 font-medium truncate">
                  +855 7707070
                </div>
              </div>
              <div
                class="flex flex-row items-center gap-2.5 email glass-dark rounded-xl p-2.5 hover:bg-white/10 transition-smooth min-w-0 border border-white/10">
                <div
                  class="icon flex-shrink-0 bg-gradient-to-br from-[#F5A3B7]/30 to-[#E392A6]/20 p-2 rounded-lg">
                  <img
                    src="../assets/icons/Message.svg"
                    alt="email"
                    class="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-sm" />
                </div>
                <div class="email text-gray-200 font-medium truncate">
                  kraoop@beauty.com
                </div>
              </div>
            </div>
          </div>

          <!-- Help Section -->
          <div class="hidden sm:flex flex-col gap-3 help min-w-0 lg:col-span-2">
            <div class="help text-[#F5A3B7] font-bold text-base mb-1">Help</div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              Contact Us
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              FAQ
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              Shipping and Returns
            </div>
          </div>

          <!-- Account Section -->
          <div
            class="hidden sm:flex flex-col gap-3 account min-w-0 lg:col-span-2">
            <div class="myAcc text-[#F5A3B7] font-bold text-base mb-1">
              Account
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              Order Status
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              Wishlist
            </div>
          </div>

          <!-- Customer Care Section -->
          <div
            class="hidden sm:flex flex-col gap-3 customer min-w-0 lg:col-span-2">
            <div class="care text-[#F5A3B7] font-bold text-base mb-1">
              Customer Care
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              About Us
            </div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth text-sm leading-relaxed break-words font-medium hover:translate-x-1">
              Contact Us
            </div>
          </div>

          <!-- Newsletter Section - Minimal Design -->
          <div class="signUp col-span-1 sm:col-span-2 lg:col-span-3 min-w-0">
            <!-- Clean design for all screen sizes -->
            <div
              class="rounded-2xl lg:rounded-none p-5 lg:p-0 border border-white/20 lg:border-0 shadow-sm lg:shadow-none transition-smooth">
              <div
                class="text-white font-bold text-lg sm:text-lg lg:text-base mb-2.5 sm:mb-2.5 lg:mb-3 flex items-center gap-2 drop-shadow-sm">
                <span class="text-xl sm:text-xl lg:text-lg">💌</span> Stay
                Connected
              </div>
              <div
                class="text-gray-100 text-sm sm:text-sm lg:text-xs mb-4 sm:mb-4 lg:mb-3 leading-relaxed font-medium">
                Get exclusive beauty tips & offers!
              </div>
              <form @submit.prevent="handleSubscribe" class="form">
                <div class="mb-4 sm:mb-4 lg:mb-3">
                  <label
                    for="hs-hero-email-mobile"
                    class="block text-sm font-medium text-gray-200 mb-2 lg:mb-1.5">
                    Email address
                  </label>
                  <input
                    v-model="email"
                    type="email"
                    id="hs-hero-email-mobile"
                    required
                    class="block w-full px-4 py-4 lg:py-3 text-base sm:text-base lg:text-sm border-2 border-white/30 rounded-2xl lg:rounded-xl focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/30 bg-white/10 lg:bg-gray-800/50 text-white placeholder-white/70 transition-smooth shadow-glass-sm font-medium backdrop-blur-sm"
                    placeholder="Enter your email" />
                </div>
                <LiquidButton
                  variant="primary"
                  type="submit"
                  full-width
                  size="lg"
                  class="py-4 lg:py-3">
                  Subscribe Now
                  <template v-slot:icon-right>
                    <svg
                      class="w-5 h-5 sm:w-5 sm:h-5 lg:w-4 lg:h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </template>
                </LiquidButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Bottom - Glass Enhanced -->
    <div class="relative overflow-hidden">
      <div
        class="absolute inset-0 bg-gradient-to-b from-gray-800/90 to-gray-900/95 backdrop-blur-xl"></div>
      <hr
        class="h-px bg-gradient-to-r from-transparent via-[#F5A3B7]/50 to-transparent border-0 relative z-10" />
      <div
        class="justify-center flex text-gray-300 w-full py-5 sm:py-6 lg:py-5 relative z-10">
        <div
          class="footer w-full max-w-7xl px-4 sm:px-8 lg:px-10 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div
            class="kraoop text-sm sm:text-base text-center sm:text-left font-bold break-words">
            © 2024
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A3B7] to-[#E392A6]"
              >Kraoop Beauty</span
            >
            ✨
          </div>
          <div
            class="flex flex-row gap-4 sm:gap-8 term text-sm sm:text-base items-center flex-wrap justify-center">
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth min-h-[44px] flex items-center font-bold whitespace-nowrap hover:scale-105">
              Privacy
            </div>
            <div class="text-[#F5A3B7]/40">•</div>
            <div
              class="cursor-pointer hover:text-[#F5A3B7] transition-smooth min-h-[44px] flex items-center font-bold whitespace-nowrap hover:scale-105">
              Terms
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Removed newsletter card styles - clean design for all sizes */
</style>
