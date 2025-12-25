<template>
  <PageLayout>

      <div
        class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
        <!-- Search Bar Section -->
        <div class="mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6 animate-fade-in-up">
            Our Collection
          </h1>
          <SearchBar
            v-model="searchQuery"
            :suggestions="searchSuggestions"
            :popularSearches="popularSearches"
            placeholder="Search our collection..."
            @search="handleSearch" />
        </div>

        <div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
          <!-- Modern Filter Sidebar -->
          <ModernFilterSidebar
            title="Categories"
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
            <!-- Sort Bar -->
            <ProductSortBar
              :product-count="filteredProducts.length"
              v-model="sortBy"
              @update:modelValue="sortProducts"
              class="mb-8" />

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
                No products found
              </h3>
              <p class="text-gray-600 mb-5 text-sm">
                Try adjusting your filters or search query
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
                  <span class="text-sm font-bold text-gray-800">Clear All Filters</span>
                </div>
              </button>
            </div>

            <!-- Products Grid -->
            <div
              v-else
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 mb-8">
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
              <PaginationControls
                :current-page="currentPage"
                :total-pages="totalPages"
                @page-change="handlePageChange" />
            </div>
          </main>
        </div>
      </div>

  </PageLayout>
</template>

<script setup>
import PageLayout from "../components/PageLayout.vue";
import CartComponent from "../components/CartComponent.vue";
import SearchBar from "../components/SearchBar.vue";
import ModernFilterSidebar from "../components/ModernFilterSidebar.vue";
import ProductSortBar from "../components/ProductSortBar.vue";
import PaginationControls from "../components/PaginationControls.vue";
import {useProductStore} from "../stores/ProductStore";
import {useSEO} from "../composables/useSEO";
import {useToast} from "../composables/useToast";
import {usePageTransition} from "../composables/usePageTransition";
import {computed, ref, watch} from "vue";

const store = useProductStore();
const {success} = useToast();
const {getStaggerDelay} = usePageTransition();
const showFilters = ref(false);

// SEO
useSEO({
  title: "Our Collection - Korean Skincare & Beauty",
  description:
    "Explore our curated collection of Korean skincare and beauty products. Discover new arrivals and featured items.",
  url: "/collection",
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
  "New Arrivals",
  "Moisturizer",
  "Sunscreen",
  "Face Mask",
]);

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
const additionalFilters = ref([
  {label: "In Stock", value: "inStock", selected: false},
  {label: "On Sale", value: "onSale", selected: false},
  {label: "New Arrivals", value: "isNew", selected: false},
  {label: "Featured", value: "featured", selected: false},
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
const sortBy = ref("best-selling");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 9;

// Filtered products
const filteredProducts = computed(() => {
  let products = [...store.products];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    products = products.filter((p) => {
      return (
        p.title.toLowerCase().includes(query) ||
        p.product.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    });
  }

  // Category filter
  const selectedCategories = categories.value
    .filter((c) => c.selected)
    .map((c) => c.value);
  if (selectedCategories.length > 0) {
    products = products.filter((p) => selectedCategories.includes(p.category));
  }

  // Brand filter
  const selectedBrands = brands.value
    .filter((b) => b.selected)
    .map((b) => b.value);
  if (selectedBrands.length > 0) {
    products = products.filter((p) => selectedBrands.includes(p.brand));
  }

  // Skin type filter
  const selectedSkinTypes = skinTypes.value
    .filter((s) => s.selected)
    .map((s) => s.value);
  if (selectedSkinTypes.length > 0) {
    products = products.filter((p) =>
      p.skinType.some((type) => selectedSkinTypes.includes(type))
    );
  }

  // Price filter
  products = products.filter((p) => {
    const price = parseFloat(p.price.replace("$", ""));
    return price <= priceRange.value.current;
  });

  // Rating filter
  if (selectedRating.value) {
    products = products.filter((p) => p.rating >= selectedRating.value);
  }

  // Additional filters
  const activeFilters = additionalFilters.value.filter((f) => f.selected);
  activeFilters.forEach((filter) => {
    if (filter.value === "inStock") {
      products = products.filter((p) => p.inStock);
    } else if (filter.value === "onSale") {
      products = products.filter((p) => p.promotion);
    } else if (filter.value === "isNew") {
      products = products.filter((p) => p.isNew);
    } else if (filter.value === "featured") {
      products = products.filter((p) => p.featured);
    }
  });

  return products;
});

// Sorted products
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value];

  switch (sortBy.value) {
    case "featured":
      return products.sort(
        (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      );
    case "best-selling":
      return products.sort((a, b) => b.ratingCount - a.ratingCount);
    case "price-low":
      return products.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
    case "price-high":
      return products.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
    case "rating-high":
      return products.sort((a, b) => b.rating - a.rating);
    case "a-z":
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case "z-a":
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return products.reverse();
    default:
      return products;
  }
});

// Paginated products
const totalPages = computed(() =>
  Math.ceil(sortedProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedProducts.value.slice(start, end);
});

// Event handlers
const handleSearch = (query) => {
  searchQuery.value = query;
  currentPage.value = 1;
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

const handleAddToCart = (product) => {
  store.addToCart(product);
  success(`${product.title} added to cart! 🛒`, 3000);
  console.log("Added to cart:", product);
};

const handlePageChange = (page) => {
  currentPage.value = page;
  window.scrollTo({top: 0, behavior: "smooth"});
};
</script>

<style scoped>

</style>
