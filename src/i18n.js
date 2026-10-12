import { ref, computed } from 'vue'
import { createI18n } from 'vue-i18n'
import { LOCALES } from '@/locales/index.js'
import { SOURCE_LOCALE } from '@/utils/locale.js'

const CHOICE_KEY = 'locale'

const registered = ref(LOCALES.filter((locale) => locale.complete))

export const i18n = createI18n({
  legacy: false,
  locale: SOURCE_LOCALE,
  fallbackLocale: SOURCE_LOCALE,
  missingWarn: false,
  fallbackWarn: false,
  messages: Object.fromEntries(registered.value.map((locale) => [locale.code, locale.messages])),
})

export const t = i18n.global.t
export const availableLocales = computed(() => registered.value)
export const currentLocale = computed(
  () =>
    registered.value.find((locale) => locale.code === i18n.global.locale.value) ??
    registered.value[0],
)

export function localeCodes() {
  return registered.value.map((locale) => locale.code)
}

export function isAvailable(code) {
  return localeCodes().includes(code)
}

// Makes a language available. The site's own languages come from the registry; tests add theirs here.
export function addLocale(locale) {
  i18n.global.setLocaleMessage(locale.code, locale.messages)
  registered.value = [...registered.value.filter((entry) => entry.code !== locale.code), locale]
}

export function removeLocale(code) {
  registered.value = registered.value.filter((entry) => entry.code !== code)
  if (i18n.global.locale.value === code) {
    setLocale(SOURCE_LOCALE)
  }
}

export function setLocale(code) {
  const locale = registered.value.find((entry) => entry.code === code) ?? registered.value[0]
  i18n.global.locale.value = locale.code
  document.documentElement.lang = locale.code
  document.documentElement.dir = locale.dir
}

export function rememberedLocale() {
  try {
    const code = localStorage.getItem(CHOICE_KEY)
    return isAvailable(code) ? code : null
  } catch {
    return null
  }
}

export function rememberLocale(code) {
  try {
    localStorage.setItem(CHOICE_KEY, code)
  } catch {
    // storage is blocked; the choice lasts for this visit
  }
}

export function formatNumber(value, options) {
  return Number(value).toLocaleString(currentLocale.value.intl, options)
}

export function formatDate(date, options) {
  return date.toLocaleDateString(currentLocale.value.intl, options)
}
