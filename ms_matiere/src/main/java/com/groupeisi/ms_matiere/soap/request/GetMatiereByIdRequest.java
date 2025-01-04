package com.groupeisi.ms_matiere.soap.request;

import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Data;

@XmlRootElement(name = "GetMatiereByIdRequest")
@Data
public class GetMatiereByIdRequest {
    private Long id;
}
