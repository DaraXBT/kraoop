/**
 * Performance monitoring utilities for production
 * Tracks Core Web Vitals and provides performance insights
 */

/**
 * Report Web Vitals (LCP, FID, CLS, FCP, TTFB)
 */
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          onPerfEntry({
            name: 'LCP',
            value: lastEntry.renderTime || lastEntry.loadTime,
            rating: getRating('LCP', lastEntry.renderTime || lastEntry.loadTime),
          });
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            onPerfEntry({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              rating: getRating('FID', entry.processingStart - entry.startTime),
            });
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Cumulative Layout Shift
      try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          onPerfEntry({
            name: 'CLS',
            value: clsValue,
            rating: getRating('CLS', clsValue),
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }
    }

    // Navigation Timing API metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0];

        // First Contentful Paint
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find((entry) => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          onPerfEntry({
            name: 'FCP',
            value: fcpEntry.startTime,
            rating: getRating('FCP', fcpEntry.startTime),
          });
        }

        // Time to First Byte
        onPerfEntry({
          name: 'TTFB',
          value: navigation.responseStart - navigation.requestStart,
          rating: getRating('TTFB', navigation.responseStart - navigation.requestStart),
        });
      }
    }
  }
}

/**
 * Get performance rating based on Web Vitals thresholds
 */
function getRating(metric, value) {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[metric];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Log performance metrics (development only)
 */
export function logPerformanceMetrics() {
  if (import.meta.env.DEV) {
    reportWebVitals((metric) => {
      console.log(`[Performance] ${metric.name}:`, {
        value: `${metric.value.toFixed(2)}ms`,
        rating: metric.rating,
      });
    });
  }
}

/**
 * Mark performance milestone
 */
export function markPerformance(name) {
  if ('performance' in window && 'mark' in performance) {
    performance.mark(name);
  }
}

/**
 * Measure performance between two marks
 */
export function measurePerformance(name, startMark, endMark) {
  if ('performance' in window && 'measure' in performance) {
    try {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      if (import.meta.env.DEV) {
        console.log(`[Performance Measure] ${name}: ${measure.duration.toFixed(2)}ms`);
      }
      return measure.duration;
    } catch (e) {
      console.warn(`Performance measure failed for ${name}:`, e);
    }
  }
  return 0;
}
