<template>
  <div class="page-content">
    <div class="list-page">
      <div class="list-header">
        <h1>Prax</h1>
        <p>Program živej praxe — reálne zadania od firiem, odmena a skúsenosť tímu.</p>
      </div>

      <div class="table-wrap">
        <table class="list-table">
          <thead>
            <tr>
              <th>Firma</th>
              <th>Sektor</th>
              <th>Stav</th>
              <th>Lokalita</th>
              <th>Zadanie</th>
              <th>Odmena tímu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in praxe" :key="p.id">
              <td class="td-name">{{ p.firma }}</td>
              <td><span class="tag tag-area">{{ p.sektor }}</span></td>
              <td><span :class="['tag', 'tag-stav', p.stavKey]">{{ p.stav }}</span></td>
              <td>{{ p.lokalita }}</td>
              <td class="td-vp">{{ p.zadanie }}</td>
              <td class="td-inv">{{ p.odmena }}</td>
              <td>
                <button class="btn-detail" @click="openDetail(p)">Detail →</button>
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
  name: 'PraxPage',
  emits: ['navigate'],
  inject: ['navigate'],
  data() {
    return {
      praxe: [
        { id: 1, firma: 'TechNitra s.r.o.', sektor: 'IT / SaaS', stav: 'Otvorené', stavKey: 'open', lokalita: 'Nitra', zadanie: 'Webová aplikácia pre správu skladu', odmena: '€2 400 / tím' },
        { id: 2, firma: 'Agrobanka a.s.', sektor: 'FinTech', stav: 'Párovanie', stavKey: 'pairing', lokalita: 'Bratislava', zadanie: 'Mobilná aplikácia pre poľnohospodárske úvery', odmena: '€3 000 / tím' },
        { id: 3, firma: 'GreenLogistics', sektor: 'Logistika', stav: 'V realizácii', stavKey: 'active', lokalita: 'Nitra', zadanie: 'Route optimization dashboard pre vodičov', odmena: '€2 800 / tím' },
        { id: 4, firma: 'MedCenter SK', sektor: 'HealthTech', stav: 'Otvorené', stavKey: 'open', lokalita: 'Nitra', zadanie: 'Systém spracovania lekárskych dát', odmena: '€3 500 / tím' },
      ]
    }
  },
  methods: {
    openDetail(p) { this.navigate('prax-detail', p) }
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
.tag-stav { background: #f3f4f6; color: #374151; }
.tag-stav.open { background: #ecfdf5; color: #065f46; }
.tag-stav.pairing { background: #fefce8; color: #854d0e; }
.tag-stav.active { background: #eff6ff; color: #1e40af; }

.btn-detail { background: var(--navy); color: var(--white); border: none; padding: 0.45rem 1rem; font-family: inherit; font-size: 0.8rem; cursor: pointer; border-radius: 3px; white-space: nowrap; transition: background 0.2s; }
.btn-detail:hover { background: var(--navy-light); }

.footer { background: var(--navy); color: #6b7e99; text-align: center; padding: 1.5rem; font-size: 0.8rem; letter-spacing: 0.05em; border-top: 1px solid #1e3050; }
</style>