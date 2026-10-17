<template>
  <div class="sections">
    <section v-for="section in sections" :key="section.id" :id="section.id" class="section-block">
      <template v-if="has(section, 'eyebrow')">
        <span class="eyebrow">{{ c(section.id + '.eyebrow') }}</span
        ><UntranslatedNote v-if="untranslated(section.id)" />
      </template>
      <h2 v-if="has(section, 'title')" class="section-title section-heading">
        {{ c(section.id + '.title') }}
      </h2>
      <p v-if="has(section, 'intro')" class="prose section-intro">
        <HadithRef :text="c(section.id + '.intro')" />
      </p>

      <div v-if="section.type === 'prose'" class="prose">
        <p v-for="n in section.paragraphs" :key="n">
          <HadithRef :text="c(`${section.id}.p${n}`)" />
        </p>
      </div>

      <QuranBlock
        v-else-if="section.type === 'verse'"
        :arabic="section.arabic"
        :reference="section.reference"
        :translation="c(section.id + '.translation')"
        :note="c(section.id + '.note')"
      />

      <HadithBlock v-else-if="section.type === 'hadith'" :reference="section.reference">
        {{ c(section.id + '.text') }}
      </HadithBlock>

      <component
        :is="section.ordered ? 'ol' : 'ul'"
        v-else-if="section.type === 'points'"
        class="section-points"
      >
        <li v-for="(item, index) in section.items" :key="index">
          <HadithRef :text="c(`${section.id}.i${index + 1}`)" />
          <span class="section-ref"><HadithRef :text="item.reference" /></span>
        </li>
      </component>

      <div v-else-if="section.type === 'positions'" class="section-positions">
        <div v-for="(item, index) in section.items" :key="index" class="card section-position">
          <h3>{{ c(`${section.id}.name${index + 1}`) }}</h3>
          <p><HadithRef :text="c(`${section.id}.text${index + 1}`)" /></p>
          <span class="section-ref"><HadithRef :text="item.reference" /></span>
        </div>
      </div>

      <div v-else-if="section.type === 'recitation'" class="card section-recitation">
        <p class="section-arabic" lang="ar" dir="rtl">{{ section.arabic }}</p>
        <p class="section-translit">{{ c(section.id + '.transliteration') }}</p>
        <p class="section-translation">{{ c(section.id + '.translation') }}</p>
        <p class="section-source"><HadithRef :text="c(section.id + '.source')" /></p>
      </div>

      <div v-else-if="section.type === 'phrases'" class="card section-phrases">
        <ol>
          <li v-for="(item, index) in section.items" :key="index" class="section-phrase">
            <span class="section-phrase-arabic" lang="ar" dir="rtl">{{ item.arabic }}</span>
            <span class="section-phrase-times">{{
              $t('contentSections.times', { n: item.times })
            }}</span>
            <span class="section-phrase-translit">{{ c(`${section.id}.t${index + 1}`) }}</span>
            <span class="section-phrase-meaning">{{ c(`${section.id}.m${index + 1}`) }}</span>
          </li>
        </ol>
        <p class="section-source"><HadithRef :text="section.reference" /></p>
      </div>

      <article v-else-if="section.type === 'step'" class="card section-step">
        <PrayerFigure :pose="section.figure" class="section-step-figure" />
        <div class="section-step-body">
          <span class="section-step-number">{{
            $t('contentSections.step', { n: stepNumber(section) })
          }}</span>
          <h3 class="section-step-heading">{{ c(section.id + '.heading') }}</h3>
          <p class="section-step-text"><HadithRef :text="c(section.id + '.text')" /></p>
          <div
            v-for="(recitation, index) in section.recitations ?? []"
            :key="index"
            class="section-step-recitation"
          >
            <p class="section-arabic" lang="ar" dir="rtl">{{ recitation.arabic }}</p>
            <p class="section-translit">{{ c(`${section.id}.t${index + 1}`) }}</p>
            <p class="section-translation">{{ c(`${section.id}.m${index + 1}`) }}</p>
            <p class="section-source"><HadithRef :text="recitation.reference" /></p>
          </div>
          <p v-if="has(section, 'note')" class="section-step-note">
            <HadithRef :text="c(section.id + '.note')" />
          </p>
        </div>
      </article>

      <FaqList v-else-if="section.type === 'faq'" :faqs="faqs(section)" />

      <slot :name="section.id" />
    </section>
  </div>
</template>

<script setup>
import QuranBlock from './QuranBlock.vue'
import HadithBlock from './HadithBlock.vue'
import HadithRef from './HadithRef.vue'
import FaqList from './FaqList.vue'
import UntranslatedNote from './UntranslatedNote.vue'
import PrayerFigure from './PrayerFigure.vue'

// Draws a page from its source: `sections` gives the order, kinds, Arabic and references;
// `c` gives the words in the reader's language.
const props = defineProps({
  sections: { type: Array, required: true },
  c: { type: Function, required: true },
  untranslated: { type: Function, required: true },
})

function has(section, key) {
  return props.c(`${section.id}.${key}`) !== ''
}

function stepNumber(section) {
  return props.sections.filter((each) => each.type === 'step').indexOf(section) + 1
}

function faqs(section) {
  return Array.from({ length: section.items }, (_, index) => ({
    q: props.c(`${section.id}.q${index + 1}`),
    a: props.c(`${section.id}.a${index + 1}`),
  }))
}
</script>

<style scoped>
.section-block {
  margin-top: var(--space-10);
  scroll-margin-top: calc(var(--nav-height) + var(--space-4));
}

.section-heading {
  font-size: clamp(1.5rem, 2.5vw, 1.9rem);
  margin-bottom: var(--space-3);
}

.section-intro {
  margin-bottom: var(--space-4);
}

.section-points {
  display: grid;
  gap: var(--space-3);
  padding-inline-start: var(--space-6);
  line-height: 1.7;
  color: var(--ink);
}

.section-ref {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--gold);
}

.section-positions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-4);
}

.section-position h3 {
  font-family: var(--serif);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.section-position p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--muted);
  margin-bottom: var(--space-2);
}

.section-arabic {
  font-family: var(--arabic);
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  line-height: 2.1;
  text-align: right;
  color: var(--ink);
}

.section-translit {
  font-style: italic;
  color: var(--muted);
  margin: var(--space-2) 0;
}

.section-translation {
  color: var(--ink);
  line-height: 1.7;
}

.section-source {
  margin-top: var(--space-3);
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--muted);
}

.section-phrases ol {
  display: grid;
  gap: var(--space-3);
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-phrase {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2px var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border);
}

.section-phrase-arabic {
  font-family: var(--arabic);
  font-size: clamp(1.3rem, 3vw, 1.6rem);
  line-height: 1.9;
  color: var(--ink);
}

.section-phrase-times {
  align-self: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--green);
}

.section-phrase-translit {
  grid-column: 1 / -1;
  font-style: italic;
  color: var(--muted);
}

.section-phrase-meaning {
  grid-column: 1 / -1;
  font-size: 14px;
  color: var(--ink);
}

.section-step {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: var(--space-6);
  align-items: start;
}

.section-step-figure {
  background: var(--cream);
  border-radius: var(--radius);
}

.section-step-number {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--green);
}

.section-step-heading {
  font-family: var(--serif);
  font-size: 1.35rem;
  font-weight: 600;
  margin: var(--space-1) 0 var(--space-2);
}

.section-step-text,
.section-step-note {
  line-height: 1.7;
  color: var(--ink);
}

.section-step-note {
  margin-top: var(--space-3);
  font-size: 13.5px;
  color: var(--muted);
}

.section-step-recitation {
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border);
}

@media (max-width: 600px) {
  .section-step {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }

  .section-step-figure {
    max-width: 180px;
  }
}
</style>
