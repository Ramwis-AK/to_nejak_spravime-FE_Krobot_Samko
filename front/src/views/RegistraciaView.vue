<template>
  <div class="page-content">
    <div class="reg-page">
      <div class="reg-header">
        <h1>{{ mode === 'registracia' ? 'Registrácia' : 'Prihlásenie' }}</h1>
        <p>{{ mode === 'registracia' ? 'Vyber typ účtu, ktorý chceš vytvoriť v systéme NTI.' : 'Prihlás sa do svojho účtu v systéme NTI.' }}</p>
      </div>

      <div class="mode-toggle">
        <button :class="['toggle-btn', { active: mode === 'registracia' }]" @click="mode = 'registracia'">Registrácia</button>
        <button :class="['toggle-btn', { active: mode === 'prihlasenie' }]" @click="mode = 'prihlasenie'">Prihlásenie</button>
      </div>

      <div v-if="mode === 'registracia'" class="roles-list">
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

      <div v-else class="login-form">
        <div class="form-group">
          <label>E-mail</label>
          <input v-model="email" type="email" placeholder="tvoj@email.sk" />
        </div>
        <div class="form-group">
          <label>Heslo</label>
          <input v-model="heslo" type="password" placeholder="••••••••" />
        </div>
        <p v-if="chyba" class="login-error">{{ chyba }}</p>
        <button class="login-submit" @click="prihlasit">Prihlásiť sa</button>
        <p class="login-hint">Nemáš účet? <span @click="mode = 'registracia'">Zaregistruj sa</span></p>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useNtiStore } from '../stores/nti.js'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'RegistraciaView',
  components: { AppFooter },
  setup() {
    const store = useNtiStore()
    const userStore = useUserStore()
    const router = useRouter()
    const mode = ref('registracia')
    const email = ref('')
    const heslo = ref('')
    const chyba = ref('')

    async function prihlasit() {
      chyba.value = ''
      if (!email.value || !heslo.value) { chyba.value = 'Vyplň e-mail a heslo.'; return }
      try {
        await userStore.login(email.value, heslo.value)
        router.push('/dashboard')
      } catch (e) {
        chyba.value = e.message
      }
    }

    return { store, mode, email, heslo, chyba, prihlasit }
  }
}
</script>

<style scoped>
.mode-toggle {
  display: flex;
  margin-bottom: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  width: fit-content;
}
.toggle-btn {
  padding: 0.6rem 1.6rem;
  border: none;
  background: #fff;
  color: #64748b;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.toggle-btn.active {
  background: #c8972a;
  color: #fff;
  font-weight: 600;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 420px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
}
.form-group input {
  padding: 0.65rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}
.form-group input:focus {
  border-color: #c8972a;
}
.login-error {
  color: #dc2626;
  font-size: 0.88rem;
  margin: 0;
}
.login-submit {
  padding: 0.75rem;
  background: #c8972a;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.login-submit:hover {
  background: #a87820;
}
.login-hint {
  font-size: 0.88rem;
  color: #64748b;
  text-align: center;
}
.login-hint span {
  color: #c8972a;
  cursor: pointer;
  font-weight: 600;
}
</style>