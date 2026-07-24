package com.deporvida.controller;

import com.deporvida.dto.request.LibroRequest;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.service.LibroService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libros")
@RequiredArgsConstructor
public class LibroController {

    private final LibroService libroService;

    @PostMapping
    public ResponseEntity<LibroResponse> create(@Valid @RequestBody LibroRequest request) {
        return ResponseEntity.ok(libroService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibroResponse> update(@PathVariable Long id, @Valid @RequestBody LibroRequest request) {
        return ResponseEntity.ok(libroService.update(id, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibroResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        libroService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<LibroResponse>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(libroService.getAll(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<PaginaResponse<LibroResponse>> search(
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(libroService.search(keyword, pageable));
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<PaginaResponse<LibroResponse>> getByCategoria(
            @PathVariable Long categoriaId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(libroService.getByCategoria(categoriaId, pageable));
    }

    @GetMapping("/autor/{autorId}")
    public ResponseEntity<PaginaResponse<LibroResponse>> getByAutor(
            @PathVariable Long autorId,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(libroService.getByAutor(autorId, pageable));
    }

    @GetMapping("/destacado")
    public ResponseEntity<List<LibroResponse>> getDestacado() {
        return ResponseEntity.ok(libroService.getDestacado());
    }

    @GetMapping("/masVendidos")
    public ResponseEntity<List<LibroResponse>> getMasVendidos() {
        return ResponseEntity.ok(libroService.getMasVendidos());
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<LibroResponse>> getTopRated() {
        return ResponseEntity.ok(libroService.getTopRated());
    }

    @PutMapping("/{id}/toggle-activo")
    public ResponseEntity<LibroResponse> toggleActivo(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.toggleActivo(id));
    }

    @PutMapping("/{id}/toggle-destacado")
    public ResponseEntity<LibroResponse> toggleDestacado(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.toggleDestacado(id));
    }

    @PutMapping("/{id}/toggle-masVendido")
    public ResponseEntity<LibroResponse> toggleMasVendido(@PathVariable Long id) {
        return ResponseEntity.ok(libroService.toggleMasVendido(id));
    }
}