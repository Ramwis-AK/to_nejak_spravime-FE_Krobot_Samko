<template>
  <div class="page-content">
    <div class="form-page" v-if="role">
      <RouterLink to="/registracia" class="back-btn">← Späť</RouterLink>
      <h1>{{ role.name }}</h1>
      <p class="form-subtitle">{{ role.desc }}</p>

      <div v-if="sent" class="form-success">
        ✓ Registrácia bola odoslaná. Skontrolujte váš e-mail pre potvrdenie.
      </div>
      <template v-else>
        <p class="form-section-title">Základné údaje</p>
        <div class="form-row">
          <div class="form-group">
            <label>Meno *</label>
            <input v-model="form.meno" type="text" placeholder="Ján" />
          </div>
          <div class="form-group">
            <label>Priezvisko *</label>
            <input v-model="form.priezvisko" type="text" placeholder="Novák" />
          </div>
        </div>
        <div class="form-group">
          <label>E-mail *</label>
          <input v-model="form.email" type="email" placeholder="jan@ukf.sk" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Heslo *</label>
            <input v-model="form.heslo" type="password" placeholder="min. 8 znakov" />
          </div>
          <div class="form-group">
            <label>Zopakuj heslo *</label>
            <input v-model="form.heslo2" type="password" placeholder="zopakuj heslo" />
          </div>
        </div>

        <hr class="form-divider" />

        <template v-if="role.key === 'student' || role.key === 'vedouci'">
          <p class="form-section-title">Študentské informácie</p>
          <div class="form-row">
            <div class="form-group">
              <label>Študijný program</label>
              <input v-model="form.studijnyProgram" type="text" placeholder="Informatika" />
            </div>
            <div class="form-group">
              <label>Ročník</label>
              <select v-model="form.rocnik">
                <option value="">— Vyber —</option>
                <option>1.</option><option>2.</option><option>3.</option>
                <option>4.</option><option>5.</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Zručnosti / technológie</label>
            <input v-model="form.zrucnosti" type="text" placeholder="Vue.js, Python, Laravel..." />
          </div>
          <div class="form-group">
            <label>Program, o ktorý mám záujem</label>
            <select v-model="form.program">
              <option value="">— Vyber —</option>
              <option>Program A — Grantový inkubačný program</option>
              <option>Program B — Živá prax</option>
              <option>Obidva</option>
            </select>
          </div>
        </template>

        <template v-if="role.key === 'firma'">
          <p class="form-section-title">Informácie o organizácii</p>
          <div class="form-group">
            <label>Názov organizácie *</label>
            <input v-model="form.nazovOrg" type="text" placeholder="Acme s.r.o." />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>IČO</label>
              <input v-model="form.ico" type="text" placeholder="12345678" />
            </div>
            <div class="form-group">
              <label>Sektor</label>
              <select v-model="form.sektor">
                <option value="">— Vyber —</option>
                <option>IT / SaaS</option><option>FinTech</option>
                <option>HealthTech</option><option>Logistika</option>
                <option>AgriTech</option><option>EdTech</option><option>Iné</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Popis organizácie</label>
            <textarea v-model="form.popisOrg" placeholder="Stručný opis vašej spoločnosti..."></textarea>
          </div>
        </template>

        <template v-if="role.key === 'mentor'">
          <p class="form-section-title">Odborný profil</p>
          <div class="form-group">
            <label>Oblasť expertízy</label>
            <input v-model="form.expertiza" type="text" placeholder="Architektúra, AI, Biznis..." />
          </div>
          <div class="form-group">
            <label>Skúsenosti</label>
            <textarea v-model="form.skusenosti" placeholder="Stručný opis vašich skúseností..."></textarea>
          </div>
        </template>

        <hr class="form-divider" />

        <div class="form-group">
          <div class="checkbox-group">
            <input id="gdpr" type="checkbox" v-model="form.gdpr" />
            <label for="gdpr">Súhlasím so spracovaním osobných údajov v súlade s GDPR a podmienkami NTI. *</label>
          </div>
        </div>

        <div v-if="chyba" class="form-error">{{ chyba }}</div>

        <div class="form-actions">
          <button class="btn-primary" @click="handleSubmit">Zaregistrovať sa →</button>
          <RouterLink to="/registracia" class="btn-outline">Zrušiť</RouterLink>
        </div>
        <p class="form-note">* Povinné polia. Po registrácii dostanete potvrdzovací e-mail.</p>
      </template>
    </div>
    <div v-else class="form-page">
      <RouterLink to="/registracia" class="back-btn">← Späť</RouterLink>
      <p style="color:var(--text-muted);">Rola nenájdená.</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNtiStore } from '../stores/nti.js'
import { useUserStore } from '../stores/user.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'RegistraciaFormView',
  components: { AppFooter },
  setup() {
    const store = useNtiStore()
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()
    const role = computed(() => store.getRoleByKey(route.params.role))
    const sent = ref(false)
    const chyba = ref('')
    const form = reactive({
      meno: '', priezvisko: '', email: '', heslo: '', heslo2: '',
      studijnyProgram: '', rocnik: '', zrucnosti: '', program: '',
      nazovOrg: '', ico: '', sektor: '', popisOrg: '',
      expertiza: '', skusenosti: '', gdpr: false,
    })

    const handleSubmit = async () => {
      chyba.value = ''
      if (!form.meno || !form.email || !form.heslo) { chyba.value = 'Vyplňte povinné polia.'; return }
      if (form.heslo !== form.heslo2) { chyba.value = 'Heslá sa nezhodujú.'; return }
      if (!form.gdpr) { chyba.value = 'Súhlas so spracovaním údajov je povinný.'; return }

      // poskladaj payload pre backend podľa roly
      const payload = {
        meno: form.nazovOrg && role.value.key === 'firma' ? form.nazovOrg : form.meno,
        priezvisko: role.value.key === 'firma' ? '' : form.priezvisko,
        email: form.email,
        password: form.heslo,
        password_confirmation: form.heslo2,
        rola: role.value.key,
        ico: form.ico,
        sektor: form.sektor,
        popis: form.popisOrg || form.skusenosti || '',
      }

      try {
        await userStore.register(payload)
        sent.value = true
        setTimeout(() => router.push('/dashboard'), 1200)
      } catch (e) {
        chyba.value = e.message
      }
    }

    return { role, form, sent, chyba, handleSubmit }
  }
}
</script>