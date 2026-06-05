<template>
  <div>
    <!-- Page header -->
    <div class="page-header pillar-header-faith">
      <GeoPattern/>
      <div class="ornament-hanging left" aria-hidden="true"></div>
      <div class="ornament-hanging right" aria-hidden="true"></div>
      <div class="page-header-inner">
        <div class="pillar-num-badge"
             style="background:var(--faith-light);color:var(--faith-color)">
          Pillar 1 · Aqeedah &nbsp;·&nbsp; أركان الإيمان
        </div>
        <h1>The Six Articles of Faith</h1>
        <p>The six fundamental beliefs every Muslim must hold — the pillars of Iman (faith) derived
          from the Qur'an and the Hadith of Jibril.</p>
      </div>
    </div>

    <div class="content-narrow">

      <!-- Breadcrumb -->
      <div class="aof-breadcrumb">
        <RouterLink to="/faith" class="aof-breadcrumb-link">← Faith (Shahada)</RouterLink>
        <span class="aof-breadcrumb-sep" aria-hidden="true">/</span>
        <span>Six Articles of Faith</span>
      </div>

      <!-- Foundation hadith -->
      <div class="quran-block frame-calligraphy anim-target">
        <div class="corner-ornament top-left" aria-hidden="true"></div>
        <div class="corner-ornament top-right" aria-hidden="true"></div>
        <div class="corner-ornament bottom-left" aria-hidden="true"></div>
        <div class="corner-ornament bottom-right" aria-hidden="true"></div>
        <div class="quran-arabic" lang="ar">
          أَنْ تُؤْمِنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ
          وَتُؤْمِنَ بِالْقَدَرِ خَيْرِهِ وَشَرِّهِ
        </div>
        <div class="quran-ref">Hadith of Jibril — Sahih Muslim 8</div>
        <div class="quran-trans">
          "To believe in Allah, His angels, His books, His messengers, the Last Day,
          and to believe in divine decree — both its good and its evil."
          — The Angel Jibril ﷺ defining Iman when he appeared to the Prophet ﷺ
        </div>
      </div>

      <!-- Intro -->
      <div style="margin-top:2rem" class="prose anim-target">
        <p>The six articles of faith (أَركَان الإِيمَان — Arkan al-Iman) are the core doctrinal
          beliefs of Islam. They are explicitly stated in the Hadith of Jibril (Sahih Muslim 8;
          Sahih Bukhari 50), where the Angel Jibril appeared in human form and asked the Prophet ﷺ
          to define Iman (faith). The six articles are also referenced collectively in Qur'an 2:177
          and 4:136.</p>
        <p>Holding these beliefs with conviction and understanding is the foundation of a Muslim's
          relationship with Allah. They are not abstract theology — each article reshapes how a
          believer understands creation, purpose, accountability, and the unseen.</p>
      </div>

      <!-- Overview strip -->
      <div class="aof-overview anim-target">
        <RouterLink
          v-for="a in articles"
          :key="a.num"
          :to="'#article-' + a.num"
          class="aof-overview-pill"
          @click.prevent="scrollTo('article-' + a.num)"
        >
          <span class="aof-ov-num">{{ a.numAr }}</span>
          <span class="aof-ov-label">{{ a.titleShort }}</span>
        </RouterLink>
      </div>

      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>

      <!-- Articles -->
      <div
        v-for="(article, i) in articles"
        :key="article.num"
        :id="'article-' + article.num"
        class="aof-article anim-target"
      >
        <!-- Article header -->
        <div class="aof-article-header">
          <div class="aof-article-num-wrap">
            <span class="aof-article-num-ar" lang="ar">{{ article.numAr }}</span>
            <span class="aof-article-num-en">{{ article.num }}</span>
          </div>
          <div>
            <h2 class="aof-article-title">{{ article.title }}</h2>
            <p class="aof-article-arabic" lang="ar">{{ article.arabic }}</p>
          </div>
        </div>

        <!-- Qur'anic anchor verse -->
        <div class="aof-verse">
          <div class="aof-verse-arabic" lang="ar">{{ article.verse.arabic }}</div>
          <div class="aof-verse-ref">{{ article.verse.ref }}</div>
          <div class="aof-verse-trans">"{{ article.verse.translation }}"</div>
        </div>

        <!-- Body paragraphs -->
        <div class="prose" style="margin-bottom:1.25rem">
          <p v-for="(para, pi) in article.body" :key="pi">{{ para }}</p>
        </div>

        <!-- Key points -->
        <div class="aof-points">
          <div class="aof-points-label">Key points</div>
          <div class="aof-points-grid">
            <div v-for="pt in article.points" :key="pt.title" class="aof-point-card">
              <div class="aof-point-icon" aria-hidden="true">{{ pt.icon }}</div>
              <div>
                <div class="aof-point-title">{{ pt.title }}</div>
                <div class="aof-point-desc">{{ pt.desc }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="i < articles.length - 1" class="divider-kufic" aria-hidden="true"
             style="margin-top:3rem">
          <span class="divider-kufic-icon"></span>
        </div>
      </div>

      <!-- Qur'an 2:177 — the comprehensive verse -->
      <div class="divider-kufic" aria-hidden="true"><span class="divider-kufic-icon"></span></div>
      <span class="eyebrow">The comprehensive verse</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:1rem">All
        six in one verse</h2>

      <QuranBlock
        arabic="لَّيْسَ الْبِرَّ أَن تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَٰكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ"
        reference="Qur'an 2:177"
        translation="Righteousness is not that you turn your faces toward the east or the west, but righteousness is in one who believes in Allah, the Last Day, the angels, the Book, and the prophets."
        note="Allah defines true righteousness beginning with the doctrinal foundation — belief in all six articles."
        class="anim-target"
      />

      <!-- FAQ -->
      <div class="divider-kufic" aria-hidden="true" style="margin-top:2.5rem"><span
        class="divider-kufic-icon"></span></div>
      <span class="eyebrow">Common questions</span>
      <h2 class="section-title" style="font-size:clamp(1.5rem,2.5vw,1.9rem);margin-bottom:0">
        FAQ</h2>
      <FaqList :faqs="faqs"/>

      <!-- CTA -->
      <div class="cta-strip anim-target" style="margin-top:2.5rem">
        <GeoPattern/>
        <h2>Continue exploring Faith</h2>
        <p>Return to the full Shahada guide — Tawhid, the seven conditions, and the meaning of
          Risala.</p>
        <div class="btn-group" style="justify-content:center">
          <RouterLink to="/faith" class="btn btn-white btn-lg">← Back to Shahada</RouterLink>
          <RouterLink to="/prayer" class="btn btn-secondary btn-lg"
                      style="color:#fff;border-color:rgba(255,255,255,.3)">Continue to Prayer →
          </RouterLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import { useScrollReveal } from '@/composables/useScrollReveal.js'
import GeoPattern from '@/components/GeoPattern.vue'
import QuranBlock from '@/components/QuranBlock.vue'
import FaqList from '@/components/FaqList.vue'

useHead({
  title: "The Six Articles of Faith (Arkan al-Iman) | IslamicHub",
  meta: [
    {
      name: 'description',
      content: "Learn the six articles of Islamic faith — belief in Allah, angels, scriptures, prophets, the Day of Judgement, and divine decree (Qadr). Grounded in Qur'an and the Hadith of Jibril."
    },
    {
      property: 'og:title',
      content: "The Six Articles of Faith | IslamicHub"
    },
    {
      property: 'og:description',
      content: "The six pillars of Iman: Allah, angels, scriptures, prophets, Day of Judgement, and divine decree — with Qur'anic evidence and scholarly explanation."
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
  ],
  link: [{ rel: 'canonical', href: 'https://islamichub.xyz/faith/articles' }],
})

useScrollReveal()

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const articles = [
  {
    num: 1, numAr: '١',
    title: 'Belief in Allah',
    titleShort: 'Allah',
    arabic: 'الإيمان بالله',
    verse: {
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      ref: "Qur'an 112:1–4 (Surah Al-Ikhlas)",
      translation: "Say: He is Allah, [who is] One — Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.",
    },
    body: [
      "The first and greatest article of faith is belief in Allah — that He is One (Tawhid), with no partner, no rival, no parent, and no child. He is al-Awwal (the First) and al-Akhir (the Last), al-Zahir (the Manifest) and al-Batin (the Hidden). He is the Creator and Sustainer of all existence, and everything that exists does so only by His will and sustenance.",
      "Muslims do not merely believe that Allah exists — they believe that He alone deserves all worship (ibadah), that He knows all things (al-Alim), and that He has power over all things (al-Qadir). This belief reshapes every aspect of a Muslim's life: gratitude goes to Allah, fear of consequence points to Allah, hope is placed in Allah.",
    ],
    points: [
      {
        icon: '☝️',
        title: 'Absolute Oneness',
        desc: "Allah has no partners, equals, or rivals — not in His essence, His attributes, or His right to be worshipped."
      },
      {
        icon: '🌍',
        title: 'Creator & Sustainer',
        desc: "He created everything from nothing and continues to sustain all of existence at every moment."
      },
      {
        icon: '📖',
        title: '99 Names & Attributes',
        desc: "Allah describes Himself through 99 names in the Qur'an and Sunnah — each revealing an aspect of His perfect nature."
      },
      {
        icon: '🚫',
        title: 'Beyond comparison',
        desc: 'Nothing resembles Allah. He is unlike His creation in every way (Qur\'an 42:11: "There is nothing like unto Him").'
      },
    ],
  },
  {
    num: 2, numAr: '٢',
    title: 'Belief in the Angels',
    titleShort: 'Angels',
    arabic: 'الإيمان بالملائكة',
    verse: {
      arabic: 'لَا يَعْصُونَ اللَّهَ مَا أَمَرَهُمْ وَيَفْعَلُونَ مَا يُؤْمَرُونَ',
      ref: "Qur'an 66:6",
      translation: "They do not disobey Allah in what He commands them but do what they are commanded.",
    },
    body: [
      "Angels (ملائكة — mala'ikah) are real, honourable beings created from light. They have no free will — they exist only to obey and worship Allah. They are neither male nor female, do not eat or drink, and are not subject to the desires that test human beings.",
      "Belief in the angels is obligatory because Allah mentions them repeatedly in the Qur'an as part of the unseen (al-ghayb). A Muslim must believe they exist, that they carry out Allah's commands, and that some have specific roles in relation to human beings.",
    ],
    points: [
      {
        icon: '📝',
        title: 'Kiraman Katibin',
        desc: "Two angels accompany every person, recording all deeds — good and bad — to be presented on the Day of Judgement (Qur'an 82:10–12)."
      },
      {
        icon: '📣',
        title: 'Jibril (Gabriel)',
        desc: "The greatest angel, responsible for delivering revelation from Allah to all the prophets, including the Qur'an to Muhammad ﷺ."
      },
      {
        icon: '💀',
        title: 'Israfil & Azra\'il',
        desc: "Israfil will blow the trumpet on the Day of Judgement. Azra'il (the Angel of Death) takes the soul at the time of death (Qur'an 32:11)."
      },
      {
        icon: '🔥',
        title: 'Munkar & Nakir',
        desc: "Two angels who question every soul in the grave about their Lord, their religion, and their prophet after death."
      },
    ],
  },
  {
    num: 3, numAr: '٣',
    title: 'Belief in the Scriptures',
    titleShort: 'Scriptures',
    arabic: 'الإيمان بالكتب',
    verse: {
      arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      ref: "Qur'an 15:9",
      translation: "Indeed, it is We who sent down the Reminder, and indeed, We will be its guardian.",
    },
    body: [
      "Muslims believe that Allah revealed scriptures to His prophets as guidance for humanity. Five revealed books are mentioned in the Qur'an: the Suhuf (Scrolls) of Ibrahim ﷺ, the Torah (Tawrat) of Musa ﷺ, the Psalms (Zabur) of Dawud ﷺ, the Gospel (Injil) of Isa ﷺ, and the Qur'an revealed to Muhammad ﷺ.",
      "While Muslims affirm that the earlier scriptures were originally true revelations from Allah, it is established that they were altered over time. The Qur'an alone remains preserved exactly as revealed — a promise Allah made in Qur'an 15:9 — and it supersedes and confirms all prior revelations. It is the final, universal, and perfectly preserved guidance for all people until the Day of Judgement.",
    ],
    points: [
      {
        icon: '📗',
        title: 'The Qur\'an is final',
        desc: "Revealed to Muhammad ﷺ over 23 years, the Qur'an is the unchanged word of Allah — memorised by millions and preserved letter-for-letter since revelation."
      },
      {
        icon: '✅',
        title: 'Earlier books affirmed',
        desc: "Muslims believe the Torah, Psalms, and Gospel were real revelations, but later changed by human hands. Their original messages agreed with Islam."
      },
      {
        icon: '🌐',
        title: 'Universal guidance',
        desc: "Unlike earlier scriptures sent to specific peoples, the Qur'an is addressed to all of humanity across all times."
      },
      {
        icon: '🔒',
        title: 'Divine preservation',
        desc: "Allah guaranteed the Qur'an's preservation — an estimated 10 million people have memorised it in its entirety (huffaz)."
      },
    ],
  },
  {
    num: 4, numAr: '٤',
    title: 'Belief in the Prophets',
    titleShort: 'Prophets',
    arabic: 'الإيمان بالرسل',
    verse: {
      arabic: 'مَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ',
      ref: "Qur'an 33:40",
      translation: "Muhammad is not the father of any of your men, but he is the Messenger of Allah and the Seal of the Prophets.",
    },
    body: [
      "Allah sent prophets and messengers to every nation throughout history, all calling humanity to the same essential message: worship Allah alone. The Qur'an mentions 25 prophets by name — among them Adam, Nuh (Noah), Ibrahim (Abraham), Musa (Moses), Dawud (David), Isa (Jesus), and Muhammad ﷺ, the last and final prophet.",
      "Muslims must believe in all the prophets without distinction. Rejecting any prophet is rejecting Islam. Each prophet was a human being of perfect character and moral integrity, free from major sins, and entrusted with delivering the divine message truthfully. Muhammad ﷺ is the Seal of the Prophets — no prophet comes after him.",
    ],
    points: [
      {
        icon: '🔑',
        title: '25 named in the Qur\'an',
        desc: "From Adam ﷺ (the first human and first prophet) to Muhammad ﷺ (the final messenger). Hadith literature mentions around 124,000 prophets were sent in total."
      },
      {
        icon: '⚖️',
        title: 'All equally believed',
        desc: "Muslims make no distinction between prophets in terms of believing in them — all are honoured and their missions affirmed."
      },
      {
        icon: '🕊️',
        title: 'Prophetic qualities',
        desc: "All prophets were truthful (Siddiq), trustworthy (Amin), conveyed the message completely (Tabligh), and were protected from major sin (Isma)."
      },
      {
        icon: '🔚',
        title: 'Muhammad ﷺ is final',
        desc: "The Seal of all Prophets. No new prophet, messenger, or scripture comes after him. His Sunnah alongside the Qur'an is the complete and preserved guidance."
      },
    ],
  },
  {
    num: 5, numAr: '٥',
    title: 'Belief in the Day of Judgement',
    titleShort: 'Judgement',
    arabic: 'الإيمان باليوم الآخر',
    verse: {
      arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ',
      ref: "Qur'an 3:185",
      translation: "Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection.",
    },
    body: [
      "Every human being who ever lived will be resurrected and stand before Allah on the Day of Judgement (Yawm al-Qiyamah). This life is a test — and the Day of Judgement is when the results are given. Every deed, word, intention, and thought will be presented. Hands will testify, feet will testify, and the earth itself will testify (Qur'an 99:4–5).",
      "Belief in the Day of Judgement is what gives Islamic ethics their weight — it is not merely social convention but divine accountability. The believer knows that nothing is truly hidden: not a secret charity, not a private sin, not a moment of patience in difficulty. Justice will be perfect and complete on that day.",
    ],
    points: [
      {
        icon: '📋',
        title: 'The Book of Deeds',
        desc: "Every person's deeds are recorded by the angels Kiraman Katibin and presented on that day. The righteous will receive their book in their right hand (Qur'an 69:19)."
      },
      {
        icon: '⚖️',
        title: 'The Scale (Mizan)',
        desc: "Deeds will be weighed on a precise divine scale. Even an atom's weight of good or evil will be accounted for (Qur'an 99:7–8)."
      },
      {
        icon: '🌉',
        title: 'The Bridge (Sirat)',
        desc: "All people must cross the bridge over Hellfire. The speed of crossing depends on one's deeds. The righteous will cross safely; the guilty will fall."
      },
      {
        icon: '🏡',
        title: 'Jannah & Jahannam',
        desc: "The final destination is either Paradise (Jannah) — eternal bliss — or Hellfire (Jahannam). The Qur'an describes both in vivid detail."
      },
    ],
  },
  {
    num: 6, numAr: '٦',
    title: 'Belief in Divine Decree',
    titleShort: 'Divine Decree',
    arabic: 'الإيمان بالقدر',
    verse: {
      arabic: 'إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ',
      ref: "Qur'an 54:49",
      translation: "Indeed, all things We created with predestination.",
    },
    body: [
      "Qadr (القَدَر — divine decree) is the belief that Allah has full and perfect knowledge of all things — past, present, and future — and that He has recorded everything in al-Lawh al-Mahfuz (the Preserved Tablet) before creation. Nothing happens outside His knowledge and will.",
      "This is one of the most commonly misunderstood aspects of Islam. Qadr does not mean fatalism or that human choice is an illusion. Allah has given human beings free will and the capacity for decision. The key is that Allah, being outside of time, knows what choices we will freely make — our foreknowledge of a result does not cause it. The Prophet ﷺ said: 'Work, for everyone is facilitated to what he was created for.' (Sahih Bukhari 4949) Belief in Qadr brings profound peace — a Muslim knows that what has passed could not have been avoided, and what is destined to come cannot be prevented — so they trust Allah and act with sincerity.",
    ],
    points: [
      {
        icon: '📜',
        title: 'Al-Lawh al-Mahfuz',
        desc: "The Preserved Tablet — everything that will ever happen was written by Allah 50,000 years before the creation of the heavens and the earth (Sahih Muslim 2653)."
      },
      {
        icon: '🧠',
        title: 'Human free will',
        desc: "Qadr does not contradict free will. Humans genuinely choose, act, and are accountable. Allah's foreknowledge does not compel our choices."
      },
      {
        icon: '☮️',
        title: 'Spiritual peace',
        desc: "Belief in Qadr brings tranquillity. 'No calamity strikes except by the permission of Allah' (Qur'an 64:11) — the believer trusts Allah in all circumstances."
      },
      {
        icon: '🔄',
        title: 'The four levels',
        desc: "Scholars define Qadr through four levels: Allah's knowledge (Ilm), His recording (Kitabah), His will (Mashi'ah), and His creation (Khalq) of all things."
      },
    ],
  },
]

const faqs = [
  {
    q: "What is the difference between the Five Pillars and the Six Articles of Faith?",
    a: "The Five Pillars (Arkan al-Islam) are the practical acts of worship — Shahada, Salah, Zakat, Sawm, Hajj. The Six Articles (Arkan al-Iman) are the internal beliefs. Both are required: Islam without Iman is hollow practice; Iman without Islam is belief without action. The Hadith of Jibril presents both together.",
  },
  {
    q: "Is rejecting any one of the six articles still Islam?",
    a: "No. Rejecting any of the six articles — for example, denying the existence of angels, or that the Qur'an is revelation, or that there will be a Day of Judgement — takes a person outside of Islam. All six must be held with firm conviction.",
  },
  {
    q: "Does belief in Qadr mean I have no control over my life?",
    a: "No — this is the most common misunderstanding of Qadr. Human beings have genuine free will, make real choices, and are held accountable for them. Allah's perfect foreknowledge of our choices does not cause those choices. The Prophet ﷺ commanded both trust in Allah (tawakkul) and taking practical means (asbab): 'Tie your camel, then put your trust in Allah.' (Al-Tirmidhi 2517)",
  },
  {
    q: "Do Muslims believe Jesus (Isa) was a prophet?",
    a: "Yes — Isa ibn Maryam ﷺ is one of the greatest prophets in Islam, mentioned in the Qur'an 25 times across 15 chapters. Muslims believe he was born of the Virgin Maryam (a miracle from Allah), performed miracles by Allah's permission, and brought the Gospel (Injil). Muslims do not believe he was crucified or is divine — he was a human prophet and messenger.",
  },
]
</script>

<style scoped>
/* ── Breadcrumb ──────────────────────────────────────────────── */
.aof-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  margin: 1.5rem 0 2rem;
}

.aof-breadcrumb-link {
  color: var(--green);
  text-decoration: none;
  font-weight: 500;
}

.aof-breadcrumb-link:hover {
  text-decoration: underline;
}

.aof-breadcrumb-sep {
  color: var(--border);
}

/* ── Overview pills ──────────────────────────────────────────── */
.aof-overview {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin: 1.5rem 0 0;
}

.aof-overview-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 100px;
  text-decoration: none;
  color: var(--ink);
  font-size: 13px;
  font-weight: 500;
  transition: all .15s;
  cursor: pointer;
}

.aof-overview-pill:hover {
  border-color: var(--faith-color);
  color: var(--faith-color);
  background: var(--faith-light);
}

.aof-ov-num {
  font-family: var(--serif);
  font-size: 1.1rem;
  color: var(--faith-color);
  opacity: .7;
}

/* ── Article block ───────────────────────────────────────────── */
.aof-article {
  scroll-margin-top: calc(var(--nav-height, 64px) + 24px);
}

.aof-article-header {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.aof-article-num-wrap {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 52px;
  height: 52px;
  background: var(--faith-light);
  border: 1px solid rgba(var(--faith-color-rgb, 99, 71, 178), .2);
  border-radius: 14px;
  justify-content: center;
  padding: 4px;
}

.aof-article-num-ar {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--faith-color);
  line-height: 1;
}

.aof-article-num-en {
  font-size: 10px;
  color: var(--faith-color);
  opacity: .6;
  font-weight: 600;
}

.aof-article-title {
  font-family: var(--serif);
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--ink);
  line-height: 1.15;
  margin-bottom: .3rem;
}

.aof-article-arabic {
  font-family: var(--serif);
  font-size: 1.05rem;
  color: var(--muted);
  direction: rtl;
}

/* ── Verse box ───────────────────────────────────────────────── */
.aof-verse {
  background: var(--cream-dark);
  border-left: 3px solid var(--faith-color);
  border-radius: 0 var(--radius) var(--radius) 0;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}

.aof-verse-arabic {
  font-family: var(--serif);
  font-size: 1.25rem;
  color: var(--faith-color);
  direction: rtl;
  text-align: right;
  line-height: 1.9;
  margin-bottom: .4rem;
}

.aof-verse-ref {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: var(--gold);
  margin-bottom: .4rem;
}

.aof-verse-trans {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.65;
  font-style: italic;
}

/* ── Key points ──────────────────────────────────────────────── */
.aof-points {
  margin-top: 1.25rem;
}

.aof-points-label {
  font-size: 10.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .6px;
  color: var(--muted);
  margin-bottom: .75rem;
}

.aof-points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: .75rem;
}

.aof-point-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: .9rem 1rem;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.aof-point-icon {
  font-size: 18px;
  flex-shrink: 0;
  margin-top: 1px;
}

.aof-point-title {
  font-family: var(--serif);
  font-size: .9rem;
  font-weight: 600;
  margin-bottom: .2rem;
  color: var(--ink);
}

.aof-point-desc {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

/* ── Responsive ──────────────────────────────────────────────── */
@media (max-width: 600px) {
  .aof-article-header {
    flex-direction: column;
  }

  .aof-points-grid {
    grid-template-columns: 1fr;
  }
}
</style>
