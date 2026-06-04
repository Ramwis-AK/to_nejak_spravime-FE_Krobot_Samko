<template>
  <div class="page-content">
    <PageHero
      label="Program A"
      title="Inkubované startupy"
      sub="Projekty tímov z Grantového inkubačného programu NTI — vlastný nápad, financovanie a mentoring."
    />
    <div class="list-page">
      <FilterBar
        v-model="activeFilter"
        v-model:search="search"
        :filters="fazaFilter"
        placeholder="Hľadať startup..."
      />
      <DataTable :columns="cols" :rows="filtered" detailPath="/startup">
        <template #cell-oblast="{ value }">
          <span class="tag tag-area">{{ value }}</span>
        </template>
        <template #cell-faza="{ row, value }">
          <span :class="['tag','tag-faza', row.faza.replace(' ','-').toLowerCase()]">{{ value }}</span>
        </template>
        <template #cell-vp="{ value }">
          <span class="td-vp">{{ value }}</span>
        </template>
        <template #cell-investicia="{ value }">
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
  name: 'StartUpView',
  components: { AppFooter, PageHero, FilterBar, DataTable },
  setup() {
    const store = useNtiStore()
    const search = ref('')
    const activeFilter = ref('Všetky')
    const fazaFilter = ['Všetky','Pre-seed','Seed','Series A']
    const cols = [
      { key: 'nazov', label: 'Názov', class: () => 'td-name' },
      { key: 'oblast', label: 'Oblasť' },
      { key: 'faza', label: 'Fáza' },
      { key: 'lokalita', label: 'Lokalita' },
      { key: 'vp', label: 'Value proposition' },
      { key: 'investicia', label: 'Investícia' },
    ]
    const filtered = computed(() => {
      let list = store.startups
      if (activeFilter.value !== 'Všetky') list = list.filter(s => s.faza === activeFilter.value)
      if (search.value) list = list.filter(s =>
        s.nazov.toLowerCase().includes(search.value.toLowerCase()) ||
        s.vp.toLowerCase().includes(search.value.toLowerCase())
      )
      return list
    })
    return { store, search, activeFilter, fazaFilter, cols, filtered }
  }
}
</script>
