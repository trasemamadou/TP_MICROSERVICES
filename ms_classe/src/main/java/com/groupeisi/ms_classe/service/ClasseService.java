package com.groupeisi.ms_classe.service;

import com.groupeisi.ms_classe.DTO.ClasseDtoRequest;
import com.groupeisi.ms_classe.DTO.ClasseDtoResponse;
import com.groupeisi.ms_classe.entities.ClasseEntity;
import com.groupeisi.ms_classe.repo.ClasseRepository;
import graphql.GraphQLException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public interface ClasseService {
    public List<ClasseEntity> getAllClasses() ;

    public ClasseEntity getClasseById(Long id);

    public ClasseEntity createClasse(String nom) ;
    public ClasseEntity updateClasse(Long id, String nom);

    public boolean deleteClasse(Long id);
}
