package com.deporvida.controller;

import com.deporvida.dto.request.PagoRequest;
import com.deporvida.dto.response.PagoResponse;
import com.deporvida.service.PagoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final PagoService pagoService;

    @PostMapping
    public ResponseEntity<PagoResponse> createPago(
            @Valid @RequestBody PagoRequest request,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pagoService.createPago(request, usuarioId, esAdmin));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PagoResponse> getById(
            @PathVariable Long id,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pagoService.getById(id, usuarioId, esAdmin));
    }

    @GetMapping("/pedido/{pedidoId}")
    public ResponseEntity<PagoResponse> getByPedidoId(
            @PathVariable Long pedidoId,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pagoService.getByPedidoId(pedidoId, usuarioId, esAdmin));
    }

    @PutMapping("/{id}/procesar")
    public ResponseEntity<PagoResponse> processPago(
            @PathVariable Long id,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pagoService.processPago(id, usuarioId, esAdmin));
    }

    @PutMapping("/{id}/reembolsar")
    public ResponseEntity<PagoResponse> refund(@PathVariable Long id, @RequestParam String motivo) {
        return ResponseEntity.ok(pagoService.refund(id, motivo));
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<PagoResponse> cancel(
            @PathVariable Long id,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pagoService.cancel(id, usuarioId, esAdmin));
    }
}
