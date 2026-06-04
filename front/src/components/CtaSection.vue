<template>
  <section class="cta-section">
    <div class="cta-inner">
      <h2>{{ title }}</h2>
      <p v-if="sub">{{ sub }}</p>
      <div class="cta-actions">
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
  props: {
    title: { type: String, required: true },
    sub: String,
  }
}
</script>

<style scoped>
.cta-section { background: var(--navy); padding: 5rem 2.5rem; text-align: center; }
.cta-inner { max-width: 600px; margin: 0 auto; }
.cta-section h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.6rem, 3vw, 2.2rem); color: var(--white); font-weight: 400; margin-bottom: 0.75rem; }
.cta-section p { color: #8da0bc; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6; }
.cta-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
@media (max-width: 600px) { .cta-section { padding: 3rem 1.25rem; } }
</style>
