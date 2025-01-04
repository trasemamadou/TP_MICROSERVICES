package com.groupeisi.ms_classe.resolver;

import com.groupeisi.ms_classe.service.ClasseService; 
import com.groupeisi.ms_classe.entities.ClasseEntity;
import graphql.schema.DataFetcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MatiereComponent {

    @Autowired
    private ClasseService classeGraphQLService;

    // Requête pour récupérer toutes les classes
    public DataFetcher<List<ClasseEntity>> getAllClassesFetcher() {
        return dataFetchingEnvironment -> classeGraphQLService.getAllClasses();
    }

    // Requête pour récupérer une classe par ID
    public DataFetcher<ClasseEntity> getClasseByIdFetcher() {
        return dataFetchingEnvironment -> {
            Long id = dataFetchingEnvironment.getArgument("id");
            return classeGraphQLService.getClasseById(id);
        };
    }

    // Mutation pour créer une classe
    public DataFetcher<ClasseEntity> createClasseFetcher() {
        return dataFetchingEnvironment -> {
            String nom = dataFetchingEnvironment.getArgument("nom");
            return classeGraphQLService.createClasse(nom);
        };
    }

    // Mutation pour mettre à jour une classe
    public DataFetcher<ClasseEntity> updateClasseFetcher() {
        return dataFetchingEnvironment -> {
            Long id = dataFetchingEnvironment.getArgument("id");
            String nom = dataFetchingEnvironment.getArgument("nom");
            return classeGraphQLService.updateClasse(id, nom);
        };
    }

    // Mutation pour supprimer une classe
    public DataFetcher<Boolean> deleteClasseFetcher() {
        return dataFetchingEnvironment -> {
            Long id = dataFetchingEnvironment.getArgument("id");
            return classeGraphQLService.deleteClasse(id);
        };
    }
}
