import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        birthday: '',
    });

    const API_URL = 'http://localhost:8081/etudiants'; // URL de l'API Spring Boot

    // Récupérer la liste des étudiants
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get(API_URL);
            setStudents(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des étudiants:', error);
        }
    };

    // Ajouter un étudiant
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, formData);
            fetchStudents(); // Recharger les étudiants après l'ajout
            setShowModal(false);
        } catch (error) {
            console.error('Erreur lors de la création de l\'étudiant:', error);
        }
    };

    // Modifier un étudiant
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}/${selectedStudent.id}`, formData);
            fetchStudents(); // Recharger les étudiants après la mise à jour
            setShowModal(false);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'étudiant:', error);
        }
    };

    // Supprimer un étudiant
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchStudents(); // Recharger les étudiants après la suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'étudiant:', error);
        }
    };

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gérer l'ouverture du modal pour ajout ou modification
    const handleEdit = (student) => {
        setSelectedStudent(student);
        setFormData({
            prenom: student.prenom,
            nom: student.nom,
            birthday: student.birthday,
        });
        setShowModal(true);
    };

    return (
        <div>
            <h1>Gestion des étudiants</h1>

            <button onClick={() => setShowModal(true)}>Nouveau Etudiant</button>

            <table>
                <thead>
                    <tr>
                        <th>Prénom</th>
                        <th>Nom</th>
                        <th>Date de naissance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.prenom}</td>
                            <td>{student.nom}</td>
                            <td>{new Date(student.birthday).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(student)}>Modifier</button>
                                <button onClick={() => handleDelete(student.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal pour l'ajout ou la modification */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>{selectedStudent ? 'Modifier l\'étudiant' : 'Ajouter un étudiant'}</h2>
                        <form onSubmit={selectedStudent ? handleUpdate : handleCreate}>
                            <label>
                                Prénom:
                                <input
                                    type="text"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Nom:
                                <input
                                    type="text"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Date de naissance:
                                <input
                                    type="date"
                                    name="birthday"
                                    value={formData.birthday}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <button type="submit">{selectedStudent ? 'Mettre à jour' : 'Ajouter'}</button>
                            <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
