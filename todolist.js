const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
};

const saveTasks = () => {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.querySelector('.task-text').innerText,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTaskToDOM = ({ text, completed }) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${completed ? 'completed' : ''}`;
    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div>
            <button class="btn btn-success btn-sm me-2 mark-btn">${completed ? 'Undo' : 'Complete'}</button>
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </div>
    `;
    li.querySelector('.mark-btn').addEventListener('click', () => {
        li.classList.toggle('completed');
        li.querySelector('.mark-btn').innerText = li.classList.contains('completed') ? 'Undo' : 'Complete';
        saveTasks();
    });
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    taskList.appendChild(li);
};

taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM({ text: taskText, completed: false });
        saveTasks();
        taskInput.value = '';
    }
});

loadTasks();
