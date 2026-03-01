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
  // On essaye plusieurs champs, car selon les données ce n'est pas toujours pareil.
  const p = feature.properties || {};
  return p.name || p.Nom || p.GLACIER || p.glacier || p.id || "Glacier";
}

async function loadGlaciers() {
  const select = $("glacier");
  select.innerHTML = `<option value="">Chargement…</option>`;

  try {
    const res = await fetch(GLACIERS_GEOJSON, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const geo = await res.json();
   console.log(geo.features[0]);
    const features = Array.isArray(geo.features) ? geo.features : [];
    if (!features.length) {
      select.innerHTML = `<option value="">Aucun glacier trouvé</option>`;
      return;
    }

    // Construire une liste triée avec RGI
const items = features.map((f) => {
  const p = f.properties || {};
  return {
    rgi: p.RGIId || p.id || "unknown",
    label: getGlacierLabel(f)
  };
}).sort((a, b) => a.label.localeCompare(b.label, "fr"));

select.innerHTML = `<option value="">— Sélectionne un glacier —</option>` +
  items.map(it => `<option value="${it.rgi}">${it.label}</option>`).join("");

  } catch (e) {
    console.error("Erreur chargement glaciers:", e);
    select.innerHTML = `<option value="">Erreur de chargement</option>`;
  }
}

function calculate() {
  const profile = $("profile").value;
  const transport = $("transport").value;
  const distance = Number($("distance").value);
  const glacierIdx = $("glacier").value;

  if (!isFinite(distance) || distance <= 0) {
    $("outDetails").textContent = "Distance invalide. Mets un nombre > 0.";
    return;
  }
  if (!glacierIdx) {
    $("outDetails").textContent = "Choisis d’abord un glacier.";
    return;
  }

  const factor = EMISSION_FACTORS[transport] ?? 0.2;

  // CO2 total
  const co2 = distance * factor * 2; // Aller-retour
 const co2RoundTrip = co2 * 2;
  // Conversion pédagogique
  const m2 = (co2 / KG_PER_TON) * M2_PER_TON_CO2;
  const days = m2 / M2_PER_DAY;

  $("outCo2").textContent = formatNumber(co2, 1);
  $("outM2").textContent = formatNumber(m2, 2);
  $("outDays").textContent = formatNumber(days, 2);

  const transportLabel = {
    voiture: "voiture",
    avion: "avion",
    train: "train"
  }[transport] || transport;

  const profileLabel = profile === "touriste" ? "touriste" : "habitant";

  const glacierName = $("glacier").selectedOptions[0]?.textContent || "glacier";

  $("outDetails").textContent =
    `Profil: ${profileLabel}. Trajet: ${distance} km en ${transportLabel}. Glacier: ${glacierName}. ` +
    `Facteur utilisé: ${factor} kg CO₂/km.`;
}

function resetForm() {
  $("profile").value = "habitant";
  $("transport").value = "voiture";
  $("distance").value = 200;
  $("glacier").value = "";
  $("outCo2").textContent = "—";
  $("outDays").textContent = "—";
  $("outM2").textContent = "—";
  $("outDetails").textContent = "Sélectionne un glacier puis clique sur “Calculer”.";
}

  // Adapter automatiquement la distance selon le profil
  $("profile").addEventListener("change", () => {
    const profile = $("profile").value;
    if (profile === "touriste") {
      $("distance").value = 400;
    } else {
      $("distance").value = 20;
    }
  });
document.addEventListener("DOMContentLoaded", () => {
  loadGlaciers();
});
