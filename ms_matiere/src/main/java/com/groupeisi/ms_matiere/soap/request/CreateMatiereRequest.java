package com.groupeisi.ms_matiere.soap.request;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@XmlRootElement(name = "CreateMatiereRequest")
@XmlAccessorType(XmlAccessType.FIELD)
@Data
public class CreateMatiereRequest {
    private String nom;
}
