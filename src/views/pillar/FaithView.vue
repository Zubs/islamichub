<template>
  <div>
    <div class="page-header pillar-header-faith">
      <GeoPattern/>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge"
             style="background:var(--faith-light);color:var(--faith-color)">
          Pillar 1 of 5 &nbsp;·&nbsp; الشهادة
        </div>
        <h1>Shahada — The Declaration of Faith</h1>
        <p>The first and foundational pillar of Islam: the testimony that there is no god but Allah,
          and that Muhammad ﷺ is His messenger.</p>
      </div>
    </div>

    <div class="content-narrow">

      <!-- Main Shahada -->
      <div class="quran-block frame-calligraphy anim-target"
           style="text-align:center;padding:2.5rem 2rem">
        <div class="corner-ornament top-left" aria-hidden="true"></div>
        <div class="corner-ornament top-right" aria-hidden="true"></div>
        <div class="corner-ornament bottom-left" aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div class="quran-arabic" style="font-size:2rem;text-align:center;letter-spacing:2px"
             lang="ar">
          أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ
        </div>
        <div class="quran-ref" style="text-align:center;margin-top:.75rem">The Shahada</div>
        <div class="quran-trans" style="text-align:center;font-size:16px">
          "I bear witness that there is no god but Allah, and I bear witness that Muhammad is the
          Messenger of Allah."
        </div>
      </div>

      <div style="margin-top:2.5rem">
        <span class="eyebrow">Foundation</span>
        <h2 class="section-title" style="font-size:clamp(1.6rem,3vw,2.1rem)">What is the
          Shahada?</h2>
        <div class="prose">
          <p>The Shahada (شَهَادَة, meaning "testimony") is the Islamic declaration of faith and the
            first of the Five Pillars of Islam. It consists of two inseparable clauses — Tawhid (the
            oneness of God) and Risala (the prophethood of Muhammad ﷺ).</p>
          <p>Pronouncing the Shahada with sincere belief and understanding is the entry point into
            Islam. It is the foundation upon which all other acts of worship stand. A person who
            dies believing in the Shahada is promised admission to Paradise (Sahih Bukhari 128).</p>
        </div>
      </div>

      <div class="hadith-block anim-target">
        <div class="hadith-source">Sahih Bukhari 128 · Sahih Muslim 26</div>
        <div class="hadith-text">"Whoever dies knowing that there is no god but Allah will enter
          Paradise." — The Prophet Muhammad ﷺ (narrated by Uthman ibn Affan RA)
        </div>
      </div>

      <div class="divider"></div>

      <!-- Two parts -->
      <span class="eyebrow">The Two Clauses</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1.5rem">
        Understanding each part</h2>
      <div class="card-grid card-grid-2 anim-target">
        <div class="card card-green" style="border-color:#B0D8C4">
          <div
            style="font-family:var(--serif);font-size:1.6rem;direction:rtl;text-align:right;margin-bottom:.75rem;color:var(--green)"
            lang="ar">لَا إِلَهَ إِلَّا اللَّهُ
          </div>
          <h3 style="font-family:var(--serif);margin-bottom:.5rem;color:var(--green)">Lā ilāha
            illallāh</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.65">There is no god but Allah.
            This is <strong>Tawhid</strong> — the absolute oneness and uniqueness of God. It negates
            all false deities and affirms that worship belongs to Allah alone.</p>
        </div>
        <div class="card card-gold" style="border-color:#E0C87A">
          <div
            style="font-family:var(--serif);font-size:1.6rem;direction:rtl;text-align:right;margin-bottom:.75rem;color:var(--gold)"
            lang="ar">مُحَمَّدٌ رَسُولُ اللَّهِ
          </div>
          <h3 style="font-family:var(--serif);margin-bottom:.5rem;color:var(--gold)">Muhammadun
            Rasūlullāh</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.65">Muhammad is the Messenger
            of Allah. This is <strong>Risala</strong> — the affirmation of prophethood. It means
            accepting the Qur'an as revelation and Muhammad ﷺ as the seal of all prophets.</p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Seven conditions -->
      <span class="eyebrow">Conditions of Validity</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">
        Seven conditions for the Shahada to be accepted</h2>
      <p class="prose" style="margin-bottom:1.5rem">Scholars have extracted seven conditions from
        the Qur'an and Sunnah that must be met for the Shahada to be valid — mere pronunciation
        without these is insufficient.</p>
      <div class="card-grid anim-target"
           style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
        <div v-for="c in conditions" :key="c.title" class="card">
          <div
            style="font-family:var(--serif);font-size:1.3rem;color:var(--green);direction:rtl;margin-bottom:.4rem"
            lang="ar">{{ c.arabic }}
          </div>
          <h4 style="font-family:var(--serif);font-size:.9rem;font-weight:600;margin-bottom:.4rem">
            {{ c.title }}</h4>
          <p style="font-size:12.5px;color:var(--muted);line-height:1.5">{{ c.desc }}</p>
        </div>
      </div>

      <div class="divider"></div>

      <!-- Tawhid -->
      <span class="eyebrow">Tawhid — Divine Oneness</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The
        three dimensions of Tawhid</h2>

      <QuranBlock
        arabic="قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ"
        reference="Qur'an 112:1–2"
        translation="Say: He is Allah, [who is] One. Allah, the Eternal Refuge."
        note="Surah Al-Ikhlas, described by the Prophet ﷺ as equal to one-third of the Qur'an in meaning (Sahih Bukhari 6267)."
      />

      <div class="timeline anim-target" style="margin-top:1.5rem">
        <div v-for="t in tawhidDimensions" :key="t.title" class="tl-item">
          <div class="tl-marker">{{ t.num }}</div>
          <div class="tl-content">
            <h4>{{ t.title }}</h4>
            <p>{{ t.desc }}</p>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- FAQ -->
      <span class="eyebrow">Common Questions</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:0">
        FAQ</h2>
      <FaqList :faqs="faqs"/>

      <!-- Six Articles of Faith card -->
      <div class="divider"></div>
      <span class="eyebrow">Go deeper</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">The
        Six Articles of Faith (Arkan al-Iman)</h2>
      <p class="prose" style="margin-bottom:1.5rem">
        Alongside the Shahada, a Muslim must hold six fundamental beliefs — the pillars of Iman
        defined in the Hadith of Jibril. They cover belief in Allah, the angels, the revealed
        scriptures, the prophets, the Day of Judgement, and divine decree (Qadr).
      </p>
      <RouterLink to="/faith/articles" class="aof-teaser-card anim-target">
        <div class="aof-teaser-left">
          <div class="aof-teaser-badge">أركان الإيمان</div>
          <h3 class="aof-teaser-title">The Six Articles of Faith</h3>
          <p class="aof-teaser-desc">A full in-depth guide to each article — with Qur'anic evidence,
            scholarly explanation, and key points for each belief.</p>
          <div class="aof-teaser-pills">
            <span v-for="a in articlePreviews" :key="a" class="aof-teaser-pill">{{ a }}</span>
          </div>
        </div>
        <div class="aof-teaser-arrow" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </RouterLink>

      <div class="cta-strip anim-target" style="margin-top:2.5rem">
        <GeoPattern/>
        <h2>Continue to the second pillar</h2>
        <p>Prayer (Salah) — five times daily, facing Makkah, the connection between servant and
          Creator.</p>
        <RouterLink to="/prayer" class="btn btn-white btn-lg">Explore Salah →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useSeo } from '@/composables/useSeo.js'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

useSeo('faith')
useScrollReveal()

const conditions = [
  {
    arabic: 'عِلْم',
    title: '1. Knowledge',
    desc: 'Knowing what the Shahada affirms and denies — understanding Tawhid.'
  },
  {
    arabic: 'يَقِين',
    title: '2. Certainty',
    desc: 'Absolute conviction, free from doubt or wavering.'
  },
  {
    arabic: 'إِخْلَاص',
    title: '3. Sincerity',
    desc: 'Pure intention for Allah alone, not for status or worldly gain.'
  },
  {
    arabic: 'صِدْق',
    title: '4. Truthfulness',
    desc: 'The heart aligning with what the tongue declares.'
  },
  {
    arabic: 'مَحَبَّة',
    title: '5. Love',
    desc: 'Loving Allah, His Messenger, and the obligations that come with the Shahada.'
  },
  {
    arabic: 'اِنْقِيَاد',
    title: '6. Submission',
    desc: 'Outward compliance and submission to the implications of the declaration.'
  },
  {
    arabic: 'قَبُول',
    title: '7. Acceptance',
    desc: 'Embracing everything the Shahada entails without rejection.'
  },
]

const tawhidDimensions = [
  {
    num: '1',
    title: 'Tawhid al-Rububiyyah — Oneness of Lordship',
    desc: 'The belief that Allah alone is the Creator, Sustainer, and Sovereign of all existence. No partner shares in His dominion.'
  },
  {
    num: '2',
    title: 'Tawhid al-Uluhiyyah — Oneness of Worship',
    desc: 'All acts of worship — prayer, supplication, sacrifice, hope, fear, love — belong exclusively to Allah. Directing any of these to other than Allah is shirk.'
  },
  {
    num: '3',
    title: "Tawhid al-Asma' wa'l-Sifat — Oneness of Names & Attributes",
    desc: "Allah's 99 names and attributes are affirmed as He described them in the Qur'an and Sunnah — without distortion, negation, asking how, or likening to creation."
  },
]

const faqs = [
  {
    q: 'Can non-Muslims say the Shahada?',
    a: "Yes — saying the Shahada with sincere belief is what makes a person Muslim. There is no formal ceremony required, though it is recommended to do so in front of witnesses. Ghusl (ritual bath) is recommended after conversion."
  },
  {
    q: 'Does the Shahada need to be in Arabic?',
    a: "The majority scholarly position is that understanding the meaning is essential, but the Arabic pronunciation is preferred as the authoritative form. Most scholars permit saying it in one's language initially, with learning the Arabic encouraged."
  },
  {
    q: 'What is shirk (association)?',
    a: "Shirk is the act of associating partners with Allah in worship, lordship, or attributes — the opposite of Tawhid. The Qur'an describes it as the only sin that is not forgiven if one dies upon it without repentance (4:48)."
  },
  {
    q: 'How many prophets were there?',
    a: "The Qur'an mentions 25 prophets by name. Hadith literature mentions 124,000 prophets were sent throughout history. Muhammad ﷺ is the last and final prophet — no prophet comes after him."
  },
]

const articlePreviews = [
  'Allah',
  'Angels',
  'Scriptures',
  'Prophets',
  'Day of Judgement',
  'Divine Decree'
]

</script>

<style scoped>
.aof-teaser-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  background: linear-gradient(135deg, var(--faith-light) 0%, #fff 100%);
  border: 1.5px solid var(--faith-color);
  border-radius: var(--radius-xl);
  text-decoration: none;
  color: inherit;
  transition: all .2s;
  margin-bottom: .5rem;
}

.aof-teaser-card:hover {
  box-shadow: var(--shadow);
  transform: translateY(-2px);
  background: linear-gradient(135deg, #e8e4f8 0%, #fff 100%);
}

.aof-teaser-left {
  flex: 1;
}

.aof-teaser-badge {
  font-family: var(--serif);
  font-size: .95rem;
  color: var(--faith-color);
  opacity: .7;
  margin-bottom: .4rem;
  direction: rtl;
  display: inline-block;
}

.aof-teaser-title {
  font-family: var(--serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: .4rem;
}

.aof-teaser-desc {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: .75rem;
  max-width: 520px;
}

.aof-teaser-pills {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

.aof-teaser-pill {
  font-size: 11.5px;
  padding: 3px 10px;
  background: rgba(99, 71, 178, .08);
  color: var(--faith-color);
  border-radius: 100px;
  font-weight: 500;
}

.aof-teaser-arrow {
  color: var(--faith-color);
  opacity: .6;
  flex-shrink: 0;
  transition: transform .2s;
}

.aof-teaser-card:hover .aof-teaser-arrow {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 540px) {
  .aof-teaser-arrow {
    display: none;
  }
}
</style>
