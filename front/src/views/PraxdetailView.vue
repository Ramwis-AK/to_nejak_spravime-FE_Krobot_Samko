<template>
  <div class="page-content">
    <div class="detail-page" v-if="prax">
      <RouterLink to="/prax" class="back-btn">← Späť na Prax</RouterLink>
      <h1>{{ prax.firma }}</h1>
      <div class="detail-tags">
        <span class="tag tag-area">{{ prax.sektor }}</span>
        <span :class="['tag', 'tag-stav', prax.stavKey]">{{ prax.stav }}</span>
        <span class="tag">{{ prax.lokalita }}</span>
      </div>
      <div class="detail-card">
        <div class="detail-row"><span class="dl">Zadanie</span><span>{{ prax.zadanie }}</span></div>
        <div class="detail-row"><span class="dl">Odmena tímu</span><span>{{ prax.odmena }}</span></div>
      </div>
      <p class="placeholder-note">Ďalší obsah bude doplnený po napojení na backend.</p>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/prax" class="back-btn">← Späť</RouterLink>
      <p>Zadanie nenájdené.</p>
    </div>
    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'PraxDetailView',
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    return { prax: computed(() => store.getPraxById(route.params.id)) }
  }
}
</script>