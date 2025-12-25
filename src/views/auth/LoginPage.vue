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

    <div class="relative z-10 min-h-screen flex items-center justify-center">
      <!-- Login Container -->
      <div class="w-full px-4 py-12 sm:py-16 lg:py-20">
        <div class="w-full max-w-md mx-auto">
          <!-- Liquid Glass Card -->
          <div
            class="liquid-glass-payment-card relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-pink-100/20">
            <!-- Header with gradient -->
            <div
              class="relative px-4 py-6 sm:px-6 overflow-hidden group"
              style="
                background: linear-gradient(135deg, #f5a3b7 0%, #e392a6 50%, #d07b8f 100%);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              ">
              <!-- Subtle shine overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div class="text-center relative z-10">
                <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {{ $t('auth.welcome_back') }}
                </h1>
                <p class="text-white/90 text-sm">
                  {{ $t('auth.signin_to_account') }}
                </p>
              </div>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-6 p-8 sm:p-10">
              <!-- Email Field -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  {{ $t('auth.email') }}
                </label>
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="you@example.com"
                  class="liquid-input w-full px-4 py-3 text-sm"
                  :class="{'border-red-400': errors.email}" />
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">
                  {{ errors.email }}
                </p>
              </div>

              <!-- Password Field -->
              <div>
                <label
                  for="password"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  {{ $t('auth.password') }}
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    autocomplete="current-password"
                    :placeholder="$t('auth.enter_password')"
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
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer group">
                  <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="liquid-checkbox" />
                  <span
                    class="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {{ $t('auth.remember_me') }}
                  </span>
                </label>

                <router-link
                  to="/forgot-password"
                  class="text-sm font-semibold text-[#F5A3B7] hover:text-[#E392A6] transition-colors">
                  {{ $t('auth.forgot_password') }}
                </router-link>
              </div>

              <!-- Error Message -->
              <div
                v-if="loginError"
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
                  {{ loginError }}
                </p>
              </div>

              <!-- Login Button -->
              <div class="py-2">
                <LiquidButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  full-width
                  :loading="isLoading"
                  :disabled="isLoading">
                  <span v-if="!isLoading">{{ $t('auth.sign_in_btn') }}</span>
                  <span v-else>{{ $t('auth.signing_in') }}</span>
                </LiquidButton>
              </div>

              <!-- Divider -->
              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-white/80 text-gray-500 font-medium">
                    {{ $t('auth.no_account') }}
                  </span>
                </div>
              </div>

              <!-- Sign Up Link -->
              <div class="py-2">
                <router-link to="/signup">
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    size="lg"
                    full-width>
                    {{ $t('auth.create_account') }}
                  </LiquidButton>
                </router-link>
              </div>
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {{ $t('auth.back_to_home') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {useAuth} from "../../composables/useAuth";
import {useToast} from "../../composables/useToast";
import LiquidButton from "../../components/LiquidButton.vue";

const router = useRouter();
const { t } = useI18n();
const {login, isLoading} = useAuth();
const {success, error: showError} = useToast();

// Form fields
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);

// Error handling
const errors = ref({});
const loginError = ref("");

// Validate form
function validateForm() {
  errors.value = {};
  let isValid = true;

  if (!email.value) {
    errors.value.email = t('auth.email_required');
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = t('auth.email_invalid');
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = t('auth.password_required');
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = t('auth.password_min_length');
    isValid = false;
  }

  return isValid;
}

// Handle login
async function handleLogin() {
  loginError.value = "";

  if (!validateForm()) {
    return;
  }

  const result = await login(email.value, password.value);

  if (result.success) {
    success(t('auth.login_welcome'));

    // Redirect to intended page or home
    const redirect = router.currentRoute.value.query.redirect || "/";
    router.push(redirect);
  } else {
    loginError.value = result.error || "Invalid email or password";
    showError(t('auth.login_failed'));
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
