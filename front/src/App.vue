<template>
  <div id="app">
    <nav class="navbar">
      <RouterLink to="/" class="nav-logo">NTI</RouterLink>
      <div class="nav-links" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Domov</RouterLink>
        <RouterLink to="/vyzvy" @click="menuOpen = false">Výzvy</RouterLink>
        <RouterLink to="/o-nti" @click="menuOpen = false">O NTI</RouterLink>
        <RouterLink to="/startup" @click="menuOpen = false">Program A</RouterLink>
        <RouterLink to="/prax" @click="menuOpen = false">Program B</RouterLink>
        <RouterLink to="/partneri" @click="menuOpen = false">Partneri</RouterLink>
        <RouterLink to="/novinky" @click="menuOpen = false">Novinky</RouterLink>
        <RouterLink to="/kontakt" @click="menuOpen = false">Kontakt</RouterLink>

        <!-- Neprihlásený -->
        <template v-if="!userStore.role">
          <RouterLink to="/registracia" class="nav-cta" @click="menuOpen = false">Registrácia/Prihlásenie</RouterLink>
        </template>

        <!-- Prihlásený -->
        <template v-else>
          <RouterLink to="/dashboard" class="nav-cta" @click="menuOpen = false">Profil</RouterLink>
          <button class="nav-logout" @click="logout">Odhlásiť</button>
        </template>
      </div>
      <button class="nav-mobile-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
        <svg width="22" height="22" fill="none" stroke="#c8d0e0" stroke-width="2">
          <line v-if="!menuOpen" x1="3" y1="6" x2="19" y2="6"/>
          <line v-if="!menuOpen" x1="3" y1="11" x2="19" y2="11"/>
          <line v-if="!menuOpen" x1="3" y1="16" x2="19" y2="16"/>
          <line v-if="menuOpen" x1="4" y1="4" x2="18" y2="18"/>
          <line v-if="menuOpen" x1="18" y1="4" x2="4" y2="18"/>
        </svg>
      </button>
    </nav>
    <RouterView />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useUserStore } from './stores/user.js'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const menuOpen = ref(false)
    const userStore = useUserStore()
    const router = useRouter()

    function logout() {
      userStore.logout()
      menuOpen.value = false
      router.push('/registracia')
    }

    return { menuOpen, userStore, logout }
  }
}
</script>

<style scoped>
.nav-logout {
  background: none;
  border: 1px solid rgba(200, 151, 42, 0.5);
  color: #c8972a;
  font-size: 0.9rem;
  padding: 0.45rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
}
.nav-logout:hover {
  background: #c8972a;
  color: #fff;
}
</style>