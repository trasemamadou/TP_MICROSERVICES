package com.groupeisi.ms_etudiant.mapper;

import com.groupeisi.ms_etudiant.dto.EtudiantDtoRequest;
import com.groupeisi.ms_etudiant.dto.EtudiantDtoResponse;
import com.groupeisi.ms_etudiant.entities.EtudiantEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface EtudiantMapper {
    public EtudiantEntity toEtudiantEntity(EtudiantDtoRequest etudiant);
    public EtudiantDtoResponse toEtudiantDtoResponse(EtudiantEntity etudiant);
    public List<EtudiantDtoResponse> toEtoDtoResponseList(List<EtudiantEntity> listeEtudiants);
}
