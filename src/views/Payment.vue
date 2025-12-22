<template>
  <div class="min-h-screen relative overflow-x-hidden">
    <!-- iOS-inspired Animated Background -->
    <div
      class="fixed inset-0 -z-10 bg-gradient-to-br from-purple-50/20 via-pink-50/25 to-blue-50/15"></div>

    <NavBarComponentVue />

    <!-- Progress Steps - Glass Style -->
    <div
      class="glass-card-strong border-b border-white/30 sticky top-20 z-40 shadow-glass backdrop-blur-xl">
      <div class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5">
        <div class="flex items-center justify-center gap-3 sm:gap-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-glass border-2 border-white/50">
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="3">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="text-sm sm:text-base font-bold text-gray-700"
              >Cart</span
            >
          </div>
          <div
            class="h-1 w-12 sm:w-24 bg-gradient-to-r from-green-400 to-[#F5A3B7] rounded-full"></div>
          <div class="flex items-center gap-2 sm:gap-3">
            <div
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] flex items-center justify-center shadow-glass-lg border-2 border-white/50 animate-pulse">
              <span class="text-base sm:text-lg font-bold text-white">2</span>
            </div>
            <span
              class="text-sm sm:text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F5A3B7] to-[#E392A6]"
              >Checkout</span
            >
          </div>
          <div class="h-1 w-12 sm:w-24 bg-gray-300 rounded-full"></div>
          <div class="flex items-center gap-2 sm:gap-3">
            <div
              class="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card border-2 border-white/30 flex items-center justify-center shadow-glass-sm">
              <span class="text-base sm:text-lg font-bold text-gray-500"
                >3</span
              >
            </div>
            <span class="text-sm sm:text-base font-semibold text-gray-500"
              >Complete</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
      <!-- Order Summary Section -->
      <div class="mb-8 lg:mb-10">
        <div
          class="glass-card-strong rounded-3xl shadow-glass-xl border border-white/30 overflow-hidden hover:shadow-glass-xl transition-smooth">
          <!-- Header - Pink Gradient Theme -->
          <div
            class="bg-gradient-to-r from-pink-100 via-rose-100 to-pink-50 px-6 py-6 relative overflow-hidden border-b-2 border-pink-200/50">
            <div
              class="absolute inset-0 bg-gradient-to-br from-pink-200/20 to-rose-200/20"></div>
            <div class="flex items-center justify-between relative z-10">
              <h2
                class="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 flex items-center gap-3 drop-shadow-sm">
                <div
                  class="p-2 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl shadow-glass border-2 border-white/50">
                  <svg
                    class="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                </div>
                Your Order
              </h2>
              <span
                class="px-5 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-sm font-bold rounded-full border-2 border-white/50 shadow-glass backdrop-blur-sm">
                {{ cartItems.length }}
                {{ cartItems.length === 1 ? "Item" : "Items" }}
              </span>
            </div>
          </div>

          <!-- Empty Cart Message -->
          <div v-if="isEmpty" class="text-center py-20 px-6">
            <div class="mb-8 relative inline-block">
              <div
                class="absolute inset-0 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-2xl"></div>
              <svg
                class="w-32 h-32 mx-auto text-gray-300 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3
              class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
              Your cart is empty
            </h3>
            <p class="text-gray-600 mb-10 text-lg font-medium">
              Discover our amazing skincare products! ✨
            </p>
            <router-link to="/product">
              <button
                class="glass-card-strong px-10 py-4 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold text-lg rounded-2xl transition-smooth shadow-glass-lg hover:shadow-glass-xl hover:scale-105 active:scale-95 border-2 border-white/20">
                Explore Products
              </button>
            </router-link>
          </div>

          <!-- Product Table View - Glass Design -->
          <div v-else class="overflow-hidden">
            <!-- Desktop Table View -->
            <div class="hidden md:block">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr
                      class="glass-card-subtle border-b-2 border-white/40 backdrop-blur-sm">
                      <th
                        class="px-6 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th
                        class="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th
                        class="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th
                        class="px-6 py-5 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Subtotal
                      </th>
                      <th
                        class="px-6 py-5 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/20">
                    <tr
                      v-for="(item, index) in cartItems"
                      :key="item.id"
                      class="hover:bg-white/30 transition-smooth backdrop-blur-sm group">
                      <!-- Product Info -->
                      <td class="px-6 py-6">
                        <div class="flex items-center gap-4">
                          <div class="relative flex-shrink-0">
                            <img
                              :src="item.image"
                              :alt="item.title"
                              class="w-24 h-24 object-cover rounded-2xl border-2 border-white/50 group-hover:border-white/80 transition-smooth shadow-glass-lg hover:scale-105" />
                            <span
                              class="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                              {{ index + 1 }}
                            </span>
                          </div>
                          <div class="flex-grow min-w-0">
                            <h3
                              class="text-base font-bold text-gray-800 line-clamp-2 mb-2">
                              {{ item.title }}
                            </h3>
                            <p
                              class="text-sm text-gray-600 line-clamp-1 font-medium">
                              {{ item.product }}
                            </p>
                          </div>
                        </div>
                      </td>

                      <!-- Price -->
                      <td class="px-6 py-6 text-center">
                        <span class="text-lg font-bold text-gray-800">
                          {{ item.price }}
                        </span>
                      </td>

                      <!-- Quantity Controls -->
                      <td class="px-6 py-6">
                        <div class="flex items-center justify-center gap-2">
                          <div
                            class="flex items-center gap-2 glass-card-strong rounded-xl px-2 py-2 border border-white/40 shadow-glass">
                            <button
                              @click="decreaseQuantity(item.id)"
                              :disabled="item.quantity <= 1"
                              :class="[
                                'w-8 h-8 flex items-center justify-center rounded-lg font-bold text-lg transition-smooth',
                                item.quantity <= 1
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#F5A3B7] hover:to-[#E392A6] hover:text-white shadow-glass-sm active:scale-95',
                              ]">
                              −
                            </button>
                            <span
                              class="font-bold text-gray-800 min-w-[36px] text-center text-lg">
                              {{ item.quantity }}
                            </span>
                            <button
                              @click="increaseQuantity(item.id)"
                              class="w-8 h-8 flex items-center justify-center rounded-lg font-bold text-lg bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] hover:from-[#E392A6] hover:to-[#F5A3B7] text-white transition-smooth shadow-glass-sm active:scale-95">
                              +
                            </button>
                          </div>
                        </div>
                      </td>

                      <!-- Subtotal -->
                      <td class="px-6 py-6 text-right">
                        <span
                          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F5A3B7] to-[#B76E79]">
                          ${{
                            (
                              parseFloat(item.price.replace("$", "")) *
                              item.quantity
                            ).toFixed(2)
                          }}
                        </span>
                      </td>

                      <!-- Remove Button -->
                      <td class="px-6 py-6 text-center">
                        <button
                          @click="removeItem(item.id)"
                          class="w-11 h-11 glass-card-strong hover:bg-red-50/50 text-red-600 hover:text-red-700 rounded-xl flex items-center justify-center transition-smooth border border-white/30 shadow-glass hover:shadow-glass-lg mx-auto group-hover:scale-110 active:scale-95"
                          title="Remove item">
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Mobile Card View - Glass Design -->
            <div class="md:hidden space-y-4 p-4">
              <div
                v-for="(item, index) in cartItems"
                :key="item.id"
                class="glass-card-strong rounded-2xl border-2 border-white/40 overflow-hidden shadow-glass-lg hover:shadow-glass-xl transition-smooth">
                <div class="flex gap-4 p-5">
                  <!-- Product Image -->
                  <div class="relative flex-shrink-0">
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-28 h-28 object-cover rounded-2xl border-2 border-white/50 shadow-glass transition-smooth hover:scale-105" />
                    <span
                      class="absolute -top-2 -left-2 w-7 h-7 bg-gradient-to-br from-[#F5A3B7] to-[#E392A6] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-glass border-2 border-white/50">
                      {{ index + 1 }}
                    </span>
                  </div>

                  <!-- Product Details -->
                  <div class="flex-grow min-w-0">
                    <h3
                      class="text-sm font-bold text-gray-800 line-clamp-2 mb-2">
                      {{ item.title }}
                    </h3>
                    <p class="text-xs text-gray-600 mb-3 font-medium">
                      {{ item.product }}
                    </p>
                    <div class="flex items-center justify-between">
                      <span class="text-lg font-bold text-gray-800">{{
                        item.price
                      }}</span>
                      <button
                        @click="removeItem(item.id)"
                        class="w-9 h-9 glass-card-strong hover:bg-red-50/50 text-red-600 hover:text-red-700 rounded-xl flex items-center justify-center transition-smooth border border-white/30 shadow-glass active:scale-95"
                        title="Remove">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2.5">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Quantity and Subtotal -->
                <div
                  class="glass-card-subtle px-5 py-4 flex items-center justify-between border-t border-white/30 backdrop-blur-sm">
                  <div
                    class="flex items-center gap-2 glass-card-strong rounded-xl px-2 py-2 border border-white/40 shadow-glass">
                    <button
                      @click="decreaseQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                      :class="[
                        'w-8 h-8 flex items-center justify-center rounded-lg font-bold transition-smooth',
                        item.quantity <= 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-[#F5A3B7] hover:to-[#E392A6] hover:text-white active:scale-95',
                      ]">
                      −
                    </button>
                    <span
                      class="font-bold text-gray-800 min-w-[36px] text-center">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="increaseQuantity(item.id)"
                      class="w-8 h-8 flex items-center justify-center rounded-lg font-bold bg-gradient-to-r from-[#F5A3B7] to-[#E392A6] hover:from-[#E392A6] hover:to-[#F5A3B7] text-white transition-smooth active:scale-95">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-600 mb-1 font-semibold">
                      Subtotal
                    </p>
                    <p
                      class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F5A3B7] to-[#B76E79]">
                      ${{
                        (
                          parseFloat(item.price.replace("$", "")) *
                          item.quantity
                        ).toFixed(2)
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary & Promo Code - Integrated Design -->
            <div class="backdrop-blur-xl">
              <div class="px-6 sm:px-8 py-6">
                <!-- Promo Code Section - Compact -->
                <div
                  class="glass-card-subtle rounded-2xl p-5 border-2 border-white/40 shadow-glass-lg mb-6">
                  <label
                    class="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                    <div
                      class="p-1.5 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg shadow-glass">
                      <svg
                        class="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                    </div>
                    Have a Promo Code?
                  </label>
                  <div class="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      class="flex-grow px-4 py-3 text-sm glass-card-strong border-2 border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-smooth shadow-glass font-medium placeholder:text-gray-400" />
                    <button
                      class="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white text-sm font-bold rounded-xl transition-smooth shadow-glass-lg hover:shadow-glass-xl whitespace-nowrap active:scale-95 border-2 border-white/20">
                      Apply
                    </button>
                  </div>
                </div>

                <!-- Order Summary Table -->
                <div class="overflow-hidden rounded-2xl shadow-glass-xl">
                  <!-- Desktop View -->
                  <table class="hidden md:table w-full border-collapse">
                    <tbody>
                      <!-- Subtotal Row -->
                      <tr class="border-b border-white/20">
                        <td
                          class="px-6 py-5 text-left bg-white/40 backdrop-blur-sm">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                              <svg
                                class="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2.5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                              </svg>
                            </div>
                            <span class="text-base font-bold text-gray-700"
                              >Subtotal</span
                            >
                          </div>
                        </td>
                        <td
                          class="px-6 py-5 text-right bg-white/40 backdrop-blur-sm">
                          <span class="text-xl font-bold text-gray-800"
                            >${{ subtotal }}</span
                          >
                        </td>
                      </tr>

                      <!-- Shipping Row -->
                      <tr class="border-b border-white/20">
                        <td
                          class="px-6 py-5 text-left bg-white/30 backdrop-blur-sm">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                              <svg
                                class="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2.5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                              </svg>
                            </div>
                            <span class="text-base font-bold text-gray-700"
                              >Shipping</span
                            >
                          </div>
                        </td>
                        <td
                          class="px-6 py-5 text-right bg-white/30 backdrop-blur-sm">
                          <span class="text-xl font-bold text-gray-800"
                            >${{ shipping.toFixed(2) }}</span
                          >
                        </td>
                      </tr>

                      <!-- Tax Row -->
                      <tr class="border-b border-white/20">
                        <td
                          class="px-6 py-5 text-left bg-white/40 backdrop-blur-sm">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                              <svg
                                class="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2.5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                              </svg>
                            </div>
                            <span class="text-base font-bold text-gray-700"
                              >Tax
                              <span class="text-sm text-gray-500"
                                >(10%)</span
                              ></span
                            >
                          </div>
                        </td>
                        <td
                          class="px-6 py-5 text-right bg-white/40 backdrop-blur-sm">
                          <span class="text-xl font-bold text-gray-800"
                            >${{ tax }}</span
                          >
                        </td>
                      </tr>

                      <!-- Discount Row (if applicable) -->
                      <tr v-if="discount > 0" class="border-b border-white/20">
                        <td
                          class="px-6 py-5 text-left bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-glass border-2 border-white/50 animate-pulse">
                              <svg
                                class="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2.5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                              </svg>
                            </div>
                            <span
                              class="text-base font-bold text-green-700 flex items-center gap-2">
                              Discount
                              <span class="text-sm text-green-600">(15%)</span>
                              <span
                                class="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full"
                                >SAVE</span
                              >
                            </span>
                          </div>
                        </td>
                        <td
                          class="px-6 py-5 text-right bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm">
                          <span class="text-xl font-bold text-green-600"
                            >-${{ discount }}</span
                          >
                        </td>
                      </tr>

                      <!-- Total Row - Highlighted -->
                      <tr
                        class="bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 border-t-4 border-pink-300">
                        <td class="px-6 py-6 text-left">
                          <div class="flex items-center gap-3">
                            <div
                              class="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                              <svg
                                class="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="2.5">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <span
                              class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600"
                              >Total</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-6 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <span
                              class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 drop-shadow-sm"
                              >${{ total }}</span
                            >
                            <div
                              class="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                              <svg
                                class="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                stroke-width="3">
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- Mobile View - Card Based -->
                  <div class="md:hidden space-y-3">
                    <!-- Subtotal Card -->
                    <div
                      class="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border-b border-white/20">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                          <svg
                            class="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <span class="text-sm font-bold text-gray-700"
                          >Subtotal</span
                        >
                      </div>
                      <span class="text-lg font-bold text-gray-800"
                        >${{ subtotal }}</span
                      >
                    </div>

                    <!-- Shipping Card -->
                    <div
                      class="flex items-center justify-between p-4 bg-white/30 backdrop-blur-sm border-b border-white/20">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                          <svg
                            class="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                          </svg>
                        </div>
                        <span class="text-sm font-bold text-gray-700"
                          >Shipping</span
                        >
                      </div>
                      <span class="text-lg font-bold text-gray-800"
                        >${{ shipping.toFixed(2) }}</span
                      >
                    </div>

                    <!-- Tax Card -->
                    <div
                      class="flex items-center justify-between p-4 bg-white/40 backdrop-blur-sm border-b border-white/20">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                          <svg
                            class="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path>
                          </svg>
                        </div>
                        <span class="text-sm font-bold text-gray-700"
                          >Tax
                          <span class="text-xs text-gray-500">(10%)</span></span
                        >
                      </div>
                      <span class="text-lg font-bold text-gray-800"
                        >${{ tax }}</span
                      >
                    </div>

                    <!-- Discount Card -->
                    <div
                      v-if="discount > 0"
                      class="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border-b border-white/20">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-glass border-2 border-white/50 animate-pulse">
                          <svg
                            class="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                          </svg>
                        </div>
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-bold text-green-700"
                            >Discount</span
                          >
                          <span class="text-xs text-green-600 font-semibold"
                            >(15%)</span
                          >
                          <span
                            class="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full"
                            >SAVE</span
                          >
                        </div>
                      </div>
                      <span class="text-lg font-bold text-green-600"
                        >-${{ discount }}</span
                      >
                    </div>

                    <!-- Total Card -->
                    <div
                      class="flex items-center justify-between p-5 bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100 border-t-4 border-pink-300 rounded-b-2xl">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                          <svg
                            class="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <span
                          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600"
                          >Total</span
                        >
                      </div>
                      <div class="flex items-center gap-2">
                        <span
                          class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 drop-shadow-sm"
                          >${{ total }}</span
                        >
                        <div
                          class="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-glass border-2 border-white/50">
                          <svg
                            class="w-3.5 h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="3">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout Form Section -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        v-if="!isEmpty">
        <!-- Left Column: Contact & Shipping -->
        <div class="space-y-6">
          <div
            class="glass-card-strong rounded-3xl shadow-glass-xl border-2 border-white/40 overflow-hidden">
            <!-- Section Header -->
            <div
              class="glass-card-subtle px-6 py-5 border-b-2 border-white/30 backdrop-blur-xl">
              <h3
                class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div
                  class="p-2 bg-gradient-to-br from-pink-400 to-purple-400 rounded-2xl shadow-glass border-2 border-white/50">
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                Contact & Shipping Details
              </h3>
            </div>

            <div class="p-6 space-y-5 backdrop-blur-sm">
              <!-- Contact Email -->
              <div
                class="p-6 glass-card-strong rounded-2xl border-2 border-white/40 hover:border-white/60 transition-smooth shadow-glass-lg hover:shadow-glass-xl">
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                    <svg
                      class="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow min-w-0">
                    <div
                      class="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      Email Address
                    </div>
                    <div class="text-base text-gray-800 font-bold break-all">
                      daraa.veasna@gmail.com
                    </div>
                  </div>
                  <button
                    class="flex-shrink-0 px-5 py-2.5 text-sm font-bold text-[#F5A3B7] hover:text-white hover:bg-gradient-to-r hover:from-[#F5A3B7] hover:to-[#E392A6] border-2 border-white/40 rounded-xl transition-smooth glass-card-subtle shadow-glass active:scale-95">
                    Edit
                  </button>
                </div>
              </div>

              <!-- Shipping Address -->
              <div
                class="p-6 glass-card-strong rounded-2xl border-2 border-white/40 hover:border-white/60 transition-smooth shadow-glass-lg hover:shadow-glass-xl">
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                    <svg
                      class="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow min-w-0">
                    <div
                      class="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      Shipping Address
                    </div>
                    <div class="text-base text-gray-800 font-bold">
                      Khan Toul Kouk, Phnom Penh, Cambodia
                    </div>
                  </div>
                  <button
                    class="flex-shrink-0 px-5 py-2.5 text-sm font-bold text-[#F5A3B7] hover:text-white hover:bg-gradient-to-r hover:from-[#F5A3B7] hover:to-[#E392A6] border-2 border-white/40 rounded-xl transition-smooth glass-card-subtle shadow-glass active:scale-95">
                    Edit
                  </button>
                </div>
              </div>

              <!-- Delivery Method -->
              <div
                class="p-6 glass-card-strong rounded-2xl border-2 border-white/40 hover:border-white/60 transition-smooth shadow-glass-lg hover:shadow-glass-xl">
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-glass-lg border-2 border-white/50">
                    <svg
                      class="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      stroke-width="2">
                      <path
                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                    </svg>
                  </div>
                  <div class="flex-grow min-w-0">
                    <div
                      class="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                      Delivery Method
                    </div>
                    <div class="text-base text-gray-800 font-bold">
                      Fast Shipping -
                      <span
                        class="bg-clip-text text-transparent bg-gradient-to-r from-[#F5A3B7] to-[#B76E79]"
                        >$5.00</span
                      >
                    </div>
                    <div class="text-sm text-gray-600 mt-1.5 font-medium">
                      Estimated: 3-5 business days ✨
                    </div>
                  </div>
                  <button
                    class="flex-shrink-0 px-5 py-2.5 text-sm font-bold text-[#F5A3B7] hover:text-white hover:bg-gradient-to-r hover:from-[#F5A3B7] hover:to-[#E392A6] border-2 border-white/40 rounded-xl transition-smooth glass-card-subtle shadow-glass active:scale-95">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Payment Method -->
        <div class="space-y-6">
          <div
            class="glass-card-strong rounded-3xl shadow-glass-xl border-2 border-white/40 overflow-hidden">
            <!-- Section Header -->
            <div
              class="glass-card-subtle px-6 py-5 border-b-2 border-white/30 backdrop-blur-xl">
              <h3
                class="text-xl font-bold text-gray-800 flex items-center gap-3">
                <div
                  class="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl shadow-glass border-2 border-white/50">
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2.5">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                Payment Method
              </h3>
            </div>

            <div class="p-6 space-y-5 backdrop-blur-sm">
              <p class="text-sm text-gray-700 -mt-2 mb-4 font-semibold">
                Choose your preferred payment option 💳
              </p>

              <!-- Payment Options -->
              <div class="space-y-3">
                <!-- Credit Card -->
                <label
                  :class="[
                    'flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-smooth group shadow-glass',
                    selectedPaymentMethod === 'card'
                      ? 'border-white/60 glass-card-strong shadow-glass-lg scale-[1.02]'
                      : 'border-white/30 glass-card-subtle hover:border-white/50 hover:shadow-glass-lg hover:scale-[1.01]',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    v-model="selectedPaymentMethod"
                    class="w-5 h-5 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer flex-shrink-0 checked:scale-110 transition-smooth" />
                  <span
                    class="text-base font-bold text-gray-800 flex-grow group-hover:text-gray-900">
                    Credit / Debit Card
                  </span>
                  <img
                    src="../assets/icons/credit-card.svg"
                    alt="Credit Card"
                    class="h-7 w-auto object-contain flex-shrink-0 transition-smooth group-hover:scale-110" />
                </label>

                <!-- PayPal -->
                <label
                  :class="[
                    'flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-smooth group shadow-glass',
                    selectedPaymentMethod === 'paypal'
                      ? 'border-white/60 glass-card-strong shadow-glass-lg scale-[1.02]'
                      : 'border-white/30 glass-card-subtle hover:border-white/50 hover:shadow-glass-lg hover:scale-[1.01]',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    v-model="selectedPaymentMethod"
                    class="w-5 h-5 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer flex-shrink-0 checked:scale-110 transition-smooth" />
                  <span
                    class="text-base font-bold text-gray-800 flex-grow group-hover:text-gray-900">
                    PayPal
                  </span>
                  <img
                    src="../assets/icons/paypal-bordered.svg"
                    alt="PayPal"
                    class="h-7 w-auto object-contain flex-shrink-0 transition-smooth group-hover:scale-110" />
                </label>

                <!-- Bitcoin -->
                <label
                  :class="[
                    'flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-smooth group shadow-glass',
                    selectedPaymentMethod === 'bitcoin'
                      ? 'border-white/60 glass-card-strong shadow-glass-lg scale-[1.02]'
                      : 'border-white/30 glass-card-subtle hover:border-white/50 hover:shadow-glass-lg hover:scale-[1.01]',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="bitcoin"
                    v-model="selectedPaymentMethod"
                    class="w-5 h-5 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer flex-shrink-0 checked:scale-110 transition-smooth" />
                  <span
                    class="text-base font-bold text-gray-800 flex-grow group-hover:text-gray-900">
                    Bitcoin (BTC)
                  </span>
                  <img
                    src="../assets/icons/btc.svg"
                    alt="Bitcoin"
                    class="h-7 w-auto object-contain flex-shrink-0 transition-smooth group-hover:scale-110" />
                </label>

                <!-- Binance Pay -->
                <label
                  :class="[
                    'flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-smooth group shadow-glass',
                    selectedPaymentMethod === 'binance'
                      ? 'border-white/60 glass-card-strong shadow-glass-lg scale-[1.02]'
                      : 'border-white/30 glass-card-subtle hover:border-white/50 hover:shadow-glass-lg hover:scale-[1.01]',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="binance"
                    v-model="selectedPaymentMethod"
                    class="w-5 h-5 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer flex-shrink-0 checked:scale-110 transition-smooth" />
                  <span
                    class="text-base font-bold text-gray-800 flex-grow group-hover:text-gray-900">
                    Binance Pay
                  </span>
                  <img
                    src="../assets/icons/binance-official.svg"
                    alt="Binance Pay"
                    class="h-7 w-auto object-contain flex-shrink-0 transition-smooth group-hover:scale-110" />
                </label>
              </div>

              <!-- Saved Cards List - Only show for Credit/Debit Card -->
              <transition name="fade-slide">
                <div
                  v-if="selectedPaymentMethod === 'card'"
                  class="mt-6 space-y-4">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="text-base font-bold text-gray-800">
                      Select Payment Card
                    </h4>
                    <button
                      @click="showAddCardForm = !showAddCardForm"
                      class="text-sm font-bold text-[#F5A3B7] hover:text-[#B76E79] flex items-center gap-2 transition-smooth glass-card-subtle px-4 py-2 rounded-xl shadow-glass hover:shadow-glass-lg active:scale-95">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2.5">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Add New Card
                    </button>
                  </div>

                  <!-- Saved Cards -->
                  <div class="space-y-3">
                    <label
                      v-for="card in savedCards"
                      :key="card.id"
                      :class="[
                        'block p-5 border-2 rounded-2xl cursor-pointer transition-smooth shadow-glass',
                        selectedCard === card.id
                          ? 'border-white/60 glass-card-strong shadow-glass-lg scale-[1.02]'
                          : 'border-white/30 glass-card-subtle hover:border-white/50 hover:shadow-glass-lg hover:scale-[1.01]',
                      ]">
                      <div class="flex items-center gap-4">
                        <input
                          type="radio"
                          name="saved-card"
                          :value="card.id"
                          v-model="selectedCard"
                          class="w-5 h-5 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer flex-shrink-0 checked:scale-110 transition-smooth" />

                        <div class="flex-grow">
                          <div class="flex items-center gap-3 mb-2">
                            <img
                              :src="card.icon"
                              :alt="card.type"
                              class="h-9 w-auto object-contain" />
                            <div>
                              <div class="text-sm font-bold text-gray-800">
                                {{ card.type }} •••• {{ card.last4 }}
                              </div>
                              <div class="text-xs text-gray-600 font-medium">
                                Expires {{ card.expiry }}
                              </div>
                            </div>
                          </div>
                          <div class="text-xs text-gray-700 font-semibold">
                            {{ card.name }}
                          </div>
                        </div>

                        <div
                          v-if="card.isDefault"
                          class="px-3 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full flex-shrink-0 shadow-glass border border-white/30">
                          Default
                        </div>

                        <button
                          @click.stop="removeCard(card.id)"
                          class="w-9 h-9 flex items-center justify-center text-red-500 hover:text-red-700 glass-card-subtle hover:bg-red-50/50 rounded-xl transition-smooth flex-shrink-0 shadow-glass active:scale-95"
                          title="Remove card">
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </label>
                  </div>

                  <!-- Add New Card Form (Toggle) -->
                  <transition name="fade-slide">
                    <div
                      v-if="showAddCardForm"
                      class="p-6 glass-card-strong rounded-2xl border-2 border-white/40 space-y-4 shadow-glass-lg">
                      <div class="flex items-center justify-between mb-4">
                        <h5 class="text-base font-bold text-gray-800">
                          Add New Card 💳
                        </h5>
                        <button
                          @click="showAddCardForm = false"
                          class="text-gray-500 hover:text-gray-700 transition-smooth glass-card-subtle p-2 rounded-xl shadow-glass active:scale-95">
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            stroke-width="2.5">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>

                      <div class="space-y-4">
                        <div>
                          <label
                            class="text-xs font-bold text-gray-700 block mb-2">
                            Card Number
                          </label>
                          <div class="relative">
                            <input
                              type="text"
                              v-model="newCard.number"
                              placeholder="1234 5678 9012 3456"
                              maxlength="19"
                              class="w-full px-4 py-3 pr-12 text-sm glass-card-strong border-2 border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-smooth shadow-glass font-medium" />
                            <svg
                              class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              stroke-width="2">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                            </svg>
                          </div>
                        </div>

                        <div>
                          <label
                            class="text-xs font-bold text-gray-700 block mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            v-model="newCard.name"
                            placeholder="Dara Veasna"
                            class="w-full px-4 py-3 text-sm glass-card-strong border-2 border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-smooth shadow-glass font-medium" />
                        </div>

                        <div class="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              class="text-xs font-bold text-gray-700 block mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              v-model="newCard.expiry"
                              placeholder="MM/YY"
                              maxlength="5"
                              class="w-full px-4 py-3 text-sm glass-card-strong border-2 border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-smooth shadow-glass font-medium" />
                          </div>
                          <div>
                            <label
                              class="text-xs font-bold text-gray-700 block mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              v-model="newCard.cvv"
                              placeholder="123"
                              maxlength="4"
                              class="w-full px-4 py-3 text-sm glass-card-strong border-2 border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-smooth shadow-glass font-medium" />
                          </div>
                        </div>

                        <div class="flex items-center gap-3 pt-2">
                          <label
                            class="flex items-center gap-3 cursor-pointer group">
                            <div class="checkbox-wrapper-payment">
                              <input
                                type="checkbox"
                                v-model="newCard.saveCard"
                                class="modern-checkbox-payment" />
                              <span class="checkbox-custom-payment">
                                <svg
                                  class="checkbox-icon-payment"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5 13l4 4L19 7"
                                    stroke="currentColor"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                                </svg>
                              </span>
                            </div>
                            <span
                              class="text-sm text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">
                              Save this card for future purchases
                            </span>
                          </label>
                        </div>

                        <button
                          @click="addNewCard"
                          class="w-full py-3.5 bg-gradient-to-r from-[#F5A3B7] to-[#B76E79] hover:from-[#B76E79] hover:to-[#F5A3B7] text-white text-sm font-bold rounded-xl transition-smooth shadow-glass-lg hover:shadow-glass-xl active:scale-95 border-2 border-white/30">
                          Add Card
                        </button>
                      </div>
                    </div>
                  </transition>
                </div>
              </transition>

              <!-- PayPal Account Info - Only show for PayPal -->
              <transition name="fade-slide">
                <div
                  v-if="selectedPaymentMethod === 'paypal'"
                  class="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <div class="flex items-center gap-4 mb-4">
                    <img
                      src="../assets/icons/PayPal.svg"
                      alt="PayPal"
                      class="h-10 w-auto object-contain" />
                    <div>
                      <h4 class="text-base font-bold text-gray-800">
                        PayPal Account
                      </h4>
                      <p class="text-sm text-gray-600">
                        You'll be redirected to PayPal to complete your payment
                      </p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-700 bg-white p-3 rounded-lg">
                    <strong>Email:</strong> daraa.veasna@gmail.com
                  </div>
                </div>
              </transition>

              <!-- Bitcoin Address - Only show for Bitcoin -->
              <transition name="fade-slide">
                <div
                  v-if="selectedPaymentMethod === 'bitcoin'"
                  class="mt-6 p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                  <div class="flex items-center gap-4 mb-4">
                    <img
                      src="../assets/icons/btc.svg"
                      alt="Bitcoin"
                      class="h-10 w-auto object-contain" />
                    <div>
                      <h4 class="text-base font-bold text-gray-800">
                        Bitcoin Payment
                      </h4>
                      <p class="text-sm text-gray-600">
                        Send payment to the address below
                      </p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="text-xs font-bold text-gray-700 block mb-1">
                        Bitcoin Address
                      </label>
                      <div
                        class="bg-white p-3 rounded-lg text-sm font-mono break-all text-gray-800">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </div>
                    </div>
                    <div>
                      <label class="text-xs font-bold text-gray-700 block mb-1">
                        Amount
                      </label>
                      <div
                        class="bg-white p-3 rounded-lg text-sm font-semibold text-gray-800">
                        {{ (parseFloat(total) / 45000).toFixed(8) }} BTC
                      </div>
                    </div>
                  </div>
                </div>
              </transition>

              <!-- Binance Pay Info - Only show for Binance -->
              <transition name="fade-slide">
                <div
                  v-if="selectedPaymentMethod === 'binance'"
                  class="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-2 border-yellow-200">
                  <div class="flex items-center gap-4 mb-4">
                    <img
                      src="../assets/icons/binance-official.svg"
                      alt="Binance"
                      class="h-10 w-auto object-contain" />
                    <div>
                      <h4 class="text-base font-bold text-gray-800">
                        Binance Pay
                      </h4>
                      <p class="text-sm text-gray-600">
                        You'll be redirected to Binance to complete your payment
                      </p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-700 bg-white p-3 rounded-lg">
                    <strong>User ID:</strong> 123456789
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Security Notice -->
          <div
            class="p-6 glass-card-strong rounded-2xl border-2 border-white/40 flex items-start gap-4 shadow-glass-lg">
            <div
              class="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-glass-lg border-2 border-white/50 flex-shrink-0">
              <svg
                class="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-base font-bold text-gray-800 mb-2">
                Secure Checkout 🔒
              </h4>
              <p class="text-sm text-gray-700 leading-relaxed font-medium">
                Your payment is encrypted and secure. We never store your card
                details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        v-if="!isEmpty"
        class="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 p-6 glass-card-strong rounded-3xl shadow-glass-xl border-2 border-white/40 backdrop-blur-xl">
        <router-link to="/product" class="w-full sm:w-auto order-2 sm:order-1">
          <button
            type="button"
            class="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-gray-700 hover:text-white glass-card-subtle hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 rounded-xl transition-smooth border-2 border-white/40 shadow-glass hover:shadow-glass-lg active:scale-95">
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </button>
        </router-link>

        <button
          @click="completePayment"
          :disabled="isEmpty"
          :class="[
            'w-full sm:flex-1 order-1 sm:order-2 px-10 py-5 text-lg font-bold text-white rounded-2xl transition-smooth shadow-glass-xl hover:shadow-glass-xl focus:outline-none focus:ring-4 focus:ring-offset-2 flex items-center justify-center gap-3 border-2 border-white/40',
            isEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#F5A3B7] to-[#B76E79] hover:from-[#B76E79] hover:to-[#F5A3B7] focus:ring-[#F5A3B7] hover:scale-105 active:scale-95',
          ]">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Complete Order - ${{ total }}
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </div>

    <FooterComponentVue />
  </div>
</template>

<script setup>
import {computed, ref, reactive} from "vue";
import FooterComponentVue from "../components/FooterComponent.vue";
import NavBarComponentVue from "../components/NavBarComponent.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";

const productStore = useProductStore();
const {success, error: errorToast, info} = useToast();

// Payment method selection
const selectedPaymentMethod = ref("card");

// Card management state
const selectedCard = ref(1);
const showAddCardForm = ref(false);

// Saved cards data
const savedCards = ref([
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    name: "Dara Veasna",
    icon: new URL("../assets/icons/visa.svg", import.meta.url).href,
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/26",
    name: "Dara Veasna",
    icon: new URL("../assets/icons/master.svg", import.meta.url).href,
    isDefault: false,
  },
]);

// New card form data
const newCard = reactive({
  number: "",
  name: "",
  expiry: "",
  cvv: "",
  saveCard: false,
});

// Cart computed properties
const cartItems = computed(() => productStore.cartItems);
const isEmpty = computed(() => cartItems.value.length === 0);

// Calculate subtotal
const subtotal = computed(() => {
  return cartItems.value
    .reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);
});

// Calculate shipping (free over $100, otherwise $5)
const shipping = computed(() => {
  return parseFloat(subtotal.value) >= 100 ? 0 : 5.0;
});

// Calculate tax (10%)
const tax = computed(() => {
  return (parseFloat(subtotal.value) * 0.1).toFixed(2);
});

// Calculate discount (15% if subtotal > $50)
const discount = computed(() => {
  const sub = parseFloat(subtotal.value);
  return sub > 50 ? (sub * 0.15).toFixed(2) : 0;
});

// Calculate total
const total = computed(() => {
  const sub = parseFloat(subtotal.value);
  const ship = shipping.value;
  const taxAmount = parseFloat(tax.value);
  const disc = parseFloat(discount.value);
  return (sub + ship + taxAmount - disc).toFixed(2);
});

// Cart actions
const increaseQuantity = (productId) => {
  const item = cartItems.value.find((item) => item.id === productId);
  if (item) {
    productStore.updateQuantity(productId, item.quantity + 1);
    info("Quantity updated");
  }
};

const decreaseQuantity = (productId) => {
  const item = cartItems.value.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    productStore.updateQuantity(productId, item.quantity - 1);
    info("Quantity updated");
  }
};

const removeItem = (productId) => {
  productStore.removeFromCart(productId);
  success("Item removed from cart");
};

// Card management methods
const addNewCard = () => {
  if (!newCard.number || !newCard.name || !newCard.expiry || !newCard.cvv) {
    errorToast("Please fill in all card details");
    return;
  }

  // Get card type based on number
  const cardType = getCardType(newCard.number);
  const last4 = newCard.number.slice(-4);

  // Add new card to the list
  const newCardData = {
    id: savedCards.value.length + 1,
    type: cardType,
    last4: last4,
    expiry: newCard.expiry,
    name: newCard.name,
    icon: getCardIcon(cardType),
    isDefault: false,
  };

  savedCards.value.push(newCardData);
  selectedCard.value = newCardData.id;

  // Reset form
  newCard.number = "";
  newCard.name = "";
  newCard.expiry = "";
  newCard.cvv = "";
  newCard.saveCard = false;
  showAddCardForm.value = false;

  success("Card added successfully!");
};

const removeCard = (cardId) => {
  if (savedCards.value.length === 1) {
    errorToast("You must have at least one payment method");
    return;
  }

  savedCards.value = savedCards.value.filter((card) => card.id !== cardId);

  // If deleted card was selected, select the first card
  if (selectedCard.value === cardId) {
    selectedCard.value = savedCards.value[0].id;
  }

  success("Card removed successfully!");
};

const getCardType = (number) => {
  const cleaned = number.replace(/\s/g, "");
  if (cleaned.startsWith("4")) return "Visa";
  if (cleaned.startsWith("5")) return "Mastercard";
  if (cleaned.startsWith("3")) return "Amex";
  return "Credit Card";
};

const getCardIcon = (type) => {
  const iconMap = {
    Visa: new URL("../assets/icons/visa.svg", import.meta.url).href,
    Mastercard: new URL("../assets/icons/master.svg", import.meta.url).href,
    Amex: new URL("../assets/icons/credit-card.svg", import.meta.url).href,
    "Credit Card": new URL("../assets/icons/credit-card.svg", import.meta.url)
      .href,
  };
  return iconMap[type] || iconMap["Credit Card"];
};

const completePayment = () => {
  if (isEmpty.value) {
    errorToast("Your cart is empty!");
    return;
  }

  let paymentMessage = "";

  // Handle different payment methods
  if (selectedPaymentMethod.value === "card") {
    const selectedCardData = savedCards.value.find(
      (card) => card.id === selectedCard.value
    );

    if (!selectedCardData) {
      errorToast("Please select a payment card");
      return;
    }

    paymentMessage = `Processing payment with ${selectedCardData.type} •••• ${selectedCardData.last4}...`;
  } else if (selectedPaymentMethod.value === "paypal") {
    paymentMessage = "Redirecting to PayPal...";
  } else if (selectedPaymentMethod.value === "bitcoin") {
    paymentMessage = "Processing Bitcoin payment...";
  } else if (selectedPaymentMethod.value === "binance") {
    paymentMessage = "Redirecting to Binance Pay...";
  }

  // Simulate payment processing
  info(paymentMessage);

  setTimeout(() => {
    success("Payment completed successfully!");
    productStore.clearCart();
    // Redirect to home after 2 seconds
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }, 1500);
};
</script>

<style scoped>
/* Modern Custom Checkbox Styling for Payment */
.checkbox-wrapper-payment {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.modern-checkbox-payment {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkbox-custom-payment {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 2.5px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.checkbox-wrapper-payment:hover .checkbox-custom-payment {
  border-color: #f5a3b7;
  background: rgba(245, 163, 183, 0.05);
  transform: scale(1.05);
}

.checkbox-icon-payment {
  width: 70%;
  height: 70%;
  color: white;
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.modern-checkbox-payment:checked ~ .checkbox-custom-payment {
  background: linear-gradient(135deg, #f5a3b7 0%, #e89aae 100%);
  border-color: #f5a3b7;
  box-shadow: 0 4px 12px rgba(245, 163, 183, 0.4),
    0 2px 4px rgba(245, 163, 183, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modern-checkbox-payment:checked
  ~ .checkbox-custom-payment
  .checkbox-icon-payment {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.modern-checkbox-payment:checked ~ .checkbox-custom-payment::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 0.75rem;
  background: radial-gradient(
    circle,
    rgba(245, 163, 183, 0.2) 0%,
    transparent 70%
  );
  animation: ripple-payment 0.6s ease-out;
}

@keyframes ripple-payment {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.modern-checkbox-payment:focus ~ .checkbox-custom-payment {
  outline: 2px solid #f5a3b7;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(245, 163, 183, 0.1);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar for better aesthetics */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #f5a3b7;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b76e79;
}

/* Fade slide transition for add card form */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
