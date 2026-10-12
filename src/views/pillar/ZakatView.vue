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
          Pillar 3 of 5 &nbsp;·&nbsp; الزكاة
        </div>
        <h1>Zakat — Obligatory Almsgiving</h1>
        <p>
          The third pillar — an annual 2.5% levy on zakatable wealth above the Nisab threshold,
          obligatory on every Muslim who meets the conditions.
        </p>
      </div>
    </div>

    <div class="content-wrap" style="max-width: 1100px">
      <QuranBlock
        arabic="خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا"
        reference="Qur'an 9:103"
        translation="Take from their wealth a charity by which you purify them and cause them increase."
        note="The direct divine command establishing Zakat."
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
            <div class="ctrl-label">Currency</div>
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
            <div class="ctrl-label" style="text-align: right">Nisab method</div>
            <div class="btn-group">
              <button
                class="pill-btn"
                :class="{ active: store.nisabMethod === 'gold' }"
                @click="store.setNisabMethod('gold')"
              >
                Gold (85g)
              </button>
              <button
                class="pill-btn"
                :class="{ active: store.nisabMethod === 'silver' }"
                @click="store.setNisabMethod('silver')"
              >
                Silver (595g)
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
            <div class="ctrl-label">Nisab threshold</div>
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
            <div class="ctrl-label">Gold price</div>
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
          Naira prices use the official exchange rate. The price a local dealer quotes can differ,
          so you can type your own price per gram under Gold &amp; Silver below.
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
          Gold nisab: Hanafi/Shafi'i/Hanbali/Maliki majority — 85g of 24ct gold &nbsp;·&nbsp; Silver
          nisab: Some Hanafi scholars — 595g silver (<HadithRef text="Sahih Bukhari 1454" />)
        </div>
      </div>

      <!-- Calculator layout -->
      <div class="calc-layout">
        <div>
          <!-- Cash -->
          <ZakatAccordion
            title="Cash & Bank Savings"
            sub="All liquid money you hold"
            icon="💵"
            icon-class="ai-teal"
            :total="store.fmt(zakat.cashTotal)"
            :start-open="true"
          >
            <template #reference
              ><strong>Qur'an 9:103 · <HadithRef text="Sahih Bukhari 1454" /></strong> Cash and bank
              balances held above Nisab for a full lunar year are zakatable at 2.5%.
            </template>
            <div class="field-grid">
              <div class="field">
                <label>Cash at home</label>
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
                <label>Current accounts</label>
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
                <label>Savings accounts</label>
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
                <label>Foreign currency (converted)</label>
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
            title="Money Owed To You"
            sub="Loans given, expected income"
            icon="💸"
            icon-class="ai-blue"
            :total="store.fmt(zakat.owedTotal)"
          >
            <template #reference
              ><strong>Scholarly consensus (ijma') · Ibn Qudama, Al-Mughni</strong> Reliably
              expected money is zakatable. Uncertain receivables: exclude until received.
            </template>
            <div class="field-grid">
              <div class="field">
                <label>Loans given (expected back)</label>
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
                <label>Unpaid salary / income</label>
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
                <label>Other receivables</label>
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
            title="Gold & Silver"
            sub="Jewellery, bars, coins — priced per gram"
            icon="✦"
            icon-class="ai-amber"
            :total="store.fmt(zakat.metalsTotal)"
          >
            <template #reference
              ><strong>Qur'an 9:34 · <HadithRef text="Abu Dawud 1558" /></strong> Gold and silver
              are zakatable. Hanafi: worn women's ornaments exempt. Shafi'i/Hanbali/Maliki: all gold
              zakatable.
            </template>
            <div class="metal-tiles">
              <div class="metal-tile">
                <div class="mt-name">Gold · 24ct/gram</div>
                <div class="mt-price">
                  {{ store.sym }}{{ store.goldLocal.toFixed(2) }}<span class="mt-unit"> /gram</span>
                </div>
              </div>
              <div class="metal-tile">
                <div class="mt-name">Silver · per gram</div>
                <div class="mt-price">
                  {{ store.sym }}{{ store.silverLocal.toFixed(2)
                  }}<span class="mt-unit"> /gram</span>
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
                <label for="typed-gold">Your own gold price per gram (optional)</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    id="typed-gold"
                    type="text"
                    inputmode="decimal"
                    class="input-field"
                    v-model.trim="typedPrice.gold"
                    :aria-invalid="typedPriceRejected.gold"
                    placeholder="Uses the fetched price"
                    @input="applyTypedPrice('gold')"
                  />
                </div>
                <div v-if="typedPriceRejected.gold" class="hint hint-error" role="alert">
                  Enter a price above zero. The fetched price is still in use.
                </div>
              </div>
              <div class="field">
                <label for="typed-silver">Your own silver price per gram (optional)</label>
                <div class="pfx-wrap">
                  <span class="pfx">{{ store.sym }}</span
                  ><input
                    id="typed-silver"
                    type="text"
                    inputmode="decimal"
                    class="input-field"
                    v-model.trim="typedPrice.silver"
                    :aria-invalid="typedPriceRejected.silver"
                    placeholder="Uses the fetched price"
                    @input="applyTypedPrice('silver')"
                  />
                </div>
                <div v-if="typedPriceRejected.silver" class="hint hint-error" role="alert">
                  Enter a price above zero. The fetched price is still in use.
                </div>
              </div>
            </div>
            <div class="field-grid">
              <div class="field">
                <label>Gold purity</label>
                <select class="select-field" v-model.number="fields.goldPurity">
                  <option :value="1">24ct — pure (99.9%)</option>
                  <option :value="0.9167">22ct (91.7%)</option>
                  <option :value="0.75">18ct (75%)</option>
                  <option :value="0.375">9ct (37.5%)</option>
                </select>
              </div>
              <div class="field">
                <label>Gold weight (grams)</label
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
                <label>Silver weight (grams)</label
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
                <label>Known total value (optional)</label>
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
                <div class="hint">Enter if you already know the total</div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Investments -->
          <ZakatAccordion
            title="Investments & Shares"
            sub="Stocks, ISAs, pensions, business assets"
            icon="📈"
            icon-class="ai-purple"
            :total="store.fmt(zakat.investTotal)"
          >
            <template #reference
              ><strong>AAOIFI Standard No. 35 · Sheikh al-Qaradawi</strong>
              Shares: 2.5% of market value (simplified, widely accepted). Business trade goods: 2.5%
              of current market value. Pension: include only if accessible.
            </template>
            <div class="field-grid">
              <div class="field">
                <label>Shares / stocks (market value)</label>
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
                <label>ISAs / unit trusts</label>
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
                <label>Business trade goods</label>
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
                <label>Pension (accessible only)</label>
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
                <div class="hint">Include only if currently withdrawable</div>
              </div>
            </div>
          </ZakatAccordion>

          <!-- Debts -->
          <ZakatAccordion
            title="Debts & Liabilities"
            sub="Deducted from your zakatable total"
            icon="➖"
            icon-class="ai-coral"
            :total="zakat.debtsTotal > 0 ? '−' + store.fmt(zakat.debtsTotal) : ''"
          >
            <template #reference
              ><strong>Al-Nawawi (Shafi'i) · Al-Kasani (Hanafi)</strong> Immediate debts due within
              the year reduce zakatable wealth. For mortgages: deduct only the current year's
              instalment.
            </template>
            <div class="field-grid">
              <div class="field">
                <label>Loans owed (due this year)</label>
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
                <label>Credit card balances</label>
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
                <label>Overdue rent / bills</label>
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
                <label>Other immediate debts</label>
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
              <span class="rc-title">Your Zakat</span>
              <span class="rc-rate">2.5% · 1/40th</span>
            </div>
            <div class="rc-body">
              <div class="hawl-warn">
                ⚠ <strong>Hawl:</strong> Zakat is only due after your wealth has exceeded Nisab for
                one complete lunar year (~354 days).
              </div>
              <div class="result-box" :class="zakat.obligated ? 'result-due' : 'result-none'">
                <div class="rb-label">
                  {{
                    zakat.obligated
                      ? 'Zakat is due — 2.5% of net zakatable wealth:'
                      : zakat.net > 0
                        ? 'Below Nisab — no obligation this year'
                        : 'Enter your assets to begin'
                  }}
                </div>
                <div :class="zakat.obligated ? 'rb-amount' : 'rb-empty'">
                  {{
                    zakat.obligated
                      ? store.fmt(zakat.zakatDue)
                      : zakat.net > 0
                        ? 'Below threshold'
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
                <span>{{ store.fmt(store.nisabValue) }} (Nisab)</span>
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
        <span class="eyebrow">SCHOLARSHIP</span>
        <h2
          class="section-title"
          style="font-size: clamp(1.5rem, 2.5vw, 1.9rem); margin-bottom: 1rem"
        >
          Who receives Zakat?
        </h2>
        <p class="prose" style="margin-bottom: 1.5rem">
          The Qur'an (9:60) identifies eight specific categories of Zakat recipients. Zakat cannot
          be spent on general charity that doesn't fall within these groups.
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
          <h2>Continue to the fourth pillar</h2>
          <p>Sawm — fasting during the blessed month of Ramadan.</p>
          <RouterLink to="/fasting" class="btn btn-white btn-lg">Explore Fasting →</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import { useZakatStore } from '@/stores/zakat.js'
import { calculateZakat, parseCustomPrice } from '@/utils/zakat.js'
import { track } from '@/composables/useStats.js'
import GeoPattern from '@/components/GeoPattern.vue'
import HadithRef from '@/components/HadithRef.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'
import ZakatAccordion from '@/components/ZakatAccordion.vue'
import ZakatPriceStatus from '@/components/ZakatPriceStatus.vue'

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
    label: 'Cash & savings',
    value: zakat.value.cashTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: 'Money owed',
    value: zakat.value.owedTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: 'Gold & silver',
    value: zakat.value.metalsTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: 'Investments',
    value: zakat.value.investTotal,
    deduct: false,
    bold: false,
    highlight: false,
  },
  {
    label: 'Gross zakatable',
    value: zakat.value.gross,
    deduct: false,
    bold: true,
    highlight: false,
  },
  {
    label: 'Less: debts',
    value: zakat.value.debtsTotal,
    deduct: true,
    bold: true,
    highlight: false,
  },
  {
    label: 'Net zakatable',
    value: zakat.value.net,
    deduct: false,
    bold: true,
    highlight: false,
  },
  {
    label: 'Zakat due (2.5%)',
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

const recipients = [
  {
    title: '1. Al-Fuqara',
    desc: 'The poor — little or no income',
  },
  {
    title: '2. Al-Masakin',
    desc: 'The needy — insufficient income',
  },
  {
    title: '3. Al-Amilin',
    desc: 'Zakat administrators',
  },
  {
    title: "4. Al-Mu'allafah",
    desc: 'Hearts to be reconciled to Islam',
  },
  {
    title: '5. Ar-Riqab',
    desc: 'Freeing of captives',
  },
  {
    title: '6. Al-Gharimin',
    desc: 'Overwhelmed by debt',
  },
  {
    title: '7. Fi Sabilillah',
    desc: 'In the cause of Allah',
  },
  {
    title: '8. Ibn Al-Sabil',
    desc: 'Stranded traveller',
  },
]

const faqs = [
  {
    q: 'What is the Nisab?',
    a: 'Nisab is the minimum wealth threshold for Zakat to be obligatory. It is set at 85g of 24ct gold (majority position) or 595g of silver (some Hanafi scholars). If your net zakatable wealth stays above Nisab for one lunar year (hawl), Zakat becomes due.',
  },
  {
    q: 'Is Zakat due on gold jewellery?',
    a: "Debated. Hanafi: regularly worn women's personal ornaments are exempt. Shafi'i, Hanbali, Maliki: all gold and silver are zakatable. The cautious approach is to include all gold.",
  },
  {
    q: 'Can I deduct my mortgage?',
    a: "Most scholars allow deducting only the portion currently due (current year's instalment), not the full outstanding balance. Credit cards and short-term debts that are currently owed are deductible in full.",
  },
  {
    q: 'What is the hawl?',
    a: 'The hawl is the completion of one full Islamic lunar year (~354 days). Zakat becomes due only when your net zakatable wealth has remained above Nisab continuously for this period. If it dips below, the hawl resets.',
  },
]
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
