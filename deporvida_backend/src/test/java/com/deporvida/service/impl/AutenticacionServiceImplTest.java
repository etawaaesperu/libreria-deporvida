package com.deporvida.service.impl;

import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.entity.Rol;
import com.deporvida.entity.Usuario;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.exception.ValidacionException;
import com.deporvida.mapper.UsuarioMapper;
import com.deporvida.repository.RolRepository;
import com.deporvida.repository.UsuarioRepository;
import com.deporvida.security.JwtService;
import com.deporvida.util.CodificadorContrasena;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AutenticacionServiceImplTest {

    @Mock private UsuarioRepository usuarioRepository;
    @Mock private RolRepository rolRepository;
    @Mock private CodificadorContrasena codificadorContrasena;
    @Mock private UsuarioMapper usuarioMapper;
    @Mock private JwtService jwtService;

    private AutenticacionServiceImpl autenticacionService;
    private RegistroRequest registroRequest;
    private InicioSesionRequest inicioSesionRequest;
    private Rol rolUsuario;

    @BeforeEach
    void setUp() {
        autenticacionService = new AutenticacionServiceImpl(
            usuarioRepository, rolRepository, codificadorContrasena, usuarioMapper, jwtService);

        registroRequest = RegistroRequest.builder()
            .nombreUsuario("nuevouser")
            .correo("nuevo@test.com")
            .contrasena("password123")
            .nombres("Juan")
            .apellidos("Perez")
            .telefono("999888777")
            .build();

        inicioSesionRequest = InicioSesionRequest.builder()
            .nombreUsuario("existinguser")
            .contrasena("password123")
            .build();

        rolUsuario = Rol.builder()
            .id(1L)
            .nombre(Rol.NombreRol.ROL_USUARIO)
            .descripcion("Cliente regular")
            .build();
    }

    @Test
    @DisplayName("registrar deberia crear usuario exitosamente")
    void registrar_deberiaCrearUsuarioExitosamente() {
        when(usuarioRepository.existsByNombreUsuario("nuevouser")).thenReturn(false);
        when(usuarioRepository.existsByCorreo("nuevo@test.com")).thenReturn(false);
        when(rolRepository.findByNombre(Rol.NombreRol.ROL_USUARIO)).thenReturn(Optional.of(rolUsuario));
        when(codificadorContrasena.codificar("password123")).thenReturn("hashed:password");
        when(jwtService.generarToken(any(), anySet())).thenReturn("jwt-token");

        Usuario usuarioGuardado = Usuario.builder()
            .id(1L)
            .nombreUsuario("nuevouser")
            .correo("nuevo@test.com")
            .roles(Set.of(rolUsuario))
            .build();

        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioGuardado);

        AutenticacionResponse response = autenticacionService.registrar(registroRequest);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt-token");
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    @DisplayName("registrar deberia lanzar excepcion cuando el nombre de usuario ya existe")
    void registrar_deberiaLanzarExcepcion_cuandoUsuarioDuplicado() {
        when(usuarioRepository.existsByNombreUsuario("nuevouser")).thenReturn(true);

        assertThatThrownBy(() -> autenticacionService.registrar(registroRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("está en uso");
    }

    @Test
    @DisplayName("registrar deberia lanzar excepcion cuando el correo ya existe")
    void registrar_deberiaLanzarExcepcion_cuandoCorreoDuplicado() {
        when(usuarioRepository.existsByNombreUsuario("nuevouser")).thenReturn(false);
        when(usuarioRepository.existsByCorreo("nuevo@test.com")).thenReturn(true);

        assertThatThrownBy(() -> autenticacionService.registrar(registroRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("está registrado");
    }

    @Test
    @DisplayName("registrar deberia lanzar excepcion cuando el rol por defecto no existe")
    void registrar_deberiaLanzarExcepcion_cuandoRolNoExiste() {
        when(usuarioRepository.existsByNombreUsuario("nuevouser")).thenReturn(false);
        when(usuarioRepository.existsByCorreo("nuevo@test.com")).thenReturn(false);
        when(rolRepository.findByNombre(Rol.NombreRol.ROL_USUARIO)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> autenticacionService.registrar(registroRequest))
            .isInstanceOf(RecursoNoEncontradoException.class)
            .hasMessageContaining("Rol por defecto no encontrado");
    }

    @Test
    @DisplayName("iniciarSesion deberia autenticar usuario exitosamente")
    void iniciarSesion_deberiaAutenticarExitosamente() {
        Usuario usuario = Usuario.builder()
            .id(1L)
            .nombreUsuario("existinguser")
            .correo("existing@test.com")
            .contrasena("hashed:password")
            .roles(Set.of(rolUsuario))
            .build();

        when(usuarioRepository.findByNombreUsuario("existinguser")).thenReturn(Optional.of(usuario));
        when(codificadorContrasena.verificar("password123", "hashed:password")).thenReturn(true);
        when(jwtService.generarToken(1L, Set.of(Rol.NombreRol.ROL_USUARIO))).thenReturn("jwt-token");

        AutenticacionResponse response = autenticacionService.iniciarSesion(inicioSesionRequest);

        assertThat(response).isNotNull();
        assertThat(response.getToken()).isEqualTo("jwt-token");
    }

    @Test
    @DisplayName("iniciarSesion deberia lanzar excepcion con credenciales invalidas")
    void iniciarSesion_deberiaLanzarExcepcion_cuandoCredencialesInvalidas() {
        when(usuarioRepository.findByNombreUsuario("existinguser")).thenReturn(Optional.empty());
        when(usuarioRepository.findByCorreo("existinguser")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> autenticacionService.iniciarSesion(inicioSesionRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("contraseña incorrectos");
    }

    @Test
    @DisplayName("iniciarSesion deberia lanzar excepcion cuando la contrasena no coincide")
    void iniciarSesion_deberiaLanzarExcepcion_cuandoContrasenaIncorrecta() {
        Usuario usuario = Usuario.builder()
            .id(1L)
            .nombreUsuario("existinguser")
            .contrasena("hashed:password")
            .build();

        when(usuarioRepository.findByNombreUsuario("existinguser")).thenReturn(Optional.of(usuario));
        when(codificadorContrasena.verificar("password123", "hashed:password")).thenReturn(false);

        assertThatThrownBy(() -> autenticacionService.iniciarSesion(inicioSesionRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("contraseña incorrectos");
    }
}
