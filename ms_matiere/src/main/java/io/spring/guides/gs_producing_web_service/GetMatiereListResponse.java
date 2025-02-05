package io.spring.guides.gs_producing_web_service;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;
import java.util.List;

/**
 * <p>Classe Java pour la réponse contenant une liste de matières.</p>
 *
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="matiere" type="{http://spring.io/guides/gs-producing-web-service}Matiere" maxOccurs="unbounded"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
        "matieres"
})
@XmlRootElement(name = "GetMatiereListResponse")
public class GetMatiereListResponse {

    @XmlElement(name = "matiere", required = true)
    private List<Matiere> matieres;

    /**
     * Obtient la liste des matières.
     *
     * @return liste des matières
     */
    public List<Matiere> getMatieres() {
        return matieres;
    }

    /**
     * Définit la liste des matières.
     *
     * @param matieres la liste des matières
     */
    public void setMatieres(List<Matiere> matieres) {
        this.matieres = matieres;
    }
}
