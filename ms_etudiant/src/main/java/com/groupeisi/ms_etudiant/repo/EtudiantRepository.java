package com.groupeisi.ms_etudiant.repo;

import com.groupeisi.ms_etudiant.entities.EtudiantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EtudiantRepository extends JpaRepository<EtudiantEntity,Long> {
}
