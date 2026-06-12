<template>
  <section class="cta-section">
    <div class="cta-inner">
      <h2>{{ title }}</h2>
      <p v-if="sub">{{ sub }}</p>
      <!-- slot pre tlačidlá, ktoré vkladá rodič -->
      <div class="cta-actions">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
  // jednoduché props s validáciou typu
  props: {
    title: { type: String, required: true },
    sub: { type: String, default: '' },
  },
}
</script>

<style scoped>
.cta-section { background: var(--navy); padding: 4rem 2.5rem; text-align: center; }
.cta-inner { max-width: 700px; margin: 0 auto; }
.cta-section h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: var(--white); font-weight: 400; margin-bottom: 0.75rem; }
.cta-section p { color: #c8d0e0; font-size: 0.95rem; margin-bottom: 2rem; }
.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
@media (max-width: 600px) { .cta-section { padding: 3rem 1.25rem; } }
</style>