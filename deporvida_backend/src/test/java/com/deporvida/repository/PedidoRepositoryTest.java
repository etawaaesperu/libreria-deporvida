package com.deporvida.repository;

import com.deporvida.entity.Pedido;
import com.deporvida.entity.Usuario;
import com.deporvida.enums.EstadoPedido;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@DataJpaTest
class PedidoRepositoryTest {

    @Autowired
    private TestEntityManager em;

    @Autowired
    private PedidoRepository pedidoRepository;

    private Usuario usuario;

    @BeforeEach
    void setUp() {
        usuario = Usuario.builder()
            .nombreUsuario("testuser")
            .correo("test@test.com")
            .contrasena("password")
            .activo(true)
            .build();
        em.persist(usuario);
    }

    @Test
    @DisplayName("findByNumeroPedido deberia retornar pedido existente")
    void findByNumeroPedido_deberiaRetornarPedido() {
        Pedido pedido = Pedido.builder()
            .numeroPedido("ORD-TEST-001")
            .usuario(usuario)
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("50.00"))
            .montoTotal(new BigDecimal("55.00"))
            .build();
        em.persist(pedido);

        Optional<Pedido> encontrado = pedidoRepository.findByNumeroPedido("ORD-TEST-001");

        assertThat(encontrado).isPresent();
        assertThat(encontrado.get().getNumeroPedido()).isEqualTo("ORD-TEST-001");
    }

    @Test
    @DisplayName("findByNumeroPedido deberia retornar empty si no existe")
    void findByNumeroPedido_deberiaRetornarEmpty_siNoExiste() {
        Optional<Pedido> encontrado = pedidoRepository.findByNumeroPedido("NO-EXISTE");
        assertThat(encontrado).isEmpty();
    }

    @Test
    @DisplayName("findByUsuarioId deberia retornar pedidos del usuario")
    void findByUsuarioId_deberiaRetornarPedidos() {
        Pedido pedido1 = Pedido.builder()
            .numeroPedido("ORD-001")
            .usuario(usuario)
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("50.00"))
            .montoTotal(new BigDecimal("55.00"))
            .build();
        Pedido pedido2 = Pedido.builder()
            .numeroPedido("ORD-002")
            .usuario(usuario)
            .estado(EstadoPedido.CONFIRMADO)
            .subtotal(new BigDecimal("30.00"))
            .montoTotal(new BigDecimal("33.00"))
            .build();
        em.persist(pedido1);
        em.persist(pedido2);

        Page<Pedido> pedidos = pedidoRepository.findByUsuarioId(usuario.getId(), PageRequest.of(0, 10));

        assertThat(pedidos.getContent()).hasSize(2);
    }

    @Test
    @DisplayName("findByEstado deberia retornar pedidos filtrados por estado")
    void findByEstado_deberiaFiltrarPorEstado() {
        Pedido pendiente = Pedido.builder()
            .numeroPedido("ORD-PEND")
            .usuario(usuario)
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("50.00"))
            .montoTotal(new BigDecimal("55.00"))
            .build();
        Pedido confirmado = Pedido.builder()
            .numeroPedido("ORD-CONF")
            .usuario(usuario)
            .estado(EstadoPedido.CONFIRMADO)
            .subtotal(new BigDecimal("30.00"))
            .montoTotal(new BigDecimal("33.00"))
            .build();
        em.persist(pendiente);
        em.persist(confirmado);

        List<Pedido> pendientes = pedidoRepository.findByEstado(EstadoPedido.PENDIENTE);

        assertThat(pendientes).hasSize(1);
        assertThat(pendientes.get(0).getNumeroPedido()).isEqualTo("ORD-PEND");
    }

    @Test
    @DisplayName("existsByNumeroPedido deberia retornar true si existe")
    void existsByNumeroPedido_deberiaRetornarTrue() {
        Pedido pedido = Pedido.builder()
            .numeroPedido("ORD-EXISTS")
            .usuario(usuario)
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("50.00"))
            .montoTotal(new BigDecimal("55.00"))
            .build();
        em.persist(pedido);

        boolean existe = pedidoRepository.existsByNumeroPedido("ORD-EXISTS");
        assertThat(existe).isTrue();
    }
}
