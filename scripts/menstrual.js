//for home page
const startBtn = document.querySelector('.btn-outline');
const headerbox = document.querySelector('.container');
const body = document.querySelector('.body');

startBtn.onclick = () => {
  headerbox.classList.add('active');
  body.classList.add('active');
}


document.getElementById('cycle-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const startDate = new Date(document.getElementById('start-date').value);
    const cycleLength = parseInt(document.getElementById('cycle-length').value);
    const periodLength = parseInt(document.getElementById('period-length').value);

    const calendarDiv = document.getElementById('calendar');
    calendarDiv.innerHTML = ""; // Clear previous results

    // Calculate important dates
    const nextPeriodStart = new Date(startDate);
    nextPeriodStart.setDate(startDate.getDate() + cycleLength);

    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(nextPeriodStart.getDate() - 14);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    // Generate output
    const result = `
        <h2>Predicted Dates</h2>
        <ul>
            <li>Next Period Start: ${nextPeriodStart.toDateString()}</li>
            <li>Ovulation Date: ${ovulationDate.toDateString()}</li>
            <li>Fertile Window: ${fertileStart.toDateString()} - ${fertileEnd.toDateString()}</li>
        </ul>
    `;

    calendarDiv.innerHTML = result;
});
