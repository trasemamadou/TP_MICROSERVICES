package com.groupeisi.ms_matiere.soap.request;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@XmlRootElement(name = "UpdateMatiereRequest")
@Data
public class UpdateMatiereRequest {
    private Long id;
    private String nom;
}
