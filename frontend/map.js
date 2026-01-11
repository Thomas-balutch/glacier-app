// ===============================
// INITIALISATION CARTE
// ===============================
const map = L.map("map").setView([45.9, 6.9], 7);

// Fond satellite ESRI
const satelliteLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "© Esri, Maxar, Earthstar Geographics" }
).addTo(map);

// Fond OSM
const osmLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  { attribution: "© OpenStreetMap contributors" }
);

// Switch couches
L.control.layers(
  { "Satellite": satelliteLayer, "Carte (OpenStreetMap)": osmLayer },
  null,
  { collapsed: false }
).addTo(map);

// ===============================
// VARIABLES GLOBALES
// ===============================
let geojsonLayer = null;
let lastClickedLayer = null;
let chartAlt = null;
let chartArea = null;

// ===============================
// STYLES
// ===============================
function defaultStyle() {
  return {
    color: "#ffffff",
    weight: 1,
    fillOpacity: 0.6
  };
}

function highlightStyle() {
  return {
    color: "#ff0000",
    weight: 2,
    fillOpacity: 0.8
  };
}

// ===============================
// UTILITAIRES
// ===============================
function getGlacierName(props) {
  return (
    props.Name ||
    props.GLIMSName ||
    props.Name_FR ||
    props.Name_EN ||
    (props.RGIId ? `Glacier ${props.RGIId}` : "Glacier sans nom")
  );
}

// ===============================
// UI UPDATE (DASHBOARD 1 + 2)
// ===============================
function updateUI(props) {

  // -------- FICHE GLACIER --------
  document.getElementById("g-name").textContent = getGlacierName(props);
  document.getElementById("g-country").textContent = "Europe (Alpes)";
  document.getElementById("g-alt").textContent =
    props.Zmed ? `${Math.round(props.Zmed)} m` : "—";
  document.getElementById("g-area").textContent =
    props.Area ? `${props.Area.toFixed(2)} km²` : "—";

  // -------- DASHBOARD 1 : ALTITUDE --------
  if (chartAlt) chartAlt.destroy();

  chartAlt = new Chart(document.getElementById("chartAlt"), {
    type: "bar",
    data: {
      labels: [getGlacierName(props)],
      datasets: [{
        label: "Altitude moyenne (m)",
        data: [props.Zmed || 0]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });

  // -------- DASHBOARD 2 : SURFACE --------
  if (chartArea) chartArea.destroy();

  chartArea = new Chart(document.getElementById("chartArea"), {
    type: "bar",
    data: {
      labels: [getGlacierName(props)],
      datasets: [{
        label: "Surface (km²)",
        data: [props.Area || 0]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// ============================
// CHARGEMENT DES GLACIERS
// ============================
fetch("glaciers_centraleurope.geojson")
  .then(r => r.json())
  .then(data => {

    geojsonLayer = L.geoJSON(data, {
      style: defaultStyle,

      onEachFeature: (feature, layer) => {
    layer.on('click', () => {
        updateUI(feature.properties);         // Dashboards 1+2
        updateDashboard3(feature.properties); // Dashboard 3
        lastClickedLayer = layer;             // Optionnel pour highlight
    });
}
    }).addTo(map);

  })
  .catch(err => {
    console.error("Erreur chargement GeoJSON :", err);
  });
// ================================
// DASHBOARD 3 — ÉVOLUTION MER DE GLACE
// ================================
function updateDashboard3(props) {
    const canvas = document.getElementById("chartline");  // ou "chartLine" selon ton choix
    const title = document.getElementById("lineTitle");
    const hint = document.getElementById("lineHint");

    if (!canvas) {
        console.error("🚨 Canvas #chartline introuvable ! Vérifie l'id dans HTML.");
        return;
    }

    if (window.chartLineInstance) {
        window.chartLineInstance.destroy();
        window.chartLineInstance = null;
    }

    const glacierName = getGlacierName(props).toLowerCase().trim();
    console.log("Glacier cliqué :", glacierName);  // Debug : ouvre la console (F12) et vérifie le nom exact !

    // Condition tolérante (accents, espaces, "geant", casse)
    if (glacierName.includes("mer de glace") || glacierName.includes("mer de glage") || glacierName.includes("geant") || glacierName.includes("236a01")) {
        title.textContent = "Évolution de la surface – Mer de Glace";
        hint.textContent = "Données historiques & estimations récentes (Glacioclim, IGE Grenoble, 2025)";

        // Données approx. réalistes (surface en km² ; perte ~2-3 km² depuis 2000)
        const years = [1850, 1900, 1950, 1980, 2000, 2010, 2020, 2025];
        const surfaces = [40.0, 38.0, 35.0, 32.0, 30.5, 29.0, 27.5, 26.5];

        window.chartLineInstance = new Chart(canvas, {
            type: 'line',
            data: {
                labels: years,
                datasets: [{
                    label: "Surface (km²)",
                    data: surfaces,
                    borderColor: "#1e90ff",
                    backgroundColor: "rgba(30, 144, 255, 0.2)",
                    fill: true,
                    tension: 0.3,
                    pointRadius: 5,
                    pointBackgroundColor: "#0066cc"
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 20,
                        title: { display: true, text: 'Surface (km²)' }
                    },
                    x: {
                        title: { display: true, text: 'Année' }
                    }
                }
            }
        });
    } else {
        title.textContent = "Évolution";
        hint.textContent = "Données d'évolution (pédagogiques) : sélectionne la Mer de Glace !";
        // Option : un chart vide ou placeholder si tu veux
    }
}
