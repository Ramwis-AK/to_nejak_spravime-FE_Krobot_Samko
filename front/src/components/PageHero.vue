<template>
  <section class="page-hero">
    <div class="page-hero-inner">
      <p class="section-label">{{ label }}</p>
      <h1 class="page-hero-title">{{ title }}</h1>
      <p v-if="sub" class="page-hero-sub">{{ sub }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHero',
  props: {
    label: String,
    title: { type: String, required: true },
    sub: String,
  }
}
</script>

<style scoped>
.page-hero {
  background: var(--navy);
  padding: 4rem 2.5rem;
  position: relative;
  overflow: hidden;
}
.page-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 50%, rgba(232,184,75,0.05) 0%, transparent 60%);
  pointer-events: none;
}
.page-hero-inner { max-width: 1100px; margin: 0 auto; }
.page-hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  color: var(--white);
  line-height: 1.1;
  margin-bottom: 0.75rem;
}
.page-hero-sub { font-size: 1rem; color: #8da0bc; max-width: 600px; line-height: 1.7; }
@media (max-width: 600px) { .page-hero { padding: 3rem 1.25rem; } }
</style>
