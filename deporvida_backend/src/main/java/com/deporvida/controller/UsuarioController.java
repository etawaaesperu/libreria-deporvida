package com.deporvida.controller;

import com.deporvida.dto.request.ActualizarRolesRequest;
import com.deporvida.dto.request.DireccionRequest;
import com.deporvida.dto.response.DireccionResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.exception.AccesoDenegadoException;
import com.deporvida.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> getById(@PathVariable Long id, Authentication authentication) {
        assertOwnerOrAdmin(id, authentication);
        return ResponseEntity.ok(usuarioService.getById(id));
    }

    @GetMapping
    public ResponseEntity<PaginaResponse<UsuarioResponse>> getAll(
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(usuarioService.getAll(pageable));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponse> update(@PathVariable Long id, @RequestBody UsuarioResponse request, Authentication authentication) {
        assertOwnerOrAdmin(id, authentication);
        return ResponseEntity.ok(usuarioService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/toggle-activo")
    public ResponseEntity<UsuarioResponse> toggleActivo(@PathVariable Long id, Authentication authentication) {
        assertOwnerOrAdmin(id, authentication);
        return ResponseEntity.ok(usuarioService.toggleActivo(id));
    }

    @GetMapping("/{usuarioId}/direcciones")
    public ResponseEntity<List<DireccionResponse>> getDirecciones(@PathVariable Long usuarioId, Authentication authentication) {
        assertOwnerOrAdmin(usuarioId, authentication);
        return ResponseEntity.ok(usuarioService.getDirecciones(usuarioId));
    }

    @PostMapping("/{usuarioId}/direcciones")
    public ResponseEntity<DireccionResponse> addDireccion(
            @PathVariable Long usuarioId,
            @Valid @RequestBody DireccionRequest request,
            Authentication authentication) {
        assertOwnerOrAdmin(usuarioId, authentication);
        return ResponseEntity.ok(usuarioService.addDireccion(usuarioId, request));
    }

    @PutMapping("/{usuarioId}/direcciones/{direccionId}")
    public ResponseEntity<DireccionResponse> updateDireccion(
            @PathVariable Long usuarioId,
            @PathVariable Long direccionId,
            @Valid @RequestBody DireccionRequest request,
            Authentication authentication) {
        assertOwnerOrAdmin(usuarioId, authentication);
        return ResponseEntity.ok(usuarioService.updateDireccion(usuarioId, direccionId, request));
    }

    @DeleteMapping("/{usuarioId}/direcciones/{direccionId}")
    public ResponseEntity<Void> deleteDireccion(
            @PathVariable Long usuarioId,
            @PathVariable Long direccionId,
            Authentication authentication) {
        assertOwnerOrAdmin(usuarioId, authentication);
        usuarioService.deleteDireccion(usuarioId, direccionId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<UsuarioResponse> actualizarRoles(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarRolesRequest request,
            Authentication authentication) {
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!esAdmin) {
            throw new AccesoDenegadoException("No tienes permiso para gestionar roles de usuario");
        }
        return ResponseEntity.ok(usuarioService.actualizarRoles(id, request));
    }

    @PutMapping("/{usuarioId}/direcciones/{direccionId}/predeterminada")
    public ResponseEntity<DireccionResponse> setDireccionPredeterminada(
            @PathVariable Long usuarioId,
            @PathVariable Long direccionId,
            Authentication authentication) {
        assertOwnerOrAdmin(usuarioId, authentication);
        return ResponseEntity.ok(usuarioService.setDireccionPredeterminada(usuarioId, direccionId));
    }

    private void assertOwnerOrAdmin(Long targetId, Authentication authentication) {
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (esAdmin) return;
        Long usuarioId = (Long) authentication.getPrincipal();
        if (!usuarioId.equals(targetId)) {
            throw new AccesoDenegadoException("No tienes permiso para acceder a este recurso");
        }
    }
}
