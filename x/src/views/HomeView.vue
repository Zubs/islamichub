<template>
  <div class="home-view">
    <section class="hero-section section">
      <div class="hero-inner section-wide">
        <div class="hero-content">
          <div class="hero-badge eyebrow">Alhamdulillah</div>
          <h1 class="hero-title">Live and Learn the <em>Five Pillars</em> of Islam</h1>
          <p class="hero-body">
            A comprehensive, open-source platform providing authentic educational guides and
            modern tools for the global Muslim community.
          </p>
          <div class="btn-group">
            <RouterLink to="/prayer" class="btn btn-primary btn-lg">Prayer Times</RouterLink>
            <RouterLink to="/zakat" class="btn btn-secondary btn-lg">Zakat Calculator</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wide">
      <div class="section-header" style="text-align: center; margin-bottom: var(--space-12);">
        <h2 class="section-title">The Five Pillars</h2>
        <p class="section-sub">The foundation of a Muslim's life</p>
      </div>
      <div class="pillars-hub">
        <RouterLink to="/faith" class="pillar-hub-card phc-faith">
          <div class="phc-icon">☪️</div>
          <div class="phc-name">Faith</div>
          <div class="phc-sub">Shahada</div>
        </RouterLink>
        <RouterLink to="/prayer" class="pillar-hub-card phc-prayer">
          <div class="phc-icon">🕌</div>
          <div class="phc-name">Prayer</div>
          <div class="phc-sub">Salah</div>
        </RouterLink>
        <RouterLink to="/zakat" class="pillar-hub-card phc-zakat">
          <div class="phc-icon">✦</div>
          <div class="phc-name">Zakat</div>
          <div class="phc-sub">Almsgiving</div>
        </RouterLink>
        <RouterLink to="/fasting" class="pillar-hub-card phc-fasting">
          <div class="phc-icon">🌙</div>
          <div class="phc-name">Fasting</div>
          <div class="phc-sub">Sawm</div>
        </RouterLink>
        <RouterLink to="/hajj" class="pillar-hub-card phc-hajj">
          <div class="phc-icon">🕋</div>
          <div class="phc-name">Hajj</div>
          <div class="phc-sub">Pilgrimage</div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import {useSeo} from '@/composables/useSeo.js'

useSeo('home')
</script>
