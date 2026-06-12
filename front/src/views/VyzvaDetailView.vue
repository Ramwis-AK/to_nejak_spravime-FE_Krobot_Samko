<template>
  <div class="page-content">
    <div class="detail-page" v-if="vyzva">
      <RouterLink to="/vyzvy" class="back-btn">← Späť na výzvy</RouterLink>

      <div class="detail-tags">
        <span class="tag tag-area">{{ vyzva.program }}</span>
        <span :class="['tag', vyzva.stav === 'Otvorená' ? 'tag-open' : '']">{{ vyzva.stav }}</span>
      </div>
      <h1>{{ vyzva.nazov }}</h1>
      <p class="termin">
        <span v-if="vyzva.otvorenie">Otvorenie: <strong>{{ vyzva.otvorenie }}</strong> · </span>
        Deadline: <strong>{{ vyzva.deadline }}</strong>
      </p>

      <div class="detail-section" v-if="vyzva.popis">
        <h2>O výzve</h2>
        <p>{{ vyzva.popis }}</p>
      </div>

      <!-- Tematické kategórie / stacky (§7.1) -->
      <div class="detail-section" v-if="vyzva.kategorie && vyzva.kategorie.length">
        <h2>Kategórie</h2>
        <div class="chips">
          <span v-for="(k, i) in vyzva.kategorie" :key="i" class="chip">{{ k }}</span>
        </div>
      </div>

      <!-- Kritériá výberu (§7.2) -->
      <div class="detail-section" v-if="vyzva.kriteria && vyzva.kriteria.length">
        <h2>Kritériá výberu</h2>
        <ul>
          <li v-for="(k, i) in vyzva.kriteria" :key="i">{{ k }}</li>
        </ul>
      </div>

      <!-- Povinná dokumentácia (§7.3) -->
      <div class="detail-section" v-if="vyzva.dokumenty && vyzva.dokumenty.length">
        <h2>Povinná dokumentácia</h2>
        <ul>
          <li v-for="(d, i) in vyzva.dokumenty" :key="i">{{ d }}</li>
        </ul>
      </div>

      <!-- FAQ -->
      <div class="detail-section" v-if="vyzva.faq && vyzva.faq.length">
        <h2>Časté otázky</h2>
        <div v-for="(f, i) in vyzva.faq" :key="i" class="faq-item">
          <strong>{{ f.otazka }}</strong>
          <p>{{ f.odpoved }}</p>
        </div>
      </div>

      <!-- CTA: prihlásenie. Neprihlásený → registrácia, prihlásený → dashboard -->
      <div v-if="vyzva.stav === 'Otvorená'" class="cta-row">
        <RouterLink :to="userStore.isLoggedIn ? '/dashboard' : '/registracia'" class="btn-primary">
          Prihlásiť sa do výzvy →
        </RouterLink>
      </div>
    </div>

    <div v-else-if="loading" class="detail-page">
      <p style="color:var(--text-muted);">Načítavam...</p>
    </div>
    <div v-else class="detail-page">
      <RouterLink to="/vyzvy" class="back-btn">← Späť</RouterLink>
      <p style="color:var(--text-muted);">Výzva nenájdená.</p>
    </div>

    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import { useUserStore } from '../stores/user.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'VyzvaDetailView',
  components: { AppFooter },
  setup() {
    const store = useNtiStore()
    const userStore = useUserStore()
    const route = useRoute()
    const vyzva = ref(null)
    const loading = ref(true)

    // Načítaj jednu výzvu podľa ID; pri 404 ostane null
    onMounted(async () => {
      try {
        vyzva.value = await store.fetchVyzva(route.params.id)
      } catch (e) {
        vyzva.value = null
      } finally {
        loading.value = false
      }
    })

    return { vyzva, loading, userStore }
  }
}
</script>

<style scoped>
.detail-page { max-width: 800px; margin: 0 auto; padding: 3rem 2.5rem; }
.detail-tags { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.tag-open { background: #dcfce7; color: #16a34a; }
.termin { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
.detail-section { margin-top: 2rem; }
.detail-section h2 { font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
.detail-section p, .detail-section li { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; }
.detail-section ul { padding-left: 1.2rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.chip { font-size: 0.8rem; background: var(--surface); border: 1px solid var(--border); padding: 0.3rem 0.7rem; border-radius: 20px; color: var(--navy); }
.faq-item { margin-bottom: 1rem; }
.faq-item strong { display: block; color: var(--navy); font-size: 0.92rem; margin-bottom: 0.25rem; }
.cta-row { margin-top: 2.5rem; }
@media (max-width: 600px) { .detail-page { padding: 2rem 1.25rem; } }
</style>