<template>
  <span class="untranslated-note" role="note">{{ $t('common.notYetTranslated') }}</span>
</template>

<style scoped>
.untranslated-note {
  display: inline-block;
  margin-inline-start: var(--space-2);
  padding: 1px var(--space-2);
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  color: var(--muted);
}
</style>
