<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>Novinky</h1>
        <p>Aktuality, úspešné príbehy a oznámenia z ekosystému NTI.</p>
      </div>
      <FilterBar v-model="activeFilter" :filters="kategorie" :searchable="false" />
      <div class="novinky-list">
        <RouterLink v-for="n in filtered" :key="n.id" :to="`/novinky/${n.id}`" class="novinka-row">
          <div class="novinka-row-date">{{ n.datum }}</div>
          <div class="novinka-row-content">
            <span class="tag" style="margin-bottom:0.5rem;display:inline-block;">{{ n.kategoria }}</span>
            <h3>{{ n.titul }}</h3>
            <p>{{ n.perex }}</p>
          </div>
          <div class="novinka-row-arrow">→</div>
        </RouterLink>
        <div v-if="!filtered.length" style="text-align:center;color:var(--text-muted);padding:2.5rem;">Žiadne novinky</div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import FilterBar from '../components/FilterBar.vue'
export default {
  name: 'NovinkyView',
  components: { AppFooter, FilterBar },
  setup() {
    const store = useNtiStore()
    const activeFilter = ref('Všetky')
    const kategorie = computed(() => ['Všetky', ...new Set(store.novinky.map(n => n.kategoria))])
    const filtered = computed(() => activeFilter.value === 'Všetky' ? store.novinky : store.novinky.filter(n => n.kategoria === activeFilter.value))
    return { activeFilter, kategorie, filtered }
  }
}
</script>

<style scoped>
.novinky-list { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
.novinka-row { display: grid; grid-template-columns: 110px 1fr 30px; gap: 1.5rem; padding: 1.5rem; border-bottom: 1px solid var(--border); text-decoration: none; color: var(--text); align-items: center; transition: background 0.15s; background: var(--white); }
.novinka-row:last-child { border-bottom: none; }
.novinka-row:hover { background: var(--surface); }
.novinka-row-date { font-size: 0.8rem; color: var(--text-muted); }
.novinka-row-content h3 { font-size: 0.95rem; color: var(--navy); margin-bottom: 0.35rem; font-weight: 500; line-height: 1.4; }
.novinka-row-content p { font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; }
.novinka-row-arrow { color: var(--accent); font-size: 1.1rem; text-align: right; }
@media (max-width: 600px) { .novinka-row { grid-template-columns: 1fr; } .novinka-row-arrow { display: none; } }
</style>