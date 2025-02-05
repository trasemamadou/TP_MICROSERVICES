"use client";

import { useState, useEffect } from "react";

interface Classe {
  id: string;
  nom: string;
  niveau: string;
}

export default function ClassePage() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Classe>>({
    id: "",
    nom: "",
    niveau: "",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const query = `
      query {
        getClasses {
          id
          nom
          niveau
        }
      }
    `;
    const response = await fetch("http://localhost:8083/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    setClasses(result.data.getClasses);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette classe ?")) {
      const mutation = `
        mutation {
          deleteClasse(id: "${id}")
        }
      `;
      await fetch("http://localhost:8083/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation }),
      });
      fetchClasses();
    }
  };

  const handleOpenModal = (classe?: Classe) => {
    setIsEditing(!!classe);
    setFormData(classe ? { ...classe } : { id: "", nom: "", niveau: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", nom: "", niveau: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, nom, niveau } = formData;

    const mutation = isEditing
      ? `
        mutation {
          updateClasse(id: "${id}", nom: "${nom}", niveau: "${niveau}") {
            id
            nom
            niveau
          }
        }
      `
      : `
        mutation {
          createClasse(nom: "${nom}", niveau: "${niveau}") {
            id
            nom
            niveau
          }
        }
      `;

    await fetch("http://localhost:8083/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation }),
    });

    fetchClasses();
    handleCloseModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/pages/etudiant">Étudiant</a></li>
          <li><a href="/pages/professeur">Professeur</a></li>
          <li><a href="/pages/classe">Classe</a></li>
          <li><a href="/pages/matiere">Matière</a></li>
        </ul>
      </nav>

      <h1>Liste des classes</h1>
      <button className="new-class-btn" onClick={() => handleOpenModal()}>Nouvelle classe</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id}>
              <td>{classe.id}</td>
              <td>{classe.nom}</td>
              <td>{classe.niveau}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(classe.id)}>Supprimer</button>
                <button className="edit-btn" onClick={() => handleOpenModal(classe)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditing ? "Modifier la classe" : "Ajouter une classe"}</h2>
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
                Niveau:
                <input
                  type="text"
                  name="niveau"
                  value={formData.niveau || ""}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit" className="submit-btn">{isEditing ? "Mettre à jour" : "Valider"}</button>
              <button type="button" onClick={handleCloseModal} className="close-btn">Fermer</button>
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
