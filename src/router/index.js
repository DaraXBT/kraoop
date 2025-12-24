import {createRouter, createWebHistory} from "vue-router";
import {useAuth} from "../composables/useAuth";
import {ref, nextTick} from "vue";

// Global loading state for route transitions
export const isNavigating = ref(false);
let navigationStartTime = 0;
const MIN_LOADING_TIME = 150; // Minimum time to show loading (prevents flash)

// Lazy load pages for better performance with loading delay
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
const LiquidButtonComparison = () =>
  import("../views/LiquidButtonComparison.vue");
const ButtonSizeTest = () => import("../views/ButtonSizeTest.vue");

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
    {
      path: "/liquid-comparison",
      name: "liquid-comparison",
      component: LiquidButtonComparison,
      meta: {
        title: "Liquid Button Comparison - Kraoop Beauty",
        description:
          "Compare original and advanced liquid glass button implementations",
      },
    },
    {
      path: "/button-size-test",
      name: "button-size-test",
      component: ButtonSizeTest,
      meta: {
        title: "Button Size Test - Kraoop Beauty",
        description:
          "Test consistency between LiquidButton and AdvancedLiquidButton sizing",
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
router.beforeEach(async (to, from, next) => {
  // Set loading state when navigation starts
  isNavigating.value = true;
  navigationStartTime = Date.now();

  // Add page title
  document.title = to.meta.title || "Kraoop Beauty - Premium Korean Skincare";

  // Clear any lingering loading states
  document.body.classList.remove("loading");

  // Pre-load the component before navigation
  try {
    // Find the matched route component
    const matchedRoute = to.matched[to.matched.length - 1];
    if (matchedRoute && matchedRoute.components) {
      const component = matchedRoute.components.default;
      // If it's a function (lazy loaded), resolve it now
      if (typeof component === "function") {
        await component();
      }
    }
  } catch (error) {
    console.warn("Component preload warning:", error);
  }

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
  isNavigating.value = false; // Clear loading state on error

  // Reload the page if there's a critical navigation error
  if (
    error.message.includes("Failed to fetch") ||
    error.message.includes("Loading chunk") ||
    error.message.includes("Importing a module script failed")
  ) {
    // Show user-friendly message before reload
    console.warn("Reloading page due to loading error...");
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 100);
  }
});

// After each navigation, ensure page is ready
router.afterEach(async (to, from) => {
  // Calculate elapsed time since navigation started
  const elapsedTime = Date.now() - navigationStartTime;
  const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

  // Wait for remaining time to prevent loading flash
  if (remainingTime > 0) {
    await new Promise((resolve) => setTimeout(resolve, remainingTime));
  }

  // Wait for multiple ticks to ensure component is fully mounted and rendered
  await nextTick();
  await nextTick(); // Double tick for deep reactivity

  // Additional delay to ensure DOM is fully painted
  // This is crucial for lazy-loaded components on first load
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Final check - wait for images and resources
  if (document.readyState !== "complete") {
    await new Promise((resolve) => {
      window.addEventListener("load", resolve, {once: true});
      // Timeout after 1 second max
      setTimeout(resolve, 1000);
    });
  }

  // Clear loading state
  isNavigating.value = false;

  // Force a reflow to ensure all styles are applied
  document.body.offsetHeight;
});

export default router;
