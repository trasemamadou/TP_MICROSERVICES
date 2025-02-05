"use client"
import { useState, useEffect } from "react";
import axios from "axios";

interface Matiere {
  id: string;
  nom: string;
}

export default function MatierePage() {
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Matiere>>({
    id: "",
    nom: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatieres();
  }, []);

  const fetchMatieres = async () => {
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:gs="http://spring.io/guides/gs-producing-web-service">
        <soapenv:Header/>
        <soapenv:Body>
          <gs:GetMatiereListRequest/>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post("/api/ws/matiere", soapRequest, {
        headers: {
          "Content-Type": "text/xml",
        },
        withCredentials: true,
      });
  
      console.log("Réponse SOAP brute :", response.data);
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
  
      // Extraction des données en tenant compte de l'espace de noms `ns2`
      const matieres = Array.from(
        xmlDoc.getElementsByTagName("ns2:matiere")
      ).map((matiereNode) => ({
        id: matiereNode.getElementsByTagName("ns2:id")[0]?.textContent || "Inconnu",
        nom: matiereNode.getElementsByTagName("ns2:nom")[0]?.textContent || "Inconnu",
      }));
  
      setMatieres(matieres);
    } catch (error) {
      console.error("Erreur lors de la récupération des matières :", error);
      setError("Impossible de récupérer la liste des matières.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette matière ?")) {
      const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                          xmlns:gs="http://spring.io/guides/gs-producing-web-service">
          <soapenv:Header/>
          <soapenv:Body>
            <gs:DeleteMatiereRequest>
              <gs:id>${id}</gs:id>
            </gs:DeleteMatiereRequest>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

      try {
        await axios.post("/api/ws/matiere", soapRequest, {
          headers: {
            "Content-Type": "text/xml",
          },
        });
        fetchMatieres();
      } catch (error) {
        console.error("Erreur lors de la suppression de la matière :", error);
      }
    }
  };

  const handleOpenModal = (matiere?: Matiere) => {
    setIsEditing(!!matiere);
    setFormData(matiere ? { ...matiere } : { id: "", nom: "" });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ id: "", nom: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { id, nom } = formData;

    const soapRequest = isEditing
      ? `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                          xmlns:gs="http://spring.io/guides/gs-producing-web-service">
          <soapenv:Header/>
          <soapenv:Body>
            <gs:UpdateMatiereRequest>
              <gs:id>${id}</gs:id>
              <gs:nom>${nom}</gs:nom>
            </gs:UpdateMatiereRequest>
          </soapenv:Body>
        </soapenv:Envelope>
      `
      : `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
                          xmlns:gs="http://spring.io/guides/gs-producing-web-service">
          <soapenv:Header/>
          <soapenv:Body>
            <gs:CreateMatiereRequest>
              <gs:nom>${nom}</gs:nom>
            </gs:CreateMatiereRequest>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

    try {
      await axios.post("/api/ws/matiere", soapRequest, {
        headers: {
          "Content-Type": "text/xml",
        },
      });
      fetchMatieres();
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la matière :", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Liste des matières</h1>

      {loading && <p className="text-center text-info">Chargement en cours...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      <nav>
        <ul>
          <li><a href="/pages/etudiant">Étudiant</a></li>
          <li><a href="/pages/professeur">Professeur</a></li>
          <li><a href="/pages/classe">Classe</a></li>
          <li><a href="/pages/matiere">Matière</a></li>
        </ul>
      </nav>

      <button className="btn btn-primary mb-3" onClick={() => handleOpenModal()}>
        Nouvelle matière
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((matiere) => (
            <tr key={matiere.id}>
              <td>{matiere.id}</td>
              <td>{matiere.nom}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(matiere.id)}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleOpenModal(matiere)}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Modifier la matière" : "Ajouter une matière"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom || ""}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? "Mettre à jour" : "Valider"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Fermer
                  </button>
                </div>
              </form>
            </div>
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
