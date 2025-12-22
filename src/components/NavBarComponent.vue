<script setup>
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import {useProductStore} from "../stores/ProductStore";

const route = useRoute();
const productStore = useProductStore();

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
    class="w-full bg-white/80 backdrop-blur-xl shadow-glass sticky top-0 z-50 overflow-hidden border-b border-white/20 transition-smooth">
    <div
      class="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 sm:h-24 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl sm:text-2xl font-bold logo flex-shrink-0 min-w-0">
        <router-link
          to="/"
          class="hover:opacity-80 transition-smooth hover:scale-105 block"
          @click="closeMobileMenu">
          <p class="whitespace-nowrap">
            <span class="text-[#F5A3B7] drop-shadow-sm">Kraoop</span>
            <span class="text-[#383838]"> Beauty</span>
          </p>
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="hidden lg:flex flex-row items-center justify-center gap-4 xl:gap-8 category text-sm font-semibold min-w-0 flex-shrink">
        <router-link
          to="/product"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2.5 px-4 rounded-xl relative overflow-hidden',
            isActive('/product')
              ? 'text-[#F5A3B7] bg-pink-50/80 shadow-sm'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">SHOP ALL</span>
        </router-link>
        <router-link
          to="/best-selling"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2.5 px-4 rounded-xl relative overflow-hidden',
            isActive('/best-selling')
              ? 'text-[#F5A3B7] bg-pink-50/80 shadow-sm'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">BEST SELLING</span>
        </router-link>
        <router-link
          to="/collection"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2.5 px-4 rounded-xl relative overflow-hidden',
            isActive('/collection')
              ? 'text-[#F5A3B7] bg-pink-50/80 shadow-sm'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">COLLECTION</span>
        </router-link>
        <router-link
          to="/about-us"
          :class="[
            'cursor-pointer transition-smooth whitespace-nowrap py-2.5 px-4 rounded-xl relative overflow-hidden',
            isActive('/about-us')
              ? 'text-[#F5A3B7] bg-pink-50/80 shadow-sm'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <span class="relative z-10">ABOUT US</span>
        </router-link>
      </div>

      <!-- Desktop Icons -->
      <div
        class="hidden md:flex items-center gap-3 lg:gap-5 menu text-xs flex-shrink-0">
        <router-link
          to="/account"
          :class="[
            'hidden lg:flex flex-col items-center gap-1.5 cursor-pointer transition-smooth hover:scale-110 p-2 rounded-xl',
            isActive('/account')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <div class="icon w-6 h-6">
            <img
              src="../assets/icons/account.svg"
              alt="account"
              class="w-full h-full drop-shadow-sm" />
          </div>
          <div class="text whitespace-nowrap text-xs font-semibold">
            ACCOUNT
          </div>
        </router-link>
        <router-link
          to="/payment"
          :class="[
            'flex flex-col items-center gap-1.5 cursor-pointer transition-smooth hover:scale-110 relative p-2 rounded-xl',
            isActive('/payment')
              ? 'text-[#F5A3B7] bg-pink-50/80'
              : 'hover:text-[#F5A3B7] hover:bg-pink-50/50',
          ]">
          <div class="icon w-6 h-6 relative">
            <img
              src="../assets/icons/cart.svg"
              alt="cart"
              class="w-full h-full drop-shadow-sm" />
            <!-- Cart Badge -->
            <span
              v-if="cartItemCount > 0"
              class="absolute -top-2 -right-2 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-[10px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-glass animate-pulse border border-white/30">
              {{ cartItemCount > 99 ? "99+" : cartItemCount }}
            </span>
          </div>
          <div class="text whitespace-nowrap text-xs font-semibold">CART</div>
        </router-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden p-3 rounded-2xl hover:bg-white/80 backdrop-blur-sm transition-smooth min-h-[48px] min-w-[48px] flex items-center justify-center shadow-glass-sm hover:shadow-glass"
        aria-label="Toggle menu">
        <svg
          v-if="!mobileMenuOpen"
          class="w-7 h-7 text-gray-700"
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
          class="w-7 h-7 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
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
        class="lg:hidden border-t border-white/20 bg-white/90 backdrop-blur-xl shadow-glass-lg overflow-hidden">
        <div
          class="px-4 sm:px-6 py-6 sm:py-8 space-y-2 max-w-full overflow-hidden">
          <!-- Mobile Navigation Links -->
          <router-link
            to="/product"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-4 px-5 text-base font-semibold rounded-2xl transition-smooth min-h-[48px]',
              isActive('/product')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
            ]">
            SHOP ALL
          </router-link>
          <router-link
            to="/best-selling"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-4 px-5 text-base font-semibold rounded-2xl transition-smooth min-h-[48px]',
              isActive('/best-selling')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
            ]">
            BEST SELLING
          </router-link>
          <router-link
            to="/collection"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-4 px-5 text-base font-semibold rounded-2xl transition-smooth min-h-[48px]',
              isActive('/collection')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
            ]">
            COLLECTION
          </router-link>
          <router-link
            to="/about-us"
            @click="closeMobileMenu"
            :class="[
              'flex items-center py-4 px-5 text-base font-semibold rounded-2xl transition-smooth min-h-[48px]',
              isActive('/about-us')
                ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
            ]">
            ABOUT US
          </router-link>

          <!-- Mobile Menu Icons -->
          <div class="pt-6 border-t border-white/20 space-y-2">
            <router-link
              to="/account"
              @click="closeMobileMenu"
              :class="[
                'flex items-center gap-4 py-4 px-5 rounded-2xl transition-smooth min-h-[48px]',
                isActive('/account')
                  ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                  : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
              ]">
              <img
                src="../assets/icons/account.svg"
                alt="account"
                class="w-6 h-6 drop-shadow-sm" />
              <span class="text-base font-semibold">ACCOUNT</span>
            </router-link>
            <router-link
              to="/payment"
              @click="closeMobileMenu"
              :class="[
                'flex items-center gap-4 py-4 px-5 rounded-2xl transition-smooth min-h-[48px] relative',
                isActive('/payment')
                  ? 'bg-gradient-to-r from-[#F5A3B7]/20 to-pink-200/20 text-[#F5A3B7] shadow-glass-sm'
                  : 'text-gray-700 hover:bg-white/80 hover:text-[#F5A3B7] hover:shadow-glass-sm',
              ]">
              <div class="relative">
                <img
                  src="../assets/icons/cart.svg"
                  alt="cart"
                  class="w-6 h-6 drop-shadow-sm" />
                <!-- Cart Badge for Mobile -->
                <span
                  v-if="cartItemCount > 0"
                  class="absolute -top-2 -right-2 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-[10px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 shadow-glass border border-white/30">
                  {{ cartItemCount > 99 ? "99+" : cartItemCount }}
                </span>
              </div>
              <span class="text-base font-semibold">CART</span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>
