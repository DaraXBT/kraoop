import {defineStore} from "pinia";
import {productsAPI} from "../services/api";

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [
      {
        id: 1,
        promotion: "-75%",
        image:
          "https://wmg.stylekorean.com/BR000189/cosSM13-SC_3_thumb.jpg?v20240210",
        title: "All-Around Safe Block Essence Sun SPF45+",
        product: "All Around Safe Block Sun Milk SPF50+/PA+++",
        rating: 4.5,
        ratingCount: 156,
        price: "$99.00",
        originalPrice: "$396.00",
        category: "Sunscreen",
        brand: "COSRX",
        skinType: ["All Skin", "Sensitive"],
        tags: ["SPF", "Daily Care", "Lightweight"],
        inStock: true,
        featured: true,
      },
      {
        id: 2,
        promotion: "-25%",
        image:
          "https://wmg.stylekorean.com/BR000189/cosS21-AL_thumb.jpg?v20240210",
        title: "Hydrating Cleansing Balm",
        product: "Deep Clean Cleansing Balm",
        rating: 4.8,
        ratingCount: 203,
        price: "$32.00",
        originalPrice: "$42.67",
        category: "Cleansing Balm",
        brand: "Banila Co",
        skinType: ["Dry", "Normal"],
        tags: ["Double Cleanse", "Makeup Remover", "Hydrating"],
        inStock: true,
        featured: true,
      },
      {
        id: 3,
        promotion: "-25%",
        image:
          "https://wmg.stylekorean.com/BR000208/7KCc66qp7JeG7J2M2_thumb.jpg?v20240210",
        title: "Vitamin C Brightening Serum",
        product: "Pure Vitamin C Serum",
        rating: 4.7,
        ratingCount: 189,
        price: "$32.00",
        originalPrice: "$42.67",
        category: "Serum",
        brand: "Klairs",
        skinType: ["All Skin", "Dull"],
        tags: ["Brightening", "Anti-aging", "Vitamin C"],
        inStock: true,
        featured: false,
      },
      {
        id: 4,
        promotion: "-10%",
        image:
          "https://wmg.stylekorean.com/BR000456/HRS04-I_1_thumb.jpg?v20240210",
        title: "Hyaluronic Acid Toner",
        product: "Deep Hydration Toner",
        rating: 4.6,
        ratingCount: 142,
        price: "$32.00",
        originalPrice: "$35.56",
        category: "Toner",
        brand: "Hada Labo",
        skinType: ["Dry", "Normal", "Combination"],
        tags: ["Hydrating", "Plumping", "Hyaluronic Acid"],
        inStock: true,
        featured: false,
      },
      {
        id: 5,
        promotion: "-50%",
        image: "https://wmg.stylekorean.com/HMC01-NewBalmR_thumb.jpg?v20240210",
        title: "Gentle Cleansing Oil",
        product: "Ultra Light Cleansing Oil",
        rating: 4.9,
        ratingCount: 287,
        price: "$32.00",
        originalPrice: "$64.00",
        category: "Oil Cleanser",
        brand: "DHC",
        skinType: ["All Skin", "Sensitive"],
        tags: ["Double Cleanse", "Gentle", "Makeup Remover"],
        inStock: true,
        featured: true,
      },
      {
        id: 6,
        promotion: "-10%",
        image:
          "https://wmg.stylekorean.com/BR000389/7IKs7J207KaI33_thumb.jpg?v20240210",
        title: "Niacinamide Essence",
        product: "Galactomyces Niacin Essence",
        rating: 4.7,
        ratingCount: 178,
        price: "$32.00",
        originalPrice: "$35.56",
        category: "Essence",
        brand: "COSRX",
        skinType: ["All Skin", "Oily"],
        tags: ["Brightening", "Pore Care", "Niacinamide"],
        inStock: true,
        featured: false,
      },
      {
        id: 7,
        promotion: "-75%",
        image:
          "https://wmg.stylekorean.com/BR000537/AXS04-SD_thumb_1.jpg?v20240210",
        title: "Snail Mucin Cream",
        product: "Advanced Snail 92 All In One Cream",
        rating: 4.8,
        ratingCount: 312,
        price: "$32.00",
        originalPrice: "$128.00",
        category: "Moisturizer",
        brand: "COSRX",
        skinType: ["All Skin", "Dry"],
        tags: ["Hydrating", "Repairing", "Snail Mucin"],
        inStock: true,
        featured: true,
      },
      {
        id: 8,
        promotion: "-25%",
        image: "https://wmg.stylekorean.com/JSMP05-PK_thumb.jpg?v20240210",
        title: "AHA/BHA Exfoliating Toner",
        product: "Chemical Exfoliating Toner",
        rating: 4.5,
        ratingCount: 165,
        price: "$32.00",
        originalPrice: "$42.67",
        category: "Exfoliator",
        brand: "Some By Mi",
        skinType: ["Oily", "Combination", "Acne-Prone"],
        tags: ["Exfoliating", "Pore Care", "AHA", "BHA"],
        inStock: true,
        featured: false,
      },
      {
        id: 9,
        promotion: "",
        image:
          "https://wmg.stylekorean.com/BR000296/HLSS01-SR_thumb_1.jpg?v20240210",
        title: "Green Tea Cleansing Foam",
        product: "Refreshing Foam Cleanser",
        rating: 4.4,
        ratingCount: 98,
        price: "$32.00",
        originalPrice: "$32.00",
        category: "Foam Cleanser",
        brand: "Innisfree",
        skinType: ["Normal", "Combination", "Oily"],
        tags: ["Cleansing", "Green Tea", "Fresh"],
        inStock: true,
        featured: false,
      },
      {
        id: 10,
        promotion: "-25%",
        image: "https://wmg.stylekorean.com/RNCM17-LM06_thumb.jpg?v20240210",
        title: "Retinol Eye Cream",
        product: "Advanced Retinol Eye Serum",
        rating: 4.6,
        ratingCount: 134,
        price: "$32.00",
        originalPrice: "$42.67",
        category: "Eye Care",
        brand: "The Ordinary",
        skinType: ["All Skin"],
        tags: ["Anti-aging", "Retinol", "Eye Care"],
        inStock: true,
        featured: false,
      },
      {
        id: 11,
        promotion: "-10%",
        image:
          "https://wmg.stylekorean.com/BR000389/JSMS01-4SET_thumb.jpg?v20240210",
        title: "Sheet Mask Set",
        product: "Essential Mask Sheet Collection",
        rating: 4.7,
        ratingCount: 221,
        price: "$32.00",
        originalPrice: "$35.56",
        category: "Face Mask",
        brand: "Mediheal",
        skinType: ["All Skin"],
        tags: ["Hydrating", "Variety Pack", "Soothing"],
        inStock: true,
        featured: true,
      },
      {
        id: 12,
        promotion: "-75%",
        image:
          "https://wmg.stylekorean.com/BR000627/7Yag7L2U67O07JWE7J207KCk7YCs66a8_thumb.jpg?v20240210",
        title: "Cica Repair Cream",
        product: "Centella Asiatica Recovery Cream",
        rating: 4.9,
        ratingCount: 345,
        price: "$32.00",
        originalPrice: "$128.00",
        category: "Moisturizer",
        brand: "Dr. Jart+",
        skinType: ["Sensitive", "Irritated", "All Skin"],
        tags: ["Soothing", "Repairing", "Centella"],
        inStock: true,
        featured: true,
      },
    ],
    cart: [],
    wishlist: [],
    isInitialized: true, // Set to true since products are hardcoded
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
          return (
            price >= filters.priceRange.min && price <= filters.priceRange.max
          );
        });
      }

      if (filters.rating) {
        filtered = filtered.filter((p) => p.rating >= filters.rating);
      }

      if (filters.inStock) {
        filtered = filtered.filter((p) => p.inStock);
      }

      if (filters.onSale) {
        filtered = filtered.filter((p) => p.promotion && p.promotion !== "");
      }

      if (filters.featured) {
        filtered = filtered.filter((p) => p.featured);
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
        // Try to fetch from API
        const data = await productsAPI.getAll(filters);
        this.products = data.products || data;
        this.isInitialized = true;
      } catch (error) {
        console.warn(
          "Failed to fetch products from API, using local data:",
          error
        );
        // Keep using hardcoded products as fallback
        this.isInitialized = true;
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
        // Update product in state if exists
        const index = this.products.findIndex((p) => p.id === id);
        if (index > -1) {
          this.products[index] = product;
        }
        return product;
      } catch (error) {
        console.warn(`Failed to fetch product ${id}, using local data:`, error);
        return this.products.find((p) => p.id === parseInt(id));
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
