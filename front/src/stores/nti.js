import { defineStore } from 'pinia'

import { apiGet } from '../api.js'

export const useNtiStore = defineStore('nti', {
  state: () => ({
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
      { key: 'veduci', name: 'Vedúci tímu', desc: 'Jednotlivec s právom správy tímu alebo zakladajúci StartUp' },
      { key: 'firma', name: 'Firma / partner', desc: 'Organizácia zadávajúca výzvu pre prax alebo zakladajúca StartUp' },
      { key: 'mentor', name: 'Mentor', desc: 'Osoba sprevádzajúca projekt alebo tím' },
    ],
    partneri: [
      { id: 1, nazov: 'UKF Nitra', typ: 'Akademický', popis: 'Univerzita Konštantína Filozofa v Nitre — zakladajúci akademický partner programu.' },
      { id: 2, nazov: 'TechNitra s.r.o.', typ: 'Firemný', popis: 'Regionálny IT líder, zadávateľ výziev v Programme B a mentor tímov.' },
      { id: 3, nazov: 'Agrobanka a.s.', typ: 'Firemný', popis: 'Finančný partner a zadávateľ FinTech zadaní.' },
      { id: 4, nazov: 'Slovak Innovation Hub', typ: 'Ekosystém', popis: 'Napojenie na národný inovačný ekosystém a cezhraničné príležitosti.' },
      { id: 5, nazov: 'GreenLogistics', typ: 'Firemný', popis: 'Partner v oblasti logistiky a udržateľných technológií.' },
      { id: 6, nazov: 'MedCenter SK', typ: 'Firemný', popis: 'Zdravotnícka organizácia a partner HealthTech projektov.' },
    ],
    mentori: [
      { id: 1, meno: 'Dominik Halvoník', oblast: 'Architektúra & Backend', skusenosti: '12+ rokov, solution architect' },
      { id: 2, meno: 'Jana Kováčová', oblast: 'UX / Produktový dizajn', skusenosti: '8 rokov, ex-Slido' },
      { id: 3, meno: 'Martin Blaho', oblast: 'Biznis & Financie', skusenosti: 'Investor, 3 exits' },
      { id: 4, meno: 'Peter Šimko', oblast: 'AI & Dáta', skusenosti: 'PhD, ML engineer' },
    ],
    novinky: [],

    // --- ZDIEĽANÉ ENTITY (firma → zadania, vedúci → tímy) ---
    // Firma vytvára zadania, každé má unikátny kód ZAD-XXXX
    zadania: [
      {
        kod: 'ZAD-0001',
        nazov: 'Webová aplikácia pre správu skladu',
        firma: 'TechNitra s.r.o.',
        sektor: 'IT / SaaS',
        lokalita: 'Nitra',
        odmena: '€2 400 / tím',
        popis: 'Vytvorenie modernej webovej aplikácie na správu skladových zásob s real-time aktualizáciami.',
        stav: 'Otvorené',
      },
      {
        kod: 'ZAD-0002',
        nazov: 'Mobilná aplikácia pre poľnohospodárske úvery',
        firma: 'Agrobanka a.s.',
        sektor: 'FinTech',
        lokalita: 'Bratislava',
        odmena: '€3 000 / tím',
        popis: 'Mobilná aplikácia umožňujúca farmárom žiadať o mikro-úvery s automatickým scoringom.',
        stav: 'Otvorené',
      },
    ],

    // Vedúci tímu vytvára tím, dostane kód TIM-XXXX; mentor sa pripojí týmto kódom
    timy: [
      {
        kod: 'TIM-0001',
        nazov: 'Tím Alpha',
        projekt: 'EcoFlow App',
        program: 'Program A',
        vedouci: 'Petra Hlavná',
        clenovia: [{ meno: 'Petra Hlavná', telefon: '+421 900 111 222' }],
        mentor: null,
        milniky: [
          { nazov: 'Definícia MVP', splneny: true },
          { nazov: 'Prvý prototyp', splneny: false },
        ],
      },
      {
        kod: 'TIM-0002',
        nazov: 'Tím Beta',
        projekt: 'AgroSense Dashboard',
        program: 'Program B',
        vedouci: 'Ján Novák',
        clenovia: [{ meno: 'Ján Novák', telefon: '+421 900 333 444' }],
        mentor: null,
        milniky: [],
      },
    ],
  }),

  getters: {
    getStartupById: (state) => (id) => state.startups.find(s => s.id === Number(id)),
    getPraxById: (state) => (id) => state.praxe.find(p => p.id === Number(id)),
    getRoleByKey: (state) => (key) => state.roles.find(r => r.key === key),
    getNovinkaById: (state) => (id) => state.novinky.find(n => n.id === Number(id)),
    getZadanieByKod: (state) => (kod) => state.zadania.find(z => z.kod === kod),
    getTimByKod: (state) => (kod) => state.timy.find(t => t.kod === kod),
  },

  actions: {
    // generuje kód formátu PREFIX-XXXX
    _genKod(prefix, zoznam) {
      const num = zoznam.length + 1
      return `${prefix}-${String(num).padStart(4, '0')}`
    },

    pridatZadanie(data) {
      const kod = this._genKod('ZAD', this.zadania)
      this.zadania.push({ kod, ...data })
      return kod
    },

    upravitZadanie(kod, data) {
      const i = this.zadania.findIndex(z => z.kod === kod)
      if (i !== -1) this.zadania[i] = { ...this.zadania[i], ...data }
    },

    vytvoritTim(data) {
      const kod = this._genKod('TIM', this.timy)
      this.timy.push({ kod, mentor: null, milniky: [], ...data })
      return kod
    },

    pripojitMentora(timKod, mentorMeno) {
      const tim = this.timy.find(t => t.kod === timKod)
      if (tim) tim.mentor = mentorMeno
    },

    pridatMilnikKTimu(timKod, nazov) {
      const tim = this.timy.find(t => t.kod === timKod)
      if (tim) tim.milniky.push({ nazov, splneny: false })
    },

    schvalitMilnik(timKod, milnikIndex) {
      const tim = this.timy.find(t => t.kod === timKod)
      if (tim && tim.milniky[milnikIndex]) tim.milniky[milnikIndex].splneny = true
    },

    pridatClenaTim(timKod, clen) {
      const tim = this.timy.find(t => t.kod === timKod)
      if (tim) tim.clenovia.push(clen)
    },
  async fetchNovinky() {
  this.novinky = await apiGet('/novinky')
},
  },
})