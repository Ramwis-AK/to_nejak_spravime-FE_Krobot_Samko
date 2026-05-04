<template>
  <div class="page-content">
    <div class="form-page">
      <button class="back-btn" @click="$emit('back')">← Späť</button>
      <h1>{{ role?.name }}</h1>
      <p class="role-desc">{{ role?.desc }}</p>
      <div class="form-placeholder">
        <p>Registračný formulár bude implementovaný po napojení na Laravel backend.</p>
      </div>
    </div>
    <footer class="footer"><span>© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</span></footer>
  </div>
</template>
<script>
export default { name: 'RegistraciaFormPage', props: ['role'], emits: ['back'] }
</script>
<style scoped>
.form-page { max-width: 600px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.back-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-family: inherit; font-size: 0.9rem; margin-bottom: 2rem; padding: 0; }
.back-btn:hover { color: var(--navy); }
h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.5rem; }
.role-desc { color: var(--text-muted); margin-bottom: 2rem; }
.form-placeholder { border: 2px dashed var(--border); border-radius: 4px; padding: 3rem; text-align: center; color: var(--text-muted); font-size: 0.9rem; }
.footer { background: var(--navy); color: #6b7e99; text-align: center; padding: 1.5rem; font-size: 0.8rem; border-top: 1px solid #1e3050; }
</style>