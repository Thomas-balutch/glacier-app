let EVOLUTION_DATA = {};

fetch('evolution_glaciers.json', { cache: 'no-cache' })
  .then(response => {
    if (!response.ok) throw new Error('Fichier 1 introuvable: ' + response.status);
    return response.json();
  })
  .then(data => {
    EVOLUTION_DATA = data;

    fetch('evolution_glaciers_2.json', { cache: 'no-cache' })
      .then(res => {
        if (!res.ok) {
          console.warn('Fichier 2 absent (404 ou erreur): ' + res.status + ' → on continue avec fichier 1');
          return {};
        }
        return res.json();
      })
      .then(data2 => {
        Object.assign(EVOLUTION_DATA, data2);
        console.log("Évolution chargée :", Object.keys(EVOLUTION_DATA).length, "glaciers");

        // Remplit le select "Glacier" (adapte l'ID si différent)
        const select = document.getElementById('glacier');
        if (select) {
          select.innerHTML = '<option value="">Sélectionne un glacier</option>';
          Object.keys(EVOLUTION_DATA).forEach(rgi => {
            const opt = document.createElement('option');
            opt.value = rgi;
            opt.textContent = EVOLUTION_DATA[rgi].title || rgi;
            select.appendChild(opt);
          });
        }
      })
      .catch(err => console.error("Erreur fichier 2 :", err));
  })
  .catch(err => console.error("Erreur fichier 1 :", err));
// empreinte.js — MVP sobre (JS uniquement)

// 1) Facteurs d'émission (kg CO2 / km / personne)
// Valeurs approximatives (pédagogiques).
const EMISSION_FACTORS = {
  voiture: 0.20,
  avion: 0.15,
  train: 0.01
};

// 2) Conversion pédagogique CO2 -> impact glacier
// Ici on fixe une règle simple :
// - 1 tonne CO2 (1000 kg) = 1 m² "impacté" (ordre de grandeur pédagogique)
// - 1 jour de fonte moyenne = 5 m² (valeur pédagogique)
// => days = m2 / 5
//
// Tu pourras remplacer ces coefficients par des valeurs sourcées ensuite.
const KG_PER_TON = 1000;
const M2_PER_TON_CO2 = 1;   // 1 m² / tonne CO2
const M2_PER_DAY = 5;       // 5 m² / jour

// 3) Où charger la liste de glaciers ?
// D'après ton dossier, tu as: glaciers_centraleurope.geojson
// On va lire ce GeoJSON et remplir le <select>.
const GLACIERS_GEOJSON = "glaciers_centraleurope.geojson";

const $ = (id) => document.getElementById(id);

function formatNumber(n, digits = 1) {
  if (!isFinite(n)) return "—";
  return n.toFixed(digits);
}

function getGlacierLabel(feature) {
  const p = feature.properties || {};
  return p.Name || p.RGIId || "Glacier";
}

async function loadGlaciers() {
 console.log(">>> loadGlaciers appelée");
  const select = $("glacier");
  select.innerHTML = `<option value="">Chargement...</option>`;

  try {
    const res = await fetch(GLACIERS_GEOJSON, { cache: "no-store" });
    console.log("Fetch status:", res.status);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const geo = await res.json();
    const features = Array.isArray(geo.features) ? geo.features : [];
    console.log("Nombre de features:", features.length);
    if (!features.length) {
      select.innerHTML = `<option value="">Aucun glacier trouvé</option>`;
      return;
    }

    const items = features
  .map(f => {
    const p = f.properties || {};
    const rgi = p.RGIId || p.RGIID;
    if (!rgi) return null;

    return {
      rgi: rgi,
      label: p.Name || rgi
    };
  })
  .filter(Boolean)
  .sort((a, b) => a.label.localeCompare(b.label, "fr"));

    select.innerHTML =
      `<option value="">— Sélectionne un glacier —</option>` +
      items.map(it =>
        `<option value="${it.rgi}">${it.label}</option>`
      ).join("");

  } catch (e) {
    console.error("Erreur chargement glaciers:", e);
    select.innerHTML = `<option value="">Erreur de chargement</option>`;
  }
}

function calculate() {
function calculate() {
  console.log(">>> calculate déclenchée");
  const profile = $("profile").value;
  const transport = $("transport").value;
  const distance = Number($("distance").value);
  const glacierId = $("glacier").value;

  if (!isFinite(distance) || distance <= 0) {
    $("outDetails").textContent = "Distance invalide.";
    return;
  }

  if (!glacierId) {
    $("outDetails").textContent = "Choisis d'abord un glacier.";
    return;
  }

  const evolution = EVOLUTION_DATA[glacierId];

  if (!evolution) {
    $("outDetails").textContent = "Pas de données d’évolution.";
    return;
  }

  const factor = EMISSION_FACTORS[transport] ?? 0.2;

  const co2 = distance * factor * 2;
  const m2 = (co2 / KG_PER_TON) * M2_PER_TON_CO2;
  const days = m2 / M2_PER_DAY;

  $("outCO2").textContent = formatNumber(co2, 1);
  $("outM2").textContent = formatNumber(m2, 2);
  $("outDays").textContent = formatNumber(days, 2);

  const glacierName =
    $("glacier").selectedOptions[0]?.textContent || "Glacier";

  $("outDetails").textContent =
    `Trajet ${distance} km en ${transport}. Glacier : ${glacierName}.`;
}

function resetForm() {
    $("#profile").value = "habitant";
    $("#transport").value = "voiture";
    $("#distance").value = 200;
    $("#glacier").value = "";
    $("#outCO2").textContent = "-";
    $("#outDays").textContent = "-";
    $("#outM2").textContent = "-";
    $("#outDetails").textContent = "Sélectionne un glacier puis clique sur “Calculer”.";
}   // ← ICI on ferme correctement resetForm()


// Adapter automatiquement la distance selon le profil
$("#profile").addEventListener("change", () => {
    const profile = $("#profile").value;

    if (profile === "touriste") {
        $("#distance").value = 400;
    } else {
        $("#distance").value = 20;
    }
});

// === BOUTON CALCULER ===
document.getElementById('calculerBtn').addEventListener('click', () => {
  const transport = document.getElementById('transport').value;
  const distance = parseFloat(document.getElementById('distance').value) || 0;
  const rgi = document.getElementById('glacier').value;

  if (!rgi || distance <= 0) {
    alert("Sélectionne un glacier et une distance valide.");
    return;
  }

  const facteurs = {
    voiture: 0.20,
    avion: 0.15,
    train: 0.01
  };

  const kgCO2 = distance * facteurs[transport];
  const tonnesCO2 = kgCO2 / 1000;
  const joursFonte = tonnesCO2 * 1; // pédagogique
  const m2Impact = tonnesCO2 * 1; // pédagogique

  document.getElementById('emissions').textContent = kgCO2.toFixed(0) + " kg CO₂";
  document.getElementById('joursFonte').textContent = joursFonte.toFixed(0) + " jours";
  document.getElementById('surfaceImpact').textContent = m2Impact.toFixed(0) + " m²";

  const glacier = EVOLUTION_DATA[rgi];
  if (glacier) {
    document.getElementById('details').textContent = 
      `Trajet ${distance} km en ${transport}. Glacier : ${glacier.title}.`;
  }
});
}
