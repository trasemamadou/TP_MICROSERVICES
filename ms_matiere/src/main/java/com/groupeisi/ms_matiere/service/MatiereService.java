package com.groupeisi.ms_matiere.service;

import com.groupeisi.ms_matiere.entities.MatiereEntity;
import com.groupeisi.ms_matiere.repo.MatiereRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

public interface MatiereService {

    // CREATE
    public MatiereEntity createMatiere(String nom)  ;
    public List<MatiereEntity> getAllMatieres()  ;

    // READ BY ID
    public MatiereEntity getMatiereById(Long id)  ;

    // UPDATE
    public MatiereEntity updateMatiere(Long id, String nom)  ;

    // DELETE
    public void deleteMatiere(Long id)  ;
}
