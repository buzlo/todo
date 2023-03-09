function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = true;

  input.addEventListener('input', function () {
    if (input.value) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  }
}

function $createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function $createTodoItem(todoItem, { onDone, onDelete }) {

  let $todoItem = document.createElement('li');

  let $buttonGroup = document.createElement('div'),
    $doneButton = document.createElement('button'),
    $deleteButton = document.createElement('button');

  const doneClass = 'list-group-item-success';

  $todoItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  $todoItem.textContent = todoItem.name;

  if (todoItem.done) {
    $todoItem.classList.add(doneClass);
  }

  $buttonGroup.classList.add('btn-group', 'btn-group-sm');
  $doneButton.classList.add('btn', 'btn-success');
  $doneButton.textContent = 'Готово';
  $deleteButton.classList.add('btn', 'btn-danger');
  $deleteButton.textContent = 'Удалить';

  $doneButton.addEventListener('click', function () {
    onDone({ todoItem });
    $todoItem.classList.toggle(doneClass, todoItem.done);
  });

  $deleteButton.addEventListener('click', function () {
    onDelete({ todoItem, $todoItem });
  });

  $buttonGroup.append($doneButton);
  $buttonGroup.append($deleteButton);
  $todoItem.append($buttonGroup);

  return $todoItem;
}

async function createTodoApp(container, {
  title,
  owner,
  todoItemList,
  onCreateFormSubmit,
  onDoneBtnCLick,
  onDeleteBtnClick
}) {
  const todoAppTitle = createAppTitle(title),
    todoItemForm = createTodoItemForm(),
    $todoList = $createTodoList(),
    handlers = { onDone: onDoneBtnCLick, onDelete: onDeleteBtnClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append($todoList);

  for (let todoItem of todoItemList) {
    let $todoItem = $createTodoItem(todoItem, handlers);
    $todoList.append($todoItem);
  }

  todoItemForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    const $todoItem = $createTodoItem(todoItem, handlers);

    $todoList.append($todoItem);

    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });
}

export { createTodoApp };


