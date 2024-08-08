document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const searchInput = document.getElementById('search-input');
    const list = document.getElementById('todo-list');
    const tasks = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = input.value.trim();

        if (todoText !== '') {
            const task = {
                id: Date.now(),
                text: todoText,
                completed: false,
                updatedAt: new Date().toLocaleString()
            };
            tasks.push(task);
            renderTasks();
            input.value = '';
        }
    });

    searchInput.addEventListener('input', () => {
        renderTasks();
    });

    function renderTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        list.innerHTML = '';

        tasks
            .filter(task => task.text.toLowerCase().includes(searchTerm))
            .forEach(task => {
                const listItem = document.createElement('li');
                listItem.className = 'task-item';

                const taskHeader = document.createElement('div');
                taskHeader.className = 'task-header';
                taskHeader.innerHTML = `
                    <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
                    <span>${task.updatedAt}</span>
                `;

                const taskContent = document.createElement('div');
                taskContent.className = 'task-content';
                taskContent.innerHTML = `
                    <div class="task-actions">
                        <button onclick="editTask(${task.id})">Edit</button>
                        <button onclick="toggleCompletion(${task.id})">${task.completed ? 'Undo' : 'Done'}</button>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                `;

                taskHeader.addEventListener('click', () => {
                    taskContent.style.display = taskContent.style.display === 'none' ? 'block' : 'none';
                });

                listItem.appendChild(taskHeader);
                listItem.appendChild(taskContent);
                list.appendChild(listItem);
            });
    }

    window.editTask = function (id) {
        const newText = prompt('Edit task:', tasks.find(task => task.id === id).text);
        if (newText !== null) {
            const task = tasks.find(task => task.id === id);
            task.text = newText;
            task.updatedAt = new Date().toLocaleString();
            renderTasks();
        }
    };

    window.toggleCompletion = function (id) {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        task.updatedAt = new Date().toLocaleString();
        renderTasks();
    };

    window.deleteTask = function (id) {
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            renderTasks();
        }
    };
});
