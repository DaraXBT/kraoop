<script setup>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import {useProductStore} from "../stores/ProductStore";
import {useAuth} from "../composables/useAuth";
import LiquidButton from "./LiquidButton.vue";

const route = useRoute();
const productStore = useProductStore();
const {isAuthenticated} = useAuth();

// Cart item count
const cartItemCount = computed(() => productStore.cartItemCount);
const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Check if route is active
const isActive = (path) => {
  return route.path === path || route.path.startsWith(path + "/");
};
</script>

<!-- ================>>Navbar -->
<template>
  <nav
    class="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 overflow-hidden border-b border-white/20 transition-smooth">
    <div
      class="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 sm:h-18 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-lg sm:text-xl font-bold logo flex-shrink-0 min-w-0">
        <router-link
          to="/"
          class="hover:opacity-80 transition-smooth hover:scale-105 block"
          @click="closeMobileMenu">
          <p class="whitespace-nowrap">
            <span class="text-[#F5A3B7]">Kraoop</span>
            <span class="text-[#383838]"> Beauty</span>
          </p>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="hidden lg:flex flex-row items-center justify-center gap-3 xl:gap-6 category text-xs font-semibold min-w-0 flex-shrink">
        <router-link
          to="/product"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2 px-3.5 rounded-lg relative overflow-hidden',
            isActive('/product')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">SHOP ALL</span>
        </router-link>
        <router-link
          to="/best-selling"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2 px-3.5 rounded-lg relative overflow-hidden',
            isActive('/best-selling')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">BEST SELLING</span>
        </router-link>
        <router-link
          to="/collection"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2 px-3.5 rounded-lg relative overflow-hidden',
            isActive('/collection')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">COLLECTION</span>
        </router-link>
        <router-link
          to="/about-us"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2 px-3.5 rounded-lg relative overflow-hidden',
            isActive('/about-us')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">ABOUT US</span>
        </router-link>
      </div>

      <!-- Desktop Icons -->
      <div
        class="hidden md:flex items-center gap-2.5 lg:gap-3 menu text-xs flex-shrink-0">
        <!-- Auth Buttons (when not logged in) -->
        <div v-if="!isAuthenticated" class="hidden lg:flex items-center gap-2">
          <router-link to="/login">
            <LiquidButton variant="ghost" size="sm" class="text-xs">
              Login
            </LiquidButton>
          </router-link>
          <router-link to="/signup">
            <LiquidButton variant="primary" size="sm" class="text-xs">
              Sign Up
            </LiquidButton>
          </router-link>
        </div>
        
        <!-- Account Icon (when logged in) -->
        <router-link
          v-else
          to="/account"
          :class="[
            'hidden lg:flex flex-col items-center gap-1 cursor-pointer transition-smooth hover:scale-110 p-1.5 rounded-lg',
            isActive('/account')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <div class="icon w-5 h-5">
            <img
              src="../assets/icons/account.svg"
              alt="account"
              class="w-full h-full" />
          </div>
          <div class="text whitespace-nowrap text-[10px] font-semibold">
            ACCOUNT
          </div>
        </router-link>
        <router-link
          to="/payment"
          :class="[
            'flex flex-col items-center gap-1 cursor-pointer transition-smooth hover:scale-110 relative p-1.5 rounded-lg',
            isActive('/payment')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <div class="icon w-5 h-5 relative">
            <img
              src="../assets/icons/cart.svg"
              alt="cart"
              class="w-full h-full" />
            <!-- Cart Badge -->
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5 animate-pulse border border-white/30">
              {{ cartItemCount > 99 ? "99+" : cartItemCount }}
            </span>
          </div>
          <div class="text whitespace-nowrap text-[10px] font-semibold">
            CART
          </div>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <LiquidButton
        @click="toggleMobileMenu"
        variant="glass"
        size="md"
        iconOnly
        class="lg:hidden backdrop-blur-sm"
        aria-label="Toggle menu">
        <template #icon-left>
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </template>
      </LiquidButton>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1">
      <div
        v-show="mobileMenuOpen"
        class="lg:hidden border-t border-white/20 bg-white/90 backdrop-blur-xl overflow-hidden">
        <div
          class="px-4 sm:px-6 py-4 sm:py-5 space-y-1.5 max-w-full overflow-hidden">
          <!-- Mobile Navigation Links -->
          <router-link
            to="/product"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-3 px-4 text-sm font-semibold rounded-xl transition-smooth min-h-[44px]',
              isActive('/product')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
            ]">
            SHOP ALL
          </router-link>
          <router-link
            to="/best-selling"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-3 px-4 text-sm font-semibold rounded-xl transition-smooth min-h-[44px]',
              isActive('/best-selling')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
            ]">
            BEST SELLING
          </router-link>
          <router-link
            to="/collection"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-3 px-4 text-sm font-semibold rounded-xl transition-smooth min-h-[44px]',
              isActive('/collection')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
            ]">
            COLLECTION
          </router-link>
          <router-link
            to="/about-us"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-3 px-4 text-sm font-semibold rounded-xl transition-smooth min-h-[44px]',
              isActive('/about-us')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
            ]">
            ABOUT US
          </router-link>

          <!-- Mobile Menu Icons -->
          <div class="pt-4 border-t border-white/20 space-y-1.5">
            <!-- Account Link (when logged in) -->
            <router-link
              v-if="isAuthenticated"
              to="/account"
              @click="closeMobileMenu"
              :class="[
                'flex items-center gap-3 py-3 px-4 rounded-xl transition-smooth min-h-[44px]',
                isActive('/account')
                  ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                  : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
              ]">
              <img
                src="../assets/icons/account.svg"
                alt="account"
                class="w-5 h-5" />
              <span class="text-sm font-semibold">ACCOUNT</span>
            </router-link>
            
            <!-- Cart Link -->
            <router-link
              to="/payment"
              @click="closeMobileMenu"
              :class="[
                'flex items-center gap-3 py-3 px-4 rounded-xl transition-smooth min-h-[44px] relative',
                isActive('/payment')
                  ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7]'
                  : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7]',
              ]">
              <div class="relative">
                <img
                  src="../assets/icons/cart.svg"
                  alt="cart"
                  class="w-5 h-5" />
                <!-- Cart Badge for Mobile -->
                <span
                  v-if="cartItemCount > 0"
                  class="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5 border border-white/30">
                  {{ cartItemCount > 99 ? "99+" : cartItemCount }}
                </span>
              </div>
              <span class="text-sm font-semibold">CART</span>
            </router-link>
            
            <!-- Auth Buttons (when not logged in) - At Bottom -->
            <div v-if="!isAuthenticated" class="space-y-4 pt-4 border-t border-white/20">
              <router-link to="/login" @click="closeMobileMenu">
                <LiquidButton variant="ghost" size="lg" full-width class="justify-center min-h-[52px]">
                  Login
                </LiquidButton>
              </router-link>
              <router-link to="/signup" @click="closeMobileMenu" class="block pt-0.5">
                <LiquidButton variant="primary" size="lg" full-width class="justify-center min-h-[52px]">
                  Sign Up
                </LiquidButton>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
