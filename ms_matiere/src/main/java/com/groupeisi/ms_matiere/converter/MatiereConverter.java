package com.groupeisi.ms_matiere.converter;

import io.spring.guides.gs_producing_web_service.Matiere;
import com.groupeisi.ms_matiere.entities.MatiereEntity;

import java.util.ArrayList;
import java.util.List;

public class MatiereConverter {

    public static Matiere convertToMatiere(MatiereEntity matiereEntity) {
        Matiere matiere = new Matiere();
        matiere.setId(matiereEntity.getId());
        matiere.setNom(matiereEntity.getNom());
        return matiere;
    }

    public static List<Matiere> convertToMatiereList(List<MatiereEntity> matiereEntities) {
        List<Matiere> matieres = new ArrayList<>();
        for (MatiereEntity entity : matiereEntities) {
            matieres.add(convertToMatiere(entity));
        }
        return matieres;
    }
}
