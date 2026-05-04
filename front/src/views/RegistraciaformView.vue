<template>
  <div class="page-content">
    <div class="form-page" v-if="role">
      <RouterLink to="/registracia" class="back-btn">← Späť</RouterLink>
      <h1>{{ role.name }}</h1>
      <p class="role-desc">{{ role.desc }}</p>
      <div class="form-placeholder">
        <p>Registračný formulár bude implementovaný po napojení na Laravel backend.</p>
      </div>
    </div>
    <div v-else class="form-page">
      <RouterLink to="/registracia" class="back-btn">← Späť</RouterLink>
      <p>Rola nenájdená.</p>
    </div>
    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'RegistraciaFormView',
  setup() {
    const store = useNtiStore()
    const route = useRoute()
    return { role: computed(() => store.getRoleByKey(route.params.role)) }
  }
}
</script>

<style scoped>
.form-page { max-width: 600px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.back-btn { display: inline-block; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; text-decoration: none; }
.back-btn:hover { color: var(--navy); }
h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.5rem; }
.role-desc { color: var(--text-muted); margin-bottom: 2rem; }
.form-placeholder { border: 2px dashed var(--border); border-radius: 4px; padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.9rem; }
</style>