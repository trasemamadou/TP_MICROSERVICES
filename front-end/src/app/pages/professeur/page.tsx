"use client";

import { useState, useEffect } from "react";

interface Professeur {
  id: number;
  prenom: string;
  nom: string;
  telephone: string;
}

export default function ProfesseurPages() {
  const [professeurs, setProfesseurs] = useState<Professeur[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Professeur>>({
    id: 0,
    prenom: "",
    nom: "",
    telephone: "",
  });

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const fetchProfesseurs = async () => {
    const response = await fetch("http://localhost:8084/professeurs");
    const data = await response.json();
    setProfesseurs(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Voulez-vous vraiment supprimer ce professeur ?")) {
      await fetch(`http://localhost:8084/professeurs/${id}`, {
        method: "DELETE",
      });
      fetchProfesseurs();
    }
  };

  const handleOpenModal = (professeur?: Professeur) => {
    setIsEditing(!!professeur);
    setFormData(
      professeur
        ? { ...professeur }
        : { id: 0, prenom: "", nom: "", telephone: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: 0, prenom: "", nom: "", telephone: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const method = isEditing ? "PUT" : "POST"; // Si on est en mode édition, on utilise PUT, sinon POST
      const url = isEditing
        ? `http://localhost:8084/professeurs/${formData.id}` // URL pour mise à jour
        : "http://localhost:8084/professeurs"; // URL pour création
  
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || "Une erreur s'est produite."}`);
        return;
      }
  
      fetchProfesseurs(); // Recharge la liste des professeurs
      handleCloseModal(); // Ferme le modal
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
      <h1>Liste des professeurs</h1>
      <button onClick={() => handleOpenModal()}>Nouveau professeur</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professeurs.map((professeur) => (
            <tr key={professeur.id}>
              <td>{professeur.id}</td>
              <td>{professeur.nom}</td>
              <td>{professeur.prenom}</td>
              <td>{professeur.telephone}</td>
              <td>
                <button onClick={() => handleDelete(professeur.id)}>Supprimer</button>
                <button onClick={() => handleOpenModal(professeur)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? "Modifier le professeur" : "Ajouter un professeur"}</h2>
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
                Téléphone:
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone || ""}
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
          background-color: #f8f9fa;
          padding: 10px 20px;
          margin-bottom: 20px;
        }
        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 15px;
        }
        nav ul li a {
          text-decoration: none;
          color: #007bff;
          font-weight: bold;
        }
        nav ul li a:hover {
          text-decoration: underline;
        }
        h1 {
          text-align: center;
        }
        .new-class-btn {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 5px;
          cursor: pointer;
        }
        .new-class-btn:hover {
          background-color: #218838;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background-color: #c82333;
        }
        .edit-btn {
          background-color: #ffc107;
          color: black;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .edit-btn:hover {
          background-color: #e0a800;
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
          width: 90%;
          max-width: 500px;
        }
        .submit-btn {
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background-color: #0056b3;
        }
        .close-btn {
          background-color: #6c757d;
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          margin-left: 10px;
          cursor: pointer;
        }
        .close-btn:hover {
          background-color: #5a6268;
        }
      `}</style>
    </div>
  );
}
