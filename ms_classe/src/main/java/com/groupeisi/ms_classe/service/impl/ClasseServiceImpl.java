package com.groupeisi.ms_classe.service.impl;

import com.groupeisi.ms_classe.entities.ClasseEntity;
import com.groupeisi.ms_classe.repo.ClasseRepository;
import com.groupeisi.ms_classe.service.ClasseService;
import graphql.GraphQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClasseServiceImpl implements ClasseService {

    @Autowired
    private ClasseRepository classeRepository;

    // Requête pour obtenir toutes les classes
    public List<ClasseEntity> getAllClasses() {
        return classeRepository.findAll();
    }

    // Requête pour obtenir une classe par son ID
    public ClasseEntity getClasseById(Long id) {
        return classeRepository.findById(id).orElseThrow(() -> new GraphQLException("Classe non trouvée"));
    }

    // Mutation pour créer une classe
    public ClasseEntity createClasse(String nom) {
        ClasseEntity classe = new ClasseEntity();
        classe.setNom(nom);
        return classeRepository.save(classe);
    }

    // Mutation pour mettre à jour une classe
    public ClasseEntity updateClasse(Long id, String nom) {
        ClasseEntity classe = classeRepository.findById(id).orElseThrow(() -> new GraphQLException("Classe non trouvée"));
        classe.setNom(nom);
        return classeRepository.save(classe);
    }

    // Mutation pour supprimer une classe
    public boolean deleteClasse(Long id) {
        if (!classeRepository.existsById(id)) {
            throw new GraphQLException("Classe non trouvée");
        }
        classeRepository.deleteById(id);
        return true;
    }
}
