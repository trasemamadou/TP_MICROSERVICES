package com.groupeisi.ms_matiere.mapper;

import com.groupeisi.ms_matiere.entities.MatiereEntity;
import io.spring.guides.gs_producing_web_service.GetMatiereByIdResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface MatiereMapper {
    public MatiereEntity toMatiereEntity(GetMatiereByIdResponse matiere);
    public GetMatiereByIdResponse toMatiereByIdResponse(MatiereEntity matiere);
    public List<GetMatiereByIdResponse> toMatiereByIdResonseList(List<MatiereEntity> matiereList);
}
