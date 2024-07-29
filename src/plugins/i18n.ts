// i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en.json'

const defaultLanguage = 'en'

// Get the user's preferred language from local storage or use the default
const storedLanguage = localStorage.getItem('appLanguage')
const userLanguage = storedLanguage || navigator.language.split('-')[0]
const languageToUse = ['en', 'ar', 'fr'].includes(userLanguage)
    ? userLanguage
    : defaultLanguage

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: enTranslations,
        },
    },
    lng: languageToUse,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
})

// Set the user's language preference in local storage
i18n.on('languageChanged', lng => {
    localStorage.setItem('appLanguage', lng)
})

// Function to change the language dynamically
export const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
}

export default i18n
