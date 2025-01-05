package com.groupeisi.service_classe.service;

import com.groupeisi.service_classe.entity.Classe;
import com.groupeisi.service_classe.repository.ClasseRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClasseService {
    private final ClasseRepository classeRepository;

    public ClasseService(ClasseRepository classeRepository) {
        this.classeRepository = classeRepository;
    }

    public List<Classe> getAllClasses() {
        return classeRepository.findAll();
    }

    public Optional<Classe> getClasseById(Long id) {
        return classeRepository.findById(id);
    }

    public Classe createClasse(Classe classe) {
        return classeRepository.save(classe);
    }

    public Classe updateClasse(Long id, Classe classeDetails) {
        return classeRepository.findById(id).map(classe -> {
            classe.setNom(classeDetails.getNom());
            classe.setNiveau(classeDetails.getNiveau());
            return classeRepository.save(classe);
        }).orElseThrow(() -> new RuntimeException("Classe not found with id " + id));
    }

    public void deleteClasse(Long id) {
        if (classeRepository.existsById(id)) {
            classeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Classe not found with id " + id);
        }
    }
}
