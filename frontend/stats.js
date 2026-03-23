// --- CHART 1 : Altitude par glacier ---
const ctxAltitude = document.getElementById("chartAltitude");
let chartAltitude = null;
if (ctxAltitude) {
    chartAltitude = new Chart(ctxAltitude, {
        type: "bar",
        data: {
            labels: ["Glacier 1", "Glacier 2", "Glacier 3"],
            datasets: [{
                label: "Altitude (m)",
                data: [3200, 3100, 3050],
                backgroundColor: "#2a6f97"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

// --- CHART 2 : Surface actuelle ---
const ctxSurface = document.getElementById("chartSurface");
let chartSurface = null;
if (ctxSurface) {
    chartSurface = new Chart(ctxSurface, {
        type: "bar",
        data: {
            labels: ["Glacier 1", "Glacier 2", "Glacier 3"],
            datasets: [{
                label: "Surface (km²)",
                data: [12.5, 10.2, 8.7],
                backgroundColor: "#468faf"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

// --- CHART 3 : Évolution ---
const ctxEvolution = document.getElementById("chartEvolution");
let chartEvolution = null;
if (ctxEvolution) {
    chartEvolution = new Chart(ctxEvolution, {
        type: "line",
        data: {
            labels: ["1850", "1900", "1950", "2000", "2025"],
            datasets: [{
                label: "Surface (km²)",
                data: [40, 35, 30, 27, 24],
                borderColor: "#2a6f97",
                backgroundColor: "rgba(42,111,151,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}
