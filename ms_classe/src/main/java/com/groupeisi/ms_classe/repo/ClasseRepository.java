package com.groupeisi.ms_classe.repo;

import com.groupeisi.ms_classe.entities.ClasseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ClasseRepository extends JpaRepository<ClasseEntity, Long> {
}
