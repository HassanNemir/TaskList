/**
 * UI components
 */
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.querySelector('#Task');
const filterInput = document.querySelector('#filter');
const clearbtn = document.querySelector('#clearBtn');
/**
 * functions' calls
 */
loadEventListeners();
/**
 * functions definitions 
 */
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearbtn.addEventListener('click', clearTasks);
    filterInput.addEventListener('keyup', filterTasks);
}
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please add some task')
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);
    taskList.appendChild(li);
    store(taskInput.value);
    taskInput.value = '';
    filterInput.disabled = false;
    taskList.style.display = "block";
    e.preventDefault();
}
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        document.querySelector('li').remove();
    }
    if (taskList.firstElementChild == null) {
        taskList.style.display = "none";
        filterInput.disabled = true;
    }
    removeFromLS(e.target.parentElement.parentElement);
}
/**
 * removes individual tasks from the localStorage.
 * @param {HTMLElement} taskItem the list item with the task to be removed.
 */
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach((task, i) => {
        if(taskItem.textContent === task){
            tasks.splice(i, 1)
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function clearTasks() {
    localStorage.clear();
    tasks = Array.from(taskList.childNodes)
    tasks.forEach(node => {
        node.remove();
    });
    taskList.style.display = "none";
    filterInput.disabled = true;
}
function filterTasks(e) {
    console.log(taskList.innerText.search(filterInput.value))
    const items = Array.from(taskList.querySelectorAll('li'))
    items.forEach(li => {
        if (li.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    })
}
function store(val) {
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(val);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getTasks() {
    taskList.style.display = "block";
    console.log('loading tasks');
    let tasks;
    if (localStorage.getItem('tasks') == null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        console.log(tasks);  
    }
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></li>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}