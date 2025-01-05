package com.groupeisi.ms_matiere.endpoint;

import com.groupeisi.ms_matiere.dto.MatiereDto;
import com.groupeisi.ms_matiere.entities.MatiereEntity;
import com.groupeisi.ms_matiere.service.MatiereService;
import com.groupeisi.ms_matiere.soap.request.CreateMatiereRequest;
import com.groupeisi.ms_matiere.soap.request.DeleteMatiereRequest;
import com.groupeisi.ms_matiere.soap.request.GetMatiereByIdRequest;
import com.groupeisi.ms_matiere.soap.request.UpdateMatiereRequest;
import com.groupeisi.ms_matiere.soap.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

import java.util.List;
import java.util.stream.Collectors;

@Endpoint
@RequiredArgsConstructor
public class MatiereEndpoint {
    private static final String NAMESPACE_URI = "http://spring.io/guides/gs-producing-web-service";

    private final MatiereService matiereService;

    // CREATE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "CreateMatiereRequest")
    @ResponsePayload
    public CreateMatiereResponse createMatiere(@RequestPayload CreateMatiereRequest request) {
        MatiereEntity matiere = matiereService.createMatiere(request.getNom());
        return CreateMatiereResponse.builder().id(matiere.getId()).nom(matiere.getNom()).build();
    }

    // READ ALL
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetAllMatieresRequest")
    @ResponsePayload
    public GetAllMatieresResponse getAllMatieres() {
        List<MatiereEntity> matieres = matiereService.getAllMatieres();
        List<MatiereDto> matieresDto = matieres.stream()
                .map(m -> MatiereDto.builder().id(m.getId()).nom(m.getNom()).build())
                .collect(Collectors.toList());

        return GetAllMatieresResponse.builder().matieres(matieresDto).build();
    }

    // READ BY ID
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "GetMatiereByIdRequest")
    @ResponsePayload
    public GetMatiereByIdResponse getMatiereById(@RequestPayload GetMatiereByIdRequest request) {
        MatiereEntity matiere = matiereService.getMatiereById(request.getId());
        return GetMatiereByIdResponse.builder().id(matiere.getId()).nom(matiere.getNom()).build();
    }

    // UPDATE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "UpdateMatiereRequest")
    @ResponsePayload
    public UpdateMatiereResponse updateMatiere(@RequestPayload UpdateMatiereRequest request) {
        MatiereEntity matiere = matiereService.updateMatiere(request.getId(), request.getNom());
        return UpdateMatiereResponse.builder().id(matiere.getId()).nom(matiere.getNom()).build();
    }

    // DELETE
    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "DeleteMatiereRequest")
    @ResponsePayload
    public DeleteMatiereResponse deleteMatiere(@RequestPayload DeleteMatiereRequest request) {
        matiereService.deleteMatiere(request.getId());
        return new DeleteMatiereResponse();
    }
}
