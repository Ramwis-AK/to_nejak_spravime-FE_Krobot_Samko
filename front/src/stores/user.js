import { defineStore } from 'pinia'
import { api, setToken, clearToken, getToken } from '../api.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null,
    role: null,
    meno: '',
    email: '',
    profil: {}, // telefon, adresa, ico, sektor, web, popis
  }),
  getters: {
    isLoggedIn: (state) => !!state.role,
  },
  actions: {
    // uloží údaje používateľa do stavu
    setUser(u) {
      this.id = u.id ?? this.id
      this.role = u.rola
      this.meno = u.meno
      this.email = u.email
      this.profil = {
        telefon: u.telefon ?? '', adresa: u.adresa ?? '', ico: u.ico ?? '',
        sektor: u.sektor ?? '', web: u.web ?? '', popis: u.popis ?? '',
      }
    },

    async register(payload) {
      // registrácia NEprihlasuje — vráti len správu + verify_token na overenie e-mailu
      const res = await api.post('/auth/register', payload)
      return res // { message, verify_token }
    },

    async login(email, password) {
      const { user, token } = await api.post('/auth/login', { email, password })
      setToken(token)
      this.setUser(user)
    },

    // obnova prihlásenia po refreshi (ak máme token)
    async fetchMe() {
      if (!getToken()) return
      try {
        const user = await api.get('/auth/me')
        this.setUser(user)
      } catch {
        this.logout()
      }
    },

    async ulozProfil(data) {
      const res = await api.put('/profil', data)
      this.setUser({ ...res.user, id: this.id })
      return res
    },

    async logout() {
      try { await api.post('/auth/logout') } catch { /* token už neplatí */ }
      clearToken()
      this.id = null; this.role = null; this.meno = ''; this.email = ''; this.profil = {}
    },
  },
})