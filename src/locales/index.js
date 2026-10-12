import en from './en.js'

// Every language the site knows. A language is offered only when `complete` is true.
// `intl` is the locale used for numbers, dates and currency; `dir` is 'ltr' or 'rtl'.
export const LOCALES = [
  { code: 'en', name: 'English', intl: 'en-GB', dir: 'ltr', complete: true, messages: en },
]
