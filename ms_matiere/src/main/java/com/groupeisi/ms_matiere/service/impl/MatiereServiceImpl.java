package com.groupeisi.ms_matiere.service.impl;

import com.groupeisi.ms_matiere.entities.MatiereEntity;
import com.groupeisi.ms_matiere.repo.MatiereRepository;
import com.groupeisi.ms_matiere.service.MatiereService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatiereServiceImpl implements MatiereService {
    private final MatiereRepository repository;

    // CREATE
    public MatiereEntity createMatiere(String nom) {
        return repository.save(MatiereEntity.builder().nom(nom).build());
    }

    // READ ALL
    public List<MatiereEntity> getAllMatieres() {
        return repository.findAll();
    }

    // READ BY ID
    public MatiereEntity getMatiereById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Matière non trouvée"));
    }

    // UPDATE
    public MatiereEntity updateMatiere(Long id, String nom) {
        MatiereEntity matiere = getMatiereById(id);
        matiere.setNom(nom);
        return repository.save(matiere);
    }

    // DELETE
    public void deleteMatiere(Long id) {
        repository.deleteById(id);
    }
}
