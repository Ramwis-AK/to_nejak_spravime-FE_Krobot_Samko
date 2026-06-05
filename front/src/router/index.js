import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() { return { top: 0 } },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/o-nti', name: 'o-nti', component: () => import('../views/ONtiView.vue') },
    { path: '/startup', name: 'startup', component: () => import('../views/StartupView.vue') },
    { path: '/startup/:id', name: 'startup-detail', component: () => import('../views/StartupdetailView.vue') },
    { path: '/prax', name: 'prax', component: () => import('../views/PraxView.vue') },
    { path: '/prax/:id', name: 'prax-detail', component: () => import('../views/PraxdetailView.vue') },
    { path: '/partneri', name: 'partneri', component: () => import('../views/PartnerView.vue') },
    { path: '/novinky', name: 'novinky', component: () => import('../views/NovinkyView.vue') },
    { path: '/novinky/:id', name: 'novinka-detail', component: () => import('../views/NovinkaDetailView.vue') },
    { path: '/kontakt', name: 'kontakt', component: () => import('../views/KontaktView.vue') },
    { path: '/registracia', name: 'registracia', component: () => import('../views/RegistraciaView.vue') },
    { path: '/registracia/:role', name: 'reg-form', component: () => import('../views/RegistraciaformView.vue') },
  ],
})

export default router
