package com.groupeisi.ms_matiere.dto;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Builder;
import lombok.Data;

@XmlRootElement(name = "MatiereDto")
@Data
@Builder
public class MatiereDto {
    private Long id;
    private String nom;
}
