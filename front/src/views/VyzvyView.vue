<template>
  <div class="page-content">
    <PageHero label="Termíny" title="Výzvy a termíny"
      sub="Aktívne kolá programov a kľúčové dátumy. Nezmeškaj deadline." />

    <div class="vyzvy-page">
      <!-- Stav načítania / chyby -->
      <p v-if="loading" class="vyzvy-info">Načítavam výzvy...</p>
      <p v-else-if="chyba" class="vyzvy-info vyzvy-err">{{ chyba }}</p>
      <p v-else-if="!store.vyzvy.length" class="vyzvy-info">Žiadne aktívne výzvy.</p>

      <!-- Zoznam výziev -->
      <div v-else class="vyzvy-list">
        <div v-for="v in store.vyzvy" :key="v.id" class="vyzva-card">
          <div class="vyzva-top">
            <span class="tag">{{ v.program }}</span>
            <span :class="['vyzva-stav', v.stav === 'Otvorená' ? 'open' : 'closed']">{{ v.stav }}</span>
          </div>
          <h3>{{ v.nazov }}</h3>
          <p v-if="v.popis">{{ v.popis }}</p>
          <div class="vyzva-deadline">Deadline: <strong>{{ v.deadline }}</strong></div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import PageHero from '../components/PageHero.vue'
export default {
  name: 'VyzvyView',
  components: { AppFooter, PageHero },
  setup() {
    const store = useNtiStore()
    const loading = ref(true)
    const chyba = ref('')

    // Načítaj výzvy z backendu pri otvorení stránky + ošetri chybu
    onMounted(async () => {
      try {
        await store.fetchVyzvy()
      } catch (e) {
        chyba.value = 'Výzvy sa nepodarilo načítať.'
      } finally {
        loading.value = false
      }
    })

    return { store, loading, chyba }
  }
}
</script>

<style scoped>
.vyzvy-page { max-width: 1100px; margin: 0 auto; padding: 3rem 2.5rem; }
.vyzvy-info { color: var(--text-muted); padding: 1.5rem 0; }
.vyzvy-err { color: #dc2626; }
.vyzvy-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }
.vyzva-card { border: 1px solid var(--border); border-radius: 6px; padding: 1.5rem; background: var(--white); display: flex; flex-direction: column; gap: 0.6rem; }
.vyzva-top { display: flex; justify-content: space-between; align-items: center; }
.vyzva-card h3 { font-size: 1rem; color: var(--navy); font-weight: 500; }
.vyzva-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
.vyzva-stav { font-size: 0.72rem; font-weight: 600; padding: 0.15rem 0.6rem; border-radius: 20px; }
.vyzva-stav.open { background: #dcfce7; color: #16a34a; }
.vyzva-stav.closed { background: #f1f5f9; color: #64748b; }
.vyzva-deadline { font-size: 0.82rem; color: var(--text); border-top: 1px solid var(--border); padding-top: 0.6rem; }
@media (max-width: 600px) { .vyzvy-page { padding: 2rem 1.25rem; } }
</style>