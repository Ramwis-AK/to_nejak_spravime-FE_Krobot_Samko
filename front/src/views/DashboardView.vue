<!-- DashboardView.vue -->
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

        <!-- ===== ŠTUDENT ===== -->
        <template v-if="role === 'student'">

          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-form-group"><label>Meno a priezvisko</label><input class="db-input" v-model="profil.meno" type="text" /></div>
            <div class="db-form-group"><label>E-mail</label><input class="db-input" v-model="profil.email" type="email" /></div>
            <div class="db-form-group"><label>Heslo</label><input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" /></div>
            <div class="db-form-group"><label>Adresa</label><input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" /></div>
            <div class="db-form-group"><label>Telefón</label><input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" /></div>
            <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
            <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
          </div>

          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Moja prihláška</h3>
            <div v-if="!prihlaška.podana">
              <p class="db-muted" style="margin-bottom:1rem;">Prihlás sa do existujúceho projektu:</p>
              <div class="db-prog-cards">
                <div class="db-prog-card" @click="zacatPrihlaskaProgram('A')">
                  <span class="db-prog-tag">Program A</span>
                  <strong>Startup / Inkubácia</strong>
                  <p>Pripojiť sa k existujúcemu startupu v seed fáze</p>
                  <span class="db-btn-sm">Vybrať projekt →</span>
                </div>
                <div class="db-prog-card" @click="zacatPrihlaskaProgram('B')">
                  <span class="db-prog-tag">Program B</span>
                  <strong>Živá prax</strong>
                  <p>Prihlás sa na otvorené zadanie od firmy</p>
                  <span class="db-btn-sm">Vybrať zadanie →</span>
                </div>
              </div>
            </div>
            <div v-else class="db-info-grid">
              <span class="db-info-label">Program</span><span>{{ prihlaška.program }}</span>
              <span class="db-info-label">Projekt</span><span>{{ prihlaška.nazov || '—' }}</span>
              <span class="db-info-label">Stav</span><span :class="['db-badge', stavBadgeClass(prihlaška.stav)]">{{ prihlaška.stav }}</span>
              <span class="db-info-label">Podaná</span><span>{{ prihlaška.datum || '—' }}</span>
            </div>
          </div>

          <div v-else-if="activeSection === 'dokumenty'" class="db-panel">
            <h3>Moje dokumenty</h3>
            <div class="db-form-group">
              <label>Nahrať CV (PDF)</label>
              <input type="file" accept=".pdf,.doc,.docx" @change="nahratDokument" class="db-file-input" />
            </div>
            <div v-if="dokumenty.length" class="db-doc-list">
              <div v-for="(doc, i) in dokumenty" :key="i" class="db-doc-item">
                <span>📄 {{ doc.name }}</span>
                <button class="db-btn-danger" @click="dokumenty.splice(i,1)">Odstrániť</button>
              </div>
            </div>
            <div v-else class="db-empty">Žiadne nahrané dokumenty.</div>
          </div>

        </template>

        <!-- ===== VEDÚCI TÍMU ===== -->
        <template v-else-if="role === 'vedouci'">

          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-form-group"><label>Meno a priezvisko</label><input class="db-input" v-model="profil.meno" type="text" /></div>
            <div class="db-form-group"><label>E-mail</label><input class="db-input" v-model="profil.email" type="email" /></div>
            <div class="db-form-group"><label>Heslo</label><input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" /></div>
            <div class="db-form-group"><label>Adresa</label><input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" /></div>
            <div class="db-form-group"><label>Telefón</label><input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" /></div>
            <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
            <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
          </div>

          <div v-else-if="activeSection === 'prihlaška'" class="db-panel">
            <h3>Prihláška tímu</h3>
            <div v-if="!prihlaška.podana">
              <p class="db-muted" style="margin-bottom:1rem;">Vyber program pre tím:</p>
              <div class="db-prog-cards">
                <div class="db-prog-card" @click="zacatPrihlaskaProgram('A')">
                  <span class="db-prog-tag">Program A</span>
                  <strong>Startup / Inkubácia</strong>
                  <p>Vytvor nový startup v seed fáze</p>
                  <span class="db-btn-sm">Vytvoriť startup →</span>
                </div>
                <div class="db-prog-card" @click="zacatPrihlaskaProgram('B')">
                  <span class="db-prog-tag">Program B</span>
                  <strong>Živá prax</strong>
                  <p>Prihláste tím na otvorené zadanie firmy</p>
                  <span class="db-btn-sm">Prihlásiť tím →</span>
                </div>
              </div>
            </div>
            <div v-else class="db-info-grid">
              <span class="db-info-label">Program</span><span>{{ prihlaška.program }}</span>
              <span class="db-info-label">Projekt</span><span>{{ prihlaška.nazov || '—' }}</span>
              <span class="db-info-label">Stav</span><span :class="['db-badge', stavBadgeClass(prihlaška.stav)]">{{ prihlaška.stav }}</span>
              <span class="db-info-label">Podaná</span><span>{{ prihlaška.datum || '—' }}</span>
            </div>
          </div>

          <!-- TÍM: vytvorenie + kód + členovia -->
          <div v-else-if="activeSection === 'tim'">
            <!-- Ak tím ešte neexistuje, zobraziť formulár na vytvorenie -->
            <div v-if="!mojTim" class="db-panel">
              <h3>Vytvoriť tím</h3>
              <div class="db-form-group"><label>Názov tímu</label><input class="db-input" v-model="novyTimForm.nazov" type="text" placeholder="Napr. Tím Alpha" /></div>
              <div class="db-form-group"><label>Projekt / startup</label><input class="db-input" v-model="novyTimForm.projekt" type="text" placeholder="Napr. EcoFlow App" /></div>
              <div class="db-form-group">
                <label>Program</label>
                <select class="db-input" v-model="novyTimForm.program">
                  <option value="Program A">Program A — Startup / Inkubácia</option>
                  <option value="Program B">Program B — Živá prax</option>
                </select>
              </div>
              <button class="db-btn" @click="vytvoritTim">Vytvoriť tím</button>
            </div>

            <!-- Tím existuje -->
            <div v-else class="db-panel">
              <h3>Môj tím</h3>
              <div class="db-info-grid">
                <span class="db-info-label">Názov</span><span>{{ mojTim.nazov }}</span>
                <span class="db-info-label">Projekt</span><span>{{ mojTim.projekt }}</span>
                <span class="db-info-label">Program</span><span>{{ mojTim.program }}</span>
                <span class="db-info-label">Mentor</span><span>{{ mojTim.mentor || '—' }}</span>
                <span class="db-info-label">Počet členov</span><span>{{ mojTim.clenovia.length }}</span>
              </div>

              <!-- Kód tímu — zdieľa vedúci s mentorom -->
              <div class="db-kod-box">
                <span class="db-kod-label">Kód tímu (zdieľaj s mentorom)</span>
                <div class="db-kod-row">
                  <strong class="db-kod">{{ mojTim.kod }}</strong>
                  <button class="db-btn-sm-outline" @click="kopirovatKod(mojTim.kod)">{{ skopirované ? '✓ Skopírované' : 'Kopírovať' }}</button>
                </div>
              </div>

              <div class="db-section-divider">Členovia tímu</div>
              <div class="db-clenovia-list">
                <div v-for="(clen, i) in mojTim.clenovia" :key="i" class="db-clen-item">
                  <span>{{ clen.meno }}</span>
                  <span class="db-muted">{{ clen.telefon }}</span>
                </div>
              </div>

              <div class="db-section-divider">Pridať člena</div>
              <div class="db-invite-row">
                <input class="db-input" v-model="novyClen.meno" placeholder="Meno a priezvisko" />
                <input class="db-input" v-model="novyClen.telefon" placeholder="+421 9xx xxx xxx" />
                <button class="db-btn" @click="pridatClena">Pridať</button>
              </div>
            </div>
          </div>

          <div v-else-if="activeSection === 'komunikacia'" class="db-panel db-chat-panel">
            <h3>Komunikácia s NTI</h3>
            <div class="db-chat-messages" ref="chatEl">
              <div v-for="(msg, i) in chatSpravy" :key="i" :class="['db-chat-msg', msg.od === 'ja' ? 'moje' : 'nti']">
                <span class="db-chat-sender">{{ msg.od === 'ja' ? userStore.meno : 'NTI Podpora' }}</span>
                <p>{{ msg.text }}</p>
                <span class="db-chat-time">{{ msg.cas }}</span>
              </div>
              <div v-if="!chatSpravy.length" class="db-empty">Žiadne správy.</div>
            </div>
            <div class="db-chat-input-row">
              <input class="db-input" v-model="novaSpravaText" placeholder="Napíš správu..." @keyup.enter="odoslatSpravu" />
              <button class="db-btn" @click="odoslatSpravu">Odoslať</button>
            </div>
          </div>

        </template>

        <!-- ===== FIRMA ===== -->
        <template v-else-if="role === 'firma'">

          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Firemný profil</h3>
            <div class="db-form-group"><label>Názov firmy</label><input class="db-input" v-model="profil.meno" type="text" /></div>
            <div class="db-form-group"><label>E-mail</label><input class="db-input" v-model="profil.email" type="email" /></div>
            <div class="db-form-group"><label>Heslo</label><input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" /></div>
            <div class="db-form-group"><label>Adresa sídla</label><input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" /></div>
            <div class="db-form-group"><label>Telefón</label><input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" /></div>
            <div class="db-form-group"><label>IČO</label><input class="db-input" v-model="profil.ico" type="text" placeholder="12345678" /></div>
            <div class="db-form-group"><label>Sektor</label><input class="db-input" v-model="profil.sektor" type="text" placeholder="IT, AgriTech, HealthTech..." /></div>
            <div class="db-form-group"><label>Web</label><input class="db-input" v-model="profil.web" type="url" placeholder="https://firma.sk" /></div>
            <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
            <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
          </div>

          <!-- ZADANIA: formulár + zoznam -->
          <div v-else-if="activeSection === 'zadania'">
            <div class="db-panel" style="margin-bottom:1rem;">
              <h3>{{ editZadanieKod ? 'Upraviť zadanie' : 'Pridať zadanie' }}</h3>
              <div class="db-form-group"><label>Názov zadania</label><input class="db-input" v-model="zadanieForm.nazov" type="text" placeholder="Napr. Webová aplikácia pre správu skladu" /></div>
              <div class="db-form-group"><label>Sektor</label><input class="db-input" v-model="zadanieForm.sektor" type="text" placeholder="IT / SaaS, FinTech..." /></div>
              <div class="db-form-group"><label>Lokalita</label><input class="db-input" v-model="zadanieForm.lokalita" type="text" placeholder="Nitra, Bratislava..." /></div>
              <div class="db-form-group"><label>Odmena tímu</label><input class="db-input" v-model="zadanieForm.odmena" type="text" placeholder="€2 400 / tím" /></div>
              <div class="db-form-group"><label>Popis</label><textarea class="db-input" v-model="zadanieForm.popis" rows="3" placeholder="Popis zadania..." /></div>
              <div class="db-form-group">
                <label>Stav</label>
                <select class="db-input" v-model="zadanieForm.stav">
                  <option value="Otvorené">Otvorené</option>
                  <option value="Párovanie">Párovanie</option>
                  <option value="V realizácii">V realizácii</option>
                  <option value="Uzavreté">Uzavreté</option>
                </select>
              </div>
              <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                <button class="db-btn" @click="ulozZadanie">{{ editZadanieKod ? 'Uložiť zmeny' : 'Pridať zadanie' }}</button>
                <button v-if="editZadanieKod" class="db-btn-outline" @click="zrusitEditZadanie">Zrušiť</button>
              </div>
              <p v-if="zadanieUlozene" class="db-success">Zadanie uložené. Kód: <strong>{{ poslednyKod }}</strong></p>
            </div>

            <!-- Zoznam zadaní tejto firmy -->
            <div v-if="mojeZadania.length">
              <div v-for="z in mojeZadania" :key="z.kod" class="db-zadanie-card">
                <div class="db-zadanie-header">
                  <strong>{{ z.nazov }}</strong>
                  <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span class="db-kod-inline">{{ z.kod }}</span>
                    <span :class="['db-badge', z.stav === 'Otvorené' ? 'green' : 'grey']">{{ z.stav }}</span>
                  </div>
                </div>
                <div class="db-info-grid" style="margin-top:0.5rem;">
                  <span class="db-info-label">Sektor</span><span>{{ z.sektor }}</span>
                  <span class="db-info-label">Lokalita</span><span>{{ z.lokalita }}</span>
                  <span class="db-info-label">Odmena</span><span>{{ z.odmena }}</span>
                </div>
                <p style="font-size:0.88rem;color:#64748b;margin-top:0.4rem;">{{ z.popis }}</p>
                <button class="db-btn-sm-outline" @click="upravitZadanie(z.kod)">Upraviť</button>
              </div>
            </div>
            <div v-else class="db-empty">Zatiaľ žiadne vaše zadania.</div>
          </div>

          <div v-else-if="activeSection === 'spec'" class="db-panel">
            <h3>Technická špecifikácia</h3>
            <div class="db-form-group">
              <label>Nahrať dokument (PDF)</label>
              <input type="file" accept=".pdf,.doc,.docx" @change="nahratDokument" class="db-file-input" />
            </div>
            <div v-if="dokumenty.length" class="db-doc-list">
              <div v-for="(doc, i) in dokumenty" :key="i" class="db-doc-item">
                <span>📄 {{ doc.name }}</span>
                <button class="db-btn-danger" @click="dokumenty.splice(i,1)">Odstrániť</button>
              </div>
            </div>
            <div v-else class="db-empty">Žiadne dokumenty.</div>
          </div>

          <div v-else-if="activeSection === 'rozpocet'" class="db-panel">
            <h3>PO a rozpočet</h3>
            <div class="db-form-group"><label>Schválený rozpočet (€)</label><input class="db-input" v-model="rozpocet.schvaleny" type="number" placeholder="0" /></div>
            <div class="db-form-group"><label>Čerpané (€)</label><input class="db-input" v-model="rozpocet.cerpane" type="number" placeholder="0" /></div>
            <div class="db-info-grid" style="margin-top:0.5rem;">
              <span class="db-info-label">Zostatok</span>
              <strong>€ {{ (Number(rozpocet.schvaleny) - Number(rozpocet.cerpane)).toLocaleString('sk-SK') }}</strong>
            </div>
            <button class="db-btn" @click="ulozRozpocet">Uložiť</button>
            <p v-if="rozpocetUlozeny" class="db-success">Rozpočet bol uložený.</p>
          </div>

        </template>

        <!-- ===== MENTOR ===== -->
        <template v-else-if="role === 'mentor'">

          <div v-if="activeSection === 'profil'" class="db-panel">
            <h3>Môj profil</h3>
            <div class="db-form-group"><label>Meno a priezvisko</label><input class="db-input" v-model="profil.meno" type="text" /></div>
            <div class="db-form-group"><label>E-mail</label><input class="db-input" v-model="profil.email" type="email" /></div>
            <div class="db-form-group"><label>Heslo</label><input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" /></div>
            <div class="db-form-group"><label>Adresa</label><input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" /></div>
            <div class="db-form-group"><label>Telefón</label><input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" /></div>
            <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
            <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
          </div>

          <div v-else-if="activeSection === 'timy'">
            <!-- Pripojenie kódom -->
            <div class="db-panel" style="margin-bottom:1rem;">
              <h3>Pripojiť sa k tímu</h3>
              <p class="db-muted">Zadaj kód tímu od vedúceho (napr. TIM-0001).</p>
              <div class="db-invite-row" style="margin-top:0.5rem;">
                <input class="db-input" v-model="timKod" placeholder="TIM-XXXX" style="text-transform:uppercase;" />
                <button class="db-btn" @click="pripojitSaKTimu">Pripojiť sa</button>
              </div>
              <p v-if="timChyba" class="db-error">{{ timChyba }}</p>
              <p v-if="timUspech" class="db-success">{{ timUspech }}</p>
            </div>

            <!-- Priradené tímy -->
            <div v-for="t in mentorTimy" :key="t.kod" class="db-panel" style="margin-bottom:1rem;">
              <div class="db-zadanie-header">
                <strong>{{ t.nazov }}</strong>
                <span class="db-kod-inline">{{ t.kod }}</span>
              </div>
              <div class="db-info-grid" style="margin-top:0.5rem;">
                <span class="db-info-label">Projekt</span><span>{{ t.projekt }}</span>
                <span class="db-info-label">Program</span><span>{{ t.program }}</span>
                <span class="db-info-label">Vedúci</span><span>{{ t.vedouci }}</span>
                <span class="db-info-label">Členovia</span><span>{{ t.clenovia.map(c => c.meno).join(', ') }}</span>
              </div>
              <div class="db-section-divider">Míľniky</div>
              <div v-if="t.milniky.length" class="db-milnik-list">
                <div v-for="(m, mi) in t.milniky" :key="mi" class="db-milnik-item">
                  <span>{{ m.nazov }}</span>
                  <span :class="['db-badge', m.splneny ? 'green' : 'grey']">{{ m.splneny ? 'Splnený' : 'Čakajúci' }}</span>
                  <button v-if="!m.splneny" class="db-btn-sm-outline" @click="schvalitMilnik(t.kod, mi)">Schváliť</button>
                </div>
              </div>
              <div v-else class="db-empty">Žiadne míľniky.</div>
              <div class="db-invite-row" style="margin-top:0.5rem;">
                <input class="db-input" v-model="t.novyMilnik" placeholder="Názov nového míľnika" />
                <button class="db-btn" @click="pridatMilnik(t)">Pridať míľnik</button>
              </div>
            </div>
            <div v-if="!mentorTimy.length" class="db-panel">
              <div class="db-empty">Nie si priradený k žiadnemu tímu.</div>
            </div>
          </div>

        </template>

      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useNtiStore } from '../stores/nti.js'
import { useRouter } from 'vue-router'

const MENU_CONFIG = [
  { key: 'profil',      label: 'Môj profil',        icon: '👤', roles: ['student', 'vedouci', 'firma', 'mentor'] },
  { key: 'prihlaška',   label: 'Prihláška',          icon: '📋', roles: ['student', 'vedouci'] },
  { key: 'dokumenty',   label: 'Dokumenty',          icon: '📁', roles: ['student'] },
  { key: 'tim',         label: 'Môj tím',            icon: '👥', roles: ['vedouci'] },
  { key: 'komunikacia', label: 'Komunikácia s NTI',  icon: '💬', roles: ['vedouci'] },
  { key: 'zadania',     label: 'Zadania',            icon: '📝', roles: ['firma'] },
  { key: 'spec',        label: 'Tech. špecifikácia', icon: '⚙️',  roles: ['firma'] },
  { key: 'rozpocet',    label: 'PO a rozpočet',      icon: '💰', roles: ['firma'] },
  { key: 'timy',        label: 'Tímy a míľniky',    icon: '🏁', roles: ['mentor'] },
]

const ROLE_LABELS = {
  student: 'Študent', vedouci: 'Vedúci tímu', firma: 'Firma / partner', mentor: 'Mentor',
}

export default {
  name: 'DashboardView',
  setup() {
    const userStore = useUserStore()
    const ntiStore = useNtiStore()
    const router = useRouter()
    const sidebarOpen = ref(false)
    const role = computed(() => userStore.role)
    const roleLabel = computed(() => ROLE_LABELS[role.value] || role.value)
    const visibleMenu = computed(() => MENU_CONFIG.filter(i => i.roles.includes(role.value)))
    const activeSection = ref(null)
    const currentSection = computed(() => MENU_CONFIG.find(i => i.key === activeSection.value))

    onMounted(() => {
      if (!userStore.isLoggedIn) { router.push('/registracia'); return }
      if (visibleMenu.value.length) activeSection.value = visibleMenu.value[0].key
      profil.value.meno = userStore.meno
      profil.value.email = userStore.email
    })

    function navigate(key) { activeSection.value = key; sidebarOpen.value = false }
    function logout() { userStore.logout(); router.push('/registracia') }

    // --- PROFIL ---
    const profil = ref({ meno: '', email: '', heslo: '', adresa: '', telefon: '', ico: '', sektor: '', web: '' })
    const profilUlozene = ref(false)
    function ulozProfil() {
      userStore.setUser({ role: role.value, meno: profil.value.meno, email: profil.value.email })
      profilUlozene.value = true
      setTimeout(() => { profilUlozene.value = false }, 2500)
    }

    // --- PRIHLÁŠKA ---
    const prihlaška = ref({ podana: false, program: '', nazov: '', stav: '', datum: '' })
    function zacatPrihlaskaProgram(program) {
      router.push({ path: '/dashboard/prihlaska-form', query: { program } })
    }
    function stavBadgeClass(stav) {
      if (stav === 'Schválená') return 'green'
      if (stav === 'Zamietnutá') return 'red'
      return 'grey'
    }

    // --- DOKUMENTY ---
    const dokumenty = ref([])
    function nahratDokument(e) {
      const file = e.target.files[0]
      if (file) dokumenty.value.push(file)
    }

    // --- VEDÚCI: TÍM ---
    // Vedúci má jeden tím — hľadáme ho v store podľa mena vedúceho (TODO: backend → podľa ID)
    const mojTim = computed(() => ntiStore.timy.find(t => t.vedouci === userStore.meno) || null)

    const novyTimForm = ref({ nazov: '', projekt: '', program: 'Program A' })
    function vytvoritTim() {
      if (!novyTimForm.value.nazov.trim()) return
      ntiStore.vytvoritTim({
        nazov: novyTimForm.value.nazov,
        projekt: novyTimForm.value.projekt,
        program: novyTimForm.value.program,
        vedouci: userStore.meno,
        clenovia: [{ meno: userStore.meno, telefon: profil.value.telefon || '' }],
      })
    }

    const novyClen = ref({ meno: '', telefon: '' })
    function pridatClena() {
      if (!novyClen.value.meno || !mojTim.value) return
      ntiStore.pridatClenaTim(mojTim.value.kod, { ...novyClen.value })
      novyClen.value = { meno: '', telefon: '' }
    }

    const skopirované = ref(false)
    function kopirovatKod(kod) {
      navigator.clipboard.writeText(kod).then(() => {
        skopirované.value = true
        setTimeout(() => { skopirované.value = false }, 2000)
      })
    }

    // --- VEDÚCI: CHAT ---
    const chatSpravy = ref([])
    const novaSpravaText = ref('')
    const chatEl = ref(null)
    async function odoslatSpravu() {
      if (!novaSpravaText.value.trim()) return
      const cas = new Date().toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' })
      chatSpravy.value.push({ od: 'ja', text: novaSpravaText.value, cas })
      novaSpravaText.value = ''
      await nextTick()
      if (chatEl.value) chatEl.value.scrollTop = chatEl.value.scrollHeight
    }

    // --- FIRMA: ZADANIA ---
    // Zadania tejto firmy — filtrujeme podľa mena (TODO: backend → podľa ID firmy)
    const mojeZadania = computed(() => ntiStore.zadania.filter(z => z.firma === userStore.meno))

    const editZadanieKod = ref(null)
    const zadanieUlozene = ref(false)
    const poslednyKod = ref('')
    const zadanieForm = ref({ nazov: '', sektor: '', lokalita: '', odmena: '', popis: '', stav: 'Otvorené' })

    function ulozZadanie() {
      if (!zadanieForm.value.nazov.trim()) return
      if (editZadanieKod.value) {
        ntiStore.upravitZadanie(editZadanieKod.value, { ...zadanieForm.value })
        poslednyKod.value = editZadanieKod.value
        editZadanieKod.value = null
      } else {
        const kod = ntiStore.pridatZadanie({ ...zadanieForm.value, firma: userStore.meno })
        poslednyKod.value = kod
      }
      zadanieForm.value = { nazov: '', sektor: '', lokalita: '', odmena: '', popis: '', stav: 'Otvorené' }
      zadanieUlozene.value = true
      setTimeout(() => { zadanieUlozene.value = false }, 3000)
    }

    function upravitZadanie(kod) {
      const z = ntiStore.getZadanieByKod(kod)
      if (!z) return
      editZadanieKod.value = kod
      zadanieForm.value = { nazov: z.nazov, sektor: z.sektor, lokalita: z.lokalita, odmena: z.odmena, popis: z.popis, stav: z.stav }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function zrusitEditZadanie() {
      editZadanieKod.value = null
      zadanieForm.value = { nazov: '', sektor: '', lokalita: '', odmena: '', popis: '', stav: 'Otvorené' }
    }

    // --- FIRMA: ROZPOČET ---
    const rozpocet = ref({ schvaleny: '', cerpane: '' })
    const rozpocetUlozeny = ref(false)
    function ulozRozpocet() {
      rozpocetUlozeny.value = true
      setTimeout(() => { rozpocetUlozeny.value = false }, 2500)
    }

    // --- MENTOR: TÍMY ---
    // Mentor vidí tímy, ku ktorým je priradený (mentor === meno)
    const mentorTimy = computed(() =>
      ntiStore.timy
        .filter(t => t.mentor === userStore.meno)
        .map(t => ({ ...t, novyMilnik: '' }))
    )

    const timKod = ref('')
    const timChyba = ref('')
    const timUspech = ref('')

    function pripojitSaKTimu() {
      timChyba.value = ''
      timUspech.value = ''
      const kod = timKod.value.trim().toUpperCase()
      const tim = ntiStore.getTimByKod(kod)
      if (!tim) { timChyba.value = 'Tím s týmto kódom neexistuje.'; return }
      if (tim.mentor === userStore.meno) { timChyba.value = 'K tomuto tímu si už priradený.'; return }
      if (tim.mentor) { timChyba.value = 'Tento tím už má mentora.'; return }
      ntiStore.pripojitMentora(kod, userStore.meno)
      timKod.value = ''
      timUspech.value = `Bol si pridaný k tímu "${tim.nazov}".`
      setTimeout(() => { timUspech.value = '' }, 3000)
    }

    function pridatMilnik(t) {
      if (!t.novyMilnik?.trim()) return
      ntiStore.pridatMilnikKTimu(t.kod, t.novyMilnik)
      t.novyMilnik = ''
    }

    function schvalitMilnik(timKod, mi) {
      ntiStore.schvalitMilnik(timKod, mi)
    }

    return {
      userStore, role, roleLabel, visibleMenu, activeSection, currentSection,
      sidebarOpen, navigate, logout,
      profil, profilUlozene, ulozProfil,
      prihlaška, zacatPrihlaskaProgram, stavBadgeClass,
      dokumenty, nahratDokument,
      mojTim, novyTimForm, vytvoritTim, novyClen, pridatClena, skopirované, kopirovatKod,
      chatSpravy, novaSpravaText, chatEl, odoslatSpravu,
      mojeZadania, editZadanieKod, zadanieUlozene, poslednyKod, zadanieForm,
      ulozZadanie, upravitZadanie, zrusitEditZadanie,
      rozpocet, rozpocetUlozeny, ulozRozpocet,
      mentorTimy, timKod, timChyba, timUspech, pripojitSaKTimu, pridatMilnik, schvalitMilnik,
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
.db-chat-panel { max-width: 700px; }
.db-form-group { display: flex; flex-direction: column; gap: 0.35rem; }
.db-form-group label { font-size: 0.82rem; font-weight: 600; color: #475569; }
.db-input { padding: 0.6rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; outline: none; transition: border-color 0.2s; font-family: inherit; }
.db-input:focus { border-color: #c8972a; }
.db-file-input { font-size: 0.88rem; color: #475569; }
.db-info-grid { display: grid; grid-template-columns: 160px 1fr; gap: 0.5rem 1rem; align-items: center; }
.db-info-label { font-size: 0.85rem; color: #64748b; font-weight: 500; }
.db-section-divider { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.25rem 0; border-top: 1px solid #f1f5f9; margin-top: 0.25rem; }
.db-badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
.db-badge.green { background: #dcfce7; color: #16a34a; }
.db-badge.grey { background: #f1f5f9; color: #64748b; }
.db-badge.red { background: #fee2e2; color: #dc2626; }
.db-btn { align-self: flex-start; padding: 0.55rem 1.2rem; background: #c8972a; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: inherit; }
.db-btn:hover { background: #a87820; }
.db-btn-sm { display: inline-block; margin-top: 0.5rem; padding: 0.4rem 0.9rem; background: #c8972a; color: #fff; border-radius: 6px; font-size: 0.82rem; font-weight: 600; cursor: pointer; }
.db-btn-sm-outline { align-self: flex-start; padding: 0.35rem 0.8rem; background: none; border: 1px solid #c8972a; color: #c8972a; border-radius: 6px; font-size: 0.82rem; cursor: pointer; font-family: inherit; }
.db-btn-outline { padding: 0.5rem 1rem; background: none; border: 1px solid #e2e8f0; color: #64748b; border-radius: 8px; font-size: 0.88rem; cursor: pointer; font-family: inherit; }
.db-btn-danger { padding: 0.3rem 0.7rem; background: none; border: 1px solid #fca5a5; color: #dc2626; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-family: inherit; }
.db-btn-danger-sm { background: none; border: none; color: #94a3b8; font-size: 0.9rem; cursor: pointer; padding: 0 0.3rem; }
.db-btn-danger-sm:hover { color: #dc2626; }
.db-empty { font-size: 0.9rem; color: #94a3b8; padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; border: 1px dashed #e2e8f0; }
.db-muted { font-size: 0.9rem; color: #94a3b8; margin: 0; }
.db-success { font-size: 0.88rem; color: #16a34a; margin: 0; }
.db-error { font-size: 0.88rem; color: #dc2626; margin: 0; }
.db-prog-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 0.5rem; }
.db-prog-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s; display: flex; flex-direction: column; gap: 0.3rem; }
.db-prog-card:hover { border-color: #c8972a; box-shadow: 0 2px 12px rgba(200,151,42,0.1); }
.db-prog-tag { font-size: 0.7rem; font-weight: 700; color: #c8972a; text-transform: uppercase; letter-spacing: 0.1em; }
.db-prog-card strong { font-size: 0.95rem; color: #1e293b; }
.db-prog-card p { font-size: 0.82rem; color: #94a3b8; margin: 0; }
.db-clenovia-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-clen-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.6rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.9rem; }
.db-clen-item span:first-child { flex: 1; font-weight: 500; color: #1e293b; }
.db-invite-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.db-invite-row .db-input { flex: 1; min-width: 140px; }
.db-doc-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-doc-item { display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.88rem; }
.db-chat-messages { flex: 1; min-height: 220px; max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem; padding: 0.5rem 0; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
.db-chat-msg { display: flex; flex-direction: column; gap: 0.15rem; max-width: 80%; }
.db-chat-msg.moje { align-self: flex-end; align-items: flex-end; }
.db-chat-msg.nti { align-self: flex-start; }
.db-chat-msg p { background: #f1f5f9; padding: 0.5rem 0.9rem; border-radius: 10px; font-size: 0.9rem; color: #1e293b; margin: 0; }
.db-chat-msg.moje p { background: #c8972a; color: #fff; }
.db-chat-sender { font-size: 0.72rem; color: #94a3b8; font-weight: 600; }
.db-chat-time { font-size: 0.7rem; color: #cbd5e1; }
.db-chat-input-row { display: flex; gap: 0.5rem; }
.db-chat-input-row .db-input { flex: 1; }
.db-zadanie-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; max-width: 640px; margin-bottom: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
.db-zadanie-header { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
.db-zadanie-header strong { font-size: 0.98rem; color: #1e293b; }
.db-milnik-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-milnik-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.88rem; }
.db-milnik-item span:first-child { flex: 1; color: #1e293b; }
.db-kod-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
.db-kod-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.db-kod-row { display: flex; align-items: center; gap: 0.75rem; }
.db-kod { font-size: 1.1rem; color: #1e293b; letter-spacing: 0.08em; font-family: monospace; }
.db-kod-inline { font-size: 0.78rem; color: #64748b; background: #f1f5f9; padding: 0.15rem 0.5rem; border-radius: 4px; font-family: monospace; letter-spacing: 0.06em; }
.db-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 99; }
@media (max-width: 768px) {
  .db-sidebar { position: fixed; top: 0; left: 0; height: 100%; transform: translateX(-100%); }
  .db-sidebar.open { transform: translateX(0); }
  .db-close-btn { display: block; }
  .db-hamburger { display: block; }
  .db-overlay { display: block; }
  .db-prog-cards { grid-template-columns: 1fr; }
}
</style>