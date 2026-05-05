<template>
  <div class="page-content">
    <div class="reg-page">
      <div class="reg-header">
        <h1>Registrácia</h1>
        <p>Vyber typ účtu, ktorý chceš vytvoriť.</p>
      </div>

      <div class="roles-list">
        <button
          v-for="role in roles"
          :key="role.key"
          class="role-btn"
          @click="navigate('reg-form', role)"
        >
          <div class="role-left">
            <span class="role-name">{{ role.name }}</span>
            <span class="role-desc">{{ role.desc }}</span>
          </div>
          <span class="role-arrow">→</span>
        </button>
      </div>
    </div>

    <footer class="footer">
      <span>© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'RegistraciaPage',
  inject: ['navigate'],
  data() {
    return {
      roles: [
      { key: 'student', name: 'Študent', desc: 'Jednotlivec uchádzajúci sa o prax alebo prácu v StartUpe' },
      { key: 'vedouci', name: 'Vedúci tímu', desc: 'Jednotlivec s právom správy tímu alebo zakladajúci StartUp' },
      { key: 'firma', name: 'Firma / partner', desc: 'Organizácia zadávajúca výzvu pre prax alebo zakladajúca StartUp' },
      { key: 'mentor', name: 'Mentor', desc: 'Osoba sprevádzajúca projekt alebo tím' },
      { key: 'komisia', name: 'Komisia / evaluator', desc: 'Hodnotiteľ prihlášok' },
      { key: 'editor', name: 'Editor obsahu', desc: 'Správca verejného obsahu' },
      { key: 'nti-admin', name: 'NTI administrátor', desc: 'Prevádzkový správca programu' },
      { key: 'super-admin', name: 'Super administrátor', desc: 'Technicko-prevádzková rola' },
      ]
    }
  }
}
</script>

<style scoped>
.reg-page { max-width: 680px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }

.reg-header { margin-bottom: 2.5rem; }
.reg-header h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.5rem; }
.reg-header p { color: var(--text-muted); }

.roles-list { display: flex; flex-direction: column; gap: 0.5rem; }

.role-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.5rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  font-family: inherit;
}

.role-btn:hover {
  border-color: var(--navy);
  background: var(--surface);
  transform: translateX(4px);
}

.role-left { display: flex; flex-direction: column; gap: 0.2rem; }

.role-name { font-size: 1rem; font-weight: bold; color: var(--navy); }
.role-desc { font-size: 0.85rem; color: var(--text-muted); }
.role-arrow { color: var(--accent); font-size: 1.2rem; flex-shrink: 0; }

.footer { background: var(--navy); color: #6b7e99; text-align: center; padding: 1.5rem; font-size: 0.8rem; letter-spacing: 0.05em; border-top: 1px solid #1e3050; }
</style>