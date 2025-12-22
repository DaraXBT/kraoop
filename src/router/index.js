import {createRouter, createWebHistory} from "vue-router";
import {useAuth} from "../composables/useAuth";

// Lazy load pages for better performance
const HomePage = () => import("../views/HomePage.vue");
const ProductPage = () => import("../views/ProductPage.vue");
const ProductCategory = () => import("../views/ProductCategory.vue");
const ProductDetail = () => import("../views/ProductDetail.vue");
const BestSelling = () => import("../views/BestSelling.vue");
const Collection = () => import("../views/Collection.vue");
const Payment = () => import("../views/Payment.vue");
const AboutUs = () => import("../views/AboutUs.vue");
const Account = () => import("../views/Account.vue");
const WishlistPage = () => import("../views/WishlistPage.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "Kraoop Beauty - Premium Korean Skincare",
        description: "Discover the best Korean skincare products",
      },
    },
    {
      path: "/product",
      name: "product",
      component: ProductPage,
      meta: {
        title: "Shop All Products - Kraoop Beauty",
      },
    },
    {
      path: "/category",
      name: "category",
      component: ProductCategory,
      meta: {
        title: "Categories - Kraoop Beauty",
      },
    },
    {
      path: "/detail/:id?",
      name: "detail",
      component: ProductDetail,
      meta: {
        title: "Product Details - Kraoop Beauty",
      },
    },
    {
      path: "/best-selling",
      name: "best-selling",
      component: BestSelling,
      meta: {
        title: "Best Selling Products - Kraoop Beauty",
      },
    },
    {
      path: "/collection",
      name: "collection",
      component: Collection,
      meta: {
        title: "Collections - Kraoop Beauty",
      },
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment,
      meta: {
        title: "Checkout - Kraoop Beauty",
        requiresAuth: false, // Set to true when auth is required
      },
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUs,
      meta: {
        title: "About Us - Kraoop Beauty",
      },
    },
    {
      path: "/account",
      name: "account",
      component: Account,
      meta: {
        title: "My Account - Kraoop Beauty",
        requiresAuth: false, // Set to true when auth is implemented
      },
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishlistPage,
      meta: {
        title: "My Wishlist - Kraoop Beauty",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Restore saved scroll position (browser back/forward)
    if (savedPosition) {
      return {
        ...savedPosition,
        behavior: "smooth",
      };
    }
    // Scroll to hash anchor with offset for fixed header
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        top: 80, // Offset for fixed navbar
      };
    }
    // Default: scroll to top smoothly
    return {top: 0, behavior: "smooth"};
  },
});

// Navigation guard for page transitions
router.beforeEach((to, from, next) => {
  // Add page title
  document.title = to.meta.title || "Kraoop Beauty - Premium Korean Skincare";

  // Clear any lingering loading states
  document.body.classList.remove("loading");

  // Check authentication
  if (to.meta.requiresAuth) {
    const {isAuthenticated} = useAuth();
    if (!isAuthenticated.value) {
      // Redirect to home or login page
      console.warn("Authentication required for", to.path);
      // TODO: Redirect to login page when implemented
      // next({name: 'login', query: {redirect: to.fullPath}});
      // For now, allow access
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

// Global error handler for navigation failures
router.onError((error) => {
  console.error("Router error:", error);
  // Reload the page if there's a critical navigation error
  if (
    error.message.includes("Failed to fetch") ||
    error.message.includes("Loading chunk")
  ) {
    window.location.href = window.location.href;
  }
});

// After each navigation, ensure page is ready
router.afterEach((to, from) => {
  // Small delay to ensure DOM is ready
  setTimeout(() => {
    // Force a reflow to ensure all styles are applied
    document.body.offsetHeight;
  }, 0);
});

export default router;
