<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50/15 via-purple-50/20 to-pink-50/15">
    <NavBarComponentVue />

    <div
      class="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12">
      <!-- Search Bar Section -->
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
          Double Cleanse Products
        </h1>
        <SearchBar
          v-model="searchQuery"
          :suggestions="searchSuggestions"
          :popularSearches="popularSearches"
          placeholder="Search double cleanse products..."
          @search="handleSearch" />
      </div>

      <div class="flex flex-col lg:flex-row gap-8 lg:gap-10">
        <!-- Sidebar / Filters -->
        <ModernFilterSidebar
          title="Product Type"
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
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
            <div class="text-base sm:text-lg font-medium">
              <span class="text-neutral-900 font-semibold">
                {{ filteredProducts.length }}
              </span>
              <span class="text-gray-600">
                {{ filteredProducts.length === 1 ? "Product" : "Products" }}
              </span>
              <span v-if="searchQuery" class="text-gray-500 ml-2">
                for "{{ searchQuery }}"
              </span>
            </div>

            <div class="flex items-center gap-3 text-base w-full sm:w-auto">
              <span class="text-gray-700 font-medium">Sort By</span>
              <div class="relative flex-1 sm:flex-none sm:min-w-[200px]">
                <select
                  v-model="sortBy"
                  @change="sortProducts"
                  class="enhanced-dropdown w-full py-3.5 pl-4 pr-10 rounded-xl border-2 border-gray-200 hover:border-[#F5A3B7] focus:border-[#F5A3B7] focus:ring-2 focus:ring-[#F5A3B7]/20 outline-none bg-white min-h-[48px] appearance-none cursor-pointer transition-all duration-200">
                  <option value="featured">Featured</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating-high">Highest Rated</option>
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

          <!-- No Results Message -->
          <div
            v-if="filteredProducts.length === 0"
            class="text-center py-16 px-6">
            <svg
              class="mx-auto h-24 w-24 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p class="text-gray-600 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              @click="clearAllFilters"
              class="px-6 py-3 bg-[#F5A3B7] text-white rounded-xl font-medium hover:bg-[#e392a6] transition-colors">
              Clear All Filters
            </button>
          </div>

          <!-- Products Grid -->
          <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-5 xl:gap-6 mb-8">
            <div v-for="product in paginatedProducts" :key="product.id">
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
            <nav class="flex items-center gap-x-2">
              <button
                type="button"
                @click="previousPage"
                :disabled="currentPage === 1"
                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m15 18-6-6 6-6" />
                </svg>
                <span class="hidden sm:inline">Previous</span>
              </button>

              <div class="flex items-center gap-x-1">
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  type="button"
                  @click="goToPage(page)"
                  :class="[
                    'min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none transition-colors',
                    currentPage === page
                      ? 'bg-[#F5A3B7] text-white font-semibold hover:bg-[#e392a6]'
                      : 'text-gray-800 hover:bg-gray-100',
                  ]">
                  {{ page }}
                </button>
              </div>

              <button
                type="button"
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none transition-colors">
                <span class="hidden sm:inline">Next</span>
                <svg
                  class="flex-shrink-0 w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>

    <FooterComponentVue />
  </div>
</template>

<script setup>
import FooterComponentVue from "../components/FooterComponent.vue";
import NavBarComponentVue from "../components/NavBarComponent.vue";
import CartComponent from "../components/CartComponent.vue";
import SearchBar from "../components/SearchBar.vue";
import ModernFilterSidebar from "../components/ModernFilterSidebar.vue";
import {useProductStore} from "../stores/ProductStore";
import {computed, ref, watch} from "vue";

const store = useProductStore();

// Filter for double cleanse category products
const doubleCleanseCategories = [
  "Cleansing Balm",
  "Oil Cleanser",
  "Foam Cleanser",
];

// Search
const searchQuery = ref("");
const searchSuggestions = computed(() => {
  return [
    ...doubleCleanseCategories,
    "Gentle Cleanser",
    "Deep Cleansing",
    "Makeup Remover",
    "Double Cleanse Kit",
  ];
});

const popularSearches = ref([
  "Cleansing Balm",
  "Oil Cleanser",
  "Foam Cleanser",
  "Gentle Formula",
]);

// Filters
const showFilters = ref(true);

// Categories (filtered for double cleanse)
const categories = ref([]);
watch(
  () => store.allCategories,
  (newCategories) => {
    if (categories.value.length === 0) {
      categories.value = newCategories
        .filter((cat) => doubleCleanseCategories.includes(cat.label))
        .map((cat) => ({
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
  {label: "Makeup Remover", value: "makeupRemover", selected: false},
  {label: "Gentle Formula", value: "gentle", selected: false},
  {label: "On Sale", value: "onSale", selected: false},
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

// Pagination
const currentPage = ref(1);
const itemsPerPage = 9;

// Filtered products (show only double cleanse products)
const filteredProducts = computed(() => {
  let products = store.products.filter((p) =>
    doubleCleanseCategories.includes(p.category)
  );

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
    if (filter.value === "makeupRemover") {
      products = products.filter(
        (p) => p.tags && p.tags.some((t) => t.toLowerCase().includes("makeup"))
      );
    } else if (filter.value === "gentle") {
      products = products.filter(
        (p) =>
          (p.tags && p.tags.some((t) => t.toLowerCase().includes("gentle"))) ||
          p.skinType.includes("Sensitive")
      );
    } else if (filter.value === "onSale") {
      products = products.filter((p) => p.promotion);
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
  console.log("Added to cart:", product);
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
</style>
