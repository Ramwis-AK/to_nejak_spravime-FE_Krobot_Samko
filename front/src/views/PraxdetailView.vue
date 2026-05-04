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

<style scoped>
.detail-page { max-width: 700px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.back-btn { display: inline-block; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; text-decoration: none; }
.back-btn:hover { color: var(--navy); }
h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 1rem; }
.detail-tags { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
.tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold; background: #f3f4f6; color: #374151; }
.tag-area { background: #e8f0fe; color: #1e40af; }
.tag-stav.open { background: #ecfdf5; color: #065f46; }
.tag-stav.pairing { background: #fefce8; color: #854d0e; }
.tag-stav.active { background: #eff6ff; color: #1e40af; }
.detail-card { border: 1px solid var(--border); border-radius: 4px; overflow: hidden; margin-bottom: 2rem; }
.detail-row { display: flex; gap: 2rem; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.detail-row:last-child { border-bottom: none; }
.dl { color: var(--text-muted); min-width: 160px; font-size: 0.85rem; }
.placeholder-note { color: var(--text-muted); font-size: 0.85rem; font-style: italic; }
</style>