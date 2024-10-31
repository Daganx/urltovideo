const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/urltovideo");
    console.log("Connexion à MongoDB réussie !");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB :", err);
  }
};

module.exports = connectDB;
