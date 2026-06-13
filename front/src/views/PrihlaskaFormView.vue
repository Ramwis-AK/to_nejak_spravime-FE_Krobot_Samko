<template>
  <div class="page-content">
    <div class="pf-wrap">
      <RouterLink to="/dashboard" class="back-btn">← Späť na dashboard</RouterLink>
      <h1>Prihláška — Program {{ program }}</h1>
      <p class="pf-sub">Vyber projekt z ponuky. Motivačný list a CV sú voliteľné.</p>

      <div class="pf-form">
        <!-- Výber projektu z ponuky -->
        <div class="pf-group">
          <label>Projekt *</label>
          <select class="pf-input" v-model="vybranyProjekt">
            <option value="">— Vyber projekt —</option>
            <option v-for="p in ponuka" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <!-- Voliteľný motivačný list (súbor) -->
        <div class="pf-group">
          <label>Motivačný list (voliteľné, PDF/DOC)</label>
          <input type="file" accept=".pdf,.doc,.docx" @change="e => motivList = e.target.files[0]" />
        </div>

        <!-- Voliteľné CV / iný dokument -->
        <div class="pf-group">
          <label>CV alebo iný dokument (voliteľné, PDF/DOC)</label>
          <input type="file" accept=".pdf,.doc,.docx" @change="e => cvSubor = e.target.files[0]" />
        </div>

        <p v-if="chyba" class="pf-error">{{ chyba }}</p>

        <div class="pf-actions">
          <RouterLink to="/dashboard" class="pf-btn-cancel">Zrušiť</RouterLink>
          <button class="pf-btn-submit" @click="odoslat" :disabled="odosielam">
            {{ odosielam ? 'Odosielam...' : 'Potvrdiť a odoslať' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'

export default {
  name: 'PrihlaskaFormView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const ntiStore = useNtiStore()
    const program = route.query.program || 'A'

    const ponuka = ref([])          // zoznam ponúkaných projektov
    const vybranyProjekt = ref('')
    const motivList = ref(null)     // voliteľný súbor
    const cvSubor = ref(null)       // voliteľný súbor
    const chyba = ref('')
    const odosielam = ref(false)

    // Načítaj ponuku projektov podľa programu (A = startupy, B = prax)
    onMounted(async () => {
      try {
        if (program === 'A') {
          const startupy = await ntiStore.fetchStartupyRaw()
          ponuka.value = startupy.map(s => s.nazov)
        } else {
          const praxe = await ntiStore.fetchPraxeRaw()
          ponuka.value = praxe.map(p => `${p.firma} — ${p.zadanie}`)
        }
      } catch (e) { chyba.value = 'Nepodarilo sa načítať ponuku projektov.' }
    })

    // pomocná funkcia na nahratie voliteľného súboru
    async function nahraj(subor) {
      const fd = new FormData()
      fd.append('subor', subor)
      await ntiStore.nahratDokument(fd)
    }

    async function odoslat() {
      chyba.value = ''
      if (!vybranyProjekt.value) { chyba.value = 'Vyber projekt z ponuky.'; return }
      odosielam.value = true
      try {
        // voliteľné súbory uložíme do úložiska (dokumenty)
        if (motivList.value) await nahraj(motivList.value)
        if (cvSubor.value) await nahraj(cvSubor.value)
        // podaj prihlášku
        await ntiStore.podatPrihlasku({ program, nazov: vybranyProjekt.value })
        router.push('/dashboard')
      } catch (e) {
        chyba.value = e.message
      } finally {
        odosielam.value = false
      }
    }

    return { program, ponuka, vybranyProjekt, motivList, cvSubor, chyba, odosielam, odoslat }
  }
}
</script>
<style scoped>
.pf-wrap { max-width: 620px; margin: 0 auto; padding: 2.5rem 1.5rem; }
.pf-wrap h1 { font-size: 1.6rem; font-weight: 700; color: #1e293b; margin: 1rem 0 0.4rem; }
.pf-sub { font-size: 0.92rem; color: #64748b; margin-bottom: 2rem; }
.pf-form { display: flex; flex-direction: column; gap: 0.9rem; }
.pf-section { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding-bottom: 0.3rem; border-bottom: 1px solid #f1f5f9; margin-top: 0.5rem; }
.pf-group { display: flex; flex-direction: column; gap: 0.35rem; }
.pf-group label { font-size: 0.85rem; font-weight: 600; color: #475569; }
.pf-input { padding: 0.65rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; outline: none; font-family: inherit; transition: border-color 0.2s; resize: vertical; }
.pf-input:focus { border-color: #c8972a; }
.pf-clen-row { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.pf-clen-label { font-size: 0.8rem; color: #94a3b8; min-width: 50px; }
.pf-clen-row .pf-input { flex: 1; min-width: 140px; }
.pf-btn-remove { background: none; border: none; color: #94a3b8; font-size: 1rem; cursor: pointer; padding: 0 0.3rem; }
.pf-btn-remove:hover { color: #dc2626; }
.pf-btn-outline { align-self: flex-start; padding: 0.4rem 0.9rem; background: none; border: 1px solid #c8972a; color: #c8972a; border-radius: 6px; font-size: 0.85rem; cursor: pointer; font-family: inherit; }
.pf-error { color: #dc2626; font-size: 0.88rem; margin: 0; }
.pf-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
.pf-btn-submit { padding: 0.7rem 1.5rem; background: #c8972a; color: #fff; border: none; border-radius: 8px; font-size: 0.95rem; font-weight: 600; cursor: pointer; font-family: inherit; }
.pf-btn-submit:hover { background: #a87820; }
.pf-btn-cancel { padding: 0.7rem 1.2rem; background: none; border: 1px solid #e2e8f0; color: #64748b; border-radius: 8px; font-size: 0.95rem; text-decoration: none; display: flex; align-items: center; }
</style>