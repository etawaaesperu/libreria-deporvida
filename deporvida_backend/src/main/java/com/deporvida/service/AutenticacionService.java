package com.deporvida.service;

import com.deporvida.dto.request.ActualizarPerfilRequest;
import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Rol;

public interface AutenticacionService {

    AutenticacionResponse registrar(RegistroRequest request);

    AutenticacionResponse iniciarSesion(InicioSesionRequest request);

    UsuarioResponse obtenerUsuarioActual(Long usuarioId);

    UsuarioResponse actualizarPerfil(Long usuarioId, ActualizarPerfilRequest request);

    void cambiarContrasena(Long usuarioId, String contrasenaActual, String contrasenaNueva);

    void solicitarRecuperacionContrasena(String correo);

    void restablecerContrasena(String correo, String contrasenaNueva);

    AutenticacionResponse registrar(RegistroRequest request, Rol.NombreRol rol);
}
