<template>
  <div class="detail-card">
    <div class="detail-card-row" v-for="row in rows" :key="row.key">
      <div class="detail-card-label">{{ row.label }}</div>
      <div class="detail-card-value">{{ row.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCard',
  props: {
    rows: { type: Array, required: true },
  }
}
</script>
