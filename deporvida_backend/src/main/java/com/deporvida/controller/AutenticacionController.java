package com.deporvida.controller;

import com.deporvida.dto.request.ActualizarPerfilRequest;
import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Rol;
import com.deporvida.exception.AccesoDenegadoException;
import com.deporvida.service.AutenticacionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AutenticacionController {

    private final AutenticacionService autenticacionService;

    @PostMapping("/register")
    public ResponseEntity<AutenticacionResponse> registrar(@Valid @RequestBody RegistroRequest request) {
        return ResponseEntity.ok(autenticacionService.registrar(request));
    }

    @PostMapping("/register-admin")
    public ResponseEntity<AutenticacionResponse> registrarAdmin(
            @Valid @RequestBody RegistroRequest request,
            @RequestParam(required = false) Rol.NombreRol rol,
            Authentication authentication) {
        boolean esAdmin = authentication.getAuthorities().stream()
            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
        if (!esAdmin) {
            throw new AccesoDenegadoException("No tienes permiso para registrar usuarios con rol especifico");
        }
        Rol.NombreRol rolAsignar = rol != null ? rol : Rol.NombreRol.ROL_USUARIO;
        return ResponseEntity.ok(autenticacionService.registrar(request, rolAsignar));
    }

    @PostMapping("/login")
    public ResponseEntity<AutenticacionResponse> iniciarSesion(@Valid @RequestBody InicioSesionRequest request) {
        return ResponseEntity.ok(autenticacionService.iniciarSesion(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UsuarioResponse> obtenerUsuarioActual(Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(autenticacionService.obtenerUsuarioActual(usuarioId));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioResponse> actualizarPerfil(
            @Valid @RequestBody ActualizarPerfilRequest request,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        return ResponseEntity.ok(autenticacionService.actualizarPerfil(usuarioId, request));
    }

    @PutMapping("/me/contrasena")
    public ResponseEntity<Void> cambiarContrasena(
            @RequestParam String contrasenaActual,
            @RequestParam String contrasenaNueva,
            Authentication authentication) {
        Long usuarioId = (Long) authentication.getPrincipal();
        autenticacionService.cambiarContrasena(usuarioId, contrasenaActual, contrasenaNueva);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Void> solicitarRecuperacionContrasena(@RequestParam String correo) {
        autenticacionService.solicitarRecuperacionContrasena(correo);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> restablecerContrasena(
            @RequestParam String correo,
            @RequestParam String contrasenaNueva) {
        autenticacionService.restablecerContrasena(correo, contrasenaNueva);
        return ResponseEntity.ok().build();
    }
}
