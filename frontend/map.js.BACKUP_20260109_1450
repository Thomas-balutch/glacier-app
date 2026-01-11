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

      onEachFeature: (feature, layer) => {   // ← ICI l’accolade manquait

        layer.on("click", () => {

          // reset ancien glacier
          if (lastClickedLayer) {
            geojsonLayer.resetStyle(lastClickedLayer);
          }

          // highlight
          layer.setStyle(highlightStyle());
          lastClickedLayer = layer;

          // mises à jour
          updateUI(feature.properties);
       // updateCharts(feature.properties);   // désactivé car fonction absente
          updateDashboard3(feature.properties);

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
  const lineCanvas = document.getElementById("chartLine");
  const lineTitle  = document.getElementById("lineTitle");
  const lineHint   = document.getElementById("lineHint");

  if (!lineCanvas || !lineTitle || !lineHint) return;

  // reset
  lineCanvas.style.display = "none";
  lineTitle.textContent = "Évolution";
  lineHint.textContent = "";

  if (!props) {
    lineHint.textContent = "Clique sur un glacier pour voir son évolution.";
    return;
  }

  const name = (
    props.Name ||
    props.GLIMSName ||
    props.Name_FR ||
    props.Name_EN ||
    ""
  ).toLowerCase();

  if (!name.includes("mer de glace")) {
    lineHint.textContent = "Sélectionne la Mer de Glace pour voir son évolution.";
    return;
  }

  lineTitle.textContent = "Évolution de la surface — Mer de Glace";
  lineHint.textContent = "Données historiques (exemple pédagogique)";
  lineCanvas.style.display = "block";

  if (window.chartLineInstance) {
    window.chartLineInstance.destroy();
  }

  const years  = [1900, 1930, 1960, 1990, 2020];
  const values = [45,   42,   38,   34,   32];

  window.chartLineInstance = new Chart(lineCanvas, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "Surface (km²)",
        data: values,
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.25)",
        tension: 0.3,
        fill: true,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      onClick: (evt, elements) => {
        if (elements.length > 0) {
          const i = elements[0].index;
          alert(`Année ${years[i]} : ${values[i]} km²`);
        }
      },
      plugins: {
        legend: { display: true }
      }
    }
  });
}

