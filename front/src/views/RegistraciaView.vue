<template>
  <div class="page-content">
    <div class="reg-page">
      <div class="reg-header">
        <h1>Registrácia</h1>
        <p>Vyber typ účtu, ktorý chceš vytvoriť.</p>
      </div>
      <div class="roles-list">
        <RouterLink
          v-for="role in store.roles"
          :key="role.key"
          :to="`/registracia/${role.key}`"
          class="role-btn"
        >
          <div class="role-left">
            <span class="role-name">{{ role.name }}</span>
            <span class="role-desc">{{ role.desc }}</span>
          </div>
          <span class="role-arrow">→</span>
        </RouterLink>
      </div>
    </div>
    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
export default {
  name: 'RegistraciaView',
  setup() { return { store: useNtiStore() } }
}
</script>

<style scoped>
.reg-page { max-width: 680px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.reg-header { margin-bottom: 2.5rem; }
.reg-header h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.5rem; }
.reg-header p { color: var(--text-muted); }
.roles-list { display: flex; flex-direction: column; gap: 0.5rem; }
.role-btn {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.2rem 1.5rem;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}
.role-btn:hover { border-color: var(--navy); background: var(--surface); transform: translateX(4px); }
.role-left { display: flex; flex-direction: column; gap: 0.2rem; }
.role-name { font-size: 1rem; font-weight: bold; color: var(--navy); }
.role-desc { font-size: 0.85rem; color: var(--text-muted); }
.role-arrow { color: var(--accent); font-size: 1.2rem; }
</style>