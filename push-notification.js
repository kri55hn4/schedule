// push-notification.js
// Additional push notification logic

// Check if the browser supports Notification
if ('Notification' in window) {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notifications are allowed.');
    } else {
      console.log('Notifications are not allowed by the user.');
    }
  });
}

function showNotification(title, options) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, options);
    });
  } else {
    console.error('Service Worker or PushManager not supported');
  }
}

// Example usage:
// showNotification('Task Reminder', { body: 'Your task is due soon!' });
