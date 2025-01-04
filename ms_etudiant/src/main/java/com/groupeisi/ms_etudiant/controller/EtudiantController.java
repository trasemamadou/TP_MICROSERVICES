package com.groupeisi.ms_etudiant.controller;

import com.groupeisi.ms_etudiant.dto.EtudiantDtoRequest;
import com.groupeisi.ms_etudiant.dto.EtudiantDtoResponse;
import com.groupeisi.ms_etudiant.repo.EtudiantRepository;
import com.groupeisi.ms_etudiant.service.IEtudiantService;
import com.groupeisi.ms_etudiant.service.impl.EtudiantService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/etudiants")
@AllArgsConstructor
public class EtudiantController {
    private final EtudiantService etudiantService;
    //***    FONCTION QUI RETOURNE LA LISTE DES ETUDIANTS ***///
    @GetMapping
    public ResponseEntity<List<EtudiantDtoResponse>> getAllEtudiant(){
             return etudiantService.getAllEtudiants().map(ResponseEntity::ok).orElseGet(()-> ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }
    ///*** FONCTION POUR RECUPERER L'étudiant par son ID***///
    @GetMapping("/{id}")
    public ResponseEntity<EtudiantDtoResponse> getEtudiantByID(@PathVariable Long id){
        Optional<EtudiantDtoResponse> etudiant = etudiantService.getEtudiantById(id);
        if (etudiant.isEmpty()){
            ResponseEntity.status(404).body("L'étudiant n'existe pas");
        }
        return etudiant.map(ResponseEntity::ok).orElseThrow(() -> new EntityNotFoundException("Une erreur s'est produit lors de la récuperation de l'étudiant"));
    }
    //*** FONCTION QUI CREE UN PRODUIT ***//
    @PostMapping
    public ResponseEntity<?> createEtudiant(@RequestBody EtudiantDtoRequest etudiant){
       return etudiantService.saveEtudiant(etudiant).map((savedEtudiant) -> ResponseEntity.status(HttpStatus.CREATED).body(etudiant)).orElse(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
    ///µµµ FONCTION QUI MODIFIE UN PRODUIT ***///
    @PutMapping("/{id}")
    public ResponseEntity<EtudiantDtoResponse> updateEtudiant(@PathVariable Long id, @RequestBody EtudiantDtoRequest etudiant){
        return etudiantService.updateEtudiant(id, etudiant)
                .map(ResponseEntity::ok).orElseThrow(() -> new EntityNotFoundException("L'étudiant avec l'ID "  + " n'existe pas."));
    }
    /// *** FONCTION QUI SUPPRIME UN PRODUIT ***///
    @DeleteMapping("/{id}")
    public  ResponseEntity<EtudiantDtoResponse> deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiantById(id);
      return   ResponseEntity.noContent().build();
    }}
