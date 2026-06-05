import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    role: null,
    meno: '',
    email: '',
  }),
  getters: {
    isLoggedIn: (state) => !!state.role,
  },
  actions: {
    setRole(role) { this.role = role },
    setUser(data) { this.role = data.role; this.meno = data.meno; this.email = data.email },
    logout() { this.role = null; this.meno = ''; this.email = '' },
  },
})