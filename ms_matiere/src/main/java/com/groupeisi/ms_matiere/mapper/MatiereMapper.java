package com.groupeisi.ms_matiere.mapper;

import com.groupeisi.ms_matiere.dto.MatiereDto;
import com.groupeisi.ms_matiere.entities.MatiereEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface MatiereMapper {
    public MatiereEntity toMatiereEntity(MatiereDto matiere);
    public MatiereDto toMatiereDto(MatiereEntity matiere);
    public List<MatiereDto> toMatiereDtolIST(List<MatiereEntity> matiereList);
}
