<template>
  <div class="page-content">
    <div class="detail-page" v-if="startup">
      <RouterLink to="/startup" class="back-btn">← Späť na startupy</RouterLink>
      <h1>{{ startup.nazov }}</h1>
      <div class="detail-tags">
        <span class="tag tag-area">{{ startup.oblast }}</span>
        <span :class="['tag','tag-faza', startup.faza.replace(' ','-').toLowerCase()]">{{ startup.faza }}</span>
        <span class="tag">{{ startup.lokalita }}</span>
      </div>

      <DetailCard :rows="rows" />

      <div class="detail-section">
        <h2>O projekte</h2>
        <p>{{ startup.vp }}</p>
      </div>

      <div class="detail-section">
        <h2>Kontakt na zakladateľa</h2>
        <div class="kontakt-box">
          <p><strong>Meno:</strong> {{ startup.zakladatel ?? '—' }}</p>
          <p><strong>E-mail:</strong> {{ startup.kontaktEmail ?? '—' }}</p>
          <p><strong>Telefón:</strong> {{ startup.kontaktTel ?? '—' }}</p>
        </div>
      </div>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/startup" class="back-btn">← Späť</RouterLink>
      <p style="color:var(--text-muted);">Startup nenájdený.</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import DetailCard from '../components/DetailCard.vue'
export default {
  name: 'StartUpDetailView',
  components: { AppFooter, DetailCard },
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    const startup = computed(() => store.getStartupById(route.params.id))
    const rows = computed(() => startup.value ? [
      { label: 'Oblasť', value: startup.value.oblast },
      { label: 'Fáza', value: startup.value.faza },
      { label: 'Lokalita', value: startup.value.lokalita },
      { label: 'Investícia', value: startup.value.investicia },
    ] : [])
    return { startup, rows }
  }
}
</script>

<style scoped>
.detail-section {
  margin-top: 2rem;
}
.detail-section h2 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.detail-section p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.7;
}
.kontakt-box {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.kontakt-box p {
  font-size: 0.95rem;
  color: var(--text);
  margin: 0;
}
</style>