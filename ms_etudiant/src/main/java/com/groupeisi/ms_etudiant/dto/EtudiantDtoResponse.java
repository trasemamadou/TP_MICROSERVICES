package com.groupeisi.ms_etudiant.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Date;
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class EtudiantDtoResponse {
    @NotBlank(message= "L'id est obligatoire")
    private Long id;
    @NotBlank(message = "Le prenom est obligatoire")
    private String prenom;
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    @NotBlank(message = "La date de naissance est obligatoire")
    private Date birthday;
}
