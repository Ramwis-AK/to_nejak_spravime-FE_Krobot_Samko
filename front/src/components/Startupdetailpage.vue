<template>
  <div class="page-content">
    <div class="detail-page">
      <button class="back-btn" @click="$emit('back')">← Späť na StartUp</button>
      <h1>{{ startup?.nazov }}</h1>
      <div class="detail-tags">
        <span class="tag tag-area">{{ startup?.oblast }}</span>
        <span class="tag">{{ startup?.faza }}</span>
        <span class="tag">{{ startup?.lokalita }}</span>
      </div>
      <div class="detail-card">
        <div class="detail-row"><span class="dl">Value proposition</span><span>{{ startup?.vp }}</span></div>
        <div class="detail-row"><span class="dl">Veľkosť investície</span><span>{{ startup?.investicia }}</span></div>
      </div>
      <p class="placeholder-note">Ďalší obsah bude doplnený po napojení na backend.</p>
    </div>
    <footer class="footer"><span>© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</span></footer>
  </div>
</template>
<script>
export default { name: 'StartUpDetailPage', props: ['startup'], emits: ['back'] }
</script>
<style scoped>
.detail-page { max-width: 700px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.back-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-family: inherit; font-size: 0.9rem; margin-bottom: 2rem; padding: 0; transition: color 0.2s; }
.back-btn:hover { color: var(--navy); }
h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 1rem; }
.detail-tags { display: flex; gap: 0.5rem; margin-bottom: 2rem; }
.tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold; background: #f3f4f6; color: #374151; }
.tag-area { background: #e8f0fe; color: #1e40af; }
.detail-card { border: 1px solid var(--border); border-radius: 4px; overflow: hidden; margin-bottom: 2rem; }
.detail-row { display: flex; gap: 2rem; padding: 1rem 1.25rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
.detail-row:last-child { border-bottom: none; }
.dl { color: var(--text-muted); min-width: 160px; font-size: 0.85rem; }
.placeholder-note { color: var(--text-muted); font-size: 0.85rem; font-style: italic; }
.footer { background: var(--navy); color: #6b7e99; text-align: center; padding: 1.5rem; font-size: 0.8rem; border-top: 1px solid #1e3050; }
</style>