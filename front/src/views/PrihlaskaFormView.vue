<template>
  <div class="page-content">
    <div class="pf-wrap">
      <RouterLink to="/dashboard" class="back-btn">← Späť na dashboard</RouterLink>
      <h1>Prihláška — Program {{ program }}</h1>
      <p class="pf-sub">Vyplň údaje a odošli prihlášku. Po odoslaní čakáš na schválenie NTI.</p>

      <div class="pf-form">

        <div class="pf-section">Základné údaje</div>
        <div class="pf-group">
          <label>Názov projektu / startupu</label>
          <input class="pf-input" v-model="form.nazov" type="text" placeholder="Názov" />
        </div>
        <div class="pf-group">
          <label>Popis projektu</label>
          <textarea class="pf-input" v-model="form.popis" rows="4" placeholder="Stručný popis nápadu alebo zadania..." />
        </div>
        <div class="pf-group">
          <label>Oblasť / sektor</label>
          <input class="pf-input" v-model="form.oblast" type="text" placeholder="IT, AgriTech, HealthTech..." />
        </div>

        <!-- Rozšírenie pre vedúceho tímu -->
        <template v-if="role === 'vedouci'">
          <div class="pf-section">Údaje tímu</div>
          <div class="pf-group">
            <label>Názov tímu</label>
            <input class="pf-input" v-model="form.nazovTimu" type="text" />
          </div>
          <div v-for="(clen, i) in form.clenovia" :key="i" class="pf-clen-row">
            <span class="pf-clen-label">Člen {{ i + 1 }}</span>
            <input class="pf-input" v-model="clen.meno" type="text" placeholder="Meno a priezvisko" />
            <input class="pf-input" v-model="clen.email" type="email" placeholder="email@student.sk" />
            <button class="pf-btn-remove" @click="form.clenovia.splice(i,1)">✕</button>
          </div>
          <button class="pf-btn-outline" @click="form.clenovia.push({ meno: '', email: '' })">+ Pridať člena</button>
        </template>

        <div class="pf-group" style="margin-top:1rem;">
          <label>Motivačný list (voliteľné)</label>
          <textarea class="pf-input" v-model="form.motivacia" rows="3" placeholder="Prečo chceš vstúpiť do programu..." />
        </div>

        <p v-if="chyba" class="pf-error">{{ chyba }}</p>

        <div class="pf-actions">
          <RouterLink to="/dashboard" class="pf-btn-cancel">Zrušiť</RouterLink>
          <button class="pf-btn-submit" @click="odoslat">Potvrdiť a odoslať</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'

export default {
  name: 'PrihlaskaFormView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const program = route.query.program || 'A'
    const role = userStore.role
    const chyba = ref('')

    const form = ref({
      nazov: '',
      popis: '',
      oblast: '',
      motivacia: '',
      nazovTimu: '',
      clenovia: [],
    })

    function odoslat() {
      if (!form.value.nazov.trim()) { chyba.value = 'Vyplň názov projektu.'; return }
      // TODO: odoslať na backend
      router.push('/')
    }

    return { program, role, form, chyba, odoslat }
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