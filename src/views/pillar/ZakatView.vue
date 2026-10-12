<template>
  <div>
    <div class="page-header pillar-header-zakat">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div
          class="pillar-num-badge"
          style="background: var(--zakat-light); color: var(--zakat-color)"
        >
          {{ c('header.pillar3Of5') }}
        </div>
        <h1>{{ c('header.zakatObligatoryAlmsgiving') }}</h1>
        <p>
          {{ c('header.theThirdPillarAnAnnual2') }}
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <QuranBlock
        arabic="خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا"
        reference="Qur'an 9:103"
        :translation="c('header.takeFromTheirWealthACharity')"
        :note="c('header.theDirectDivineCommandEstablishingZakat')"
        style="max-width: 860px; margin-bottom: 2rem"
      />

      <!-- Controls -->
      <div class="card" style="margin-bottom: 1rem">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            margin-bottom: 12px;
          "
        >
          <div>
            <div class="ctrl-label">{{ $t('zakat.currency') }}</div>
            <div class="btn-group">
              <button
                v-for="c in currencies"
                :key="c.code"
                class="pill-btn"
                :class="{ active: store.currency === c.code }"
                @click="selectCurrency(c)"
              >
                {{ c.sym }} {{ c.code }}
              </button>
            </div>
          </div>
          <div>
            <div class="ctrl-label" style="text-align: right">{{ $t('zakat.nisabMethod') }}</div>
            <div class="btn-group">
              <button
                class="pill-btn"
                :class="{ active: store.nisabMethod === 'gold' }"
                @click="store.setNisabMethod('gold')"
              >
                {{ $t('zakat.gold85g') }}
              </button>
              <button
                class="pill-btn"
                :class="{ active: store.nisabMethod === 'silver' }"
                @click="store.setNisabMethod('silver')"
              >
                {{ $t('zakat.silver595g') }}
              </button>
            </div>
          </div>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            border-top: 1px solid var(--border);
            padding-top: 12px;
            flex-wrap: wrap;
            gap: 8px;
          "
        >
          <div>
            <div class="ctrl-label">{{ $t('zakat.nisabThreshold') }}</div>
            <span
              style="
                font-family: var(--serif);
                font-size: 1.6rem;
                font-weight: 600;
                color: var(--green);
              "
              >{{ store.fmt(store.nisabValue) }}</span
            >
            <span style="font-size: 12px; color: var(--muted); margin-left: 6px">
              {{
                store.nisabMethod === 'gold'
                  ? `85g × ${store.sym}${store.goldLocal.toFixed(2)}/g`
                  : `595g × ${store.sym}${store.silverLocal.toFixed(2)}/g`
              }}
            </span>
          </div>
          <div style="text-align: right">
            <div class="ctrl-label">{{ $t('zakat.goldPrice') }}</div>
            <span>{{ store.sym }}{{ store.goldLocal.toFixed(2) }}/g</span>
          </div>
        </div>
        <ZakatPriceStatus
          :metals-fetched="store.metalsFetched"
          :rates-fetched="store.ratesFetched"
          :date="store.pricesDate"
          :loading="store.pricesLoading"
          :custom="customMetals"
          :saved="store.pricesSaved"
        />
        <p v-if="store.currency === 'NGN'" class="rate-note">
          {{ $t('zakat.nairaPricesUseTheOfficialExchange') }}
        </p>
        <div
          style="
            font-size: 11.5px;
            color: #bbb;
            margin-top: 8px;
            line-height: 1.5;
            border-top: 1px solid var(--border);
            padding-top: 8px;
          "
        >
          {{ $t('zakat.goldNisabHanafiShafiIHanbali') }}<HadithRef text="Sahih Bukhari 1454" />)
        </div>
      </div>

      <!-- Calculator layout -->
      <div class="calc-layout">
        <div>
          <!-- Cash -->
          <ZakatAccordion
            :title="$t('zakat.cashBankSavings')"
            :sub="c('header.allLiquidMoneyYouHold')"
            icon="💵"
            icon-class="ai-teal"
            :total="store.fmt(zakat.cashTotal)"
            :start-open="true"
          >
            <template #reference
              ><strong>{{ $t('zakat.qurAn9103') }} <HadithRef text="Sahih Bukhari 1454" /></strong>
              {{ $t('zakat.cashAndBankBalancesHeldAbove') }}
            </template>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.cashAtHome') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.cashHome"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.currentAccounts') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.cashCurrent"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.savingsAccounts') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.cashSavings"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.foreignCurrencyConverted') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.cashForeign"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Money owed -->
          <ZakatAccordion
            :title="$t('zakat.moneyOwedToYou')"
            :sub="c('header.loansGivenExpectedIncome')"
            icon="💸"
            icon-class="ai-blue"
            :total="store.fmt(zakat.owedTotal)"
          >
            <template #reference
              ><strong>{{ $t('zakat.scholarlyConsensusIjmaIbnQudamaAl') }}</strong>
              {{ $t('zakat.reliablyExpectedMoneyIsZakatableUncertain') }}
            </template>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.loansGivenExpectedBack') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.loansGiven"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.unpaidSalaryIncome') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.unpaidIncome"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
            <div class="field-grid field-grid-1">
              <div class="field">
                <label>{{ $t('zakat.otherReceivables') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.otherOwed"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Gold & Silver -->
          <ZakatAccordion
            :title="$t('zakat.goldSilver')"
            :sub="c('header.jewelleryBarsCoinsPricedPerGram')"
            icon="✦"
            icon-class="ai-amber"
            :total="store.fmt(zakat.metalsTotal)"
          >
            <template #reference
              ><strong>{{ $t('zakat.qurAn934') }} <HadithRef text="Abu Dawud 1558" /></strong>
              {{ $t('zakat.goldAndSilverAreZakatableHanafi') }}
            </template>
            <div class="metal-tiles">
              <div class="metal-tile">
                <div class="mt-name">{{ $t('zakat.gold24ctGram') }}</div>
                <div class="mt-price">
                  {{ store.sym }}{{ store.goldLocal.toFixed(2)
                  }}<span class="mt-unit"> {{ $t('zakat.gram') }}</span>
                </div>
              </div>
              <div class="metal-tile">
                <div class="mt-name">{{ $t('zakat.silverPerGram') }}</div>
                <div class="mt-price">
                  {{ store.sym }}{{ store.silverLocal.toFixed(2)
                  }}<span class="mt-unit"> {{ $t('zakat.gram') }}</span>
                </div>
              </div>
            </div>
            <ZakatPriceStatus
              :metals-fetched="store.metalsFetched"
              :rates-fetched="store.ratesFetched"
              :date="store.pricesDate"
              :loading="store.pricesLoading"
              :custom="customMetals"
              :saved="store.pricesSaved"
            />
            <div class="field-grid">
              <div class="field">
                <label for="typed-gold">{{ $t('zakat.yourOwnGoldPricePerGram') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    id="typed-gold"
                    type="text"
                    inputmode="decimal"
                    class="input-field"
                    v-model.trim="typedPrice.gold"
                    :aria-invalid="typedPriceRejected.gold"
                    :placeholder="$t('zakat.usesTheFetchedPrice')"
                    @input="applyTypedPrice('gold')"
                  />
                </div>
                <div v-if="typedPriceRejected.gold" class="hint hint-error" role="alert">
                  {{ $t('zakat.enterAPriceAboveZeroThe') }}
                </div>
              </div>
              <div class="field">
                <label for="typed-silver">{{ $t('zakat.yourOwnSilverPricePerGram') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    id="typed-silver"
                    type="text"
                    inputmode="decimal"
                    class="input-field"
                    v-model.trim="typedPrice.silver"
                    :aria-invalid="typedPriceRejected.silver"
                    :placeholder="$t('zakat.usesTheFetchedPrice')"
                    @input="applyTypedPrice('silver')"
                  />
                </div>
                <div v-if="typedPriceRejected.silver" class="hint hint-error" role="alert">
                  {{ $t('zakat.enterAPriceAboveZeroThe') }}
                </div>
              </div>
            </div>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.goldPurity') }}</label>
                <select class="select-field" v-model.number="fields.goldPurity">
                  <option :value="1">{{ $t('zakat.24ctPure999') }}</option>
                  <option :value="0.9167">{{ $t('zakat.22ct917') }}</option>
                  <option :value="0.75">{{ $t('zakat.18ct75') }}</option>
                  <option :value="0.375">{{ $t('zakat.9ct375') }}</option>
                </select>
              </div>
              <div class="field">
                <label>{{ $t('zakat.goldWeightGrams') }}</label
                ><input
                  type="number"
                  class="input-field"
                  v-model.number="fields.goldGrams"
                  min="0"
                  step="0.1"
                  placeholder="0"
                />
              </div>
            </div>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.silverWeightGrams') }}</label
                ><input
                  type="number"
                  class="input-field"
                  v-model.number="fields.silverGrams"
                  min="0"
                  step="0.1"
                  placeholder="0"
                />
              </div>
              <div class="field">
                <label>{{ $t('zakat.knownTotalValueOptional') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.metalsDirect"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
                <div class="hint">{{ $t('zakat.enterIfYouAlreadyKnowThe') }}</div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Investments -->
          <ZakatAccordion
            :title="$t('zakat.investmentsShares')"
            :sub="c('header.stocksIsasPensionsBusinessAssets')"
            icon="📈"
            icon-class="ai-purple"
            :total="store.fmt(zakat.investTotal)"
          >
            <template #reference
              ><strong>{{ $t('zakat.aaoifiStandardNo35SheikhAl') }}</strong>
              {{ $t('zakat.shares25OfMarketValue') }}
            </template>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.sharesStocksMarketValue') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.shares"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.isasUnitTrusts') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.isas"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.businessTradeGoods') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.inventory"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.pensionAccessibleOnly') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.pension"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
                <div class="hint">{{ $t('zakat.includeOnlyIfCurrentlyWithdrawable') }}</div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Debts -->
          <ZakatAccordion
            :title="$t('zakat.debtsLiabilities')"
            :sub="c('header.deductedFromYourZakatableTotal')"
            icon="➖"
            icon-class="ai-coral"
            :total="zakat.debtsTotal > 0 ? '−' + store.fmt(zakat.debtsTotal) : ''"
          >
            <template #reference
              ><strong>{{ $t('zakat.alNawawiShafiIAlKasani') }}</strong>
              {{ $t('zakat.immediateDebtsDueWithinTheYear') }}
            </template>
            <div class="field-grid">
              <div class="field">
                <label>{{ $t('zakat.loansOwedDueThisYear') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.loansDue"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.creditCardBalances') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.creditCards"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.overdueRentBills') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.bills"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div class="field">
                <label>{{ $t('zakat.otherImmediateDebts') }}</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    type="number"
                    class="input-field"
                    v-model.number="fields.otherDebts"
                    min="0"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </ZakatAccordion>
        </div>
        <!-- end left col -->

        <!-- Sidebar results -->
        <div class="calc-sidebar">
          <div class="results-card">
            <div class="rc-header">
              <span class="rc-title">{{ $t('zakat.yourZakat') }}</span>
              <span class="rc-rate">{{ $t('zakat.25140th') }}</span>
            </div>
            <div class="rc-body">
              <div class="hawl-warn">
                ⚠ <strong>{{ $t('zakat.hawl') }}</strong> {{ $t('zakat.zakatIsOnlyDueAfterYour') }}
              </div>
              <div class="result-box" :class="zakat.obligated ? 'result-due' : 'result-none'">
                <div class="rb-label">
                  {{
                    zakat.obligated
                      ? $t('zakat.due')
                      : zakat.net > 0
                        ? $t('zakat.belowNisab')
                        : $t('zakat.enterAssets')
                  }}
                </div>
                <div :class="zakat.obligated ? 'rb-amount' : 'rb-empty'">
                  {{
                    zakat.obligated
                      ? store.fmt(zakat.zakatDue)
                      : zakat.net > 0
                        ? $t('zakat.belowThreshold')
                        : '—'
                  }}
                </div>
              </div>
              <div class="progress-bar" style="margin: 10px 0 3px">
                <div class="progress-fill" :style="{ width: zakat.progressPct + '%' }"></div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  font-size: 10.5px;
                  color: #bbb;
                  margin-bottom: 12px;
                "
              >
                <span>{{ store.fmt(0) }}</span>
                <span>{{ store.fmt(store.nisabValue / 2) }}</span>
                <span>{{ $t('zakat.nisab', { a: store.fmt(store.nisabValue) }) }}</span>
              </div>
              <div
                v-for="row in breakdown"
                :key="row.label"
                class="brow"
                :class="{ bd: row.deduct, bt: row.bold, bh: row.highlight }"
              >
                <span class="bl">{{ row.label }}</span>
                <span class="bv">{{
                  row.value > 0 ? (row.deduct ? '−' : '') + store.fmt(row.value) : '—'
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- calc-layout -->

      <!-- Education below calculator -->
      <div style="max-width: 860px; margin-top: 3rem">
        <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
        <span class="eyebrow">{{ c('scholarship.scholarship') }}</span
        ><UntranslatedNote v-if="untranslated('scholarship')" />
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          {{ c('scholarship.whoReceivesZakat') }}
        </h2>
        <p class="prose" style="margin-bottom: 1.5rem">
          {{ c('scholarship.theQurAn960Identifies') }}
        </p>
        <div
          class="card-grid anim-target"
          style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))"
        >
          <div v-for="r in recipients" :key="r.title" class="card">
            <h4
              style="
                font-family: var(--serif);
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 0.3rem;
              "
            >
              {{ r.title }}
            </h4>
            <p style="font-size: 12.5px; color: var(--muted)"><HadithRef :text="r.desc" /></p>
          </div>
        </div>

        <FaqList :faqs="faqs" style="margin-top: 1.5rem" />

        <div class="cta-strip anim-target" style="margin-top: 2.5rem">
          <GeoPattern />
          <h2>{{ c('scholarship.continueToTheFourthPillar') }}</h2>
          <p>{{ c('scholarship.sawmFastingDuringTheBlessedMonth') }}</p>
          <RouterLink to="/fasting" class="btn btn-white btn-lg">{{
            c('scholarship.exploreFasting')
          }}</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useContent } from '@/composables/useContent.js'
import UntranslatedNote from '@/components/UntranslatedNote.vue'
import content from '@/data/content/zakat/en.js'
import { reactive, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { calculateZakat, parseCustomPrice } from '@/utils/zakat.js'
import { track } from '@/composables/useStats.js'
import { t } from '@/i18n.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import ZakatAccordion from '@/components/ZakatAccordion.vue'
import ZakatPriceStatus from '@/components/ZakatPriceStatus.vue'

const { c, list, untranslated } = useContent('zakat', content)

useSeo('zakat')
useScrollReveal()

const store = useZakatStore()
onMounted(store.fetchPrices)

const currencies = [
  { code: 'GBP', sym: '£' },
  { code: 'USD', sym: '$' },
  { code: 'EUR', sym: '€' },
  { code: 'SAR', sym: '﷼' },
  { code: 'NGN', sym: '₦' },
]

const typedPrice = reactive({ gold: '', silver: '' })
const typedPriceRejected = reactive({ gold: false, silver: false })

const customMetals = computed(() =>
  ['gold', 'silver'].filter((metal) => store.customPerGram[metal] !== null),
)

function applyTypedPrice(metal) {
  const price = parseCustomPrice(typedPrice[metal])
  typedPriceRejected[metal] = price === undefined
  if (price !== undefined) {
    store.setCustomPrice(metal, price)
  }
}

function selectCurrency(c) {
  store.setCurrency(c.code, c.sym)
  typedPrice.gold = ''
  typedPrice.silver = ''
  typedPriceRejected.gold = false
  typedPriceRejected.silver = false
}

const fields = reactive({
  cashHome: 0,
  cashCurrent: 0,
  cashSavings: 0,
  cashForeign: 0,
  loansGiven: 0,
  unpaidIncome: 0,
  otherOwed: 0,
  goldGrams: 0,
  goldPurity: 0.9167,
  silverGrams: 0,
  metalsDirect: 0,
  shares: 0,
  isas: 0,
  inventory: 0,
  pension: 0,
  loansDue: 0,
  creditCards: 0,
  bills: 0,
  otherDebts: 0,
})

const zakat = computed(() =>
  calculateZakat(
    fields,
    { goldPerGram: store.goldLocal, silverPerGram: store.silverLocal },
    store.nisabMethod,
  ),
)

const breakdown = computed(() => [
  {
    label: t('zakat.breakdown.cashSavings'),
    value: zakat.value.cashTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.moneyOwed'),
    value: zakat.value.owedTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.goldSilver'),
    value: zakat.value.metalsTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.investments'),
    value: zakat.value.investTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.grossZakatable'),
    value: zakat.value.gross,
    deduct: false,
    bold: true,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.lessDebts'),
    value: zakat.value.debtsTotal,
    deduct: true,
    bold: true,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.netZakatable'),
    value: zakat.value.net,
    deduct: false,
    bold: true,
    highlight: false,
  },
  {
    label: t('zakat.breakdown.zakatDue'),
    value: zakat.value.zakatDue,
    deduct: false,
    bold: true,
    highlight: true,
  },
])

// Track Zakat result reached (once per page visit)
let zakatTracked = false
watch(zakat, (val) => {
  if (!zakatTracked && val.obligated) {
    track('zakat result reached')
    zakatTracked = true
  }
})

const recipients = computed(() => list('recipients'))

const faqs = computed(() => list('faqs'))
</script>

<style scoped>
.rate-note {
  margin: var(--space-2) 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted);
}

.field .hint-error {
  color: var(--red);
}
</style>
