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
    vyzvy: [
      { id: 1, nazov: 'Program A — Jarné kolo 2025', typ: 'Program A', stav: 'Uzavreté', deadline: '2025-03-31', popis: 'Grantový inkubačný program — jarná vlna prihlášok.' },
      { id: 2, nazov: 'Program B — Výzva Q2 2025', typ: 'Program B', stav: 'Uzavreté', deadline: '2025-04-15', popis: 'Živá prax — firemné zadania na Q2.' },
      { id: 3, nazov: 'Program A — Jesenné kolo 2025', typ: 'Program A', stav: 'Aktívne', deadline: '2025-10-15', popis: 'Grantový inkubačný program — jesenná vlna. Tímy min. 3 členov.' },
      { id: 4, nazov: 'Program B — Výzva Q4 2025', typ: 'Program B', stav: 'Aktívne', deadline: '2025-11-01', popis: 'Živá prax — nové firemné zadania na Q4.' },
      { id: 5, nazov: 'Program A — Jarné kolo 2026', typ: 'Program A', stav: 'Pripravované', deadline: '2026-03-31', popis: 'Nadchádzajúce jarné kolo — detaily budú zverejnené.' },
    ],
    novinky: [
      { id: 1, titul: 'NTI otvára jesenné kolo Programu A', datum: '2025-09-01', perex: 'Registrácia pre tímy s vlastným inovatívnym nápadom je otvorená do 15. októbra 2025.', kategoria: 'Oznámenie' },
      { id: 2, titul: 'EcoFlow získal €200k ARR — úspešný exit z inkubátora', datum: '2025-08-15', perex: 'Startup EcoFlow, ktorý prešiel Programom A, oznámil prvý veľký míľnik v oblasti udržateľnej energie.', kategoria: 'Úspešný príbeh' },
      { id: 3, titul: 'Nové firemné zadania v Programme B pre Q4', datum: '2025-07-20', perex: 'TechNitra, MedCenter SK a ďalšie spoločnosti zverejnili nové zadania pre študentské tímy.', kategoria: 'Program B' },
      { id: 4, titul: 'Workshopy k tvorbe Executive Summary — september 2025', datum: '2025-09-10', perex: 'Séria bezplatných workshopov pre tímy prihlasujúce sa do Programu A.', kategoria: 'Udalosť' },
    ],
  }),
  getters: {
    getStartupById: (state) => (id) => state.startups.find(s => s.id === Number(id)),
    getPraxById: (state) => (id) => state.praxe.find(p => p.id === Number(id)),
    getRoleByKey: (state) => (key) => state.roles.find(r => r.key === key),
    getVyzvaById: (state) => (id) => state.vyzvy.find(v => v.id === Number(id)),
    getNovinkaById: (state) => (id) => state.novinky.find(n => n.id === Number(id)),
    activeVyzvy: (state) => state.vyzvy.filter(v => v.stav === 'Aktívne'),
  },
})
