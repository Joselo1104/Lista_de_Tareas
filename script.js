const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', loadTasks);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value.trim() !== '') {
    addTask(input.value.trim());
    input.value = '';
  }
});

function addTask(text, completed = false) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';
  if (completed) li.classList.add('completed');

  // Botón editar
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.onclick = () => editTask(span, li);

  // Botón eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  // Marcar como completada al hacer clic sobre el texto
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  saveTasks();
}

function editTask(span, li) {
  const currentText = span.textContent;
  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;
  input.className = 'edit-input';

  // Guardar cambio al presionar Enter o perder foco
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  });

  input.addEventListener('blur', saveEdit);

  function saveEdit() {
    if (input.value.trim() !== '') {
      span.textContent = input.value.trim();
      li.replaceChild(span, input);
      saveTasks();
    } else {
      li.remove();
      saveTasks();
    }
  }

  li.replaceChild(input, span);
  input.focus();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('.task-text')?.textContent || '';
    const completed = li.classList.contains('completed');
    if (text.trim() !== '') {
      tasks.push({ text, completed });
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    addTask(task.text, task.completed);
  });
}
