CREATE DATABASE professeur_db;
USE professeur_db;

CREATE TABLE professeurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(255) NOT NULL,
    nom VARCHAR(255) NOT NULL,
    telephone VARCHAR(15) NOT NULL
);
