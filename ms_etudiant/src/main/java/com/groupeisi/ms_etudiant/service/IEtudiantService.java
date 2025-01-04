package com.groupeisi.ms_etudiant.service;

import com.groupeisi.ms_etudiant.dto.EtudiantDtoRequest;
import com.groupeisi.ms_etudiant.dto.EtudiantDtoResponse;
import com.groupeisi.ms_etudiant.entities.EtudiantEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public interface IEtudiantService {
public Optional<List<EtudiantDtoResponse>> getAllEtudiants();
public Optional<EtudiantDtoResponse> saveEtudiant(EtudiantDtoRequest etudiant);
public Optional<EtudiantDtoResponse> getEtudiantById(Long id);
public  Optional<EtudiantDtoResponse> updateEtudiant(Long id, EtudiantDtoRequest etudiant);
public Optional<EtudiantDtoResponse> deleteEtudiantById(Long id);
}
