package com.deporvida.controller;

import com.deporvida.dto.request.ItemCarritoRequest;
import com.deporvida.dto.response.CarritoResponse;
import com.deporvida.service.CarritoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @GetMapping
    public ResponseEntity<CarritoResponse> getCarrito(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(carritoService.getCarrito(usuarioId));
    }

    @PostMapping("/items")
    public ResponseEntity<CarritoResponse> addItem(
            @Valid @RequestBody ItemCarritoRequest request,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(carritoService.addItem(usuarioId, request));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<CarritoResponse> updateItem(
            @PathVariable Long itemId,
            @RequestParam Integer cantidad,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(carritoService.updateItem(usuarioId, itemId, cantidad));
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CarritoResponse> removeItem(
            @PathVariable Long itemId,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(carritoService.removeItem(usuarioId, itemId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCarrito(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        carritoService.clearCarrito(usuarioId);
        return ResponseEntity.noContent().build();
    }
}
