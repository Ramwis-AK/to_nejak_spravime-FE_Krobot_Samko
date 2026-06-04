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
      <p class="placeholder-note">Ďalší obsah bude doplnený po napojení na backend.</p>
      <div v-if="prax.stavKey === 'open'" style="margin-top:1.5rem;">
        <RouterLink to="/registracia/student" class="btn-primary">Prihlásiť tím na toto zadanie →</RouterLink>
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import DetailCard from '../components/DetailCard.vue'
export default {
  name: 'PraxDetailView',
  components: { AppFooter, DetailCard },
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    const prax = computed(() => store.getPraxById(route.params.id))
    const rows = computed(() => prax.value ? [
      { label: 'Zadanie', key: 'zadanie', value: prax.value.zadanie },
      { label: 'Odmena tímu', key: 'odmena', value: prax.value.odmena },
      { label: 'Lokalita', key: 'lokalita', value: prax.value.lokalita },
      { label: 'Stav', key: 'stav', value: prax.value.stav },
    ] : [])
    return { prax, rows }
  }
}
</script>
