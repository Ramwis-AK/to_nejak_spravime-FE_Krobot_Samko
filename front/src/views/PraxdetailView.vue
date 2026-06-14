<template>
  <div class="page-content">
    <div class="detail-page" v-if="prax">
      <RouterLink to="/prax" class="back-btn">← Späť na prax</RouterLink>
      <h1>{{ prax.firma }}</h1>
      <div class="detail-tags">
        <span class="tag tag-area">{{ prax.sektor }}</span>
        <span :class="['tag','tag-stav', prax.stavKey]">{{ prax.stav }}</span>
        <span class="tag">{{ prax.lokalita }}</span>
      </div>

      <DetailCard :rows="rows" />

      <div class="detail-section">
        <h2>Popis zadania</h2>
        <p>{{ prax.popis ?? prax.zadanie }}</p>
      </div>

      <div class="detail-section">
        <h2>Kontakt na zadávateľa</h2>
        <div class="kontakt-box">
          <p><strong>Meno:</strong> {{ prax.kontaktMeno ?? '—' }}</p>
          <p><strong>E-mail:</strong> {{ prax.kontaktEmail ?? '—' }}</p>
          <p><strong>Telefón:</strong> {{ prax.kontaktTel ?? '—' }}</p>
        </div>
      </div>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/prax" class="back-btn">← Späť</RouterLink>
      <p style="color:var(--text-muted);">Zadanie nenájdené.</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import { useUserStore } from '../stores/user.js'
import AppFooter from '../components/AppFooter.vue'
import DetailCard from '../components/DetailCard.vue'
export default {
  name: 'PraxDetailView',
  components: { AppFooter, DetailCard },
  setup() {
    const store = useNtiStore()
    const userStore = useUserStore()
    const route = useRoute()
    const prax = ref(null)

    onMounted(async () => {
      try {
        prax.value = await store.fetchPrax(route.params.id)
      } catch (e) {
        prax.value = null
      }
    })

    const rows = computed(() => prax.value ? [
      { label: 'Sektor', value: prax.value.sektor },
      { label: 'Lokalita', value: prax.value.lokalita },
      { label: 'Odmena tímu', value: prax.value.odmena },
      { label: 'Stav', value: prax.value.stav },
    ] : [])
    return { prax, rows, userStore }
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