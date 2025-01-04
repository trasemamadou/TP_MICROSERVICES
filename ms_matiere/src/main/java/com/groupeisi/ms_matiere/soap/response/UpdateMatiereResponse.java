package com.groupeisi.ms_matiere.soap.response;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Builder;
import lombok.Data;

@XmlRootElement(name = "UpdateMatiereResponse")
@Data
@Builder
public class UpdateMatiereResponse {
    private Long id;
    private String nom;
}
