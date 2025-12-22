<script setup>
import NavbarComponent from "../components/NavBarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import {useSEO} from "../composables/useSEO";
import {computed} from "vue";

const store = useProductStore();
const {success} = useToast();

// SEO
useSEO({
  title: "Kraoop Beauty - Premium Korean Skincare & Beauty Products",
  description:
    "Discover the best Korean skincare products. Shop natural, cruelty-free beauty essentials for all skin types. Free shipping on orders over $50.",
  url: "/",
});

// Safely access products with fallback
const products = computed(() => store.products || []);
const slicedCart = computed(() => (store.products || []).slice(0, 4));
const slicedCart2 = computed(() => (store.products || []).slice(6, 10));

const handleAddToCart = (product) => {
  if (!product) return;
  store.addToCart(product);
  success("Product added to cart successfully! 🛒", 3000);
  console.log("Added to cart:", product);
};
</script>
<template>
  <!--================>>Navbar -->
  <NavbarComponent />

  <!--================>>Cover -->
  <div
    class="object-cover w-full cover flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
    <!-- iOS-inspired animated background gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/20"></div>
    <div
      class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNWE3YjgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

    <div
      class="content max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-w-0 relative z-10">
      <!-- Text Content -->
      <div
        class="text-content order-2 lg:order-1 text-center lg:text-left min-w-0 px-2">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#383838] leading-tight mb-6 break-words animate-fade-in drop-shadow-sm">
          Discover Your<br class="hidden sm:inline" />
          Inner Beauty<br class="hidden sm:inline" />
          with
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] drop-shadow-lg"
            >KRAOOP</span
          >
        </h1>
        <p
          class="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 lg:mb-10 break-words max-w-lg mx-auto lg:mx-0 font-medium">
          Great gift for yourself and loved ones ✨
        </p>
        <div
          class="button flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <router-link
            class="glass-card-strong inline-flex items-center justify-center px-10 sm:px-12 lg:px-14 py-4 sm:py-5 text-center text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#383838] to-[#525252] border-2 border-white/30 rounded-2xl gap-x-3 hover:scale-105 hover:shadow-glass-xl transition-smooth min-h-[56px] sm:min-h-[60px] whitespace-nowrap group"
            to="/product">
            <span>Shop now</span>
            <svg
              class="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Image -->
      <div
        class="img order-1 lg:order-2 flex justify-center lg:justify-end min-w-0">
        <div class="relative">
          <div
            class="absolute -inset-4 bg-gradient-to-r from-[#F5A3B7]/20 to-[#E392A6]/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <img
            src="../assets/images/jennie.png"
            alt="jennie"
            class="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg xl:max-w-xl object-contain drop-shadow-2xl float-animation" />
        </div>
      </div>
    </div>
  </div>

  <!--================>>New Arrivals-->
  <div class="py-20 sm:py-24 lg:py-28 px-4 overflow-hidden relative">
    <div class="text-center min-w-0 max-w-4xl mx-auto mb-14">
      <p
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 break-words px-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
        NEW ARRIVALS
      </p>
      <p
        class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 px-2 font-medium">
        Discover our latest products ✨
      </p>
      <router-link
        to="/product"
        class="glass-card inline-flex items-center gap-3 px-6 py-3 text-base sm:text-lg text-neutral-900 font-bold hover:text-[#F5A3B7] transition-smooth cursor-pointer group whitespace-nowrap hover:shadow-glass hover:scale-105 rounded-2xl">
        <span>View all</span>
        <svg
          class="w-5 h-5 group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>
  </div>

  <!--================>>Cart -->
  <div
    class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
    <div
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-7 min-w-0">
      <CartComponent
        v-for="product in slicedCart"
        :key="product.id"
        :id="product.id"
        :promotion="product.promotion"
        :image="product.image"
        :title="product.title"
        :product="product.product"
        :rating="product.rating"
        :price="product.price"
        @add-to-cart="handleAddToCart" />
    </div>
  </div>

  <!--================>>Best Sellers-->
  <div class="py-20 sm:py-24 lg:py-28 px-4 relative overflow-hidden">
    <!-- iOS-style subtle background decoration -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-transparent"></div>
    <div class="relative z-10">
      <div class="text-center max-w-4xl mx-auto mb-14">
        <p
          class="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
          BEST SELLERS
        </p>
        <p
          class="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 font-medium">
          Our most loved products 💖
        </p>
        <router-link
          to="/best-selling"
          class="glass-card inline-flex items-center gap-3 px-6 py-3 text-base sm:text-lg text-neutral-900 font-bold hover:text-[#F5A3B7] transition-smooth cursor-pointer group hover:shadow-glass hover:scale-105 rounded-2xl">
          <span>View all</span>
          <svg
            class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>

  <div
    class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20 lg:mb-24 overflow-hidden">
    <div
      class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-7 min-w-0">
      <CartComponent
        v-for="product in slicedCart2"
        :key="product.id"
        :id="product.id"
        :promotion="product.promotion"
        :image="product.image"
        :title="product.title"
        :product="product.product"
        :rating="product.rating"
        :price="product.price"
        @add-to-cart="handleAddToCart" />
    </div>
  </div>

  <!--================>>Show Product-->
  <div
    class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20 sm:my-24 lg:my-32 overflow-hidden">
    <div
      class="glass-card-strong grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center min-w-0 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-glass-xl border border-white/30 hover:shadow-glass-xl transition-smooth">
      <!-- Content -->
      <div class="flex flex-col order-2 lg:order-1 min-w-0">
        <h2
          class="mb-5 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 break-words">
          Floral Essence Masks Sets
        </h2>
        <p
          class="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed break-words font-medium">
          Indulge in the beauty of nature with our Floral Essence Masks set.
          Each mask features a unique blend of flower extracts to hydrate and
          nourish your skin. Experience the essence of flowers in your skincare
          routine. 🌸
        </p>
        <div class="mb-6 hashtag overflow-hidden">
          <div class="flex flex-wrap gap-2 tag">
            <div
              class="glass-card text-neutral-700 px-5 text-xs sm:text-sm py-2 rounded-full whitespace-nowrap font-bold hover:shadow-glass hover:scale-105 transition-smooth border border-white/20">
              # Vegan 🌱
            </div>
            <div
              class="glass-card text-neutral-700 px-5 text-xs sm:text-sm py-2 rounded-full whitespace-nowrap font-bold hover:shadow-glass hover:scale-105 transition-smooth border border-white/20">
              # Cruelty-free 🐰
            </div>
            <div
              class="glass-card text-neutral-700 px-5 text-xs sm:text-sm py-2 rounded-full whitespace-nowrap font-bold hover:shadow-glass hover:scale-105 transition-smooth border border-white/20">
              # Eco-friendly 🌍
            </div>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 btn">
          <router-link
            class="glass-card-strong inline-flex items-center justify-center px-10 py-4 text-center text-base font-bold text-white bg-gradient-to-r from-neutral-900 to-neutral-700 border-2 border-white/30 rounded-2xl gap-x-2 hover:scale-105 hover:shadow-glass-lg transition-smooth min-h-[52px] whitespace-nowrap group"
            to="/product">
            <span>Shop now</span>
            <svg
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
          <button
            type="button"
            class="inline-flex items-center justify-center text-base font-bold text-neutral-900 hover:text-[#F5A3B7] transition-smooth whitespace-nowrap min-h-[52px] group">
            Explore more
            <svg
              class="flex-shrink-0 w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
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
          </button>
        </div>
      </div>

      <!-- Image -->
      <div
        class="order-1 lg:order-2 w-full aspect-square lg:aspect-auto lg:h-[400px] xl:h-[500px] object-cover items-center flex overflow-hidden rounded-2xl min-w-0 shadow-glass-lg hover:shadow-glass-xl transition-smooth group">
        <img
          class="w-full h-full object-cover max-w-full group-hover:scale-105 transition-transform duration-500"
          src="../assets/images/innisfree.jpg"
          alt="innisfree" />
      </div>
    </div>
  </div>

  <!-- ================>>Show Product -->
  <div
    class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-16 lg:my-32 overflow-hidden">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-w-0">
      <!-- Image -->
      <div
        class="w-full aspect-square lg:aspect-auto lg:h-[400px] xl:h-[500px] object-cover items-center flex overflow-hidden rounded-2xl min-w-0">
        <img
          class="w-full h-full object-cover max-w-full"
          src="../assets/images/sunscreen.jpg"
          alt="sunscreen" />
      </div>

      <!-- Content -->
      <div class="flex flex-col">
        <h2
          class="mb-6 sm:mb-8 lg:mb-10 text-2xl sm:text-3xl lg:text-4xl font-medium title text-[#383838]">
          Blossom Glow Kit
        </h2>
        <p
          class="text-sm sm:text-base text-[#697586] mb-6 sm:mb-8 leading-relaxed">
          Reveal your skin's natural glow with our Lotus Glow Kit. Nourishing
          body and face creams with lotus extract provide deep hydration and
          rejuvenation. Suitable for all skin types. Vegan, cruelty-free,
          eco-friendly.
        </p>
        <div class="mb-6 sm:mb-8 hashtag">
          <div class="flex flex-wrap gap-2 sm:gap-3 tag">
            <div
              class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs sm:text-sm py-1 bg-opacity-30 rounded-full">
              # Vegan
            </div>
            <div
              class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs sm:text-sm py-1 bg-opacity-30 rounded-full">
              # Cruelty-free
            </div>
            <div
              class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs sm:text-sm py-1 bg-opacity-30 rounded-full">
              # Eco-friendly
            </div>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 btn">
          <router-link
            class="inline-flex items-center justify-center px-12 sm:px-16 lg:px-24 py-3 text-center text-sm font-semibold text-white bg-[#F5A3B7] border border-transparent rounded-lg gap-x-2 hover:bg-gray-900 transition-colors"
            to="/product">
            Shop now
          </router-link>
          <button
            type="button"
            class="inline-flex items-center justify-center sm:justify-start text-sm font-medium text-[#383838] hover:text-[#F5A3B7] transition-colors">
            Explore more
            <svg
              class="flex-shrink-0 w-4 h-4 ml-2"
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
          </button>
        </div>
      </div>
    </div>
  </div>

  <!--================>>Footer -->
  <FooterComponent />
</template>
