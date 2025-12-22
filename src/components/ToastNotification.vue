<script setup>
import {ref, watch, onMounted} from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success", // success, error, info, warning
  },
  duration: {
    type: Number,
    default: 3000,
  },
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const isVisible = ref(props.show);

watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal && props.duration > 0) {
      setTimeout(() => {
        closeToast();
      }, props.duration);
    }
  }
);

const closeToast = () => {
  isVisible.value = false;
  emit("close");
};

const getTypeStyles = () => {
  const styles = {
    success: {
      bg: "glass-card-strong",
      border: "border-green-400/50",
      text: "text-green-800",
      icon: "text-green-500",
      glow: "shadow-green-500/20",
    },
    error: {
      bg: "glass-card-strong",
      border: "border-red-400/50",
      text: "text-red-800",
      icon: "text-red-500",
      glow: "shadow-red-500/20",
    },
    warning: {
      bg: "glass-card-strong",
      border: "border-yellow-400/50",
      text: "text-yellow-800",
      icon: "text-yellow-500",
      glow: "shadow-yellow-500/20",
    },
    info: {
      bg: "glass-card-strong",
      border: "border-blue-400/50",
      text: "text-blue-800",
      icon: "text-blue-500",
      glow: "shadow-blue-500/20",
    },
  };
  return styles[props.type] || styles.success;
};

const getIcon = () => {
  const icons = {
    success: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    error: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />`,
    warning: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`,
    info: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`,
  };
  return icons[props.type] || icons.success;
};
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-4"
    enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2">
    <div
      v-if="isVisible"
      :class="[
        getTypeStyles().bg,
        getTypeStyles().border,
        getTypeStyles().glow,
        'fixed top-4 right-4 z-[100] max-w-sm w-full shadow-glass-lg rounded-3xl border-l-4 p-5 sm:p-6 backdrop-blur-xl animate-slide-up',
      ]"
      role="alert">
      <div class="flex items-start gap-4">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <div class="p-2 rounded-xl bg-white/50 backdrop-blur-sm">
            <svg
              :class="[getTypeStyles().icon, 'w-6 h-6']"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              v-html="getIcon()"></svg>
          </div>
        </div>

        <!-- Message -->
        <div class="flex-1 min-w-0">
          <p
            :class="[
              getTypeStyles().text,
              'text-sm sm:text-base font-bold leading-relaxed',
            ]">
            {{ message }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          @click="closeToast"
          :class="[
            getTypeStyles().text,
            'flex-shrink-0 hover:scale-110 active:scale-95 transition-smooth p-1 rounded-lg hover:bg-white/30',
          ]"
          aria-label="Close">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2.5">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>
