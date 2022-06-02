// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const priorityFilter =document.querySelector('#filter-priority'); 
const taskInput = document.querySelector('#task');
const dateInput = document.querySelector('#duedate');
const estimatetimeInput = document.querySelector('#estimatetime');
const priorityInput = document.querySelector('#priority');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
  priorityFilter.addEventListener('keyup', filterPriority)
}

// Get Tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task.name));
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(document.createTextNode(task.date));
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(document.createTextNode(task.estimatetime));
    li.appendChild(document.createTextNode(' | '));
    li.appendChild(document.createTextNode(task.priority));
    li.appendChild(document.createTextNode('  '));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add Task
function addTask(e) {
  if(taskInput.value === '' || dateInput.value === '' || estimatetimeInput.value === '' || priorityInput.value === '') {
    alert('Add a task');
  } else{
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  li.appendChild(document.createTextNode(' | '));
  li.appendChild(document.createTextNode(dateInput.value));
  li.appendChild(document.createTextNode(' | '));
  li.appendChild(document.createTextNode(estimatetimeInput.value));
  li.appendChild(document.createTextNode(' | '));
  li.appendChild(document.createTextNode(priorityInput.value));
  li.appendChild(document.createTextNode('  '));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  const task = {
    name: taskInput.value,
    date: dateInput.value,
    estimatetime: estimatetimeInput.value,
    priority: priorityInput.value,
  }
  
  // Store in LS
  storeTaskInLocalStorage(task);

  // Clear input
  taskInput.value = '';
  dateInput.value = '';
  estimatetimeInput.value = '';
  priorityInput.value = '';
  }

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    console.log(task)
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

function filterPriority(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    console.log(task)
    const item = task.childNodes[6].textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
