const mainDiv = document.getElementById('main');
const taskForm = mainDiv.querySelector('#task-form');
const newTaskInput = taskForm.task;
const cardActionDiv = mainDiv.querySelector(".card-action");
const taskFilterInput = cardActionDiv.querySelector('.task-filter');
const taskListUl = cardActionDiv.querySelector(".collection");
const clearTaskAnchor = cardActionDiv.querySelector(".clear-tasks");

const removeTask = (deleteTaskAnchor) => {
    const taskLi = deleteTaskAnchor.parentElement;
    
    deleteTaskAnchor.removeEventListener('click', deleteTask);
    taskListUl.removeChild(taskLi);
};

const deleteTask = (event) => {
    removeTask(event.target.parentElement);
    
    event.preventDefault();
};

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

function loadEventListeners() {
    taskForm.addEventListener('submit', addTask);
}

loadEventListeners();