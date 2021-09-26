const mainDiv = document.getElementById('main');
const taskForm = mainDiv.querySelector('#task-form');
const newTaskInput = taskForm.task;
const cardActionDiv = mainDiv.querySelector(".card-action");
const taskFilterInput = cardActionDiv.querySelector('#task-filter');
const taskListUl = cardActionDiv.querySelector(".collection");
const clearTasksAnchor = cardActionDiv.querySelector(".clear-tasks");

const removeTask = (taskLi, deleteTaskAnchor) => {
    deleteTaskAnchor.removeEventListener('click', deleteTask);
    taskListUl.removeChild(taskLi);
};

const deleteTask = (event) => {
    const deleteTaskAnchor = event.target.parentElement;
    const taskLi = deleteTaskAnchor.parentElement;
    if (!confirm(`The task ${taskLi.textContent} will be removed. Are you sure you want to continue?`)) {
        return;
    }

    removeTask(taskLi, deleteTaskAnchor);
    
    event.preventDefault();
};

const clearTasks = (event) => {
    if (!confirm('All tasks will be removed. Are you sure you want to continue?')) {
        return;
    }


    for (let taskLi = taskListUl.firstElementChild; taskLi; taskLi = taskListUl.firstElementChild) {
        removeTask(taskLi, taskLi.querySelector(".delete-item"));
    }

    event.preventDefault();
}

const addTask = (event) => {
    const deleteTaskIcon = document.createElement('i');
    deleteTaskIcon.classList.add('fa', 'fa-remove');

    const deleteTaskAnchor = document.createElement('a');
    deleteTaskAnchor.classList.add('delete-item', 'secondary-content');
    deleteTaskAnchor.appendChild(deleteTaskIcon);
    deleteTaskAnchor.addEventListener('click', deleteTask);

    const newTaskLi = document.createElement('li');
    newTaskLi.classList.add('collection-item');
    newTaskLi.appendChild(document.createTextNode(newTaskInput.value));
    newTaskLi.appendChild(deleteTaskAnchor);

    taskListUl.appendChild(newTaskLi);

    newTaskInput.value = '';
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

loadEventListeners();