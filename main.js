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
  setupTaskNotifications(task);
  setupTaskTimeoutNotification(task);

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

// Function to set up task notifications
function setupTaskNotifications(task) {
  // Instant notification for added task
  setupInstantNotification(`Task Added: ${task.task}`);

  // Set up periodic notifications every 25 minutes
  setInterval(() => {
    setupInstantNotification(`Reminder: ${task.task}`);
  }, 25 * 60 * 1000);

  // Set up notifications as due time approaches
  setupDueTimeNotifications(task);
}

// Function to set up notifications as due time approaches
function setupDueTimeNotifications(task) {
  const dueDateTime = new Date(`${task.dueDate} ${task.dueTime}`).getTime();
  const now = new Date().getTime();
  const timeRemaining = dueDateTime - now;

  if (timeRemaining > 0) {
    // Notifications at 20, 15, 10, 5 minutes before due time
    const notificationIntervals = [20, 15, 10, 5];

    notificationIntervals.forEach(interval => {
      if (timeRemaining > interval * 60 * 1000) {
        setTimeout(() => {
          setupInstantNotification(`Due Soon: ${task.task}`);
        }, timeRemaining - interval * 60 * 1000);
      }
    });
  }
}

// Function to set up a notification after task timeout
function setupTaskTimeoutNotification(task) {
  const dueDateTime = new Date(`${task.dueDate} ${task.dueTime}`).getTime();
  const now = new Date().getTime();
  const timeRemaining = dueDateTime - now;

  if (timeRemaining > 0) {
    setTimeout(() => {
      setupInstantNotification(`Task Timeout: ${task.task}. You didn't complete it on time.`);
    }, timeRemaining);
  }
}

// Function to set up an instant notification
function setupInstantNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(message);
  }
}

// Check if the browser supports Notification
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      console.log('Notifications are not allowed by the user.');
    }
  });
}
