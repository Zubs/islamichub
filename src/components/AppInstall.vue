<template>
  <div v-if="needRefresh || canInstall || showIosNote" class="app-bar" role="status">
    <template v-if="needRefresh">
      <span>{{ $t('appInstall.updateAvailable') }}</span>
      <button class="btn btn-primary" @click="refreshApp">{{ $t('appInstall.refresh') }}</button>
    </template>
    <template v-else-if="canInstall">
      <span>{{ $t('appInstall.installIslamichubToUseItOffline') }}</span>
      <button class="btn btn-primary" @click="installApp">{{ $t('appInstall.install') }}</button>
    </template>
    <template v-else>
      <span> {{ $t('appInstall.toInstallOnIphoneTapShare') }} </span>
      <button class="btn btn-secondary" @click="dismissIosNote">
        {{ $t('appInstall.dismiss') }}
      </button>
    </template>
  </div>
</template>

<script setup>
import {
  needRefresh,
  canInstall,
  showIosNote,
  refreshApp,
  installApp,
  dismissIosNote,
} from '@/composables/usePwa.js'
</script>

<style scoped>
.app-bar {
  position: fixed;
  inset-inline: var(--space-3);
  bottom: var(--space-3);
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
  max-width: 520px;
  margin-inline: auto;
  padding: var(--space-3) var(--space-4);
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  font-size: 13.5px;
  color: var(--ink);
}
</style>
