import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable for lazy loading images with IntersectionObserver
 * Improves initial page load performance by deferring below-fold images
 */
export function useLazyImage(imageUrl, options = {}) {
  const isVisible = ref(false);
  const imageRef = ref(null);
  const hasLoaded = ref(false);

  const defaultOptions = {
    root: null,
    rootMargin: '50px', // Start loading 50px before entering viewport
    threshold: 0.01,
    ...options,
  };

  let observer = null;

  onMounted(() => {
    if (!imageRef.value) return;

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded.value) {
            isVisible.value = true;
            hasLoaded.value = true;
            // Disconnect after loading to save resources
            if (observer && imageRef.value) {
              observer.unobserve(imageRef.value);
            }
          }
        });
      }, defaultOptions);

      observer.observe(imageRef.value);
    } else {
      // Fallback for browsers without IntersectionObserver
      isVisible.value = true;
      hasLoaded.value = true;
    }
  });

  onUnmounted(() => {
    if (observer && imageRef.value) {
      observer.unobserve(imageRef.value);
      observer.disconnect();
    }
  });

  return {
    imageRef,
    isVisible,
    hasLoaded,
    src: isVisible.value ? imageUrl : null,
  };
}

/**
 * Prefetch critical images for faster perceived performance
 */
export function prefetchImages(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Debounce function for performance optimization
 */
export function debounce(fn, delay = 300) {
  let timeoutId = null;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
