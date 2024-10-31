const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const Screenshot = require("../models/Screenshot");

const outputDir = path.join(__dirname, "../uploads");

// Fonction pour valider l'URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const generateScreenshot = async (req, res) => {
  const { url } = req.body;

  // Validation de l'URL
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "URL invalide" });
  }

  const timestamp = Date.now();
  const screenshotPath = path.join(outputDir, `screenshot-${timestamp}.png`);

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.screenshot({ path: screenshotPath });
    await browser.close();

    // Sauvegarder la capture dans MongoDB
    const screenshot = new Screenshot({
      url: url,
      path: screenshotPath,
    });
    await screenshot.save(); // Assurez-vous que cette ligne est bien exécutée

    // Envoyer l'URL de la capture générée
    res.json({
      screenshotUrl: `http://localhost:5001/uploads/screenshot-${timestamp}.png`,
    });
  } catch (error) {
    console.error("Erreur de capture :", error);
    res.status(500).json({ error: "Erreur lors de la capture d’écran" });
  }
};

module.exports = { generateScreenshot };
