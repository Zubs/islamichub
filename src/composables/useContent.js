import { shallowRef, watch } from 'vue'
import { currentLocale } from '@/i18n.js'
import { SOURCE_LOCALE } from '@/utils/locale.js'
import { lookup, fill, mergeList, localizeItem } from '@/utils/content.js'

const contentFiles = import.meta.glob('/src/data/content/*/*.js')
const translationFiles = import.meta.glob('/src/data/translations/*/*.js')
const added = new Map()

// Makes a content or data translation available without a file; tests use this.
export function addTranslation(kind, name, code, content) {
  added.set(`${kind}/${name}/${code}`, content)
}

export function removeTranslations() {
  added.clear()
}

function useTranslated(kind, files, name) {
  const translated = shallowRef(null)
  watch(
    () => currentLocale.value.code,
    async (code) => {
      translated.value = null
      if (code === SOURCE_LOCALE) {
        return
      }

      const key = `${kind}/${name}/${code}`
      const load = files[`/src/data/${kind}/${name}/${code}.js`]
      const loaded = added.get(key) ?? (load ? (await load()).default : null)
      if (currentLocale.value.code === code) {
        translated.value = loaded
      }
    },
    { immediate: true },
  )
  return translated
}

// A page's writing in the reader's language, falling back to the source text by text.
//   c('section.key', { a: value })   one text
//   list('name')                     one of the page's lists
//   untranslated('section')          true when the section is shown in the source language
export function useContent(page, source) {
  const translated = useTranslated('content', contentFiles, page)

  function c(path, params) {
    const text = lookup(translated.value, path) ?? lookup(source, path) ?? ''
    return params ? fill(text, params) : text
  }

  function list(name) {
    return mergeList(source.lists?.[name] ?? [], translated.value?.lists?.[name])
  }

  function untranslated(section) {
    return currentLocale.value.code !== SOURCE_LOCALE && !translated.value?.[section]
  }

  return { c, list, untranslated }
}

// The items of a data file with their translated text, by id.
export function useDataTranslations(dataset) {
  const translated = useTranslated('translations', translationFiles, dataset)

  function localized(item) {
    return localizeItem(item, translated.value)
  }

  return { localized }
}
