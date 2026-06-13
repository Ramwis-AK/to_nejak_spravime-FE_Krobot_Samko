import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user.js'

const app = createApp(App)

app.use(createPinia())   // pinia musí byť pred použitím store
app.use(router)

// Obnova prihlásenia z uloženého tokenu (ak existuje), až potom mount
const userStore = useUserStore()
userStore.fetchMe().finally(() => app.mount('#app'))