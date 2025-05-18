const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Cargar tareas guardadas
document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
});

function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;

  // Botón eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  // Marcar como completada
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.childNodes[0].nodeValue,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text);
    const li = list.lastChild;
    if (task.completed) {
      li.classList.add('completed');
    }
  });
}
