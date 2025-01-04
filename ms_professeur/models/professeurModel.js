const db = require('../config/db');

const Professeur = {
    create: (data, callback) => {
        const query = 'INSERT INTO professeurs (prenom, nom, telephone) VALUES (?, ?, ?)';
        db.query(query, [data.prenom, data.nom, data.telephone], callback);
    },
    findAll: (callback) => {
        const query = 'SELECT * FROM professeurs';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM professeurs WHERE id = ?';
        db.query(query, [id], callback);
    },
    update: (id, data, callback) => {
        const query = 'UPDATE professeurs SET prenom = ?, nom = ?, telephone = ? WHERE id = ?';
        db.query(query, [data.prenom, data.nom, data.telephone, id], callback);
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM professeurs WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = Professeur;
