<template>
  <div>
    <div class="page-header pillar-header-fasting">
      <GeoPattern/>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge"
             style="background:var(--fasting-light);color:var(--fasting-color)">
          Pillar 4 of 5 &nbsp;·&nbsp; الصوم
        </div>
        <h1>Sawm — Fasting</h1>
        <p>The fourth pillar — fasting during the month of Ramadan from dawn to sunset, abstaining
          from food, drink, and sexual relations as an act of worship and purification.</p>
      </div>
    </div>

    <div class="content-narrow">

      <QuranBlock
        arabic="يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ"
        reference="Qur'an 2:183"
        translation="O you who have believed, decreed upon you is fasting as it was decreed upon those before you so that you may become righteous (muttaqin)."
        :framed="true"
        class="anim-target"
      />

      <!-- Ramadan status -->
      <div style="margin-top:2.5rem">
        <span class="eyebrow">Ramadan {{ hijri.year }} AH</span>
        <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">
          {{ inRamadan ? 'رمضان مبارك — Ramadan Mubarak!' : `${daysLeft} days until Ramadan` }}
        </h2>

        <div class="card"
             style="background:var(--ink);color:#fff;margin-bottom:1.5rem;position:relative;overflow:hidden">
          <div class="bg-kufic-grid dark" aria-hidden="true"></div>
          <div
            style="position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1.5rem;flex-wrap:wrap">
            <div style="text-align:center">
              <div
                style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">
                Current Hijri date
              </div>
              <div style="font-family:var(--serif);font-size:1.4rem;font-weight:600;color:#fff">
                {{ hijri.day }} {{ hijri.monthName }}
              </div>
              <div style="font-size:13px;color:rgba(255,255,255,.5)">{{ hijri.year }} AH</div>
            </div>
            <div style="text-align:center">
              <div
                style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">
                {{ inRamadan ? 'Ramadan day' : 'Months remaining' }}
              </div>
              <div style="font-family:var(--serif);font-size:2rem;font-weight:600;"
                   :style="{ color: inRamadan ? '#8BC4A8' : 'var(--gold)' }">
                {{ inRamadan ? hijri.day : Math.max(0, 9 - hijri.month) }}
              </div>
              <div style="font-size:13px;color:rgba(255,255,255,.5)">
                {{ inRamadan ? 'of 29–30 days' : 'until Ramaḍān' }}
              </div>
            </div>
            <div style="text-align:center">
              <div
                style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.6px;color:rgba(255,255,255,.5);margin-bottom:6px">
                Status
              </div>
              <div style="font-size:1.5rem">{{ inRamadan ? '🌙' : '⭐' }}</div>
              <div style="font-size:13px;color:rgba(255,255,255,.5)">
                {{ inRamadan ? 'Ramadan is here' : "Sha'ban / waiting" }}
              </div>
            </div>
          </div>
        </div>

        <!-- Suhoor / Iftar times -->
        <div class="card" style="margin-bottom:1.5rem">
          <h3 style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:12px">
            Suhoor &amp; Iftar times today</h3>
          <p style="font-size:13.5px;color:var(--muted);margin-bottom:14px">Enter your coordinates
            to calculate today's Suhoor (before Fajr) and Iftar (at Maghrib) times.</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end">
            <div class="field" style="flex:1;min-width:130px"><label>Latitude</label><input
              v-model.number="lat" type="number" class="input-field" placeholder="51.5074"
              step="0.0001"></div>
            <div class="field" style="flex:1;min-width:130px"><label>Longitude</label><input
              v-model.number="lng" type="number" class="input-field" placeholder="-0.1278"
              step="0.0001"></div>
            <button class="btn btn-primary" @click="calculate">Calculate</button>
            <button class="btn btn-secondary" @click="locate">📍 My location</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem">
            <div
              style="background:var(--cream-dark);border-radius:var(--radius);padding:1rem;text-align:center">
              <div
                style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px">
                🌅 Suhoor ends (Fajr)
              </div>
              <div
                style="font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--green)">
                {{ suhoorTime }}
              </div>
              <div style="font-size:12px;color:var(--muted)">Last moment to eat</div>
            </div>
            <div
              style="background:var(--gold-light);border:1px solid #E0C87A;border-radius:var(--radius);padding:1rem;text-align:center">
              <div
                style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#7A5A10;margin-bottom:6px">
                🌇 Iftar (Maghrib)
              </div>
              <div
                style="font-family:var(--serif);font-size:1.8rem;font-weight:600;color:var(--gold)">
                {{ iftarTime }}
              </div>
              <div style="font-size:12px;color:#7A5A10">Time to break fast</div>
            </div>
          </div>
          <div v-if="fastStatus" style="margin-top:10px;font-size:13px;color:var(--muted)">
            {{ fastStatus }}
          </div>
          <div v-if="showProgress" style="margin-top:14px">
            <div
              style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--muted);margin-bottom:5px">
              <span>Fasting in progress</span><span>{{ fastPct }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill"
                   :style="{ width: fastPct + '%', background: 'var(--gold)' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <span class="eyebrow">What is Sawm?</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">The obligation of
        fasting</h2>
      <div class="prose">
        <p>Sawm (صَوْم, fasting) in Islamic law refers specifically to the obligatory fast of the
          month of Ramadan — the ninth month of the Islamic lunar calendar. It is one of the five
          pillars and is obligatory on every adult Muslim who is sane, healthy, resident (not
          travelling), and not experiencing menstruation or post-natal bleeding.</p>
        <p>The fast begins at the break of true dawn (Fajr) and ends at sunset (Maghrib). During
          this time, one must completely abstain from food, drink (including water), smoking, and
          sexual relations. It is also highly important to guard one's tongue, eyes, and behaviour —
          the Prophet ﷺ warned that a person who does not abandon false speech while fasting has no
          need to abandon food and drink (Sahih Bukhari 1903).</p>
      </div>

      <div class="hadith-block anim-target">
        <div class="hadith-source">Sahih Bukhari 1904 · Sahih Muslim 1151</div>
        <div class="hadith-text">"Every deed of the son of Adam is for him except fasting — it is
          for Me and I shall reward it. Fasting is a shield." — Hadith Qudsi, narrated by Abu
          Hurayrah RA
        </div>
      </div>

      <div class="divider"></div>

      <span class="eyebrow">Rulings</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Who
        must fast &amp; valid excuses</h2>
      <div class="card-grid card-grid-2 anim-target">
        <div class="card card-green" style="border-color:#B0D8C4">
          <h3
            style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--green)">
            ✓ Must fast</h3>
          <div v-for="c in mustFast" :key="c"
               style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #e5f5ee">
            · {{ c }}
          </div>
        </div>
        <div class="card card-warn" style="border-color:#F0B0A8">
          <h3
            style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.75rem;color:var(--red)">
            ✗ Valid excuses (make up later)</h3>
          <div v-for="c in excuses" :key="c"
               style="font-size:13.5px;color:var(--muted);padding:4px 0;border-bottom:1px solid #fde9e7">
            · {{ c }}
          </div>
        </div>
      </div>

      <!-- Invalidators of the fast -->
      <div style="margin-top:1.5rem">
        <span class="eyebrow">Invalidators</span>
        <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">
          Invalidators of the fast (Muftirat)
        </h2>
        <div class="card-grid anim-target"
             style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
          <div v-for="m in muftirat" :key="m.title" class="card">
            <h4
              style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.35rem">
              {{ m.title }}
            </h4>
            <p style="font-size:12.5px;color:var(--muted);line-height:1.55">{{ m.desc }}</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <span class="eyebrow">Virtues of Ramadan</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The
        blessed month</h2>

      <QuranBlock
        arabic="شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ"
        reference="Qur'an 2:185"
        translation="The month of Ramadan in which was revealed the Qur'an, a guidance for the people and clear proofs of guidance and criterion."
        class="anim-target"
      />

      <div class="timeline anim-target" style="margin-top:1.5rem">
        <div v-for="v in virtues" :key="v.title" class="tl-item">
          <div class="tl-marker">{{ v.icon }}</div>
          <div class="tl-content"><h4>{{ v.title }}</h4>
            <p>{{ v.desc }}</p></div>
        </div>
      </div>

      <div class="divider"></div>
      <FaqList :faqs="faqs"/>

      <div class="cta-strip anim-target" style="margin-top:2.5rem">
        <GeoPattern/>
        <h2>Continue to the fifth pillar</h2>
        <p>Hajj — the pilgrimage to the sacred city of Makkah, obligatory once in a lifetime for
          those who are able.</p>
        <RouterLink to="/hajj" class="btn btn-white btn-lg">Explore Hajj →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import {
  toHijri,
  daysToRamadan,
  isRamadan
} from '@/utils/hijri.js'
import { calcPrayerTimes, getTimezoneOffset } from '@/utils/prayer.js'

useSeo('fasting')
useScrollReveal()

const store = useZakatStore()
const hijri = toHijri()
const inRamadan = isRamadan()
const daysLeft = Math.round(daysToRamadan())
const lat = ref(store.location?.lat ?? '')
const lng = ref(store.location?.lng ?? '')
const suhoorTime = ref('—:—')
const iftarTime = ref('—:—')
const fastStatus = ref('')
const fastPct = ref(0)
const showProgress = ref(false)

let fastTimer = null

async function locate() {
  try {
    const loc = await store.requestLocation()
    lat.value = parseFloat(loc.lat.toFixed(4))
    lng.value = parseFloat(loc.lng.toFixed(4))
    calculate()
  } catch (e) { /* user denied */
  }
}

function calculate() {
  const latV = parseFloat(lat.value)
  const lngV = parseFloat(lng.value)
  if (isNaN(latV) || isNaN(lngV)) {
    return
  }

  const tz = getTimezoneOffset()
  const times = calcPrayerTimes(latV, lngV, new Date(), tz, 'MWL')
  suhoorTime.value = times.fajr
  iftarTime.value = times.maghrib

  const t2m = t => parseInt(t.split(':')[0]) * 60 + parseInt(t.split(':')[1])
  const fajrM = t2m(times.fajr)
  const magM = t2m(times.maghrib)

  clearInterval(fastTimer)
  const update = () => {
    const now = new Date().getHours() * 60 + new Date().getMinutes()
    if (now >= fajrM && now < magM) {
      showProgress.value = true
      const pct = Math.round(((now - fajrM) / (magM - fajrM)) * 100)
      fastPct.value = pct
      const rem = magM - now
      const h = Math.floor(rem / 60), m = rem % 60
      fastStatus.value = `⏱ ${h}h ${m}m until Iftar`
    } else if (now >= magM) {
      showProgress.value = true
      fastPct.value = 100
      fastStatus.value = '🌙 Iftar time — Ramadan Mubarak!'
    } else {
      showProgress.value = false
      const rem = fajrM - now
      const h = Math.floor(rem / 60), m = rem % 60
      fastStatus.value = `🌅 Suhoor in ${h}h ${m}m`
    }
  }
  update()
  fastTimer = setInterval(update, 60000)
}

if (store.location) {
  calculate()
}

onUnmounted(() => clearInterval(fastTimer))

const mustFast = [
  'Muslim adult (baligh)',
  'Sane (aqil)',
  'Physically able (healthy)',
  'Resident (not travelling)',
  'Not menstruating or in nifas'
]
const excuses = [
  'Illness — where fasting causes harm',
  'Travel — at the distance of qasr',
  'Pregnancy/breastfeeding (if harmful)',
  'Menstruation / post-natal bleeding',
  'Old age or chronic illness (fidya instead)'
]

const muftirat = [
  {
    title: 'Eating or drinking',
    desc: 'Anything consumed intentionally by mouth, nose, or throat during fasting hours',
  },
  {
    title: 'Sexual intercourse',
    desc: "Requires both make-up (qada) and expiation (kaffarah) — freeing a slave, fasting 60 consecutive days, or feeding 60 poor people",
  },
  {
    title: 'Deliberate vomiting',
    desc: "If one deliberately induces vomiting, the fast is broken",
  },
  {
    title: 'Menstruation / Nifas',
    desc: "The fast is broken and must be made up — no kaffarah required",
  },
  {
    title: 'Intention at night',
    desc: "Forgetting to make the intention (niyyah) for Ramadan fasting invalidates it per majority scholars",
  },
]

const virtues = [
  {
    icon: '🌙',
    title: 'Revelation of the Qur\'an',
    desc: "The Qur'an was first revealed to the Prophet ﷺ on Laylat al-Qadr (the Night of Power) during Ramadan — described as 'better than a thousand months' (97:3)."
  },
  {
    icon: '🔒',
    title: 'Shayateen are chained',
    desc: "The Prophet ﷺ said: \"When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.\" (Sahih Bukhari 1899)"
  },
  {
    icon: '🌟',
    title: 'Laylat al-Qadr',
    desc: "The Night of Power, hidden in the last ten nights of Ramadan (most likely on an odd-numbered night), is better in reward than a thousand months of worship (Qur'an 97:3)."
  },
  {
    icon: '🤲',
    title: 'Itikaf (Seclusion)',
    desc: "The Prophet ﷺ used to spend the last ten days of Ramadan in the mosque in seclusion (itikaf), seeking Laylat al-Qadr through prayer and remembrance."
  },
]

const faqs = [
  {
    q: "Does using a miswak (toothbrush) break the fast?",
    a: "No — using a miswak or dry toothbrush does not break the fast. Toothpaste should be avoided as it could be swallowed. Using mouthwash is makruh (disliked) according to many scholars."
  },
  {
    q: "Do eye drops or injections break the fast?",
    a: "Eye drops do not break the fast per the majority of scholars. Injections that are not nutritional do not break the fast. A nutritional IV drip does break the fast."
  },
  {
    q: "What is fidya?",
    a: "Fidya is a compensation for those who permanently cannot fast (the elderly, chronically ill) — feeding one poor person per missed day. It is not an option for those who are able to make up fasts."
  },
  {
    q: "What is kaffarah?",
    a: "Kaffarah is the severe expiation required for deliberately breaking the fast of Ramadan by sexual intercourse. The options: free a slave, fast 60 consecutive days, or feed 60 poor people."
  },
  {
    q: "Are voluntary (nafl) fasts rewarded?",
    a: "Yes — Monday and Thursday fasts were practiced by the Prophet ﷺ. The fast of Arafah (9th Dhul Hijjah) expiates two years of sins. The six days of Shawwal give the reward of fasting the entire year."
  },
]
</script>
