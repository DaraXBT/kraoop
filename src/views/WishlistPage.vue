<template>
  <PageLayout :show-banner="false">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {{ $t('wishlist.title') }}
          </h1>
          <p class="text-gray-600">
            {{
              wishlistCount === 0
                ? $t('wishlist.empty')
                : $t('wishlist.items_count', { count: wishlistCount })
            }}
          </p>
        </div>

        <!-- Empty State -->
        <div
          v-if="wishlistCount === 0"
          class="text-center py-16 bg-white rounded-2xl ">
          <svg
            class="w-32 h-32 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 class="text-2xl font-bold text-gray-700 mb-3">
            {{ $t('wishlist.empty') }}
          </h2>
          <p class="text-gray-500 mb-8">
            {{ $t('wishlist.empty_desc') }}
          </p>
          <LiquidButton
            variant="primary"
            size="lg"
            tag="router-link"
            to="/product">
            {{ $t('wishlist.browse_products') }}
            <template v-slot:icon-right>
              <svg
                class="w-5 h-5"
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

        <!-- Wishlist Grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="product in wishlist"
            :key="product.id"
            class="bg-white rounded-xl   transition-all duration-300 overflow-hidden group">
            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden bg-gray-50">
              <router-link :to="`/detail/${product.id}`">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </router-link>

              <!-- Promotion Badge -->
              <div
                v-if="product.promotion"
                class="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full ">
                {{ product.promotion }}
              </div>

              <!-- Remove from Wishlist Button -->
              <LiquidButton
                variant="danger"
                size="sm"
                icon-only
                @click="handleRemoveFromWishlist(product)"
                class="absolute top-3 right-3 !p-2 rounded-full ">
                <template v-slot:icon-left>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </template>
              </LiquidButton>

              <!-- Quick Add to Cart -->
              <LiquidButton
                variant="primary"
                @click="handleAddToCart(product)"
                class="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                {{ $t('wishlist.add_to_cart') }}
              </LiquidButton>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <!-- Brand -->
              <p class="text-xs text-gray-500 mb-1">{{ product.brand }}</p>

              <!-- Title -->
              <router-link :to="`/detail/${product.id}`">
                <h3
                  class="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#F5A3B7] transition-colors">
                  {{ product.title }}
                </h3>
              </router-link>

              <!-- Category & Skin Type -->
              <div class="flex flex-wrap gap-1 mb-3">
                <span
                  class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {{ product.category }}
                </span>
                <span
                  v-if="product.skinType && product.skinType[0]"
                  class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                  {{ product.skinType[0] }}
                </span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-2 mb-3">
                <div class="flex">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-4 h-4"
                    :class="
                      star <= product.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                </div>
                <span class="text-xs text-gray-500"
                  >({{ product.ratingCount }})</span
                >
              </div>

              <!-- Price -->
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-lg font-bold text-gray-900">{{
                    product.price
                  }}</span>
                  <span
                    v-if="product.originalPrice"
                    class="text-sm text-gray-400 line-through ml-2">
                    {{ product.originalPrice }}
                  </span>
                </div>

                <!-- Stock Status -->
                <span
                  v-if="product.inStock"
                  class="text-xs text-green-600 font-medium">
                  {{ $t('product.in_stock') }}
                </span>
                <span v-else class="text-xs text-red-600 font-medium">
                  {{ $t('product.out_of_stock') }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Wishlist Button -->
        <div v-if="wishlistCount > 0" class="mt-8 text-center">
          <LiquidButton variant="danger" size="lg" @click="handleClearWishlist">
            {{ $t('wishlist.clear') }}
          </LiquidButton>
        </div>
      </div>
  </PageLayout>
</template>

<script setup>
import {computed} from "vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import PageLayout from "../components/PageLayout.vue";
import LiquidButton from "../components/LiquidButton.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const store = useProductStore();
const {success, info} = useToast();

const wishlist = computed(() => store.wishlist || []);
const wishlistCount = computed(() => store.wishlistCount);

const handleRemoveFromWishlist = (product) => {
  store.removeFromWishlist(product.id);
  info(`${product.title} ${t('wishlist.removed')}`, 2000);
};

const handleAddToCart = (product) => {
  if (!product.inStock) {
    info(t('product.out_of_stock_msg'), 2000);
    return;
  }
  store.addToCart(product);
  success(`${product.title} ${t('product.added_to_cart')} 🛒`, 2000);
};

const handleClearWishlist = () => {
  if (confirm(t('wishlist.confirm_clear'))) {
    store.clearWishlist();
    info(t('wishlist.cleared'), 2000);
  }
};
</script>
