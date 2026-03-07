const ANIMAUX = [
  {
    id: 1,
    nom: "Lagopède alpin",
    image: "./faune-img/lagopede.jpg",
    statut: "Vulnérable",
    altitude: "1800-3000 m",
    menaces: "Fonte de la neige, réchauffement",
    description: "Oiseau emblématique des hautes altitudes dépendant des zones enneigées."
  },
  {
    id: 2,
    nom: "Papillon Apollon",
    image: "./faune-img/apollon.jpg",
    statut: "En danger",
    altitude: "1000-2000 m",
    menaces: "Perte de plantes hôtes, réchauffement",
    description: "Papillon de montagne très sensible aux changements de température."
  },
  {
    id: 3,
    nom: "Marmotte alpine",
    image: "./faune-img/marmotte.jpg",
    statut: "Préoccupation mineure",
    altitude: "1200-2500 m",
    menaces: "Hivers plus courts, dérangement",
    description: "Rongeur bien connu des alpages dépendant d'un cycle saisonnier stable."
  },
  {
    id: 4,
    nom: "Bouquetin des Alpes",
    image: "./faune-img/bouquetin.jpg",
    statut: "Préoccupation mineure",
    altitude: "1600-3200 m",
    menaces: "Dérangement touristique, changement d'habitat",
    description: "Grand herbivore emblématique des Alpes réintroduit avec succès."
  },
  {
    id: 5,
    nom: "Chamois",
    image: "./faune-img/chamois.jpg",
    statut: "Préoccupation mineure",
    altitude: "800-3000 m",
    menaces: "Dérangement humain, maladies",
    description: "Caprin agile des montagnes alpines capable de se déplacer sur des pentes abruptes."
  },
  {
    id: 6,
    nom: "Gypaète barbu",
    image: "./faune-img/gypaete.jpg",
    statut: "Quasi menacé",
    altitude: "1500-3000 m",
    menaces: "Empoisonnement, perturbation des falaises",
    description: "Grand rapace réintroduit dans les Alpes, surnommé le casseur d'os."
  },
  {
    id: 7,
    nom: "Lièvre variable",
    image: "./faune-img/lievre.jpg",
    statut: "Vulnérable",
    altitude: "1200-3000 m",
    menaces: "Réduction de la neige, changement climatique",
    description: "Lièvre de montagne dont le pelage change de couleur selon les saisons."
  },
  {
    id: 8,
    nom: "Tétras lyre",
    image: "./faune-img/tetras.jpg",
    statut: "Vulnérable",
    altitude: "1500-2400 m",
    menaces: "Stations de ski, dérangement humain",
    description: "Oiseau discret des forêts subalpines très sensible aux perturbations."
  },
  {
    nom: "Lynx boréal",
    image: "faune-img/lynx.jpg",
    statut: "Quasi menacé",
    altitude: "500–2000 m",
    menaces: "Fragmentation de l'habitat, braconnage",
    description: "Grand félin discret des forêts alpines, très rare à observer."
  },
  {
   nom: "Loup gris",
   image: "faune-img/loup.jpg",
   statut: "Préoccupation mineure",
   altitude: "500–2500 m",
   menaces: "Conflits avec l’élevage, fragmentation de l’habitat",
   description: "Grand prédateur revenu naturellement dans les Alpes depuis l’Italie dans les années 1990."
  },
  {
  nom: "Aigle royal",
  image: "faune-img/aigle.jpg",
  statut: "Préoccupation mineure",
  altitude: "800–3000 m",
  menaces: "Dérangement humain, collisions",
  description: "Grand rapace emblématique des montagnes alpines capable de planer sur de longues distances."
  },
  {
  nom: "Crave à bec rouge",
  image: "faune-img/crave.jpg",
  statut: "Préoccupation mineure",
  altitude: "1500–3500 m",
  menaces: "Changement climatique, perturbation touristique",
  description: "Oiseau montagnard très agile reconnaissable à son bec rouge et à ses acrobaties en vol."
  },

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
