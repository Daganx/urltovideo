// backend/server.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const connectDB = require("./config/db");
const screenshotRoutes = require("./routes/ScreenshotRoutes");

const app = express();
const PORT = 5001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connexion à MongoDB
connectDB();

// Créer le dossier pour les captures
const outputDir = path.join(__dirname, "uploads");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

// Utiliser les routes
app.use("/api", screenshotRoutes);

// Démarrage du serveur
app.listen(PORT, () =>
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`)
);
