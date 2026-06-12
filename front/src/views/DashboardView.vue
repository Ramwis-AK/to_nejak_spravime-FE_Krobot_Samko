<!-- front/src/views/DashboardView.vue  (nahraď celý súbor) -->
<template>
  <div class="db-layout">
    <aside class="db-sidebar" :class="{ open: sidebarOpen }">
      <div class="db-sidebar-header">
        <span class="db-role-badge">{{ roleLabel }}</span>
        <button class="db-close-btn" @click="sidebarOpen = false">✕</button>
      </div>
      <nav class="db-nav">
        <button v-for="item in visibleMenu" :key="item.key" class="db-nav-item"
          :class="{ active: activeSection === item.key }" @click="navigate(item.key)">
          <span class="db-nav-icon">{{ item.icon }}</span>{{ item.label }}
        </button>
      </nav>
      <div class="db-sidebar-footer">
        <span class="db-user-name">{{ userStore.meno }}</span>
        <button class="db-logout-btn" @click="logout">Odhlásiť</button>
      </div>
    </aside>

    <div v-if="sidebarOpen" class="db-overlay" @click="sidebarOpen = false" />

    <main class="db-main">
      <div class="db-topbar">
        <button class="db-hamburger" @click="sidebarOpen = !sidebarOpen">☰</button>
        <h2 class="db-section-title">{{ currentSection?.label }}</h2>
      </div>

      <div class="db-content">
        <p v-if="chyba" class="db-error">{{ chyba }}</p>

        <!-- ===== PROFIL (všetky roly) ===== -->
        <div v-if="activeSection === 'profil'" class="db-panel">
          <h3>Môj profil</h3>
          <div class="db-form-group"><label>Meno</label><input class="db-input" v-model="profil.meno" type="text" /></div>
          <div class="db-form-group"><label>Telefón</label><input class="db-input" v-model="profil.telefon" type="tel" /></div>
          <div class="db-form-group"><label>Adresa</label><input class="db-input" v-model="profil.adresa" type="text" /></div>
          <template v-if="role === 'firma'">
            <div class="db-form-group"><label>IČO</label><input class="db-input" v-model="profil.ico" type="text" /></div>
            <div class="db-form-group"><label>Sektor</label><input class="db-input" v-model="profil.sektor" type="text" /></div>
            <div class="db-form-group"><label>Web</label><input class="db-input" v-model="profil.web" type="url" /></div>
          </template>
          <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
          <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
        </div>

        <!-- ===== ŠTUDENT / VEDÚCI: PRIHLÁŠKA ===== -->
        <div v-else-if="activeSection === 'prihlaska'" class="db-panel">
          <h3>Moje prihlášky</h3>
          <div class="db-prog-cards" style="margin-bottom:1rem;">
            <div class="db-prog-card" @click="novaPrihlaska('A')">
              <span class="db-prog-tag">Program A</span><strong>Startup / Inkubácia</strong>
              <span class="db-btn-sm">Podať prihlášku →</span>
            </div>
            <div class="db-prog-card" @click="novaPrihlaska('B')">
              <span class="db-prog-tag">Program B</span><strong>Živá prax</strong>
              <span class="db-btn-sm">Podať prihlášku →</span>
            </div>
          </div>
          <div v-if="prihlasky.length" class="db-clenovia-list">
            <div v-for="p in prihlasky" :key="p.id" class="db-clen-item">
              <span>{{ p.nazov }} — Program {{ p.program }}</span>
              <span class="db-badge grey">{{ p.stav }}</span>
            </div>
          </div>
          <div v-else class="db-empty">Zatiaľ žiadne prihlášky.</div>
        </div>

        <!-- ===== VEDÚCI: TÍM ===== -->
        <div v-else-if="activeSection === 'tim'">
          <div v-if="!mojTim" class="db-panel">
            <h3>Vytvoriť tím</h3>
            <div class="db-form-group"><label>Názov tímu</label><input class="db-input" v-model="novyTim.nazov" type="text" /></div>
            <div class="db-form-group"><label>Projekt</label><input class="db-input" v-model="novyTim.projekt" type="text" /></div>
            <div class="db-form-group"><label>Program</label>
              <select class="db-input" v-model="novyTim.program">
                <option>Program A</option><option>Program B</option>
              </select>
            </div>
            <button class="db-btn" @click="vytvoritTim">Vytvoriť tím</button>
          </div>
          <div v-else class="db-panel">
            <h3>Môj tím</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Názov</span><span>{{ mojTim.nazov }}</span>
              <span class="db-info-label">Projekt</span><span>{{ mojTim.projekt }}</span>
              <span class="db-info-label">Program</span><span>{{ mojTim.program }}</span>
              <span class="db-info-label">Mentor</span><span>{{ mojTim.mentor || '—' }}</span>
            </div>
            <div class="db-kod-box">
              <span class="db-kod-label">Kód tímu (zdieľaj s mentorom)</span>
              <div class="db-kod-row">
                <strong class="db-kod">{{ mojTim.kod }}</strong>
                <button class="db-btn-sm-outline" @click="kopirovat(mojTim.kod)">{{ skopirovane ? '✓' : 'Kopírovať' }}</button>
              </div>
            </div>
            <div class="db-section-divider">Členovia</div>
            <div class="db-clenovia-list">
              <div v-for="(c, i) in mojTim.clenovia" :key="i" class="db-clen-item">
                <span>{{ c.meno }}</span><span class="db-muted">{{ c.telefon }}</span>
              </div>
            </div>
            <div class="db-section-divider">Pridať člena</div>
            <div class="db-invite-row">
              <input class="db-input" v-model="novyClen.meno" placeholder="Meno" />
              <input class="db-input" v-model="novyClen.telefon" placeholder="Telefón" />
              <button class="db-btn" @click="pridatClena">Pridať</button>
            </div>
          </div>
        </div>

        <!-- ===== FIRMA: ZADANIA (CRUD) ===== -->
        <div v-else-if="activeSection === 'zadania'">
          <div class="db-panel" style="margin-bottom:1rem;">
            <h3>{{ editKod ? 'Upraviť zadanie' : 'Pridať zadanie' }}</h3>
            <div class="db-form-group"><label>Názov</label><input class="db-input" v-model="zadanieForm.nazov" type="text" /></div>
            <div class="db-form-group"><label>Sektor</label><input class="db-input" v-model="zadanieForm.sektor" type="text" /></div>
            <div class="db-form-group"><label>Lokalita</label><input class="db-input" v-model="zadanieForm.lokalita" type="text" /></div>
            <div class="db-form-group"><label>Odmena</label><input class="db-input" v-model="zadanieForm.odmena" type="text" /></div>
            <div class="db-form-group"><label>Popis</label><textarea class="db-input" v-model="zadanieForm.popis" rows="3" /></div>
            <div class="db-form-group"><label>Stav</label>
              <select class="db-input" v-model="zadanieForm.stav">
                <option>Otvorené</option><option>Párovanie</option><option>V realizácii</option><option>Uzavreté</option>
              </select>
            </div>
            <div style="display:flex;gap:0.5rem;">
              <button class="db-btn" @click="ulozZadanie">{{ editKod ? 'Uložiť' : 'Pridať' }}</button>
              <button v-if="editKod" class="db-btn-outline" @click="zrusitEdit">Zrušiť</button>
            </div>
          </div>
          <div v-if="zadania.length">
            <div v-for="z in zadania" :key="z.kod" class="db-zadanie-card">
              <div class="db-zadanie-header">
                <strong>{{ z.nazov }}</strong>
                <span class="db-kod-inline">{{ z.kod }}</span>
              </div>
              <p style="font-size:0.85rem;color:#64748b;">{{ z.popis }}</p>
              <div style="display:flex;gap:0.5rem;">
                <button class="db-btn-sm-outline" @click="upravit(z)">Upraviť</button>
                <button class="db-btn-danger" @click="zmazat(z.kod)">Zmazať</button>
              </div>
            </div>
          </div>
          <div v-else class="db-empty">Žiadne zadania.</div>
        </div>

        <!-- ===== MENTOR: TÍMY A MÍĽNIKY ===== -->
        <div v-else-if="activeSection === 'mentorTimy'">
          <div class="db-panel" style="margin-bottom:1rem;">
            <h3>Pripojiť sa k tímu</h3>
            <div class="db-invite-row">
              <input class="db-input" v-model="timKod" placeholder="TIM-XXXX" style="text-transform:uppercase;" />
              <button class="db-btn" @click="pripojit">Pripojiť sa</button>
            </div>
            <p v-if="mentorChyba" class="db-error">{{ mentorChyba }}</p>
            <p v-if="mentorUspech" class="db-success">{{ mentorUspech }}</p>
          </div>
          <div v-for="t in mentorTimy" :key="t.kod" class="db-panel" style="margin-bottom:1rem;">
            <div class="db-zadanie-header"><strong>{{ t.nazov }}</strong><span class="db-kod-inline">{{ t.kod }}</span></div>
            <div class="db-info-grid" style="margin-top:0.5rem;">
              <span class="db-info-label">Projekt</span><span>{{ t.projekt }}</span>
              <span class="db-info-label">Program</span><span>{{ t.program }}</span>
            </div>
            <div class="db-section-divider">Míľniky</div>
            <div v-if="t.milniky.length" class="db-milnik-list">
              <div v-for="m in t.milniky" :key="m.id" class="db-milnik-item">
                <span>{{ m.nazov }}</span>
                <span :class="['db-badge', m.splneny ? 'green' : 'grey']">{{ m.splneny ? 'Splnený' : 'Čakajúci' }}</span>
                <button v-if="!m.splneny" class="db-btn-sm-outline" @click="schvalit(t.kod, m.id)">Schváliť</button>
              </div>
            </div>
            <div v-else class="db-empty">Žiadne míľniky.</div>
            <div class="db-invite-row" style="margin-top:0.5rem;">
              <input class="db-input" v-model="novyMilnik[t.kod]" placeholder="Názov míľnika" />
              <button class="db-btn" @click="pridatMilnik(t.kod)">Pridať</button>
            </div>
          </div>
          <div v-if="!mentorTimy.length" class="db-panel"><div class="db-empty">Nie si priradený k žiadnemu tímu.</div></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useNtiStore } from '../stores/nti.js'
import { useRouter } from 'vue-router'

const MENU = [
  { key: 'profil',     label: 'Môj profil', icon: '👤', roles: ['student','vedouci','firma','mentor'] },
  { key: 'prihlaska',  label: 'Prihláška',  icon: '📋', roles: ['student','vedouci'] },
  { key: 'tim',        label: 'Môj tím',    icon: '👥', roles: ['vedouci'] },
  { key: 'zadania',    label: 'Zadania',    icon: '📝', roles: ['firma'] },
  { key: 'mentorTimy', label: 'Tímy a míľniky', icon: '🏁', roles: ['mentor'] },
]
const LABELS = { student: 'Študent', vedouci: 'Vedúci tímu', firma: 'Firma / partner', mentor: 'Mentor' }

export default {
  name: 'DashboardView',
  setup() {
    const userStore = useUserStore()
    const ntiStore = useNtiStore()
    const router = useRouter()
    const sidebarOpen = ref(false)
    const chyba = ref('')

    const role = computed(() => userStore.role)
    const roleLabel = computed(() => LABELS[role.value] || role.value)
    const visibleMenu = computed(() => MENU.filter(i => i.roles.includes(role.value)))
    const activeSection = ref(null)
    const currentSection = computed(() => MENU.find(i => i.key === activeSection.value))

    // --- profil ---
    const profil = reactive({ meno: '', telefon: '', adresa: '', ico: '', sektor: '', web: '' })
    const profilUlozene = ref(false)

    // --- dáta podľa roly ---
    const prihlasky = ref([])
    const mojTim = ref(null)
    const mentorTimy = ref([])
    const zadania = ref([])

    onMounted(async () => {
      // ochrana stránky — neprihlásený ide na registráciu
      if (!userStore.isLoggedIn) { router.push('/registracia'); return }
      if (visibleMenu.value.length) activeSection.value = visibleMenu.value[0].key

      // predvyplň profil z uložených údajov
      profil.meno = userStore.meno
      Object.assign(profil, userStore.profil)

      try {
        if (role.value === 'student' || role.value === 'vedouci') prihlasky.value = await ntiStore.fetchPrihlasky()
        if (role.value === 'vedouci') mojTim.value = await ntiStore.fetchMojTim()
        if (role.value === 'mentor') mentorTimy.value = await ntiStore.fetchMentorTimy()
        if (role.value === 'firma') zadania.value = await ntiStore.fetchZadania()
      } catch (e) { chyba.value = e.message }
    })

    function navigate(k) { activeSection.value = k; sidebarOpen.value = false }
    async function logout() { await userStore.logout(); router.push('/registracia') }

    async function ulozProfil() {
      chyba.value = ''
      try {
        await userStore.ulozProfil({ ...profil })
        profilUlozene.value = true
        setTimeout(() => profilUlozene.value = false, 2500)
      } catch (e) { chyba.value = e.message }
    }

    // --- prihláška ---
    function novaPrihlaska(program) { router.push({ path: '/dashboard/prihlaska-form', query: { program } }) }

    // --- vedúci: tím ---
    const novyTim = reactive({ nazov: '', projekt: '', program: 'Program A' })
    const novyClen = reactive({ meno: '', telefon: '' })
    const skopirovane = ref(false)

    async function vytvoritTim() {
      chyba.value = ''
      try { mojTim.value = await ntiStore.vytvoritTim({ ...novyTim }) }
      catch (e) { chyba.value = e.message }
    }
    async function pridatClena() {
      if (!novyClen.meno) return
      try {
        mojTim.value = await ntiStore.pridatClena(mojTim.value.kod, { ...novyClen })
        novyClen.meno = ''; novyClen.telefon = ''
      } catch (e) { chyba.value = e.message }
    }
    function kopirovat(kod) {
      navigator.clipboard.writeText(kod).then(() => { skopirovane.value = true; setTimeout(() => skopirovane.value = false, 1500) })
    }

    // --- firma: zadania ---
    const zadanieForm = reactive({ nazov: '', sektor: '', lokalita: '', odmena: '', popis: '', stav: 'Otvorené' })
    const editKod = ref(null)
    function resetForm() { Object.assign(zadanieForm, { nazov: '', sektor: '', lokalita: '', odmena: '', popis: '', stav: 'Otvorené' }) }
    async function ulozZadanie() {
      chyba.value = ''
      if (!zadanieForm.nazov.trim()) { chyba.value = 'Vyplň názov.'; return }
      try {
        if (editKod.value) await ntiStore.upravitZadanie(editKod.value, { ...zadanieForm })
        else await ntiStore.pridatZadanie({ ...zadanieForm })
        editKod.value = null
        resetForm()
        zadania.value = await ntiStore.fetchZadania()
      } catch (e) { chyba.value = e.message }
    }
    function upravit(z) { editKod.value = z.kod; Object.assign(zadanieForm, z) }
    function zrusitEdit() { editKod.value = null; resetForm() }
    async function zmazat(kod) {
      try { await ntiStore.zmazatZadanie(kod); zadania.value = await ntiStore.fetchZadania() }
      catch (e) { chyba.value = e.message }
    }

    // --- mentor: tímy ---
    const timKod = ref('')
    const mentorChyba = ref('')
    const mentorUspech = ref('')
    const novyMilnik = reactive({})

    async function pripojit() {
      mentorChyba.value = ''; mentorUspech.value = ''
      try {
        await ntiStore.pripojitMentora(timKod.value.trim().toUpperCase())
        timKod.value = ''
        mentorUspech.value = 'Pripojený k tímu.'
        mentorTimy.value = await ntiStore.fetchMentorTimy()
        setTimeout(() => mentorUspech.value = '', 2500)
      } catch (e) { mentorChyba.value = e.message }
    }
    async function pridatMilnik(kod) {
      if (!novyMilnik[kod]?.trim()) return
      try { await ntiStore.pridatMilnik(kod, novyMilnik[kod]); novyMilnik[kod] = ''; mentorTimy.value = await ntiStore.fetchMentorTimy() }
      catch (e) { mentorChyba.value = e.message }
    }
    async function schvalit(kod, id) {
      try { await ntiStore.schvalitMilnik(kod, id); mentorTimy.value = await ntiStore.fetchMentorTimy() }
      catch (e) { mentorChyba.value = e.message }
    }

    return {
      userStore, role, roleLabel, visibleMenu, activeSection, currentSection, sidebarOpen, chyba,
      navigate, logout,
      profil, profilUlozene, ulozProfil,
      prihlasky, novaPrihlaska,
      mojTim, novyTim, novyClen, skopirovane, vytvoritTim, pridatClena, kopirovat,
      zadania, zadanieForm, editKod, ulozZadanie, upravit, zrusitEdit, zmazat,
      mentorTimy, timKod, mentorChyba, mentorUspech, novyMilnik, pripojit, pridatMilnik, schvalit,
    }
  }
}
</script>

<style scoped>
.db-layout { display: flex; min-height: calc(100vh - 60px); background: #f8fafc; }
.db-sidebar { width: 240px; min-width: 240px; background: #0f172a; display: flex; flex-direction: column; transition: transform 0.25s ease; z-index: 100; }
.db-sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 1.2rem 0.8rem; border-bottom: 1px solid #1e293b; }
.db-role-badge { font-size: 0.78rem; font-weight: 700; color: #c8972a; text-transform: uppercase; letter-spacing: 0.05em; }
.db-close-btn { display: none; background: none; border: none; color: #94a3b8; font-size: 1rem; cursor: pointer; }
.db-nav { flex: 1; padding: 0.8rem 0; overflow-y: auto; }
.db-nav-item { display: flex; align-items: center; gap: 0.7rem; width: 100%; padding: 0.7rem 1.2rem; background: none; border: none; border-left: 3px solid transparent; color: #94a3b8; font-size: 0.92rem; text-align: left; cursor: pointer; }
.db-nav-item:hover { background: #1e293b; color: #e2e8f0; }
.db-nav-item.active { background: #1e293b; color: #c8972a; border-left-color: #c8972a; }
.db-nav-icon { font-size: 1rem; width: 1.2rem; text-align: center; }
.db-sidebar-footer { padding: 1rem 1.2rem; border-top: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; }
.db-user-name { font-size: 0.82rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.db-logout-btn { background: none; border: 1px solid #334155; color: #94a3b8; font-size: 0.78rem; padding: 0.3rem 0.7rem; border-radius: 6px; cursor: pointer; }
.db-logout-btn:hover { border-color: #c8972a; color: #c8972a; }
.db-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.db-topbar { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: #fff; border-bottom: 1px solid #e2e8f0; }
.db-hamburger { display: none; background: none; border: none; font-size: 1.3rem; cursor: pointer; color: #1e293b; }
.db-section-title { font-size: 1.1rem; font-weight: 600; color: #1e293b; margin: 0; }
.db-content { padding: 1.5rem; flex: 1; }
.db-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; max-width: 640px; display: flex; flex-direction: column; gap: 1rem; }
.db-panel h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }
.db-form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.db-form-group label { font-size: 0.82rem; font-weight: 600; color: #475569; }
.db-input { padding: 0.6rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; outline: none; font-family: inherit; }
.db-input:focus { border-color: #c8972a; }
.db-info-grid { display: grid; grid-template-columns: 160px 1fr; gap: 0.5rem 1rem; align-items: center; }
.db-info-label { font-size: 0.85rem; color: #64748b; font-weight: 500; }
.db-section-divider { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.25rem 0; border-top: 1px solid #f1f5f9; margin-top: 0.25rem; }
.db-badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
.db-badge.green { background: #dcfce7; color: #16a34a; }
.db-badge.grey { background: #f1f5f9; color: #64748b; }
.db-btn { align-self: flex-start; padding: 0.55rem 1.2rem; background: #c8972a; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; font-family: inherit; }
.db-btn:hover { background: #a87820; }
.db-btn-sm { display: inline-block; margin-top: 0.5rem; padding: 0.4rem 0.9rem; background: #c8972a; color: #fff; border-radius: 6px; font-size: 0.82rem; font-weight: 600; cursor: pointer; }
.db-btn-sm-outline { align-self: flex-start; padding: 0.35rem 0.8rem; background: none; border: 1px solid #c8972a; color: #c8972a; border-radius: 6px; font-size: 0.82rem; cursor: pointer; font-family: inherit; }
.db-btn-outline { padding: 0.5rem 1rem; background: none; border: 1px solid #e2e8f0; color: #64748b; border-radius: 8px; font-size: 0.88rem; cursor: pointer; font-family: inherit; }
.db-btn-danger { padding: 0.35rem 0.8rem; background: none; border: 1px solid #fca5a5; color: #dc2626; border-radius: 6px; font-size: 0.82rem; cursor: pointer; font-family: inherit; }
.db-empty { font-size: 0.9rem; color: #94a3b8; padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; border: 1px dashed #e2e8f0; }
.db-muted { font-size: 0.9rem; color: #94a3b8; }
.db-success { font-size: 0.88rem; color: #16a34a; margin: 0; }
.db-error { font-size: 0.88rem; color: #dc2626; margin: 0 0 1rem; }
.db-prog-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.db-prog-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; cursor: pointer; display: flex; flex-direction: column; gap: 0.3rem; }
.db-prog-card:hover { border-color: #c8972a; }
.db-prog-tag { font-size: 0.7rem; font-weight: 700; color: #c8972a; text-transform: uppercase; letter-spacing: 0.1em; }
.db-clenovia-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-clen-item { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; padding: 0.6rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; }
.db-invite-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.db-invite-row .db-input { flex: 1; min-width: 140px; }
.db-zadanie-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; max-width: 640px; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.db-zadanie-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.db-milnik-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-milnik-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.88rem; }
.db-milnik-item span:first-child { flex: 1; }
.db-kod-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
.db-kod-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
.db-kod-row { display: flex; align-items: center; gap: 0.75rem; }
.db-kod { font-size: 1.1rem; color: #1e293b; font-family: monospace; }
.db-kod-inline { font-size: 0.78rem; color: #64748b; background: #f1f5f9; padding: 0.15rem 0.5rem; border-radius: 4px; font-family: monospace; }
.db-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; }
@media (max-width: 768px) {
  .db-sidebar { position: fixed; top: 0; left: 0; height: 100%; transform: translateX(-100%); }
  .db-sidebar.open { transform: translateX(0); }
  .db-close-btn, .db-hamburger { display: block; }
  .db-overlay { display: block; }
  .db-prog-cards { grid-template-columns: 1fr; }
}
</style>