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
  maintainAspectRatio: false,
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
  maintainAspectRatio: false,
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

  const props = feature.properties;

  // Nom du glacier
  // Code RGI
const rgi =
  props.RGIId ||
  props.RGID ||
  props.rgi_id ||
  null;

// Nom du glacier
const name =
  props.Name ||
  props.NAME ||
  props.glac_name ||
  props.GLAC_NAME ||
  props.Glacier ||
  (rgi ? `Glacier ${rgi}` : "Glacier sans nom");

  // Tooltip au survol (NOM + RGI UNIQUEMENT)
  layer.bindTooltip(
    `<strong>${name}</strong><br>${rgi ?? ""}`,
    {
      sticky: true,
      opacity: 0.9
    }
  );

  // Clic (logique existante)
  layer.on("click", () => {
    console.log("Glacier cliqué - RGIId :", rgi);

    updateUI(props);

    if (rgi) {
      updateDashboardEvolution(rgi);
    } else {
      console.warn("Aucun RGI pour ce glacier");
      updateDashboardEvolution(null);
    }

    lastClickedLayer = layer;
  });
}

    }).addTo(map);

// === CHARGEMENT DES DONNÉES D'ÉVOLUTION (fichier 1 + fichier 2) ===
let evolutionData = {};

fetch('evolution_glaciers.json', { cache: 'no-cache' })
  .then(response => {
    if (!response.ok) throw new Error('Fichier 1 non trouvé: ' + response.status);
    return response.json();
  })
  .then(data1 => {
    evolutionData = data1; // fichier 1 chargé

    fetch('evolution_glaciers_2.json', { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) {
          console.warn('Fichier 2 non trouvé (404 ou autre): ' + response.status + ' → on continue avec fichier 1');
          return {}; // continue sans fichier 2
        }
        return response.json();
      })
      .then(data2 => {
        Object.assign(evolutionData, data2);
        console.log("Évolution chargée :", Object.keys(evolutionData).length, "glaciers au total");
      })
      .catch(err => console.error("Erreur chargement fichier 2 :", err));
  })
  .catch(err => console.error("Erreur chargement fichier 1 :", err));

  })
  .catch(err => {
    console.error("Erreur chargement GeoJSON :", err);
  });
// ==========================
// DASHBOARD — ÉVOLUTION (TOUS GLACIERS)
// ==========================
function updateDashboardEvolution(rgi) {

  const db = window.glacierEvolution;

  const title = document.getElementById("lineTitle");
  const hint  = document.getElementById("lineHint");
  const canvas = document.getElementById("chartline");

  if (!canvas) {
    console.error("Canvas #chartline introuvable");
    return;
  }

  if (!db || !db[rgi]) {
    title.textContent = "Évolution";
    hint.textContent = "Pas de données pour " + rgi;

    if (window.chartLineInstance) {
      window.chartLineInstance.destroy();
      window.chartLineInstance = null;
    }
    return;
  }

  const g = db[rgi];

  title.textContent = "Évolution — " + g.title;
  hint.textContent = "Source : " + g.source;

  if (window.chartLineInstance) {
    window.chartLineInstance.destroy();
  }

  window.chartLineInstance = new Chart(
    canvas.getContext("2d"),
    {
      type: "line",
      data: {
        labels: g.years,
        datasets: [{
          label: g.unit,
          data: g.values,
          fill: true
        }]
      },
      options: {
        responsive: true
      }
    }
  );
}
