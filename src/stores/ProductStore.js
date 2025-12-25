import {defineStore} from "pinia";
import {productsAPI} from "../services/api";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [],
    cart: [],
    wishlist: [],
    isInitialized: false, // Set to false as products are no longer hardcoded
    isLoading: false,
    error: null,
  }),
  getters: {
    allProducts: (state) => state.products || [],
    productCount: (state) => (state.products || []).length,
    cartItems: (state) => state.cart || [],
    cartTotal: (state) => {
      if (!state.cart || state.cart.length === 0) return "0.00";
      return state.cart
        .reduce((total, item) => {
          const price = parseFloat(item.price.replace("$", ""));
          return total + price * item.quantity;
        }, 0)
        .toFixed(2);
    },
    cartItemCount: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    allCategories: (state) => {
      if (!state.products || state.products.length === 0) return [];
      const categories = [...new Set(state.products.map((p) => p.category))];
      return categories.map((cat) => ({
        label: cat,
        value: cat,
        count: state.products.filter((p) => p.category === cat).length,
      }));
    },
    allBrands: (state) => {
      if (!state.products || state.products.length === 0) return [];
      const brands = [...new Set(state.products.map((p) => p.brand))];
      return brands.map((brand) => ({
        label: brand,
        value: brand,
        count: state.products.filter((p) => p.brand === brand).length,
      }));
    },
    allSkinTypes: (state) => {
      if (!state.products || state.products.length === 0) return [];
      const skinTypesSet = new Set();
      state.products.forEach((p) => {
        if (p.skinType && Array.isArray(p.skinType)) {
          p.skinType.forEach((type) => skinTypesSet.add(type));
        }
      });
      return Array.from(skinTypesSet).map((type) => ({
        label: type,
        value: type,
      }));
    },
    allTags: (state) => {
      if (!state.products || state.products.length === 0) return [];
      const tagsSet = new Set();
      state.products.forEach((p) => {
        if (p.tags && Array.isArray(p.tags)) {
          p.tags.forEach((tag) => tagsSet.add(tag));
        }
      });
      return Array.from(tagsSet).sort();
    },
    featuredProducts: (state) => {
      if (!state.products) return [];
      return state.products.filter((p) => p.featured);
    },
    bestSellingProducts: (state) => {
      if (!state.products) return [];
      return [...state.products]
        .sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0))
        .slice(0, 8);
    },
    onSaleProducts: (state) => {
      if (!state.products) return [];
      return state.products.filter((p) => p.promotion && p.promotion !== "");
    },
    wishlistCount: (state) => state.wishlist?.length || 0,
    isInWishlist: (state) => (productId) => {
      return state.wishlist?.some((item) => item.id === productId) || false;
    },
    getProductById: (state) => (id) => {
      const productId = parseInt(id);
      return state.products.find((p) => p.id === productId);
    },
    // Advanced search & filter
    searchProducts: (state) => (query) => {
      if (!query || !state.products) return state.products;
      const lowerQuery = query.toLowerCase();
      return state.products.filter(
        (p) =>
          p.title?.toLowerCase().includes(lowerQuery) ||
          p.product?.toLowerCase().includes(lowerQuery) ||
          p.brand?.toLowerCase().includes(lowerQuery) ||
          p.category?.toLowerCase().includes(lowerQuery) ||
          p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    },
    filterProducts: (state) => (filters) => {
      let filtered = [...(state.products || [])];

      // Search Query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title?.toLowerCase().includes(query) ||
            p.product?.toLowerCase().includes(query) ||
            p.brand?.toLowerCase().includes(query) ||
            p.category?.toLowerCase().includes(query) ||
            p.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      if (filters.categories && filters.categories.length > 0) {
        filtered = filtered.filter((p) =>
          filters.categories.includes(p.category)
        );
      }

      if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter((p) => filters.brands.includes(p.brand));
      }

      if (filters.skinTypes && filters.skinTypes.length > 0) {
        filtered = filtered.filter((p) =>
          p.skinType?.some((type) => filters.skinTypes.includes(type))
        );
      }

      if (filters.priceRange) {
        filtered = filtered.filter((p) => {
          const price = parseFloat(p.price.replace("$", ""));
          const max = filters.priceRange.max !== undefined ? filters.priceRange.max : Infinity;
          const min = filters.priceRange.min !== undefined ? filters.priceRange.min : 0;
          return price >= min && price <= max;
        });
      }

      if (filters.rating) {
        filtered = filtered.filter((p) => p.rating >= filters.rating);
      }

      if (filters.inStock) {
        filtered = filtered.filter((p) => p.inStock);
      }

      if (filters.onSale || filters.promotion) {
        filtered = filtered.filter((p) => p.promotion && p.promotion !== "");
      }

      if (filters.featured) {
        filtered = filtered.filter((p) => p.featured);
      }

      if (filters.bestSeller) {
        // "Best Seller" definition: flagged as bestSeller OR high rating
        filtered = filtered.filter((p) => p.bestSeller || p.rating >= 4.5);
      }

      // Sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "featured":
            filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
            break;
          case "best-selling":
            filtered.sort((a, b) => (b.ratingCount || 0) - (a.ratingCount || 0));
            break;
          case "price-low":
            filtered.sort(
              (a, b) =>
                parseFloat(a.price.replace("$", "")) -
                parseFloat(b.price.replace("$", ""))
            );
            break;
          case "price-high":
            filtered.sort(
              (a, b) =>
                parseFloat(b.price.replace("$", "")) -
                parseFloat(a.price.replace("$", ""))
            );
            break;
          case "rating-high":
            filtered.sort((a, b) => b.rating - a.rating);
            break;
          case "a-z":
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "z-a":
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
          case "newest":
            filtered.reverse(); // Assuming original order is somewhat chronological or id-based
            break;
        }
      }

      return filtered;
    },
  },
  actions: {
    /**
     * Fetch all products from API (fallback to local data)
     */
    async fetchProducts(filters = {}) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await productsAPI.getAll(filters);
        this.products = data;
        this.isInitialized = true;
      } catch (error) {
        console.error("Failed to fetch products:", error);
        this.error = "Failed to load products. Please try again.";
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Fetch single product by ID
     */
    async fetchProductById(id) {
      this.isLoading = true;
      this.error = null;
      try {
        const product = await productsAPI.getById(id);
        if (product) {
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index > -1) {
            this.products[index] = product;
          } else {
            this.products.push(product);
          }
        }
        return product;
      } catch (error) {
        console.error("Failed to fetch product " + id + ":", error);
        this.error = "Failed to load product details.";
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Add product to cart
     */
    addToCart(product) {
      if (!product) return;
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({...product, quantity: 1});
      }
    },
    removeFromCart(productId) {
      if (!productId) return;
      const index = this.cart.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
    },
    updateQuantity(productId, quantity) {
      if (!productId) return;
      const item = this.cart.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        }
      }
    },
    clearCart() {
      this.cart = [];
    },

    /**
     * Add product to wishlist
     */
    addToWishlist(product) {
      if (!product) return;
      const exists = this.wishlist.some((item) => item.id === product.id);
      if (!exists) {
        this.wishlist.push(product);
      }
    },

    /**
     * Remove product from wishlist
     */
    removeFromWishlist(productId) {
      if (!productId) return;
      const index = this.wishlist.findIndex((item) => item.id === productId);
      if (index > -1) {
        this.wishlist.splice(index, 1);
      }
    },

    /**
     * Toggle wishlist
     */
    toggleWishlist(product) {
      if (this.isInWishlist(product.id)) {
        this.removeFromWishlist(product.id);
        return false;
      } else {
        this.addToWishlist(product);
        return true;
      }
    },

    /**
     * Clear wishlist
     */
    clearWishlist() {
      this.wishlist = [];
    },
  },

  // Enable persistence for cart and wishlist
  persist: {
    key: "kraoop-store",
    paths: ["cart", "wishlist"],
    storage: localStorage,
  },
});
