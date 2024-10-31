import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateScreenshot = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/generate-screenshot",
        { url }
      );
      setScreenshotUrl(response.data.screenshotUrl);
    } catch (error) {
      console.error(
        "Erreur lors de la génération de la capture d’écran:",
        error
      );
      setError("Erreur lors de la génération de la capture d’écran");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Générateur de Capture d'Écran</h1>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Entrez l'URL du site"
        style={{ width: "300px" }}
      />
      <button onClick={handleGenerateScreenshot} disabled={loading || !url}>
        {loading ? "Génération en cours..." : "Générer Capture"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {screenshotUrl && (
        <div>
          <h2>Capture d'écran :</h2>
          <img
            src={screenshotUrl}
            alt="Capture d'écran"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
