package com.deporvida.controller;

import com.deporvida.dto.response.RolResponse;
import com.deporvida.entity.Rol;
import com.deporvida.repository.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolRepository rolRepository;

    @GetMapping
    public ResponseEntity<List<RolResponse>> listar() {
        List<Rol> roles = rolRepository.findAll();
        List<RolResponse> response = roles.stream()
            .map(r -> RolResponse.builder()
                .id(r.getId())
                .nombre(r.getNombre().name())
                .descripcion(r.getDescripcion())
                .build())
            .toList();
        return ResponseEntity.ok(response);
    }
}
