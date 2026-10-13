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
</style>
