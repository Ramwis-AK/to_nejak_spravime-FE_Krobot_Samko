import { defineStore } from 'pinia'
import { apiGet } from '../api.js'

export const useNtiStore = defineStore('nti', {
  state: () => ({
    // Dáta sa napĺňajú z backendu (prázdne, kým ich nenačítame)
    startups: [],
    praxe: [],
    partneri: [],
    mentori: [],
    novinky: [],

    // Statické metadáta rolí (využíva registračný formulár)
    roles: [
      { key: 'student', name: 'Študent', desc: 'Jednotlivec uchádzajúci sa o prax alebo prácu v StartUpe' },
      { key: 'vedouci', name: 'Vedúci tímu', desc: 'Jednotlivec s právom správy tímu alebo zakladajúci StartUp' },
      { key: 'firma', name: 'Firma / partner', desc: 'Organizácia zadávajúca výzvu pre prax alebo zakladajúca StartUp' },
      { key: 'mentor', name: 'Mentor', desc: 'Osoba sprevádzajúca projekt alebo tím' },
    ],
  }),

  getters: {
    getRoleByKey: (state) => (key) => state.roles.find(r => r.key === key),
  },

  actions: {
    // --- načítanie zoznamov (pre prehľadové stránky) ---
    async fetchStartups() { this.startups = await apiGet('/startups') },
    async fetchPraxe()    { this.praxe = await apiGet('/praxe') },
    async fetchPartneri() { this.partneri = await apiGet('/partneri') },
    async fetchMentori()  { this.mentori = await apiGet('/mentori') },
    async fetchNovinky()  { this.novinky = await apiGet('/novinky') },

    // --- načítanie jedného záznamu (pre detail stránky) ---
    // Vracajú priamo dáta; detail stránka si ich uloží do lokálnej premennej.
    fetchStartup(id) { return apiGet(`/startups/${id}`) },
    fetchPrax(id)    { return apiGet(`/praxe/${id}`) },
    fetchNovinka(id) { return apiGet(`/novinky/${id}`) },
  },
})