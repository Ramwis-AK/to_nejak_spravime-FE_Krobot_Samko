import { defineStore } from 'pinia'
import { api } from '../api.js'

export const useNtiStore = defineStore('nti', {
  state: () => ({
    startups: [], praxe: [], partneri: [], mentori: [], novinky: [], vyzvy: [],
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
    // verejné zoznamy
    async fetchStartups() { this.startups = await api.get('/startups') },
    async fetchPraxe()    { this.praxe = await api.get('/praxe') },
    async fetchPartneri() { this.partneri = await api.get('/partneri') },
    async fetchMentori()  { this.mentori = await api.get('/mentori') },
    async fetchNovinky()  { this.novinky = await api.get('/novinky') },
    async fetchVyzvy()    { this.vyzvy = await api.get('/vyzvy') },
    fetchStartup(id) { return api.get(`/startups/${id}`) },
    fetchPrax(id)    { return api.get(`/praxe/${id}`) },
    fetchNovinka(id) { return api.get(`/novinky/${id}`) },
    fetchVyzva(id)   { return api.get(`/vyzvy/${id}`) },
    fetchDokumenty()         { return api.get('/dokumenty') },
    nahratDokument(formData) { return api.upload('/dokumenty', formData) },
    zmazatDokument(id)       { return api.del(`/dokumenty/${id}`) },

    // FIRMA — zadania
    fetchZadania()        { return api.get('/zadania') },
    pridatZadanie(data)   { return api.post('/zadania', data) },
    upravitZadanie(kod, d){ return api.put(`/zadania/${kod}`, d) },
    zmazatZadanie(kod)    { return api.del(`/zadania/${kod}`) },
    // FIRMA — rozpočet
    fetchRozpocet()      { return api.get('/rozpocet') },
    ulozRozpocet(data)   { return api.put('/rozpocet', data) },

    // VEDÚCI — tím
    fetchMojTim()             { return api.get('/timy/moj') },
    vytvoritTim(data)         { return api.post('/timy', data) },
    pridatClena(kod, clen)    { return api.post(`/timy/${kod}/clenovia`, clen) },
    // VEDÚCI — komunikácia
    fetchSpravy()        { return api.get('/spravy') },
    odoslatSpravu(text)  { return api.post('/spravy', { text }) },

    // MENTOR — tímy a míľniky
    fetchMentorTimy()         { return api.get('/timy/mentor') },
    pripojitMentora(kod)      { return api.post(`/timy/${kod}/mentor`) },
    pridatMilnik(kod, nazov)  { return api.post(`/timy/${kod}/milniky`, { nazov }) },
    schvalitMilnik(kod, id)   { return api.patch(`/timy/${kod}/milniky/${id}`) },
    // MENTOR — konzultácie
    pridatKonzultaciu(kod, text) { return api.post(`/timy/${kod}/konzultacie`, { text }) },

    // ŠTUDENT / VEDÚCI — prihlášky
    fetchPrihlasky()          { return api.get('/prihlasky') },
    podatPrihlasku(data)      { return api.post('/prihlasky', data) },
  },
})