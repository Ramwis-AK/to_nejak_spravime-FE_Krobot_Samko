<template>
  <div class="page-content">

    <section class="home-hero">
      <div class="home-hero-bg"></div>
      <div class="home-hero-inner">
        <p class="section-label">Nitriansky technologický inkubátor</p>
        <h1 class="home-hero-title">Nečakaj.<br>Registruj sa <span class="gold">teraz.</span></h1>
        <p class="home-hero-sub">Vstúp do programu, ktorý mení nápady na startupy a študentov na profesionálov. Dva programy, jeden ekosystém.</p>
        <div class="home-hero-cta">
          <RouterLink v-if="!userStore.isLoggedIn" to="/registracia" class="btn-primary">Zaregistrovať sa →</RouterLink>
          <RouterLink to="/o-nti" class="btn-secondary">Zistiť viac</RouterLink>
        </div>
      </div>
      <div class="home-hero-cards">
        <RouterLink to="/startup" class="hero-card">
          <span class="hero-card-tag">Program A</span>
          <h3>Grantový inkubačný program</h3>
          <p>Vlastný nápad → startup alebo produkt. Financovanie + mentoring.</p>
          <span class="hero-card-arrow">→</span>
        </RouterLink>
        <RouterLink to="/prax" class="hero-card">
          <span class="hero-card-tag">Program B</span>
          <h3>Program živej praxe</h3>
          <p>Reálne zadania od firiem. Odmena, skúsenosť, Product Owner.</p>
          <span class="hero-card-arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <section class="home-about">
      <div class="home-about-inner">
        <div class="home-about-text">
          <p class="section-label">Kto sme</p>
          <h2 class="section-title">Nitriansky technologický inkubátor</h2>
          <p>NTI vznikol ako odpoveď na odliv technologických talentov z regiónu. Prepájame inovatívnych študentov s reálnymi firmami, mentormi a grantovými príležititosťami.</p>
          <p>Naše dva programy pokrývajú celý životný cyklus — od nápadu až po produkt alebo pracovnú skúsenosť.</p>
          <RouterLink to="/o-nti" class="btn-outline" style="margin-top:1.5rem;display:inline-block;">Viac o NTI →</RouterLink>
        </div>
        <div class="home-piliere">
          <div class="pilier" v-for="p in piliere" :key="p.id">
            <div class="pilier-icon">⬡</div>
            <div><strong>{{ p.nazov }}</strong><p>{{ p.popis }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="home-section home-section-light">
      <div class="home-section-inner">
        <SectionHeader label="Aktuality" title="Posledné novinky">
          <template #action><RouterLink to="/novinky" class="btn-outline">Všetky novinky →</RouterLink></template>
        </SectionHeader>
        <div class="novinky-grid">
          <RouterLink v-for="n in store.novinky.slice(0,3)" :key="n.id" :to="`/novinky/${n.id}`" class="novinka-card">
            <span class="tag" style="margin-bottom:0.75rem;">{{ n.kategoria }}</span>
            <h3>{{ n.titul }}</h3>
            <p>{{ n.perex }}</p>
            <span class="novinka-datum">{{ n.datum }}</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
// Import oboch storov z priečinka stores
import { useUserStore } from '../stores/user.js'
import { useNtiStore } from '../stores/nti.js'

// Import komponentov
import AppFooter from '../components/AppFooter.vue'
import SectionHeader from '../components/SectionHeader.vue'

export default {
  name: 'HomeView',
  components: { AppFooter, SectionHeader },
  setup() {
    // Inicializácia storov
    const store = useNtiStore()
    const userStore = useUserStore()

    // Statické dáta pre piliere
    const piliere = [
      { id: 1, nazov: 'Inkubácia', popis: 'Vznik a akcelerácia projektov s mentorskou podporou.' },
      { id: 2, nazov: 'Partnerstvá', popis: 'Prepojenie s regionálnymi a medzinárodnými firmami.' },
      { id: 3, nazov: 'Mentoring', popis: 'Sprevádzanie tímov od nápadu po výsledok.' },
      { id: 4, nazov: 'Retencia', popis: 'Budovanie komunity a dlhodobej väzby na región.' },
    ]

    // Odovzdanie všetkého do šablóny
    return { 
      store, 
      piliere, 
      userStore 
    }
  }
}
</script>
<style scoped>
.gold { color: var(--accent); }
.home-hero { background: var(--navy); min-height: 80vh; display: flex; flex-direction: column; justify-content: center; padding: 5rem 2.5rem 4rem; position: relative; overflow: hidden; }
.home-hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 70% 50%, rgba(232,184,75,0.06) 0%, transparent 60%); pointer-events: none; }
.home-hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; }
.home-hero-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); line-height: 1.05; color: var(--white); margin-bottom: 1.5rem; font-weight: 700; }
.home-hero-sub { font-size: 1.05rem; color: #8da0bc; margin-bottom: 2.5rem; max-width: 560px; line-height: 1.7; }
.home-hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 3.5rem; }
.home-hero-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-width: 1100px; margin: 0 auto; width: 100%; }
.hero-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(232,184,75,0.2); border-radius: 6px; padding: 1.5rem; text-decoration: none; transition: all 0.25s; display: flex; flex-direction: column; gap: 0.5rem; }
.hero-card:hover { background: rgba(255,255,255,0.08); border-color: rgba(232,184,75,0.5); }
.hero-card-tag { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); font-weight: 500; }
.hero-card h3 { font-size: 1rem; color: var(--white); font-weight: 500; }
.hero-card p { font-size: 0.85rem; color: #7090b0; line-height: 1.5; flex: 1; }
.hero-card-arrow { color: var(--accent); font-size: 1.1rem; align-self: flex-end; }
.home-section { padding: 5rem 2.5rem; }
.home-section-light { background: var(--surface); }
.home-section-inner { max-width: 1100px; margin: 0 auto; }
.vyzvy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
.vyzva-card { border: 1px solid var(--border); border-radius: 6px; padding: 1.5rem; text-decoration: none; color: var(--text); transition: all 0.2s; display: flex; flex-direction: column; gap: 0.6rem; background: var(--white); }
.vyzva-card:hover { border-color: var(--navy); box-shadow: 0 4px 16px rgba(10,22,40,0.08); }
.vyzva-card h3 { font-size: 0.95rem; font-weight: 500; color: var(--navy); }
.vyzva-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
.vyzva-deadline { font-size: 0.78rem; color: var(--text-muted); border-top: 1px solid var(--border); padding-top: 0.75rem; }
.home-about { padding: 5rem 2.5rem; background: var(--white); }
.home-about-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: start; }
.home-about-text p { font-size: 0.95rem; color: #4b5563; line-height: 1.8; margin-bottom: 0.75rem; }
.home-piliere { display: flex; flex-direction: column; gap: 1.25rem; }
.pilier { display: flex; gap: 1rem; align-items: flex-start; }
.pilier-icon { color: var(--accent); font-size: 1.2rem; margin-top: 2px; flex-shrink: 0; }
.pilier strong { display: block; font-size: 0.9rem; color: var(--navy); margin-bottom: 0.2rem; }
.pilier p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin: 0; }
.novinky-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
.novinka-card { border: 1px solid var(--border); border-radius: 6px; padding: 1.5rem; text-decoration: none; color: var(--text); display: flex; flex-direction: column; gap: 0.5rem; background: var(--white); transition: all 0.2s; }
.novinka-card:hover { border-color: var(--navy); box-shadow: 0 4px 16px rgba(10,22,40,0.08); }
.novinka-card h3 { font-size: 0.95rem; font-weight: 500; color: var(--navy); line-height: 1.4; }
.novinka-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; flex: 1; }
.novinka-datum { font-size: 0.78rem; color: var(--text-muted); }
@media (max-width: 900px) { .home-hero-cards { grid-template-columns: 1fr; } .home-about-inner { grid-template-columns: 1fr; gap: 2.5rem; } .novinky-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .home-hero { padding: 3rem 1.25rem; } .novinky-grid { grid-template-columns: 1fr; } .home-section, .home-about { padding: 3rem 1.25rem; } }
</style>
