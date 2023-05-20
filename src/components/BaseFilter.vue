<script setup>
defineProps({
  filterKey: { type: String, required: true },
  inputValue: { type: String, required: true }
})
defineEmits(['update:filter-key', 'update:input-value'])
</script>

<template>
  <div class="filter input-group mb-3">
    <label class="form-control w-auto input-group-text" for="filter-select">Фильтрация</label>
    <select
      id="filter-select"
      :value="filterKey"
      class="filter__select form-control w-auto form-select"
      @change="$emit('update:filter-key', $event.target.value)"
    >
      <option value="title">По названию</option>
      <option value="tel">По номеру телефона</option>
      <option value="descr">По описанию</option>
    </select>
    <input
      class="filter__input form-control w-50"
      @input="$emit('update:input-value', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
