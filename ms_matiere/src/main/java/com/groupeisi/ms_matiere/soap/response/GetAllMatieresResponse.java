package com.groupeisi.ms_matiere.soap.response;

import com.groupeisi.ms_matiere.dto.MatiereDto;
import jakarta.xml.bind.annotation.XmlRootElement;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@XmlRootElement(name = "GetAllMatieresResponse")
@Data
@Builder
public class GetAllMatieresResponse {
    private List<MatiereDto> matieres;
}
