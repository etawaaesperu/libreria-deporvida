package com.deporvida.repository;

import com.deporvida.entity.Usuario;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class UsuarioRepositoryTest {

    @Autowired
    private TestEntityManager em;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = Usuario.builder()
            .nombreUsuario("juanperez")
            .correo("juan@test.com")
            .contrasena("password123")
            .nombres("Juan")
            .apellidos("Perez")
            .activo(true)
            .build();
        em.persist(usuario);
    }

    @Test
    @DisplayName("findByNombreUsuario deberia retornar usuario existente")
    void findByNombreUsuario_deberiaRetornarUsuario() {
        Optional<Usuario> encontrado = usuarioRepository.findByNombreUsuario("juanperez");
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getCorreo()).isEqualTo("juan@test.com");
    }

    @Test
    @DisplayName("findByNombreUsuario deberia retornar empty si no existe")
    void findByNombreUsuario_deberiaRetornarEmpty() {
        Optional<Usuario> encontrado = usuarioRepository.findByNombreUsuario("noexiste");
        assertThat(encontrado).isEmpty();
    }

    @Test
    @DisplayName("findByCorreo deberia retornar usuario existente")
    void findByCorreo_deberiaRetornarUsuario() {
        Optional<Usuario> encontrado = usuarioRepository.findByCorreo("juan@test.com");
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombreUsuario()).isEqualTo("juanperez");
    }

    @Test
    @DisplayName("findByCorreoIgnoreCase deberia ignorar mayusculas/minusculas")
    void findByCorreoIgnoreCase_deberiaIgnorarCase() {
        Optional<Usuario> encontrado = usuarioRepository.findByCorreoIgnoreCase("JUAN@TEST.COM");
        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNombreUsuario()).isEqualTo("juanperez");
    }

    @Test
    @DisplayName("existsByNombreUsuario deberia retornar true si existe")
    void existsByNombreUsuario_deberiaRetornarTrue() {
        boolean existe = usuarioRepository.existsByNombreUsuario("juanperez");
        assertThat(existe).isTrue();
    }

    @Test
    @DisplayName("existsByCorreo deberia retornar false si no existe")
    void existsByCorreo_deberiaRetornarFalse() {
        boolean existe = usuarioRepository.existsByCorreo("otro@test.com");
        assertThat(existe).isFalse();
    }
}
