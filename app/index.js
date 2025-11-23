const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello Kubernetes!');
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à MySQL réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion :", error);
  }
})();

// Endpoint simple
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate(); // test rapide à chaque requête
    res.send("✅ Serveur Express en marche et MySQL connecté !");
  } catch (error) {
    res.status(500).send("❌ Impossible de se connecter à MySQL");
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});