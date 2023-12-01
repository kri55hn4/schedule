// main.js
// Main logic for handling tasks, user input, and updating the UI

// Array to store tasks
let tasks = [];

// Function to add a new task
function addTask() {
  const taskInput = document.getElementById('task');
  const dueDateInput = document.getElementById('dueDate');
  const dueTimeInput = document.getElementById('dueTime');

  const task = {
    id: new Date().getTime(),
    task: taskInput.value,
    dueDate: dueDateInput.value,
    dueTime: dueTimeInput.value,
  };

  tasks.push(task);
  displayTasks();
  setupNotifications(task);

  // Clear input fields
  taskInput.value = '';
  dueDateInput.value = '';
  dueTimeInput.value = '';
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.task} - ${task.dueDate} ${task.dueTime}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

// Function to set up notifications
function setupNotifications(task) {
  // Implement push notifications logic here
  // For example, you can use the Notification API
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(`Task Reminder: ${task.task}`, {
      body: `Due on ${task.dueDate} at ${task.dueTime}`,
    });
  }
}

// Check if the browser supports Notification
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      console.log('Notifications are not allowed by the user.');
    } else {
      // Set up periodic notifications check every 30 minutes
      setInterval(checkTaskDueDates, 30 * 60 * 1000);
    }
  });
}

// Function to check task due dates and send periodic notifications
function checkTaskDueDates() {
  const now = new Date().getTime();

  tasks.forEach(task => {
    const dueDateTime = new Date(`${task.dueDate} ${task.dueTime}`).getTime();

    // Check if the task is overdue
    if (now > dueDateTime) {
      setupNotifications(task);
    }
  });
}
