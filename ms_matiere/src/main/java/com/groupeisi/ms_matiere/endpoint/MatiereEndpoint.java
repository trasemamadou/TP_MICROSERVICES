package com.groupeisi.ms_matiere.endpoint;

import com.groupeisi.ms_matiere.converter.MatiereConverter;
import com.groupeisi.ms_matiere.entities.MatiereEntity;
import com.groupeisi.ms_matiere.mapper.MatiereMapper;
import com.groupeisi.ms_matiere.service.MatiereService;
import io.spring.guides.gs_producing_web_service.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Endpoint
@CrossOrigin(origins = "http://localhost:3000")

@RequiredArgsConstructor
public class MatiereEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";
    private  final MatiereMapper matiereMapper;
    private final MatiereService matiereService;

    // CREATE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "CreateMatiereRequest")
    @ResponsePayload
    public CreateMatiereResponse createMatiere(@RequestPayload CreateMatiereRequest request) {
        MatiereEntity matiere = matiereService.createMatiere(request.getNom());
        CreateMatiereResponse response = new CreateMatiereResponse();
        response.setId(matiere.getId());
        response.setNom(matiere.getNom());
        return response;
    }

    // READ ALL
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetMatiereListRequest")
    @ResponsePayload
    public GetMatiereListResponse getAllMatieres(@RequestPayload GetMatiereListRequest request) {
        GetMatiereListResponse response = new GetMatiereListResponse();

        // Récupération des entités MatiereEntity depuis le service
        List<MatiereEntity> matiereEntities = matiereService.getAllMatieres();

        // Conversion des entités en objets Matiere (SOAP)
        List<Matiere> matieres = MatiereConverter.convertToMatiereList(matiereEntities);

        // Ajout des matières dans la réponse
        response.setMatieres(matieres);

        return response;
    }
    // READ BY ID
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetMatiereByIdRequest")
    @ResponsePayload
    public GetMatiereByIdResponse getMatiereById(@RequestPayload GetMatiereByIdRequest request) {
        MatiereEntity matiere = matiereService.getMatiereById(request.getId());
        GetMatiereByIdResponse response = new GetMatiereByIdResponse();
        response.setId(matiere.getId());
        response.setNom(matiere.getNom());
        return response;
    }

    // UPDATE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "UpdateMatiereRequest")
    @ResponsePayload
    public UpdateMatiereResponse updateMatiere(@RequestPayload UpdateMatiereRequest request) {
        MatiereEntity matiere = matiereService.updateMatiere(request.getId(), request.getNom());
        UpdateMatiereResponse response = new UpdateMatiereResponse();
        response.setId(matiere.getId());
        response.setNom(matiere.getNom());
        return response;
    }

    // DELETE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "DeleteMatiereRequest")
    @ResponsePayload
    public DeleteMatiereResponse deleteMatiere(@RequestPayload DeleteMatiereRequest request) {
        matiereService.deleteMatiere(request.getId());
        return new DeleteMatiereResponse();
    }
}
