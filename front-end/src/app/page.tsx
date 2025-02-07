"use client";

import { useState, useEffect } from "react";

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  birthday: string;
}

export default function Home() {
  const [etudiants, setEtudiants] = useState<Etudiant[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Etudiant>>({
    id: 0,
    nom: "",
    prenom: "",
    birthday: "",
  });

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const fetchEtudiants = async () => {
    const response = await fetch("http://localhost:8081/etudiants");
    const data = await response.json();
    setEtudiants(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      await fetch(`http://localhost:8081/etudiants/${id}`, {
        method: "DELETE",
      });
      fetchEtudiants();
    }
  };

  const handleOpenModal = (etudiant?: Etudiant) => {
    setIsEditing(!!etudiant);
    setFormData(
      etudiant
        ? { ...etudiant }
        : { id: 0, nom: "", prenom: "", birthday: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: 0, nom: "", prenom: "", birthday: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8081/etudiants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Une erreur s'est produite."}`);
        return;
      }
  
      fetchEtudiants();
      handleCloseModal();
    } catch (error) {
      alert("Erreur de connexion au serveur.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      {/* Navigation Menu */}
      <nav>
        <ul>
          <li><a href="/pages/etudiant">Étudiant</a></li>
          <li><a href="/pages/professeur">Professeur</a></li>
          <li><a href="/pages/classe">Classe</a></li>
          <li><a href="/pages/matiere">Matière</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <h1>Liste des étudiants</h1>
      <button onClick={() => handleOpenModal()}>Nouveau étudiant</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etudiant) => (
            <tr key={etudiant.id}>
              <td>{etudiant.id}</td>
              <td>{etudiant.nom}</td>
              <td>{etudiant.prenom}</td>
              <td>{new Date(etudiant.birthday).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleDelete(etudiant.id)}>Supprimer</button>
                <button onClick={() => handleOpenModal(etudiant)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? "Modifier l'étudiant" : "Ajouter un étudiant"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Nom:
                <input
                  type="text"
                  name="nom"
                  value={formData.nom || ""}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Prénom:
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom || ""}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date de Naissance:
                <input
                  type="date"
                  name="birthday"
                  value={formData.birthday || ""}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">{isEditing ? "Mettre à jour" : "Valider"}</button>
              <button type="button" onClick={handleCloseModal}>Fermer</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        nav {
          background-color: #f4f4f4;
          padding: 10px 20px;
          margin-bottom: 20px;
        }
        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 20px;
        }
        nav ul li {
          display: inline;
        }
        nav ul li a {
          text-decoration: none;
          color: #333;
          font-weight: bold;
        }
        nav ul li a:hover {
          text-decoration: underline;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 100%;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
