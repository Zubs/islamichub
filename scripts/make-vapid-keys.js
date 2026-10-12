// Prints a new key pair for Web Push. Run once and put the values in the Netlify site settings:
//   node scripts/make-vapid-keys.js
import { createECDH } from 'node:crypto'

const keys = createECDH('prime256v1')
keys.generateKeys()

console.log(`VITE_VAPID_PUBLIC_KEY=${keys.getPublicKey().toString('base64url')}`)
console.log(`VAPID_PRIVATE_KEY=${keys.getPrivateKey().toString('base64url')}`)
console.log('VAPID_SUBJECT=mailto:you@example.com')
