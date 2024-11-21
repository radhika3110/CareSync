//for home page
const Btn1 = document.querySelector('.btn1');
const Btn2 = document.querySelector('.btn2');
const Btn3 = document.querySelector('.btn3');

const tracker1 = document.querySelector('.tracker1');
const tracker2 = document.querySelector('.tracker2');
const tracker3 = document.querySelector('.tracker3');

Btn1.onclick = () => {
    tracker1.classList.add('active');
}

Btn2.onclick = () => {
    tracker2.classList.add('active');
}

Btn3.onclick = () => {
    tracker3.classList.add('active');
}


// Default Goals
let waterIntake = 0;
let calorieIntake = 0;
let exercises = [];

// Default goal values
let waterGoal = 2;
let calorieGoal = 2000;
let exerciseGoal = 30;

// Function to populate dropdowns
function populateDropdown() {
    const waterGoalSelect = document.getElementById("waterGoalInput");
    const calorieGoalSelect = document.getElementById("calorieGoalInput");
    const exerciseGoalSelect = document.getElementById("exerciseGoalInput");

    // Populate water goal dropdown (multiples of 5)
    for (let i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i * 2;
        option.textContent = `${i * 2} Liters`;
        waterGoalSelect.appendChild(option);
    }

    // Populate calorie goal dropdown (multiples of 5)
    for (let i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i * 500;
        option.textContent = `${i * 500} kcal`;
        calorieGoalSelect.appendChild(option);
    }

    // Populate exercise goal dropdown (multiples of 5)
    for (let i = 1; i <= 10; i++) {
        let option = document.createElement("option");
        option.value = i * 5;
        option.textContent = `${i * 5} minutes`;
        exerciseGoalSelect.appendChild(option);
    }

    // Set default values for the dropdowns
    waterGoalSelect.value = waterGoal;
    calorieGoalSelect.value = calorieGoal;
    exerciseGoalSelect.value = exerciseGoal;
}

// Update the displayed goal values when dropdowns change
document.getElementById("waterGoalInput").addEventListener("change", (event) => {
    waterGoal = parseFloat(event.target.value);
    document.getElementById("waterGoal").textContent = waterGoal;
    updateWaterStatus();
});

document.getElementById("calorieGoalInput").addEventListener("change", (event) => {
    calorieGoal = parseInt(event.target.value);
    document.getElementById("calorieGoal").textContent = calorieGoal;
    updateCalorieStatus();
});

document.getElementById("exerciseGoalInput").addEventListener("change", (event) => {
    exerciseGoal = parseInt(event.target.value);
    document.getElementById("exerciseGoal").textContent = exerciseGoal;
    updateExerciseStatus();
});

// Water Intake Tracker
function addWater() {
    let waterInput = document.getElementById("waterIntake").value;
    waterIntake += parseFloat(waterInput);
    updateWaterStatus();
}

function updateWaterStatus() {
    let waterStatus = document.getElementById("waterStatus");
    if (waterIntake >= waterGoal) {
        waterStatus.textContent = "Goal reached! Great job!";
        waterStatus.style.color = "green";
    } else {
        waterStatus.textContent = `You need ${waterGoal - waterIntake} more liters to reach your goal.`;
        waterStatus.style.color = "orange";
    }
}

// Calorie Tracker
function addCalories() {
    let calorieInput = document.getElementById("calorieIntake").value;
    calorieIntake += parseInt(calorieInput);
    updateCalorieStatus();
}

function updateCalorieStatus() {
    let calorieStatus = document.getElementById("calorieStatus");
    if (calorieIntake >= calorieGoal) {
        calorieStatus.textContent = "Goal reached! You've hit your calorie target.";
        calorieStatus.style.color = "green";
    } else {
        calorieStatus.textContent = `You need ${calorieGoal - calorieIntake} more kcal to reach your goal.`;
        calorieStatus.style.color = "orange";
    }
}

// Exercise Tracker
function addExercise() {
    let exercise = document.getElementById("exercise").value;
    let duration = document.getElementById("exerciseDuration").value;

    if (exercise && duration) {
        exercises.push({ exercise, duration });
        updateExerciseStatus();
    }
}

function updateExerciseStatus() {
    let exerciseStatus = document.getElementById("exerciseStatus");
    exerciseStatus.textContent = "Your exercise log:";
    exercises.forEach(entry => {
        exerciseStatus.textContent += ` ${entry.exercise} for ${entry.duration} minutes.`;
    });

    let totalExerciseDuration = exercises.reduce((total, entry) => total + parseInt(entry.duration), 0);
    if (totalExerciseDuration >= exerciseGoal) {
        exerciseStatus.textContent += ` You've reached your exercise goal!`;
        exerciseStatus.style.color = "green";
    } else {
        exerciseStatus.textContent += ` You need ${exerciseGoal - totalExerciseDuration} more minutes to reach your goal.`;
        exerciseStatus.style.color = "orange";
    }
}

// Populate the dropdowns on page load
populateDropdown();
