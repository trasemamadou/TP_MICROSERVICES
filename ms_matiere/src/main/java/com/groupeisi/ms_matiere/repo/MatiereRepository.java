package com.groupeisi.ms_matiere.repo;

import com.groupeisi.ms_matiere.entities.MatiereEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatiereRepository extends JpaRepository<MatiereEntity, Long> {
}
