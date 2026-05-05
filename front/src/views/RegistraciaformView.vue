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