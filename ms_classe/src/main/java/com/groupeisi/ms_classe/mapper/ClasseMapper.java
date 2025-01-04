package com.groupeisi.ms_classe.mapper;

import com.groupeisi.ms_classe.DTO.ClasseDtoRequest;
import com.groupeisi.ms_classe.DTO.ClasseDtoResponse;
import com.groupeisi.ms_classe.entities.ClasseEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ClasseMapper {
    public ClasseDtoResponse toClasseResponse(ClasseEntity classe);
    public ClasseEntity toClasseEntity(ClasseDtoRequest classe);
    public List<ClasseDtoResponse> toClasseDtoResponseList(List<ClasseEntity> listClasse);
}
