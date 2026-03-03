// ===============================
// 1) Chargement des glaciers
// ===============================

let EVOLUTION_DATA = {};

fetch("evolution_glaciers.json", { cache: "no-cache" })
  .then(r => r.json())
  .then(data => {
    EVOLUTION_DATA = data;
    console.log("Glaciers chargés :", Object.keys(EVOLUTION_DATA).length);

    const select = document.getElementById("glacier");
    select.innerHTML = '<option value="">Sélectionne un glacier</option>';

    Object.keys(EVOLUTION_DATA).forEach(rgi => {
      const opt = document.createElement("option");
      opt.value = rgi;
      opt.textContent = EVOLUTION_DATA[rgi].title;
      select.appendChild(opt);
    });
  })
  .catch(err => console.error("Erreur chargement glaciers :", err));


// ===============================
// 2) Facteurs d’émission
// ===============================

const EMISSION_FACTORS = {
  voiture: 0.20,
  avion: 0.15,
  train: 0.01
};


// ===============================
// 3) Calcul
// ===============================

document.getElementById("btnCalc").addEventListener("click", () => {

  const profile = document.getElementById("profile").value;
  const transport = document.getElementById("transport").value;
  const distance = parseFloat(document.getElementById("distance").value);
  const rgi = document.getElementById("glacier").value;

  if (!rgi) {
    document.getElementById("outDetails").textContent = "Choisis un glacier.";
    return;
  }

  if (!isFinite(distance) || distance <= 0) {
    document.getElementById("outDetails").textContent = "Distance invalide.";
    return;
  }

  const glacier = EVOLUTION_DATA[rgi];
  if (!glacier) {
    document.getElementById("outDetails").textContent = "Données glacier introuvables.";
    return;
  }

  const factor = EMISSION_FACTORS[transport] ?? 0.20;
  const kgCO2 = distance * factor;
  const tonnes = kgCO2 / 1000;

  const joursFonte = tonnes * 1;   // pédagogique
  const m2Impact = tonnes * 1;     // pédagogique

  // ⚠️ IMPORTANT : ton HTML utilise outCo2 (pas outCO2)
  document.getElementById("outCo2").textContent = kgCO2.toFixed(1);
  document.getElementById("outDays").textContent = joursFonte.toFixed(1);
  document.getElementById("outM2").textContent = m2Impact.toFixed(1);

  document.getElementById("outDetails").textContent =
    `Trajet ${distance} km en ${transport}. Glacier : ${glacier.title}.`;
});


// ===============================
// 4) Réinitialisation
// ===============================

document.getElementById("btnReset").addEventListener("click", () => {
  document.getElementById("profile").value = "habitant";
  document.getElementById("transport").value = "voiture";
  document.getElementById("distance").value = 200;
  document.getElementById("glacier").value = "";

  document.getElementById("outCo2").textContent = "-";
  document.getElementById("outDays").textContent = "-";
  document.getElementById("outM2").textContent = "-";
  document.getElementById("outDetails").textContent =
    'Sélectionne un glacier puis clique sur "Calculer".';
});


// ===============================
// 5) Distance automatique selon profil
// ===============================

document.getElementById("profile").addEventListener("change", () => {
  const p = document.getElementById("profile").value;
  document.getElementById("distance").value = (p === "touriste") ? 400 : 20;
});
