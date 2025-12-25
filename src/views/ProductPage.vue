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
        v-if="isInitializing"
        class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        <div class="flex items-center justify-center min-h-[60vh]">
          <div class="text-center">
            <div
              class="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F5A3B7] mb-4"></div>
            <p class="text-gray-600 font-semibold text-lg">
              {{ $t('product.loading') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div
        v-else
        class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 sm:py-8 lg:py-10">
        <!-- Search Bar Section -->
        <div class="mb-6">
          <h1 class="text-2xl sm:text-3xl font-bold text-neutral-900 mb-5 animate-fade-in-up">
            {{ $t('product.discover_products') }}
          </h1>
          <SearchBar
            v-model="searchQuery"
            :suggestions="searchSuggestions"
            :popularSearches="popularSearches"
            @search="handleSearch" />
        </div>

        <div class="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <!-- Sidebar / Filters -->
          <ModernFilterSidebar
            :title="$t('filter.categories')"
            :categories="categories"
            :brands="brands"
            :skinTypes="skinTypes"
            :additionalFilters="additionalFilters"
            :showFilters="showFilters"
            :priceRange="priceRange"
            :selectedRating="selectedRating"
            @toggle-filters="showFilters = !showFilters"
            @category-change="handleCategoryChange"
            @brand-change="handleBrandChange"
            @skin-type-change="handleSkinTypeChange"
            @filter-change="handleFilterChange"
            @price-change="handlePriceChange"
            @rating-change="handleRatingChange"
            @clear-filters="clearAllFilters"
            @remove-filter="removeFilter" />

          <!-- Product List -->
          <main class="flex-1">
            <!-- Results Info and Sort Bar -->
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <div class="text-sm sm:text-base">
                <span class="text-neutral-900 font-semibold">
                  {{ filteredProducts.length }}
                </span>
                <span class="text-gray-600">
                  {{ filteredProducts.length === 1 ? $t('product.count_product') : $t('product.count_products') }}
                </span>
                <span v-if="searchQuery" class="text-gray-500 ml-2">
                  {{ $t('product.for_query') }} "{{ searchQuery }}"
                </span>
              </div>

              <!-- Sort Dropdown -->
              <div class="flex items-center gap-2.5 text-sm w-full sm:w-auto">
                <span class="text-gray-700 font-medium">{{ $t('product.sort_by') }}</span>
                <div class="flex-1 sm:flex-none sm:min-w-[200px]">
                  <SelectDropdown
                    v-model="sortBy"
                    :options="sortOptions"
                    variant="liquid-glass"
                    custom-class="min-h-[44px]"
                    @update:model-value="sortProducts" />
                </div>
              </div>
            </div>

            <!-- No Results Message -->
            <div
              v-if="filteredProducts.length === 0"
              class="text-center py-12 px-6">
              <svg
                class="mx-auto h-20 w-20 text-gray-300 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ $t('product.no_results') }}
              </h3>
              <p class="text-gray-600 mb-5 text-sm">
                {{ $t('product.no_results_desc') }}
              </p>
              <button
                @click="clearAllFilters"
                class="liquid-glass-clear-btn w-full mt-2 lg:w-fit lg:px-10 mx-auto"
                aria-label="Clear all filters">
                <div class="flex items-center justify-center gap-2 relative z-20">
                  <svg
                    class="w-4 h-4 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span class="text-sm font-bold text-gray-800">{{ $t('product.clear_all_filters') }}</span>
                </div>
              </button>
            </div>

            <!-- Products Grid -->
            <div
              v-else
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 xl:gap-5 mb-8">
              <div v-for="(product, index) in paginatedProducts" :key="product.id" :style="{ animationDelay: getStaggerDelay(index, 80) }" class="animate-fade-in-up">
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
            <div v-if="totalPages > 1" class="flex justify-center">
              <nav class="flex items-center gap-x-1">
                <LiquidButton
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  variant="glass"
                  size="sm"
                  class="min-h-[38px]">
                  <template v-slot:icon-left>
                    <svg
                      class="w-3.5 h-3.5"
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
                  </template>
                  <span class="hidden sm:inline">{{ $t('product.previous') }}</span>
                </LiquidButton>

                <div class="flex items-center gap-x-1">
                  <LiquidButton
                    v-for="page in displayedPages"
                    :key="page"
                    @click="goToPage(page)"
                    :variant="currentPage === page ? 'secondary' : 'glass'"
                    size="sm"
                    icon-only
                    :class="[
                      'min-h-[38px] min-w-[38px]',
                      currentPage === page ? 'bg-gray-100 font-medium' : ''
                    ]">
                    {{ page }}
                  </LiquidButton>
                </div>

                <LiquidButton
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  variant="glass"
                  size="sm"
                  class="min-h-[38px]">
                  <span class="hidden sm:inline">{{ $t('product.next') }}</span>
                  <template v-slot:icon-right>
                    <svg
                      class="w-3.5 h-3.5"
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
                  </template>
                </LiquidButton>
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
import ModernFilterSidebar from "../components/ModernFilterSidebar.vue";
import AnnouncementBanner from "../components/AnnouncementBanner.vue";
import SelectDropdown from "../components/SelectDropdown.vue";
import {useProductStore} from "../stores/ProductStore";
import {useSEO} from "../composables/useSEO";
import {useToast} from "../composables/useToast";
import {usePageTransition} from "../composables/usePageTransition";
import LiquidButton from "../components/LiquidButton.vue";
import {computed, ref, watch, onMounted} from "vue";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const store = useProductStore();
const {success} = useToast();
const {getStaggerDelay} = usePageTransition();

// Initialize loading state
const isInitializing = ref(true);

// Initialize store data on component mount
onMounted(async () => {
  try {
    // Ensure store is initialized
    if (!store.isInitialized) {
      await store.fetchProducts();
    }
  } catch (error) {
    console.error("Failed to initialize product store:", error);
  } finally {
    // Set loading to false immediately after data is ready
    isInitializing.value = false;
  }
});

// SEO
useSEO({
  title: "Shop All Products - Korean Skincare & Beauty",
  description:
    "Browse our complete collection of Korean skincare and beauty products. Filter by category, skin type, and brand to find your perfect match.",
  url: "/product",
});

// Search
const searchQuery = ref("");
const searchSuggestions = computed(() => {
  const categories = store.allCategories.map((c) => c.label);
  const brands = store.allBrands.map((b) => b.label);
  const tags = [...new Set(store.products.flatMap((p) => p.tags || []))];
  return [...categories, ...brands, ...tags];
});

const popularSearches = ref([
  "Double Cleanse",
  "Hydrating Toner",
  "Vitamin C",
  "SPF 50+",
  "Snail Mucin",
]);
// Filters
const showFilters = ref(true);

// Categories from store
const categories = ref([]);
watch(
  () => store.allCategories,
  (newCategories) => {
    if (categories.value.length === 0) {
      categories.value = newCategories.map((cat) => ({
        ...cat,
        selected: false,
      }));
    }
  },
  {immediate: true}
);

// Brands from store
const brands = ref([]);
watch(
  () => store.allBrands,
  (newBrands) => {
    if (brands.value.length === 0) {
      brands.value = newBrands.map((brand) => ({
        ...brand,
        selected: false,
      }));
    }
  },
  {immediate: true}
);

// Skin Types from store
const skinTypes = ref([]);
watch(
  () => store.allSkinTypes,
  (newSkinTypes) => {
    if (skinTypes.value.length === 0) {
      skinTypes.value = newSkinTypes.map((type) => ({
        ...type,
        selected: false,
      }));
    }
  },
  {immediate: true}
);

// Additional filters
// Additional filters
const additionalFilters = ref([
  {label: computed(() => t('filter.in_stock')), value: "inStock", selected: false},
  {label: computed(() => t('filter.on_sale')), value: "onSale", selected: false},
  {label: computed(() => t('filter.featured')), value: "featured", selected: false},
]);

// Price range
const priceRange = ref({
  min: 0,
  max: 200,
  current: 200,
});

// Rating
const selectedRating = ref(null);

// Sorting
const sortBy = ref("featured");

// Sort options for dropdown
// Sort options for dropdown
const sortOptions = computed(() => [
  {value: "featured", label: t('sort.featured')},
  {value: "best-selling", label: t('sort.best_selling')},
  {value: "price-low", label: t('sort.price_low')},
  {value: "price-high", label: t('sort.price_high')},
  {value: "rating-high", label: t('sort.rating_high')},
  {value: "a-z", label: t('sort.az')},
  {value: "z-a", label: t('sort.za')},
  {value: "newest", label: t('sort.newest')},
]);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 21; // 7 rows × 3 columns to align with sidebar height

// Filtered and Sorted products
const filteredProducts = computed(() => {
  const selectedCategories = categories.value
    .filter((c) => c.selected)
    .map((c) => c.value);
  const selectedBrands = brands.value
    .filter((b) => b.selected)
    .map((b) => b.value);
  const selectedSkinTypes = skinTypes.value
    .filter((s) => s.selected)
    .map((s) => s.value);
  
  const inStock = additionalFilters.value.find(f => f.value === 'inStock')?.selected;
  const onSale = additionalFilters.value.find(f => f.value === 'onSale')?.selected;
  const featured = additionalFilters.value.find(f => f.value === 'featured')?.selected;

  return store.filterProducts({
    searchQuery: searchQuery.value,
    categories: selectedCategories,
    brands: selectedBrands,
    skinTypes: selectedSkinTypes,
    priceRange: { max: priceRange.value.current },
    rating: selectedRating.value,
    inStock,
    onSale,
    featured,
    sortBy: sortBy.value
  });
});

// Paginated products
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});



const displayedPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxPagesToShow / 2)
  );
  let endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Event handlers
const handleSearch = (query) => {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to first page on search
};

const handleCategoryChange = (category) => {
  const index = categories.value.findIndex((c) => c.value === category.value);
  if (index !== -1) {
    categories.value[index].selected = !categories.value[index].selected;
    currentPage.value = 1;
  }
};

const handleBrandChange = (brand) => {
  const index = brands.value.findIndex((b) => b.value === brand.value);
  if (index !== -1) {
    brands.value[index].selected = !brands.value[index].selected;
    currentPage.value = 1;
  }
};

const handleSkinTypeChange = (skinType) => {
  const index = skinTypes.value.findIndex((s) => s.value === skinType.value);
  if (index !== -1) {
    skinTypes.value[index].selected = !skinTypes.value[index].selected;
    currentPage.value = 1;
  }
};

const handleFilterChange = (filter) => {
  const index = additionalFilters.value.findIndex(
    (f) => f.value === filter.value
  );
  if (index !== -1) {
    additionalFilters.value[index].selected =
      !additionalFilters.value[index].selected;
    currentPage.value = 1;
  }
};

const handlePriceChange = (range) => {
  if (range.max !== undefined) {
    priceRange.value.current = range.max;
  }
  currentPage.value = 1;
};

const handleRatingChange = (rating) => {
  selectedRating.value = selectedRating.value === rating ? null : rating;
  currentPage.value = 1;
};

const clearAllFilters = () => {
  // Reset all filters
  categories.value.forEach((c) => (c.selected = false));
  brands.value.forEach((b) => (b.selected = false));
  skinTypes.value.forEach((s) => (s.selected = false));
  additionalFilters.value.forEach((f) => (f.selected = false));
  priceRange.value.current = priceRange.value.max;
  selectedRating.value = null;
  searchQuery.value = "";
  currentPage.value = 1;
};

const removeFilter = (filter) => {
  if (filter.type === "category") {
    const index = categories.value.findIndex(
      (c) => c.value === filter.data.value
    );
    if (index !== -1) categories.value[index].selected = false;
  } else if (filter.type === "brand") {
    const index = brands.value.findIndex((b) => b.value === filter.data.value);
    if (index !== -1) brands.value[index].selected = false;
  } else if (filter.type === "skinType") {
    const index = skinTypes.value.findIndex(
      (s) => s.value === filter.data.value
    );
    if (index !== -1) skinTypes.value[index].selected = false;
  } else if (filter.type === "filter") {
    const index = additionalFilters.value.findIndex(
      (f) => f.value === filter.data.value
    );
    if (index !== -1) additionalFilters.value[index].selected = false;
  } else if (filter.type === "rating") {
    selectedRating.value = null;
  }
  currentPage.value = 1;
};

const sortProducts = () => {
  currentPage.value = 1;
};

// Pagination handlers
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({top: 0, behavior: "smooth"});
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    window.scrollTo({top: 0, behavior: "smooth"});
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  window.scrollTo({top: 0, behavior: "smooth"});
};

const handleAddToCart = (product) => {
  store.addToCart(product);
  success(`${product.title} ${t('product.added_to_cart')} 🛒`, 3000);
  console.log("Added to cart:", product);
};
</script>

<style scoped>

</style>
