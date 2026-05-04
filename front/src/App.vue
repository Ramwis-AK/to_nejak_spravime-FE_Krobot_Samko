<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-logo">NTI</div>
      <div class="nav-links">
        <button @click="currentPage = 'home'" :class="{ active: currentPage === 'home' }">Domov</button>
        <button @click="currentPage = 'startup'" :class="{ active: currentPage === 'startup' }">StartUp (A)</button>
        <button @click="currentPage = 'prax'" :class="{ active: currentPage === 'prax' }">Prax (B)</button>
        <button @click="currentPage = 'registracia'" class="nav-cta" :class="{ active: currentPage === 'registracia' }">Registrácia</button>
      </div>
    </nav>
 
    <HomePage v-if="currentPage === 'home'" @navigate="currentPage = $event" />
    <StartUpPage v-else-if="currentPage === 'startup'" @navigate="currentPage = $event" />
    <PraxPage v-else-if="currentPage === 'prax'" @navigate="currentPage = $event" />
    <RegistraciaPage v-else-if="currentPage === 'registracia'" @navigate="currentPage = $event" />
    <StartUpDetailPage v-else-if="currentPage === 'startup-detail'" :startup="selectedStartup" @back="currentPage = 'startup'" />
    <PraxDetailPage v-else-if="currentPage === 'prax-detail'" :prax="selectedPrax" @back="currentPage = 'prax'" />
    <RegistraciaFormPage v-else-if="currentPage === 'reg-form'" :role="selectedRole" @back="currentPage = 'registracia'" />
  </div>
</template>
 
<script>
import HomePage from './components/Homapage.vue'
import StartUpPage from './components/Startuppage.vue'
import PraxPage from './components/Praxpage.vue'
import RegistraciaPage from './components/Registraciapage.vue'
import StartUpDetailPage from './components/Startupdetailpage.vue'
import PraxDetailPage from './components/Praxdetailpage.vue'
import RegistraciaFormPage from './components/Registraciaformpage.vue'
 
export default {
  name: 'App',
  components: { HomePage, StartUpPage, PraxPage, RegistraciaPage, StartUpDetailPage, PraxDetailPage, RegistraciaFormPage },
  data() {
    return {
      currentPage: 'home',
      selectedStartup: null,
      selectedPrax: null,
      selectedRole: null
    }
  },
  provide() {
    return {
      navigate: (page, data) => {
        if (data) {
          if (page === 'startup-detail') this.selectedStartup = data
          if (page === 'prax-detail') this.selectedPrax = data
          if (page === 'reg-form') this.selectedRole = data
        }
        this.currentPage = page
      }
    }
  }
}
</script>
 
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
 
:root {
  --navy: #0a1628;
  --navy-light: #152240;
  --accent: #e8b84b;
  --accent-dim: #c99d35;
  --text: #1a1a2e;
  --text-muted: #6b7280;
  --border: #e5e7eb;
  --surface: #f9fafb;
  --white: #ffffff;
  --navbar-h: 64px;
}
 
body {
  font-family: 'Georgia', serif;
  background: var(--white);
  color: var(--text);
}
 
#app { min-height: 100vh; }
 
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--navbar-h);
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  z-index: 1000;
  border-bottom: 2px solid var(--accent);
}
 
.nav-logo {
  font-family: 'Georgia', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--accent);
  letter-spacing: 0.15em;
}
 
.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
 
.nav-links button {
  background: none;
  border: none;
  color: #c8d0e0;
  font-family: inherit;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  letter-spacing: 0.03em;
}
 
.nav-links button:hover, .nav-links button.active {
  color: var(--white);
  background: var(--navy-light);
}
 
.nav-links button.nav-cta {
  background: var(--accent);
  color: var(--navy);
  font-weight: bold;
  margin-left: 0.5rem;
}
 
.nav-links button.nav-cta:hover {
  background: var(--accent-dim);
  color: var(--navy);
}
 
.page-content {
  padding-top: var(--navbar-h);
}
</style>