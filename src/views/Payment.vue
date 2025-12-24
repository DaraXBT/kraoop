<template>
  <div class="min-h-screen w-full relative overflow-x-hidden">
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

      <!-- Announcement Banner -->
      <AnnouncementBanner />

      <!-- Progress Steps - Minimal Modern -->
      <div
        class="liquid-steps-nav sticky top-16 z-40 transition-all duration-300">
        <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div class="flex items-center justify-center gap-2 sm:gap-3">
            <div class="flex items-center gap-1.5 group">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-[0_0_10px_rgba(74,222,128,0.5)] flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
                <svg
                  class="w-4 h-4 text-white drop-shadow-sm"
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
              <span class="hidden sm:inline text-xs font-bold text-gray-800 drop-shadow-sm"
                >Cart</span
              >
            </div>
            <div class="h-1 w-8 sm:w-16 bg-gradient-to-r from-green-400 to-[#F5A3B7] rounded-full shadow-sm"></div>
            <div class="flex items-center gap-1.5 group">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-[#F5A3B7] to-[#e87995] shadow-[0_0_10px_rgba(245,163,183,0.5)] flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
                <span class="text-xs font-bold text-white drop-shadow-sm">2</span>
              </div>
              <span class="text-xs font-bold text-gray-800 drop-shadow-sm">Checkout</span>
            </div>
            <div class="h-1 w-8 sm:w-16 bg-gray-200/50 rounded-full shadow-inner"></div>
            <div class="flex items-center gap-1.5 group">
              <div
                class="w-8 h-8 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm transition-transform group-hover:scale-110">
                <span class="text-xs font-bold text-gray-500">3</span>
              </div>
              <span class="hidden sm:inline text-xs font-semibold text-gray-500"
                >Complete</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <!-- Order Summary Section -->
        <div class="mb-4 sm:mb-6">
          <div
            class="liquid-glass-payment-card overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:shadow-pink-100/20">
            <!-- Header with Solid Light Pink -->
            <div
              class="relative px-4 py-4 border-b overflow-hidden group"
              style="background: #f5a3b7; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(clamp(1px, 0.125em, 4px)); -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));">
              <!-- Subtle shine overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="flex items-center justify-between relative z-10">
                <h2
                  class="text-lg font-bold text-white flex items-center gap-2">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Your Order
                </h2>
                <!-- Subtle Liquid Glass Badge -->
                <span
                  class="relative px-4 py-1.5 text-xs font-bold rounded-full overflow-hidden shadow-sm transition-all duration-300 hover:scale-105"
                  style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(255, 255, 255, 0.15);">
                  <!-- Glass shine effect -->
                  <span class="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></span>
                  <span class="relative z-10 text-white font-bold">
                    {{ cartItems.length }}
                    {{ cartItems.length === 1 ? "Item" : "Items" }}
                  </span>
                </span>
              </div>
            </div>

            <!-- Empty Cart Message -->
            <div v-if="isEmpty" class="text-center py-12 px-4 relative z-10">
              <svg
                class="w-16 h-16 mx-auto text-gray-700 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h3>
              <p class="text-gray-800 mb-6 text-sm">
                Discover our amazing skincare products!
              </p>
              <router-link to="/product">
                <LiquidButton variant="primary" size="lg">
                  Explore Products
                </LiquidButton>
              </router-link>
            </div>

            <!-- Product Table View -->
            <div v-else class="overflow-hidden relative z-10">
              <!-- Desktop Table View -->
              <div class="hidden md:block overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                      <th
                        class="px-4 py-3 text-left text-xs font-semibold text-gray-800 uppercase">
                        Product
                      </th>
                      <th
                        class="px-4 py-3 text-center text-xs font-semibold text-gray-800 uppercase">
                        Price
                      </th>
                      <th
                        class="px-4 py-3 text-center text-xs font-semibold text-gray-800 uppercase">
                        Quantity
                      </th>
                      <th
                        class="px-4 py-3 text-right text-xs font-semibold text-gray-800 uppercase">
                        Subtotal
                      </th>
                      <th
                        class="px-4 py-3 text-center text-xs font-semibold text-gray-800 uppercase w-16"></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-black/10">
                    <tr
                      v-for="item in cartItems"
                      :key="item.id"
                      class="hover:bg-pink-50/30 transition-all duration-300">
                      <!-- Product Info -->
                      <td class="px-4 py-3">
                        <div class="flex items-center gap-3">
                          <img
                            :src="item.image"
                            :alt="item.title"
                            class="w-16 h-16 object-cover rounded-lg border border-gray-900/30" />
                          <div class="min-w-0">
                            <h3
                              class="text-sm font-semibold text-gray-900 line-clamp-1">
                              {{ item.title }}
                            </h3>
                            <p class="text-xs text-gray-800 line-clamp-1">
                              {{ item.product }}
                            </p>
                          </div>
                        </div>
                      </td>

                      <!-- Price -->
                      <td class="px-4 py-3 text-center">
                        <span class="text-sm font-semibold text-gray-900">{{
                          item.price
                        }}</span>
                      </td>

                      <!-- Quantity Controls -->
                      <td class="px-4 py-3">
                        <div class="flex items-center justify-center gap-1">
                          <LiquidButton
                            @click="decreaseQuantity(item.id)"
                            :disabled="item.quantity <= 1"
                            variant="glass"
                            size="sm"
                            icon-only
                            class="w-7 h-7">
                            −
                          </LiquidButton>
                          <span
                            class="font-semibold text-gray-900 min-w-[2rem] text-center text-sm"
                            >{{ item.quantity }}</span
                          >
                          <LiquidButton
                            @click="increaseQuantity(item.id)"
                            variant="primary"
                            size="sm"
                            icon-only
                            class="w-7 h-7">
                            +
                          </LiquidButton>
                        </div>
                      </td>

                      <!-- Subtotal -->
                      <td class="px-4 py-3 text-right">
                        <span class="text-sm font-bold text-[#F5A3B7]">
                          ${{
                            (
                              parseFloat(item.price.replace("$", "")) *
                              item.quantity
                            ).toFixed(2)
                          }}
                        </span>
                      </td>

                      <!-- Remove Button -->
                      <td class="px-4 py-3 text-center">
                        <LiquidButton
                          @click="removeItem(item.id)"
                          variant="danger"
                          size="sm"
                          icon-only
                          class="w-8 h-8 mx-auto"
                          title="Remove">
                          <template v-slot:icon-left>
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              stroke-width="2">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </template>
                        </LiquidButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Mobile Card View -->
              <div class="md:hidden space-y-3 p-3">
                <div
                  v-for="item in cartItems"
                  :key="item.id"
                  class="bg-white/40 backdrop-blur-sm rounded-lg border border-white/40 overflow-hidden relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-50 before:pointer-events-none">
                  <div class="flex gap-3 p-3 relative z-10">
                    <!-- Product Image -->
                    <img
                      :src="item.image"
                      :alt="item.title"
                      class="w-20 h-20 object-cover rounded-lg border border-white/30" />

                    <!-- Product Details -->
                    <div class="flex-grow min-w-0">
                      <h3
                        class="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                        {{ item.title }}
                      </h3>
                      <p class="text-xs text-gray-600 mb-2">
                        {{ item.product }}
                      </p>
                      <div class="flex items-center justify-between">
                        <span class="text-sm font-semibold text-gray-900">{{
                          item.price
                        }}</span>
                        <LiquidButton
                          @click="removeItem(item.id)"
                          variant="danger"
                          size="sm"
                          icon-only
                          class="w-7 h-7">
                          <template v-slot:icon-left>
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              stroke-width="2">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </template>
                        </LiquidButton>
                      </div>
                    </div>
                  </div>

                  <!-- Quantity and Subtotal -->
                  <div
                    class="bg-white/20 px-3 py-2.5 flex items-center justify-between border-t border-white/30 relative z-10">
                    <div class="flex items-center gap-1">
                      <LiquidButton
                        @click="decreaseQuantity(item.id)"
                        :disabled="item.quantity <= 1"
                        variant="glass"
                        size="sm"
                        icon-only
                        class="w-7 h-7">
                        −
                      </LiquidButton>
                      <span
                        class="font-semibold text-gray-900 min-w-[2rem] text-center text-sm"
                        >{{ item.quantity }}</span
                      >
                      <LiquidButton
                        @click="increaseQuantity(item.id)"
                        variant="primary"
                        size="sm"
                        icon-only
                        class="w-7 h-7">
                        +
                      </LiquidButton>
                    </div>
                    <div class="text-right">
                      <p class="text-xs text-gray-600 mb-0.5">Subtotal</p>
                      <p class="text-sm font-bold text-[#F5A3B7]">
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

              <!-- Order Summary & Promo Code -->
              <div
                class="bg-white/20 backdrop-blur-sm border-t border-white/40 relative z-10">
                <div class="px-4 py-4 space-y-4">
                  <!-- Promo Code Section with Subtle Styling -->
                  <div
                    class="relative rounded-2xl p-4 border overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-pink-100/20"
                    style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                    <!-- Glass shine overlay -->
                    <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"></div>
                    
                    <label
                      class="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3 relative z-10">
                      <svg
                        class="w-4 h-4 text-[#F5A3B7]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        stroke-width="2">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                      Promo Code
                    </label>
                    <div class="flex gap-2 relative z-10">
                      <input
                        type="text"
                        placeholder="Enter your promo code"
                        class="flex-grow px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300"
                        style="background: rgba(255, 255, 255, 0.9); border: 1.5px solid rgba(245, 163, 183, 0.25); color: #374151; box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);"
                        onfocus="this.style.borderColor='rgba(245, 163, 183, 0.5)'; this.style.background='rgba(255, 255, 255, 0.98)'; this.style.boxShadow='0 0 0 3px rgba(245, 163, 183, 0.08), inset 0 1px 3px rgba(0, 0, 0, 0.05)'"
                        onblur="this.style.borderColor='rgba(245, 163, 183, 0.25)'; this.style.background='rgba(255, 255, 255, 0.9)'; this.style.boxShadow='inset 0 1px 3px rgba(0, 0, 0, 0.05)'" />
                      <LiquidButton
                        variant="primary"
                        class="px-5 py-2.5 text-sm font-semibold whitespace-nowrap">
                        Apply
                      </LiquidButton>
                    </div>
                  </div>

                  <!-- Order Summary -->
                  <div
                    class="bg-white/30 backdrop-blur-sm rounded-lg border border-white/40 overflow-hidden relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-50 before:pointer-events-none">
                    <!-- Desktop View -->
                    <div class="hidden sm:block relative z-10">
                      <div class="divide-y divide-white/40">
                        <div class="flex justify-between px-4 py-2.5">
                          <span class="text-sm font-medium text-gray-700"
                            >Subtotal</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ subtotal }}</span
                          >
                        </div>
                        <div class="flex justify-between px-4 py-2.5">
                          <span class="text-sm font-medium text-gray-700"
                            >Shipping</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ shipping.toFixed(2) }}</span
                          >
                        </div>
                        <div class="flex justify-between px-4 py-2.5">
                          <span class="text-sm font-medium text-gray-900"
                            >Tax (10%)</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ tax }}</span
                          >
                        </div>
                        <div
                          v-if="discount > 0"
                          class="flex justify-between px-4 py-2.5"
                          style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                          <span
                            class="text-sm font-medium text-green-700 flex items-center gap-1">
                            Discount (15%)
                            <span
                              class="px-1.5 py-0.5 bg-green-500 text-white text-xs font-bold rounded"
                              >SAVE</span
                            >
                          </span>
                          <span class="text-sm font-semibold text-green-700"
                            >-${{ discount }}</span
                          >
                        </div>
                        <div
                          class="flex justify-between px-4 py-3"
                          style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                          <span class="text-base font-bold text-gray-900"
                            >Total</span
                          >
                          <span class="text-lg font-bold text-[#D07B8F]"
                            >${{ total }}</span
                          >
                        </div>
                      </div>
                    </div>

                    <!-- Mobile View -->
                    <div class="sm:hidden relative z-10">
                      <div class="divide-y divide-white/40">
                        <div class="flex justify-between px-3 py-2">
                          <span class="text-xs font-medium text-gray-700"
                            >Subtotal</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ subtotal }}</span
                          >
                        </div>
                        <div class="flex justify-between px-3 py-2">
                          <span class="text-xs font-medium text-gray-700"
                            >Shipping</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ shipping.toFixed(2) }}</span
                          >
                        </div>
                        <div class="flex justify-between px-3 py-2">
                          <span class="text-xs font-medium text-gray-900"
                            >Tax (10%)</span
                          >
                          <span class="text-sm font-semibold text-gray-900"
                            >${{ tax }}</span
                          >
                        </div>
                        <div
                          v-if="discount > 0"
                          class="flex justify-between px-3 py-2"
                          style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                          <span
                            class="text-xs font-medium text-green-700 flex items-center gap-1">
                            Discount (15%)
                            <span
                              class="px-1 py-0.5 bg-green-500 text-white text-xs font-bold rounded"
                              >SAVE</span
                            >
                          </span>
                          <span class="text-sm font-semibold text-green-700"
                            >-${{ discount }}</span
                          >
                        </div>
                        <div
                          class="flex justify-between px-3 py-2.5"
                          style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(245, 163, 183, 0.08) 100%); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(245, 163, 183, 0.2); box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.5);">
                          <span class="text-sm font-bold text-gray-900"
                            >Total</span
                          >
                          <span class="text-base font-bold text-[#D07B8F]"
                            >${{ total }}</span
                          >
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
        <div class="space-y-6" v-if="!isEmpty">
          <!-- Contact & Shipping Details Section -->
          <div class="w-full">
            <div
              class="liquid-glass-payment-card overflow-hidden relative">
              <!-- Section Header with Solid Light Pink -->
              <div
                class="relative px-4 py-3 overflow-hidden group"
                style="background: #f5a3b7; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(clamp(1px, 0.125em, 4px)); -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));">
                <h3
                  class="text-base font-bold text-white flex items-center gap-2 relative z-10">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Contact & Shipping Details
                </h3>
              </div>

              <div class="p-4 space-y-3 relative z-10">
                <!-- Contact Email -->
                <div
                  class="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 hover:bg-white/50 transition-all shadow-sm relative overflow-hidden group">
                  <div class="flex items-start gap-3 relative z-10">
                    <div
                      class="flex-shrink-0 w-10 h-10 bg-blue-500/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                      <svg
                        class="w-5 h-5 text-white"
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
                        class="text-xs font-bold text-gray-600 uppercase mb-1 tracking-wider">
                        Email
                      </div>
                      <!-- Display mode -->
                      <div
                        v-if="!editModes.email"
                        class="text-sm text-gray-900 font-semibold break-all">
                        {{ contactInfo.email }}
                      </div>
                      <!-- Edit mode -->
                      <div v-else class="space-y-2">
                        <input
                          type="email"
                          v-model="editData.email"
                          placeholder="Enter your email"
                          class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500"
                          @keydown.enter="saveEmail"
                          @keydown.esc="cancelEmailEdit" />
                        <div class="flex gap-2">
                          <button
                            @click="saveEmail"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#F5A3B7] hover:bg-[#E392A6] rounded-md transition-colors">
                            Save
                          </button>
                          <button
                            @click="cancelEmailEdit"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-900/10 border border-gray-900/30 rounded-md transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      v-if="!editModes.email"
                      @click="startEditEmail"
                      class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-gray-900 hover:text-[#F5A3B7] hover:bg-gray-900/10 border border-gray-900/30 rounded-md transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <!-- Shipping Address -->
                <div
                  class="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 hover:bg-white/50 transition-all shadow-sm relative overflow-hidden group">
                  <div class="flex items-start gap-3 relative z-10">
                    <div
                      class="flex-shrink-0 w-10 h-10 bg-green-500/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                      <svg
                        class="w-5 h-5 text-white"
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
                        class="text-xs font-bold text-gray-600 uppercase mb-1 tracking-wider">
                        Address
                      </div>
                      <!-- Display mode -->
                      <div
                        v-if="!editModes.address"
                        class="text-sm text-gray-900 font-semibold">
                        {{ shippingInfo.address }}
                      </div>
                      <!-- Edit mode -->
                      <div v-else class="space-y-2">
                        <textarea
                          v-model="editData.address"
                          placeholder="Enter your address"
                          rows="2"
                          class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500 resize-none"
                          @keydown.esc="cancelAddressEdit"></textarea>
                        <div class="flex gap-2">
                          <button
                            @click="saveAddress"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#F5A3B7] hover:bg-[#E392A6] rounded-md transition-colors">
                            Save
                          </button>
                          <button
                            @click="cancelAddressEdit"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:text-gray-900 hover:bg-gray-900/10 border border-gray-900/30 rounded-md transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      v-if="!editModes.address"
                      @click="startEditAddress"
                      class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-gray-900 hover:text-[#F5A3B7] hover:bg-gray-900/10 border border-gray-900/30 rounded-md transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <!-- Delivery Method -->
                <div
                  class="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 hover:bg-white/50 transition-all shadow-sm relative overflow-hidden group">
                  <div class="flex items-start gap-3 relative z-10">
                    <div
                      class="flex-shrink-0 w-10 h-10 bg-orange-500/80 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                      <svg
                        class="w-5 h-5 text-white"
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
                        class="text-xs font-semibold text-gray-800 uppercase mb-1">
                        Delivery
                      </div>
                      <!-- Display mode -->
                      <div v-if="!editModes.delivery">
                        <div class="text-sm text-gray-900 font-semibold">
                          {{ deliveryInfo.method }} -
                          <span class="text-[#F5A3B7]"
                            >${{ deliveryInfo.cost.toFixed(2) }}</span
                          >
                        </div>
                        <div class="text-xs text-gray-700 mt-0.5">
                          Est: {{ deliveryInfo.estimate }}
                        </div>
                      </div>
                      <!-- Edit mode -->
                      <div v-else class="space-y-2">
                        <div class="grid grid-cols-2 gap-2">
                          <div>
                            <label
                              class="text-xs font-medium text-white/80 block mb-1"
                              >Method</label
                            >
                            <input
                              type="text"
                              v-model="editData.deliveryMethod"
                              placeholder="Shipping method"
                              class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500"
                              @keydown.esc="cancelDeliveryEdit" />
                          </div>
                          <div>
                            <label
                              class="text-xs font-medium text-gray-700 block mb-1"
                              >Cost ($)</label
                            >
                            <input
                              type="number"
                              v-model.number="editData.deliveryCost"
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                              class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500"
                              @keydown.esc="cancelDeliveryEdit" />
                          </div>
                        </div>
                        <div>
                          <label
                            class="text-xs font-medium text-gray-700 block mb-1"
                            >Estimate</label
                          >
                          <input
                            type="text"
                            v-model="editData.deliveryEstimate"
                            placeholder="e.g., 3-5 business days"
                            class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500"
                            @keydown.esc="cancelDeliveryEdit" />
                        </div>
                        <div class="flex gap-2">
                          <button
                            @click="saveDelivery"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#F5A3B7] hover:bg-[#E392A6] rounded-md transition-colors">
                            Save
                          </button>
                          <button
                            @click="cancelDeliveryEdit"
                            class="flex-1 px-3 py-1.5 text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 border border-white/30 rounded-md transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      v-if="!editModes.delivery"
                      @click="startEditDelivery"
                      class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-white hover:text-[#F5A3B7] hover:bg-white/10 border border-white/30 rounded-md transition-colors">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method Section -->
          <div class="w-full">
            <div
              class="liquid-glass-payment-card overflow-hidden relative">
              <!-- Section Header with Solid Light Pink -->
              <div
                class="relative px-4 py-3 overflow-hidden group"
                style="background: #f5a3b7; border: 1px solid rgba(255, 255, 255, 0.3); backdrop-filter: blur(clamp(1px, 0.125em, 4px)); -webkit-backdrop-filter: blur(clamp(1px, 0.125em, 4px));">
                <h3
                  class="text-base font-bold text-white flex items-center gap-2 relative z-10">
                  <svg
                    class="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Payment Method
                </h3>
              </div>

              <div class="p-4 space-y-4 relative z-10">
                <p class="text-xs text-gray-800 font-medium">
                  Choose your preferred payment option
                </p>

                <!-- Payment Options -->
                <div class="space-y-2">
                  <!-- Apple Pay -->
                  <label
                    :class="[
                      'flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                      selectedPaymentMethod === 'applepay'
                        ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                        : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                    ]">
                    <input
                      type="radio"
                      name="payment"
                      value="applepay"
                      v-model="selectedPaymentMethod"
                      class="w-4 h-4 text-[#F5A3B7] border-white/30 focus:ring-[#F5A3B7] cursor-pointer relative z-10" />
                    <span
                      class="text-sm font-semibold text-gray-900 flex-grow relative z-10"
                      >Apple Pay</span
                    >
                    <div class="h-8 w-auto object-contain relative z-10">
                      <svg
                        width="46"
                        height="32"
                        viewBox="0 0 46 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="5.5"
                          fill="white" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="5.5"
                          stroke="#F5F5F5" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12.6964 11.1242C12.3097 11.5934 11.6909 11.9635 11.072 11.9106C10.9947 11.2762 11.2977 10.6022 11.6522 10.1858C12.0389 9.70341 12.7158 9.35978 13.2637 9.33334C13.3282 9.99418 13.0768 10.6418 12.6964 11.1242ZM13.2572 12.0362C12.712 12.004 12.2146 12.2043 11.8128 12.366C11.5542 12.4701 11.3353 12.5582 11.1687 12.5582C10.9817 12.5582 10.7538 12.4654 10.4978 12.3611C10.1623 12.2245 9.77884 12.0683 9.37669 12.0758C8.4549 12.089 7.59758 12.6243 7.12702 13.4768C6.16012 15.1818 6.87563 17.7062 7.8103 19.0939C8.26797 19.7812 8.81588 20.5346 9.53784 20.5081C9.85546 20.4959 10.0839 20.3965 10.3204 20.2936C10.5926 20.1752 10.8754 20.0522 11.3169 20.0522C11.7432 20.0522 12.0136 20.172 12.2732 20.287C12.52 20.3963 12.7571 20.5014 13.1089 20.4949C13.8567 20.4817 14.3272 19.8077 14.7849 19.1204C15.2788 18.3827 15.4959 17.6629 15.5288 17.5536L15.5327 17.541C15.5319 17.5402 15.5258 17.5373 15.515 17.5323L15.515 17.5322C15.3499 17.4548 14.088 16.8625 14.0758 15.2743C14.0637 13.9412 15.0768 13.2658 15.2363 13.1595L15.2363 13.1595C15.246 13.153 15.2525 13.1487 15.2555 13.1464C14.6109 12.1683 13.6053 12.0626 13.2572 12.0362ZM18.4334 20.4222V10.1197H22.2043C24.1511 10.1197 25.5112 11.4943 25.5112 13.5032C25.5112 15.5122 24.1253 16.9 22.1528 16.9H19.9934V20.4222H18.4334ZM19.9932 11.4678H21.7917C23.1453 11.4678 23.9189 12.208 23.9189 13.5098C23.9189 14.8117 23.1453 15.5584 21.7852 15.5584H19.9932V11.4678ZM30.6616 19.1865C30.2491 19.9927 29.3402 20.5015 28.3604 20.5015C26.91 20.5015 25.898 19.616 25.898 18.2811C25.898 16.9594 26.8778 16.1995 28.6891 16.0871L30.6358 15.9682V15.3999C30.6358 14.5606 30.1008 14.1046 29.1468 14.1046C28.3604 14.1046 27.7867 14.5209 27.6707 15.1553H26.2654C26.3105 13.8204 27.5353 12.849 29.1919 12.849C30.9775 12.849 32.1378 13.8072 32.1378 15.2941V20.4222H30.6939V19.1865H30.6616ZM28.7793 19.279C27.9477 19.279 27.4192 18.8693 27.4192 18.2415C27.4192 17.5938 27.9284 17.2172 28.9018 17.1577L30.6357 17.0453V17.6269C30.6357 18.5917 29.8364 19.279 28.7793 19.279ZM36.9271 20.8254C36.3018 22.6295 35.5863 23.2242 34.0651 23.2242C33.949 23.2242 33.5623 23.211 33.472 23.1846V21.9488C33.5687 21.962 33.8072 21.9752 33.9297 21.9752C34.6194 21.9752 35.0062 21.6778 35.2447 20.9047L35.3865 20.4487L32.7436 12.9482H34.3745L36.2116 19.0345H36.2438L38.081 12.9482H39.6667L36.9271 20.8254Z"
                          fill="black" />
                      </svg>
                    </div>
                  </label>

                  <!-- Google Pay -->
                  <label
                    :class="[
                      'flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                      selectedPaymentMethod === 'googlepay'
                        ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                        : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                    ]">
                    <input
                      type="radio"
                      name="payment"
                      value="googlepay"
                      v-model="selectedPaymentMethod"
                      class="w-4 h-4 text-[#F5A3B7] border-white/30 focus:ring-[#F5A3B7] cursor-pointer relative z-10" />
                    <span
                      class="text-sm font-semibold text-gray-900 flex-grow relative z-10"
                      >Google Pay</span
                    >
                    <div class="h-8 w-auto object-contain relative z-10">
                      <svg
                        width="46"
                        height="32"
                        viewBox="0 0 46 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          fill="white" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          stroke="#F5F5F5" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M21.4104 20.704V16.7911H23.4299C24.2575 16.7911 24.956 16.5138 25.5254 15.967L25.662 15.8283C26.7021 14.696 26.6338 12.9322 25.5254 11.8846C24.9711 11.3301 24.2119 11.0297 23.4299 11.0451H20.1881V20.704H21.4104ZM21.4106 15.6049V12.2312H23.4608C23.9012 12.2312 24.3188 12.4006 24.6301 12.7087C25.2908 13.3557 25.306 14.4341 24.6681 15.1042C24.3568 15.4354 23.9164 15.6203 23.4608 15.6049H21.4106ZM31.3637 14.6113C30.8399 14.126 30.1262 13.8795 29.2228 13.8795C28.0612 13.8795 27.1881 14.3109 26.6111 15.1659L27.6892 15.8514C28.0839 15.266 28.623 14.9733 29.3063 14.9733C29.739 14.9733 30.1566 15.1351 30.4831 15.4277C30.8019 15.705 30.9841 16.1056 30.9841 16.5292V16.8142C30.5134 16.5523 29.9212 16.4137 29.1924 16.4137C28.3421 16.4137 27.6588 16.6139 27.1501 17.0222C26.6414 17.4304 26.3833 17.9696 26.3833 18.6551C26.3681 19.279 26.6339 19.8721 27.1046 20.2726C27.5829 20.704 28.1902 20.9196 28.9039 20.9196C29.7466 20.9196 30.4147 20.5422 30.9234 19.7874H30.9765V20.704H32.1457V16.6293C32.1457 15.7744 31.8876 15.0965 31.3637 14.6113ZM28.0462 19.487C27.7956 19.3021 27.6437 19.0017 27.6437 18.6782C27.6437 18.3162 27.8108 18.0158 28.1373 17.777C28.4714 17.5383 28.889 17.415 29.3826 17.415C30.066 17.4073 30.5975 17.5614 30.9772 17.8695C30.9772 18.3932 30.7722 18.8477 30.3697 19.2328C30.0053 19.6025 29.5117 19.8105 28.9954 19.8105C28.6537 19.8182 28.3195 19.7027 28.0462 19.487ZM34.7726 23.6078L38.8572 14.0952H37.5286L35.6381 18.8399H35.6153L33.6794 14.0952H32.3507L35.0308 20.2803L33.5123 23.6078H34.7726Z"
                          fill="#3C4043" />
                        <path
                          d="M17.1905 15.9439C17.1905 15.5664 17.1601 15.189 17.0994 14.8193H11.9443V16.9529H14.8977C14.7762 17.6384 14.3814 18.2546 13.8044 18.6397V20.0262H15.5658C16.5983 19.0634 17.1905 17.6384 17.1905 15.9439Z"
                          fill="#4285F4" />
                        <path
                          d="M11.9446 21.3665C13.4175 21.3665 14.6626 20.8735 15.566 20.0262L13.8047 18.6398C13.3112 18.9787 12.681 19.1712 11.9446 19.1712C10.5173 19.1712 9.31013 18.193 8.87738 16.8836H7.06287V18.3163C7.9891 20.188 9.87954 21.3665 11.9446 21.3665Z"
                          fill="#34A853" />
                        <path
                          d="M8.87759 16.8836C8.64979 16.1981 8.64979 15.4509 8.87759 14.7577V13.3328H7.06278C6.28067 14.8964 6.28067 16.745 7.06278 18.3086L8.87759 16.8836Z"
                          fill="#FBBC04" />
                        <path
                          d="M11.9446 12.4701C12.7266 12.4546 13.4782 12.755 14.04 13.3019L15.604 11.7152C14.6094 10.7755 13.3036 10.2594 11.9446 10.2748C9.87954 10.2748 7.9891 11.461 7.06287 13.3327L8.87738 14.7654C9.31013 13.4483 10.5173 12.4701 11.9446 12.4701Z"
                          fill="#EA4335" />
                      </svg>
                    </div>
                  </label>

                  <!-- PayPal -->
                  <label
                    :class="[
                      'flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                      selectedPaymentMethod === 'paypal'
                        ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                        : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                    ]">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      v-model="selectedPaymentMethod"
                      class="w-4 h-4 text-[#F5A3B7] border-white/30 focus:ring-[#F5A3B7] cursor-pointer relative z-10" />
                    <span
                      class="text-sm font-semibold text-gray-900 flex-grow relative z-10"
                      >PayPal</span
                    >
                    <div class="h-8 w-auto object-contain relative z-10">
                      <svg
                        width="46"
                        height="32"
                        viewBox="0 0 46 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          fill="white" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          stroke="#F5F5F5" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.4856 24.5977L19.7799 22.6655L19.1243 22.6497H15.9937L18.1694 8.39158C18.1761 8.3484 18.198 8.30832 18.23 8.27981C18.2622 8.2513 18.3032 8.23566 18.3461 8.23566H23.6247C25.3773 8.23566 26.5866 8.61251 27.2179 9.35643C27.514 9.70541 27.7025 10.0702 27.7938 10.4715C27.8894 10.8927 27.891 11.3958 27.7977 12.0095L27.7909 12.0542V12.4475L28.087 12.6208C28.3362 12.7575 28.5343 12.9139 28.6863 13.093C28.9394 13.3915 29.1032 13.7708 29.1724 14.2203C29.244 14.6826 29.2203 15.233 29.1032 15.856C28.9681 16.5726 28.7498 17.1968 28.4549 17.7074C28.1837 18.1779 27.8382 18.5683 27.4279 18.8707C27.0362 19.1581 26.5709 19.3762 26.0447 19.5159C25.5347 19.653 24.9534 19.7223 24.3158 19.7223H23.905C23.6113 19.7223 23.326 19.8316 23.102 20.0276C22.8774 20.2277 22.7289 20.5011 22.6833 20.8L22.6523 20.974L22.1322 24.3797L22.1087 24.5047C22.1024 24.5443 22.0917 24.564 22.076 24.5773C22.0619 24.5895 22.0418 24.5977 22.0221 24.5977H19.4856Z"
                          fill="#28356A" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M28.3675 12.0996C28.3519 12.2037 28.3338 12.3101 28.3136 12.4194C27.6175 16.1136 25.2358 17.3898 22.1942 17.3898H20.6454C20.2734 17.3898 19.9599 17.6689 19.902 18.0482L18.8845 24.7192C18.8468 24.9683 19.0325 25.1927 19.2756 25.1927H22.0225C22.3477 25.1927 22.624 24.9484 22.6753 24.6169L22.7022 24.4727L23.2194 21.0804L23.2527 20.8943C23.3033 20.5616 23.5802 20.3173 23.9054 20.3173H24.3162C26.9775 20.3173 29.061 19.2006 29.6699 15.9688C29.9241 14.6187 29.7925 13.4915 29.1194 12.6987C28.9158 12.4596 28.6631 12.2612 28.3675 12.0996Z"
                          fill="#298FC2" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M27.639 11.7995C27.5326 11.7674 27.4229 11.7384 27.3103 11.7122C27.1972 11.6866 27.0813 11.6639 26.962 11.6441C26.5444 11.5743 26.0868 11.5413 25.5967 11.5413H21.4593C21.3573 11.5413 21.2606 11.565 21.174 11.6081C20.9831 11.7029 20.8414 11.8896 20.8071 12.1182L19.9268 17.8802L19.9016 18.0482C19.9595 17.6689 20.273 17.3898 20.645 17.3898H22.1937C25.2354 17.3898 27.6171 16.113 28.3132 12.4194C28.334 12.3101 28.3515 12.2037 28.3671 12.0996C28.191 12.003 28.0003 11.9204 27.7949 11.85C27.7441 11.8326 27.6918 11.8158 27.639 11.7995Z"
                          fill="#22284F" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.8073 12.1182C20.8416 11.8896 20.9834 11.7029 21.1743 11.6087C21.2614 11.5656 21.3576 11.5418 21.4596 11.5418H25.5969C26.087 11.5418 26.5446 11.575 26.9622 11.6447C27.0815 11.6645 27.1974 11.6873 27.3106 11.7128C27.4231 11.7389 27.5328 11.7681 27.6392 11.8C27.692 11.8163 27.7444 11.8332 27.7956 11.85C28.001 11.9204 28.1919 12.0037 28.368 12.0996C28.5751 10.7345 28.3662 9.80498 27.6522 8.9633C26.8648 8.03658 25.4439 7.64001 23.6256 7.64001H18.3468C17.9754 7.64001 17.6586 7.91911 17.6012 8.29905L15.4025 22.7038C15.3592 22.9888 15.5718 23.2459 15.8499 23.2459H19.1088L20.8073 12.1182Z"
                          fill="#28356A" />
                      </svg>
                    </div>
                  </label>

                  <!-- Credit Card -->
                  <label
                    :class="[
                      'flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                      selectedPaymentMethod === 'card'
                        ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                        : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                    ]">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      v-model="selectedPaymentMethod"
                      class="w-4 h-4 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer" />
                    <span class="text-sm font-semibold text-gray-800 flex-grow"
                      >Credit / Debit Card</span
                    >
                    <div class="flex gap-1">
                      <div class="h-8 w-auto object-contain">
                        <svg
                          width="46"
                          height="32"
                          viewBox="0 0 46 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="0.5"
                            y="0.5"
                            width="45"
                            height="31"
                            rx="5.5"
                            fill="white" />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="45"
                            height="31"
                            rx="5.5"
                            stroke="#F5F5F5" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M14.3337 21.1443H11.5874L9.52796 13.0565C9.43022 12.6844 9.22267 12.3555 8.91737 12.2005C8.15547 11.811 7.31591 11.5009 6.40002 11.3446V11.0332H10.8241C11.4347 11.0332 11.8927 11.5009 11.969 12.0442L13.0375 17.8782L15.7825 11.0332H18.4525L14.3337 21.1443ZM19.979 21.1443H17.3853L19.521 11.0332H22.1147L19.979 21.1443ZM25.4703 13.8343C25.5466 13.2897 26.0046 12.9783 26.5388 12.9783C27.3784 12.9001 28.2929 13.0565 29.0562 13.4447L29.5141 11.2677C28.7509 10.9564 27.9113 10.8 27.1494 10.8C24.6321 10.8 22.8003 12.2005 22.8003 14.1443C22.8003 15.623 24.0978 16.3995 25.0137 16.8672C26.0046 17.3336 26.3862 17.645 26.3099 18.1114C26.3099 18.811 25.5466 19.1224 24.7847 19.1224C23.8688 19.1224 22.9529 18.8892 22.1147 18.4996L21.6568 20.6779C22.5727 21.0661 23.5635 21.2225 24.4794 21.2225C27.3021 21.2993 29.0562 19.9001 29.0562 17.8C29.0562 15.1553 25.4703 15.0003 25.4703 13.8343ZM38.1334 21.1443L36.074 11.0332H33.8619C33.404 11.0332 32.946 11.3446 32.7934 11.811L28.9798 21.1443H31.6498L32.1828 19.6669H35.4634L35.7687 21.1443H38.1334ZM34.2435 13.7561L35.0054 17.5668H32.8697L34.2435 13.7561Z"
                            fill="#172B85" />
                        </svg>
                      </div>
                      <div class="h-8 w-auto object-contain">
                        <svg
                          width="46"
                          height="32"
                          viewBox="0 0 46 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="0.5"
                            y="0.5"
                            width="45"
                            height="31"
                            rx="5.5"
                            fill="white" />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="45"
                            height="31"
                            rx="5.5"
                            stroke="#F5F5F5" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.9053 22.4392C21.3266 23.77 19.2787 24.5733 17.0409 24.5733C12.0478 24.5733 8 20.5737 8 15.64C8 10.7062 12.0478 6.70663 17.0409 6.70663C19.2787 6.70663 21.3266 7.50997 22.9053 8.84069C24.484 7.50997 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z"
                            fill="#ED0006" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4792 22.9053 8.84069C24.484 7.50996 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z"
                            fill="#F9A000" />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4793 22.9053 8.84073C20.9614 10.4793 19.7288 12.9174 19.7288 15.64C19.7288 18.3626 20.9614 20.8007 22.9053 22.4392Z"
                            fill="#FF5E00" />
                        </svg>
                      </div>
                    </div>
                  </label>

                  <!-- Bitcoin -->
                  <label
                    :class="[
                      'flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                      selectedPaymentMethod === 'bitcoin'
                        ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                        : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                    ]">
                    <input
                      type="radio"
                      name="payment"
                      value="bitcoin"
                      v-model="selectedPaymentMethod"
                      class="w-4 h-4 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer" />
                    <span class="text-sm font-semibold text-gray-800 flex-grow"
                      >Bitcoin (BTC)</span
                    >
                    <div class="h-8 w-auto object-contain">
                      <svg
                        width="46"
                        height="32"
                        viewBox="0 0 46 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          fill="white" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          stroke="#F5F5F5" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M33.16 15.9133C33.16 21.7565 28.4232 26.4933 22.58 26.4933C16.7368 26.4933 12 21.7565 12 15.9133C12 10.0702 16.7368 5.33333 22.58 5.33333C28.4232 5.33333 33.16 10.0702 33.16 15.9133ZM25.1218 11.9825C26.5935 12.4879 27.6701 13.2446 27.4589 14.653C27.3055 15.6842 26.7317 16.183 25.9692 16.3576C27.0153 16.9001 27.3717 17.9295 27.0405 19.1743C26.4116 20.9656 24.9166 21.1165 22.9282 20.742L22.4454 22.6677L21.2798 22.3779L21.756 20.4781C21.4538 20.4034 21.145 20.3233 20.8269 20.238L20.3487 22.1471L19.1845 21.8573L19.6666 19.9277L17.3189 19.3377L17.8981 18.0081C17.8981 18.0081 18.7574 18.235 18.7455 18.2184C19.0756 18.2998 19.2223 18.0855 19.2801 17.9432L20.5884 12.7167C20.6031 12.47 20.5174 12.1591 20.0452 12.0414C20.0631 12.0288 19.1984 11.8317 19.1984 11.8317L19.5086 10.5914L21.8596 11.1715L22.3378 9.26373L23.5027 9.55346L23.0344 11.4235C23.3479 11.4943 23.6627 11.5664 23.9689 11.6425L24.4338 9.78433L25.5993 10.0741L25.1218 11.9825ZM22.3329 15.1649C23.1269 15.3754 24.8546 15.8334 25.1557 14.6324C25.4629 13.4037 23.7844 13.0326 22.9626 12.8509C22.8695 12.8303 22.7873 12.8122 22.7203 12.7955L22.1399 15.1147C22.1952 15.1283 22.2601 15.1456 22.3329 15.1649ZM21.4333 18.8989C22.3843 19.1494 24.4641 19.6972 24.7951 18.3739C25.1338 17.0208 23.1173 16.5701 22.1334 16.3502L22.1333 16.3502L22.1332 16.3502C22.0233 16.3256 21.9264 16.3039 21.847 16.2842L21.2067 18.8402C21.2716 18.8563 21.3476 18.8763 21.4327 18.8987L21.4333 18.8989L21.4333 18.8989Z"
                          fill="#F7931A" />
                      </svg>
                    </div>
                  </label>
                </div>

                <!-- Saved Cards List -->
                <transition name="fade-slide">
                  <div
                    v-if="selectedPaymentMethod === 'card'"
                    class="mt-3 space-y-3">
                    <div class="flex items-center justify-between">
                      <h4 class="text-sm font-semibold text-gray-900">
                        Select Card
                      </h4>
                      <button
                        @click="showAddCardForm = !showAddCardForm"
                        class="text-xs font-semibold text-[#F5A3B7] hover:text-gray-900 flex items-center gap-1 transition-colors">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          stroke-width="2">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add New
                      </button>
                    </div>

                    <!-- Saved Cards -->
                    <div class="space-y-2">
                      <label
                        v-for="card in savedCards"
                        :key="card.id"
                        :class="[
                          'block p-4 border rounded-2xl cursor-pointer transition-all relative overflow-hidden group shadow-sm',
                          selectedCard === card.id
                            ? 'border-[#F5A3B7] bg-[#F5A3B7]/20 shadow-[0_0_15px_rgba(245,163,183,0.2)]'
                            : 'border-white/40 bg-white/30 hover:bg-white/50 hover:border-white/60',
                        ]">
                        <div class="flex items-center gap-3 relative z-10">
                          <input
                            type="radio"
                            name="saved-card"
                            :value="card.id"
                            v-model="selectedCard"
                            class="w-4 h-4 text-[#F5A3B7] border-white/30 focus:ring-[#F5A3B7] cursor-pointer" />

                          <div class="flex-grow min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                              <div
                                v-html="card.icon"
                                class="h-6 w-auto object-contain"></div>
                              <div class="text-sm font-semibold text-gray-900">
                                {{ card.type }} •••• {{ card.last4 }}
                              </div>
                            </div>
                            <div
                              class="flex items-center gap-2 text-xs text-gray-700">
                              <span>{{ card.name }}</span>
                              <span>•</span>
                              <span>Exp {{ card.expiry }}</span>
                            </div>
                          </div>

                          <div
                            v-if="card.isDefault"
                            class="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">
                            Default
                          </div>

                          <button
                            @click.stop="removeCard(card.id)"
                            class="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md transition-colors"
                            title="Remove">
                            <svg
                              class="w-4 h-4"
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

                    <!-- Add New Card Form -->
                    <transition name="fade-slide">
                      <div
                        v-if="showAddCardForm"
                        class="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 space-y-3 relative shadow-inner">
                        <div
                          class="flex items-center justify-between relative z-10">
                          <h5 class="text-sm font-semibold text-gray-900">
                            Add New Card
                          </h5>
                          <button
                            @click="showAddCardForm = false"
                            class="text-gray-500 hover:text-gray-900 transition-colors">
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              stroke-width="2">
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>

                        <div class="space-y-3 relative z-10">
                          <div>
                            <label
                              class="text-xs font-semibold text-gray-700 block mb-1"
                              >Card Number</label
                            >
                            <input
                              type="text"
                              v-model="newCard.number"
                              placeholder="1234 5678 9012 3456"
                              maxlength="19"
                              class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500" />
                          </div>

                          <div>
                            <label
                              class="text-xs font-semibold text-gray-700 block mb-1"
                              >Cardholder Name</label
                            >
                            <input
                              type="text"
                              v-model="newCard.name"
                              placeholder="Dara Veasna"
                              class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500" />
                          </div>

                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label
                                class="text-xs font-semibold text-gray-700 block mb-1"
                                >Expiry</label
                              >
                              <input
                                type="text"
                                v-model="newCard.expiry"
                                placeholder="MM/YY"
                                maxlength="5"
                                class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500" />
                            </div>
                            <div>
                              <label
                                class="text-xs font-semibold text-gray-700 block mb-1"
                                >CVV</label
                              >
                              <input
                                type="text"
                                v-model="newCard.cvv"
                                placeholder="123"
                                maxlength="4"
                                class="w-full px-3 py-2 text-sm liquid-input rounded-xl placeholder:text-gray-500" />
                            </div>
                          </div>

                          <label class="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              v-model="newCard.saveCard"
                              class="w-4 h-4 text-[#F5A3B7] border-gray-300 rounded focus:ring-[#F5A3B7]" />
                            <span class="text-xs text-gray-700 font-medium"
                              >Save for future use</span
                            >
                          </label>

                          <button
                            @click="addNewCard"
                            class="w-full py-2.5 bg-[#F5A3B7] hover:bg-[#E392A6] text-white text-sm font-semibold rounded-lg transition-all shadow-md hover:shadow-lg">
                            Add Card
                          </button>
                        </div>
                      </div>
                    </transition>
                  </div>
                </transition>

                <!-- PayPal Info -->
                <transition name="fade-slide">
                  <div
                    v-if="selectedPaymentMethod === 'paypal'"
                    class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div class="flex items-center gap-3 mb-2">
                      <svg
                        width="46"
                        height="32"
                        viewBox="0 0 46 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-auto object-contain">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          fill="white" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="45"
                          height="31"
                          rx="3.5"
                          stroke="#F5F5F5" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.4856 24.5977L19.7799 22.6655L19.1243 22.6497H15.9937L18.1694 8.39158C18.1761 8.3484 18.198 8.30832 18.23 8.27981C18.2622 8.2513 18.3032 8.23566 18.3461 8.23566H23.6247C25.3773 8.23566 26.5866 8.61251 27.2179 9.35643C27.514 9.70541 27.7025 10.0702 27.7938 10.4715C27.8894 10.8927 27.891 11.3958 27.7977 12.0095L27.7909 12.0542V12.4475L28.087 12.6208C28.3362 12.7575 28.5343 12.9139 28.6863 13.093C28.9394 13.3915 29.1032 13.7708 29.1724 14.2203C29.244 14.6826 29.2203 15.233 29.1032 15.856C28.9681 16.5726 28.7498 17.1968 28.4549 17.7074C28.1837 18.1779 27.8382 18.5683 27.4279 18.8707C27.0362 19.1581 26.5709 19.3762 26.0447 19.5159C25.5347 19.653 24.9534 19.7223 24.3158 19.7223H23.905C23.6113 19.7223 23.326 19.8316 23.102 20.0276C22.8774 20.2277 22.7289 20.5011 22.6833 20.8L22.6523 20.974L22.1322 24.3797L22.1087 24.5047C22.1024 24.5443 22.0917 24.564 22.076 24.5773C22.0619 24.5895 22.0418 24.5977 22.0221 24.5977H19.4856Z"
                          fill="#28356A" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M28.3675 12.0996C28.3519 12.2037 28.3338 12.3101 28.3136 12.4194C27.6175 16.1136 25.2358 17.3898 22.1942 17.3898H20.6454C20.2734 17.3898 19.9599 17.6689 19.902 18.0482L18.8845 24.7192C18.8468 24.9683 19.0325 25.1927 19.2756 25.1927H22.0225C22.3477 25.1927 22.624 24.9484 22.6753 24.6169L22.7022 24.4727L23.2194 21.0804L23.2527 20.8943C23.3033 20.5616 23.5802 20.3173 23.9054 20.3173H24.3162C26.9775 20.3173 29.061 19.2006 29.6699 15.9688C29.9241 14.6187 29.7925 13.4915 29.1194 12.6987C28.9158 12.4596 28.6631 12.2612 28.3675 12.0996Z"
                          fill="#298FC2" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M27.639 11.7995C27.5326 11.7674 27.4229 11.7384 27.3103 11.7122C27.1972 11.6866 27.0813 11.6639 26.962 11.6441C26.5444 11.5743 26.0868 11.5413 25.5967 11.5413H21.4593C21.3573 11.5413 21.2606 11.565 21.174 11.6081C20.9831 11.7029 20.8414 11.8896 20.8071 12.1182L19.9268 17.8802L19.9016 18.0482C19.9595 17.6689 20.273 17.3898 20.645 17.3898H22.1937C25.2354 17.3898 27.6171 16.113 28.3132 12.4194C28.334 12.3101 28.3515 12.2037 28.3671 12.0996C28.191 12.003 28.0003 11.9204 27.7949 11.85C27.7441 11.8326 27.6918 11.8158 27.639 11.7995Z"
                          fill="#22284F" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M20.8073 12.1182C20.8416 11.8896 20.9834 11.7029 21.1743 11.6087C21.2614 11.5656 21.3576 11.5418 21.4596 11.5418H25.5969C26.087 11.5418 26.5446 11.575 26.9622 11.6447C27.0815 11.6645 27.1974 11.6873 27.3106 11.7128C27.4231 11.7389 27.5328 11.7681 27.6392 11.8C27.692 11.8163 27.7444 11.8332 27.7956 11.85C28.001 11.9204 28.1919 12.0037 28.368 12.0996C28.5751 10.7345 28.3662 9.80498 27.6522 8.9633C26.8648 8.03658 25.4439 7.64001 23.6256 7.64001H18.3468C17.9754 7.64001 17.6586 7.91911 17.6012 8.29905L15.4025 22.7038C15.3592 22.9888 15.5718 23.2459 15.8499 23.2459H19.1088L20.8073 12.1182Z"
                          fill="#28356A" />
                      </svg>
                      <div>
                        <h4 class="text-sm font-semibold text-gray-800">
                          PayPal Account
                        </h4>
                        <p class="text-xs text-gray-600">Redirects to PayPal</p>
                      </div>
                    </div>
                    <div class="text-xs text-gray-700 bg-white p-2 rounded">
                      <strong>Email:</strong> daraa.veasna@gmail.com
                    </div>
                  </div>
                </transition>

                <!-- Bitcoin Info -->
                <transition name="fade-slide">
                  <div
                    v-if="selectedPaymentMethod === 'bitcoin'"
                    class="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div class="flex items-center gap-3 mb-2">
                      <img
                        src="../assets/icons/btc.svg"
                        alt="Bitcoin"
                        class="h-8 w-auto object-contain" />
                      <div>
                        <h4 class="text-sm font-semibold text-gray-800">
                          Bitcoin Payment
                        </h4>
                        <p class="text-xs text-gray-600">
                          Send to address below
                        </p>
                      </div>
                    </div>
                    <div class="space-y-2">
                      <div>
                        <label
                          class="text-xs font-semibold text-gray-700 block mb-1"
                          >Address</label
                        >
                        <div
                          class="bg-white p-2 rounded text-xs font-mono break-all text-gray-800">
                          bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                        </div>
                      </div>
                      <div>
                        <label
                          class="text-xs font-semibold text-gray-700 block mb-1"
                          >Amount</label
                        >
                        <div
                          class="bg-white p-2 rounded text-xs font-semibold text-gray-800">
                          {{ (parseFloat(total) / 45000).toFixed(8) }} BTC
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>

                <!-- Binance Info -->
                <transition name="fade-slide">
                  <div
                    v-if="selectedPaymentMethod === 'binance'"
                    class="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div class="flex items-center gap-3 mb-2">
                      <img
                        src="../assets/icons/binance-official.svg"
                        alt="Binance"
                        class="h-8 w-auto object-contain" />
                      <div>
                        <h4 class="text-sm font-semibold text-gray-800">
                          Binance Pay
                        </h4>
                        <p class="text-xs text-gray-600">
                          Redirects to Binance
                        </p>
                      </div>
                    </div>
                    <div class="text-xs text-gray-700 bg-white p-2 rounded">
                      <strong>User ID:</strong> 123456789
                    </div>
                  </div>
                </transition>
              </div>
            </div>

            <!-- Security Notice -->
            <div
              class="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 backdrop-blur-sm rounded-2xl border border-green-500/20 flex items-start gap-4 shadow-sm">
              <div
                class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <svg
                  class="w-5 h-5 text-white"
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
                <h4 class="text-sm font-bold text-gray-800 mb-1">
                  Secure Checkout
                </h4>
                <p class="text-xs text-gray-600 leading-relaxed font-medium">
                  Your payment is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          v-if="!isEmpty"
          class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
          <AdvancedLiquidButton
            variant="primary"
            size="lg"
            full-width
            class="w-full sm:flex-1"
            @click="$router.push('/product')">
            <template v-slot:icon-left>
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </template>
            Continue Shopping
          </AdvancedLiquidButton>

          <LiquidButton
            @click="completePayment"
            :disabled="isEmpty"
            variant="primary"
            size="lg"
            full-width
            class="sm:flex-1">
            <template v-slot:icon-left>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </template>
            <span>Complete Order - ${{ total }}</span>
          </LiquidButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, reactive} from "vue";
import NavBarComponentVue from "../components/NavBarComponent.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import AnnouncementBanner from "../components/AnnouncementBanner.vue";
import LiquidButton from "../components/LiquidButton.vue";
import AdvancedLiquidButton from "../components/AdvancedLiquidButton.vue";

const productStore = useProductStore();
const {success, error: errorToast, info} = useToast();

// Payment method selection
const selectedPaymentMethod = ref("card");

// Card management state
const selectedCard = ref(1);
const showAddCardForm = ref(false);

// Contact & Shipping edit modes
const editModes = reactive({
  email: false,
  address: false,
  delivery: false,
});

// Contact & Shipping data
const contactInfo = reactive({
  email: "daraa.veasna@gmail.com",
});

const shippingInfo = reactive({
  address: "Khan Toul Kouk, Phnom Penh, Cambodia",
});

const deliveryInfo = reactive({
  method: "Fast Shipping",
  cost: 5.0,
  estimate: "3-5 business days",
});

// Temporary edit data (for form inputs)
const editData = reactive({
  email: "",
  address: "",
  deliveryMethod: "",
  deliveryCost: 0,
  deliveryEstimate: "",
});

// Saved cards data
const savedCards = ref([
  {
    id: 1,
    type: "Visa",
    last4: "4242",
    expiry: "12/25",
    name: "Dara Veasna",
    icon: `<svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/> <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F5F5F5"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3337 21.1443H11.5874L9.52796 13.0565C9.43022 12.6844 9.22267 12.3555 8.91737 12.2005C8.15547 11.811 7.31591 11.5009 6.40002 11.3446V11.0332H10.8241C11.4347 11.0332 11.8927 11.5009 11.969 12.0442L13.0375 17.8782L15.7825 11.0332H18.4525L14.3337 21.1443ZM19.979 21.1443H17.3853L19.521 11.0332H22.1147L19.979 21.1443ZM25.4703 13.8343C25.5466 13.2897 26.0046 12.9783 26.5388 12.9783C27.3784 12.9001 28.2929 13.0565 29.0562 13.4447L29.5141 11.2677C28.7509 10.9564 27.9113 10.8 27.1494 10.8C24.6321 10.8 22.8003 12.2005 22.8003 14.1443C22.8003 15.623 24.0978 16.3995 25.0137 16.8672C26.0046 17.3336 26.3862 17.645 26.3099 18.1114C26.3099 18.811 25.5466 19.1224 24.7847 19.1224C23.8688 19.1224 22.9529 18.8892 22.1147 18.4996L21.6568 20.6779C22.5727 21.0661 23.5635 21.2225 24.4794 21.2225C27.3021 21.2993 29.0562 19.9001 29.0562 17.8C29.0562 15.1553 25.4703 15.0003 25.4703 13.8343ZM38.1334 21.1443L36.074 11.0332H33.8619C33.404 11.0332 32.946 11.3446 32.7934 11.811L28.9798 21.1443H31.6498L32.1828 19.6669H35.4634L35.7687 21.1443H38.1334ZM34.2435 13.7561L35.0054 17.5668H32.8697L34.2435 13.7561Z" fill="#172B85"/> </svg>`,
    isDefault: true,
  },
  {
    id: 2,
    type: "Mastercard",
    last4: "8888",
    expiry: "08/26",
    name: "Dara Veasna",
    icon: `<svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/><rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F5F5F5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C21.3266 23.77 19.2787 24.5733 17.0409 24.5733C12.0478 24.5733 8 20.5737 8 15.64C8 10.7062 12.0478 6.70663 17.0409 6.70663C19.2787 6.70663 21.3266 7.50997 22.9053 8.84069C24.484 7.50997 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#ED0006"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4792 22.9053 8.84069C24.484 7.50996 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#F9A000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4793 22.9053 8.84073C20.9614 10.4793 19.7288 12.9174 19.7288 15.64C19.7288 18.3626 20.9614 20.8007 22.9053 22.4392Z" fill="#FF5E00"/></svg>`,
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

// Contact & Shipping edit functions
const startEditEmail = () => {
  editData.email = contactInfo.email;
  editModes.email = true;
};

const saveEmail = () => {
  if (!editData.email.trim()) {
    errorToast("Email is required");
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(editData.email)) {
    errorToast("Please enter a valid email address");
    return;
  }

  contactInfo.email = editData.email;
  editModes.email = false;
  success("Email updated successfully!");
};

const cancelEmailEdit = () => {
  editModes.email = false;
  editData.email = "";
};

const startEditAddress = () => {
  editData.address = shippingInfo.address;
  editModes.address = true;
};

const saveAddress = () => {
  if (!editData.address.trim()) {
    errorToast("Address is required");
    return;
  }

  shippingInfo.address = editData.address;
  editModes.address = false;
  success("Address updated successfully!");
};

const cancelAddressEdit = () => {
  editModes.address = false;
  editData.address = "";
};

const startEditDelivery = () => {
  editData.deliveryMethod = deliveryInfo.method;
  editData.deliveryCost = deliveryInfo.cost;
  editData.deliveryEstimate = deliveryInfo.estimate;
  editModes.delivery = true;
};

const saveDelivery = () => {
  if (!editData.deliveryMethod.trim()) {
    errorToast("Delivery method is required");
    return;
  }

  deliveryInfo.method = editData.deliveryMethod;
  deliveryInfo.cost = editData.deliveryCost;
  deliveryInfo.estimate = editData.deliveryEstimate;
  editModes.delivery = false;
  success("Delivery method updated successfully!");
};

const cancelDeliveryEdit = () => {
  editModes.delivery = false;
  editData.deliveryMethod = "";
  editData.deliveryCost = 0;
  editData.deliveryEstimate = "";
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
    Visa: `<svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/> <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F5F5F5"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3337 21.1443H11.5874L9.52796 13.0565C9.43022 12.6844 9.22267 12.3555 8.91737 12.2005C8.15547 11.811 7.31591 11.5009 6.40002 11.3446V11.0332H10.8241C11.4347 11.0332 11.8927 11.5009 11.969 12.0442L13.0375 17.8782L15.7825 11.0332H18.4525L14.3337 21.1443ZM19.979 21.1443H17.3853L19.521 11.0332H22.1147L19.979 21.1443ZM25.4703 13.8343C25.5466 13.2897 26.0046 12.9783 26.5388 12.9783C27.3784 12.9001 28.2929 13.0565 29.0562 13.4447L29.5141 11.2677C28.7509 10.9564 27.9113 10.8 27.1494 10.8C24.6321 10.8 22.8003 12.2005 22.8003 14.1443C22.8003 15.623 24.0978 16.3995 25.0137 16.8672C26.0046 17.3336 26.3862 17.645 26.3099 18.1114C26.3099 18.811 25.5466 19.1224 24.7847 19.1224C23.8688 19.1224 22.9529 18.8892 22.1147 18.4996L21.6568 20.6779C22.5727 21.0661 23.5635 21.2225 24.4794 21.2225C27.3021 21.2993 29.0562 19.9001 29.0562 17.8C29.0562 15.1553 25.4703 15.0003 25.4703 13.8343ZM38.1334 21.1443L36.074 11.0332H33.8619C33.404 11.0332 32.946 11.3446 32.7934 11.811L28.9798 21.1443H31.6498L32.1828 19.6669H35.4634L35.7687 21.1443H38.1334ZM34.2435 13.7561L35.0054 17.5668H32.8697L34.2435 13.7561Z" fill="#172B85"/> </svg>`,
    Mastercard: `<svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/><rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F5F5F5"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C21.3266 23.77 19.2787 24.5733 17.0409 24.5733C12.0478 24.5733 8 20.5737 8 15.64C8 10.7062 12.0478 6.70663 17.0409 6.70663C19.2787 6.70663 21.3266 7.50997 22.9053 8.84069C24.484 7.50997 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#ED0006"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4792 22.9053 8.84069C24.484 7.50996 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#F9A000"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 24.8492 10.4793 22.9053 8.84073C20.9614 10.4793 19.7288 12.9174 19.7288 15.64C19.7288 18.3626 20.9614 20.8007 22.9053 22.4392Z" fill="#FF5E00"/></svg>`,
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
  } else if (selectedPaymentMethod.value === "applepay") {
    paymentMessage = "Processing Apple Pay...";
  } else if (selectedPaymentMethod.value === "googlepay") {
    paymentMessage = "Processing Google Pay...";
  } else if (selectedPaymentMethod.value === "paypal") {
    paymentMessage = "Redirecting to PayPal...";
  } else if (selectedPaymentMethod.value === "bitcoin") {
    paymentMessage = "Processing Bitcoin payment...";
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
/* Fade slide transition */
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

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #ec4899;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}
</style>
