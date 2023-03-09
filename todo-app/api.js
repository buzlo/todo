export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

export async function createTodoItem({ owner, name }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: "POST",
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return await response.json();
}

export function switchTodoItemDoneStatus({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: todoItem.done }),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export function deleteTodoItem({ $todoItem, todoItem }) {
  if (!confirm('Вы уверены?')) {
    return;
  }
  $todoItem.remove();
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  })
}
