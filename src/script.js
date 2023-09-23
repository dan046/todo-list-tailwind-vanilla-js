const todoForm = document.getElementById("js-todo-form");
const todoContainer = document.getElementById("js-todo-container");
const todoField = document.getElementById("js-todo-field");
const todoDate = document.getElementById("js-date-field");
const sortBtn = document.getElementById("js-sort-btn");

let todoList = JSON.parse(localStorage.getItem("todo-list")) || [];

function validateForm(task, dueDate) {
  const errorElement = document.getElementById("js-error");

  if (!task && !dueDate) {
    errorElement.innerHTML = "Both fields are empty.";
    return false;
  }

  if (!task) {
    errorElement.innerHTML = "Task field is empty.";
    return false;
  }

  if (!dueDate) {
    errorElement.innerHTML = "Date field is empty.";
    return false;
  }

  errorElement.innerHTML = "";
  return true;
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = todoField.value;
  const dueDate = todoDate.value;

  if (validateForm(task, dueDate)) {
    todoList.push({
      task,
      dueDate,
    });

    localStorage.setItem("todo-list", JSON.stringify(todoList));

    todoField.value = "";
    todoDate.value = "";
    renderTodoList();
  }
});

let ascendOrder = false;

sortBtn.addEventListener("click", sortTodoList);

function sortTodoList() {
  if (ascendOrder) {
    todoList.sort((a, b) => {
      let da = new Date(a.dueDate);
      let db = new Date(b.dueDate);
      return da - db;
    });
  } else {
    todoList.sort((a, b) => {
      let da = new Date(a.dueDate);
      let db = new Date(b.dueDate);
      return db - da;
    });
  }

  ascendOrder = !ascendOrder;

  localStorage.setItem("todo-list", JSON.stringify(todoList));
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((items, index) => {
    const { task, dueDate, checked } = items;

    const html = `
      <tr class="text-sm sm:text-base">

        <td class="text-center">
          <input class="cursor-pointer" type="checkbox" name="checkbox-${index}" id="checkbox-${index}" ${
            checked ? "checked" : ""
          } onchange="toggleTask(${index})"/>
        </td>

        <td id="task-${index}" ${
          checked ? 'style="text-decoration: line-through; color:#444847;"' : ""
        }>${task}</td>

        <td class="text-center" id="dueDate-${index}" ${
          checked ? 'style="text-decoration: line-through; color:#444847;"' : ""
        } >${dueDate}</td>

        <td class="text-center">

            <button
            class="bg-[#d03434] js-delete-btn rounded-md px-3 py-1 font-semibold hover:bg-[#8b2222] transition duration-300 ease-in-out"
            onclick="deleteTodo(${index})"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
            </button>

        </td>
      </tr>
      `;
    todoListHTML += html;
  });

  !todoList.length
    ? (todoContainer.innerHTML = `<td class="text-center">You currently have ${todoList.length} tasks.</td>`)
    : (todoContainer.innerHTML = todoListHTML);
}

function toggleTask(index) {
  const checkbox = document.getElementById(`checkbox-${index}`);
  const taskElement = document.getElementById(`task-${index}`);
  const dueDateElement = document.getElementById(`dueDate-${index}`);

  todoList[index].checked = checkbox.checked;
  localStorage.setItem("todo-list", JSON.stringify(todoList));

  if (checkbox.checked) {
    taskElement.style.textDecoration = "line-through";
    taskElement.style.color = "#444847";
    dueDateElement.style.textDecoration = "line-through";
    dueDateElement.style.color = "#444847";
  } else {
    taskElement.style.textDecoration = "none";
    taskElement.style.color = "#fff";
    dueDateElement.style.textDecoration = "none";
    dueDateElement.style.color = "#fff";
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem("todo-list", JSON.stringify(todoList));
  renderTodoList();
}

renderTodoList();

todoDate.min = getDate();
todoDate.max = getDate(14);

function getDate(days) {
  let date;

  if (days !== undefined) {
    date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  } else {
    date = new Date();
  }

  const offset = date.getTimezoneOffset();

  date = new Date(date.getTime() - offset * 60 * 1000);

  return date.toISOString().split("T")[0];
}
