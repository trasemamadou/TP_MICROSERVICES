const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');  // Ajout de l'importation de cors
const professeurRoutes = require('./routes/professeurRoutes');
const app = express();

// Utilisation de CORS
app.use(cors({
    origin: 'http://localhost:3000'  // Autoriser uniquement ce domaine
}));

// Middleware pour le parsing du JSON
app.use(bodyParser.json());

// Configuration de la connexion MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'professeur_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL');
});

// Utilisation des routes pour les professeurs
app.use('/professeurs', professeurRoutes); 

// Port d'écoute
const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
