<template>
  <div class="section-header-wrap" :class="{ 'has-action': $slots.action }">
    <div>
      <p v-if="label" class="section-label">{{ label }}</p>
      <h2 class="section-title">{{ title }}</h2>
    </div>
    <slot name="action" />
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    label: String,
    title: { type: String, required: true },
  }
}
</script>

<style scoped>
.section-header-wrap { margin-bottom: 2rem; }
.has-action { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; }
</style>
