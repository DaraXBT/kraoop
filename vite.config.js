import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  // Build optimizations
  build: {
    // Target modern browsers for smaller bundles
    target: 'esnext',
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 600,

    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Manual chunk splitting for better caching
        manualChunks(id) {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
              return 'vue-vendor';
            }
            return 'vendor';
          }
          // UI components chunk
          if (id.includes('/components/LiquidButton') || 
              id.includes('/components/AdvancedLiquidButton') ||
              id.includes('/components/NavBarComponent') ||
              id.includes('/components/FooterComponent')) {
            return 'ui-components';
          }
          // Product components chunk
          if (id.includes('/components/CartComponent') ||
              id.includes('/components/SearchBar') ||
              id.includes('/components/ModernFilterSidebar')) {
            return 'product-components';
          }
        },
        // Asset file naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          let extType = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            extType = 'img';
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Source maps (disable in production for smaller builds)
    sourcemap: false,

    // Report compressed size
    reportCompressedSize: true,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/head'],
    exclude: [],
  },

  // Server options for development
  server: {
    hmr: {
      overlay: true,
    },
  },

  // Preview server options
  preview: {
    port: 4173,
  },
})
