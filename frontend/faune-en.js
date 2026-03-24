const ANIMAUX = [

{
id:1,
nom:"Rock ptarmigan",
image:"./faune-img/lagopede.jpg",
statut:"Vulnerable",
altitude:"1800–3000 m",
menaces:"Loss of snow cover, climate change",
description:"Iconic bird of high alpine environments dependent on snowy habitats."
},

{
id:2,
nom:"Apollo butterfly",
image:"./faune-img/apollon.jpg",
statut:"Endangered",
altitude:"1000–2000 m",
menaces:"Loss of host plants, climate change",
description:"Mountain butterfly highly sensitive to temperature variations."
},

{
id:3,
nom:"Alpine marmot",
image:"./faune-img/marmotte.jpg",
statut:"Least concern",
altitude:"1200–2500 m",
menaces:"Shorter winters, human disturbance",
description:"Well-known alpine rodent living in mountain meadows and depending on stable seasonal cycles."
},

{
id:4,
nom:"Alpine ibex",
image:"./faune-img/bouquetin.jpg",
statut:"Least concern",
altitude:"1600–3200 m",
menaces:"Tourism disturbance, habitat change",
description:"Large alpine herbivore successfully reintroduced in the Alps during the twentieth century."
},

{
id:5,
nom:"Chamois",
image:"./faune-img/chamois.jpg",
statut:"Least concern",
altitude:"800–3000 m",
menaces:"Human disturbance, diseases",
description:"Agile mountain ungulate able to move easily across steep alpine slopes."
},

{
id:6,
nom:"Bearded vulture",
image:"./faune-img/gypaete.jpg",
statut:"Near threatened",
altitude:"1500–3000 m",
menaces:"Poisoning, disturbance of nesting cliffs",
description:"Large scavenger raptor reintroduced in the Alps, also known as the bone-breaker."
},

{
id:7,
nom:"Mountain hare",
image:"./faune-img/lievre.jpg",
statut:"Vulnerable",
altitude:"1200–3000 m",
menaces:"Reduction of snow cover, climate change",
description:"Mountain hare whose coat changes colour depending on the season."
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
id:9,
nom:"Eurasian lynx",
image:"faune-img/lynx.jpg",
statut:"Near threatened",
altitude:"500–2000 m",
menaces:"Habitat fragmentation, poaching",
description:"Large elusive feline of alpine forests, rarely observed."
},

{
id:10,
nom:"Gray wolf",
image:"faune-img/loup.jpg",
statut:"Least concern",
altitude:"500–2500 m",
menaces:"Conflicts with livestock, habitat fragmentation",
description:"Large predator that naturally returned to the Alps from Italy in the 1990s."
},

{
id:11,
nom:"Golden eagle",
image:"faune-img/aigle.jpg",
statut:"Least concern",
altitude:"800–3000 m",
menaces:"Human disturbance, collisions",
description:"Iconic alpine raptor capable of soaring over long distances."
},

{
id:12,
nom:"Red-billed chough",
image:"faune-img/crave.jpg",
statut:"Least concern",
altitude:"1500–3500 m",
menaces:"Climate change, tourism disturbance",
description:"Mountain bird easily recognized by its red bill and agile flight."
}

];

function $(id) { return document.getElementById(id); }

// --- DISPLAY CARDS ---
document.addEventListener("DOMContentLoaded", () => {

const grid = $("faune-grid");
const detail = $("faune-detail");

grid.innerHTML = ANIMAUX.map(a => `
<div class="card faune-card" data-id="${a.id}">
<img src="${a.image}" alt="${a.nom}" class="faune-photo">
<h2>${a.nom}</h2>
<p><strong>Status:</strong> ${a.statut}</p>
<p><strong>Altitude:</strong> ${a.altitude}</p>
<p><strong>Main threats:</strong> ${a.menaces}</p>
<p class="muted">${a.description}</p>
</div>
`).join("");

// --- DETAIL VIEW ---
grid.addEventListener("click", (e) => {

const card = e.target.closest(".faune-card");
if (!card) return;

const animal = ANIMAUX.find(a => a.id == card.dataset.id);
if (!animal) return;

detail.style.display = "block";
detail.innerHTML = `
<h2>${animal.nom}</h2>
<img src="${animal.image}" class="faune-photo">
<p><strong>Status:</strong> ${animal.statut}</p>
<p><strong>Altitude:</strong> ${animal.altitude}</p>
<p><strong>Main threats:</strong> ${animal.menaces}</p>
<p>${animal.description}</p>
`;

});

});

// --- IMAGE ZOOM ---
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

document.addEventListener("click", (e) => {

if (e.target.classList.contains("faune-photo")) {
zoomImg.src = e.target.src;
overlay.classList.remove("zoom-hidden");
}

});

overlay.addEventListener("click", () => {
overlay.classList.add("zoom-hidden");
});
