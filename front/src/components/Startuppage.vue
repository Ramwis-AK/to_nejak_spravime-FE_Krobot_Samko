<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>StartUp</h1>
        <p>Grantový inkubačný program — vlastný inovatívny nápad, financovanie a mentoring.</p>
      </div>

      <div class="table-wrap">
        <table class="list-table">
          <thead>
            <tr>
              <th>Názov</th>
              <th>Oblasť</th>
              <th>Fáza</th>
              <th>Lokalita</th>
              <th>Value proposition</th>
              <th>Veľkosť investície</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in startups" :key="s.id">
              <td class="td-name">{{ s.nazov }}</td>
              <td><span class="tag tag-area">{{ s.oblast }}</span></td>
              <td><span :class="['tag', 'tag-faza', s.faza.replace(' ', '-').toLowerCase()]">{{ s.faza }}</span></td>
              <td>{{ s.lokalita }}</td>
              <td class="td-vp">{{ s.vp }}</td>
              <td class="td-inv">{{ s.investicia }}</td>
              <td>
                <button class="btn-detail" @click="openDetail(s)">Detail →</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <footer class="footer">
      <span>© 2026 Nitriansky technologický inkubátor. Všetky práva vyhradené.</span>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'StartUpPage',
  emits: ['navigate'],
  inject: ['navigate'],
  data() {
    return {
      startups: [
        { id: 1, nazov: 'EcoFlow', oblast: 'Energy', faza: 'Seed', lokalita: 'DE', vp: 'Domáce batérie z recyklovaných plastov', investicia: '$200k ARR' },
        { id: 2, nazov: 'HealthAI', oblast: 'Health', faza: 'Series A', lokalita: 'USA', vp: 'Diagnostika rakoviny pomocou mobilu', investicia: '50k pacientov' },
        { id: 3, nazov: 'AgroSense', oblast: 'AgriTech', faza: 'Pre-seed', lokalita: 'SK', vp: 'IoT senzory pre inteligentné farmy', investicia: '€80k grant' },
        { id: 4, nazov: 'EduFlow', oblast: 'EdTech', faza: 'Seed', lokalita: 'CZ', vp: 'Personalizované učenie pomocou AI', investicia: '$150k ARR' },
      ]
    }
  },
  methods: {
    openDetail(s) { this.navigate('startup-detail', s) }
  }
}
</script>

<style scoped>
.list-page { max-width: 1100px; margin: 0 auto; padding: 3rem 2rem; min-height: calc(100vh - var(--navbar-h) - 60px); }

.list-header { margin-bottom: 2.5rem; }
.list-header h1 { font-size: 2rem; font-weight: normal; color: var(--navy); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.75rem; }
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

.tag { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 3px; font-size: 0.75rem; font-weight: bold; letter-spacing: 0.05em; }
.tag-area { background: #e8f0fe; color: #1e40af; }
.tag-faza { background: #f3f4f6; color: #374151; }
.tag-faza.seed { background: #ecfdf5; color: #065f46; }
.tag-faza.series-a { background: #eff6ff; color: #1e40af; }
.tag-faza.pre-seed { background: #fefce8; color: #854d0e; }

.btn-detail { background: var(--navy); color: var(--white); border: none; padding: 0.45rem 1rem; font-family: inherit; font-size: 0.8rem; cursor: pointer; border-radius: 3px; white-space: nowrap; transition: background 0.2s; }
.btn-detail:hover { background: var(--navy-light); }

.footer { background: var(--navy); color: #6b7e99; text-align: center; padding: 1.5rem; font-size: 0.8rem; letter-spacing: 0.05em; border-top: 1px solid #1e3050; }
</style>