const taskForm = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const taskListClearBtn = document.querySelector('.clear-tasks');
const taskFilter = document.getElementById('filter');
const taskInput = document.getElementById('task');

loadEventListeners();

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
    taskForm.addEventListener('submit', onTaskFormSubmit);
    taskList.addEventListener('click', removeTask);
    taskListClearBtn.addEventListener('click', clearTaskList);
    taskFilter.addEventListener('keyup', filterTask);
}

function onTaskFormSubmit(event) {
    event.preventDefault();

    let task = taskInput.value;

    if (task == '') {
        return
    }

    addTaskToPage(task);

    storeTaskInLocalStorage(task);

    taskInput.value = '';
}

function addTaskToPage(task) {
    const taskListItem = document.createElement('li');
    taskListItem.classList.add('collection-item');
    const taskText = document.createTextNode(task);

    const taskDeleteBtn = document.createElement('a');
    taskDeleteBtn.classList.add('delete-item');
    taskDeleteBtn.classList.add('secondary-content');
    taskDeleteBtn.setAttribute('href', '#');

    const taskDeleteIcon = document.createElement('i');
    taskDeleteIcon.classList.add('material-icons');
    const deleteText = document.createTextNode('cancel');

    taskListItem.appendChild(taskText);
    taskListItem.appendChild(taskDeleteBtn);
    taskDeleteBtn.appendChild(taskDeleteIcon);
    taskDeleteIcon.appendChild(deleteText);

    taskList.appendChild(taskListItem);
}

function storeTaskInLocalStorage(task) {
    let tasks = getTaskListFromLocalStorage();

    tasks.push(task);
    setTaskListInLocalStorage(tasks);
}

function getTaskListFromLocalStorage() {
    let tasksInDB = localStorage.getItem('tasks');

    if (tasksInDB === null) {
        return [];
    }
    return JSON.parse(tasksInDB);
}

function setTaskListInLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function removeTask(event) {
    event.preventDefault();

    if (!event.target.parentElement.classList.contains('delete-item')) {
        return
    }

    let taskToRemove = event.target.parentElement.parentElement.firstChild.textContent;
    tasks = getTaskListFromLocalStorage();
    tasks.splice(tasks.indexOf(taskToRemove), 1);
    setTaskListInLocalStorage(tasks);

    event.target.parentElement.parentElement.remove();
}

function clearTaskList(event) {
    event.preventDefault();

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTask(event) {
    event.preventDefault();

    const queryString = event.target.value.toLowerCase();
    const taskListItems = document.querySelectorAll('li.collection-item');

    taskListItems.forEach((listItem) => {
        const itemText = listItem.firstChild.textContent;
        if (itemText.toLowerCase().indexOf(queryString) != -1) {
            listItem.style.display = 'block';
        } else {
            listItem.style.display = 'none';
        }
    })
}

function loadTasksFromLocalStorage() {
    let tasks = getTaskListFromLocalStorage();

    tasks.forEach(addTaskToPage);
}
