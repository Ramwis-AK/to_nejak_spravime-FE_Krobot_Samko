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