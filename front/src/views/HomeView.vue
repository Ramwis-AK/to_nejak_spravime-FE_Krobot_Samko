<template>
  <div class="page-content">
    <section class="hero">
      <div class="hero-inner">
        <p class="hero-label">Nitriansky technologický inkubátor</p>
        <h1 class="hero-title">Nečakaj.<br>Registruj sa <span class="gold">teraz.</span></h1>
        <p class="hero-sub">Vstúp do programu, ktorý mení nápady na startupy a študentov na profesionálov.</p>
        <RouterLink to="/registracia" class="btn-primary">Zaregistrovať sa →</RouterLink>
      </div>
    </section>

    <section class="stats">
      <div class="stat">
        <span class="stat-num">{{ store.stats.students }}</span>
        <span class="stat-label">Študentov</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-num">{{ store.stats.firms }}</span>
        <span class="stat-label">Firiem</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-num">{{ store.stats.projects }}</span>
        <span class="stat-label">Projektov</span>
      </div>
    </section>

    <section class="about">
      <div class="about-inner">
        <div class="about-text">
          <h2>O nás</h2>
          <p>Nitriansky technologický inkubátor (NTI) vznikol ako odpoveď na odliv technologických talentov z regiónu. Prepájame inovatívnych študentov s reálnymi firmami, mentormi a grantovými príležitosťami.</p>
          <p>Naše dva programy — grantový inkubačný program (A) a program živej praxe (B) — pokrývajú celý životný cyklus od nápadu až po produkt alebo pracovnú skúsenosť.</p>
        </div>
        <div class="contact-box">
          <h3>Kontakt</h3>
          <div class="contact-row"><span class="contact-icon">✉</span> nti@ukf.sk</div>
          <div class="contact-row"><span class="contact-icon">✆</span> +421 37 000 0000</div>
          <div class="contact-row"><span class="contact-icon">⌖</span> Tr. A. Hlinku 1, 949 74 Nitra</div>
          <div class="contact-row"><span class="contact-icon">◷</span> Po–Pi 8:00 – 16:00</div>
        </div>
      </div>
    </section>

    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
export default {
  name: 'HomeView',
  setup() {
    return { store: useNtiStore() }
  }
}
</script>

<style scoped>
.hero {
  background: var(--navy);
  min-height: 70vh;
  display: flex;
  align-items: center;
}
.hero-inner { max-width: 800px; margin: 0 auto; padding: 6rem 3rem; }
.hero-label { font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; }
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; color: var(--white); margin-bottom: 1.5rem; font-weight: normal; }
.gold { color: var(--accent); }
.hero-sub { font-size: 1.1rem; color: #8da0bc; margin-bottom: 2.5rem; max-width: 500px; line-height: 1.6; }
.btn-primary {
  display: inline-block;
  background: var(--accent);
  color: var(--navy);
  border: none;
  padding: 0.9rem 2.2rem;
  font-size: 1rem;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--accent-dim); }

.stats { display: flex; align-items: center; justify-content: center; padding: 3rem 2rem; border-bottom: 1px solid var(--border); }
.stat { display: flex; flex-direction: column; align-items: center; padding: 0 4rem; }
.stat-num { font-size: 3rem; font-weight: bold; color: var(--navy); line-height: 1; }
.stat-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.4rem; letter-spacing: 0.08em; text-transform: uppercase; }
.stat-divider { width: 1px; height: 60px; background: var(--border); }

.about { padding: 5rem 3rem; background: var(--surface); }
.about-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 340px; gap: 4rem; align-items: start; }
.about-text h2 { font-size: 2rem; color: var(--navy); margin-bottom: 1.5rem; font-weight: normal; border-left: 3px solid var(--accent); padding-left: 1rem; }
.about-text p { font-size: 1rem; color: #4b5563; line-height: 1.8; margin-bottom: 1rem; }
.contact-box { background: var(--navy); color: var(--white); padding: 2rem; border-radius: 4px; }
.contact-box h3 { color: var(--accent); font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.5rem; font-weight: normal; }
.contact-row { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 1rem; font-size: 0.9rem; color: #c8d0e0; line-height: 1.4; }
.contact-icon { color: var(--accent); font-size: 0.85rem; min-width: 16px; margin-top: 1px; }
</style>