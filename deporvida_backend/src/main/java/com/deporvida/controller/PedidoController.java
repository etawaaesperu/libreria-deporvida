package com.deporvida.controller;

import com.deporvida.dto.request.PedidoRequest;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.enums.EstadoPedido;
import com.deporvida.service.PedidoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoResponse> create(
            @Valid @RequestBody PedidoRequest request,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(pedidoService.create(usuarioId, request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedidoResponse> getById(
            @PathVariable Long id,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pedidoService.getById(id, usuarioId, esAdmin));
    }

    @GetMapping("/numero/{numeroPedido}")
    public ResponseEntity<PedidoResponse> getByNumeroPedido(
            @PathVariable String numeroPedido,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pedidoService.getByNumeroPedido(numeroPedido, usuarioId, esAdmin));
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<PedidoResponse>> getMisPedidos(
            @PageableDefault(size = 20) Pageable pageable,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(pedidoService.getUsuarioPedidos(usuarioId, pageable));
    }

    @GetMapping("/all")
    public ResponseEntity<PaginaResponse<PedidoResponse>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(pedidoService.getAll(pageable));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<PedidoResponse> updateEstado(
            @PathVariable Long id,
            @RequestParam EstadoPedido estado) {
        return ResponseEntity.ok(pedidoService.updateEstado(id, estado));
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<PedidoResponse> cancel(
            @PathVariable Long id,
            @RequestParam String motivo,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        return ResponseEntity.ok(pedidoService.cancel(id, motivo, usuarioId, esAdmin));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<PedidoResponse>> getByEstado(@PathVariable EstadoPedido estado) {
        return ResponseEntity.ok(pedidoService.getByEstado(estado));
    }
}
