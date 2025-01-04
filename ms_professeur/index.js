const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const professeurRoutes = require('./routes/professeurRoutes');
const app = express();
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
app.use('/professeurs', professeurRoutes); 
// Port d'écoute
const PORT = 8084;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
