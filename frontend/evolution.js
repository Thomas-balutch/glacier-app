fetch("evolution_glaciers.json")
  .then(r => r.json())
  .then(d => {
    window.glacierEvolution = d;
    console.log("✅ Evolution chargée", Object.keys(d));
  })
  .catch(err => {
    console.error("❌ Erreur chargement evolution", err);
  });
