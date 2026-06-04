<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>Výzvy a termíny</h1>
        <p>Aktívne kolá a dôležité dátumy pre oba programy NTI.</p>
      </div>
      <FilterBar v-model="activeFilter" :filters="typy" :searchable="false" />
      <div class="vyzvy-list">
        <div class="vyzva-row" v-for="v in filtered" :key="v.id">
          <div class="vyzva-meta">
            <span :class="['tag', v.typ === 'Program A' ? 'tag-area' : 'tag-faza seed']">{{ v.typ }}</span>
            <span :class="['tag','tag-stav', stavKey(v.stav)]">{{ v.stav }}</span>
          </div>
          <div class="vyzva-content">
            <h3>{{ v.nazov }}</h3>
            <p>{{ v.popis }}</p>
          </div>
          <div class="vyzva-deadline-col">
            <span class="vd-label">Deadline</span>
            <span class="vd-date">{{ v.deadline }}</span>
            <RouterLink v-if="v.stav === 'Aktívne'" :to="v.typ === 'Program A' ? '/registracia/vedouci' : '/registracia/student'" class="btn-detail" style="margin-top:0.5rem;">Prihlásiť sa →</RouterLink>
          </div>
        </div>
        <div v-if="!filtered.length" class="empty-state">Žiadne výzvy pre zvolený filter.</div>
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
  name: 'VyzyvyView',
  components: { AppFooter, FilterBar },
  setup() {
    const store = useNtiStore()
    const activeFilter = ref('Všetky')
    const typy = ['Všetky', 'Program A', 'Program B']
    const filtered = computed(() => activeFilter.value === 'Všetky' ? store.vyzvy : store.vyzvy.filter(v => v.typ === activeFilter.value))
    const stavKey = (stav) => ({ 'Aktívne': 'open', 'Uzavreté': 'closed', 'Pripravované': 'pairing' }[stav] || '')
    return { activeFilter, typy, filtered, stavKey }
  }
}
</script>

<style scoped>
.vyzvy-list { display: flex; flex-direction: column; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; }
.vyzva-row { display: grid; grid-template-columns: 140px 1fr 160px; gap: 1.5rem; padding: 1.5rem; border-bottom: 1px solid var(--border); align-items: center; background: var(--white); transition: background 0.15s; }
.vyzva-row:last-child { border-bottom: none; }
.vyzva-row:hover { background: var(--surface); }
.vyzva-meta { display: flex; flex-direction: column; gap: 0.4rem; }
.vyzva-content h3 { font-size: 0.95rem; color: var(--navy); margin-bottom: 0.35rem; font-weight: 500; }
.vyzva-content p { font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; }
.vyzva-deadline-col { display: flex; flex-direction: column; align-items: flex-end; }
.vd-label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); }
.vd-date { font-size: 0.9rem; color: var(--navy); font-weight: 500; margin-top: 0.2rem; }
.empty-state { text-align: center; color: var(--text-muted); padding: 2.5rem; }
@media (max-width: 600px) { .vyzva-row { grid-template-columns: 1fr; } .vyzva-deadline-col { align-items: flex-start; } }
</style>