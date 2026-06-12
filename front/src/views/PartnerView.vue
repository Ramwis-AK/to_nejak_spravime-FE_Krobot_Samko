<template>
  <div class="page-content">
    <PageHero label="Ekosystém" title="Partneri a mentori" sub="Sieť organizácií a odborníkov, ktorí tvorí základ ekosystému NTI." />

    <section class="part-section">
      <div class="part-inner">
        <SectionHeader label="Organizácie" title="Naši partneri" />
        <div class="partneri-grid">
          <div class="partner-card" v-for="p in store.partneri" :key="p.id">
            <div class="partner-typ">{{ p.typ }}</div>
            <h3>{{ p.nazov }}</h3>
            <p>{{ p.popis }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="part-section part-section-alt">
      <div class="part-inner">
        <SectionHeader label="Odborníci" title="Mentori NTI" />
        <div class="mentori-grid">
          <div class="mentor-card" v-for="m in store.mentori" :key="m.id">
            <div class="mentor-avatar">{{ m.meno.charAt(0) }}</div>
            <div>
              <strong>{{ m.meno }}</strong>
              <span class="mentor-oblast">{{ m.oblast }}</span>
              <p>{{ m.skusenosti }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaSection title="Chceš sa stať partnerom alebo mentorom?" sub="Kontaktuj NTI alebo sa zaregistruj priamo v systéme.">
      <RouterLink to="/registracia/firma" class="btn-primary">Registrácia firmy →</RouterLink>
      <RouterLink to="/registracia/mentor" class="btn-secondary">Stať sa mentorom</RouterLink>
    </CtaSection>

    <AppFooter />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import PageHero from '../components/PageHero.vue'
import SectionHeader from '../components/SectionHeader.vue'
export default {
  name: 'PartneriView',
  components: { AppFooter, PageHero, SectionHeader },
  setup() {
    const store = useNtiStore()
    // Načítaj partnerov aj mentorov pri otvorení stránky
    onMounted(() => {
      store.fetchPartneri()
      store.fetchMentori()
    })
    return { store }
  }
}
</script>
<style scoped>
.part-section { padding: 5rem 2.5rem; background: var(--white); }
.part-section-alt { background: var(--surface); }
.part-inner { max-width: 1100px; margin: 0 auto; }
.partneri-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 2rem; }
.partner-card { border: 1px solid var(--border); border-radius: 6px; padding: 1.75rem; background: var(--white); }
.partner-typ { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; font-weight: 500; }
.partner-card h3 { font-size: 1rem; color: var(--navy); margin-bottom: 0.5rem; font-weight: 500; }
.partner-card p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
.mentori-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 2rem; }
.mentor-card { display: flex; gap: 1rem; align-items: flex-start; padding: 1.5rem; border: 1px solid var(--border); border-radius: 6px; background: var(--white); }
.mentor-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--navy); color: var(--accent); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 1.1rem; flex-shrink: 0; }
.mentor-card strong { display: block; font-size: 0.9rem; color: var(--navy); }
.mentor-oblast { display: block; font-size: 0.75rem; letter-spacing: 0.08em; color: var(--accent); margin: 0.2rem 0 0.4rem; }
.mentor-card p { font-size: 0.82rem; color: var(--text-muted); }
@media (max-width: 600px) { .part-section { padding: 3rem 1.25rem; } }
</style>
