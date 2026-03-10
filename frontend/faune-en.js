  const ANIMAUX = [

{
id:1,
nom:"Alpine ptarmigan",
image:"./faune-img/lagopede.jpg",
statut:"Vulnerable",
altitude:"1800–3000 m",
menaces:"Snow loss, climate warming",
description:"Iconic bird of high alpine environments dependent on snowy habitats."
},

{
id:2,
nom:"Apollo butterfly",
image:"./faune-img/apollon.jpg",
statut:"Endangered",
altitude:"1000–2000 m",
menaces:"Loss of host plants, climate warming",
description:"Mountain butterfly highly sensitive to temperature changes."
},

{
id:3,
nom:"Alpine marmot",
image:"./faune-img/marmotte.jpg",
statut:"Least concern",
altitude:"1200–2500 m",
menaces:"Shorter winters, human disturbance",
description:"Well-known alpine rodent living in mountain meadows and dependent on stable seasonal cycles."
},

{
id:4,
nom:"Alpine ibex",
image:"./faune-img/bouquetin.jpg",
statut:"Least concern",
altitude:"1600–3200 m",
menaces:"Tourism disturbance, habitat change",
description:"Large alpine herbivore successfully reintroduced in the Alps."
},

{
id:5,
nom:"Chamois",
image:"./faune-img/chamois.jpg",
statut:"Least concern",
altitude:"800–3000 m",
menaces:"Human disturbance, diseases",
description:"Agile mountain ungulate able to move easily on steep alpine slopes."
},

{
id:6,
nom:"Bearded vulture",
image:"./faune-img/gypaete.jpg",
statut:"Near threatened",
altitude:"1500–3000 m",
menaces:"Poisoning, cliff disturbance",
description:"Large raptor reintroduced in the Alps, also known as the bone-breaker."
},

{
id:7,
nom:"Mountain hare",
image:"./faune-img/lievre.jpg",
statut:"Vulnerable",
altitude:"1200–3000 m",
menaces:"Reduced snow cover, climate change",
description:"Mountain hare whose coat changes color according to the seasons."
},

{
id:8,
nom:"Black grouse",
image:"./faune-img/tetras.jpg",
statut:"Vulnerable",
altitude:"1500–2400 m",
menaces:"Ski resorts, human disturbance",
description:"Discrete bird of subalpine forests highly sensitive to disturbance."
},

{
nom:"Eurasian lynx",
image:"faune-img/lynx.jpg",
statut:"Near threatened",
altitude:"500–2000 m",
menaces:"Habitat fragmentation, poaching",
description:"Large elusive feline of alpine forests, rarely observed."
},

{
nom:"Gray wolf",
image:"faune-img/loup.jpg",
statut:"Least concern",
altitude:"500–2500 m",
menaces:"Conflicts with livestock, habitat fragmentation",
description:"Large predator that naturally returned to the Alps from Italy in the 1990s."
},

{
nom:"Golden eagle",
image:"faune-img/aigle.jpg",
statut:"Least concern",
altitude:"800–3000 m",
menaces:"Human disturbance, collisions",
description:"Iconic alpine raptor capable of soaring over long distances."
},

{
nom:"Red-billed chough",
image:"faune-img/crave.jpg",
statut:"Least concern",
altitude:"1500–3500 m",
menaces:"Climate change, tourism disturbance",
description:"Mountain bird easily recognized by its red beak and agile flight."
}

];

function $(id) { return document.getElementById(id); }

// --- AFFICHAGE DES CARTES ---
document.addEventListener("DOMContentLoaded", () => {
  const grid = $("faune-grid");
  const detail = $("faune-detail");

  grid.innerHTML = ANIMAUX.map(a => `
    <div class="card faune-card" data-id="${a.id}">
      <img src="${a.image}" alt="${a.nom}" class="faune-photo">
      <h2>${a.nom}</h2>
      <p><strong>Statut :</strong> ${a.statut}</p>
      <p><strong>Altitude :</strong> ${a.altitude}</p>
      <p><strong>Menaces :</strong> ${a.menaces}</p>
      <p class="muted">${a.description}</p>
    </div>
  `).join("");

  // --- AFFICHAGE DU DÉTAIL ---
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".faune-card");
    if (!card) return;

    const animal = ANIMAUX.find(a => a.id == card.dataset.id);
    if (!animal) return;

    detail.style.display = "block";
    detail.innerHTML = `
      <h2>${animal.nom}</h2>
      <img src="${animal.image}" class="faune-photo">
      <p><strong>Statut :</strong> ${animal.statut}</p>
      <p><strong>Altitude :</strong> ${animal.altitude}</p>
      <p><strong>Menaces principales :</strong> ${animal.menaces}</p>
      <p>${animal.description}</p>
    `;
  });
});

// --- ZOOM IMAGE ---
const overlay = document.getElementById("zoom-overlay");
const zoomImg = document.getElementById("zoom-img");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("faune-photo")) {
    zoomImg.src = e.target.src;
    overlay.style.display = "flex";
  }
});

overlay.addEventListener("click", () => {
  overlay.style.display = "none";
});

// clic sur une image
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("faune-photo")) {
    zoomImg.src = e.target.src;
    overlay.classList.remove("zoom-hidden");
  }
});

// clic pour fermer
overlay.addEventListener("click", () => {
  overlay.classList.add("zoom-hidden");
});
