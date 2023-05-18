<script setup>
import { ref } from "vue";

createSwitchStorageBtn(isLocalStorage);
const owner = "me",
  todoItemList = await getTodoList(owner);
createTodoApp(document.getElementById("todo-app"), {
  title: "Мои дела",
  owner,
  todoItemList,
  onCreateFormSubmit: createTodoItem,
  onDoneBtnCLick: switchTodoItemDoneStatus,
  onDeleteBtnClick: deleteTodoItem,
});
</script>

<template></template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
