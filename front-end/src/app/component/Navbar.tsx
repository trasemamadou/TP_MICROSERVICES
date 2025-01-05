import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#f0f0f0" }}>
      <Link to="/">Étudiant</Link>
      <Link to="/professeur">Professeur</Link>
      <Link to="/classe">Classe</Link>
      <Link to="/matiere">Matière</Link>
    </nav>
  );
}
