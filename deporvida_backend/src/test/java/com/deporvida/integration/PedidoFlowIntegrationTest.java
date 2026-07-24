package com.deporvida.integration;

import com.deporvida.dto.request.InicioSesionRequest;
import com.deporvida.dto.request.ItemCarritoRequest;
import com.deporvida.dto.request.PedidoRequest;
import com.deporvida.dto.request.RegistroRequest;
import com.deporvida.dto.response.AutenticacionResponse;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.entity.*;
import com.deporvida.enums.EstadoPedido;
import com.deporvida.repository.*;
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
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Tag("integracion")
class PedidoFlowIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private InventarioRepository inventarioRepository;

    private String jwtToken;
    private Long libroId;

    @BeforeEach
    void setUp() throws Exception {
        rolRepository.deleteAll();
        libroRepository.deleteAll();
        autorRepository.deleteAll();
        categoriaRepository.deleteAll();
        inventarioRepository.deleteAll();

        Rol rolUsuario = new Rol();
        rolUsuario.setNombre(Rol.NombreRol.ROL_USUARIO);
        rolUsuario.setDescripcion("Cliente");
        rolRepository.save(rolUsuario);

        Rol rolAdmin = new Rol();
        rolAdmin.setNombre(Rol.NombreRol.ROL_ADMIN);
        rolAdmin.setDescripcion("Admin");
        rolRepository.save(rolAdmin);

        Categoria categoria = new Categoria();
        categoria.setNombre("Test Categoria");
        categoria.setActivo(true);
        categoria = categoriaRepository.save(categoria);

        Autor autor = new Autor();
        autor.setNombre("Test Autor");
        autor = autorRepository.save(autor);

        Libro libro = new Libro();
        libro.setTitulo("Libro de Integration Test");
        libro.setPrecio(new BigDecimal("29.99"));
        libro.setActivo(true);
        libro.setCategoria(categoria);
        libro = libroRepository.save(libro);
        libroId = libro.getId();

        Inventario inventario = new Inventario();
        inventario.setLibro(libro);
        inventario.setCantidad(100);
        inventario.setNivelReorden(10);
        inventarioRepository.save(inventario);

        RegistroRequest registroRequest = RegistroRequest.builder()
            .nombreUsuario("flujouser")
            .correo("flujo@test.com")
            .contrasena("password123")
            .nombres("Flujo")
            .apellidos("Test")
            .build();

        MvcResult registerResult = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registroRequest)))
            .andExpect(status().isOk())
            .andReturn();

        AutenticacionResponse authResponse = objectMapper.readValue(
            registerResult.getResponse().getContentAsString(), AutenticacionResponse.class);

        InicioSesionRequest loginRequest = InicioSesionRequest.builder()
            .nombreUsuario("flujouser")
            .contrasena("password123")
            .build();

        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
            .andExpect(status().isOk())
            .andReturn();

        authResponse = objectMapper.readValue(
            loginResult.getResponse().getContentAsString(), AutenticacionResponse.class);
        jwtToken = authResponse.getToken();

        assertThat(jwtToken).isNotNull();
    }

    @Test
    @DisplayName("flujo completo: registrar -> login -> agregar al carrito -> crear pedido -> cambiar estado")
    void flujoCompleto_deberiaCrearYActualizarPedido() throws Exception {
        ItemCarritoRequest itemRequest = new ItemCarritoRequest();
        itemRequest.setLibroId(libroId);
        itemRequest.setCantidad(2);

        mockMvc.perform(post("/carrito/items")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(itemRequest)))
            .andExpect(status().isOk());

        PedidoRequest pedidoRequest = new PedidoRequest();
        pedidoRequest.setDireccionEnvio("Av. Principal 123");
        pedidoRequest.setCiudadEnvio("Lima");
        pedidoRequest.setDepartamentoEnvio("Lima");
        pedidoRequest.setCodigoPostalEnvio("15000");
        pedidoRequest.setPaisEnvio("Peru");
        pedidoRequest.setTelefonoEnvio("999888777");
        pedidoRequest.setCostoEnvio(new BigDecimal("5.00"));

        MvcResult createResult = mockMvc.perform(post("/pedidos")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pedidoRequest)))
            .andExpect(status().isOk())
            .andReturn();

        PedidoResponse pedidoResponse = objectMapper.readValue(
            createResult.getResponse().getContentAsString(), PedidoResponse.class);

        assertThat(pedidoResponse.getId()).isNotNull();
        assertThat(pedidoResponse.getNumeroPedido()).isNotNull();

        MvcResult getResult = mockMvc.perform(get("/pedidos/" + pedidoResponse.getId())
                .header("Authorization", "Bearer " + jwtToken))
            .andExpect(status().isOk())
            .andReturn();

        PedidoResponse pedidoObtenido = objectMapper.readValue(
            getResult.getResponse().getContentAsString(), PedidoResponse.class);
        assertThat(pedidoObtenido.getEstado()).isEqualTo(EstadoPedido.PENDIENTE);

        mockMvc.perform(put("/pedidos/" + pedidoResponse.getId() + "/estado")
                .param("estado", "CONFIRMADO")
                .header("Authorization", "Bearer " + jwtToken))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("deberia denegar acceso a pedido de otro usuario")
    void deberiaDenegarAcceso_aPedidoDeOtro() throws Exception {
        ItemCarritoRequest itemRequest = new ItemCarritoRequest();
        itemRequest.setLibroId(libroId);
        itemRequest.setCantidad(1);

        mockMvc.perform(post("/carrito/items")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(itemRequest)))
            .andExpect(status().isOk());

        PedidoRequest pedidoRequest = new PedidoRequest();
        pedidoRequest.setDireccionEnvio("Av. Principal 123");
        pedidoRequest.setCiudadEnvio("Lima");
        pedidoRequest.setDepartamentoEnvio("Lima");
        pedidoRequest.setCodigoPostalEnvio("15000");
        pedidoRequest.setPaisEnvio("Peru");
        pedidoRequest.setTelefonoEnvio("999888777");
        pedidoRequest.setCostoEnvio(new BigDecimal("5.00"));

        MvcResult createResult = mockMvc.perform(post("/pedidos")
                .header("Authorization", "Bearer " + jwtToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pedidoRequest)))
            .andExpect(status().isOk())
            .andReturn();

        PedidoResponse pedidoResponse = objectMapper.readValue(
            createResult.getResponse().getContentAsString(), PedidoResponse.class);

        RegistroRequest otroUser = RegistroRequest.builder()
            .nombreUsuario("otronuser")
            .correo("otro@test.com")
            .contrasena("password123")
            .build();

        MvcResult regResult = mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(otroUser)))
            .andExpect(status().isOk())
            .andReturn();

        AutenticacionResponse otroAuth = objectMapper.readValue(
            regResult.getResponse().getContentAsString(), AutenticacionResponse.class);

        InicioSesionRequest loginOtro = InicioSesionRequest.builder()
            .nombreUsuario("otronuser")
            .contrasena("password123")
            .build();

        MvcResult loginOtroResult = mockMvc.perform(post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginOtro)))
            .andExpect(status().isOk())
            .andReturn();

        AutenticacionResponse otroAuthResp = objectMapper.readValue(
            loginOtroResult.getResponse().getContentAsString(), AutenticacionResponse.class);

        mockMvc.perform(get("/pedidos/" + pedidoResponse.getId())
                .header("Authorization", "Bearer " + otroAuthResp.getToken()))
            .andExpect(status().isForbidden());
    }
}
