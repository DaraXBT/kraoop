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
      <!-- Signup Container -->
      <div class="flex items-center justify-center px-4 py-12 sm:py-16 lg:py-20">
        <div class="w-full max-w-md">
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
                  Create Account
                </h1>
                <p class="text-white/90 text-sm">
                  Join Kraoop Beauty today
                </p>
              </div>
            </div>

            <!-- Signup Form -->
            <form @submit.prevent="handleSignup" class="space-y-5 p-8 sm:p-10">
              <!-- Full Name Field -->
              <div>
                <label
                  for="fullName"
                  class="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  v-model="fullName"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder="John Doe"
                  class="liquid-input w-full px-4 py-3 text-sm"
                  :class="{'border-red-400': errors.fullName}" />
                <p v-if="errors.fullName" class="mt-1 text-xs text-red-500">
                  {{ errors.fullName }}
                </p>
              </div>

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
                  Password
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
                  Confirm Password
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

              <!-- Terms & Conditions -->
              <div>
                <label class="flex items-center cursor-pointer group">
                  <input
                    v-model="acceptTerms"
                    type="checkbox"
                    class="liquid-checkbox flex-shrink-0"
                    :class="{'border-red-400': errors.acceptTerms}" />
                  <span
                    class="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    I agree to the
                    <a
                      href="#"
                      class="text-[#F5A3B7] hover:text-[#E392A6] font-semibold">
                      Terms & Conditions
                    </a>
                    and
                    <a
                      href="#"
                      class="text-[#F5A3B7] hover:text-[#E392A6] font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <p v-if="errors.acceptTerms" class="mt-1 text-xs text-red-500">
                  {{ errors.acceptTerms }}
                </p>
              </div>

              <!-- Error Message -->
              <div
                v-if="signupError"
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
                  {{ signupError }}
                </p>
              </div>

              <!-- Signup Button -->
              <div class="py-2">
                <LiquidButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  full-width
                  :loading="isLoading"
                  :disabled="isLoading">
                  <span v-if="!isLoading">Create Account</span>
                  <span v-else>Creating account...</span>
                </LiquidButton>
              </div>

              <!-- Divider -->
              <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-4 bg-white/80 text-gray-500 font-medium">
                    Already have an account?
                  </span>
                </div>
              </div>

              <!-- Login Link -->
              <div class="py-2">
                <router-link to="/login">
                  <LiquidButton
                    type="button"
                    variant="secondary"
                    size="lg"
                    full-width>
                    Sign In
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
import {useRouter} from "vue-router";
import {useAuth} from "../../composables/useAuth";
import {useToast} from "../../composables/useToast";
import LiquidButton from "../../components/LiquidButton.vue";

const router = useRouter();
const {register, isLoading} = useAuth();
const {success, error: showError} = useToast();

// Form fields
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptTerms = ref(false);
const showPassword = ref(false);

// Error handling
const errors = ref({});
const signupError = ref("");

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

  if (!fullName.value.trim()) {
    errors.value.fullName = "Full name is required";
    isValid = false;
  } else if (fullName.value.trim().length < 2) {
    errors.value.fullName = "Name must be at least 2 characters";
    isValid = false;
  }

  if (!email.value) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Please enter a valid email";
    isValid = false;
  }

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

  if (!acceptTerms.value) {
    errors.value.acceptTerms = "You must accept the terms and conditions";
    isValid = false;
  }

  return isValid;
}

// Handle signup
async function handleSignup() {
  signupError.value = "";

  if (!validateForm()) {
    return;
  }

  const userData = {
    name: fullName.value.trim(),
    email: email.value,
    password: password.value,
  };

  const result = await register(userData);

  if (result.success) {
    success("Account created successfully! Welcome to Kraoop Beauty.");
    router.push("/");
  } else {
    signupError.value = result.error || "Failed to create account";
    showError("Signup failed. Please try again.");
  }
}
</script>

<style scoped>
/* Additional styles if needed */
</style>
