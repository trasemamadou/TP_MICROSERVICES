package com.groupeisi.ms_matiere.soap.response;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Builder;
import lombok.Data;

@XmlRootElement(name = "CreateMatiereResponse")
@XmlAccessorType(XmlAccessType.FIELD)
@Data
@Builder
public class CreateMatiereResponse {
    private Long id;
    private String nom;
}
