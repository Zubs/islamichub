<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          Islamic Tool &nbsp;·&nbsp; الميراث
        </div>
        <h1>Fara'id — Islamic Inheritance Calculator</h1>
        <p>
          Calculate the Qur'anic shares of inheritance based on the heirs present. Each heir's share
          is derived directly from Qur'an 4:11–12 and 4:176.
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <QuranBlock
        arabic="يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ"
        reference="Qur'an 4:11"
        translation="Allah instructs you concerning your children: for the male, what is equal to the share of two females."
        note="The foundational verse of Islamic inheritance law."
        style="max-width: 860px; margin-bottom: 2rem"
      />

      <div
        style="display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start"
        id="inh-layout"
      >
        <!-- Left: heir selection -->
        <div>
          <span class="eyebrow">Step 1</span>
          <h2
            class="section-title"
            style="font-size: clamp(1.4rem, 2.5vw, 1.8rem); margin-bottom: 0.75rem"
          >
            Select the heirs present
          </h2>
          <p style="font-size: 14px; color: var(--muted); margin-bottom: 1.5rem">
            Toggle each heir present in the estate. For heirs where count matters, enter the number
            after toggling.
          </p>

          <!-- Estate value -->
          <div class="card" style="margin-bottom: 1.25rem">
            <div class="field">
              <label>Total estate value (after debts &amp; funeral expenses)</label>
              <div class="pfx-wrap">
                <span class="pfx">{{ store.sym }}</span>
                <input
                  type="number"
                  class="input-field"
                  v-model.number="estateValue"
                  min="0"
                  step="1000"
                />
              </div>
              <div class="hint">
                Zakat on any zakatable portions should be calculated separately
              </div>
            </div>
          </div>

          <!-- Heir groups -->
          <div v-for="group in heirGroups" :key="group.name" style="margin-bottom: 1.25rem">
            <div class="eyebrow" style="margin-bottom: 8px">{{ group.name }}</div>
            <div v-for="heir in group.heirs" :key="heir.key" class="heir-toggle">
              <div class="heir-info">
                <h4>{{ heir.label }}</h4>
                <p>
                  {{ heir.desc }}
                  <span style="color: var(--gold); font-weight: 500">· {{ heir.quran }}</span>
                </p>
              </div>
              <div style="display: flex; align-items: center; gap: 10px">
                <input
                  v-if="needsCount(heir.key) && activeHeirs[heir.key]"
                  type="number"
                  class="input-field"
                  :value="activeHeirs[heir.key]"
                  @input="setHeirCount(heir.key, $event.target.value)"
                  min="1"
                  style="width: 60px; text-align: center"
                />
                <button
                  class="toggle-switch"
                  :class="{ on: !!activeHeirs[heir.key] }"
                  @click="toggleHeir(heir.key)"
                  :aria-label="(activeHeirs[heir.key] ? 'Remove' : 'Add') + ' ' + heir.label"
                ></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: results -->
        <div style="position: sticky; top: 84px">
          <div class="inheritance-results">
            <div class="inh-title">Inheritance Breakdown</div>
            <div v-if="outcome.error" class="inh-message" role="status">
              {{ outcome.error }}
            </div>
            <div v-for="r in results" :key="r.key" class="inh-row">
              <div class="inh-heir">
                {{ r.label }}<span v-if="r.count > 1"> ×{{ r.count }}</span>
                <div class="inh-rule">{{ r.rule }}</div>
              </div>
              <div class="inh-bar-wrap">
                <div class="inh-bar-fill" :style="{ width: r.percent + '%' }"></div>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 2px">
                <div class="inh-share">{{ r.share }} ({{ r.percent }}%)</div>
                <div class="inh-amount">{{ store.fmt(r.amount) }}</div>
                <div v-if="r.count > 1" class="inh-each">{{ eachText(r) }}</div>
              </div>
            </div>
            <div
              v-if="results.length > 0"
              style="
                border-top: 1px solid rgba(255, 255, 255, 0.12);
                margin-top: 1rem;
                padding-top: 1rem;
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                color: rgba(255, 255, 255, 0.5);
              "
            >
              <span>Total estate distributed</span>
              <span style="color: var(--gold); font-weight: 600">{{ store.fmt(estateValue) }}</span>
            </div>
          </div>

          <div class="card card-gold" style="border-color: #e0c87a; margin-top: 1rem">
            <div
              style="
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #7a5a10;
                margin-bottom: 6px;
              "
            >
              ⚠ Important note
            </div>
            <p style="font-size: 13px; color: #5a3e0a; line-height: 1.6">
              This result is a guide, not a ruling. Inheritance law is complex and this calculator
              covers standard cases only. Before dividing an estate, and for anything non-standard
              (half-siblings, missing heirs, bequests, disputes), consult a qualified Islamic
              scholar or mufti.
            </p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div style="max-width: 860px; margin-top: 3rem">
        <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
        <span class="eyebrow">Understanding Fara'id</span>
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          The Qur'anic system of inheritance
        </h2>
        <div class="prose">
          <p>
            Fara'id (فَرَائِض) — from the root meaning "obligatory portions" — is the Islamic law of
            inheritance derived primarily from Qur'an 4:11–12 and 4:176. It is one of the most
            precisely legislated areas of Islamic law, with specific fractional shares assigned
            directly by divine revelation.
          </p>
          <p>
            The system has two main categories of heirs: <strong>Dhawu al-furud</strong> (those with
            fixed Qur'anic shares) and <strong>Asaba</strong> (residuaries who receive the remainder
            after fixed shares are distributed). Males generally receive double the share of their
            equivalent female relative, reflecting the greater financial obligations Islam places on
            men.
          </p>
        </div>

        <div class="hadith-block anim-target" style="margin: 1.5rem 0">
          <div class="hadith-source">Sahih Bukhari 6732 · Abu Dawud 2886</div>
          <div class="hadith-text">
            "Learn the Fara'id (laws of inheritance) and teach them, for it is half of knowledge,
            and it will be forgotten. It is the first thing that will be taken away from my nation."
            — The Prophet Muhammad ﷺ
          </div>
        </div>

        <!-- Fixed shares table -->
        <h3
          style="
            font-family: var(--serif);
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 1rem;
            margin-top: 1.5rem;
          "
        >
          Fixed Qur'anic shares at a glance
        </h3>
        <div
          style="
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
            margin-bottom: 1.5rem;
          "
        >
          <table style="width: 100%; border-collapse: collapse; font-size: 13.5px">
            <thead>
              <tr style="background: var(--ink); color: #fff">
                <th style="padding: 10px 14px; text-align: left; font-weight: 600">Heir</th>
                <th style="padding: 10px 14px; text-align: center; font-weight: 600">
                  With children
                </th>
                <th style="padding: 10px 14px; text-align: center; font-weight: 600">
                  Without children
                </th>
                <th style="padding: 10px 14px; text-align: left; font-weight: 600">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in sharesTable"
                :key="row[0]"
                :style="{ background: i % 2 === 0 ? 'var(--cream)' : '#fff' }"
              >
                <td style="padding: 9px 14px; border-bottom: 1px solid var(--border)">
                  {{ row[0] }}
                </td>
                <td
                  style="
                    padding: 9px 14px;
                    border-bottom: 1px solid var(--border);
                    text-align: center;
                    font-family: var(--serif);
                    font-weight: 600;
                    color: var(--green);
                  "
                >
                  {{ row[1] }}
                </td>
                <td
                  style="
                    padding: 9px 14px;
                    border-bottom: 1px solid var(--border);
                    text-align: center;
                    font-family: var(--serif);
                    font-weight: 600;
                    color: var(--green);
                  "
                >
                  {{ row[2] }}
                </td>
                <td style="padding: 9px 14px; border-bottom: 1px solid var(--border)">
                  {{ row[3] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <FaqList :faqs="faqs" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { track } from '@/composables/useStats.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import { calcInheritance, HEIR_DEFS } from '@/utils/inheritance.js'

useSeo('inheritance')
useScrollReveal()

const store = useZakatStore()
const estateValue = ref(100000)
const activeHeirs = reactive({})

const countableKeys = new Set(HEIR_DEFS.filter((def) => def.countable).map((def) => def.key))

function needsCount(key) {
  return countableKeys.has(key)
}

function toggleHeir(key) {
  if (activeHeirs[key]) {
    delete activeHeirs[key]
  } else {
    activeHeirs[key] = 1
  }
}

function setHeirCount(key, val) {
  if (val !== '') {
    activeHeirs[key] = Number(val)
  }
}

const outcome = computed(() => calcInheritance({ ...activeHeirs }, estateValue.value))
const results = computed(() => outcome.value.shares)

function eachText(share) {
  const [first, ...rest] = share.each
  return rest.every((amount) => amount === first)
    ? `${store.fmt(first)} each`
    : share.each.map(store.fmt).join(' · ')
}

// Track inheritance result reached (once per page visit)
let inheritanceTracked = false
watch(results, (val) => {
  if (!inheritanceTracked && val.length > 0) {
    track('inheritance result reached')
    inheritanceTracked = true
  }
})

// Group heirs by category for display
const heirGroups = computed(() => {
  const groups = {}
  for (const def of HEIR_DEFS) {
    if (!groups[def.group]) {
      groups[def.group] = { name: def.group, heirs: [] }
    }

    groups[def.group].heirs.push({
      key: def.key,
      label: def.label,
      quran: def.quran,
      desc: getHeirDesc(def.key),
    })
  }

  return Object.values(groups)
})

function getHeirDesc(key) {
  const descs = {
    husband: 'Receives 1/4 beside a child or grandchild, otherwise 1/2',
    wife: 'Receives 1/8 beside a child or grandchild, otherwise 1/4, shared equally among wives',
    father:
      'Receives 1/6 beside a child or grandchild, and the residue when no son or grandson takes it',
    mother: 'Receives 1/6 beside a child, grandchild or two or more siblings, otherwise 1/3',
    son: "Residuary — receives double a daughter's share",
    daughter: 'Receives 1/2 (one), 2/3 (two+), or residue with son',
    grandson: "Son's son — blocked by a son",
    granddaughter:
      "Son's daughter — 1/6 beside one daughter; excluded by a son, or by two daughters unless a grandson is present",
    brother: 'Full brother — residuary; excluded by a son, grandson, father or grandfather',
    sister:
      'Full sister — 1/2 (one) or 2/3 (two+); shares the residue with a brother; excluded by a son, grandson, father or grandfather',
    paternal_grandfather: "Father's father — blocked by father",
    paternal_grandmother:
      'Receives 1/6, shared if both grandmothers inherit — excluded by mother or father',
    maternal_grandmother: 'Receives 1/6, shared if both grandmothers inherit — excluded by mother',
  }

  return descs[key] || ''
}

const sharesTable = [
  ['Husband', '1/4', '1/2', "Qur'an 4:12"],
  ['Wife (or wives)', '1/8', '1/4', "Qur'an 4:12"],
  ['Father', '1/6 (plus any residue beside daughters only)', 'Residue', "Qur'an 4:11"],
  ['Mother', '1/6', '1/3', "Qur'an 4:11"],
  ['Daughter (1)', '1/2 (no sons)', '1/2', "Qur'an 4:11"],
  ['Daughters (2+)', '2/3 (no sons)', '2/3', "Qur'an 4:11"],
  ['Son', 'Residue (double daughter)', 'Residue', "Qur'an 4:11"],
  ['Full Sister (1)', '1/2 (if no closer heirs)', '1/2', "Qur'an 4:176"],
]

const faqs = [
  {
    q: 'What is awl (proportional reduction)?',
    a: 'When the sum of all fixed shares exceeds the estate, the shares are proportionally reduced so they sum to the estate. This is called awl (العَوْل) — the consensus of the Companions, adopted by all schools.',
  },
  {
    q: 'What is radd (return)?',
    a: 'When the fixed shares do not exhaust the estate and there are no residuary heirs, the remainder is returned proportionally to the fixed-share heirs. This is called radd (الرَّدّ). Scholars differ on whether the husband or wife shares in it; this calculator returns it to the other fixed-share heirs only, and shows it as a remainder when a spouse is the only heir.',
  },
  {
    q: 'Who is excluded from inheritance?',
    a: 'A murderer of the deceased, an apostate (those who leave Islam), and non-Muslims cannot inherit from a Muslim. These are the three main exclusions.',
  },
  {
    q: "Does a will override Qur'anic shares?",
    a: "No — the Qur'anic shares (fara'id) are mandatory and cannot be altered by a will. However, a Muslim may leave up to one-third of their estate to non-heirs through a valid wasiyyah (bequest).",
  },
]
</script>

<style scoped>
.inh-heir {
  flex: 0 1 45%;
}

.inh-message {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  padding: var(--space-4) 0;
}

.inh-rule,
.inh-each {
  font-size: 11px;
  font-weight: 400;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.55);
}

@media (max-width: 900px) {
  #inh-layout {
    grid-template-columns: 1fr !important;
  }

  #inh-layout > div:last-child {
    position: static !important;
  }
}
</style>
