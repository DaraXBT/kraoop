<template>
  <div
    v-if="showBanner"
    class="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-800/50 px-6 py-2.5 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 sm:px-3.5 sm:before:flex-1">
    <div
      class="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true">
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#F5A3B7] to-[#EC4899] opacity-40"
        style="
          clip-path: polygon(
            74.8% 41.9%,
            97.2% 73.2%,
            100% 34.9%,
            92.5% 0.4%,
            87.5% 0%,
            75% 28.6%,
            58.5% 54.6%,
            50.1% 56.8%,
            46.9% 44%,
            48.3% 17.4%,
            24.7% 53.9%,
            0% 27.9%,
            11.9% 74.2%,
            24.9% 54.1%,
            68.6% 100%,
            74.8% 41.9%
          );
        "></div>
    </div>
    <div
      class="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      aria-hidden="true">
      <div
        class="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#F5A3B7] to-[#EC4899] opacity-40"
        style="
          clip-path: polygon(
            74.8% 41.9%,
            97.2% 73.2%,
            100% 34.9%,
            92.5% 0.4%,
            87.5% 0%,
            75% 28.6%,
            58.5% 54.6%,
            50.1% 56.8%,
            46.9% 44%,
            48.3% 17.4%,
            24.7% 53.9%,
            0% 27.9%,
            11.9% 74.2%,
            24.9% 54.1%,
            68.6% 100%,
            74.8% 41.9%
          );
        "></div>
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <p class="text-sm/6 text-gray-100">
        <strong class="font-semibold">KRAOOP Beauty Sale 2025</strong
        ><svg
          viewBox="0 0 2 2"
          class="mx-2 inline size-0.5 fill-current"
          aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
        Get 25% off all skincare products – Limited time offer ending soon!
      </p>
      <LiquidButton
        variant="ghost"
        size="sm"
        tag="a"
        href="/products"
        class="flex-none text-sm">
        Shop now
        <template v-slot:icon-right>
          <span aria-hidden="true">&rarr;</span>
        </template>
      </LiquidButton>
    </div>
    <div class="flex flex-1 justify-end">
      <button
        type="button"
        class="-m-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        @click="dismissBanner">
        <span class="sr-only">Dismiss</span>
        <XMarkIcon class="size-5 text-gray-100" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {XMarkIcon} from "@heroicons/vue/20/solid";
import LiquidButton from "./LiquidButton.vue";

// Banner visibility state
const showBanner = ref(true);

// Banner dismiss function
const dismissBanner = () => {
  showBanner.value = false;
};
</script>
