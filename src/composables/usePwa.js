import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com']

export const needRefresh = ref(false)
export const canInstall = ref(false)
export const showIosNote = ref(false)

let applyUpdate = null
let installEvent = null

function isInstalled() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true
}

function isIosSafari() {
  const agent = navigator.userAgent
  return /iPhone|iPad|iPod/.test(agent) && !/CriOS|FxiOS|EdgiOS/.test(agent)
}

// The first page load happens before the worker controls the page, so its fonts are not stored.
// Asking for them again once the worker is ready lets it keep them for offline use.
export function loadedFontAddresses() {
  return performance
    .getEntriesByType('resource')
    .map((entry) => entry.name)
    .filter((address) => FONT_HOSTS.includes(new URL(address).hostname))
}

function keepFontsForOffline() {
  for (const address of loadedFontAddresses()) {
    fetch(address, { mode: 'cors' }).catch(() => {})
  }
}

export function startPwa() {
  if (!('serviceWorker' in navigator)) {
    return
  }

  applyUpdate = registerSW({
    onNeedRefresh() {
      needRefresh.value = true
    },
    onRegisteredSW() {
      navigator.serviceWorker.ready.then(keepFontsForOffline).catch(() => {})
    },
    onRegisterError() {
      // the site works online without a worker
    },
  })

  showIosNote.value = isIosSafari() && !isInstalled()

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    installEvent = event
    canInstall.value = !isInstalled()
  })

  window.addEventListener('appinstalled', () => {
    installEvent = null
    canInstall.value = false
  })
}

export function refreshApp() {
  needRefresh.value = false
  return applyUpdate?.(true)
}

export async function installApp() {
  if (!installEvent) {
    return
  }

  const prompt = installEvent
  installEvent = null
  canInstall.value = false
  await prompt.prompt()
}

export function dismissIosNote() {
  showIosNote.value = false
}
