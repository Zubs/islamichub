<template>
  <div>
    <div class="page-header pillar-header-hajj">
      <GeoPattern/>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background:var(--hajj-light);color:var(--hajj-color)">
          Pillar 5 of 5 &nbsp;·&nbsp; الحج
        </div>
        <h1>Hajj — The Pilgrimage</h1>
        <p>The fifth and final pillar — the pilgrimage to Makkah, obligatory once in a lifetime for
          every Muslim who is physically and financially able. Over 2 million pilgrims gather
          annually in the largest human gathering on Earth.</p>
      </div>
    </div>

    <div class="content-narrow">

      <QuranBlock
        arabic="وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا"
        reference="Qur'an 3:97"
        translation="And [due] to Allah from the people is a pilgrimage to the House — for whoever is able to find thereto a way."
        class="anim-target"
      />

      <!-- Conditions -->
      <div style="margin-top:2.5rem">
        <span class="eyebrow">The Obligation</span>
        <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">
          Conditions of obligation</h2>
        <p class="prose" style="margin-bottom:1.5rem">Hajj is obligatory once in a lifetime when all
          of the following conditions are met. "Istita'ah" (ability) is the key criterion.</p>
        <div class="card-grid anim-target"
             style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
          <div v-for="c in conditions" :key="c.title" class="card">
            <h4
              style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.35rem;color:var(--hajj-color)">
              {{ c.title }}</h4>
            <p style="font-size:12.5px;color:var(--muted);line-height:1.55">{{ c.desc }}</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Types of Hajj -->
      <span class="eyebrow">Types of Hajj</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">
        Three valid ways to perform Hajj</h2>
      <div class="card-grid card-grid-3 anim-target">
        <div class="card card-green" style="border-color:#B0D8C4">
          <h3
            style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem;color:var(--green)">
            Tamattu' (متمتع)</h3>
          <div
            style="font-size:11px;background:var(--green-light);color:var(--green);padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">
            Recommended for non-Makkans
          </div>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Perform Umrah first, exit
            ihram, then re-enter ihram for Hajj on the 8th of Dhul Hijjah. Requires slaughtering a
            hadiyah (sacrificial animal).</p>
        </div>
        <div class="card card-gold" style="border-color:#E0C87A">
          <h3
            style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem;color:var(--gold)">
            Qiran (قارن)</h3>
          <div
            style="font-size:11px;background:var(--gold-light);color:#7A5A10;padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">
            Combined Hajj &amp; Umrah
          </div>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Enter ihram for both Hajj
            and Umrah simultaneously at the Miqat. Do not exit ihram between the two. Also requires
            a hadiyah.</p>
        </div>
        <div class="card">
          <h3
            style="font-family:var(--serif);font-size:1.05rem;font-weight:600;margin-bottom:.5rem">
            Ifrad (مفرد)</h3>
          <div
            style="font-size:11px;background:var(--cream-dark);color:var(--muted);padding:2px 8px;border-radius:10px;display:inline-block;margin-bottom:.75rem;font-weight:600">
            Hajj only
          </div>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.6">Enter ihram for Hajj only.
            No Umrah is performed alongside it. No hadiyah required (though recommended).</p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Rites guide -->
      <span class="eyebrow">The Rites</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">
        Step-by-step guide to the rites</h2>
      <p class="prose" style="margin-bottom:1.5rem">Hajj spans five days — from the 8th to the 13th
        of Dhū al-Ḥijjah. Each rite corresponds to an action of the Prophet Ibrahim ﷺ or Muhammad
        ﷺ.</p>

      <!-- Day tabs -->
      <div class="btn-group" style="margin-bottom:1.5rem">
        <button
          v-for="(day, i) in days"
          :key="i"
          class="pill-btn"
          :class="{ active: activeDay === i }"
          @click="showRitesForDay(i)"
        >{{ day.tab }}
        </button>
      </div>

      <!-- Day panels -->
      <div>
        <div class="timeline anim-target">
          <div v-for="rite in currentDay.rites" :key="rite.name" class="tl-item">
            <div class="tl-marker"
                 :style="{ background: 'var(--hajj-light)', color: 'var(--hajj-color)' }">🕋
            </div>
            <div class="tl-content"><h4>{{ rite.name }}</h4>
              <p>{{ rite.desc }}</p></div>
          </div>
        </div>
        <div style="font-size:13px;font-weight:600;color:var(--hajj-color);margin-top:8px">
          {{ currentDay.title }}
        </div>
      </div>

      <div class="divider"></div>

      <!-- Umrah -->
      <span class="eyebrow">Lesser Pilgrimage</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">
        Umrah — العمرة</h2>
      <p class="prose" style="margin-bottom:1.5rem">Umrah is the lesser pilgrimage that can be
        performed at any time of year. It consists of four rites and is highly recommended (Sunnah
        mu'akkadah), though scholars differ on whether it is obligatory (Shafi'i and Hanbali:
        obligatory once; Hanafi and Maliki: Sunnah).</p>
      <div class="card-grid card-grid-4 anim-target">
        <div v-for="u in umrahRites" :key="u.num" class="card" style="text-align:center">
          <div
            style="width:36px;height:36px;background:var(--hajj-light);color:var(--hajj-color);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:1.1rem;font-weight:600;margin:0 auto var(--space-3)">
            {{ u.num }}
          </div>
          <div style="font-family:var(--serif);font-size:1rem;font-weight:600;margin-bottom:.3rem">
            {{ u.title }}
          </div>
          <div style="font-size:12.5px;color:var(--muted);line-height:1.5">{{ u.desc }}</div>
        </div>
      </div>

      <div class="divider"></div>
      <FaqList :faqs="faqs"/>

      <div class="cta-strip anim-target" style="margin-top:2.5rem">
        <GeoPattern/>
        <h2>Explore Islamic tools</h2>
        <p>Calculate your Zakat, check prayer times, find the Qibla, or plan your inheritance — all
          in one place.</p>
        <div class="btn-group" style="justify-content:center">
          <RouterLink to="/zakat" class="btn btn-white btn-lg">Zakat Calculator</RouterLink>
          <RouterLink to="/inheritance" class="btn btn-secondary btn-lg"
                      style="color:#fff;border-color:rgba(255,255,255,.3)">Inheritance
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

useSeo('hajj')
useScrollReveal()

const activeDay = ref(0)
const currentDay = ref({
  tab: 'Day 8',
  title: 'Day 8 — Yawm al-Tarwiyah (8 Dhul Hijjah)',
  rites: [
    {
      name: 'Ihram',
      desc: 'Enter the state of ritual consecration at the Miqat. Men wear two white unstitched cloths. Women wear modest everyday clothing. Make the intention and recite the Talbiyah: "Labbayk Allahumma labbayk..."'
    },
    {
      name: 'Travel to Mina',
      desc: 'Proceed to the valley of Mina, approximately 8km from Masjid al-Haram. Spend the night in Mina — this is Sunnah, not obligatory.'
    },
    {
      name: 'Prayers in Mina',
      desc: 'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina (shortened but not combined, per majority scholars).'
    },
  ],
})

const conditions = [
  {
    title: 'Islam',
    desc: 'Must be Muslim — Hajj performed by a non-Muslim is not valid.'
  },
  {
    title: 'Adulthood',
    desc: "Must be a baligh (pubescent) adult; children's Hajj is valid but does not fulfil the obligation."
  },
  {
    title: 'Sanity',
    desc: 'Must be of sound mind (aqil).'
  },
  {
    title: 'Freedom',
    desc: 'Historically: not enslaved. Today: applicable as personal autonomy'
  },
  {
    title: 'Physical ability',
    desc: 'Must be physically capable of completing the rites.'
  },
  {
    title: 'Financial ability',
    desc: "Must be able to finance the journey with expenses for dependants covered."
  },
  {
    title: 'Safety of route',
    desc: 'The journey must be reasonably safe.'
  },
  {
    title: 'Mahram (for women)',
    desc: "Majority view: women must have a mahram (husband or unmarriageable male relative). Hanafi: required at all times. Others: optional if safe group travel."
  },
]

const days = [
  {
    tab: 'Day 8',
    title: 'Day 8 — Yawm al-Tarwiyah (8 Dhul Hijjah)',
    rites: [
      {
        name: 'Ihram',
        desc: 'Enter the state of ritual consecration at the Miqat. Men wear two white unstitched cloths. Women wear modest everyday clothing. Make the intention and recite the Talbiyah: "Labbayk Allahumma labbayk..."'
      },
      {
        name: 'Travel to Mina',
        desc: 'Proceed to the valley of Mina, approximately 8km from Masjid al-Haram. Spend the night in Mina — this is Sunnah, not obligatory.'
      },
      {
        name: 'Prayers in Mina',
        desc: 'Pray Dhuhr, Asr, Maghrib, Isha, and Fajr in Mina (shortened but not combined, per majority scholars).'
      },
    ],
  },
  {
    tab: 'Day 9',
    title: 'Day 9 — Yawm Arafah (9 Dhul Hijjah) — THE HEART OF HAJJ',
    rites: [
      {
        name: 'Standing at Arafah (Wuquf)',
        desc: "The single most important rite of Hajj. The Prophet ﷺ said: 'Hajj is Arafah' (Ibn Majah). Must be present in the plain of Arafah at any time between Dhuhr and Maghrib. Spend time in dua, dhikr, and tawbah (repentance)."
      },
      {
        name: 'Combined Dhuhr & Asr',
        desc: 'Pray Dhuhr and Asr combined and shortened at Masjid Namirah, following the Sunnah of the Prophet ﷺ.'
      },
      {
        name: 'Muzdalifah',
        desc: 'After sunset, travel to Muzdalifah. Pray combined Maghrib and Isha. Collect 49–70 pebbles for the stoning. Spend the night under the open sky.'
      },
    ],
  },
  {
    tab: 'Day 10',
    title: 'Day 10 — Yawm al-Nahr (Eid al-Adha)',
    rites: [
      {
        name: 'Stoning the Large Jamarat',
        desc: 'Cast 7 pebbles at the largest pillar (Jamarat al-Aqabah) while saying "Allahu Akbar" with each throw. This symbolises the rejection of Shaytan.'
      },
      {
        name: 'Animal sacrifice (Nusuk)',
        desc: "Slaughter a sacrificial animal (or arrange for one to be slaughtered). This commemorates Ibrahim's ﷺ willingness to sacrifice his son."
      },
      {
        name: 'Shaving or cutting hair (Halq/Taqsir)',
        desc: 'Men shave their head or cut hair. Women cut a finger-length from their hair. This marks partial exit from ihram.'
      },
      {
        name: 'Tawaf al-Ifadah',
        desc: 'Perform 7 circuits of the Ka\'bah (tawaf) — this is an obligatory pillar (rukn) of Hajj.'
      },
      {
        name: "Sa'i",
        desc: 'Walk 7 times between Safa and Marwah, commemorating Hajar\'s search for water for her son Ismail ﷺ.'
      },
    ],
  },
  {
    tab: 'Days 11–13',
    title: "Days 11–13 — Ayyam al-Tashreeq (Staying in Mina)",
    rites: [
      {
        name: 'Stoning all three Jamaraat',
        desc: 'On each of the 11th, 12th, and (optionally) 13th, stone all three pillars with 7 pebbles each (21 pebbles per day), after Dhuhr.'
      },
      {
        name: 'Leaving early (Nafr Awwal)',
        desc: 'Those who wish may depart Mina on the 12th after stoning, before sunset. Those who remain must stone on the 13th as well.'
      },
      {
        name: 'Tawaf al-Wida (Farewell Tawaf)',
        desc: "The final rite before leaving Makkah — a farewell tawaf of 7 circuits. This is obligatory per majority scholars (Hanafi, Shafi'i, Hanbali); Maliki considers it Sunnah."
      },
    ],
  },
]

const umrahRites = [
  {
    num: '1',
    title: 'Ihram',
    desc: 'Enter ihram at the Miqat boundary with intention for Umrah'
  },
  {
    num: '2',
    title: 'Tawaf',
    desc: "Seven circuits of the Ka'bah counter-clockwise"
  },
  {
    num: "3",
    title: "Sa'i",
    desc: 'Seven walks between Safa and Marwah'
  },
  {
    num: '4',
    title: 'Halq/Taqsir',
    desc: 'Shave or cut hair to exit ihram'
  },
]

const faqs = [
  {
    q: "What happens if someone cannot perform Hajj?",
    a: "If a person meets the conditions of ability but genuinely cannot go due to illness or other circumstances, they may send someone (a proxy/badal) to perform Hajj on their behalf. If they later recover, they must still perform Hajj themselves if able."
  },
  {
    q: "Is Hajj valid if I committed sins before?",
    a: "Yes. The Prophet ﷺ said: 'Whoever performs Hajj without engaging in sexual relations or sinning, returns [home pure] as on the day his mother gave birth to him.' (Sahih Bukhari 1521)"
  },
  {
    q: "What is Miqat?",
    a: "Miqat (مِيقَات) refers to the five geographical boundaries designated by the Prophet ﷺ, within which pilgrims must enter ihram before proceeding to Makkah. Flying pilgrims should enter ihram at or before the point above the Miqat."
  },
  {
    q: "Can Hajj be performed on behalf of a deceased?",
    a: "Yes — proxy Hajj (hajj al-badal) is valid for a deceased person who met the conditions of obligation but died before performing Hajj. Ibn Abbas RA reported a woman asking the Prophet ﷺ about this and he permitted it (Sahih Bukhari 1513)."
  },
]

const showRitesForDay = (dayIndex) => {
  activeDay.value = dayIndex;
  currentDay.value = days[dayIndex];
}
</script>
