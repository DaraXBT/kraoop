import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

/**
 * Framer Motion-inspired page transition composable
 * Provides animation utilities and intersection observer for scroll-triggered animations
 */
export function usePageTransition(options = {}) {
  const {
    staggerDelay = 100, // milliseconds between each stagger item
    threshold = 0.1, // intersection observer threshold
    rootMargin = '0px 0px -50px 0px', // trigger animations slightly before element is in view
  } = options;

  const isPageReady = ref(false);
  const animatedElements = ref(new Set());
  let observer = null;

  /**
   * Calculate stagger delay for an item
   * @param {number} index - Item index
   * @param {number} customDelay - Custom delay override
   * @returns {string} CSS delay value
   */
  const getStaggerDelay = (index, customDelay = staggerDelay) => {
    return `${index * customDelay}ms`;
  };

  /**
   * Get animation class based on index for staggered animations
   * @param {number} index - Item index
   * @returns {string} Animation class name
   */
  const getStaggerClass = (index) => {
    return `animate-fade-in-up stagger-${Math.min(index, 10)}`;
  };

  /**
   * Initialize intersection observer for scroll-triggered animations
   */
  const initIntersectionObserver = () => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedElements.value.has(entry.target)) {
            entry.target.classList.add('in-view');
            animatedElements.value.add(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all elements with [data-animate] attribute
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));
  };

  /**
   * Cleanup intersection observer
   */
  const cleanupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    animatedElements.value.clear();
  };

  /**
   * Trigger page ready state after a delay
   * @param {number} delay - Delay in milliseconds
   */
  const triggerPageReady = (delay = 50) => {
    setTimeout(() => {
      isPageReady.value = true;
      // Initialize intersection observer after page is ready
      setTimeout(initIntersectionObserver, 100);
    }, delay);
  };

  /**
   * Reset page state (useful for route changes)
   */
  const resetPageState = () => {
    isPageReady.value = false;
    cleanupObserver();
  };

  // Lifecycle hooks
  onMounted(() => {
    triggerPageReady();
  });

  onBeforeUnmount(() => {
    cleanupObserver();
  });

  // Computed styles for page container
  const pageContainerClass = computed(() => ({
    'page-enter': !isPageReady.value,
    'page-ready': isPageReady.value,
  }));

  return {
    isPageReady,
    getStaggerDelay,
    getStaggerClass,
    pageContainerClass,
    triggerPageReady,
    resetPageState,
    initIntersectionObserver,
    cleanupObserver,
  };
}

/**
 * Simple stagger animation helper for lists
 * @param {number} count - Number of items
 * @param {number} delay - Delay between items in ms
 * @returns {Array} Array of style objects with animation delays
 */
export function useStaggerAnimation(count, delay = 100) {
  return Array.from({ length: count }, (_, index) => ({
    animationDelay: `${index * delay}ms`,
  }));
}

/**
 * Get Framer Motion-inspired spring animation config
 * @param {string} type - Animation type: 'gentle', 'bouncy', 'quick'
 * @returns {Object} Animation configuration
 */
export function getSpringConfig(type = 'gentle') {
  const configs = {
    gentle: {
      duration: '600ms',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Framer Motion default spring
    },
    bouncy: {
      duration: '800ms',
      easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // More bounce
    },
    quick: {
      duration: '400ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Quick and smooth
    },
    smooth: {
      duration: '500ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design easing
    },
  };

  return configs[type] || configs.gentle;
}
