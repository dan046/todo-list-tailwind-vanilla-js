const todoForm = document.getElementById("js-todo-form");
const todoContainer = document.getElementById("js-todo-container");
const todoField = document.getElementById("js-todo-field");
const todoDate = document.getElementById("js-date-field");

let todoList = [
  {
    task: "Make dinner",
    dueDate: "2023-09-22",
  },
  {
    task: "Wash dishes",
    dueDate: "2023-09-22",
  },
  {
    task: "Code, Program",
    dueDate: "2023-09-22",
  },
  {
    task: "Watch YouTube",
    dueDate: "2023-09-22",
  },
  {
    task: "Rest, sleep",
    dueDate: "2023-09-22",
  },
];

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = todoField.value;
  const dueDate = todoDate.value;

  todoList.push({
    task,
    dueDate,
  });
  renderTodoList();
  todoField.value = "";
  todoDate.value = "";
});

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((items, index) => {
    const { task, dueDate } = items;

    const html = `
      <tr class="text-sm sm:text-base">
        <td>${task}</td>
        <td>${dueDate}</td>
        <td class="text-center">
            <button class="bg-[#d03434] js-delete-btn rounded-md px-3 py-1 font-semibold hover:bg-[#8b2222] transition duration-300 ease-in-out" data-index="${index} id="js-delete-btn">
                Delete
            </button>
        </td>
      </tr>
      `;
    todoListHTML += html;
  });

  !todoList.length
    ? (todoContainer.innerHTML = `<td class="text-center">You currently have ${todoList.length} tasks.</td>`)
    : (todoContainer.innerHTML = todoListHTML);

  const deleteBtn = document.querySelectorAll(".js-delete-btn");
  deleteBtn.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteTodo(index);
    });
  });
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  renderTodoList();
}

renderTodoList();
