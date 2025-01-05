package com.groupeisi.service_classe.controller;

import com.groupeisi.service_classe.entity.Classe;
import com.groupeisi.service_classe.service.ClasseService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Optional;

@Controller
public class ClasseGraphQLController {
    private final ClasseService classeService;

    public ClasseGraphQLController(ClasseService classeService) {
        this.classeService = classeService;
    }

    @QueryMapping
    public List<Classe> getClasses() {
        return classeService.getAllClasses();
    }

    @QueryMapping
    public Classe getClasseById(@Argument Long id) {
        return classeService.getClasseById(id).orElseThrow(() -> new RuntimeException("Classe not found with id " + id));
    }

    @MutationMapping
    public Classe createClasse(@Argument String nom, @Argument String niveau) {
        Classe classe = new Classe();
        classe.setNom(nom);
        classe.setNiveau(niveau);
        return classeService.createClasse(classe);
    }

    @MutationMapping
    public Classe updateClasse(@Argument Long id, @Argument String nom, @Argument String niveau) {
        Classe classeDetails = new Classe();
        classeDetails.setNom(nom);
        classeDetails.setNiveau(niveau);
        return classeService.updateClasse(id, classeDetails);
    }

    @MutationMapping
    public String deleteClasse(@Argument Long id) {
        classeService.deleteClasse(id);
        return "Classe with id " + id + " deleted successfully!";
    }
}
