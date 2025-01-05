package com.groupeisi.ms_classe.controller;

import com.groupeisi.ms_classe.entities.ClasseEntity;
import com.groupeisi.ms_classe.service.ClasseService;
import graphql.kickstart.tools.GraphQLMutationResolver;
import graphql.kickstart.tools.GraphQLQueryResolver;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;

import java.util.List;

@Controller
@AllArgsConstructor
public class ClasseController implements GraphQLQueryResolver, GraphQLMutationResolver {

    private final ClasseService classeService;

    @QueryMapping
    public List<ClasseEntity> getAllClasses() {
        return classeService.getAllClasses();
    }

    @QueryMapping
    public ClasseEntity getClasseById(@Argument Long id) {
        return classeService.getClasseById(id);
    }

    @MutationMapping
    public ClasseEntity createClasse(@Argument String nom) {
        return classeService.createClasse(nom);
    }

    @MutationMapping
    public ClasseEntity updateClasse(@Argument Long id, @Argument String nom) {
        return classeService.updateClasse(id, nom);
    }

    @MutationMapping
    public Boolean deleteClasse(@Argument Long id) {
        return classeService.deleteClasse(id);
    }
}
