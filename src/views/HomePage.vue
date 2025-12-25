<script setup>
import PageLayout from "../components/PageLayout.vue";
import CartComponent from "../components/CartComponent.vue";
import LiquidButton from "../components/LiquidButton.vue";
import AdvancedLiquidButton from "../components/AdvancedLiquidButton.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import {useSEO} from "../composables/useSEO";
import {usePageTransition} from "../composables/usePageTransition";
import {computed} from "vue";

const store = useProductStore();
const {success} = useToast();
const {getStaggerDelay} = usePageTransition();

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
  <PageLayout>

      <!--================>>Cover -->
      <div
        class="object-cover w-full cover flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <!-- iOS-inspired animated background gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-blue-50/20"></div>
        <div
          class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmNWE3YjgiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

        <div
          class="content max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center min-w-0 relative z-10">
          <!-- Text Content -->
          <div
            class="text-content order-2 lg:order-1 text-center lg:text-left min-w-0 px-2">
            <h1
              class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#383838] leading-tight mb-4 sm:mb-5 break-words animate-fade-in-up">
              {{ $t('home.hero_title_1') }}<br class="hidden sm:inline" />
              {{ $t('home.hero_title_2') }}<br class="hidden sm:inline" />
              {{ $t('home.hero_title_3') }}
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A3B7] to-[#E392A6]"
                >KRAOOP</span
              >
            </h1>
            <p
              class="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 break-words max-w-lg mx-auto lg:mx-0 font-medium animate-fade-in-up stagger-1">
              {{ $t('home.hero_subtitle') }}
            </p>
            <div
              class="button flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up stagger-2">
              <LiquidButton
                variant="primary"
                size="lg"
                tag="router-link"
                to="/product"
                class="min-h-[48px] sm:min-h-[52px]">
                {{ $t('home.shop_now') }}
                <template v-slot:icon-right>
                  <svg
                    class="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </template>
              </LiquidButton>
            </div>
          </div>

          <!-- Image -->
          <div
            class="img order-1 lg:order-2 flex justify-center lg:justify-end min-w-0 animate-fade-in-right stagger-1">
            <div class="relative">
              <div
                class="absolute -inset-4 bg-gradient-to-r from-[#F5A3B7]/20 to-[#E392A6]/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <img
                src="../assets/images/jennie.png"
                alt="jennie"
                class="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md xl:max-w-lg object-contain float-animation"
                fetchpriority="high"
                decoding="async" />
            </div>
          </div>
        </div>
      </div>

      <!--================>>New Arrivals-->
      <div class="py-12 sm:py-14 lg:py-16 px-4 overflow-hidden relative">
        <div class="text-center min-w-0 max-w-4xl mx-auto mb-10" data-animate="fade-up">
          <p
            class="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 break-words px-2 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
            {{ $t('home.new_arrivals') }}
          </p>
          <p
            class="text-sm sm:text-base lg:text-lg text-gray-600 mb-5 px-2 font-medium">
            {{ $t('home.new_arrivals_desc') }}
          </p>
          <AdvancedLiquidButton
            variant="primary"
            size="md"
            @click="() => $router.push('/product')">
            {{ $t('home.view_all') }}
            <template v-slot:icon-right>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7" />
              </svg>
            </template>
          </AdvancedLiquidButton>
        </div>
      </div>

      <!--================>>Cart -->
      <div
        class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 min-w-0">
          <CartComponent
            v-for="(product, index) in slicedCart"
            :key="product.id"
            :style="{ animationDelay: getStaggerDelay(index, 80) }"
            class="animate-fade-in-up"
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
      <div class="py-12 sm:py-14 lg:py-16 px-4 relative overflow-hidden">
        <!-- iOS-style subtle background decoration -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-transparent"></div>
        <div class="relative z-10">
          <div class="text-center max-w-4xl mx-auto mb-10" data-animate="fade-up">
            <p
              class="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600">
              {{ $t('home.best_sellers') }}
            </p>
            <p
              class="text-sm sm:text-base lg:text-lg text-gray-600 mb-5 font-medium">
              {{ $t('home.best_sellers_desc') }}
            </p>
            <AdvancedLiquidButton
              variant="primary"
              size="md"
              @click="() => $router.push('/best-selling')">
              {{ $t('home.view_all') }}
              <template v-slot:icon-right>
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7" />
                </svg>
              </template>
            </AdvancedLiquidButton>
          </div>
        </div>
      </div>

      <div
        class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-14 lg:mb-16">
        <div
          class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 min-w-0">
          <CartComponent
            v-for="(product, index) in slicedCart2"
            :key="product.id"
            :style="{ animationDelay: getStaggerDelay(index, 80) }"
            class="animate-fade-in-up"
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
        class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-14 lg:my-16 overflow-hidden">
        <div
          class="glass-card-strong grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-w-0 rounded-2xl p-5 sm:p-6 lg:p-10 border border-white/30 -xl transition-smooth"
          data-animate="scale">
          <!-- Content -->
          <div class="flex flex-col order-2 lg:order-1 min-w-0">
            <h2
              class="mb-4 sm:mb-5 text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 break-words">
              {{ $t('home.floral_mask_title') }}
            </h2>
            <p
              class="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed break-words font-medium">
              {{ $t('home.floral_mask_desc') }}
            </p>
            <div class="mb-5 hashtag overflow-hidden">
              <div class="flex flex-wrap gap-2 tag">
                <div
                  class="glass-card text-neutral-700 px-4 text-xs py-1.5 rounded-full whitespace-nowrap font-bold hover:scale-105 transition-smooth border border-white/20">
                  {{ $t('home.vegan') }}
                </div>
                <div
                  class="glass-card text-neutral-700 px-4 text-xs py-1.5 rounded-full whitespace-nowrap font-bold hover:scale-105 transition-smooth border border-white/20">
                  {{ $t('home.cruelty_free') }}
                </div>
                <div
                  class="glass-card text-neutral-700 px-4 text-xs py-1.5 rounded-full whitespace-nowrap font-bold hover:scale-105 transition-smooth border border-white/20">
                  {{ $t('home.eco_friendly') }}
                </div>
              </div>
            </div>
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 btn">
              <LiquidButton
                variant="primary"
                size="lg"
                tag="router-link"
                to="/product"
                class="min-h-[48px]">
                {{ $t('home.shop_now') }}
                <template v-slot:icon-right>
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </template>
              </LiquidButton>
              <LiquidButton
                variant="secondary"
                size="lg"
                @click="() => $router.push('/product')">
                {{ $t('home.explore_more') }}
                <template v-slot:icon-right>
                  <svg
                    class="w-4 h-4"
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
            </div>
          </div>

          <!-- Image -->
          <div
            class="order-1 lg:order-2 w-full aspect-square lg:aspect-auto lg:h-[320px] xl:h-[380px] object-cover items-center flex overflow-hidden rounded-xl min-w-0 -xl transition-smooth group">
            <img
              class="w-full h-full object-cover max-w-full group-hover:scale-105 transition-transform duration-500"
              src="../assets/images/innisfree.jpg"
              alt="innisfree"
              loading="lazy"
              decoding="async" />
          </div>
        </div>
      </div>

      <!-- ================>>Show Product -->
      <div
        class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 sm:my-14 lg:my-16 overflow-hidden">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-w-0">
          <!-- Image -->
          <div
            class="w-full aspect-square lg:aspect-auto lg:h-[320px] xl:h-[380px] object-cover items-center flex overflow-hidden rounded-xl min-w-0">
            <img
              class="w-full h-full object-cover max-w-full"
              src="../assets/images/sunscreen.jpg"
              alt="sunscreen"
              loading="lazy"
              decoding="async" />
          </div>

          <!-- Content -->
          <div class="flex flex-col">
            <h2
              class="mb-5 sm:mb-6 text-xl sm:text-2xl lg:text-3xl font-medium title text-[#383838]">
              {{ $t('home.blossom_kit_title') }}
            </h2>
            <p
              class="text-xs sm:text-sm text-[#697586] mb-5 sm:mb-6 leading-relaxed">
              {{ $t('home.blossom_kit_desc') }}
            </p>
            <div class="mb-5 sm:mb-6 hashtag">
              <div class="flex flex-wrap gap-2 tag">
                <div
                  class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs py-1.5 bg-opacity-30 rounded-full">
                  {{ $t('home.vegan') }}
                </div>
                <div
                  class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs py-1.5 bg-opacity-30 rounded-full">
                  {{ $t('home.cruelty_free') }}
                </div>
                <div
                  class="text-[#383838] bg-[#B0A6BD] px-3 sm:px-4 text-xs py-1.5 bg-opacity-30 rounded-full">
                  {{ $t('home.eco_friendly') }}
                </div>
              </div>
            </div>
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 btn">
              <LiquidButton
                variant="primary"
                size="lg"
                tag="router-link"
                to="/product"
                class="min-h-[48px]">
                {{ $t('home.shop_now') }}
              </LiquidButton>
              <LiquidButton
                variant="secondary"
                size="lg"
                @click="() => $router.push('/product')">
                {{ $t('home.explore_more') }}
                <template v-slot:icon-right>
                  <svg
                    class="w-4 h-4"
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
            </div>
          </div>
        </div>
      </div>
  </PageLayout>
</template>
