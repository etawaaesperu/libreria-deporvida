package com.deporvida.service.impl;

import com.deporvida.dto.request.ActualizarPerfilRequest;
import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Rol;
import com.deporvida.entity.Usuario;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.exception.ValidacionException;
import com.deporvida.mapper.UsuarioMapper;
import com.deporvida.repository.RolRepository;
import com.deporvida.repository.UsuarioRepository;
import com.deporvida.service.AutenticacionService;
import com.deporvida.util.CodificadorContrasena;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class AutenticacionServiceImpl implements AutenticacionService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final CodificadorContrasena codificadorContrasena;
    private final UsuarioMapper usuarioMapper;
    private final com.deporvida.security.JwtService jwtService;

    @Override
    public AutenticacionResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByNombreUsuario(request.getNombreUsuario())) {
            throw new ValidacionException("El nombre de usuario ya está en uso");
        }

        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new ValidacionException("El correo ya está registrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(request.getNombreUsuario());
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(codificadorContrasena.codificar(request.getContrasena()));
        usuario.setNombres(request.getNombres());
        usuario.setApellidos(request.getApellidos());
        usuario.setTelefono(request.getTelefono());
        usuario.setActivo(true);
        usuario.setCorreoVerificado(false);

        Rol rolUsuario = rolRepository.findByNombre(Rol.NombreRol.ROL_USUARIO)
            .orElseThrow(() -> new RecursoNoEncontradoException("Rol por defecto no encontrado"));
        usuario.setRoles(Set.of(rolUsuario));

        Usuario guardado = usuarioRepository.save(usuario);

        return construirRespuesta(guardado);
    }

    @Override
    public AutenticacionResponse registrar(RegistroRequest request, Rol.NombreRol rol) {
        AutenticacionResponse response = registrar(request);

        Usuario usuario = usuarioRepository.findById(response.getId())
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado después del registro"));

        Rol rolAsignado = rolRepository.findByNombre(rol)
            .orElseThrow(() -> new RecursoNoEncontradoException("Rol no encontrado: " + rol));

        usuario.setRoles(Set.of(rolAsignado));
        usuarioRepository.save(usuario);

        return construirRespuesta(usuario);
    }

    @Override
    public AutenticacionResponse iniciarSesion(InicioSesionRequest request) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(request.getNombreUsuario())
            .or(() -> usuarioRepository.findByCorreo(request.getNombreUsuario()))
            .orElseThrow(() -> new ValidacionException("Usuario o contraseña incorrectos"));

        if (!codificadorContrasena.verificar(request.getContrasena(), usuario.getContrasena())) {
            throw new ValidacionException("Usuario o contraseña incorrectos");
        }

        usuario.setUltimoInicioSesion(LocalDateTime.now());
        usuarioRepository.save(usuario);

        return construirRespuesta(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse obtenerUsuarioActual(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));
        return usuarioMapper.toResponse(usuario);
    }

    @Override
    public UsuarioResponse actualizarPerfil(Long usuarioId, ActualizarPerfilRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        usuario.setNombres(request.getNombres());
        usuario.setApellidos(request.getApellidos());
        usuario.setTelefono(request.getTelefono());

        Usuario guardado = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(guardado);
    }

    @Override
    public void cambiarContrasena(Long usuarioId, String contrasenaActual, String contrasenaNueva) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        if (!codificadorContrasena.verificar(contrasenaActual, usuario.getContrasena())) {
            throw new ValidacionException("La contraseña actual es incorrecta");
        }

        usuario.setContrasena(codificadorContrasena.codificar(contrasenaNueva));
        usuarioRepository.save(usuario);
    }

    @Override
    public void solicitarRecuperacionContrasena(String correo) {
        usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con correo: " + correo));
        // TODO: enviar correo de recuperación (fuera del alcance de este proyecto académico)
    }

    @Override
    public void restablecerContrasena(String correo, String contrasenaNueva) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con correo: " + correo));

        usuario.setContrasena(codificadorContrasena.codificar(contrasenaNueva));
        usuarioRepository.save(usuario);
    }

    private AutenticacionResponse construirRespuesta(Usuario usuario) {
        java.util.Set<Rol.NombreRol> nombresRoles = usuario.getRoles().stream()
            .map(Rol::getNombre)
            .collect(java.util.stream.Collectors.toSet());
        String token = jwtService.generarToken(usuario.getId(), nombresRoles);
        return AutenticacionResponse.builder()
            .id(usuario.getId())
            .nombreUsuario(usuario.getNombreUsuario())
            .correo(usuario.getCorreo())
            .nombres(usuario.getNombres())
            .apellidos(usuario.getApellidos())
            .nombreCompleto(usuario.obtenerNombreCompleto())
            .token(token)
            .roles(nombresRoles.stream().map(Enum::name).collect(java.util.stream.Collectors.toSet()))
            .build();
    }
}
