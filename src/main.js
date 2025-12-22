import {createApp} from "vue";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import {createHead} from "@vueuse/head";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";

// Error handler for global errors
const errorHandler = (err, instance, info) => {
  console.error("Global error:", err, info);
  // Prevent white screen by catching errors
};

const app = createApp(App);
const pinia = createPinia();
const head = createHead();

// Add persistence plugin to Pinia
pinia.use(piniaPluginPersistedstate);

// Set up global error handler
app.config.errorHandler = errorHandler;

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

app.use(pinia);
app.use(router);
app.use(head);

// Wait for router to be ready before mounting
router
  .isReady()
  .then(() => {
    app.mount("#app");
  })
  .catch((err) => {
    console.error("Router initialization error:", err);
    // Fallback mount
    app.mount("#app");
  });
