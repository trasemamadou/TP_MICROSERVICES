package com.groupeisi.ms_matiere.soap.response;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Builder;
import lombok.Data;

@XmlRootElement(name = "GetMatiereByIdResponse")
@Data
@Builder
public class GetMatiereByIdResponse {
    private Long id;
    private String nom;
}
