package com.groupeisi.ms_etudiant.service.impl;

import com.groupeisi.ms_etudiant.dto.EtudiantDtoRequest;
import com.groupeisi.ms_etudiant.dto.EtudiantDtoResponse;
import com.groupeisi.ms_etudiant.entities.EtudiantEntity;
import com.groupeisi.ms_etudiant.mapper.EtudiantMapper;
import com.groupeisi.ms_etudiant.repo.EtudiantRepository;
import com.groupeisi.ms_etudiant.service.IEtudiantService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EtudiantService implements IEtudiantService {
    public  final EtudiantRepository etudiantRepository;
    public EtudiantMapper etudiantMapper;
// ****        FONCTION QUI RETOURNE LA LISTE DE TOUS LES PRODUITS ***///
    @Override
    public Optional<List<EtudiantDtoResponse>> getAllEtudiants() {
        List<EtudiantEntity> etudiants = etudiantRepository.findAll();
        return Optional.of(etudiantMapper.toEtoDtoResponseList(etudiants));
    }
/// **** FONCTION QUI ENREGSITRER UN ETUDIANT **////
    @Override
    public Optional<EtudiantDtoResponse> saveEtudiant(EtudiantDtoRequest etudiant) {
      EtudiantEntity etudiant1 = etudiantRepository.save(etudiantMapper.toEtudiantEntity(etudiant));
        return Optional.of(etudiantMapper.toEtudiantDtoResponse(etudiant1));
    }

    @Override
    public Optional<EtudiantDtoResponse> getEtudiantById(Long id) {
        return Optional.of(etudiantRepository.findById(id).map((etudiant) ->
                etudiantMapper.toEtudiantDtoResponse(etudiant)
                ).orElseThrow(() -> new EntityNotFoundException("L'étudiant n'existe pas")));
    }
    @Override
    public Optional<EtudiantDtoResponse> updateEtudiant(Long id, EtudiantDtoRequest etudiant) {
       EtudiantEntity etudiant1 =  etudiantRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("L'étudiant n'existe pas"));
       etudiant1.setPrenom(etudiant.getPrenom());
       etudiant1.setNom(etudiant.getNom());
       etudiant1.setBirthday(etudiant.getBirthday());
       EtudiantEntity saved_etudiant = etudiantRepository.save(etudiant1);
        return Optional.of(etudiantMapper.toEtudiantDtoResponse(saved_etudiant));
    }

    @Override
    public Optional<EtudiantDtoResponse> deleteEtudiantById(Long id) {
        EtudiantEntity etudiant = etudiantRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("L'étudiant n'existe pas"));
        etudiantRepository.deleteById(etudiant.getId());
        return Optional.of(etudiantMapper.toEtudiantDtoResponse(etudiant));
    }
}
