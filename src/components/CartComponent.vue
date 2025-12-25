<script setup>
import {ref} from "vue";
import LiquidButton from "./LiquidButton.vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();

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
  <div class="card group relative w-full hover:z-10">
    <!-- Card Container - Liquid Glass Style -->
    <div
      class="liquid-glass-product-card w-full rounded-3xl flex flex-col overflow-hidden min-w-0 transition-all duration-500">
      <!-- Image Section with Favorite Icon -->
      <router-link
        :to="`/detail?id=${id}`"
        class="w-full overflow-hidden min-w-0 relative liquid-glass-image-container aspect-[4/5]">
        <!-- Glass Overlay on Image -->
        <div class="liquid-glass-overlay"></div>
        
        <!-- Favorite Icon - Liquid Glass Style -->
        <button
          @click.prevent="toggleFavorite"
          class="absolute top-3 left-3 z-20 cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 liquid-glass-heart-btn group/heart">
          <svg
            :class="{
              'fill-[#F5A3B7] stroke-[#F5A3B7] drop-shadow-[0_2px_8px_rgba(245,163,183,0.6)]': isFavorite,
              'fill-none stroke-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]': !isFavorite,
            }"
            class="w-5 h-5 transition-all duration-300 group-hover/heart:stroke-[#F5A3B7] group-hover/heart:drop-shadow-[0_2px_8px_rgba(245,163,183,0.4)]"
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
          class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out max-w-full"
          :src="image"
          :alt="title"
          loading="lazy"
          decoding="async" />
      </router-link>

      <!-- Content Section with Liquid Glass Background -->
      <div class="liquid-glass-content flex flex-col px-4 sm:px-5 py-4 sm:py-5 w-full gap-3 min-w-0">
        <!-- Product Title -->
        <router-link :to="`/detail?id=${id}`" class="w-full min-w-0">
          <h3
            class="w-full text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-[#F5A3B7] transition-all duration-300 line-clamp-2 leading-snug min-h-[2.25rem] sm:min-h-[2.5rem] break-words">
            {{ title }}
          </h3>
        </router-link>

        <!-- Price Section with Glass Badge -->
        <div class="flex items-baseline gap-2 w-full min-w-0">
          <span class="text-base sm:text-lg font-bold text-gray-900 liquid-glass-price">
            {{ price }}
          </span>
          <span
            v-if="promotion"
            class="text-xs sm:text-sm font-medium text-gray-400 line-through liquid-glass-old-price">
            {{ calculateOriginalPrice() }}
          </span>
        </div>

        <!-- Add to Cart Button - Liquid Glass Style -->
        <LiquidButton
          variant="primary"
          full-width
          @click="addToBag"
          class="py-2.5 sm:py-3 liquid-glass-add-btn">
          <span class="whitespace-nowrap font-semibold">{{ $t('product.add_to_cart') }}</span>
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

/* ========================================
   Liquid Glass Product Card
   ======================================== */

.liquid-glass-product-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(248, 250, 252, 0.9) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    inset 0 2px 0px rgba(255, 255, 255, 0.8),
    inset 0 -1px 0px rgba(0, 0, 0, 0.05);
}

.liquid-glass-product-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  opacity: 0.7;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.group:hover .liquid-glass-product-card::before {
  opacity: 0.9;
}

/* Shimmer effect on hover */
.liquid-glass-product-card::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
  z-index: 2;
}

.group:hover .liquid-glass-product-card::after {
  opacity: 1;
  animation: shimmer-sweep 1.5s ease-in-out;
}

@keyframes shimmer-sweep {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

.group:hover .liquid-glass-product-card {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 
    inset 0 2px 0px rgba(255, 255, 255, 0.9),
    inset 0 -1px 0px rgba(0, 0, 0, 0.08);
  border-color: rgba(255, 255, 255, 0.8);
}

/* ========================================
   Liquid Glass Image Container
   ======================================== */

.liquid-glass-image-container {
  background: transparent;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem 1.5rem 0 0; /* Match card's top border radius */
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.liquid-glass-image-container img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
  border: none;
}

.liquid-glass-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 40%,
    transparent 60%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
  z-index: 1;
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

.group:hover .liquid-glass-overlay {
  opacity: 0.3;
}

/* ========================================
   Liquid Glass Heart Button
   ======================================== */

.liquid-glass-heart-btn {
  position: absolute;
  padding: 0.5rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.7) 100%
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  box-shadow: 
    inset 0 1px 0px rgba(255, 255, 255, 1),
    0 4px 12px rgba(0, 0, 0, 0.15),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.liquid-glass-heart-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    transparent 60%
  );
  opacity: 0.8;
  pointer-events: none;
}

.liquid-glass-heart-btn:hover {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 163, 183, 0.2) 100%
  );
  box-shadow: 
    inset 0 1px 0px rgba(255, 255, 255, 1),
    0 6px 16px rgba(245, 163, 183, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ========================================
   Liquid Glass Content Section
   ======================================== */

.liquid-glass-content {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(248, 250, 252, 0.3) 100%
  );
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 3;
}

.liquid-glass-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
}

/* ========================================
   Liquid Glass Price Elements
   ======================================== */

.liquid-glass-price {
  position: relative;
  background: linear-gradient(
    135deg,
    #1f2937 0%,
    #374151 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.liquid-glass-old-price {
  position: relative;
  opacity: 0.6;
}

/* ========================================
   Liquid Glass Add Button Enhancement
   ======================================== */

.liquid-glass-add-btn {
  position: relative;
  z-index: 4;
}

/* ========================================
   Responsive Optimizations
   ======================================== */

@media (max-width: 640px) {
  .liquid-glass-product-card {
    box-shadow: 
      inset 0 1px 0px rgba(255, 255, 255, 0.7),
      inset 0 -1px 0px rgba(0, 0, 0, 0.04),
      0 4px 16px rgba(0, 0, 0, 0.06);
  }
  
  .group:hover .liquid-glass-product-card {
    transform: translateY(-2px) scale(1.01);
  }
  
  .liquid-glass-heart-btn {
    padding: 0.375rem;
  }
}

/* ========================================
   Reduced Motion Support
   ======================================== */

@media (prefers-reduced-motion: reduce) {
  .liquid-glass-product-card,
  .liquid-glass-product-card::before,
  .liquid-glass-product-card::after,
  .liquid-glass-overlay,
  .liquid-glass-heart-btn {
    transition: none;
    animation: none;
  }
  
  .group:hover .liquid-glass-product-card::after {
    animation: none;
  }
}
</style>
