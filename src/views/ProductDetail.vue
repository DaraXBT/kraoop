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
      <NavBarComponentVue />
      <AnnouncementBanner />

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>

      <!-- Not Found State -->
      <div
        v-else-if="notFound || !currentProduct"
        class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center max-w-md">
          <svg
            class="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p class="text-gray-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <router-link
            to="/product"
            class="px-8 py-3 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition-colors inline-flex items-center gap-2">
            <span>Browse Products</span>
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
          </router-link>
        </div>
      </div>

      <!-- Main Content Container -->
      <div
        v-else
        class="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-10">
        <!-- Main Product Section -->
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-12 mb-10 sm:mb-12 lg:mb-14">
          <!-- Image Gallery -->
          <div class="flex flex-col gap-2.5 sm:gap-3">
            <!-- Main Image with Zoom -->
            <div
              @mouseenter="isHovering = true"
              @mouseleave="isHovering = false"
              @mousemove="handleMouseMove"
              @click="openLightbox"
              class="relative w-full aspect-square overflow-hidden rounded-xl  cursor-zoom-in group bg-gray-50">
              <img
                :src="selectedImage"
                alt="product"
                class="w-full h-full object-cover transition-transform duration-300"
                :class="{'scale-110': isHovering}" />

              <!-- Zoom Indicator -->
              <div
                v-if="!isHovering"
                class="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-1.5  opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  class="w-4 h-4 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>

              <!-- Image Counter -->
              <div
                class="absolute bottom-3 left-3 bg-black bg-opacity-60 text-white px-2.5 py-1 rounded-full text-xs font-medium">
                {{ currentImageIndex + 1 }} / {{ images.length }}
              </div>

              <!-- Navigation Arrows -->
              <LiquidButton
                @click.stop="previousImage"
                variant="glass"
                size="sm"
                :class="'absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all rounded-full p-1.5 '">
                <template #icon>
                  <svg
                    class="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7" />
                  </svg>
                </template>
              </LiquidButton>
              <LiquidButton
                @click.stop="nextImage"
                variant="glass"
                size="sm"
                :class="'absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all rounded-full p-1.5 '">
                <template #icon>
                  <svg
                    class="w-5 h-5 text-gray-700"
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
              </LiquidButton>
            </div>

            <!-- Thumbnail Gallery -->
            <div class="grid grid-cols-5 gap-1.5 sm:gap-2">
              <div
                v-for="(image, index) in images"
                :key="index"
                @click="selectImage(index)"
                class="aspect-square overflow-hidden rounded-lg cursor-pointer transition-all bg-gray-50"
                :class="{
                  'border-2 border-neutral-900 ring-2 ring-neutral-900/20':
                    currentImageIndex === index,
                  'border-2 border-transparent hover:border-gray-300':
                    currentImageIndex !== index,
                }">
                <img
                  :src="image"
                  alt="thumbnail"
                  class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="flex flex-col gap-4 sm:gap-5">
            <!-- Title & Rating -->
            <div class="space-y-2.5">
              <p class="text-xs text-gray-500 uppercase tracking-wide">
                {{ currentProduct.brand }}
              </p>
              <h1
                class="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-900 leading-tight">
                {{ currentProduct.title }}
              </h1>
              <p class="text-sm text-gray-600">{{ currentProduct.product }}</p>
              <div class="flex items-center gap-2 flex-wrap">
                <div class="flex items-center gap-0.5">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="w-3.5 h-3.5"
                    :class="
                      star <= Math.floor(currentProduct.rating)
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
                  >({{ currentProduct.ratingCount }} reviews)</span
                >
              </div>
              <div class="flex items-baseline gap-2.5">
                <p class="text-xl sm:text-2xl font-semibold text-neutral-900">
                  {{ currentProduct.price }}
                </p>
                <span
                  v-if="currentProduct.promotion"
                  class="text-base text-gray-400 line-through">
                  {{ currentProduct.originalPrice }}
                </span>
                <span
                  v-if="currentProduct.promotion"
                  class="px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {{ currentProduct.promotion }}
                </span>
              </div>
            </div>

            <!-- Description -->
            <div class="space-y-2.5 border-t border-gray-100 pt-4">
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
                {{ currentProduct.category }} by {{ currentProduct.brand }}.
                Perfect for
                {{ currentProduct.skinType?.join(", ") || "all skin types" }}.
                {{
                  currentProduct.inStock
                    ? "In stock and ready to ship!"
                    : "Currently out of stock."
                }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in currentProduct.tags"
                  :key="tag"
                  class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  #{{ tag }}
                </span>
              </div>
            </div>

            <!-- Recommended For -->
            <div class="space-y-2 sm:space-y-3">
              <h3
                class="text-sm sm:text-base font-semibold text-neutral-700 uppercase">
                Recommended For
              </h3>
              <div class="flex flex-wrap gap-3 sm:gap-4">
                <div
                  v-for="skinType in currentProduct.skinType"
                  :key="skinType"
                  class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                  <svg
                    class="w-5 h-5 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-xs sm:text-sm text-gray-700 font-medium">{{
                    skinType
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div
              class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-5 border-t border-gray-100">
              <LiquidButton
                @click="addProductToCart"
                variant="accent"
                size="lg"
                :class="'flex-1 sm:flex-none sm:min-w-[200px] min-h-[48px]'">
                Add to Bag
              </LiquidButton>
              <LiquidButton
                @click="buyNow"
                variant="primary"
                size="lg"
                :class="'flex-1 sm:flex-none sm:min-w-[200px] min-h-[48px]'">
                Buy Now
              </LiquidButton>
              <LiquidButton
                @click="toggleWishlist"
                :variant="isInWishlist ? 'primary' : 'glass'"
                size="lg"
                :class="'min-h-[48px]'"
                :active="isInWishlist">
                <template #icon>
                  <svg
                    class="w-5 h-5 transition-colors relative z-10"
                    :class="{
                      'text-white': isInWishlist,
                      'text-gray-700': !isInWishlist,
                    }"
                    :fill="isInWishlist ? 'currentColor' : 'none'"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </template>
              </LiquidButton>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center gap-4">
              <span class="text-sm sm:text-base font-medium text-gray-700"
                >Quantity:</span
              >
              <div class="flex items-center gap-3">
                <LiquidButton
                  @click="decreaseQuantity"
                  variant="glass"
                  size="sm"
                  :class="'w-10 h-10'">
                  <template #icon>
                    <svg
                      class="w-4 h-4 text-gray-700 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M20 12H4" />
                    </svg>
                  </template>
                </LiquidButton>
                <span
                  class="w-16 text-center text-lg font-semibold text-gray-800">
                  {{ quantity }}
                </span>
                <LiquidButton
                  @click="increaseQuantity"
                  variant="glass"
                  size="sm"
                  :class="'w-10 h-10'">
                  <template #icon>
                    <svg
                      class="w-4 h-4 text-gray-700 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2.5"
                        d="M12 4v16m8-8H4" />
                    </svg>
                  </template>
                </LiquidButton>
              </div>
            </div>

            <!-- Product Details Accordion -->
            <div class="space-y-2 sm:space-y-3">
              <!-- What Makes It Good -->
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <div class="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4">
                  <h3
                    class="text-xs sm:text-sm font-semibold text-neutral-700 uppercase">
                    What Makes It Good
                  </h3>
                </div>
                <div class="px-4 py-3 sm:px-5 sm:py-4 space-y-2 sm:space-y-3">
                  <p class="text-sm sm:text-base text-gray-600 leading-relaxed">
                    A clear, water-jelly cream with Cherry Blossom and
                    Niacinamide that delivers a burst of hydration and glow for
                    visibly brighter, dewy skin.
                  </p>
                  <div>
                    <p
                      class="text-sm sm:text-base font-semibold text-neutral-700 mb-2">
                      Key Ingredients
                    </p>
                    <ul
                      class="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1">
                      <li>Cherry Blossom Extracts</li>
                      <li>Niacinamide</li>
                      <li>Sugar Beet Betaine</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Ingredients -->
              <div class="border border-gray-200 rounded-lg">
                <div
                  class="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <h3
                    class="text-xs sm:text-sm font-semibold text-neutral-700 uppercase">
                    Ingredients
                  </h3>
                </div>
              </div>

              <!-- How to Use -->
              <div class="border border-gray-200 rounded-lg">
                <div
                  class="bg-gray-50 px-4 py-3 sm:px-5 sm:py-4 cursor-pointer hover:bg-gray-100 transition-colors">
                  <h3
                    class="text-xs sm:text-sm font-semibold text-neutral-700 uppercase">
                    How to Use
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="w-full mb-12 sm:mb-16">
          <!-- Review Header -->
          <div class="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div class="text-center space-y-2">
              <h2
                class="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-800 uppercase">
                Read the Reviews
              </h2>
              <button
                class="text-sm sm:text-base text-gray-500 hover:text-[#F5A3B7] transition-colors">
                see all
              </button>
            </div>
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="flex items-center gap-1">
                <img
                  src="../assets/icons/starFill.svg"
                  alt="star"
                  class="w-4 h-4 sm:w-5 sm:h-5" />
                <img
                  src="../assets/icons/starFill.svg"
                  alt="star"
                  class="w-4 h-4 sm:w-5 sm:h-5" />
                <img
                  src="../assets/icons/starFill.svg"
                  alt="star"
                  class="w-4 h-4 sm:w-5 sm:h-5" />
                <img
                  src="../assets/icons/starFill.svg"
                  alt="star"
                  class="w-4 h-4 sm:w-5 sm:h-5" />
                <img
                  src="../assets/icons/star.svg"
                  alt="star"
                  class="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span class="text-sm sm:text-base text-gray-500">4 reviews</span>
            </div>
            <LiquidButton
              variant="secondary"
              size="lg"
              class="px-8 sm:px-12">
              Write a Review
            </LiquidButton>
          </div>

          <!-- Review Cards -->
          <div class="space-y-6 sm:space-y-8">
            <!-- Review 1 -->
            <div
              class="liquid-glass-review-card flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl group transition-all duration-500">
              <img
                class="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-3 border-white shadow-lg ring-2 ring-pink-100/50"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
                alt="reviewer" />
              <div class="relative z-10 flex-grow space-y-3">
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span
                      class="text-sm sm:text-base font-bold text-neutral-900"
                      >Cathy K.</span
                    >
                    <span
                      class="text-xs sm:text-sm text-[#F5A3B7] font-semibold ml-2 bg-[#F5A3B7]/15 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      >Verified Buyer</span
                    >
                  </div>
                  <span class="text-xs sm:text-sm text-gray-600 font-medium">27/02/24</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4 text-yellow-400 fill-current drop-shadow-md"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 class="text-sm sm:text-base font-bold text-neutral-900">
                  VERY MOISTURIZING
                </h4>
                <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                  I didn't know how effective the gel cream would be since I was
                  skeptical of the texture, but my sensitive skin loved it and I
                  didn't even break out when I first started using it. Love it!
                </p>
                <img
                  class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-white/70 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  src="https://www.cosrx.com/cdn/shop/files/aloe-soothing-sun-cream-spf50-pa-cosrx-official-6.jpg?v=1685603393"
                  alt="review" />
              </div>
            </div>

            <!-- Review 2 -->
            <div
              class="liquid-glass-review-card flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl group transition-all duration-500">
              <img
                class="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-3 border-white shadow-lg ring-2 ring-pink-100/50"
                src="https://cdn.i-scmp.com/sites/default/files/styles/square/public/d8/yp/images/neymar_aug_2017_ap9.jpg?itok=6hnplXy7"
                alt="reviewer" />
              <div class="relative z-10 flex-grow space-y-3">
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span
                      class="text-sm sm:text-base font-bold text-neutral-900"
                      >Cathy K.</span
                    >
                    <span
                      class="text-xs sm:text-sm text-[#F5A3B7] font-semibold ml-2 bg-[#F5A3B7]/15 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      >Verified Buyer</span
                    >
                  </div>
                  <span class="text-xs sm:text-sm text-gray-600 font-medium">26/02/24</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4 text-yellow-400 fill-current drop-shadow-md"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 class="text-sm sm:text-base font-bold text-neutral-900">
                  VERY MOISTURIZING
                </h4>
                <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                  I didn't know how effective the gel cream would be since I was
                  skeptical of the texture, but my sensitive skin loved it and I
                  didn't even break out when I first started using it. Love it!
                </p>
                <div class="flex gap-3">
                  <img
                    class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-white/70 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    src="https://www.cosrx.com/cdn/shop/files/aloe-soothing-sun-cream-spf50-pa-cosrx-official-10.jpg?v=1685603406"
                    alt="review" />
                  <img
                    class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-white/70 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                    src="https://www.cosrx.com/cdn/shop/files/aloe-soothing-sun-cream-spf50-pa-cosrx-official-1.jpg?v=1685603379"
                    alt="review" />
                </div>
              </div>
            </div>

            <!-- Review 3 -->
            <div
              class="liquid-glass-review-card flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl group transition-all duration-500">
              <img
                class="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0 border-3 border-white shadow-lg ring-2 ring-pink-100/50"
                src="https://pics.craiyon.com/2023-07-02/7488d4fbaf62421d8ca8b6cec4e9604b.webp"
                alt="reviewer" />
              <div class="relative z-10 flex-grow space-y-3">
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span
                      class="text-sm sm:text-base font-bold text-neutral-900"
                      >Aileen R.</span
                    >
                    <span
                      class="text-xs sm:text-sm text-[#F5A3B7] font-semibold ml-2 bg-[#F5A3B7]/15 px-2.5 py-1 rounded-full backdrop-blur-sm"
                      >Verified Buyer</span
                    >
                  </div>
                  <span class="text-xs sm:text-sm text-gray-600 font-medium">26/02/24</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-4 h-4 text-yellow-400 fill-current drop-shadow-md"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h4 class="text-sm sm:text-base font-bold text-neutral-900">
                  REALLY LIGHT AND NOT STICKY.
                </h4>
                <p class="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Really light and not sticky. My skin soaked it right up! I mix
                  it with the green tea products and it helps balance my combo
                  skin.
                </p>
                <img
                  class="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl border-2 border-white/70 shadow-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                  src="https://www.cosrx.com/cdn/shop/files/aloe-soothing-sun-cream-spf50-pa-cosrx-official-9.jpg?v=1685603403"
                  alt="review" />
              </div>
            </div>
          </div>
        </div>

        <!-- Recently Viewed Products -->
        <div class="mb-12 sm:mb-16">
          <div class="text-center mb-6 sm:mb-8">
            <h2
              class="text-2xl sm:text-3xl font-bold text-neutral-800 uppercase mb-2">
              Recently Viewed Products
            </h2>
            <button
              class="text-sm sm:text-base text-gray-500 hover:text-[#F5A3B7] transition-colors">
              see all
            </button>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
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

        <!-- You May Also Like -->
        <div v-if="relatedProducts.length > 0" class="mb-12 sm:mb-16">
          <div class="text-center mb-6 sm:mb-8">
            <h2
              class="text-2xl sm:text-3xl font-bold text-neutral-800 uppercase mb-2">
              You May Also Like
            </h2>
            <router-link
              :to="`/category?category=${currentProduct.category}`"
              class="text-sm sm:text-base text-gray-500 hover:text-[#F5A3B7] transition-colors">
              see all in {{ currentProduct.category }}
            </router-link>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <CartComponent
              v-for="product in relatedProducts"
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
      </div>

      <FooterComponentVue />

      <!-- Lightbox Modal -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <div
          v-if="showLightbox"
          @click="closeLightbox"
          class="fixed inset-0 z-[200] bg-black bg-opacity-95 flex items-center justify-center p-4">
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 text-white hover:text-[#F5A3B7] transition-colors z-10">
            <svg
              class="w-8 h-8"
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

          <div
            class="relative max-w-6xl w-full h-full flex items-center justify-center"
            @click.stop>
            <!-- Previous Button -->
            <button
              @click="previousImage"
              class="absolute left-0 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3  transition-all z-10">
              <svg
                class="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Lightbox Image -->
            <img
              :src="selectedImage"
              alt="Product"
              class="max-h-[90vh] max-w-full object-contain rounded-lg " />

            <!-- Next Button -->
            <button
              @click="nextImage"
              class="absolute right-0 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3  transition-all z-10">
              <svg
                class="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <!-- Image Counter -->
            <div
              class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium ">
              {{ currentImageIndex + 1 }} / {{ images.length }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch, nextTick} from "vue";
import {useRoute, useRouter} from "vue-router";
import FooterComponentVue from "../components/FooterComponent.vue";
import NavBarComponentVue from "../components/NavBarComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import AnnouncementBanner from "../components/AnnouncementBanner.vue";
import LiquidButton from "../components/LiquidButton.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import {useSEO} from "../composables/useSEO";

const route = useRoute();
const router = useRouter();
const store = useProductStore();
const {success, error: showError} = useToast();

// Get product ID from route
const productId = computed(() => {
  const id = route.params.id || route.query.id;
  return id ? parseInt(id) : null;
});

// Get current product from store
const currentProduct = computed(() => {
  if (!productId.value) return null;
  return store.getProductById(productId.value);
});

// Loading state
const isLoading = ref(true);
const notFound = ref(false);

// Image Gallery State
const images = computed(() => {
  if (!currentProduct.value) return [];
  // In real app, product would have multiple images
  // For now, use the main image repeated
  return [
    currentProduct.value.image,
    currentProduct.value.image,
    currentProduct.value.image,
  ];
});

const currentImageIndex = ref(0);
const selectedImage = computed(() => images.value[currentImageIndex.value]);
const isHovering = ref(false);
const showLightbox = ref(false);

// Product State
const quantity = ref(1);
const isInWishlist = computed(() => {
  if (!currentProduct.value) return false;
  return store.isInWishlist(currentProduct.value.id);
});

// SEO
watch(
  currentProduct,
  (product) => {
    if (product) {
      useSEO({
        title: `${product.title} - ${product.brand}`,
        description: `Buy ${product.title} by ${product.brand}. ${
          product.category
        } for ${product.skinType?.join(", ") || "all skin types"}. ${
          product.price
        }`,
        image: product.image,
        url: `/detail/${product.id}`,
        type: "product",
        product: {
          price: product.price.replace("$", ""),
          currency: "USD",
          availability: product.inStock ? "in stock" : "out of stock",
        },
      });
    }
  },
  {immediate: true}
);

// Quantity Functions
const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

// Add to Cart with Quantity
const addProductToCart = () => {
  if (!currentProduct.value) return;

  for (let i = 0; i < quantity.value; i++) {
    store.addToCart(currentProduct.value);
  }
  success(
    `${quantity.value} ${
      quantity.value > 1 ? "items" : "item"
    } added to cart! 🛒`,
    3000
  );
  quantity.value = 1; // Reset quantity after adding
};

// Buy Now - Add to cart and redirect
const buyNow = () => {
  if (!currentProduct.value) return;

  for (let i = 0; i < quantity.value; i++) {
    store.addToCart(currentProduct.value);
  }
  success("Redirecting to checkout... 💳", 2000);
  setTimeout(() => {
    router.push("/payment");
  }, 2000);
};

// Wishlist Toggle
const toggleWishlist = () => {
  if (!currentProduct.value) return;

  const added = store.toggleWishlist(currentProduct.value);
  if (added) {
    success("Added to wishlist! ❤️", 2000);
  } else {
    success("Removed from wishlist", 2000);
  }
};

// Image Gallery Functions
const selectImage = (index) => {
  currentImageIndex.value = index;
};

const previousImage = () => {
  currentImageIndex.value =
    (currentImageIndex.value - 1 + images.value.length) % images.value.length;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length;
};

const openLightbox = () => {
  showLightbox.value = true;
  document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
  showLightbox.value = false;
  document.body.style.overflow = "";
};

const handleMouseMove = (e) => {
  // Future enhancement: Add magnifying glass effect
};

// Keyboard navigation for lightbox
const handleKeydown = (e) => {
  if (showLightbox.value) {
    if (e.key === "ArrowLeft") previousImage();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "Escape") closeLightbox();
  }
};

// Related products (same category or brand)
const relatedProducts = computed(() => {
  if (!currentProduct.value) return [];
  return store.products
    .filter(
      (p) =>
        p.id !== currentProduct.value.id &&
        (p.category === currentProduct.value.category ||
          p.brand === currentProduct.value.brand)
    )
    .slice(0, 4);
});

const handleAddToCart = (product) => {
  store.addToCart(product);
  success("Product added to cart successfully! 🛒", 3000);
};

// Initialize
onMounted(async () => {
  window.addEventListener("keydown", handleKeydown);

  // Check if product exists - use nextTick for proper reactivity
  await nextTick();
  isLoading.value = false;

  if (!currentProduct.value) {
    notFound.value = true;
    showError("Product not found");
  }
});
</script>

<style scoped>
.menu-product {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.option-shop {
  background-color: #fff;
  cursor: pointer;
}
</style>
