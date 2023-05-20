<script setup>
import ListItem from './ListItem.vue'

defineProps({ todoList: { type: Array, required: true } })
defineEmits(['update-item', 'remove-item'])
</script>

<template>
  <ul class="todo-list list-group">
    <ListItem
      v-for="item of todoList"
      :key="item.id"
      :item="item"
      class="todo-list__item"
      @remove-item="$emit('remove-item', $event)"
      @update-item="$emit('update-item', $event)"
    ></ListItem>
  </ul>
</template>

<style scoped></style>
