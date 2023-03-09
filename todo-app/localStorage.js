export function getTodoList(owner) {
  const dataList = localStorage.getItem(owner);
  return JSON.parse(dataList) ?? [];
}

function getNewId(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id;
  }
  return max + 1;
}

export function createTodoItem({ owner, name }) {
  const todoList = getTodoList(owner),
    newItem = {
      owner,
      id: getNewId(todoList),
      name,
      done: false
    }

  todoList.push(newItem);
  localStorage.setItem(owner, JSON.stringify(todoList));
  return newItem;
}

export function switchTodoItemDoneStatus({ todoItem }) {
  const owner = todoItem.owner,
    todoList = getTodoList(owner);

  todoItem.done = !todoItem.done;

  for (const item of todoList) {
    if (item.id == todoItem.id) {
      item.done = !item.done;
    }
  }

  localStorage.setItem(owner, JSON.stringify(todoList));
}

export function deleteTodoItem({ $todoItem, todoItem }) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  $todoItem.remove();

  const owner = todoItem.owner,
    todoList = getTodoList(owner);

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == todoItem.id) {
      todoList.splice(i, 1);
    }
  }

  localStorage.setItem(owner, JSON.stringify(todoList));
}
