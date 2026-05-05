import { defineStore } from 'pinia'

export const useNtiStore = defineStore('nti', {
  state: () => ({
    stats: {
      students: 247,
      firms: 38,
      projects: 61,
    },
    startups: [
      { id: 1, nazov: 'EcoFlow', oblast: 'Energy', faza: 'Seed', lokalita: 'DE', vp: 'Domáce batérie z recyklovaných plastov', investicia: '$200k ARR' },
      { id: 2, nazov: 'HealthAI', oblast: 'Health', faza: 'Series A', lokalita: 'USA', vp: 'Diagnostika rakoviny pomocou mobilu', investicia: '50k pacientov' },
      { id: 3, nazov: 'AgroSense', oblast: 'AgriTech', faza: 'Pre-seed', lokalita: 'SK', vp: 'IoT senzory pre inteligentné farmy', investicia: '€80k grant' },
      { id: 4, nazov: 'EduFlow', oblast: 'EdTech', faza: 'Seed', lokalita: 'CZ', vp: 'Personalizované učenie pomocou AI', investicia: '$150k ARR' },
    ],
    praxe: [
      { id: 1, firma: 'TechNitra s.r.o.', sektor: 'IT / SaaS', stav: 'Otvorené', stavKey: 'open', lokalita: 'Nitra', zadanie: 'Webová aplikácia pre správu skladu', odmena: '€2 400 / tím' },
      { id: 2, firma: 'Agrobanka a.s.', sektor: 'FinTech', stav: 'Párovanie', stavKey: 'pairing', lokalita: 'Bratislava', zadanie: 'Mobilná aplikácia pre poľnohospodárske úvery', odmena: '€3 000 / tím' },
      { id: 3, firma: 'GreenLogistics', sektor: 'Logistika', stav: 'V realizácii', stavKey: 'active', lokalita: 'Nitra', zadanie: 'Route optimization dashboard pre vodičov', odmena: '€2 800 / tím' },
      { id: 4, firma: 'MedCenter SK', sektor: 'HealthTech', stav: 'Otvorené', stavKey: 'open', lokalita: 'Nitra', zadanie: 'Systém spracovania lekárskych dát', odmena: '€3 500 / tím' },
    ],
    roles: [
      { key: 'student', name: 'Študent', desc: 'Jednotlivec uchádzajúci sa o prax alebo prácu v StartUpe' },
      { key: 'vedouci', name: 'Vedúci tímu', desc: 'Jednotlivec s právom správy tímu alebo zakladajúci StartUp' },
      { key: 'firma', name: 'Firma / partner', desc: 'Organizácia zadávajúca výzvu pre prax alebo zakladajúca StartUp' },
      { key: 'mentor', name: 'Mentor', desc: 'Osoba sprevádzajúca projekt alebo tím' },
      { key: 'komisia', name: 'Komisia / evaluator', desc: 'Hodnotiteľ prihlášok' },
      { key: 'editor', name: 'Editor obsahu', desc: 'Správca verejného obsahu' },
      { key: 'nti-admin', name: 'NTI administrátor', desc: 'Prevádzkový správca programu' },
      { key: 'super-admin', name: 'Super administrátor', desc: 'Technicko-prevádzková rola' },
    ],
  }),
  getters: {
    getStartupById: (state) => (id) => state.startups.find(s => s.id === Number(id)),
    getPraxById: (state) => (id) => state.praxe.find(p => p.id === Number(id)),
    getRoleByKey: (state) => (key) => state.roles.find(r => r.key === key),
  },
})