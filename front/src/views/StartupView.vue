<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>StartUp <span class="badge">Program A</span></h1>
        <p>Grantový inkubačný program — vlastný inovatívny nápad, financovanie a mentoring.</p>
      </div>
      <div class="table-wrap">
        <table class="list-table">
          <thead>
            <tr>
              <th>Názov</th><th>Oblasť</th><th>Fáza</th><th>Lokalita</th><th>Value proposition</th><th>Veľkosť investície</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in store.startups" :key="s.id">
              <td class="td-name">{{ s.nazov }}</td>
              <td><span class="tag tag-area">{{ s.oblast }}</span></td>
              <td><span :class="['tag', 'tag-faza', s.faza.replace(' ', '-').toLowerCase()]">{{ s.faza }}</span></td>
              <td>{{ s.lokalita }}</td>
              <td class="td-vp">{{ s.vp }}</td>
              <td class="td-inv">{{ s.investicia }}</td>
              <td><RouterLink :to="`/startup/${s.id}`" class="btn-detail">Detail →</RouterLink></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <footer class="footer">© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</footer>
  </div>
</template>

<script>
import { useNtiStore } from '../stores/nti.js'
export default {
  name: 'StartUpView',
  setup() { return { store: useNtiStore() } }
}
</script>

<style scoped>
.list-page { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.list-header { margin-bottom: 2.5rem; }
.list-header h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
.badge { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; background: var(--accent); color: var(--navy); padding: 0.25rem 0.6rem; border-radius: 3px; font-weight: bold; }
.list-header p { color: var(--text-muted); font-size: 0.95rem; }
.table-wrap { overflow-x: auto; }
.list-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.list-table thead tr { border-bottom: 2px solid var(--navy); }
.list-table th { text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); font-weight: normal; white-space: nowrap; }
.list-table td { padding: 1rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
.list-table tbody tr:hover { background: var(--surface); }
.td-name { font-weight: bold; color: var(--navy); }
.td-vp { color: #374151; max-width: 260px; }
.td-inv { font-family: monospace; font-size: 0.85rem; color: var(--navy); white-space: nowrap; }
.tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold; }
.tag-area { background: #e8f0fe; color: #1e40af; }
.tag-faza { background: #f3f4f6; color: #374151; }
.tag-faza.seed { background: #ecfdf5; color: #065f46; }
.tag-faza.series-a { background: #eff6ff; color: #1e40af; }
.tag-faza.pre-seed { background: #fefce8; color: #854d0e; }
.btn-detail { display: inline-block; background: var(--navy); color: var(--white); padding: 0.45rem 1rem; font-size: 0.8rem; border-radius: 3px; text-decoration: none; white-space: nowrap; transition: background 0.2s; }
.btn-detail:hover { background: var(--navy-light); }
</style>