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
      <!-- Reset Password Container -->
      <div class="flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
        <div class="w-full max-w-md">
          <!-- Success State -->
          <div
            v-if="resetSuccess"
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 class="text-2xl font-bold text-gray-900 mb-3">
                Password Reset Successful!
              </h2>
              <p class="text-gray-600 mb-6">
                Your password has been successfully reset. You can now sign in
                with your new password.
              </p>

              <router-link to="/login">
                <LiquidButton variant="primary" size="lg" full-width>
                  Sign In
                </LiquidButton>
              </router-link>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Reset Password
                </h1>
                <p class="text-white/90 text-sm">
                  Enter your new password below
                </p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- New Password Field -->
              <div>
                <label
                  for="password"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  New Password
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="new-password"
                    placeholder="At least 8 characters"
                    class="liquid-input w-full px-4 py-3 pr-12 text-sm"
                    :class="{'border-red-400': errors.password}" />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                    <svg
                      v-if="!showPassword"
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <p v-if="errors.password" class="mt-1 text-xs text-red-500">
                  {{ errors.password }}
                </p>
                <!-- Password Strength Indicator -->
                <div v-if="password" class="mt-2">
                  <div class="flex gap-1 mb-1">
                    <div
                      v-for="i in 4"
                      :key="i"
                      class="h-1 flex-1 rounded-full transition-all"
                      :class="
                        i <= passwordStrength
                          ? passwordStrength === 1
                            ? 'bg-red-400'
                            : passwordStrength === 2
                            ? 'bg-orange-400'
                            : passwordStrength === 3
                            ? 'bg-yellow-400'
                            : 'bg-green-400'
                          : 'bg-gray-200'
                      "></div>
                  </div>
                  <p class="text-xs text-gray-600">
                    Password strength:
                    <span
                      :class="
                        passwordStrength === 1
                          ? 'text-red-500'
                          : passwordStrength === 2
                          ? 'text-orange-500'
                          : passwordStrength === 3
                          ? 'text-yellow-500'
                          : 'text-green-500'
                      ">
                      {{
                        passwordStrength === 1
                          ? "Weak"
                          : passwordStrength === 2
                          ? "Fair"
                          : passwordStrength === 3
                          ? "Good"
                          : "Strong"
                      }}
                    </span>
                  </p>
                </div>
              </div>

              <!-- Confirm Password Field -->
              <div>
                <label
                  for="confirmPassword"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="new-password"
                  placeholder="Re-enter your password"
                  class="liquid-input w-full px-4 py-3 text-sm"
                  :class="{'border-red-400': errors.confirmPassword}" />
                <p
                  v-if="errors.confirmPassword"
                  class="mt-1 text-xs text-red-500">
                  {{ errors.confirmPassword }}
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
                <span v-if="!isLoading">Reset Password</span>
                <span v-else>Resetting...</span>
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
import {ref, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAuth} from "../../composables/useAuth";
import {useToast} from "../../composables/useToast";
import LiquidButton from "../../components/LiquidButton.vue";

const route = useRoute();
const router = useRouter();
const {resetPassword, isLoading} = useAuth();
const {success, error: showError} = useToast();

// Get token from URL
const resetToken = route.params.token;

// Form fields
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const resetSuccess = ref(false);

// Error handling
const errors = ref({});
const resetError = ref("");

// Password strength calculator
const passwordStrength = computed(() => {
  const pass = password.value;
  if (!pass) return 0;

  let strength = 0;
  if (pass.length >= 8) strength++;
  if (pass.length >= 12) strength++;
  if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
  if (/\d/.test(pass)) strength++;
  if (/[^a-zA-Z\d]/.test(pass)) strength++;

  return Math.min(4, strength);
});

// Validate form
function validateForm() {
  errors.value = {};
  let isValid = true;

  if (!password.value) {
    errors.value.password = "Password is required";
    isValid = false;
  } else if (password.value.length < 8) {
    errors.value.password = "Password must be at least 8 characters";
    isValid = false;
  }

  if (!confirmPassword.value) {
    errors.value.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match";
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

  if (!resetToken) {
    resetError.value = "Invalid or missing reset token";
    showError("Invalid reset link");
    return;
  }

  const result = await resetPassword(resetToken, password.value);

  if (result.success) {
    resetSuccess.value = true;
    success("Password reset successful!");
  } else {
    resetError.value =
      result.error || "Failed to reset password. The link may have expired.";
    showError("Failed to reset password.");
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
