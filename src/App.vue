<script setup>
import { reactive, unref, watch, computed } from 'vue'
import { vMaska } from 'maska'
import { useVuelidate } from '@vuelidate/core'

import BaseFilter from './components/BaseFilter.vue'
import TodoList from './components/TodoList.vue'
import { useGetNewId } from './composables/useGetNewId'
import { useCreateRules } from './composables/useCreateRules'

import fixedItems from './fixtures/fixedItems.json?source'

const todoList = reactive([])

const inputsState = reactive({
  title: '',
  tel: '',
  descr: ''
})

const rules = useCreateRules()

const v$ = useVuelidate(rules, inputsState)

getTodoList()

watch(todoList, updateStorage)

const filterData = reactive({ key: 'title', value: '' })
const filteredList = computed(() =>
  todoList.filter((item) => {
    const regExp = new RegExp(filterData.value, 'i')
    return regExp.test(item[filterData.key])
  })
)

function getTodoList() {
  const dataList = localStorage.getItem('todoList')
  Object.assign(todoList, JSON.parse(dataList) ?? fixedItems)
}

function updateStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoList))
}

async function createTodoItem() {
  const isFormCorrect = await unref(v$).$validate()
  unref(v$).$touch()
  if (!isFormCorrect) return

  const newItem = {
    title: inputsState.title,
    tel: inputsState.tel,
    descr: inputsState.descr,
    done: false,
    id: useGetNewId(todoList),
    date: new Date()
  }

  todoList.push(newItem)

  inputsState.title = ''
  inputsState.tel = ''
  inputsState.descr = ''
}

function findItemIndex(id) {
  return todoList.findIndex((item) => item.id === id)
}

function removeItem(id) {
  todoList.splice(findItemIndex(id), 1)
}

function updateItem(newItem) {
  const item = todoList[findItemIndex(newItem.id)]
  Object.assign(item, newItem)
}
</script>

<template>
  <h2 class="mt-5 mb-3">Список задач</h2>

  <form class="input-group mb-3">
    <input
      v-model="v$.title.$model"
      type="text"
      class="form-control"
      :class="{ 'is-invalid': v$.title.$error }"
      placeholder="Новая задача"
    />
    <input
      v-model="v$.tel.$model"
      v-maska
      data-maska="+7 ### ###-##-##"
      :class="{ 'is-invalid': v$.tel.$error }"
      type="tel"
      class="form-control"
      placeholder="Телефон"
    />
    <input v-model="inputsState.descr" type="text" class="form-control" placeholder="Описание" />
    <div class="input-group-append">
      <button class="btn btn-secondary" :disabled="false" @click.prevent="createTodoItem">
        Добавить
      </button>
    </div>
  </form>

  <BaseFilter
    v-model:filter-key="filterData.key"
    v-model:input-value="filterData.value"
  ></BaseFilter>

  <TodoList :todo-list="filteredList" @update-item="updateItem" @remove-item="removeItem">
  </TodoList>
</template>

<style scoped></style>
