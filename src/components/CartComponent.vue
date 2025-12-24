<script setup>
import {ref} from "vue";
import LiquidButton from "./LiquidButton.vue";

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  promotion: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    default: "(0)",
  },
  price: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["add-to-cart"]);
const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};

const addToBag = () => {
  const product = {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    product: props.product,
    promotion: props.promotion,
    rating: props.rating,
  };
  emit("add-to-cart", product);
};

// Calculate original price based on promotion
const calculateOriginalPrice = () => {
  if (!props.promotion) return props.price;

  const currentPrice = parseFloat(props.price.replace("$", ""));
  const discountPercent = parseInt(
    props.promotion.replace("-", "").replace("%", "")
  );
  const originalPrice = currentPrice / (1 - discountPercent / 100);

  return "$" + originalPrice.toFixed(2);
};
</script>

<template>
  <div class="card group relative w-full">
    <!-- Card Container - Modern Glass Style -->
    <div
      class="w-full glass-card hover:glass-card-strong rounded-2xl flex flex-col hover:shadow-glass-lg transition-smooth overflow-hidden border border-white/30 hover:border-white/50 min-w-0 hover:scale-[1.02] backdrop-blur-xl">
      <!-- Image Section with Favorite Icon -->
      <router-link
        :to="`/detail?id=${id}`"
        class="w-full overflow-hidden min-w-0 relative bg-gradient-to-br from-gray-50/80 to-gray-100/50">
        <!-- Favorite Icon - Glass Style -->
        <button
          @click.prevent="toggleFavorite"
          class="absolute top-2 left-2 z-10 cursor-pointer transition-smooth hover:scale-110 active:scale-95 p-1.5 glass-card-strong rounded-full hover:shadow-glass group/heart border border-white/30">
          <svg
            :class="{
              'fill-[#F5A3B7] stroke-[#F5A3B7]': isFavorite,
              'fill-none stroke-gray-600': !isFavorite,
            }"
            class="w-4 h-4 transition-smooth group-hover/heart:stroke-[#F5A3B7]"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        <!-- Product Image -->
        <img
          class="object-cover w-full aspect-[4/5] group-hover:scale-110 transition-transform duration-500 max-w-full"
          :src="image"
          :alt="title" />
      </router-link>

      <!-- Content Section -->
      <div class="flex flex-col px-3 sm:px-4 py-3 sm:py-4 w-full gap-2 min-w-0">
        <!-- Product Title -->
        <router-link :to="`/detail?id=${id}`" class="w-full min-w-0">
          <h3
            class="w-full text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#F5A3B7] transition-smooth line-clamp-2 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem] break-words">
            {{ title }}
          </h3>
        </router-link>

        <!-- Price Section -->
        <div class="flex items-baseline gap-1.5 w-full min-w-0">
          <span class="text-base sm:text-lg font-bold text-gray-900">
            {{ price }}
          </span>
          <span
            v-if="promotion"
            class="text-xs sm:text-sm font-medium text-gray-400 line-through">
            {{ calculateOriginalPrice() }}
          </span>
        </div>

        <!-- Add to Cart Button - Liquid Glass Style -->
        <LiquidButton
          variant="primary"
          full-width
          @click="addToBag"
          class="py-2.5 sm:py-3">
          <span class="whitespace-nowrap">Add to cart</span>
        </LiquidButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for all interactive elements */
button,
a {
  -webkit-tap-highlight-color: transparent;
}
</style>
