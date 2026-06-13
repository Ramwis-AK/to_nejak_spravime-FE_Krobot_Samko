<template>
  <div class="page-content">
    <div class="over-box">
      <p v-if="loading">Overujem e-mail...</p>
      <template v-else>
        <h1 :class="ok ? 'ok' : 'err'">{{ ok ? '✓ Overené' : '✕ Chyba' }}</h1>
        <p>{{ sprava }}</p>
        <RouterLink v-if="ok" to="/registracia" class="btn-primary">Prihlásiť sa</RouterLink>
      </template>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../api.js'
import AppFooter from '../components/AppFooter.vue'
export default {
  name: 'OverenieView',
  components: { AppFooter },
  setup() {
    const route = useRoute()
    const loading = ref(true)
    const ok = ref(false)
    const sprava = ref('')

    onMounted(async () => {
      try {
        const res = await api.get(`/auth/verify/${route.params.token}`)
        ok.value = true
        sprava.value = res.message
      } catch (e) {
        sprava.value = e.message
      } finally {
        loading.value = false
      }
    })

    return { loading, ok, sprava }
  }
}
</script>

<style scoped>
.over-box { max-width: 480px; margin: 4rem auto; padding: 2rem; text-align: center; }
.over-box h1 { font-size: 1.5rem; margin-bottom: 1rem; }
.over-box .ok { color: #16a34a; }
.over-box .err { color: #dc2626; }
.over-box p { color: #64748b; margin-bottom: 1.5rem; }
</style>