const TASKS_KEY = 'tasks';

const mainDiv = document.getElementById('main');
const taskForm = mainDiv.querySelector('#task-form');
const newTaskInput = taskForm.task;
const cardActionDiv = mainDiv.querySelector(".card-action");
const taskFilterInput = cardActionDiv.querySelector('#task-filter');
const taskListUl = cardActionDiv.querySelector(".collection");
const clearTasksAnchor = cardActionDiv.querySelector(".clear-tasks");

let tasks = [];

const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem(TASKS_KEY));
    if (!tasks || !(tasks instanceof Array)) {
        tasks = [];
    }

    return tasks;
};

const removeTask = (taskLi, deleteTaskAnchor) => {
    deleteTaskAnchor.removeEventListener('click', deleteTask);
    taskListUl.removeChild(taskLi);
};

const saveTask = (name) => {
    tasks.push(name);
    console.log(name);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

const deleteTask = (event) => {
    const deleteTaskAnchor = event.target.parentElement;
    const taskLi = deleteTaskAnchor.parentElement;
    if (!confirm(`The task ${taskLi.textContent} will be removed. Are you sure you want to continue?`)) {
        return;
    }

    removeTask(taskLi, deleteTaskAnchor);
    tasks = tasks.filter(task => task !== taskLi.textContent)
    if (!tasks || tasks.length === 0) {
        localStorage.removeItem(TASKS_KEY);
    } else {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
    
    event.preventDefault();
};

const clearTasks = (event) => {
    if (!confirm('All tasks will be removed. Are you sure you want to continue?')) {
        return;
    }


    for (let taskLi = taskListUl.firstElementChild; taskLi; taskLi = taskListUl.firstElementChild) {
        removeTask(taskLi, taskLi.querySelector(".delete-item"));
    }
    tasks = [];
    localStorage.removeItem(TASKS_KEY);

    event.preventDefault();
}

const createTask = (name) => {
    const deleteTaskIcon = document.createElement('i');
    deleteTaskIcon.classList.add('fa', 'fa-remove');

    const deleteTaskAnchor = document.createElement('a');
    deleteTaskAnchor.classList.add('delete-item', 'secondary-content');
    deleteTaskAnchor.appendChild(deleteTaskIcon);
    deleteTaskAnchor.addEventListener('click', deleteTask);

    const newTaskLi = document.createElement('li');
    newTaskLi.classList.add('collection-item');
    newTaskLi.appendChild(document.createTextNode(name));
    newTaskLi.appendChild(deleteTaskAnchor);

    taskListUl.appendChild(newTaskLi);
};

const addTask = (event) => {
    const taskName = newTaskInput.value;

    const index = tasks.findIndex(task => task === taskName);
    if (index > -1) {
        alert('Task already exists!');
    } else {
        createTask(taskName);
        filterTasks(event);
        saveTask(taskName);
        
        newTaskInput.value = '';
    }
    
    event.preventDefault();
};

const filterTasks = (event) => {
    const filterText = taskFilterInput.value.toLocaleLowerCase();

    for (let taskLi = taskListUl.firstElementChild; taskLi; taskLi = taskLi.nextElementSibling) {
        const taskName = taskLi.textContent;
        
        let displayValue = 'none';
        if (taskName.toLocaleLowerCase().includes(filterText)) {
            displayValue = 'list-item';
        }

        taskLi.style.display = displayValue;
    }
};

function loadEventListeners() {
    taskForm.addEventListener('submit', addTask);
    clearTasksAnchor.addEventListener('click', clearTasks);
    taskFilterInput.addEventListener('input', filterTasks);
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadEventListeners();
    tasks = getTasks();
    tasks.forEach(task => createTask(task))
});