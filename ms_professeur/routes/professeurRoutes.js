const express = require('express');
const Professeur = require('../models/professeurModel');

const router = express.Router();

// Créer un professeur
router.post('/', (req, res) => {
    Professeur.create(req.body, (err, result) => {
        if (err) throw err;
        res.status(201).send({ message: 'Professeur ajouté', id: result.insertId });
    });
});

// Lire tous les professeurs
router.get('/', (req, res) => {
    Professeur.findAll((err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Lire un professeur par ID
router.get('/:id', (req, res) => {
    Professeur.findById(req.params.id, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            res.status(404).send({ message: 'Professeur non trouvé' });
        } else {
            res.send(result[0]);
        }
    });
});

// Mettre à jour un professeur
router.put('/:id', (req, res) => {
    Professeur.update(req.params.id, req.body, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Professeur non trouvé' });
        } else {
            res.send({ message: 'Professeur mis à jour' });
        }
    });
});

// Supprimer un professeur
router.delete('/:id', (req, res) => {
    Professeur.delete(req.params.id, (err, result) => {
        if (err) throw err;
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Professeur non trouvé' });
        } else {
            res.send({ message: 'Professeur supprimé' });
        }
    });
});

module.exports = router;
