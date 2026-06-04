<template>
  <div class="data-table-wrap">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td
            v-for="col in columns"
            :key="col.key"
            :class="col.class ? col.class(row) : ''"
          >
            <slot :name="`cell-${col.key}`" :value="row[col.key]" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
          <td class="table-action">
            <RouterLink :to="`${detailPath}/${row.id}`" class="btn-detail">Detail →</RouterLink>
          </td>
        </tr>
        <tr v-if="!rows.length">
          <td :colspan="columns.length + 1" style="text-align:center;color:var(--text-muted);padding:2.5rem;">
            Žiadne záznamy
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    detailPath: { type: String, required: true },
  }
}
</script>
