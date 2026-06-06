<!-- DashboardView.vue -->
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

        <!-- ===== ŠTUDENT ===== -->
        <template v-if="role === 'student'">

          <!-- PROFIL -->
          <div v-if="activeSection === 'profil'">
            <div class="db-panel">
              <h3>Môj profil</h3>
              <div class="db-form-group">
                <label>Meno a priezvisko</label>
                <input class="db-input" v-model="profil.meno" type="text" />
              </div>
              <div class="db-form-group">
                <label>E-mail</label>
                <input class="db-input" v-model="profil.email" type="email" />
              </div>
              <div class="db-form-group">
                <label>Heslo</label>
                <input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" />
              </div>
              <div class="db-form-group">
                <label>Adresa</label>
                <input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" />
              </div>
              <div class="db-form-group">
                <label>Telefón</label>
                <input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" />
              </div>
              <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
              <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
            </div>
          </div>

          <!-- PRIHLÁŠKA -->
          <div v-else-if="activeSection === 'prihlaška'">
            <div class="db-panel">
              <h3>Moja prihláška</h3>
              <div v-if="!prihlaška.podana">
                <p class="db-muted">Zatiaľ si nepodal prihlášku. Vyber program:</p>
                <div class="db-prog-cards">
                  <div class="db-prog-card" @click="zacatPrihlaskaProgram('A')">
                    <span class="db-prog-tag">Program A</span>
                    <strong>Startup / Inkubácia</strong>
                    <p>Vlastný nápad — seed fáza</p>
                    <span class="db-btn-sm">Začať prihlášku →</span>
                  </div>
                  <div class="db-prog-card" @click="zacatPrihlaskaProgram('B')">
                    <span class="db-prog-tag">Program B</span>
                    <strong>Živá prax</strong>
                    <p>Zadanie od firmy — otvorené výzvy</p>
                    <span class="db-btn-sm">Začať prihlášku →</span>
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
          </div>

          <!-- DOKUMENTY -->
          <div v-else-if="activeSection === 'dokumenty'">
            <div class="db-panel">
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
          </div>

        </template>

        <!-- ===== VEDÚCI TÍMU ===== -->
        <template v-else-if="role === 'vedouci'">

          <!-- PROFIL -->
          <div v-if="activeSection === 'profil'">
            <div class="db-panel">
              <h3>Môj profil</h3>
              <div class="db-form-group">
                <label>Meno a priezvisko</label>
                <input class="db-input" v-model="profil.meno" type="text" />
              </div>
              <div class="db-form-group">
                <label>E-mail</label>
                <input class="db-input" v-model="profil.email" type="email" />
              </div>
              <div class="db-form-group">
                <label>Heslo</label>
                <input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" />
              </div>
              <div class="db-form-group">
                <label>Adresa</label>
                <input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" />
              </div>
              <div class="db-form-group">
                <label>Telefón</label>
                <input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" />
              </div>
              <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
              <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
            </div>
          </div>

          <!-- PRIHLÁŠKA -->
          <div v-else-if="activeSection === 'prihlaška'">
            <div class="db-panel">
              <h3>Prihláška tímu</h3>
              <div v-if="!prihlaška.podana">
                <p class="db-muted">Tím ešte nepodal prihlášku. Vyber program:</p>
                <div class="db-prog-cards">
                  <div class="db-prog-card" @click="zacatPrihlaskaProgram('A')">
                    <span class="db-prog-tag">Program A</span>
                    <strong>Startup / Inkubácia</strong>
                    <p>Vlastný nápad — seed fáza</p>
                    <span class="db-btn-sm">Začať prihlášku →</span>
                  </div>
                  <div class="db-prog-card" @click="zacatPrihlaskaProgram('B')">
                    <span class="db-prog-tag">Program B</span>
                    <strong>Živá prax</strong>
                    <p>Zadanie od firmy — otvorené výzvy</p>
                    <span class="db-btn-sm">Začať prihlášku →</span>
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
          </div>

          <!-- MÔJ TÍM -->
          <div v-else-if="activeSection === 'tim'">
            <div class="db-panel">
              <h3>Môj tím</h3>
              <div class="db-info-grid">
                <span class="db-info-label">Názov tímu</span><span>{{ tim.nazov || '—' }}</span>
                <span class="db-info-label">Program</span><span>{{ tim.program || '—' }}</span>
                <span class="db-info-label">Počet členov</span><span>{{ tim.clenovia.length }}</span>
              </div>

              <div class="db-section-divider">Členovia tímu</div>
              <div v-if="tim.clenovia.length" class="db-clenovia-list">
                <div v-for="(clen, i) in tim.clenovia" :key="i" class="db-clen-item">
                  <span>{{ clen.meno }}</span>
                  <span class="db-muted">{{ clen.telefon }}</span>
                  <button class="db-btn-danger-sm" @click="tim.clenovia.splice(i,1)">✕</button>
                </div>
              </div>
              <div v-else class="db-empty">Zatiaľ žiadni ďalší členovia.</div>

              <div class="db-section-divider">Pozvať člena</div>
              <div class="db-invite-row">
                <input class="db-input" v-model="novyClen.meno" placeholder="Meno a priezvisko" />
                <input class="db-input" v-model="novyClen.telefon" placeholder="+421 9xx xxx xxx" />
                <button class="db-btn" @click="pozvatClena">Pridať</button>
              </div>
            </div>
          </div>

          <!-- KOMUNIKÁCIA -->
          <div v-else-if="activeSection === 'komunikacia'">
            <div class="db-panel db-chat-panel">
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
          </div>

        </template>

        <!-- ===== FIRMA ===== -->
        <template v-else-if="role === 'firma'">

          <!-- PROFIL -->
          <div v-if="activeSection === 'profil'">
            <div class="db-panel">
              <h3>Firemný profil</h3>
              <div class="db-form-group">
                <label>Názov firmy</label>
                <input class="db-input" v-model="profil.meno" type="text" />
              </div>
              <div class="db-form-group">
                <label>E-mail</label>
                <input class="db-input" v-model="profil.email" type="email" />
              </div>
              <div class="db-form-group">
                <label>Heslo</label>
                <input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" />
              </div>
              <div class="db-form-group">
                <label>Adresa sídla</label>
                <input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" />
              </div>
              <div class="db-form-group">
                <label>Kontaktný telefón</label>
                <input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" />
              </div>
              <div class="db-form-group">
                <label>IČO</label>
                <input class="db-input" v-model="profil.ico" type="text" placeholder="12345678" />
              </div>
              <div class="db-form-group">
                <label>Sektor</label>
                <input class="db-input" v-model="profil.sektor" type="text" placeholder="IT / FinTech / HealthTech..." />
              </div>
              <div class="db-form-group">
                <label>Web</label>
                <input class="db-input" v-model="profil.web" type="url" placeholder="https://firma.sk" />
              </div>
              <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
              <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
            </div>
          </div>

          <div v-else-if="activeSection === 'zadania'">
            <div class="db-panel">
              <h3>Zadania pre tímy</h3>
              <div class="db-empty">Žiadne zadania. Zadania sa načítajú z backendu.</div>
              <button class="db-btn">Pridať zadanie</button>
            </div>
          </div>

          <div v-else-if="activeSection === 'spec'">
            <div class="db-panel">
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
          </div>

          <div v-else-if="activeSection === 'rozpocet'">
            <div class="db-panel">
              <h3>PO a rozpočet</h3>
              <div class="db-info-grid">
                <span class="db-info-label">Schválený rozpočet</span><span>—</span>
                <span class="db-info-label">Čerpané</span><span>—</span>
                <span class="db-info-label">Zostatok</span><span>—</span>
              </div>
            </div>
          </div>

        </template>

        <!-- ===== MENTOR ===== -->
        <template v-else-if="role === 'mentor'">

          <!-- PROFIL -->
          <div v-if="activeSection === 'profil'">
            <div class="db-panel">
              <h3>Môj profil</h3>
              <div class="db-form-group">
                <label>Meno a priezvisko</label>
                <input class="db-input" v-model="profil.meno" type="text" />
              </div>
              <div class="db-form-group">
                <label>E-mail</label>
                <input class="db-input" v-model="profil.email" type="email" />
              </div>
              <div class="db-form-group">
                <label>Heslo</label>
                <input class="db-input" v-model="profil.heslo" type="password" placeholder="••••••••" />
              </div>
              <div class="db-form-group">
                <label>Adresa</label>
                <input class="db-input" v-model="profil.adresa" type="text" placeholder="Ulica, Mesto, PSČ" />
              </div>
              <div class="db-form-group">
                <label>Telefón</label>
                <input class="db-input" v-model="profil.telefon" type="tel" placeholder="+421 9xx xxx xxx" />
              </div>
              <button class="db-btn" @click="ulozProfil">Uložiť zmeny</button>
              <p v-if="profilUlozene" class="db-success">Profil bol uložený.</p>
            </div>
          </div>

          <!-- TÍMY A MÍĽNIKY -->
          <div v-else-if="activeSection === 'timy'">
            <div v-for="(tim, i) in mentorTimy" :key="i" class="db-panel" style="margin-bottom:1rem;">
              <div class="db-info-grid">
                <span class="db-info-label">Tím</span><span>{{ tim.nazov }}</span>
                <span class="db-info-label">Projekt</span><span>{{ tim.projekt }}</span>
                <span class="db-info-label">Program</span><span>{{ tim.program }}</span>
              </div>
              <div class="db-section-divider">Míľniky</div>
              <div v-if="tim.milniky.length" class="db-milnik-list">
                <div v-for="(m, mi) in tim.milniky" :key="mi" class="db-milnik-item">
                  <span>{{ m.nazov }}</span>
                  <span :class="['db-badge', m.splneny ? 'green' : 'grey']">{{ m.splneny ? 'Splnený' : 'Čakajúci' }}</span>
                  <button v-if="!m.splneny" class="db-btn-sm-outline" @click="m.splneny = true">Schváliť</button>
                </div>
              </div>
              <div v-else class="db-empty">Žiadne míľniky.</div>
              <div class="db-invite-row" style="margin-top:0.75rem;">
                <input class="db-input" v-model="tim.novyMilnik" placeholder="Názov nového míľnika" />
                <button class="db-btn" @click="pridatMilnik(tim)">Pridať míľnik</button>
              </div>
            </div>
            <div v-if="!mentorTimy.length" class="db-panel">
              <div class="db-empty">Žiadne priradené tímy.</div>
            </div>
          </div>

        </template>

        <!-- ===== KOMISIA ===== -->
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

        <!-- ===== EDITOR ===== -->
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

        <!-- ===== NTI ADMIN ===== -->
        <template v-else-if="role === 'admin'">
          <div v-if="activeSection === 'pouzivatelia'" class="db-panel">
            <h3>Správa používateľov</h3>
            <div class="db-info-grid">
              <span class="db-info-label">Celkom</span><span>0</span>
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

        <!-- ===== SUPER ADMIN ===== -->
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
            <div class="db-empty">Načíta sa z backendu.</div>
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const MENU_CONFIG = [
  { key: 'profil',       label: 'Môj profil',        icon: '👤', roles: ['student', 'vedouci', 'firma', 'mentor'] },
  { key: 'prihlaška',    label: 'Prihláška',          icon: '📋', roles: ['student', 'vedouci'] },
  { key: 'dokumenty',    label: 'Dokumenty',          icon: '📁', roles: ['student', 'firma'] },
  { key: 'tim',          label: 'Môj tím',            icon: '👥', roles: ['vedouci'] },
  { key: 'komunikacia',  label: 'Komunikácia s NTI',  icon: '💬', roles: ['vedouci'] },
  { key: 'zadania',      label: 'Zadania',            icon: '📝', roles: ['firma'] },
  { key: 'spec',         label: 'Tech. špecifikácia', icon: '⚙️',  roles: ['firma'] },
  { key: 'rozpocet',     label: 'PO a rozpočet',      icon: '💰', roles: ['firma'] },
  { key: 'timy',         label: 'Tímy a míľniky',    icon: '🏁', roles: ['mentor'] },
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
  student: 'Študent', vedouci: 'Vedúci tímu', firma: 'Firma / partner',
  mentor: 'Mentor', komisia: 'Komisia', editor: 'Editor obsahu',
  admin: 'NTI Administrátor', superadmin: 'Super administrátor',
}

export default {
  name: 'DashboardView',
  setup() {
    const userStore = useUserStore()
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

    // --- TÍM (vedúci) ---
    const tim = ref({
      nazov: 'Môj tím',
      program: '—',
      clenovia: [{ meno: userStore.meno, telefon: userStore.telefon || '—' }],
    })
    const novyClen = ref({ meno: '', telefon: '' })
    function pozvatClena() {
      if (!novyClen.value.meno) return
      tim.value.clenovia.push({ ...novyClen.value })
      novyClen.value = { meno: '', telefon: '' }
    }

    // --- CHAT (vedúci) ---
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
      // TODO: odoslať na backend, načítať odpoveď
    }

    // --- MENTOR TÍMY ---
    const mentorTimy = ref([
      {
        nazov: 'Tím Alpha',
        projekt: 'EcoFlow App',
        program: 'Program A',
        novyMilnik: '',
        milniky: [
          { nazov: 'Definícia MVP', splneny: true },
          { nazov: 'Prvý prototyp', splneny: false },
        ],
      },
    ])
    function pridatMilnik(tim) {
      if (!tim.novyMilnik.trim()) return
      tim.milniky.push({ nazov: tim.novyMilnik, splneny: false })
      tim.novyMilnik = ''
    }

    return {
      userStore, role, roleLabel, visibleMenu, activeSection, currentSection,
      sidebarOpen, navigate, logout,
      profil, profilUlozene, ulozProfil,
      prihlaška, zacatPrihlaskaProgram, stavBadgeClass,
      dokumenty, nahratDokument,
      tim, novyClen, pozvatClena,
      chatSpravy, novaSpravaText, chatEl, odoslatSpravu,
      mentorTimy, pridatMilnik,
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

.db-section-divider { font-size: 0.78rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.25rem 0; border-top: 1px solid #f1f5f9; margin-top: 0.25rem; }

.db-badge { display: inline-block; padding: 0.2rem 0.65rem; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
.db-badge.green { background: #dcfce7; color: #16a34a; }
.db-badge.grey { background: #f1f5f9; color: #64748b; }
.db-badge.red { background: #fee2e2; color: #dc2626; }

.db-btn { align-self: flex-start; padding: 0.55rem 1.2rem; background: #c8972a; color: #fff; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; font-family: inherit; }
.db-btn:hover { background: #a87820; }
.db-btn-sm { display: inline-block; margin-top: 0.5rem; padding: 0.4rem 0.9rem; background: #c8972a; color: #fff; border-radius: 6px; font-size: 0.82rem; font-weight: 600; cursor: pointer; }
.db-btn-sm-outline { padding: 0.3rem 0.7rem; background: none; border: 1px solid #c8972a; color: #c8972a; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-family: inherit; }
.db-btn-danger { padding: 0.3rem 0.7rem; background: none; border: 1px solid #fca5a5; color: #dc2626; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-family: inherit; }
.db-btn-danger-sm { background: none; border: none; color: #94a3b8; font-size: 0.9rem; cursor: pointer; padding: 0 0.3rem; }
.db-btn-danger-sm:hover { color: #dc2626; }

.db-empty { font-size: 0.9rem; color: #94a3b8; padding: 1rem; background: #f8fafc; border-radius: 8px; text-align: center; border: 1px dashed #e2e8f0; }
.db-muted { font-size: 0.9rem; color: #94a3b8; margin: 0; }
.db-success { font-size: 0.88rem; color: #16a34a; margin: 0; }

.db-prog-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
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

.db-milnik-list { display: flex; flex-direction: column; gap: 0.5rem; }
.db-milnik-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; background: #f8fafc; border-radius: 8px; font-size: 0.88rem; }
.db-milnik-item span:first-child { flex: 1; color: #1e293b; }

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