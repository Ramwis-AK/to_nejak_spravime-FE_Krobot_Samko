<template>
  <div class="db-layout">
    <aside class="db-sidebar" :class="{ open: sidebarOpen }">
      <div class="db-sidebar-header">
        <span class="db-role-badge">{{ roleLabel }}</span>
        <button class="db-close-btn" @click="sidebarOpen = false">✕</button>
      </div>
      <nav class="db-nav">
        <button
          v-for="item in visibleMenu"
          :key="item.key"
          class="db-nav-item"
          :class="{ active: activeSection === item.key }"
          @click="navigate(item.key)"
        >
          <span class="db-nav-icon">{{ item.icon }}</span>
          {{ item.label }}
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

        <!-- ŠTUDENT -->
        <template v-if="role === 'student'">
          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Meno</span><span>{{ userStore.meno }}</span>
              <span class="db-info-label">E-mail</span><span>{{ userStore.email }}</span>
              <span class="db-info-label">Rola</span><span>Študent</span>
              <span class="db-info-label">Stav účtu</span><span class="db-badge green">Aktívny</span>
            </div>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Podať prihlášku</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Program</span><span>—</span>
              <span class="db-info-label">Stav</span><span class="db-badge grey">Nezahájená</span>
            </div>
            <button class="db-btn">Začať prihlášku</button>
          </div>
          <div v-else-if="activeSection === 'dokumenty'" class="db-panel">
            <h3>Moje dokumenty</h3>
            <div class="db-empty">Žiadne nahrané dokumenty.</div>
            <button class="db-btn">Nahrať dokument</button>
          </div>
          <div v-else-if="activeSection === 'stav'" class="db-panel">
            <h3>Stav prihlášky</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Prihláška</span><span class="db-badge grey">Nezahájená</span>
              <span class="db-info-label">Posledná aktualizácia</span><span>—</span>
            </div>
          </div>
        </template>

        <!-- VEDÚCI TÍMU -->
        <template v-else-if="role === 'vedouci'">
          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Meno</span><span>{{ userStore.meno }}</span>
              <span class="db-info-label">E-mail</span><span>{{ userStore.email }}</span>
              <span class="db-info-label">Rola</span><span>Vedúci tímu</span>
              <span class="db-info-label">Stav účtu</span><span class="db-badge green">Aktívny</span>
            </div>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'tim'" class="db-panel">
            <h3>Môj tím</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Názov tímu</span><span>—</span>
              <span class="db-info-label">Počet členov</span><span>0</span>
              <span class="db-info-label">Program</span><span>—</span>
            </div>
            <button class="db-btn">Založiť tím</button>
          </div>
          <div v-else-if="activeSection === 'pozvanie'" class="db-panel">
            <h3>Pozvať členov</h3>
            <div class="db-form-group">
              <label>E-mail študenta</label>
              <input class="db-input" type="email" placeholder="email@student.sk" />
            </div>
            <button class="db-btn">Odoslať pozvánku</button>
          </div>
          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Prihláška tímu</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Stav</span><span class="db-badge grey">Nezahájená</span>
              <span class="db-info-label">Program</span><span>—</span>
            </div>
            <button class="db-btn">Odoslať prihlášku</button>
          </div>
          <div v-else-if="activeSection === 'komunikacia'" class="db-panel">
            <h3>Komunikácia s NTI</h3>
            <div class="db-empty">Žiadne správy.</div>
          </div>
        </template>

        <!-- FIRMA -->
        <template v-else-if="role === 'firma'">
          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Firemný profil</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Názov</span><span>{{ userStore.meno }}</span>
              <span class="db-info-label">E-mail</span><span>{{ userStore.email }}</span>
              <span class="db-info-label">Stav</span><span class="db-badge green">Aktívny partner</span>
            </div>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'zadania'" class="db-panel">
            <h3>Zadania pre tímy</h3>
            <div class="db-empty">Žiadne zadania.</div>
            <button class="db-btn">Pridať zadanie</button>
          </div>
          <div v-else-if="activeSection === 'spec'" class="db-panel">
            <h3>Technická špecifikácia</h3>
            <div class="db-empty">Žiadne dokumenty.</div>
            <button class="db-btn">Nahrať dokument</button>
          </div>
          <div v-else-if="activeSection === 'rozpocet'" class="db-panel">
            <h3>PO a rozpočet</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Schválený rozpočet</span><span>—</span>
              <span class="db-info-label">Čerpané</span><span>—</span>
            </div>
          </div>
        </template>

        <!-- MENTOR -->
        <template v-else-if="role === 'mentor'">
          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Meno</span><span>{{ userStore.meno }}</span>
              <span class="db-info-label">E-mail</span><span>{{ userStore.email }}</span>
              <span class="db-info-label">Rola</span><span>Mentor</span>
              <span class="db-info-label">Priradené tímy</span><span>0</span>
            </div>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'progres'" class="db-panel">
            <h3>Progres tímov</h3>
            <div class="db-empty">Žiadne priradené tímy.</div>
          </div>
          <div v-else-if="activeSection === 'konzultacie'" class="db-panel">
            <h3>Konzultácie</h3>
            <div class="db-empty">Žiadne naplánované konzultácie.</div>
            <button class="db-btn">Naplánovať konzultáciu</button>
          </div>
          <div v-else-if="activeSection === 'milniky'" class="db-panel">
            <h3>Míľniky projektu</h3>
            <div class="db-empty">Žiadne míľniky na schválenie.</div>
          </div>
        </template>

        <!-- KOMISIA -->
        <template v-else-if="role === 'komisia'">
          <div v-if="activeSection === 'prihlášky'" class="db-panel">
            <h3>Prihlášky na hodnotenie</h3>
            <div class="db-empty">Žiadne prihlášky.</div>
          </div>
          <div v-else-if="activeSection === 'scoring'" class="db-panel">
            <h3>Scoring / bodovanie</h3>
            <div class="db-empty">Žiadne prihlášky na bodovanie.</div>
          </div>
          <div v-else-if="activeSection === 'odporucania'" class="db-panel">
            <h3>Odporúčania</h3>
            <div class="db-empty">Žiadne odporúčania.</div>
          </div>
          <div v-else-if="activeSection === 'rozhodnutia'" class="db-panel">
            <h3>Rozhodnutia</h3>
            <div class="db-empty">Žiadne rozhodnutia.</div>
          </div>
        </template>

        <!-- EDITOR -->
        <template v-else-if="role === 'editor'">
          <div v-if="activeSection === 'stranky'" class="db-panel">
            <h3>Správa stránok</h3>
            <div class="db-empty">Žiadne stránky.</div>
            <button class="db-btn">Pridať stránku</button>
          </div>
          <div v-else-if="activeSection === 'novinky'" class="db-panel">
            <h3>Novinky</h3>
            <div class="db-empty">Žiadne novinky.</div>
            <button class="db-btn">Pridať novinku</button>
          </div>
          <div v-else-if="activeSection === 'partneri'" class="db-panel">
            <h3>Partneri</h3>
            <div class="db-empty">Žiadni partneri.</div>
            <button class="db-btn">Pridať partnera</button>
          </div>
          <div v-else-if="activeSection === 'faq'" class="db-panel">
            <h3>FAQ</h3>
            <div class="db-empty">Žiadne otázky.</div>
            <button class="db-btn">Pridať otázku</button>
          </div>
          <div v-else-if="activeSection === 'cta'" class="db-panel">
            <h3>CTA bloky</h3>
            <div class="db-empty">Žiadne CTA bloky.</div>
          </div>
        </template>

        <!-- NTI ADMIN -->
        <template v-else-if="role === 'admin'">
          <div v-if="activeSection === 'pouzivatelia'" class="db-panel">
            <h3>Správa používateľov</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Celkom používateľov</span><span>0</span>
              <span class="db-info-label">Aktívnych</span><span>0</span>
            </div>
            <button class="db-btn">Spravovať používateľov</button>
          </div>
          <div v-else-if="activeSection === 'vyzvy'" class="db-panel">
            <h3>Výzvy a programy</h3>
            <div class="db-empty">Žiadne výzvy.</div>
            <button class="db-btn">Pridať výzvu</button>
          </div>
          <div v-else-if="activeSection === 'konfiguracia'" class="db-panel">
            <h3>Konfigurácia systému</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Verzia</span><span>1.0.0</span>
              <span class="db-info-label">Prostredie</span><span>development</span>
            </div>
          </div>
          <div v-else-if="activeSection === 'exporty'" class="db-panel">
            <h3>Exporty dát</h3>
            <button class="db-btn">Exportovať CSV</button>
          </div>
          <div v-else-if="activeSection === 'dashboardy'" class="db-panel">
            <h3>Analytické dashboardy</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Študentov</span><span>247</span>
              <span class="db-info-label">Firiem</span><span>38</span>
              <span class="db-info-label">Projektov</span><span>61</span>
            </div>
          </div>
        </template>

        <!-- SUPER ADMIN -->
        <template v-else-if="role === 'superadmin'">
          <div v-if="activeSection === 'system'" class="db-panel">
            <h3>Systémové nastavenia</h3>
            <div class="db-info-grid">
              <span class="db-info-label">DB status</span><span class="db-badge green">Online</span>
              <span class="db-info-label">API status</span><span class="db-badge green">Online</span>
            </div>
          </div>
          <div v-else-if="activeSection === 'role'" class="db-panel">
            <h3>Správa rolí</h3>
            <div class="db-empty">Zoznam rolí bude načítaný z backendu.</div>
            <button class="db-btn">Spravovať roly</button>
          </div>
          <div v-else-if="activeSection === 'audit'" class="db-panel">
            <h3>Audit log</h3>
            <div class="db-empty">Žiadne záznamy.</div>
          </div>
          <div v-else-if="activeSection === 'integracie'" class="db-panel">
            <h3>Integrácie</h3>
            <div class="db-empty">Žiadne integrácie.</div>
            <button class="db-btn">Pridať integráciu</button>
          </div>
        </template>

      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const MENU_CONFIG = [
  { key: 'profil',       label: 'Môj profil',        icon: '👤', roles: ['student', 'vedouci', 'firma', 'mentor'] },
  { key: 'prihlaška',    label: 'Prihláška',          icon: '📋', roles: ['student', 'vedouci'] },
  { key: 'dokumenty',    label: 'Dokumenty',          icon: '📁', roles: ['student'] },
  { key: 'stav',         label: 'Stav prihlášky',     icon: '📊', roles: ['student'] },
  { key: 'tim',          label: 'Môj tím',            icon: '👥', roles: ['vedouci'] },
  { key: 'pozvanie',     label: 'Pozvať členov',      icon: '✉️',  roles: ['vedouci'] },
  { key: 'komunikacia',  label: 'Komunikácia s NTI',  icon: '💬', roles: ['vedouci'] },
  { key: 'zadania',      label: 'Zadania',            icon: '📝', roles: ['firma'] },
  { key: 'spec',         label: 'Tech. špecifikácia', icon: '⚙️',  roles: ['firma'] },
  { key: 'rozpocet',     label: 'PO a rozpočet',      icon: '💰', roles: ['firma'] },
  { key: 'progres',      label: 'Progres tímov',      icon: '📈', roles: ['mentor'] },
  { key: 'konzultacie',  label: 'Konzultácie',        icon: '📅', roles: ['mentor'] },
  { key: 'milniky',      label: 'Míľniky',            icon: '🏁', roles: ['mentor'] },
  { key: 'prihlášky',    label: 'Prihlášky',          icon: '📂', roles: ['komisia'] },
  { key: 'scoring',      label: 'Scoring',            icon: '⭐', roles: ['komisia'] },
  { key: 'odporucania',  label: 'Odporúčania',        icon: '✅', roles: ['komisia'] },
  { key: 'rozhodnutia',  label: 'Rozhodnutia',        icon: '⚖️',  roles: ['komisia'] },
  { key: 'stranky',      label: 'Stránky',            icon: '🌐', roles: ['editor'] },
  { key: 'novinky',      label: 'Novinky',            icon: '📰', roles: ['editor'] },
  { key: 'partneri',     label: 'Partneri',           icon: '🤝', roles: ['editor'] },
  { key: 'faq',          label: 'FAQ',                icon: '❓', roles: ['editor'] },
  { key: 'cta',          label: 'CTA bloky',          icon: '🔔', roles: ['editor'] },
  { key: 'pouzivatelia', label: 'Používatelia',       icon: '👥', roles: ['admin', 'superadmin'] },
  { key: 'vyzvy',        label: 'Výzvy',              icon: '🚀', roles: ['admin'] },
  { key: 'konfiguracia', label: 'Konfigurácia',       icon: '🔧', roles: ['admin', 'superadmin'] },
  { key: 'exporty',      label: 'Exporty',            icon: '📤', roles: ['admin'] },
  { key: 'dashboardy',   label: 'Dashboardy',         icon: '📊', roles: ['admin'] },
  { key: 'system',       label: 'Systém',             icon: '🖥️',  roles: ['superadmin'] },
  { key: 'role',         label: 'Roly',               icon: '🔑', roles: ['superadmin'] },
  { key: 'audit',        label: 'Audit log',          icon: '📜', roles: ['superadmin'] },
  { key: 'integracie',   label: 'Integrácie',         icon: '🔗', roles: ['superadmin'] },
]

const ROLE_LABELS = {
  student: 'Študent',
  vedouci: 'Vedúci tímu',
  firma: 'Firma',
  mentor: 'Mentor',
  komisia: 'Komisia',
  editor: 'Editor obsahu',
  admin: 'NTI Administrátor',
  superadmin: 'Super administrátor',
}

export default {
  name: 'DashboardView',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const sidebarOpen = ref(false)
    const role = computed(() => userStore.role)
    const roleLabel = computed(() => ROLE_LABELS[role.value] || role.value)
    const visibleMenu = computed(() => MENU_CONFIG.filter(item => item.roles.includes(role.value)))
    const activeSection = ref(null)

    onMounted(() => {
      if (!userStore.isLoggedIn) { router.push('/registracia'); return }
      if (visibleMenu.value.length) activeSection.value = visibleMenu.value[0].key
    })

    const currentSection = computed(() => MENU_CONFIG.find(item => item.key === activeSection.value))

    function navigate(key) { activeSection.value = key; sidebarOpen.value = false }

    function logout() { userStore.logout(); router.push('/registracia') }

    return { userStore, role, roleLabel, visibleMenu, activeSection, currentSection, sidebarOpen, navigate, logout }
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
.db-nav-item { display: flex; align-items: center; gap: 0.7rem; width: 100%; padding: 0.7rem 1.2rem; background: none; border: none; border-left: 3px solid transparent; color: #94a3b8; font-size: 0.92rem; text-align: left; cursor: pointer; transition: background 0.15s, color 0.15s; }
.db-nav-item:hover { background: #1e293b; color: #e2e8f0; }
.db-nav-item.active { background: #1e293b; color: #c8972a; border-left-color: #c8972a; }
.db-nav-icon { font-size: 1rem; width: 1.2rem; text-align: center; }
.db-sidebar-footer { padding: 1rem 1.2rem; border-top: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between; }
.db-user-name { font-size: 0.82rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.db-logout-btn { background: none; border: 1px solid #334155; color: #94a3b8; font-size: 0.78rem; padding: 0.3rem 0.7rem; border-radius: 6px; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
.db-logout-btn:hover { border-color: #c8972a; color: #c8972a; }

.db-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.db-topbar { display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: #fff; border-bottom: 1px solid #e2e8f0; }
.db-hamburger { display: none; background: none; border: none; font-size: 1.3rem; cursor: pointer; color: #1e293b; }
.db-section-title { font-size: 1.1rem; font-weight: 600; color: #1e293b; margin: 0; }
.db-content { padding: 1.5rem; flex: 1; }

.db-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; max-width: 640px; display: flex; flex-direction: column; gap: 1rem; }
.db-panel h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }

.db-info-grid { display: grid; grid-template-columns: 160px 1fr; gap: 0.5rem 1rem; align-items: center; }
.db-info-label { font-size: 0.85rem; color: #64748b; font-weight: 500; }

.db-form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.db-form-group label { font-size: 0.85rem; font-weight: 600; color: #1e293b; }

.db-empty { font-size: 0.9rem; color: #94a3b8; padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; border: 1px dashed #e2e8f0; }

.db-badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
.db-badge.green { background: #dcfce7; color: #16a34a; }
.db-badge.grey { background: #f1f5f9; color: #64748b; }

.db-btn { align-self: flex-start; padding: 0.55rem 1.2rem; background: #c8972a; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.db-btn:hover { background: #a87820; }

.db-input { padding: 0.6rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; }
.db-input:focus { border-color: #c8972a; }

.db-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; }

@media (max-width: 768px) {
  .db-sidebar { position: fixed; top: 0; left: 0; height: 100%; transform: translateX(-100%); }
  .db-sidebar.open { transform: translateX(0); }
  .db-close-btn { display: block; }
  .db-hamburger { display: block; }
  .db-overlay { display: block; }
}
</style>