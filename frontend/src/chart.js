const ctx = document.getElementById('waterLevelChart').getContext('2d');
const waterLevelChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Time series labels
        datasets: [{
            label: 'Water Level (L)',
            data: [], // Water level data
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom' },
            y: { beginAtZero: true }
        }
    }
});

document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const water_level = document.getElementById('water_level').value;
    const flow_rate = document.getElementById('flow_rate').value;

    const response = await fetch('http://127.0.0.1:5000/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ water_level, flow_rate })
    });

    const result = await response.json();
    alert(result.message);

    fetchData(); // Reload data
});

async function fetchData() {
    const response = await fetch('http://127.0.0.1:5000/data');
    const data = await response.json();

    const dataDiv = document.getElementById('data');
    dataDiv.innerHTML = '';
    data.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `Water Level: ${item[1]} L, Flow Rate: ${item[2]} L/s, Timestamp: ${item[3]}`;
        dataDiv.appendChild(div);

        // Update chart with new data
        waterLevelChart.data.labels.push(item[3]); // Timestamp
        waterLevelChart.data.datasets[0].data.push(item[1]); // Water level
        waterLevelChart.update();
    });
}

fetchData(); // Load data when page loads