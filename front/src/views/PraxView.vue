<template>
  <div class="page-content">
    <PageHero
      label="Program B"
      title="Živá prax"
      sub="Reálne zadania od firiem — odmena pre tím, Product Owner a mentor NTI."
    />
    <div class="list-page">
      <FilterBar
        v-model="activeFilter"
        v-model:search="search"
        :filters="stavFilter"
        placeholder="Hľadať zadanie alebo firmu..."
      />
      <DataTable :columns="cols" :rows="filtered" detailPath="/prax">
        <template #cell-sektor="{ value }">
          <span class="tag tag-area">{{ value }}</span>
        </template>
        <template #cell-stav="{ row, value }">
          <span :class="['tag','tag-stav', row.stavKey]">{{ value }}</span>
        </template>
        <template #cell-zadanie="{ value }">
          <span class="td-vp">{{ value }}</span>
        </template>
        <template #cell-odmena="{ value }">
          <span class="td-inv">{{ value }}</span>
        </template>
      </DataTable>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useNtiStore } from '../stores/nti.js'
import AppFooter from '../components/AppFooter.vue'
import PageHero from '../components/PageHero.vue'
import FilterBar from '../components/FilterBar.vue'
import DataTable from '../components/DataTable.vue'
export default {
  name: 'PraxView',
  components: { AppFooter, PageHero, FilterBar, DataTable },
  setup() {
    const store = useNtiStore()
    const search = ref('')
    const activeFilter = ref('all')
    const stavFilter = [
      { key: 'all', label: 'Všetky' },
      { key: 'open', label: 'Otvorené' },
      { key: 'pairing', label: 'Párovanie' },
      { key: 'active', label: 'V realizácii' },
    ]
    const cols = [
      { key: 'firma', label: 'Firma', class: () => 'td-name' },
      { key: 'sektor', label: 'Sektor' },
      { key: 'stav', label: 'Stav' },
      { key: 'lokalita', label: 'Lokalita' },
      { key: 'zadanie', label: 'Zadanie' },
      { key: 'odmena', label: 'Odmena tímu' },
    ]
    const filtered = computed(() => {
      let list = store.praxe
      if (activeFilter.value !== 'all') list = list.filter(p => p.stavKey === activeFilter.value)
      if (search.value) list = list.filter(p =>
        p.firma.toLowerCase().includes(search.value.toLowerCase()) ||
        p.zadanie.toLowerCase().includes(search.value.toLowerCase())
      )
      return list
    })
    return { store, search, activeFilter, stavFilter, cols, filtered }
  }
}
</script>