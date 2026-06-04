<template>
  <div class="page-content">
    <PageHero label="O nás" title="Nitriansky technologický inkubátor" sub="Vznikli sme ako odpoveď na odliv technologických talentov z regiónu. Prepájame inovatívnych študentov s reálnymi firmami, mentormi a príležitosťami." />

    <section class="onti-mission">
      <div class="onti-inner">
        <div class="onti-text">
          <SectionHeader label="Misia" title="Prečo NTI existuje" />
          <p>NTI vznikol s jasným cieľom — zastaviť odliv talentov a vytvoriť v Nitrianskom regióne systematickú podporu pre inovatívne projekty a profesionálne IT tímy.</p>
          <p>Realizujeme dva hlavné programy: <strong>Program A</strong> (grantový inkubačný program pre vlastné nápady) a <strong>Program B</strong> (program živej praxe s reálnymi firmami).</p>
          <p>Strategickým cieľom je vytvárať nové projekty, startupy a profesionálne IT tímy s medzinárodným potenciálom.</p>
        </div>
        <div class="onti-contact-box">
          <h3>Kontakt</h3>
          <div class="contact-row"><span class="ci">✉</span> nti@ukf.sk</div>
          <div class="contact-row"><span class="ci">✆</span> +421 37 000 0000</div>
          <div class="contact-row"><span class="ci">⌖</span> Tr. A. Hlinku 1, 949 74 Nitra</div>
          <div class="contact-row"><span class="ci">◷</span> Po–Pi 8:00 – 16:00</div>
          <div style="margin-top:1.5rem;">
            <RouterLink to="/kontakt" class="btn-secondary" style="width:100%;text-align:center;display:block;">Kontaktný formulár</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="onti-piliere">
      <div class="onti-inner">
        <SectionHeader label="Strategické piliere" title="Na čom stojíme" />
        <div class="piliere-grid">
          <div class="pilier-card" v-for="p in piliere" :key="p.id">
            <div class="pilier-num">0{{ p.id }}</div>
            <h3>{{ p.nazov }}</h3>
            <p>{{ p.popis }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="onti-programy">
      <div class="onti-inner">
        <SectionHeader label="Programy" title="Dva programy, jeden ekosystém" />
        <div class="programy-compare">
          <div class="program-box program-a">
            <div class="program-box-header">
              <span class="tag tag-area">Program A</span>
              <h3>Grantový inkubačný program</h3>
            </div>
            <ul>
              <li>Vlastný inovatívny nápad</li>
              <li>Financovanie + mentoring</li>
              <li>Cieľ: startup alebo produkt</li>
              <li>Tím min. 3 členov</li>
              <li>Kvartálne hodnotenie</li>
            </ul>
            <RouterLink to="/program-a" class="btn-primary">Viac o Programme A →</RouterLink>
          </div>
          <div class="program-box program-b">
            <div class="program-box-header">
              <span class="tag tag-faza seed">Program B</span>
              <h3>Program živej praxe</h3>
            </div>
            <ul>
              <li>Reálne zadania od firiem</li>
              <li>Odmena pre celý tím</li>
              <li>Product Owner od firmy</li>
              <li>Mentor od NTI</li>
              <li>Ad hoc výberové konanie</li>
            </ul>
            <RouterLink to="/program-b" class="btn-outline">Viac o Programme B →</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<script>
import AppFooter from '../components/AppFooter.vue'
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
export default {
  name: 'ONtiView',
  components: { AppFooter, PageHero, SectionHeader },
  setup() {
    const piliere = [
      { id: 1, nazov: 'Inkubácia', popis: 'Systematická podpora vzniku a akcelerácie projektov. Evidencia tímov, prihlášok, míľnikov a výstupov.' },
      { id: 2, nazov: 'Partnerstvá', popis: 'Aktívna spolupráca s regionálnymi a medzinárodnými firmami vrátane registrácie, kontaktov a zadávaní.' },
      { id: 3, nazov: 'Mentoring', popis: 'Priraďovanie mentorov, plánovanie konzultácií, záznam spätnej väzby a sledovanie progresu tímov.' },
      { id: 4, nazov: 'Retencia', popis: 'Budovanie komunity, profilov absolventov, úspešných príbehov a dlhodobej väzby na región.' },
    ]
    return { piliere }
  }
}
</script>

<style scoped>
.onti-inner { max-width: 1100px; margin: 0 auto; }
.onti-mission { padding: 5rem 2.5rem; background: var(--white); }
.onti-mission .onti-inner { display: grid; grid-template-columns: 1fr 340px; gap: 4rem; align-items: start; }
.onti-text p { font-size: 0.95rem; color: #4b5563; line-height: 1.8; margin-bottom: 0.75rem; }
.onti-contact-box { background: var(--navy); color: var(--white); padding: 2rem; border-radius: 6px; }
.onti-contact-box h3 { color: var(--accent); font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; font-weight: 500; }
.contact-row { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.9rem; font-size: 0.88rem; color: #c8d0e0; line-height: 1.4; }
.ci { color: var(--accent); min-width: 16px; }
.onti-piliere { padding: 5rem 2.5rem; background: var(--surface); }
.piliere-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2rem; }
.pilier-card { background: var(--white); border: 1px solid var(--border); border-radius: 6px; padding: 1.75rem; }
.pilier-num { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--accent); opacity: 0.5; margin-bottom: 0.75rem; }
.pilier-card h3 { font-size: 1rem; color: var(--navy); margin-bottom: 0.5rem; font-weight: 500; }
.pilier-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
.onti-programy { padding: 5rem 2.5rem; background: var(--white); }
.programy-compare { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
.program-box { border: 1px solid var(--border); border-radius: 6px; padding: 2rem; display: flex; flex-direction: column; gap: 1.25rem; }
.program-a { border-color: var(--navy); }
.program-box-header h3 { font-size: 1.1rem; color: var(--navy); margin-top: 0.5rem; font-weight: 500; }
.program-box ul { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
.program-box ul li { font-size: 0.88rem; color: #374151; display: flex; align-items: center; gap: 0.5rem; }
.program-box ul li::before { content: '—'; color: var(--accent); flex-shrink: 0; }
@media (max-width: 900px) { .onti-mission .onti-inner { grid-template-columns: 1fr; } .piliere-grid { grid-template-columns: 1fr 1fr; } .programy-compare { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .onti-mission, .onti-piliere, .onti-programy { padding: 3rem 1.25rem; } .piliere-grid { grid-template-columns: 1fr; } }
</style>