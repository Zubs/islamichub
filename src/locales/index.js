import en from './en.js'
import yo from './yo.js'

const NOTO_FONTS = {
  sans: "'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  serif: "'Noto Serif', Georgia, 'Times New Roman', serif",
  stylesheet:
    'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500&family=Noto+Serif:ital,wght@0,500;0,600;1,400&display=swap',
}

// Every language the site knows. A language is offered only when `complete` is true, and
// test/languages.test.js fails if one is marked complete before it is.
//   intl    the locale used for numbers, dates and currency
//   dir     'ltr' or 'rtl'
//   fonts   typefaces to use where the site's own cannot draw the language's letters
//   quran   the one published Qur'an translation the language uses, credited on the About page
export const LOCALES = [
  { code: 'en', name: 'English', intl: 'en-GB', dir: 'ltr', complete: true, messages: en },
  {
    code: 'yo',
    name: 'Yorùbá',
    intl: 'yo-NG',
    dir: 'ltr',
    complete: false,
    messages: yo,
    // DM Sans has no ẹ, ọ or ṣ; Noto Sans and Noto Serif hold every Yoruba letter and tone mark.
    fonts: NOTO_FONTS,
    // Proposed, not yet confirmed.
    quran: { translator: 'Shaykh Abu Rahimah Mikael Aykyuni', edition: 'QuranEnc, Yoruba' },
  },
]

// The pages a language must translate in full before it is offered.
export const REQUIRED_PAGES = ['faith', 'prayer', 'zakat', 'fasting', 'hajj']
