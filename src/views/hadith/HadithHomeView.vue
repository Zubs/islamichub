<template>
  <div>
    <div class="page-header" style="background:var(--ink);border-bottom:3px solid var(--gold)">
      <GeoPattern />
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge" style="background:var(--gold-light);color:var(--gold)">
          Islamic Sciences &nbsp;·&nbsp; علم الحديث
        </div>
        <h1>Hadith — The Prophetic Tradition</h1>
        <p>The second source of Islamic law and guidance: the recorded sayings, actions, and silent approvals of the Prophet Muhammad ﷺ, preserved through a rigorous chain of transmission spanning fourteen centuries.</p>
      </div>
    </div>

    <div class="content-narrow">

      <!-- CTA to library -->
      <div class="hadith-library-banner anim-target">
        <div class="hlb-left">
          <div class="hlb-eyebrow">Hadith Library</div>
          <div class="hlb-title">Browse 9 authentic collections</div>
          <div class="hlb-desc">Over 70,000 hadith across Sahih Bukhari, Sahih Muslim, the four Sunan, and more — searchable by book, chapter, and number.</div>
        </div>
        <RouterLink to="/hadith/books" class="btn btn-primary hlb-btn">
          Open Library →
        </RouterLink>
      </div>

      <!-- Foundation verse -->
      <QuranBlock
        arabic="وَمَا آتَاكُمُ الرَّسُولُ فَخُذُوهُ وَمَا نَهَاكُمْ عَنْهُ فَانتَهُوا"
        reference="Qur'an 59:7"
        translation="Whatever the Messenger gives you, take it; and whatever he forbids you, refrain from it."
        note="The foundational Qur'anic command to follow the Sunnah — making hadith preservation a religious obligation."
        class="anim-target"
      />

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- What is Hadith -->
      <span class="eyebrow">Definition</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem)">What is a Hadith?</h2>
      <div class="prose anim-target">
        <p>A <strong>Hadith</strong> (حَدِيث, plural: Ahadith) is a recorded report of the words, actions, or silent approvals of the Prophet Muhammad ﷺ. Together with the Qur'an, the body of authentic hadith constitutes the Sunnah — the second foundational source of Islamic law, theology, and practice.</p>
        <p>Each hadith has two components: the <strong>Isnad</strong> (إِسْنَاد — chain of transmission), which lists every narrator from the compiler back to the Prophet ﷺ, and the <strong>Matn</strong> (مَتْن — the actual text of the narration). Both must be examined for a hadith to be accepted.</p>
        <p>The hadith sciences ('Ulum al-Hadith — علوم الحديث) represent one of the most sophisticated systems of source criticism ever developed. Scholars built entire biographies of narrators (Rijal literature) to assess trustworthiness, memory, and character across chains spanning centuries.</p>
      </div>

      <!-- Two components -->
      <div class="card-grid card-grid-2 anim-target" style="margin-top:1.5rem">
        <div class="card card-green" style="border-color:#B0D8C4">
          <h3 style="font-family:var(--serif);font-size:1.1rem;font-weight:600;color:var(--green);margin-bottom:.5rem">الإسناد — Isnad</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.65;margin-bottom:.75rem">The chain of transmission — every person who passed the narration from one generation to the next. For example: "A told me that B told him that C said he heard the Prophet ﷺ say..."</p>
          <div style="font-size:12px;color:var(--green);font-style:italic">The isnad is examined for completeness, continuity, and the trustworthiness of each narrator.</div>
        </div>
        <div class="card card-gold" style="border-color:#E0C87A">
          <h3 style="font-family:var(--serif);font-size:1.1rem;font-weight:600;color:var(--gold);margin-bottom:.5rem">المتن — Matn</h3>
          <p style="font-size:13.5px;color:var(--muted);line-height:1.65;margin-bottom:.75rem">The actual content of the narration — the Prophet's ﷺ words, description of an action he performed, or account of something he saw and did not forbid (tacit approval).</p>
          <div style="font-size:12px;color:#7A5A10;font-style:italic">The matn is examined for conformity with the Qur'an, other authentic hadith, and established principles of Islamic law.</div>
        </div>
      </div>

      <div class="hadith-block anim-target" style="margin-top:1.5rem">
        <div class="hadith-source">Imam Abdullah ibn al-Mubarak (d. 181 AH)</div>
        <div class="hadith-text">"The isnad is part of the religion. Were it not for the isnad, anyone could say whatever they wished."</div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Three types -->
      <span class="eyebrow">Types of Hadith</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">What a Hadith records</h2>
      <div class="card-grid anim-target" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr))">
        <div v-for="t in hadithTypes" :key="t.title" class="card">
          <div style="font-family:var(--serif);font-size:1.5rem;color:var(--green);margin-bottom:.5rem" aria-hidden="true">{{ t.icon }}</div>
          <h4 style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:.3rem">{{ t.title }}</h4>
          <div style="font-size:12px;color:var(--gold);font-weight:500;margin-bottom:.3rem">{{ t.arabic }}</div>
          <p style="font-size:13px;color:var(--muted);line-height:1.55">{{ t.desc }}</p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Grades -->
      <span class="eyebrow">Authentication</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:.75rem">Grades of Hadith</h2>
      <p class="prose" style="margin-bottom:1.5rem">Hadith scholars developed precise criteria for assessing the authenticity of every narration. The primary grades are:</p>

      <div style="display:flex;flex-direction:column;gap:.75rem;margin-bottom:2rem" class="anim-target">
        <div v-for="g in grades" :key="g.title" class="hadith-grade-card">
          <div class="hgc-grade" :style="{ background: g.bg, color: g.color }">{{ g.title }}</div>
          <div class="hgc-arabic" lang="ar">{{ g.arabic }}</div>
          <div class="hgc-body">
            <div class="hgc-title">{{ g.meaning }}</div>
            <div class="hgc-desc">{{ g.desc }}</div>
          </div>
          <div class="hgc-ruling" :style="{ color: g.color }">{{ g.ruling }}</div>
        </div>
      </div>

      <!-- Conditions for Sahih -->
      <div class="card anim-target" style="margin-bottom:2rem">
        <span class="eyebrow" style="display:block;margin-bottom:.5rem">Five conditions for Sahih</span>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:.75rem">
          <div v-for="c in sahihConditions" :key="c.num" style="display:flex;gap:10px;align-items:flex-start">
            <div style="width:24px;height:24px;background:var(--green-light);color:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0">{{ c.num }}</div>
            <div>
              <div style="font-size:13.5px;font-weight:600;margin-bottom:2px">{{ c.title }}</div>
              <div style="font-size:12px;color:var(--muted)">{{ c.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Scholars -->
      <span class="eyebrow">The Great Scholars</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">Hadith scholars of the golden age</h2>
      <p class="prose" style="margin-bottom:1.5rem">Between the 2nd and 4th centuries AH, a generation of extraordinary scholars dedicated their lives to travelling thousands of miles, collecting narrations, and building the science of hadith verification.</p>

      <div class="card-grid anim-target" style="grid-template-columns:repeat(auto-fill,minmax(240px,1fr))">
        <div v-for="s in scholars" :key="s.name" class="card">
          <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:.75rem">
            <div class="scholar-badge">{{ s.initials }}</div>
            <div>
              <div style="font-family:var(--serif);font-size:1rem;font-weight:600;line-height:1.2;margin-bottom:2px">{{ s.name }}</div>
              <div style="font-size:12px;color:var(--muted)">{{ s.death }}</div>
            </div>
          </div>
          <div style="font-size:11px;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:.4px;margin-bottom:.35rem">{{ s.work }}</div>
          <p style="font-size:13px;color:var(--muted);line-height:1.55">{{ s.desc }}</p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Sciences of Hadith -->
      <span class="eyebrow">Hadith Sciences</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">'Ulum al-Hadith — علوم الحديث</h2>
      <p class="prose" style="margin-bottom:1.5rem">The study of hadith encompasses multiple interconnected sciences, each addressing a different aspect of preserving and authenticating the Prophetic tradition.</p>

      <div class="card-grid anim-target" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));margin-bottom:2rem">
        <div v-for="sci in sciences" :key="sci.title" class="card">
          <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--gold);margin-bottom:.3rem">{{ sci.arabic }}</div>
          <h4 style="font-family:var(--serif);font-size:.95rem;font-weight:600;margin-bottom:.35rem">{{ sci.title }}</h4>
          <p style="font-size:13px;color:var(--muted);line-height:1.55">{{ sci.desc }}</p>
        </div>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- FAQ -->
      <FaqList :faqs="faqs" />

      <!-- CTA to library -->
      <div class="cta-strip anim-target" style="margin-top:2.5rem">
        <GeoPattern />
        <h2>Explore the Hadith Library</h2>
        <p>Browse all 9 collections — Sahih Bukhari, Sahih Muslim, the four Sunan, and more — by book, chapter, and hadith number.</p>
        <RouterLink to="/hadith/books" class="btn btn-white btn-lg">Open the Library →</RouterLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink }      from 'vue-router'
import { useHead }         from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern          from '@/components/GeoPattern.vue'
import QuranBlock          from '@/components/QuranBlock.vue'
import FaqList             from '@/components/FaqList.vue'

useHead({
  title: "Hadith — Prophetic Tradition, Sciences & Library | IslamicHub",
  meta: [
    { name: 'description', content: "Learn what Hadith is, how it was preserved, the six grades (Sahih, Hasan, Da'eef), the great hadith scholars, and browse 9 authenticated collections including Sahih Bukhari and Sahih Muslim." },
  ],
})
useScrollReveal()

const hadithTypes = [
  { icon: '💬', title: "Qawli — Verbal",       arabic: 'القَوْلِي', desc: "The Prophet's ﷺ spoken words — rulings, supplications, reminders, and descriptions of the unseen." },
  { icon: '🤲', title: "Fi'li — Actions",       arabic: 'الفِعْلِي', desc: "Descriptions of what the Prophet ﷺ did — how he prayed, fasted, performed Hajj, dressed, and behaved." },
  { icon: '✅', title: "Taqriri — Tacit Approval",arabic: 'التَّقْرِيرِي', desc: "Things companions said or did in the Prophet's ﷺ presence that he did not forbid — constituting implicit approval." },
  { icon: '📋', title: "Wasfi — Description",   arabic: 'الوَصْفِي', desc: "Descriptions of the Prophet's ﷺ physical appearance, character, and personal qualities (the Shama'il literature)." },
]

const grades = [
  {
    title: 'Sahih',    arabic: 'صَحِيح',  meaning: 'Authentic',
    color: 'var(--green)', bg: 'var(--green-light)',
    desc: "Meets all five conditions: continuous chain (ittisal), narrator justice ('adala), precise memory (dabt), freedom from hidden defects (shudhudh), and freedom from irregularities ('illa).",
    ruling: 'Obligatory to act upon',
  },
  {
    title: 'Hasan',    arabic: 'حَسَن',   meaning: 'Good',
    color: '#7A5A10', bg: 'var(--gold-light)',
    desc: "Meets all Sahih conditions except the narrator's precision (dabt) is slightly lower — they are truthful but not perfectly precise. Acceptable as evidence in Islamic law.",
    ruling: 'Acceptable to act upon',
  },
  {
    title: "Da'eef",   arabic: 'ضَعِيف',  meaning: 'Weak',
    color: '#8B4513', bg: '#FDE9E7',
    desc: "Fails one or more conditions — a break in the chain, a narrator of questionable character or weak memory. Cannot be used as primary evidence in Islamic law.",
    ruling: 'Not used as primary evidence',
  },
  {
    title: 'Mawdu\'',  arabic: 'مَوْضُوع', meaning: 'Fabricated',
    color: '#c0392b', bg: '#fde8e8',
    desc: "Proven to be fabricated — attributed to the Prophet ﷺ falsely. Transmitting a fabricated hadith as authentic is a major sin. Must be identified and warned against.",
    ruling: 'Forbidden to transmit as authentic',
  },
  {
    title: 'Mutawatir', arabic: 'مُتَوَاتِر', meaning: 'Mass-transmitted',
    color: '#1a5276', bg: '#eaf2ff',
    desc: "Narrated by so many independent chains at every level that fabrication is impossible — e.g. the description of prayer, the Qur'an itself. The highest possible level of certainty.",
    ruling: 'Certainty (yaqin) — denying it is disbelief',
  },
]

const sahihConditions = [
  { num: 1, title: 'Continuous chain',      desc: 'Every narrator in the isnad actually met the one before them' },
  { num: 2, title: 'Just narrators',        desc: "Each narrator is Muslim, adult, sane, and free from major sins" },
  { num: 3, title: 'Precise memory',        desc: 'Each narrator has strong, reliable memory or written records' },
  { num: 4, title: 'No hidden defect',      desc: "No subtle flaw (shudhudh) that contradicts stronger narrations" },
  { num: 5, title: 'No irregularity',       desc: "No 'illa — hidden weakness undetected without deep expertise" },
]

const scholars = [
  {
    name: 'Imam Muhammad ibn Isma\'il al-Bukhari',
    initials: 'BK', death: '194–256 AH / 810–870 CE',
    work: 'Sahih Al-Bukhari',
    desc: "Examined 600,000 hadith; accepted only 7,563. Memorised 100,000 hadith with their chains from childhood. Spent 16 years compiling the Sahih, making every entry with a ritual bath and two rak'ahs of prayer.",
  },
  {
    name: 'Imam Muslim ibn al-Hajjaj',
    initials: 'MS', death: '202–261 AH / 817–875 CE',
    work: 'Sahih Muslim',
    desc: "A student of al-Bukhari. Compiled 300,000 hadith for his Sahih, selecting only 7,500 unique narrations. Organised thematically, making it the preferred reference for legal research.",
  },
  {
    name: 'Imam Ahmad ibn Hanbal',
    initials: 'AH', death: '164–241 AH / 780–855 CE',
    work: 'Musnad Ahmad',
    desc: "Founder of the Hanbali school of law. His Musnad contains over 27,000 narrations. He endured imprisonment and lashing during the Mu'tazilite inquisition (Mihna) rather than abandon the view that the Qur'an is uncreated.",
  },
  {
    name: "Imam Abu Dawood al-Sijistani",
    initials: 'AD', death: '202–275 AH / 817–889 CE',
    work: 'Sunan Abu Dawood',
    desc: "Selected 4,800 hadith from 500,000 for his Sunan. Said: 'I have written 500,000 hadith of the Prophet ﷺ, and I selected from them what is in this book.' The primary fiqh hadith reference.",
  },
  {
    name: 'Imam Muhammad al-Tirmidhi',
    initials: 'TR', death: '209–279 AH / 824–892 CE',
    work: "Jami' Al-Tirmidhi",
    desc: "First to systematically grade every hadith in his collection and document scholarly disagreements on each. Lost his sight in old age; his students said his knowledge of hadith was deeper than his teachers'.",
  },
  {
    name: "Imam Ahmad ibn Shu'ayb al-Nasa'i",
    initials: 'NS', death: '215–303 AH / 829–915 CE',
    work: "Sunan Al-Nasa'i",
    desc: "Known for the strictest conditions after al-Bukhari and Muslim. Died after being beaten for refusing to praise Mu'awiyah RA over Ali RA in Damascus — a testament to his scholarly integrity.",
  },
]

const sciences = [
  { arabic: 'علم الرجال',     title: "Ilm al-Rijal",     desc: "The science of narrator biography — evaluating the character, reliability, memory, and life dates of every narrator in every chain." },
  { arabic: 'علم الجرح والتعديل', title: "Al-Jarh wa'l-Ta'dil", desc: "The science of narrator criticism and accreditation — scholars explicitly declaring narrators trustworthy ('adl) or flawed (majruh)." },
  { arabic: 'علم المصطلح',   title: "Mustalah al-Hadith", desc: "The technical terminology of hadith — defining Sahih, Hasan, Da'eef, and hundreds of sub-categories with precise scholarly definitions." },
  { arabic: 'علم العلل',     title: "Ilm al-'Ilal",      desc: "The science of hidden defects — detecting subtle flaws in chains or texts that make an apparently authentic hadith actually weak." },
  { arabic: 'علم الناسخ والمنسوخ', title: "Al-Nasikh wa'l-Mansukh", desc: "Identifying which narrations were later abrogated by others — essential for resolving apparent contradictions between hadith." },
  { arabic: 'علم غريب الحديث', title: "Gharib al-Hadith",  desc: "The science of rare or obscure words in hadith texts — explaining archaic Arabic vocabulary that might otherwise be misunderstood." },
]

const faqs = [
  {
    q: "Why is the Hadith necessary when we have the Qur'an?",
    a: "The Qur'an commands prayer, fasting, and Hajj — but gives no details on how many times to pray or the method. The hadith provides that detail. The Prophet ﷺ said: 'Pray as you have seen me pray' (Sahih Bukhari 631). Without hadith, the Qur'an commands worship that cannot be performed. Allah also commands following the Messenger directly in Qur'an 59:7 and 4:80.",
  },
  {
    q: "How do we know the hadith weren't fabricated?",
    a: "The isnad system is specifically designed to prevent this. Every narration had to be traced through named individuals whose lives, characters, and travel routes were documented. Fabricated hadith were identified and catalogued in their own literature (al-Mawdu'at). The parallel oral tradition of hundreds of thousands of memorisers made systematic fabrication detectable.",
  },
  {
    q: "What is the difference between Hadith Qudsi and regular Hadith?",
    a: "A Hadith Qudsi (Sacred Hadith) is a narration in which the Prophet ﷺ reports the words of Allah, but which is not part of the Qur'an. The meaning is from Allah; the wording is the Prophet's ﷺ. Regular hadith are the Prophet's own words or descriptions of his actions. Both are subject to the same isnad evaluation.",
  },
  {
    q: "Are all hadith in Sahih Bukhari and Sahih Muslim authentic?",
    a: "The overwhelming majority are — that is why they are called the Sahihayn (the Two Authentics). However, a small number of narrations have been critiqued by later scholars, most notably by Ibn Hajar al-Asqalani and Muslim himself in his introduction. The general scholarly position is that if a hadith appears in both (mutafaq 'alayh), its authenticity is near-certain.",
  },
]
</script>

<style scoped>
.hadith-library-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: linear-gradient(135deg, var(--ink) 0%, #2c3e50 100%);
  border-radius: var(--radius-xl);
  padding: 1.5rem 1.75rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}
.hlb-eyebrow {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: var(--gold);
  margin-bottom: .3rem;
}
.hlb-title {
  font-family: var(--serif);
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: .35rem;
}
.hlb-desc { font-size: 13.5px; color: rgba(255,255,255,.55); line-height: 1.55; max-width: 480px; }
.hlb-btn  { flex-shrink: 0; white-space: nowrap; }

.hadith-grade-card {
  display: grid;
  grid-template-columns: 90px 80px 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: .9rem 1.1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
.hgc-grade {
  font-size: 13px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 100px;
  text-align: center;
  white-space: nowrap;
}
.hgc-arabic {
  font-family: var(--serif);
  font-size: 1.2rem;
  text-align: right;
  direction: rtl;
  color: var(--muted);
}
.hgc-title {
  font-family: var(--serif);
  font-size: .95rem;
  font-weight: 600;
  margin-bottom: 3px;
}
.hgc-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
.hgc-ruling {
  font-size: 11.5px;
  font-weight: 600;
  text-align: right;
  white-space: nowrap;
  flex-shrink: 0;
}

.scholar-badge {
  width: 40px; height: 40px;
  background: var(--gold-light);
  color: var(--gold);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--serif);
  font-size: .85rem;
  font-weight: 700;
  flex-shrink: 0;
  border: 1px solid #E0C87A;
}

@media (max-width: 700px) {
  .hadith-grade-card { grid-template-columns: 1fr 1fr; }
  .hgc-ruling { text-align: left; }
}
@media (max-width: 480px) {
  .hadith-grade-card { grid-template-columns: 1fr; }
  .hadith-library-banner { flex-direction: column; }
}
</style>
