const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

const API_URL = "/todos";

// Helper to format YYYY-MM-DD to MM/DD/YYYY
const formatDate = (iso) => {
  const [year, month, day] = iso.split("-");
  return `${month}/${day}/${year}`;
};

async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${todo.title}</strong> - ${todo.description} - Due: ${formatDate(todo.dueDate)}
      <input type="checkbox" ${todo.completed ? "checked" : ""} onchange="toggleComplete(${todo.id}, this.checked)">
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    todoList.appendChild(li);
  });
}

// Add To-Do
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value; // YYYY-MM-DD from input

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate })
  });

  todoForm.reset();
  fetchTodos();
});

// Delete To-Do
async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}

// Toggle Completion
async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  });
  fetchTodos();
}

// Initial fetch
fetchTodos();
