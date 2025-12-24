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

      <div
        class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        <!-- Search Bar Section -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Best Selling Products
          </h1>
          <SearchBar
            v-model="searchQuery"
            :suggestions="searchSuggestions"
            :popularSearches="popularSearches"
            placeholder="Search best selling products..."
            @search="handleSearch" />
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <!-- Sidebar / Filters -->
          <aside class="w-full lg:w-72 flex-shrink-0">
            <!-- Mobile Filter Toggle Button -->
            <LiquidButton
              @click="showFilters = !showFilters"
              variant="primary"
              size="lg"
              :class="'lg:hidden w-full mb-4 justify-between min-h-[48px]'">
              {{ showFilters ? "Hide Filters" : "Show Filters" }}
              <template #icon>
                <svg
                  :class="{'rotate-180': showFilters}"
                  class="w-5 h-5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7" />
                </svg>
              </template>
            </LiquidButton>

            <div :class="{'hidden lg:block': !showFilters}" class="space-y-6">
              <!-- Best Selling Section -->
              <div
                class="menu-product bg-white p-5 sm:p-6 rounded-xl shadow-sm">
                <h3 class="font-bold text-xl sm:text-2xl text-[#383838] mb-6">
                  BEST SELLING
                </h3>
                <div class="flex flex-col space-y-4">
                  <router-link
                    class="option-shop py-3.5 px-4 hover:bg-gray-50 rounded-lg transition-colors text-base min-h-[48px] flex items-center font-medium text-[#383838]"
                    to="/category">
                    Double Cleanse
                  </router-link>
                  <div class="relative">
                    <select
                      v-model="selectedCleansingBalms"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Cleansing Balms</option>
                      <option value="gentle">Gentle Cleansing Balm</option>
                      <option value="deep">Deep Clean Balm</option>
                      <option value="hydrating">Hydrating Balm</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="selectedOilCleansers"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Oil Cleansers</option>
                      <option value="light">Light Oil Cleanser</option>
                      <option value="deep">Deep Cleansing Oil</option>
                      <option value="nourishing">Nourishing Oil</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="selectedWaterCleansers"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Water Cleansers</option>
                      <option value="foam">Foaming Cleanser</option>
                      <option value="gel">Gel Cleanser</option>
                      <option value="cream">Cream Cleanser</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Filters Section -->
              <div
                class="menu-product bg-white p-5 sm:p-6 rounded-xl shadow-sm">
                <h3 class="font-bold text-xl sm:text-2xl text-[#383838] mb-6">
                  FILTERS
                </h3>
                <div class="flex flex-col space-y-4">
                  <div class="relative">
                    <select
                      v-model="filterDoubleCleanse"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Double-Cleanse</option>
                      <option value="all">All Double Cleanse</option>
                      <option value="balms">Cleansing Balms</option>
                      <option value="oils">Oil Cleansers</option>
                      <option value="water">Water Cleansers</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterCleansingBalms"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Cleansing Balms</option>
                      <option value="gentle">Gentle Formula</option>
                      <option value="deep">Deep Cleansing</option>
                      <option value="sensitive">For Sensitive Skin</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterOilCleansers"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Oil Cleansers</option>
                      <option value="light">Light Oil</option>
                      <option value="heavy">Heavy Oil</option>
                      <option value="makeup">Makeup Remover</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterWaterCleansers"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Water Cleansers</option>
                      <option value="foam">Foaming Cleanser</option>
                      <option value="gel">Gel Cleanser</option>
                      <option value="cream">Cream Cleanser</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterToners"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Toners</option>
                      <option value="hydrating">Hydrating Toner</option>
                      <option value="exfoliating">Exfoliating Toner</option>
                      <option value="soothing">Soothing Toner</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterEyeCare"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Eye Care</option>
                      <option value="cream">Eye Cream</option>
                      <option value="serum">Eye Serum</option>
                      <option value="patch">Eye Patch</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <div class="relative">
                    <select
                      v-model="filterExfoliators"
                      class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 text-base rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none transition-all duration-200 min-h-[48px] appearance-none bg-white cursor-pointer">
                      <option value="">Exfoliators</option>
                      <option value="physical">Physical Exfoliator</option>
                      <option value="chemical">Chemical Exfoliator</option>
                      <option value="enzyme">Enzyme Exfoliator</option>
                    </select>
                    <div
                      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                      <svg
                        class="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <!-- Product List -->
          <main class="flex-1">
            <!-- Sort Bar -->
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div class="text-[#B0A6BD] text-base sm:text-lg">46 Products</div>
              <div class="flex items-center gap-3 text-base w-full sm:w-auto">
                <span class="text-gray-700">Sort By</span>
                <div class="relative flex-1 sm:flex-none">
                  <select
                    v-model="sortBy"
                    class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 rounded-lg border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none bg-white text-base min-h-[48px] appearance-none cursor-pointer transition-all duration-200">
                    <option value="best-selling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="a-z">A-Z</option>
                    <option value="z-a">Z-A</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <div
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Products Grid -->
            <div
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 mb-8">
              <div v-for="product in slicedCart" :key="product.id">
                <CartComponent
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

            <!-- Pagination -->
            <div class="flex justify-center">
              <nav class="flex items-center gap-x-1">
                <button
                  type="button"
                  class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span class="hidden sm:inline">Previous</span>
                </button>
                <div class="flex items-center gap-x-1">
                  <button
                    type="button"
                    class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none bg-gray-100 font-medium"
                    aria-current="page">
                    1
                  </button>
                  <button
                    type="button"
                    class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                    2
                  </button>
                  <button
                    type="button"
                    class="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                    3
                  </button>
                </div>
                <button
                  type="button"
                  class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                  <span class="hidden sm:inline">Next</span>
                  <svg
                    class="flex-shrink-0 w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>

      <FooterComponentVue />
    </div>
  </div>
</template>

<script setup>
import FooterComponentVue from "../components/FooterComponent.vue";
import NavBarComponentVue from "../components/NavBarComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import SearchBar from "../components/SearchBar.vue";
import AnnouncementBanner from "../components/AnnouncementBanner.vue";
import LiquidButton from "../components/LiquidButton.vue";
import {useProductStore} from "../stores/ProductStore";
import {useToast} from "../composables/useToast";
import {computed, ref} from "vue";

const store = useProductStore();
const {success} = useToast();
const showFilters = ref(false);

// Search
const searchQuery = ref("");
const searchSuggestions = computed(() => {
  const allProductNames = store.products.map((p) => p.name);
  const allCategories = [...new Set(store.products.map((p) => p.category))];
  return [...allProductNames, ...allCategories];
});
const popularSearches = ref([
  "Best Seller",
  "Cleansing Balm",
  "Toner",
  "Serum",
]);

const products = computed(() => store.products);
const slicedCart = computed(() => {
  let filtered = store.products;

  // Filter best-selling products (you can adjust this logic)
  filtered = filtered.filter((p) => p.bestSeller || p.rating >= 4.5);

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }

  return filtered.slice(2, 12);
});

// Best Selling dropdowns
const selectedCleansingBalms = ref("");
const selectedOilCleansers = ref("");
const selectedWaterCleansers = ref("");

// Filter dropdowns
const filterDoubleCleanse = ref("");
const filterCleansingBalms = ref("");
const filterOilCleansers = ref("");
const filterWaterCleansers = ref("");
const filterToners = ref("");
const filterEyeCare = ref("");
const filterExfoliators = ref("");

// Sort dropdown
const sortBy = ref("best-selling");

const handleAddToCart = (product) => {
  store.addToCart(product);
  success("Product added to cart successfully! 🛒", 3000);
  console.log("Added to cart:", product);
};

const handleSearch = (query) => {
  searchQuery.value = query;
};
</script>

<style scoped>
.menu-product {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

.enhanced-dropdown {
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  color: #383838;
}

.enhanced-dropdown:hover {
  box-shadow: 0 2px 8px rgba(245, 163, 183, 0.15);
}

.enhanced-dropdown:focus {
  box-shadow: 0 0 0 3px rgba(245, 163, 183, 0.1);
}

.enhanced-dropdown option {
  padding: 12px;
  font-weight: 500;
}

.enhanced-dropdown option:hover {
  background-color: #fff5f7;
  color: #f5a3b7;
}

/* Custom scrollbar for dropdowns */
.enhanced-dropdown::-webkit-scrollbar {
  width: 8px;
}

.enhanced-dropdown::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.enhanced-dropdown::-webkit-scrollbar-thumb {
  background: #f5a3b7;
  border-radius: 4px;
}

.enhanced-dropdown::-webkit-scrollbar-thumb:hover {
  background: #e392a6;
}

.option-shop {
  background-color: #fff;
  cursor: pointer;
}
</style>
