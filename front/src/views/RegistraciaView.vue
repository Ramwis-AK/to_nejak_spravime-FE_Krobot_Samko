<template>
  <div class="page-content">
    <div class="reg-page">
      <div class="reg-header">
        <h1>Registrácia</h1>
        <p>Vyber typ účtu, ktorý chceš vytvoriť v systéme NTI.</p>
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
    <AppFooter />
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'RegistraciaView',
  components: { AppFooter },
  setup() { return { store: useNtiStore() } }
}
</script>
