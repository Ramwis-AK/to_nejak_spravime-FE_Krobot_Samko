<template>
  <div class="filter-bar">
    <template v-for="f in filters" :key="typeof f === 'object' ? f.key : f">
      <button
        class="filter-btn"
        :class="{ active: modelValue === (typeof f === 'object' ? f.key : f) }"
        @click="$emit('update:modelValue', typeof f === 'object' ? f.key : f)"
      >
        {{ typeof f === 'object' ? f.label : f }}
      </button>
    </template>
    <input
      v-if="searchable !== false"
      class="filter-search"
      type="text"
      :placeholder="placeholder || 'Hľadať...'"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'FilterBar',
  props: {
    modelValue: { type: [String], default: '' },
    search: { type: String, default: '' },
    filters: { type: Array, default: () => [] },
    placeholder: String,
    searchable: { type: Boolean, default: true },
  },
  emits: ['update:modelValue', 'update:search'],
}
</script>
