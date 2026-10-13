<template>
  <div>
    <div class="page-header" style="background: var(--ink); border-bottom: 3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background: var(--gold-light); color: var(--gold)">
          {{ c('header.islamicTool') }}
        </div>
        <h1>{{ c('header.faraIdIslamicInheritanceCalculator') }}</h1>
        <p>
          {{ c('header.calculateTheQurAnicSharesOf') }}
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <QuranBlock
        arabic="يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ"
        reference="Qur'an 4:11"
        :translation="c('header.allahInstructsYouConcerningYourChildren')"
        :note="c('header.theFoundationalVerseOfIslamicInheritance')"
        style="max-width: 860px; margin-bottom: 2rem"
      />

      <div
        style="display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start"
        id="inh-layout"
      >
        <!-- Left: heir selection -->
        <div>
          <span class="eyebrow">{{ $t('inheritance.step1') }}</span>
          <h2
            class="section-title"
            style="font-size: clamp(1.4rem, 2.5vw, 1.8rem); margin-bottom: 0.75rem"
          >
            {{ $t('inheritance.selectTheHeirsPresent') }}
          </h2>
          <p style="font-size: 14px; color: var(--muted); margin-bottom: 1.5rem">
            {{ $t('inheritance.toggleEachHeirPresentInThe') }}
          </p>

          <!-- Estate value -->
          <div class="card" style="margin-bottom: 1.25rem">
            <div class="field">
              <label>{{ $t('inheritance.totalEstateValueAfterDebtsFuneral') }}</label>
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
                {{ $t('inheritance.zakatOnAnyZakatablePortionsShould') }}
              </div>
            </div>
          </div>

          <!-- Heir groups -->
          <div v-for="group in heirGroups" :key="group.name" style="margin-bottom: 1.25rem">
            <div class="eyebrow" style="margin-bottom: 8px">
              {{ $t('inheritance.groups.' + group.name) }}
            </div>
            <div v-for="heir in group.heirs" :key="heir.key" class="heir-toggle">
              <div class="heir-info">
                <h3>{{ $t('inheritance.heirs.' + heir.key) }}</h3>
                <p>
                  <HadithRef :text="heir.desc" />
                  <span style="color: var(--gold); font-weight: 500"
                    >· <HadithRef :text="heir.quran"
                  /></span>
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
                  :aria-label="
                    $t(activeHeirs[heir.key] ? 'inheritance.remove' : 'inheritance.add', {
                      heir: $t('inheritance.heirs.' + heir.key),
                    })
                  "
                ></button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: results -->
        <div style="position: sticky; top: 84px">
          <div class="inheritance-results">
            <div class="inh-title">{{ $t('inheritance.inheritanceBreakdown') }}</div>
            <div v-if="outcome.error" class="inh-message" role="status">
              {{ problemText }}
            </div>
            <div v-for="r in results" :key="r.key" class="inh-row">
              <div class="inh-heir">
                {{ $t('inheritance.heirs.' + r.key)
                }}<span v-if="r.count > 1"> ×{{ r.count }}</span>
                <div class="inh-rule"><HadithRef :text="ruleSentence(r.ruleParts)" /></div>
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
              <span>{{ $t('inheritance.totalEstateDistributed') }}</span>
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
              {{ $t('inheritance.importantNote') }}
            </div>
            <p style="font-size: 13px; color: #5a3e0a; line-height: 1.6">
              {{ $t('inheritance.thisResultIsAGuideNot') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div style="max-width: 860px; margin-top: 3rem">
        <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
        <span class="eyebrow">{{ c('understandingFaraId.understandingFaraId') }}</span
        ><UntranslatedNote v-if="untranslated('understandingFaraId')" />
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          {{ c('understandingFaraId.theQurAnicSystemOfInheritance') }}
        </h2>
        <div class="prose">
          <p>
            {{ c('understandingFaraId.faraIdFromTheRootMeaning') }}
          </p>
          <p>
            {{ c('understandingFaraId.theSystemHasTwoMainCategories') }}
            <strong>{{ c('understandingFaraId.dhawuAlFurud') }}</strong>
            {{ c('understandingFaraId.thoseWithFixedQurAnicShares') }}
            <strong>{{ c('understandingFaraId.asaba') }}</strong>
            {{ c('understandingFaraId.residuariesWhoReceiveTheRemainderAfter') }}
          </p>
        </div>

        <HadithBlock reference="Sahih Bukhari 6732 · Abu Dawud 2898" style="margin: 1.5rem 0">
          {{ c('understandingFaraId.giveTheFaraIdTheShares') }}
        </HadithBlock>

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
          {{ c('understandingFaraId.fixedQurAnicSharesAtA') }}
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
                <th style="padding: 10px 14px; text-align: start; font-weight: 600">
                  {{ c('understandingFaraId.heir') }}
                </th>
                <th style="padding: 10px 14px; text-align: center; font-weight: 600">
                  {{ c('understandingFaraId.withChildren') }}
                </th>
                <th style="padding: 10px 14px; text-align: center; font-weight: 600">
                  {{ c('understandingFaraId.withoutChildren') }}
                </th>
                <th style="padding: 10px 14px; text-align: start; font-weight: 600">
                  {{ c('understandingFaraId.source') }}
                </th>
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
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/inheritance/en.js'
import { ref, reactive, computed, watch } from 'vue'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { track } from '@/composables/useStats.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import HadithBlock from '@/components/HadithBlock.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import { calcInheritance, HEIR_DEFS } from '@/utils/inheritance.js'
import { t } from '@/i18n.js'

const { c, list, untranslated } = useContent('inheritance', content)

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
const problemText = computed(() => {
  const problem = outcome.value.problem
  const heir = problem.params.heirKey ? t(`inheritance.heirs.${problem.params.heirKey}`) : undefined
  return t(`inheritance.problem.${problem.code}`, { ...problem.params, heir })
})

function ruleSentence({ base, share, extras, source }) {
  const sentence =
    t(`inheritance.rule.${base}`, { share }) +
    extras.map((extra) => t(`inheritance.extra.${extra}`)).join('')
  if (!source) {
    return sentence
  }

  const origin =
    source === 'Hadith'
      ? t('inheritance.source.hadith')
      : t('inheritance.source.quran', { reference: source })
  return `${sentence} · ${origin}`
}

function eachText(share) {
  const [first, ...rest] = share.each
  return rest.every((amount) => amount === first)
    ? t('inheritance.each', { amount: store.fmt(first) })
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
  return t(`inheritance.heirDesc.${key}`)
}

const sharesTable = computed(() => list('sharesTable'))

const faqs = computed(() => list('faqs'))
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
