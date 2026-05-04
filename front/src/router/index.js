import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/startup', name: 'startup', component: () => import('../views/StartUpView.vue') },
    { path: '/startup/:id', name: 'startup-detail', component: () => import('../views/StartUpDetailView.vue') },
    { path: '/prax', name: 'prax', component: () => import('../views/PraxView.vue') },
    { path: '/prax/:id', name: 'prax-detail', component: () => import('../views/PraxDetailView.vue') },
    { path: '/registracia', name: 'registracia', component: () => import('../views/RegistraciaView.vue') },
    { path: '/registracia/:role', name: 'reg-form', component: () => import('../views/RegistraciaFormView.vue') },
  ],
})

export default router