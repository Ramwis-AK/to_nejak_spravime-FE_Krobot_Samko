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
      <p class="placeholder-note">Ďalší obsah bude doplnený po napojení na backend.</p>
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
      { label: 'Value proposition', key: 'vp', value: startup.value.vp },
      { label: 'Investícia', key: 'investicia', value: startup.value.investicia },
      { label: 'Fáza', key: 'faza', value: startup.value.faza },
      { label: 'Lokalita', key: 'lokalita', value: startup.value.lokalita },
    ] : [])
    return { startup, rows }
  }
}
</script>
