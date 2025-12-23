<template>
  <div class="min-h-screen relative overflow-x-hidden bg-gray-50">
    <NavBarComponentVue />

    <!-- Progress Steps - Minimal Modern -->
    <div
      class="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-16 z-40">
      <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div class="flex items-center justify-center gap-2 sm:gap-3">
          <div class="flex items-center gap-1.5">
            <div
              class="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <span class="hidden sm:inline text-xs font-semibold text-gray-700"
              >Cart</span
            >
          </div>
          <div class="h-0.5 w-8 sm:w-16 bg-[#F5A3B7] rounded-full"></div>
          <div class="flex items-center gap-1.5">
            <div
              class="w-7 h-7 rounded-full bg-[#F5A3B7] flex items-center justify-center">
              <span class="text-xs font-bold text-white">2</span>
            </div>
            <span class="text-xs font-semibold text-[#F5A3B7]">Checkout</span>
          </div>
          <div class="h-0.5 w-8 sm:w-16 bg-gray-300 rounded-full"></div>
          <div class="flex items-center gap-1.5">
            <div
              class="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
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
          class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <!-- Header -->
          <div class="bg-[#F5A3B7]/10 px-4 py-3 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2
                class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-[#F5A3B7]"
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
              <span
                class="px-3 py-1 bg-[#F5A3B7]/20 text-[#F5A3B7] text-xs font-semibold rounded-full">
                {{ cartItems.length }}
                {{ cartItems.length === 1 ? "Item" : "Items" }}
              </span>
            </div>
          </div>

          <!-- Empty Cart Message -->
          <div v-if="isEmpty" class="text-center py-12 px-4">
            <svg
              class="w-16 h-16 mx-auto text-gray-300 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
            <h3 class="text-xl font-bold text-gray-800 mb-2">
              Your cart is empty
            </h3>
            <p class="text-gray-600 mb-6 text-sm">
              Discover our amazing skincare products!
            </p>
            <router-link to="/product">
              <button
                class="px-6 py-2.5 bg-[#F5A3B7] hover:bg-[#E392A6] text-white font-semibold text-sm rounded-lg transition-all">
                Explore Products
              </button>
            </router-link>
          </div>

          <!-- Product Table View -->
          <div v-else class="overflow-hidden">
            <!-- Desktop Table View -->
            <div class="hidden md:block overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gray-50 border-b border-gray-200">
                    <th
                      class="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                      Product
                    </th>
                    <th
                      class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Price
                    </th>
                    <th
                      class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">
                      Quantity
                    </th>
                    <th
                      class="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                      Subtotal
                    </th>
                    <th
                      class="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase w-16"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr
                    v-for="item in cartItems"
                    :key="item.id"
                    class="hover:bg-gray-50 transition-colors">
                    <!-- Product Info -->
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-3">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-16 h-16 object-cover rounded-lg border border-gray-200" />
                        <div class="min-w-0">
                          <h3
                            class="text-sm font-semibold text-gray-800 line-clamp-1">
                            {{ item.title }}
                          </h3>
                          <p class="text-xs text-gray-500 line-clamp-1">
                            {{ item.product }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <!-- Price -->
                    <td class="px-4 py-3 text-center">
                      <span class="text-sm font-semibold text-gray-800">{{
                        item.price
                      }}</span>
                    </td>

                    <!-- Quantity Controls -->
                    <td class="px-4 py-3">
                      <div class="flex items-center justify-center gap-1">
                        <button
                          @click="decreaseQuantity(item.id)"
                          :disabled="item.quantity <= 1"
                          :class="[
                            'w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold transition-colors',
                            item.quantity <= 1
                              ? 'text-gray-300 cursor-not-allowed bg-gray-100'
                              : 'text-gray-700 hover:bg-gray-200',
                          ]">
                          −
                        </button>
                        <span
                          class="font-semibold text-gray-800 min-w-[2rem] text-center text-sm"
                          >{{ item.quantity }}</span
                        >
                        <button
                          @click="increaseQuantity(item.id)"
                          class="w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold bg-[#F5A3B7] hover:bg-[#E392A6] text-white transition-colors">
                          +
                        </button>
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
                      <button
                        @click="removeItem(item.id)"
                        class="w-8 h-8 hover:bg-red-50 text-red-500 hover:text-red-600 rounded-md flex items-center justify-center transition-colors mx-auto"
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
                class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div class="flex gap-3 p-3">
                  <!-- Product Image -->
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-20 h-20 object-cover rounded-lg border border-gray-200" />

                  <!-- Product Details -->
                  <div class="flex-grow min-w-0">
                    <h3
                      class="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                      {{ item.title }}
                    </h3>
                    <p class="text-xs text-gray-500 mb-2">{{ item.product }}</p>
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-semibold text-gray-800">{{
                        item.price
                      }}</span>
                      <button
                        @click="removeItem(item.id)"
                        class="w-7 h-7 text-red-500 hover:bg-red-50 rounded-md flex items-center justify-center transition-colors">
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
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Quantity and Subtotal -->
                <div
                  class="bg-gray-50 px-3 py-2.5 flex items-center justify-between border-t border-gray-200">
                  <div class="flex items-center gap-1">
                    <button
                      @click="decreaseQuantity(item.id)"
                      :disabled="item.quantity <= 1"
                      :class="[
                        'w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold transition-colors',
                        item.quantity <= 1
                          ? 'text-gray-300 cursor-not-allowed bg-gray-200'
                          : 'text-gray-700 hover:bg-gray-200',
                      ]">
                      −
                    </button>
                    <span
                      class="font-semibold text-gray-800 min-w-[2rem] text-center text-sm"
                      >{{ item.quantity }}</span
                    >
                    <button
                      @click="increaseQuantity(item.id)"
                      class="w-7 h-7 flex items-center justify-center rounded-md text-sm font-semibold bg-[#F5A3B7] hover:bg-[#E392A6] text-white transition-colors">
                      +
                    </button>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500 mb-0.5">Subtotal</p>
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
            <div class="bg-gray-50 border-t border-gray-200">
              <div class="px-4 py-4 space-y-4">
                <!-- Promo Code Section -->
                <div class="bg-white rounded-lg p-3 border border-gray-200">
                  <label
                    class="text-xs font-semibold text-gray-700 flex items-center gap-2 mb-2">
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
                  <div class="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      class="flex-grow px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent" />
                    <button
                      class="px-4 py-2 bg-[#F5A3B7] hover:bg-[#E392A6] text-white text-sm font-semibold rounded-lg transition-all whitespace-nowrap">
                      Apply
                    </button>
                  </div>
                </div>

                <!-- Order Summary -->
                <div
                  class="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <!-- Desktop View -->
                  <div class="hidden sm:block">
                    <div class="divide-y divide-gray-200">
                      <div class="flex justify-between px-4 py-2.5">
                        <span class="text-sm font-medium text-gray-700"
                          >Subtotal</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ subtotal }}</span
                        >
                      </div>
                      <div class="flex justify-between px-4 py-2.5">
                        <span class="text-sm font-medium text-gray-700"
                          >Shipping</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ shipping.toFixed(2) }}</span
                        >
                      </div>
                      <div class="flex justify-between px-4 py-2.5">
                        <span class="text-sm font-medium text-gray-700"
                          >Tax (10%)</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ tax }}</span
                        >
                      </div>
                      <div
                        v-if="discount > 0"
                        class="flex justify-between px-4 py-2.5 bg-green-50">
                        <span
                          class="text-sm font-medium text-green-700 flex items-center gap-1">
                          Discount (15%)
                          <span
                            class="px-1.5 py-0.5 bg-green-500 text-white text-xs font-bold rounded"
                            >SAVE</span
                          >
                        </span>
                        <span class="text-sm font-semibold text-green-600"
                          >-${{ discount }}</span
                        >
                      </div>
                      <div
                        class="flex justify-between px-4 py-3 bg-[#F5A3B7]/10">
                        <span class="text-base font-bold text-gray-800"
                          >Total</span
                        >
                        <span class="text-lg font-bold text-[#F5A3B7]"
                          >${{ total }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Mobile View -->
                  <div class="sm:hidden">
                    <div class="divide-y divide-gray-200">
                      <div class="flex justify-between px-3 py-2">
                        <span class="text-xs font-medium text-gray-700"
                          >Subtotal</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ subtotal }}</span
                        >
                      </div>
                      <div class="flex justify-between px-3 py-2">
                        <span class="text-xs font-medium text-gray-700"
                          >Shipping</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ shipping.toFixed(2) }}</span
                        >
                      </div>
                      <div class="flex justify-between px-3 py-2">
                        <span class="text-xs font-medium text-gray-700"
                          >Tax (10%)</span
                        >
                        <span class="text-sm font-semibold text-gray-800"
                          >${{ tax }}</span
                        >
                      </div>
                      <div
                        v-if="discount > 0"
                        class="flex justify-between px-3 py-2 bg-green-50">
                        <span
                          class="text-xs font-medium text-green-700 flex items-center gap-1">
                          Discount (15%)
                          <span
                            class="px-1 py-0.5 bg-green-500 text-white text-xs font-bold rounded"
                            >SAVE</span
                          >
                        </span>
                        <span class="text-sm font-semibold text-green-600"
                          >-${{ discount }}</span
                        >
                      </div>
                      <div
                        class="flex justify-between px-3 py-2.5 bg-[#F5A3B7]/10">
                        <span class="text-sm font-bold text-gray-800"
                          >Total</span
                        >
                        <span class="text-base font-bold text-[#F5A3B7]"
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
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Section Header -->
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3
                class="text-base font-bold text-gray-800 flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-gray-700"
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

            <div class="p-4 space-y-3">
              <!-- Contact Email -->
              <div
                class="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
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
                      class="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Email
                    </div>
                    <!-- Display mode -->
                    <div
                      v-if="!editModes.email"
                      class="text-sm text-gray-800 font-semibold break-all">
                      {{ contactInfo.email }}
                    </div>
                    <!-- Edit mode -->
                    <div v-else class="space-y-2">
                      <input
                        type="email"
                        v-model="editData.email"
                        placeholder="Enter your email"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent"
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
                          class="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="!editModes.email"
                    @click="startEditEmail"
                    class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#F5A3B7] hover:text-[#E392A6] hover:bg-[#F5A3B7]/10 border border-gray-300 rounded-md transition-colors">
                    Edit
                  </button>
                </div>
              </div>

              <!-- Shipping Address -->
              <div
                class="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
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
                      class="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Address
                    </div>
                    <!-- Display mode -->
                    <div
                      v-if="!editModes.address"
                      class="text-sm text-gray-800 font-semibold">
                      {{ shippingInfo.address }}
                    </div>
                    <!-- Edit mode -->
                    <div v-else class="space-y-2">
                      <textarea
                        v-model="editData.address"
                        placeholder="Enter your address"
                        rows="2"
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent resize-none"
                        @keydown.esc="cancelAddressEdit"></textarea>
                      <div class="flex gap-2">
                        <button
                          @click="saveAddress"
                          class="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#F5A3B7] hover:bg-[#E392A6] rounded-md transition-colors">
                          Save
                        </button>
                        <button
                          @click="cancelAddressEdit"
                          class="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="!editModes.address"
                    @click="startEditAddress"
                    class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#F5A3B7] hover:text-[#E392A6] hover:bg-[#F5A3B7]/10 border border-gray-300 rounded-md transition-colors">
                    Edit
                  </button>
                </div>
              </div>

              <!-- Delivery Method -->
              <div
                class="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
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
                      class="text-xs font-semibold text-gray-500 uppercase mb-1">
                      Delivery
                    </div>
                    <!-- Display mode -->
                    <div v-if="!editModes.delivery">
                      <div class="text-sm text-gray-800 font-semibold">
                        {{ deliveryInfo.method }} -
                        <span class="text-[#F5A3B7]"
                          >${{ deliveryInfo.cost.toFixed(2) }}</span
                        >
                      </div>
                      <div class="text-xs text-gray-600 mt-0.5">
                        Est: {{ deliveryInfo.estimate }}
                      </div>
                    </div>
                    <!-- Edit mode -->
                    <div v-else class="space-y-2">
                      <div class="grid grid-cols-2 gap-2">
                        <div>
                          <label
                            class="text-xs font-medium text-gray-700 block mb-1"
                            >Method</label
                          >
                          <input
                            type="text"
                            v-model="editData.deliveryMethod"
                            placeholder="Shipping method"
                            class="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#F5A3B7]"
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
                            class="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#F5A3B7]"
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
                          class="w-full px-2 py-1.5 text-sm bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#F5A3B7]"
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
                          class="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-700 hover:bg-gray-100 border border-gray-300 rounded-md transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="!editModes.delivery"
                    @click="startEditDelivery"
                    class="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-[#F5A3B7] hover:text-[#E392A6] hover:bg-[#F5A3B7]/10 border border-gray-300 rounded-md transition-colors">
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
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Section Header -->
            <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3
                class="text-base font-bold text-gray-800 flex items-center gap-2">
                <svg
                  class="w-5 h-5 text-gray-700"
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

            <div class="p-4 space-y-3">
              <p class="text-xs text-gray-600 font-medium">
                Choose your preferred payment option
              </p>

              <!-- Payment Options -->
              <div class="space-y-2">
                <!-- Credit Card -->
                <label
                  :class="[
                    'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all',
                    selectedPaymentMethod === 'card'
                      ? 'border-[#F5A3B7] bg-[#F5A3B7]/10'
                      : 'border-gray-300 hover:border-gray-400',
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
                  <img
                    src="../assets/icons/credit-card.svg"
                    alt="Credit Card"
                    class="h-6 w-auto object-contain" />
                </label>

                <!-- PayPal -->
                <label
                  :class="[
                    'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all',
                    selectedPaymentMethod === 'paypal'
                      ? 'border-[#F5A3B7] bg-[#F5A3B7]/10'
                      : 'border-gray-300 hover:border-gray-400',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    v-model="selectedPaymentMethod"
                    class="w-4 h-4 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer" />
                  <span class="text-sm font-semibold text-gray-800 flex-grow"
                    >PayPal</span
                  >
                  <img
                    src="../assets/icons/paypal-bordered.svg"
                    alt="PayPal"
                    class="h-6 w-auto object-contain" />
                </label>

                <!-- Bitcoin -->
                <label
                  :class="[
                    'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all',
                    selectedPaymentMethod === 'bitcoin'
                      ? 'border-[#F5A3B7] bg-[#F5A3B7]/10'
                      : 'border-gray-300 hover:border-gray-400',
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
                  <img
                    src="../assets/icons/btc.svg"
                    alt="Bitcoin"
                    class="h-6 w-auto object-contain" />
                </label>

                <!-- Binance Pay -->
                <label
                  :class="[
                    'flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all',
                    selectedPaymentMethod === 'binance'
                      ? 'border-[#F5A3B7] bg-[#F5A3B7]/10'
                      : 'border-gray-300 hover:border-gray-400',
                  ]">
                  <input
                    type="radio"
                    name="payment"
                    value="binance"
                    v-model="selectedPaymentMethod"
                    class="w-4 h-4 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer" />
                  <span class="text-sm font-semibold text-gray-800 flex-grow"
                    >Binance Pay</span
                  >
                  <img
                    src="../assets/icons/binance-official.svg"
                    alt="Binance Pay"
                    class="h-6 w-auto object-contain" />
                </label>
              </div>

              <!-- Saved Cards List -->
              <transition name="fade-slide">
                <div
                  v-if="selectedPaymentMethod === 'card'"
                  class="mt-3 space-y-3">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-semibold text-gray-800">
                      Select Card
                    </h4>
                    <button
                      @click="showAddCardForm = !showAddCardForm"
                      class="text-xs font-semibold text-[#F5A3B7] hover:text-[#E392A6] flex items-center gap-1 transition-colors">
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
                        'block p-3 border rounded-lg cursor-pointer transition-all',
                        selectedCard === card.id
                          ? 'border-[#F5A3B7] bg-[#F5A3B7]/10'
                          : 'border-gray-300 hover:border-gray-400',
                      ]">
                      <div class="flex items-center gap-3">
                        <input
                          type="radio"
                          name="saved-card"
                          :value="card.id"
                          v-model="selectedCard"
                          class="w-4 h-4 text-[#F5A3B7] border-gray-300 focus:ring-[#F5A3B7] cursor-pointer" />

                        <div class="flex-grow min-w-0">
                          <div class="flex items-center gap-2 mb-1">
                            <img
                              :src="card.icon"
                              :alt="card.type"
                              class="h-6 w-auto object-contain" />
                            <div class="text-sm font-semibold text-gray-800">
                              {{ card.type }} •••• {{ card.last4 }}
                            </div>
                          </div>
                          <div
                            class="flex items-center gap-2 text-xs text-gray-600">
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
                          class="w-7 h-7 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
                      class="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                      <div class="flex items-center justify-between">
                        <h5 class="text-sm font-semibold text-gray-800">
                          Add New Card
                        </h5>
                        <button
                          @click="showAddCardForm = false"
                          class="text-gray-500 hover:text-gray-700 transition-colors">
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

                      <div class="space-y-3">
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
                            class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent" />
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
                            class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent" />
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
                              class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent" />
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
                              class="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7] focus:border-transparent" />
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
                          class="w-full py-2.5 bg-[#F5A3B7] hover:bg-[#E392A6] text-white text-sm font-semibold rounded-lg transition-all">
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
                    <img
                      src="../assets/icons/PayPal.svg"
                      alt="PayPal"
                      class="h-8 w-auto object-contain" />
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
                      <p class="text-xs text-gray-600">Send to address below</p>
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
                      <p class="text-xs text-gray-600">Redirects to Binance</p>
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
            class="p-3 bg-green-50 rounded-lg border border-green-200 flex items-start gap-3">
            <div
              class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold text-gray-800 mb-1">
                Secure Checkout
              </h4>
              <p class="text-xs text-gray-700 leading-relaxed">
                Your payment is encrypted. We never store card details.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        v-if="!isEmpty"
        class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 sm:mt-6">
        <router-link to="/product" class="w-full sm:w-auto">
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors">
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
            Continue Shopping
          </button>
        </router-link>

        <button
          @click="completePayment"
          :disabled="isEmpty"
          :class="[
            'w-full sm:flex-1 px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all flex items-center justify-center gap-2',
            isEmpty
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#F5A3B7] hover:bg-[#E392A6] shadow-sm hover:shadow-md',
          ]">
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
          <span>Complete Order - ${{ total }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, reactive} from "vue";
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
