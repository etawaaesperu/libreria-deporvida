package com.deporvida.controller;

import com.deporvida.dto.request.AutorRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.service.AutorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/autors")
@RequiredArgsConstructor
public class AutorController {

    private final AutorService autorService;

    @PostMapping
    public ResponseEntity<AutorResponse> create(@Valid @RequestBody AutorRequest request) {
        return ResponseEntity.ok(autorService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AutorResponse> update(@PathVariable Long id, @Valid @RequestBody AutorRequest request) {
        return ResponseEntity.ok(autorService.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutorResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(autorService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        autorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<AutorResponse>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(autorService.getAll(pageable));
    }

    @GetMapping("/activo")
    public ResponseEntity<List<AutorResponse>> getAllActivo() {
        return ResponseEntity.ok(autorService.getAllActivo());
    }
}
