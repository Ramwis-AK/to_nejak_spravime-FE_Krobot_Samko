<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>Prax <span class="badge">Program B</span></h1>
        <p>Program živej praxe — reálne zadania od firiem, odmena a skúsenosť tímu.</p>
      </div>
      <div class="table-wrap">
        <table class="list-table">
          <thead>
            <tr>
              <th>Firma</th><th>Sektor</th><th>Stav</th><th>Lokalita</th><th>Zadanie</th><th>Odmena tímu</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in store.praxe" :key="p.id">
              <td class="td-name">{{ p.firma }}</td>
              <td><span class="tag tag-area">{{ p.sektor }}</span></td>
              <td><span :class="['tag', 'tag-stav', p.stavKey]">{{ p.stav }}</span></td>
              <td>{{ p.lokalita }}</td>
              <td class="td-vp">{{ p.zadanie }}</td>
              <td class="td-inv">{{ p.odmena }}</td>
              <td><RouterLink :to="`/prax/${p.id}`" class="btn-detail">Detail →</RouterLink></td>
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
  name: 'PraxView',
  setup() { return { store: useNtiStore() } }
}
</script>

<style scoped>
.list-page { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }
.list-header { margin-bottom: 2.5rem; }
.list-header h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
.badge { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; background: var(--navy); color: var(--accent); border: 1px solid var(--accent); padding: 0.25rem 0.6rem; border-radius: 3px; font-weight: bold; }
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
.tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold; background: #f3f4f6; color: #374151; }
.tag-area { background: #e8f0fe; color: #1e40af; }
.tag-stav.open { background: #ecfdf5; color: #065f46; }
.tag-stav.pairing { background: #fefce8; color: #854d0e; }
.tag-stav.active { background: #eff6ff; color: #1e40af; }
.btn-detail { display: inline-block; background: var(--navy); color: var(--white); padding: 0.45rem 1rem; font-size: 0.8rem; border-radius: 3px; text-decoration: none; white-space: nowrap; transition: background 0.2s; }
.btn-detail:hover { background: var(--navy-light); }
</style>