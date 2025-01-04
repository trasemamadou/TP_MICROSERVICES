package com.groupeisi.ms_matiere.soap.request;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@XmlRootElement(name = "DeleteMatiereRequest")
@Data
public class DeleteMatiereRequest {
    private Long id;
}
