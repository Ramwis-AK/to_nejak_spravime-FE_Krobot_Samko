<template>
  <div class="db-layout">

    <!-- Sidebar -->
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

    <!-- Overlay pre mobile -->
    <div v-if="sidebarOpen" class="db-overlay" @click="sidebarOpen = false" />

    <!-- Hlavný panel -->
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
            <p>Meno: <strong>{{ userStore.meno }}</strong></p>
            <p>Email: <strong>{{ userStore.email }}</strong></p>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Podať prihlášku</h3>
            <p>Vyber program a vyplň prihlášku.</p>
            <button class="db-btn">Začať prihlášku</button>
          </div>
          <div v-else-if="activeSection === 'dokumenty'" class="db-panel">
            <h3>Moje dokumenty</h3>
            <p>Nahraj požadované dokumenty k prihláške.</p>
            <button class="db-btn">Nahrať dokument</button>
          </div>
          <div v-else-if="activeSection === 'stav'" class="db-panel">
            <h3>Stav prihlášky</h3>
            <div class="db-status-badge open">Otvorená</div>
            <p>Tvoja prihláška je v spracovaní.</p>
          </div>
        </template>

        <!-- VEDÚCI TÍMU -->
        <template v-else-if="role === 'vedouci'">
          <div v-if="activeSection === 'tim'" class="db-panel">
            <h3>Môj tím</h3>
            <p>Zatiaľ žiadni členovia.</p>
            <button class="db-btn">Založiť tím</button>
          </div>
          <div v-else-if="activeSection === 'pozvanie'" class="db-panel">
            <h3>Pozvať členov</h3>
            <input class="db-input" type="email" placeholder="email@student.sk" />
            <button class="db-btn">Odoslať pozvánku</button>
          </div>
          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Prihláška tímu</h3>
            <p>Odošli prihlášku za celý tím.</p>
            <button class="db-btn">Odoslať prihlášku</button>
          </div>
          <div v-else-if="activeSection === 'komunikacia'" class="db-panel">
            <h3>Komunikácia s NTI</h3>
            <p>Správy a notifikácie od koordinátorov.</p>
          </div>
        </template>

        <!-- FIRMA -->
        <template v-else-if="role === 'firma'">
          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Firemný profil</h3>
            <p>Správa firemných údajov a kontaktov.</p>
            <button class="db-btn">Upraviť profil</button>
          </div>
          <div v-else-if="activeSection === 'zadania'" class="db-panel">
            <h3>Zadania pre tímy</h3>
            <p>Spravuj výzvy a zadania pre študentské tímy.</p>
            <button class="db-btn">Pridať zadanie</button>
          </div>
          <div v-else-if="activeSection === 'spec'" class="db-panel">
            <h3>Technická špecifikácia</h3>
            <p>Nahraj alebo uprav technickú dokumentáciu projektu.</p>
            <button class="db-btn">Nahrať dokument</button>
          </div>
          <div v-else-if="activeSection === 'rozpocet'" class="db-panel">
            <h3>PO a rozpočet</h3>
            <p>Prehľad nákupných objednávok a rozpočtu projektu.</p>
          </div>
        </template>

        <!-- MENTOR -->
        <template v-else-if="role === 'mentor'">
          <div v-if="activeSection === 'progres'" class="db-panel">
            <h3>Progres tímov</h3>
            <p>Sleduj a komentuj pokrok priradených tímov.</p>
            <button class="db-btn">Pridať komentár</button>
          </div>
          <div v-else-if="activeSection === 'konzultacie'" class="db-panel">
            <h3>Konzultácie</h3>
            <p>Plánuj a spravuj termíny konzultácií.</p>
            <button class="db-btn">Naplánovať konzultáciu</button>
          </div>
          <div v-else-if="activeSection === 'milniky'" class="db-panel">
            <h3>Míľniky projektu</h3>
            <p>Schvaľuj splnené míľniky tímu.</p>
            <button class="db-btn">Schváliť míľnik</button>
          </div>
        </template>

        <!-- KOMISIA -->
        <template v-else-if="role === 'komisia'">
          <div v-if="activeSection === 'prihlášky'" class="db-panel">
            <h3>Prihlášky na hodnotenie</h3>
            <p>Zoznam prihlášok pridelených na posúdenie.</p>
          </div>
          <div v-else-if="activeSection === 'scoring'" class="db-panel">
            <h3>Scoring / bodovanie</h3>
            <p>Zadaj bodové hodnotenie pre každú prihlášku.</p>
            <button class="db-btn">Otvoriť scoring sheet</button>
          </div>
          <div v-else-if="activeSection === 'odporucania'" class="db-panel">
            <h3>Odporúčania</h3>
            <p>Pridaj odporúčanie alebo zamietnutie.</p>
            <button class="db-btn">Pridať odporúčanie</button>
          </div>
          <div v-else-if="activeSection === 'rozhodnutia'" class="db-panel">
            <h3>Rozhodnutia</h3>
            <p>Finálne rozhodnutia komisie pre jednotlivé prihlášky.</p>
          </div>
        </template>

        <!-- EDITOR OBSAHU -->
        <template v-else-if="role === 'editor'">
          <div v-if="activeSection === 'stranky'" class="db-panel">
            <h3>Správa stránok</h3>
            <p>Upravuj verejný obsah stránok NTI portálu.</p>
            <button class="db-btn">Otvoriť editor</button>
          </div>
          <div v-else-if="activeSection === 'novinky'" class="db-panel">
            <h3>Novinky</h3>
            <p>Pridávaj a upravuj novinky a oznámenia.</p>
            <button class="db-btn">Pridať novinku</button>
          </div>
          <div v-else-if="activeSection === 'partneri'" class="db-panel">
            <h3>Partneri</h3>
            <p>Správa zoznamu partnerov a ich popisov.</p>
            <button class="db-btn">Pridať partnera</button>
          </div>
          <div v-else-if="activeSection === 'faq'" class="db-panel">
            <h3>FAQ</h3>
            <p>Spravuj časté otázky a odpovede.</p>
            <button class="db-btn">Pridať otázku</button>
          </div>
          <div v-else-if="activeSection === 'cta'" class="db-panel">
            <h3>CTA bloky</h3>
            <p>Uprav výzvy na akciu na verejnom webe.</p>
          </div>
        </template>

        <!-- NTI ADMIN -->
        <template v-else-if="role === 'admin'">
          <div v-if="activeSection === 'pouzivatelia'" class="db-panel">
            <h3>Správa používateľov</h3>
            <p>Prehľad, editácia a deaktivácia účtov.</p>
            <button class="db-btn">Spravovať používateľov</button>
          </div>
          <div v-else-if="activeSection === 'vyzvy'" class="db-panel">
            <h3>Výzvy a programy</h3>
            <p>Spravuj aktívne výzvy Programu A a B.</p>
            <button class="db-btn">Pridať výzvu</button>
          </div>
          <div v-else-if="activeSection === 'konfiguracia'" class="db-panel">
            <h3>Konfigurácia systému</h3>
            <p>Nastavenia programu, termíny a parametre.</p>
          </div>
          <div v-else-if="activeSection === 'exporty'" class="db-panel">
            <h3>Exporty dát</h3>
            <p>Exportuj dáta do CSV / Excel formátu.</p>
            <button class="db-btn">Exportovať</button>
          </div>
          <div v-else-if="activeSection === 'dashboardy'" class="db-panel">
            <h3>Analytické dashboardy</h3>
            <p>Štatistiky a prehľady výkonnosti programu.</p>
          </div>
        </template>

        <!-- SUPER ADMIN -->
        <template v-else-if="role === 'superadmin'">
          <div v-if="activeSection === 'system'" class="db-panel">
            <h3>Systémové nastavenia</h3>
            <p>Konfigurácia servera, prostredí a API kľúčov.</p>
          </div>
          <div v-else-if="activeSection === 'role'" class="db-panel">
            <h3>Správa rolí</h3>
            <p>Priradenie a úprava rolí používateľom.</p>
            <button class="db-btn">Spravovať roly</button>
          </div>
          <div v-else-if="activeSection === 'audit'" class="db-panel">
            <h3>Audit log</h3>
            <p>História všetkých akcií v systéme.</p>
          </div>
          <div v-else-if="activeSection === 'integracie'" class="db-panel">
            <h3>Integrácie</h3>
            <p>Správa externých API a webhookov.</p>
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
  // Študent
  { key: 'profil',        label: 'Môj profil',       icon: '👤', roles: ['student', 'vedouci', 'firma', 'mentor'] },
  { key: 'prihlaška',     label: 'Prihláška',         icon: '📋', roles: ['student', 'vedouci'] },
  { key: 'dokumenty',     label: 'Dokumenty',         icon: '📁', roles: ['student'] },
  { key: 'stav',          label: 'Stav prihlášky',    icon: '📊', roles: ['student'] },
  // Vedúci
  { key: 'tim',           label: 'Môj tím',           icon: '👥', roles: ['vedouci'] },
  { key: 'pozvanie',      label: 'Pozvať členov',     icon: '✉️',  roles: ['vedouci'] },
  { key: 'komunikacia',   label: 'Komunikácia s NTI', icon: '💬', roles: ['vedouci'] },
  // Firma
  { key: 'zadania',       label: 'Zadania',           icon: '📝', roles: ['firma'] },
  { key: 'spec',          label: 'Tech. špecifikácia',icon: '⚙️',  roles: ['firma'] },
  { key: 'rozpocet',      label: 'PO a rozpočet',     icon: '💰', roles: ['firma'] },
  // Mentor
  { key: 'progres',       label: 'Progres tímov',     icon: '📈', roles: ['mentor'] },
  { key: 'konzultacie',   label: 'Konzultácie',       icon: '📅', roles: ['mentor'] },
  { key: 'milniky',       label: 'Míľniky',           icon: '🏁', roles: ['mentor'] },
  // Komisia
  { key: 'prihlášky',     label: 'Prihlášky',         icon: '📂', roles: ['komisia'] },
  { key: 'scoring',       label: 'Scoring',           icon: '⭐', roles: ['komisia'] },
  { key: 'odporucania',   label: 'Odporúčania',       icon: '✅', roles: ['komisia'] },
  { key: 'rozhodnutia',   label: 'Rozhodnutia',       icon: '⚖️',  roles: ['komisia'] },
  // Editor
  { key: 'stranky',       label: 'Stránky',           icon: '🌐', roles: ['editor'] },
  { key: 'novinky',       label: 'Novinky',           icon: '📰', roles: ['editor'] },
  { key: 'partneri',      label: 'Partneri',          icon: '🤝', roles: ['editor'] },
  { key: 'faq',           label: 'FAQ',               icon: '❓', roles: ['editor'] },
  { key: 'cta',           label: 'CTA bloky',         icon: '🔔', roles: ['editor'] },
  // Admin
  { key: 'pouzivatelia',  label: 'Používatelia',      icon: '👥', roles: ['admin', 'superadmin'] },
  { key: 'vyzvy',         label: 'Výzvy',             icon: '🚀', roles: ['admin'] },
  { key: 'konfiguracia',  label: 'Konfigurácia',      icon: '🔧', roles: ['admin', 'superadmin'] },
  { key: 'exporty',       label: 'Exporty',           icon: '📤', roles: ['admin'] },
  { key: 'dashboardy',    label: 'Dashboardy',        icon: '📊', roles: ['admin'] },
  // Super admin
  { key: 'system',        label: 'Systém',            icon: '🖥️',  roles: ['superadmin'] },
  { key: 'role',          label: 'Roly',              icon: '🔑', roles: ['superadmin'] },
  { key: 'audit',         label: 'Audit log',         icon: '📜', roles: ['superadmin'] },
  { key: 'integracie',    label: 'Integrácie',        icon: '🔗', roles: ['superadmin'] },
]

const ROLE_LABELS = {
  student: 'Študent',
  vedouci: 'Vedúci tímu',
  firma: 'Firma / partner',
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

    const visibleMenu = computed(() =>
      MENU_CONFIG.filter(item => item.roles.includes(role.value))
    )

    const activeSection = ref(null)

    onMounted(() => {
      if (visibleMenu.value.length) {
        activeSection.value = visibleMenu.value[0].key
      }
    })

    const currentSection = computed(() =>
      MENU_CONFIG.find(item => item.key === activeSection.value)
    )

    function navigate(key) {
      activeSection.value = key
      sidebarOpen.value = false
    }

    function logout() {
      userStore.logout()
      router.push('/registracia')
    }

    return { userStore, role, roleLabel, visibleMenu, activeSection, currentSection, sidebarOpen, navigate, logout }
  }
}
</script>

<style scoped>
.db-layout {
  display: flex;
  min-height: calc(100vh - 60px);
  background: #f8fafc;
}

/* SIDEBAR */
.db-sidebar {
  width: 240px;
  min-width: 240px;
  background: #0f172a;
  display: flex;
  flex-direction: column;
  padding: 0;
  transition: transform 0.25s ease;
  z-index: 100;
}

.db-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.2rem 0.8rem;
  border-bottom: 1px solid #1e293b;
}

.db-role-badge {
  font-size: 0.78rem;
  font-weight: 700;
  color: #c8972a;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.db-close-btn {
  display: none;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
}

.db-nav {
  flex: 1;
  padding: 0.8rem 0;
  overflow-y: auto;
}

.db-nav-item {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
  padding: 0.7rem 1.2rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 0.92rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  border-left: 3px solid transparent;
}

.db-nav-item:hover {
  background: #1e293b;
  color: #e2e8f0;
}

.db-nav-item.active {
  background: #1e293b;
  color: #c8972a;
  border-left-color: #c8972a;
}

.db-nav-icon {
  font-size: 1rem;
  width: 1.2rem;
  text-align: center;
}

.db-sidebar-footer {
  padding: 1rem 1.2rem;
  border-top: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.db-user-name {
  font-size: 0.82rem;
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}

.db-logout-btn {
  background: none;
  border: 1px solid #334155;
  color: #94a3b8;
  font-size: 0.78rem;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.db-logout-btn:hover {
  border-color: #c8972a;
  color: #c8972a;
}

/* MAIN */
.db-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.db-topbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.db-hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #1e293b;
}

.db-section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.db-content {
  padding: 1.5rem;
  flex: 1;
}

/* PANEL */
.db-panel {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.db-panel h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.4rem;
}

.db-panel p {
  color: #64748b;
  font-size: 0.95rem;
  margin: 0;
}

.db-btn {
  align-self: flex-start;
  margin-top: 0.4rem;
  padding: 0.55rem 1.2rem;
  background: #c8972a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.db-btn:hover {
  background: #a87820;
}

.db-input {
  padding: 0.6rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

.db-input:focus {
  border-color: #c8972a;
}

.db-status-badge {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 600;
}

.db-status-badge.open {
  background: #dcfce7;
  color: #16a34a;
}

/* OVERLAY */
.db-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 99;
}

/* MOBILE */
@media (max-width: 768px) {
  .db-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
  }

  .db-sidebar.open {
    transform: translateX(0);
  }

  .db-close-btn {
    display: block;
  }

  .db-hamburger {
    display: block;
  }

  .db-overlay {
    display: block;
  }
}
</style>