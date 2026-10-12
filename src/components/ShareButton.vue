<template>
  <div class="share">
    <button class="btn btn-secondary share-button" :disabled="working" @click="share">
      {{ working ? $t('shareButton.preparing') : $t('shareButton.share') }}
    </button>

    <div
      v-if="fallback"
      class="share-panel"
      role="group"
      :aria-label="$t('shareButton.shareOptions')"
    >
      <img v-if="imageUrl" class="share-preview" :src="imageUrl" alt="" />
      <p v-else class="share-note">
        {{ $t('shareButton.thisTextIsTooLongFor') }}
      </p>
      <div class="share-actions">
        <a v-if="imageUrl" class="btn btn-secondary" :href="imageUrl" download="islamichub.png">{{
          $t('shareButton.saveImage')
        }}</a>
        <a
          class="btn btn-primary"
          :href="fallback.whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          >{{ $t('shareButton.shareOnWhatsapp') }}</a
        >
        <button class="btn btn-secondary" @click="copyLink">
          {{ copied ? $t('shareButton.linkCopied') : $t('shareButton.copyLink') }}
        </button>
        <button
          class="btn btn-secondary"
          :aria-label="$t('shareButton.closeShareOptions')"
          @click="close"
        >
          {{ $t('shareButton.close') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { shareItem } from '@/composables/useShare.js'

const NOTICE_MS = 2000

const props = defineProps({
  item: { type: Object, required: true },
})

const working = ref(false)
const fallback = ref(null)
const imageUrl = ref(null)
const copied = ref(false)

function releaseImage() {
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
    imageUrl.value = null
  }
}

function close() {
  releaseImage()
  fallback.value = null
}

async function share() {
  working.value = true
  close()
  try {
    const result = await shareItem(props.item)
    if (result) {
      imageUrl.value = result.image ? URL.createObjectURL(result.image) : null
      fallback.value = result
    }
  } finally {
    working.value = false
  }
}

async function copyLink() {
  await navigator.clipboard?.writeText(fallback.value.address).catch(() => {})
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, NOTICE_MS)
}

onUnmounted(releaseImage)
</script>

<style scoped>
.share-panel {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-3);
  padding: var(--space-3);
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.share-preview {
  width: 100%;
  max-width: 280px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}

.share-note {
  font-size: 13px;
  color: var(--muted);
}

.share-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
