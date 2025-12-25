import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import km from './locales/km.json';

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'km', // Default locale
  fallbackLocale: 'en',
  messages: {
    en,
    km
  }
});

export default i18n;
