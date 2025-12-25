<script setup>
import {ref, computed} from "vue";
import {useI18n} from "vue-i18n";
import NavbarComponent from "../components/NavBarComponent.vue";
import LiquidButton from "../components/LiquidButton.vue";
import {useToast} from "../composables/useToast";

const {t} = useI18n();
const {success, info} = useToast();

// User data (in a real app, this would come from a store or API)
const user = ref({
  firstName: "Dara",
  lastName: "Veasna",
  email: "daraa.veasna@gmail.com",
  phone: "+855 12 345 678",
  dateJoined: "January 15, 2024",
  avatar: "https://avatars.githubusercontent.com/u/112950879?v=4",
});

// Active tab
const activeTab = ref("profile");

// Edit mode
const isEditing = ref(false);

// Form data
const formData = ref({...user.value});

// Order history
const orders = ref([
  {
    id: "#ORD-2024-001",
    date: "Dec 15, 2024",
    status: "Delivered",
    total: "$125.50",
    items: 3,
  },
  {
    id: "#ORD-2024-002",
    date: "Dec 10, 2024",
    status: "In Transit",
    total: "$89.00",
    items: 2,
  },
  {
    id: "#ORD-2024-003",
    date: "Nov 28, 2024",
    status: "Delivered",
    total: "$210.00",
    items: 5,
  },
]);

// Wishlist items
const wishlist = ref([
  {
    id: 1,
    name: "Green Tea Hydrating Serum",
    price: "$45.00",
    image:
      "https://wmg.stylekorean.com/BR000189/cosSM13-SC_3_thumb.jpg?v20240210",
    inStock: true,
  },
  {
    id: 2,
    name: "Cherry Blossom Face Mask",
    price: "$32.00",
    image:
      "https://wmg.stylekorean.com/BR000208/7KCc66qp7JeG7J2M2_thumb.jpg?v20240210",
    inStock: true,
  },
]);

// Saved addresses
const addresses = ref([
  {
    id: 1,
    type: "Home",
    name: "Dara Veasna",
    address: "123 Street Name, Phnom Penh, Cambodia",
    phone: "+855 12 345 678",
    isDefault: true,
  },
  {
    id: 2,
    type: "Office",
    name: "Dara Veasna",
    address: "456 Business District, Phnom Penh, Cambodia",
    phone: "+855 98 765 432",
    isDefault: false,
  },
]);

// Address editing state
const editingAddressId = ref(null);
const showAddressForm = ref(false);
const addressFormData = ref({
  type: "",
  name: "",
  address: "",
  phone: "",
});

// Password change state
const passwordData = ref({
  current: "",
  new: "",
  confirm: "",
});

// Notification preferences
const notifications = ref({
  orderEmails: true,
  promotional: true,
  sms: false,
});

const fullName = computed(
  () => `${user.value.firstName} ${user.value.lastName}`
);

const toggleEdit = () => {
  if (isEditing.value) {
    // Save changes
    user.value = {...formData.value};
    isEditing.value = false;
    success(t('account.profile.update_success'), 2500);
  } else {
    // Enter edit mode
    formData.value = {...user.value};
    isEditing.value = true;
    info(t('account.profile.edit_mode'), 2000);
  }
};

const cancelEdit = () => {
  formData.value = {...user.value};
  isEditing.value = false;
  info(t('account.profile.changes_discarded'), 2000);
};

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return {
        bg: "bg-gradient-to-r from-green-50 to-emerald-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: "✓",
        dot: "bg-green-500"
      };
    case "In Transit":
      return {
        bg: "bg-gradient-to-r from-blue-50 to-cyan-50",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: "🚚",
        dot: "bg-blue-500"
      };
    case "Processing":
      return {
        bg: "bg-gradient-to-r from-yellow-50 to-amber-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: "⏳",
        dot: "bg-yellow-500"
      };
    case "Cancelled":
      return {
        bg: "bg-gradient-to-r from-red-50 to-rose-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: "✕",
        dot: "bg-red-500"
      };
    default:
      return {
        bg: "bg-gradient-to-r from-gray-50 to-slate-50",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: "•",
        dot: "bg-gray-500"
      };
  }
};

const removeFromWishlist = (id) => {
  const item = wishlist.value.find((item) => item.id === id);
  wishlist.value = wishlist.value.filter((item) => item.id !== id);
  if (item) {
    info(`${item.name} ${t('account.wishlist.removed')}`, 2500);
  }
};

const setDefaultAddress = (id) => {
  addresses.value = addresses.value.map((addr) => ({
    ...addr,
    isDefault: addr.id === id,
  }));
  success(t('account.addresses.default_updated'), 2500);
};

const startEditAddress = (address) => {
  editingAddressId.value = address.id;
  addressFormData.value = { ...address };
};

const cancelEditAddress = () => {
  editingAddressId.value = null;
  addressFormData.value = {
    type: "",
    name: "",
    address: "",
    phone: "",
  };
};

const saveAddress = (id) => {
  const index = addresses.value.findIndex((addr) => addr.id === id);
  if (index !== -1) {
    addresses.value[index] = {
      ...addressFormData.value,
      id,
      isDefault: addresses.value[index].isDefault,
    };
    success(t('account.addresses.updated'), 2500);
  }
  cancelEditAddress();
};

const deleteAddress = (id) => {
  const address = addresses.value.find((addr) => addr.id === id);
  if (address && !address.isDefault) {
    addresses.value = addresses.value.filter((addr) => addr.id !== id);
    info(t('account.addresses.deleted'), 2000);
  } else if (address && address.isDefault) {
    info(t('account.addresses.cannot_delete'), 2500);
  }
};

const openAddressForm = () => {
  showAddressForm.value = true;
  addressFormData.value = {
    type: "Home",
    name: fullName.value,
    address: "",
    phone: user.value.phone,
  };
};

const closeAddressForm = () => {
  showAddressForm.value = false;
  addressFormData.value = {
    type: "",
    name: "",
    address: "",
    phone: "",
  };
};

const addNewAddress = () => {
  const newId = Math.max(...addresses.value.map((a) => a.id)) + 1;
  addresses.value.push({
    ...addressFormData.value,
    id: newId,
    isDefault: addresses.value.length === 0,
  });
  success(t('account.addresses.added'), 2500);
  closeAddressForm();
};

const updatePassword = () => {
  if (!passwordData.value.current || !passwordData.value.new || !passwordData.value.confirm) {
    info(t('account.settings.fill_fields'), 2500);
    return;
  }
  if (passwordData.value.new !== passwordData.value.confirm) {
    info(t('account.settings.password_mismatch'), 2500);
    return;
  }
  if (passwordData.value.new.length < 8) {
    info(t('account.settings.password_length'), 2500);
    return;
  }
  // In a real app, this would call an API
  success(t('account.settings.password_success'), 2500);
  passwordData.value = {
    current: "",
    new: "",
    confirm: "",
  };
};
</script>

<template>
  <div class="min-h-screen w-full relative">
    <!-- Dashed Grid -->
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
        background-position: 0 0, 0 0;
        mask-image: repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
            to bottom,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          );
        -webkit-mask-image: repeating-linear-gradient(
            to right,
            black 0px,
            black 3px,
            transparent 3px,
            transparent 8px
          ),
          repeating-linear-gradient(
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
      <!-- Navbar -->
      <NavbarComponent />

      <!-- Hero Section with iOS-inspired gradient -->
      <div
        class="w-full bg-gradient-to-r from-pink-50/60 via-purple-50/40 to-blue-50/50 py-12 sm:py-16 lg:py-20 px-4">
        <div class="w-full max-w-7xl mx-auto">
          <div class="flex flex-col sm:flex-row items-center gap-6">
            <!-- Avatar -->
            <div
              class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-[#F5A3B7] bg-opacity-30 flex items-center justify-center text-4xl sm:text-5xl font-bold text-[#F5A3B7]">
              {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
            </div>
            <div class="text-center sm:text-left">
              <h1
                class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#383838] mb-2">
                {{ t('account.welcome_back') }}
                <span class="text-[#F5A3B7]">{{ user.firstName }}</span>
              </h1>
              <p class="text-base sm:text-lg text-[#697586]">
                {{ t('account.member_since') }} {{ user.dateJoined }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div
        class="w-full max-w-7xl mx-auto py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <!-- Sidebar Navigation -->
          <div class="lg:col-span-1">
            <div
              class="rounded-xl p-2 sm:p-6 sticky top-20 sm:top-24 z-20 mb-6 lg:mb-0">
              <nav
                class="flex lg:flex-col gap-3 lg:gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide -mx-2 px-2 lg:mx-0 lg:px-0">
                <LiquidButton
                  @click="activeTab = 'profile'"
                  :variant="activeTab === 'profile' ? 'primary' : 'ghost'"
                  size="md"
                  :class="'w-auto lg:w-full justify-center lg:justify-start whitespace-nowrap flex-shrink-0'"
                  :active="activeTab === 'profile'">
                  <template #icon>
                    <svg
                      class="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </template>
                  {{ t('account.tabs.profile') }}
                </LiquidButton>

                <LiquidButton
                  @click="activeTab = 'orders'"
                  :variant="activeTab === 'orders' ? 'primary' : 'ghost'"
                  size="md"
                  :class="'w-auto lg:w-full justify-center lg:justify-start whitespace-nowrap flex-shrink-0'"
                  :active="activeTab === 'orders'">
                  <template #icon>
                    <svg
                      class="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </template>
                  {{ t('account.tabs.orders') }}
                </LiquidButton>

                <LiquidButton
                  @click="activeTab = 'wishlist'"
                  :variant="activeTab === 'wishlist' ? 'primary' : 'ghost'"
                  size="md"
                  :class="'w-auto lg:w-full justify-center lg:justify-start whitespace-nowrap flex-shrink-0'"
                  :active="activeTab === 'wishlist'">
                  <template #icon>
                    <svg
                      class="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </template>
                  {{ t('account.tabs.wishlist') }}
                </LiquidButton>

                <LiquidButton
                  @click="activeTab = 'addresses'"
                  :variant="activeTab === 'addresses' ? 'primary' : 'ghost'"
                  size="md"
                  :class="'w-auto lg:w-full justify-center lg:justify-start whitespace-nowrap flex-shrink-0'"
                  :active="activeTab === 'addresses'">
                  <template #icon>
                    <svg
                      class="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </template>
                  {{ t('account.tabs.addresses') }}
                </LiquidButton>

                <LiquidButton
                  @click="activeTab = 'settings'"
                  :variant="activeTab === 'settings' ? 'primary' : 'ghost'"
                  size="md"
                  :class="'w-auto lg:w-full justify-center lg:justify-start whitespace-nowrap flex-shrink-0'"
                  :active="activeTab === 'settings'">
                  <template #icon>
                    <svg
                      class="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </template>
                  {{ t('account.tabs.settings') }}
                </LiquidButton>

              </nav>
            </div>
          </div>

          <!-- Main Content Area -->
          <div class="lg:col-span-3">
            <!-- Profile Tab -->
            <div
              v-if="activeTab === 'profile'"
              class="bg-white rounded-xl p-6 sm:p-8">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                <h2 class="text-2xl sm:text-3xl font-bold text-[#383838]">
                  {{ t('account.profile.title') }}
                </h2>
                <LiquidButton
                  v-if="!isEditing"
                  @click="toggleEdit"
                  variant="primary"
                  size="md">
                  {{ t('account.profile.edit_profile') }}
                </LiquidButton>
              </div>

              <div class="space-y-6">
                <!-- First Name -->
                <div>
                  <label class="block text-sm font-medium text-[#383838] mb-2"
                    >{{ t('account.profile.first_name') }}</label
                  >
                  <input
                    v-if="isEditing"
                    v-model="formData.firstName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  <p
                    v-else
                    class="px-4 py-3 bg-gray-50 rounded-lg text-[#697586]">
                    {{ user.firstName }}
                  </p>
                </div>

                <!-- Last Name -->
                <div>
                  <label class="block text-sm font-medium text-[#383838] mb-2"
                    >{{ t('account.profile.last_name') }}</label
                  >
                  <input
                    v-if="isEditing"
                    v-model="formData.lastName"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  <p
                    v-else
                    class="px-4 py-3 bg-gray-50 rounded-lg text-[#697586]">
                    {{ user.lastName }}
                  </p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-[#383838] mb-2"
                    >{{ t('account.profile.email') }}</label
                  >
                  <input
                    v-if="isEditing"
                    v-model="formData.email"
                    type="email"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  <p
                    v-else
                    class="px-4 py-3 bg-gray-50 rounded-lg text-[#697586]">
                    {{ user.email }}
                  </p>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-medium text-[#383838] mb-2"
                    >{{ t('account.profile.phone') }}</label
                  >
                  <input
                    v-if="isEditing"
                    v-model="formData.phone"
                    type="tel"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  <p
                    v-else
                    class="px-4 py-3 bg-gray-50 rounded-lg text-[#697586]">
                    {{ user.phone }}
                  </p>
                </div>

                <!-- Action Buttons -->
                <div v-if="isEditing" class="flex gap-4 pt-4">
                  <LiquidButton
                    @click="toggleEdit"
                    variant="primary"
                    size="lg"
                    :class="'flex-1'">
                    {{ t('account.profile.save_changes') }}
                  </LiquidButton>
                  <LiquidButton
                    @click="cancelEdit"
                    variant="secondary"
                    size="lg"
                    :class="'flex-1'">
                    {{ t('account.profile.cancel') }}
                  </LiquidButton>
                </div>
              </div>
            </div>

            <!-- Orders Tab -->
            <div
              v-if="activeTab === 'orders'"
              class="bg-white rounded-xl p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#383838] mb-6">
                {{ t('account.orders.title') }}
              </h2>

              <div class="space-y-4">
                <div
                  v-for="order in orders"
                  :key="order.id"
                  class="border border-gray-200 rounded-lg p-4 sm:p-6 hover: transition-shadow">
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h3 class="text-lg font-semibold text-[#383838]">
                        {{ order.id }}
                      </h3>
                      <p class="text-sm text-[#697586]">{{ order.date }}</p>
                    </div>
                    <div
                      :class="[
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold w-fit border shadow-sm transition-all hover:shadow-md',
                        getStatusColor(order.status).bg,
                        getStatusColor(order.status).text,
                        getStatusColor(order.status).border,
                      ]">
                      <span
                        :class="[
                          'w-2 h-2 rounded-full animate-pulse',
                          getStatusColor(order.status).dot,
                        ]"></span>
                      <span class="text-lg leading-none">{{ getStatusColor(order.status).icon }}</span>
                      <span>{{ t('account.orders.status.' + order.status.toLowerCase().replace(' ', '_')) }}</span>
                    </div>
                  </div>
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                    <div class="text-sm text-[#697586]">
                      {{ order.items }} {{ t('account.orders.items') }} • {{ t('account.orders.total') }}:
                      <span class="font-semibold text-[#383838]">{{
                        order.total
                      }}</span>
                    </div>
                    <LiquidButton
                      variant="ghost"
                      size="sm"
                      :class="'w-fit'">
                      {{ t('account.orders.view_details') }}
                    </LiquidButton>
                  </div>
                </div>
              </div>

              <div v-if="orders.length === 0" class="text-center py-12">
                <svg
                  class="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p class="text-[#697586] text-lg">{{ t('account.orders.no_orders') }}</p>
                <router-link
                  to="/product"
                  class="inline-block mt-4 px-6 py-3 bg-[#F5A3B7] text-white rounded-lg hover:bg-[#e392a6] transition-colors">
                  {{ t('account.orders.start_shopping') }}
                </router-link>
              </div>
            </div>

            <!-- Wishlist Tab -->
            <div
              v-if="activeTab === 'wishlist'"
              class="bg-white rounded-xl p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#383838] mb-6">
                {{ t('account.wishlist.title') }}
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  v-for="item in wishlist"
                  :key="item.id"
                  class="border border-gray-200 rounded-lg p-4 hover: transition-shadow">
                  <div
                    class="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      :src="item.image"
                      :alt="item.name"
                      class="w-full h-full object-cover" />
                  </div>
                  <h3 class="font-semibold text-[#383838] mb-2">
                    {{ item.name }}
                  </h3>
                  <p class="text-lg font-bold text-[#F5A3B7] mb-4">
                    {{ item.price }}
                  </p>
                  <div class="flex gap-2">
                    <LiquidButton variant="primary" size="sm" :class="'flex-1'">
                      {{ t('account.wishlist.add_to_cart') }}
                    </LiquidButton>
                    <LiquidButton
                      @click="removeFromWishlist(item.id)"
                      variant="danger"
                      size="sm"
                      icon-only>
                      <template #icon-left>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </template>
                    </LiquidButton>
                  </div>
                </div>
              </div>

              <div v-if="wishlist.length === 0" class="text-center py-12">
                <svg
                  class="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p class="text-[#697586] text-lg">{{ t('account.wishlist.empty') }}</p>
                <router-link
                  to="/product"
                  class="inline-block mt-4 px-6 py-3 bg-[#F5A3B7] text-white rounded-lg hover:bg-[#e392a6] transition-colors">
                  {{ t('account.wishlist.discover') }}
                </router-link>
              </div>
            </div>

            <!-- Addresses Tab -->
            <div
              v-if="activeTab === 'addresses'"
              class="bg-white rounded-xl p-6 sm:p-8">
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                <h2 class="text-2xl sm:text-3xl font-bold text-[#383838]">
                  {{ t('account.addresses.title') }}
                </h2>
                <LiquidButton
                  @click="openAddressForm"
                  variant="primary"
                  size="md">
                  {{ t('account.addresses.add_new_btn') }}
                </LiquidButton>
              </div>

              <!-- Add New Address Form -->
              <div
                v-if="showAddressForm"
                class="mb-6 p-6 border-2 border-[#F5A3B7] rounded-lg bg-pink-50/30">
                <h3 class="text-lg font-semibold text-[#383838] mb-4">
                  {{ t('account.addresses.add_new_title') }}
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-[#383838] mb-2"
                      >{{ t('account.addresses.type') }}</label
                    >
                    <select
                      v-model="addressFormData.type"
                      class="liquid-glass-select">
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#383838] mb-2"
                      >{{ t('account.addresses.full_name') }}</label
                    >
                    <input
                      v-model="addressFormData.name"
                      type="text"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#383838] mb-2"
                      >{{ t('account.addresses.address') }}</label
                    >
                    <textarea
                      v-model="addressFormData.address"
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-[#383838] mb-2"
                      >{{ t('account.addresses.phone') }}</label
                    >
                    <input
                      v-model="addressFormData.phone"
                      type="tel"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                  </div>
                  <div class="flex gap-3 pt-2">
                    <LiquidButton
                      @click="addNewAddress"
                      variant="primary"
                      size="md"
                      :class="'flex-1'">
                      {{ t('account.addresses.save_address') }}
                    </LiquidButton>
                    <LiquidButton
                      @click="closeAddressForm"
                      variant="secondary"
                      size="md"
                      :class="'flex-1'">
                      {{ t('account.addresses.cancel') }}
                    </LiquidButton>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="address in addresses"
                  :key="address.id"
                  class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <!-- Editing Mode -->
                  <div v-if="editingAddressId === address.id">
                    <div class="space-y-4">
                      <div>
                        <label
                          class="block text-sm font-medium text-[#383838] mb-2"
                          >Address Type</label
                        >
                        <select
                          v-model="addressFormData.type"
                          class="liquid-glass-select">
                          <option value="Home">Home</option>
                          <option value="Office">Office</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-[#383838] mb-2"
                          >Full Name</label
                        >
                        <input
                          v-model="addressFormData.name"
                          type="text"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-[#383838] mb-2"
                          >Address</label
                        >
                        <textarea
                          v-model="addressFormData.address"
                          rows="3"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]"></textarea>
                      </div>
                      <div>
                        <label
                          class="block text-sm font-medium text-[#383838] mb-2"
                          >Phone Number</label
                        >
                        <input
                          v-model="addressFormData.phone"
                          type="tel"
                          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                      </div>
                      <div class="flex gap-3 pt-2">
                        <LiquidButton
                          @click="saveAddress(address.id)"
                          variant="primary"
                          size="md"
                          :class="'flex-1'">
                          {{ t('account.addresses.save_changes') }}
                        </LiquidButton>
                        <LiquidButton
                          @click="cancelEditAddress"
                          variant="secondary"
                          size="md"
                          :class="'flex-1'">
                          {{ t('account.addresses.cancel') }}
                        </LiquidButton>
                      </div>
                    </div>
                  </div>

                  <!-- View Mode -->
                  <div v-else>
                    <div class="flex justify-between items-start mb-4">
                      <div class="flex items-center gap-3">
                        <span
                          class="px-3 py-1 bg-[#F5A3B7] bg-opacity-20 text-[#F5A3B7] rounded-full text-sm font-medium">
                          {{ address.type }}
                        </span>
                        <span
                          v-if="address.isDefault"
                          class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {{ t('account.addresses.default_badge') }}
                        </span>
                      </div>
                      <div class="flex gap-2">
                        <button
                          @click="startEditAddress(address)"
                          class="text-[#697586] hover:text-[#F5A3B7] transition-colors"
                          title="Edit address">
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          v-if="!address.isDefault"
                          @click="deleteAddress(address.id)"
                          class="text-[#697586] hover:text-red-600 transition-colors"
                          title="Delete address">
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <h3 class="font-semibold text-[#383838] mb-2">
                      {{ address.name }}
                    </h3>
                    <p class="text-[#697586] mb-1">{{ address.address }}</p>
                    <p class="text-[#697586] mb-4">{{ address.phone }}</p>
                    <LiquidButton
                      v-if="!address.isDefault"
                      @click="setDefaultAddress(address.id)"
                      variant="ghost"
                      size="sm"
                      :class="'text-sm'">
                      {{ t('account.addresses.set_default') }}
                    </LiquidButton>
                  </div>
                </div>
              </div>
            </div>

            <!-- Settings Tab -->
            <div
              v-if="activeTab === 'settings'"
              class="bg-white rounded-xl p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-[#383838] mb-6">
                {{ t('account.settings.title') }}
              </h2>

              <div class="space-y-6">
                <!-- Password -->
                <div class="border-b border-gray-200 pb-6">
                  <h3 class="text-lg font-semibold text-[#383838] mb-4">
                    {{ t('account.settings.change_password') }}
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <label
                        class="block text-sm font-medium text-[#383838] mb-2"
                        >Current Password</label
                      >
                      <input
                        v-model="passwordData.current"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-[#383838] mb-2"
                        >New Password</label
                      >
                      <input
                        v-model="passwordData.new"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                    </div>
                    <div>
                      <label
                        class="block text-sm font-medium text-[#383838] mb-2"
                        >Confirm New Password</label
                      >
                      <input
                        v-model="passwordData.confirm"
                        type="password"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5A3B7]" />
                    </div>
                    <LiquidButton
                      @click="updatePassword"
                      variant="primary"
                      size="md">
                      {{ t('account.settings.update_password') }}
                    </LiquidButton>
                  </div>
                </div>

                <!-- Notifications -->
                <div class="border-b border-gray-200 pb-6">
                  <h3 class="text-lg font-semibold text-[#383838] mb-4">
                    {{ t('account.settings.notifications') }}
                  </h3>
                  <div class="space-y-3">
                    <label
                      class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all">
                      <div class="checkbox-wrapper-account">
                        <input
                          v-model="notifications.orderEmails"
                          type="checkbox"
                          class="modern-checkbox-account" />
                        <span class="checkbox-custom-account">
                          <svg
                            class="checkbox-icon-account"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <span
                        class="text-[#697586] group-hover:text-gray-700 transition-colors"
                        >{{ t('account.settings.email_notif') }}</span
                      >
                    </label>
                    <label
                      class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all">
                      <div class="checkbox-wrapper-account">
                        <input
                          v-model="notifications.promotional"
                          type="checkbox"
                          class="modern-checkbox-account" />
                        <span class="checkbox-custom-account">
                          <svg
                            class="checkbox-icon-account"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <span
                        class="text-[#697586] group-hover:text-gray-700 transition-colors"
                        >{{ t('account.settings.promo_email') }}</span
                      >
                    </label>
                    <label
                      class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-all">
                      <div class="checkbox-wrapper-account">
                        <input
                          v-model="notifications.sms"
                          type="checkbox"
                          class="modern-checkbox-account" />
                        <span class="checkbox-custom-account">
                          <svg
                            class="checkbox-icon-account"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <span
                        class="text-[#697586] group-hover:text-gray-700 transition-colors"
                        >{{ t('account.settings.sms_notif') }}</span
                      >
                    </label>
                  </div>
                </div>

                <!-- Delete Account -->
                <div>
                  <h3 class="text-lg font-semibold text-red-600 mb-2">
                    {{ t('account.settings.danger_zone') }}
                  </h3>
                  <p class="text-sm text-[#697586] mb-4">
                    {{ t('account.settings.delete_warning') }}
                  </p>
                  <LiquidButton variant="danger" size="md">
                    {{ t('account.settings.delete_account') }}
                  </LiquidButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Modern Custom Checkbox Styling for Account */
.checkbox-wrapper-account {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.modern-checkbox-account {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
}

.checkbox-custom-account {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
  border: 2.5px solid #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
    inset 0 1px 2px rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.checkbox-wrapper-account:hover .checkbox-custom-account {
  border-color: #f5a3b7;
  background: rgba(245, 163, 183, 0.05);
  transform: scale(1.05);
}

.checkbox-icon-account {
  width: 70%;
  height: 70%;
  color: white;
  opacity: 0;
  transform: scale(0) rotate(-45deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modern-checkbox-account:checked ~ .checkbox-custom-account {
  background: linear-gradient(135deg, #f5a3b7 0%, #e89aae 100%);
  border-color: #f5a3b7;
  box-shadow: 0 4px 12px rgba(245, 163, 183, 0.4),
    0 2px 4px rgba(245, 163, 183, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.modern-checkbox-account:checked
  ~ .checkbox-custom-account
  .checkbox-icon-account {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

.modern-checkbox-account:checked ~ .checkbox-custom-account::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 0.75rem;
  background: radial-gradient(
    circle,
    rgba(245, 163, 183, 0.2) 0%,
    transparent 70%
  );
  animation: ripple-account 0.6s ease-out;
}

@keyframes ripple-account {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.modern-checkbox-account:focus ~ .checkbox-custom-account {
  outline: 2px solid #f5a3b7;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(245, 163, 183, 0.1);
}

/* Custom scrollbar for sidebar */
.sticky {
  position: sticky;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
