import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import EN from './locales/en.json';
import VN from './locales/vi.json';
const resources = {
  en: EN,
  vi: VN,
};

i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
});
export default i18next;
