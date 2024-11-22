//for home page
const startBtn = document.querySelector('.btn');
const headerbox = document.querySelector('.container');
const body = document.querySelector('.body');

startBtn.onclick = () => {
  headerbox.classList.add('active');
  body.classList.add('active');
}


const reminderTitle = document.getElementById('reminderTitle');
const reminderTime = document.getElementById('reminderTime');
const addReminderBtn = document.getElementById('addReminderBtn');
const reminderList = document.getElementById('reminderList');

let reminders = [];

// Request permission for notifications if not already granted
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Function to add a reminder
addReminderBtn.addEventListener('click', () => {
    const title = reminderTitle.value.trim();
    const time = reminderTime.value;

    if (title === '' || time === '') {
        alert('Please fill in all fields.');
        return;
    }

    const reminder = { title, time };
    reminders.push(reminder);
    renderReminders();
    setReminderNotification(reminder); // Set notification
    reminderTitle.value = '';
    reminderTime.value = '';
});

// Function to render reminders with 12-hour time format
function renderReminders() {
    reminderList.innerHTML = '';
    reminders.forEach((reminder, index) => {
        const reminderDate = new Date(reminder.time);

        // Format the time to 12-hour format without seconds
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = reminderDate.toLocaleTimeString([], options);
        const formattedDate = reminderDate.toLocaleDateString();

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${reminder.title} - ${formattedDate} ${formattedTime}</span>
            <button class="delete-btn" onclick="deleteReminder(${index})">Delete</button>
        `;
        reminderList.appendChild(li);
    });
}

// Function to delete a reminder
function deleteReminder(index) {
    reminders.splice(index, 1);
    renderReminders();
}

// Function to set a notification for the reminder
function setReminderNotification(reminder) {
    const reminderTime = new Date(reminder.time).getTime();
    const currentTime = new Date().getTime();

    // Check if the reminder time is in the future
    if (reminderTime > currentTime) {
        const timeDifference = reminderTime - currentTime;

        // Set a timeout to trigger the notification at the right time
        setTimeout(() => {
            showNotification(reminder.title); // Show notification at reminder time
        }, timeDifference);
    }
}

// Function to show the browser notification
function showNotification(title) {
    if (Notification.permission === 'granted') {
        new Notification('CareSync Reminder', {
            body: `It's time for: ${title}`,
            icon: 'https://via.placeholder.com/150', // You can use your logo here
        });
    }
}
