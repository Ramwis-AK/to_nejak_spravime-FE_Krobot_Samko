<template>
  <div class="page-content">
    <div class="detail-page" v-if="novinka">
      <RouterLink to="/novinky" class="back-btn">← Späť na novinky</RouterLink>
      <div style="margin-bottom:0.75rem;">
        <span class="tag">{{ novinka.kategoria }}</span>
      </div>
      <h1>{{ novinka.titul }}</h1>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:2rem;">{{ novinka.datum }}</p>
      <p style="font-size:1rem;color:#374151;line-height:1.8;margin-bottom:2rem;">{{ novinka.perex }}</p>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/novinky" class="back-btn">← Späť</RouterLink>
      <p style="color:var(--text-muted);">Novinka nenájdená.</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'NovinkaDetailView',
  components: { AppFooter },
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    const novinka = ref(null)

    onMounted(async () => {
      try {
        novinka.value = await store.fetchNovinka(route.params.id)
      } catch (e) {
        novinka.value = null
      }
    })

    return { novinka }
  }
}
</script>
