package com.deporvida.integration;

import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.entity.Rol;
import com.deporvida.repository.RolRepository;
import com.deporvida.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Tag("integracion")
class SecurityConfigTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    private String tokenAdmin;
    private String tokenUsuario;

    @BeforeEach
    void setUp() throws Exception {
        rolRepository.deleteAll();
        usuarioRepository.deleteAll();

        Rol rolUsuario = new Rol();
        rolUsuario.setNombre(Rol.NombreRol.ROL_USUARIO);
        rolUsuario.setDescripcion("Usuario");
        rolUsuario = rolRepository.save(rolUsuario);

        Rol rolAdmin = new Rol();
        rolAdmin.setNombre(Rol.NombreRol.ROL_ADMIN);
        rolAdmin.setDescripcion("Admin");
        rolRepository.save(rolAdmin);

        RegistroRequest regUser = RegistroRequest.builder()
            .nombreUsuario("usuariotest")
            .correo("user@test.com")
            .contrasena("password123")
            .build();

        String userResponse = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(regUser)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

        tokenUsuario = objectMapper.readValue(userResponse, AutenticacionResponse.class).getToken();

        RegistroRequest regAdmin = RegistroRequest.builder()
            .nombreUsuario("admintest")
            .correo("admin@test.com")
            .contrasena("password123")
            .nombres("Admin")
            .apellidos("Test")
            .build();

        String adminRegResponse = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(regAdmin)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

        AutenticacionResponse adminReg = objectMapper.readValue(adminRegResponse, AutenticacionResponse.class);

        com.deporvida.entity.Usuario adminEntity = usuarioRepository.findById(adminReg.getId())
            .orElseThrow();
        adminEntity.setRoles(Set.of(rolAdmin));
        usuarioRepository.save(adminEntity);

        InicioSesionRequest loginAdmin = InicioSesionRequest.builder()
            .nombreUsuario("admintest")
            .contrasena("password123")
            .build();

        String adminLoginResponse = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginAdmin)))
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

        tokenAdmin = objectMapper.readValue(adminLoginResponse, AutenticacionResponse.class).getToken();
    }

    @Test
    @DisplayName("endpoint publico deberia retornar 200 sin token")
    void endpointPublico_deberiaRetornar200_sinToken() throws Exception {
        mockMvc.perform(get("/libros"))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("endpoint protegido deberia retornar 401 sin token")
    void endpointProtegido_deberiaRetornar401_sinToken() throws Exception {
        mockMvc.perform(get("/carrito"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("endpoint de admin deberia retornar 403 con token de usuario normal")
    void endpointAdmin_deberiaRetornar403_conTokenUsuarioNormal() throws Exception {
        mockMvc.perform(get("/pedidos/all")
                .header("Authorization", "Bearer " + tokenUsuario))
            .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("endpoint de admin deberia retornar 200 con token de admin")
    void endpointAdmin_deberiaRetornar200_conTokenAdmin() throws Exception {
        mockMvc.perform(get("/pedidos/all")
                .header("Authorization", "Bearer " + tokenAdmin))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("endpoint protegido deberia retornar 200 con token valido")
    void endpointProtegido_deberiaRetornar200_conToken() throws Exception {
        mockMvc.perform(get("/carrito")
                .header("Authorization", "Bearer " + tokenUsuario))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("auth/register deberia estar accesible sin token")
    void authRegister_deberiaSerPublico() throws Exception {
        RegistroRequest request = RegistroRequest.builder()
            .nombreUsuario("publicuser")
            .correo("public@test.com")
            .contrasena("password123")
            .build();

        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("/actuator/health deberia estar accesible sin token")
    void actuatorHealth_deberiaSerPublico() throws Exception {
        mockMvc.perform(get("/actuator/health"))
            .andExpect(status().isOk());
    }
}
