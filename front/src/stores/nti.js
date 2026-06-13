// front/src/stores/nti.js  (nahraď CELÝ obsah)
import { defineStore } from 'pinia'
import { api } from '../api.js'

export const useNtiStore = defineStore('nti', {
  state: () => ({
    // verejné zoznamy (napĺňajú sa z backendu)
    startups: [],
    praxe: [],
    partneri: [],
    mentori: [],
    novinky: [],
    vyzvy: [],

    // statické metadáta rolí (pre registráciu)
    roles: [
      { key: 'student', name: 'Študent', desc: 'Jednotlivec uchádzajúci sa o program alebo zakladajúci tím' },
      { key: 'firma',   name: 'Firma / partner', desc: 'Organizácia zadávajúca výzvu alebo vstupujúca do programu B' },
      { key: 'mentor',  name: 'Mentor', desc: 'Osoba sprevádzajúca projekt alebo tím' },
    ],
  }),

  getters: {
    getRoleByKey: (state) => (key) => state.roles.find(r => r.key === key),
  },

  actions: {
    // ====================================================
    // VEREJNÉ ZOZNAMY (ukladajú do store)
    // ====================================================
    async fetchStartups() { this.startups = await api.get('/startups') },
    async fetchPraxe()    { this.praxe = await api.get('/praxe') },
    async fetchPartneri() { this.partneri = await api.get('/partneri') },
    async fetchMentori()  { this.mentori = await api.get('/mentori') },
    async fetchNovinky()  { this.novinky = await api.get('/novinky') },
    async fetchVyzvy()    { this.vyzvy = await api.get('/vyzvy') },    

    // detail jednej položky (vracia priamo dáta)
    fetchStartup(id) { return api.get(`/startups/${id}`) },
    fetchPrax(id)    { return api.get(`/praxe/${id}`) },
    fetchNovinka(id) { return api.get(`/novinky/${id}`) },
    fetchVyzva(id)   { return api.get(`/vyzvy/${id}`) },

    // zoznamy priamo (pre výber v prihláške — nezapisujú do store)
    fetchStartupyRaw() { return api.get('/startups') },
    fetchPraxeRaw()    { return api.get('/praxe') },

    // ====================================================
    // ŠTUDENT — PRIHLÁŠKY
    // ====================================================
    fetchPrihlasky()     { return api.get('/prihlasky') },
    podatPrihlasku(data) { return api.post('/prihlasky', data) },

    // ====================================================
    // ŠTUDENT / FIRMA — DOKUMENTY (úložisko)
    // ====================================================
    fetchDokumenty()         { return api.get('/dokumenty') },
    nahratDokument(formData) { return api.upload('/dokumenty', formData) },
    zmazatDokument(id)       { return api.del(`/dokumenty/${id}`) },

    // ====================================================
    // ŠTUDENT — TÍM
    // ====================================================
    fetchMojTim()          { return api.get('/timy/moj') },        // tím alebo null
    vytvoritTim(data)      { return api.post('/timy', data) },      // študent → vedúci
    pridatClena(kod, clen) { return api.post(`/timy/${kod}/clenovia`, clen) },
    rozpustitTim(kod)      { return api.del(`/timy/${kod}`) },      // zmaže tím + všetko

    // ====================================================
    // FIRMA — ZADANIA (CRUD)
    // ====================================================
    fetchZadania()          { return api.get('/zadania') },
    pridatZadanie(data)     { return api.post('/zadania', data) },
    upravitZadanie(kod, d)  { return api.put(`/zadania/${kod}`, d) },
    zmazatZadanie(kod)      { return api.del(`/zadania/${kod}`) },

    // ====================================================
    // FIRMA — ROZPOČET
    // ====================================================
    fetchRozpocet()    { return api.get('/rozpocet') },
    ulozRozpocet(data) { return api.put('/rozpocet', data) },

    // ====================================================
    // MENTOR — TÍMY, MÍĽNIKY, KONZULTÁCIE
    // ====================================================
    fetchMentorTimy()            { return api.get('/timy/mentor') },
    pripojitMentora(kod)         { return api.post(`/timy/${kod}/mentor`) },
    pridatMilnik(kod, nazov)     { return api.post(`/timy/${kod}/milniky`, { nazov }) },
    schvalitMilnik(kod, id)      { return api.patch(`/timy/${kod}/milniky/${id}`) },
    pridatKonzultaciu(kod, text) { return api.post(`/timy/${kod}/konzultacie`, { text }) },
  },
})