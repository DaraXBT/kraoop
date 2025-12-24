<template>
  <div class="min-h-screen w-full relative overflow-x-hidden">
    <!-- Dashed Grid Background -->
    <div
      class="absolute inset-0 z-0"
      style="
        background-image: linear-gradient(
            to right,
            #e7e5e4 1px,
            transparent 1px
          ),
          linear-gradient(to bottom, #e7e5e4 1px, transparent 1px);
        background-size: 20px 20px;
        -webkit-mask-image: linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          );
        mask-image: linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          );
        mask-composite: intersect;
        -webkit-mask-composite: source-in;
      "></div>

    <div class="relative z-10">
      <!-- Forgot Password Container -->
      <div class="flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
        <div class="w-full max-w-md">
          <!-- Success State -->
          <div
            v-if="emailSent"
            class="liquid-glass-payment-card p-8 sm:p-10 relative overflow-hidden">
            <div class="text-center">
              <!-- Success Icon -->
              <div
                class="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  class="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-3">
                Check Your Email
              </h2>
              <p class="text-gray-600 mb-6">
                We've sent password reset instructions to
                <span class="font-semibold text-gray-900">{{ email }}</span>
              </p>

              <div class="space-y-3">
                <router-link to="/login">
                  <LiquidButton variant="primary" size="lg" full-width>
                    Back to Login
                  </LiquidButton>
                </router-link>

                <button
                  @click="resetForm"
                  class="w-full text-sm text-gray-600 hover:text-[#F5A3B7] transition-colors font-medium">
                  Didn't receive the email? Try again
                </button>
              </div>
            </div>
          </div>

          <!-- Form State -->
          <div
            v-else
            class="liquid-glass-payment-card p-8 sm:p-10 relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-pink-100/20">
            <!-- Header with gradient -->
            <div
              class="relative px-4 py-6 -mx-8 -mt-8 sm:-mx-10 sm:-mt-10 mb-8 overflow-hidden group"
              style="
                background: linear-gradient(135deg, #f5a3b7 0%, #e392a6 50%, #d07b8f 100%);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              ">
              <!-- Subtle shine overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="text-center relative z-10">
                <div
                  class="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Forgot Password?
                </h1>
                <p class="text-white/90 text-sm">
                  No worries, we'll send you reset instructions
                </p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email Field -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="Enter your email"
                  class="liquid-input w-full px-4 py-3 text-sm"
                  :class="{'border-red-400': errors.email}" />
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                  {{ errors.email }}
                </p>
                <p class="mt-2 text-xs text-gray-500">
                  Enter the email address associated with your account
                </p>
              </div>

              <!-- Error Message -->
              <div
                v-if="resetError"
                class="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p class="text-sm text-red-600 flex items-center gap-2">
                  <svg
                    class="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd" />
                  </svg>
                  {{ resetError }}
                </p>
              </div>

              <!-- Submit Button -->
              <LiquidButton
                type="submit"
                variant="primary"
                size="lg"
                full-width
                :loading="isLoading"
                :disabled="isLoading">
                <span v-if="!isLoading">Send Reset Link</span>
                <span v-else>Sending...</span>
              </LiquidButton>

              <!-- Back to Login -->
              <router-link to="/login">
                <LiquidButton
                  type="button"
                  variant="ghost"
                  size="lg"
                  full-width>
                  <template #icon-left>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </template>
                  Back to Login
                </LiquidButton>
              </router-link>
            </form>
          </div>

          <!-- Back to Home -->
          <div class="mt-6 text-center">
            <router-link
              to="/"
              class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#F5A3B7] transition-colors font-medium">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useAuth} from "../../composables/useAuth";
import {useToast} from "../../composables/useToast";
import LiquidButton from "../../components/LiquidButton.vue";

const {requestPasswordReset, isLoading} = useAuth();
const {success, error: showError} = useToast();

// Form fields
const email = ref("");
const emailSent = ref(false);

// Error handling
const errors = ref({});
const resetError = ref("");

// Validate form
function validateForm() {
  errors.value = {};
  let isValid = true;

  if (!email.value) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Please enter a valid email";
    isValid = false;
  }

  return isValid;
}

// Handle submit
async function handleSubmit() {
  resetError.value = "";

  if (!validateForm()) {
    return;
  }

  const result = await requestPasswordReset(email.value);

  if (result.success) {
    emailSent.value = true;
    success("Password reset email sent!");
  } else {
    resetError.value =
      result.error || "Failed to send reset email. Please try again.";
    showError("Failed to send reset email.");
  }
}

// Reset form
function resetForm() {
  emailSent.value = false;
  email.value = "";
  errors.value = {};
  resetError.value = "";
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
