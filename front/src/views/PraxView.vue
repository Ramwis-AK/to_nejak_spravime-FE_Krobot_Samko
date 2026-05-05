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