package com.deporvida.controller;

import com.deporvida.dto.request.CategoriaRequest;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.service.CategoriaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoriaController {

    private final CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<CategoriaResponse> create(@Valid @RequestBody CategoriaRequest request) {
        return ResponseEntity.ok(categoriaService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaResponse> update(@PathVariable Long id, @Valid @RequestBody CategoriaRequest request) {
        return ResponseEntity.ok(categoriaService.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoriaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<CategoriaResponse>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(categoriaService.getAll(pageable));
    }

    @GetMapping("/activo")
    public ResponseEntity<List<CategoriaResponse>> getAllActivo() {
        return ResponseEntity.ok(categoriaService.getAllActivo());
    }

    @GetMapping("/root")
    public ResponseEntity<List<CategoriaResponse>> getRootCategories() {
        return ResponseEntity.ok(categoriaService.getRootCategories());
    }

    @GetMapping("/{padreId}/hijos")
    public ResponseEntity<List<CategoriaResponse>> getHijos(@PathVariable Long padreId) {
        return ResponseEntity.ok(categoriaService.getHijos(padreId));
    }

    @GetMapping("/search")
    public ResponseEntity<PaginaResponse<CategoriaResponse>> search(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(categoriaService.search(keyword, pageable));
    }

    @PutMapping("/{id}/toggle-activo")
    public ResponseEntity<CategoriaResponse> toggleActivo(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaService.toggleActivo(id));
    }
}