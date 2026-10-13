import { vi } from 'vitest'

export const registered = { options: null, update: vi.fn(async () => {}) }

export function registerSW(options) {
  registered.options = options
  return registered.update
}
