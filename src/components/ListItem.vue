<script setup>
import { ref, reactive, unref } from 'vue'
import { useFormatDate } from '../composables/useFormatDate'
import { vMaska } from 'maska'
import { useVuelidate } from '@vuelidate/core'
import { useCreateRules } from '../composables/useCreateRules'

const props = defineProps({ item: { type: Object, required: true } })
const emit = defineEmits(['update-item', 'remove-item'])

const clonedItem = reactive(JSON.parse(JSON.stringify(props.item)))
const rules = useCreateRules()

const v$ = useVuelidate(rules, clonedItem)

const inputKeys = ['title', 'tel', 'descr']
const isEdited = ref(false)

async function onEditedSwitch(item) {
  isEdited.value = !isEdited.value
  if (!isEdited.value) {
    const isFormCorrect = await unref(v$).$validate()
    if (!isFormCorrect) return
    emit('update-item', item)
  }
}

function onDoneSwitch(item) {
  item.done = !item.done
  emit('update-item', item)
}
</script>

<template>
  <li
    :class="{ 'list-group-item-success': item.done }"
    class="list-group-item d-flex flex-wrap justify-content-end align-items-center"
  >
    <form class="input-group align-items-center flex-grow-1 mb-3">
      <input
        v-for="key of inputKeys"
        :key="key"
        v-model="clonedItem[key]"
        v-maska
        :data-maska="key !== 'tel' ? null : '+7 ### ###-##-##'"
        :style="key === 'tel' ? { flexBasis: '155px', flexGrow: 0 } : null"
        :class="{ 'list-group-item-success': item.done }"
        class="form-control"
        :disabled="!isEdited"
        @blur="v$[key]?.$touch"
      />
      {{ useFormatDate(item.date) }}
    </form>
    <div class="btn-group btn-group-sm">
      <button
        class="btn btn-success"
        :disabled="isEdited"
        @click.prevent="onDoneSwitch(clonedItem)"
      >
        Готово
      </button>
      <button class="btn btn-secondary" @click.prevent="onEditedSwitch(clonedItem)">
        {{ !isEdited ? 'Редактировать' : 'Сохранить' }}
      </button>
      <button
        class="btn btn-danger"
        :disabled="isEdited"
        @click.prevent="$emit('remove-item', item.id)"
      >
        Удалить
      </button>
    </div>
  </li>
</template>

<style lang="scss" scoped></style>
