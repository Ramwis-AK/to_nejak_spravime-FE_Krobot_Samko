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