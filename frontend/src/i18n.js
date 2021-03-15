import i18n from 'i18next'

import translationEN from './locales/en.json'
import translationPL from './locales/pl.json'

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
}

i18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})

export default i18n
