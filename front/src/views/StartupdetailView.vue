<template>
  <div class="page-content">
    <div class="detail-page" v-if="startup">
      <RouterLink to="/startup" class="back-btn">← Späť na StartUp</RouterLink>
      <h1>{{ startup.nazov }}</h1>
      <div class="detail-tags">
        <span class="tag tag-area">{{ startup.oblast }}</span>
        <span class="tag">{{ startup.faza }}</span>
        <span class="tag">{{ startup.lokalita }}</span>
      </div>
      <div class="detail-card">
        <div class="detail-row"><span class="dl">Value proposition</span><span>{{ startup.vp }}</span></div>
        <div class="detail-row"><span class="dl">Veľkosť investície</span><span>{{ startup.investicia }}</span></div>
      </div>
      <p class="placeholder-note">Ďalší obsah bude doplnený po napojení na backend.</p>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/startup" class="back-btn">← Späť</RouterLink>
      <p>Startup nenájdený.</p>
    </div>
    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'StartUpDetailView',
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    return { startup: computed(() => store.getStartupById(route.params.id)) }
  }
}
</script>