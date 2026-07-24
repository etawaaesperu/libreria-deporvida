package com.deporvida.service.impl;

import com.deporvida.dto.request.PedidoRequest;
import com.deporvida.dto.response.NotificacionPedidoResponse;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.entity.*;
import com.deporvida.enums.EstadoPedido;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.exception.ValidacionException;
import com.deporvida.mapper.PedidoMapper;
import com.deporvida.repository.*;
import com.deporvida.service.CarritoService;
import com.deporvida.service.NotificacionService;
import com.deporvida.service.PagoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceImplTest {

    @Mock private PedidoRepository pedidoRepository;
    @Mock private CarritoRepository carritoRepository;
    @Mock private LibroRepository libroRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private PagoRepository pagoRepository;
    @Mock private CarritoService carritoService;
    @Mock private PagoService pagoService;
    @Mock private PedidoMapper pedidoMapper;
    @Mock private NotificacionService notificacionService;

    @Captor private ArgumentCaptor<NotificacionPedidoResponse> notificacionCaptor;

    private PedidoServiceImpl pedidoService;
    private Usuario usuario;
    private Libro libro;
    private Inventario inventario;
    private Carrito carrito;
    private ItemCarrito itemCarrito;
    private Pedido pedido;
    private PedidoRequest pedidoRequest;

    @BeforeEach
    void setUp() {
        pedidoService = new PedidoServiceImpl(
            pedidoRepository, carritoRepository, libroRepository, usuarioRepository,
            pagoRepository, carritoService, pagoService, pedidoMapper, notificacionService);

        usuario = Usuario.builder()
            .id(1L)
            .nombreUsuario("testuser")
            .correo("test@test.com")
            .build();

        libro = Libro.builder()
            .id(1L)
            .titulo("Test Libro")
            .precio(new BigDecimal("29.99"))
            .activo(true)
            .build();

        inventario = Inventario.builder()
            .id(1L)
            .libro(libro)
            .cantidad(10)
            .cantidadReservada(0)
            .nivelReorden(5)
            .build();

        libro.setInventario(inventario);

        itemCarrito = new ItemCarrito();
        itemCarrito.setId(1L);
        itemCarrito.setLibro(libro);
        itemCarrito.setCantidad(2);
        itemCarrito.setPrecioUnitario(new BigDecimal("29.99"));

        Set<ItemCarrito> items = new HashSet<>();
        items.add(itemCarrito);

        carrito = Carrito.builder()
            .id(1L)
            .usuario(usuario)
            .items(items)
            .build();

        pedido = Pedido.builder()
            .id(1L)
            .usuario(usuario)
            .numeroPedido("ORD-123")
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("59.98"))
            .montoTotal(new BigDecimal("65.98"))
            .itemPedidos(new HashSet<>())
            .build();

        pedidoRequest = new PedidoRequest();
        pedidoRequest.setDireccionEnvio("Calle 123");
        pedidoRequest.setCiudadEnvio("Lima");
        pedidoRequest.setDepartamentoEnvio("Lima");
        pedidoRequest.setCodigoPostalEnvio("15000");
        pedidoRequest.setPaisEnvio("Peru");
        pedidoRequest.setTelefonoEnvio("999888777");
        pedidoRequest.setCostoEnvio(new BigDecimal("5.00"));
    }

    @Test
    @DisplayName("deberia crear pedido exitosamente con items del carrito")
    void deberiaCrearPedidoExitosamente() {
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(carritoRepository.findById(1L)).thenReturn(Optional.of(carrito));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);
        when(pedidoMapper.toResponse(any(Pedido.class)))
            .thenReturn(PedidoResponse.builder().id(1L).numeroPedido("ORD-123").build());

        PedidoResponse response = pedidoService.create(1L, pedidoRequest);

        assertThat(response).isNotNull();
        assertThat(response.getNumeroPedido()).isEqualTo("ORD-123");
        verify(carritoService).clearCarrito(1L);
        verify(notificacionService).notificarEventoPedido(any());
    }

    @Test
    @DisplayName("deberia lanzar excepcion cuando el carrito esta vacio")
    void deberiaLanzarExcepcion_cuandoCarritoEstaVacio() {
        carrito.getItems().clear();
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(carritoRepository.findById(1L)).thenReturn(Optional.of(carrito));

        assertThatThrownBy(() -> pedidoService.create(1L, pedidoRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("Carrito is empty");
    }

    @Test
    @DisplayName("deberia lanzar excepcion cuando no hay stock suficiente")
    void deberiaLanzarExcepcion_cuandoStockInsuficiente() {
        inventario.setCantidad(0);
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(carritoRepository.findById(1L)).thenReturn(Optional.of(carrito));

        assertThatThrownBy(() -> pedidoService.create(1L, pedidoRequest))
            .isInstanceOf(ValidacionException.class)
            .hasMessageContaining("Not enough stock");
    }

    @Test
    @DisplayName("updateEstado deberia notificar con tipoEvento ESTADO_ACTUALIZADO")
    void updateEstado_deberiaNotificarEvento() {
        Pedido pedidoEnProceso = Pedido.builder()
            .id(1L)
            .usuario(usuario)
            .numeroPedido("ORD-123")
            .estado(EstadoPedido.PENDIENTE)
            .subtotal(new BigDecimal("59.98"))
            .montoTotal(new BigDecimal("65.98"))
            .build();

        Pedido pedidoActualizado = Pedido.builder()
            .id(1L)
            .usuario(usuario)
            .numeroPedido("ORD-123")
            .estado(EstadoPedido.CONFIRMADO)
            .subtotal(new BigDecimal("59.98"))
            .montoTotal(new BigDecimal("65.98"))
            .build();

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedidoEnProceso));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedidoActualizado);
        when(pedidoMapper.toResponse(any(Pedido.class)))
            .thenReturn(PedidoResponse.builder().id(1L).numeroPedido("ORD-123").estado(EstadoPedido.CONFIRMADO).build());

        pedidoService.updateEstado(1L, EstadoPedido.CONFIRMADO);

        verify(notificacionService).notificarEventoPedido(notificacionCaptor.capture());
        NotificacionPedidoResponse notificacion = notificacionCaptor.getValue();
        assertThat(notificacion.getTipoEvento()).isEqualTo("ESTADO_ACTUALIZADO");
        assertThat(notificacion.getEstado()).isEqualTo(EstadoPedido.CONFIRMADO);
    }

    @Test
    @DisplayName("cancel deberia cancelar pedido y devolver stock al inventario")
    void cancel_deberiaCancelarYDevolverStock() {
        ItemPedido itemPedido = new ItemPedido();
        itemPedido.setId(1L);
        itemPedido.setLibro(libro);
        itemPedido.setCantidad(2);
        itemPedido.setPrecioUnitario(new BigDecimal("29.99"));
        itemPedido.setPrecioTotal(new BigDecimal("59.98"));
        Set<ItemPedido> items = new HashSet<>();
        items.add(itemPedido);
        pedido.setItemPedidos(items);

        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoRepository.save(any(Pedido.class))).thenReturn(pedido);
        when(pedidoMapper.toResponse(any(Pedido.class)))
            .thenReturn(PedidoResponse.builder().id(1L).estado(EstadoPedido.CANCELADO).build());

        pedidoService.cancel(1L, "Cliente cancelo", 1L, false);

        assertThat(pedido.getEstado()).isEqualTo(EstadoPedido.CANCELADO);
        assertThat(inventario.getCantidad()).isEqualTo(12);
        assertThat(inventario.getCantidadReservada()).isEqualTo(-2);
        verify(notificacionService).notificarEventoPedido(notificacionCaptor.capture());
        assertThat(notificacionCaptor.getValue().getTipoEvento()).isEqualTo("CANCELADO");
    }

    @Test
    @DisplayName("cancel deberia lanzar excepcion cuando el pedido ya fue enviado")
    void cancel_deberiaLanzarExcepcion_cuandoPedidoEnviado() {
        pedido.setEstado(EstadoPedido.ENVIADO);
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        assertThatThrownBy(() -> pedidoService.cancel(1L, "test", 1L, false))
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("shipped");
    }

    @Test
    @DisplayName("cancel deberia lanzar excepcion cuando el pedido ya fue entregado")
    void cancel_deberiaLanzarExcepcion_cuandoPedidoEntregado() {
        pedido.setEstado(EstadoPedido.ENTREGADO);
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        assertThatThrownBy(() -> pedidoService.cancel(1L, "test", 1L, false))
            .isInstanceOf(IllegalStateException.class)
            .hasMessageContaining("delivered");
    }

    @Test
    @DisplayName("getById deberia retornar pedido si es admin")
    void getById_deberiaRetornarPedido_siEsAdmin() {
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));
        when(pedidoMapper.toResponse(any(Pedido.class)))
            .thenReturn(PedidoResponse.builder().id(1L).build());

        PedidoResponse response = pedidoService.getById(1L, 999L, true);

        assertThat(response).isNotNull();
    }

    @Test
    @DisplayName("getById deberia lanzar excepcion si no es dueno ni admin")
    void getById_deberiaLanzarExcepcion_siNoEsOwnerNiAdmin() {
        when(pedidoRepository.findById(1L)).thenReturn(Optional.of(pedido));

        assertThatThrownBy(() -> pedidoService.getById(1L, 999L, false))
            .isInstanceOf(com.deporvida.exception.AccesoDenegadoException.class);
    }

    @Test
    @DisplayName("getUsuarioPedidos deberia retornar pagina de pedidos del usuario")
    void getUsuarioPedidos_deberiaRetornarPedidos() {
        Pageable pageable = PageRequest.of(0, 20);
        Page<Pedido> page = new PageImpl<>(List.of(pedido));
        when(pedidoRepository.findByUsuarioId(1L, pageable)).thenReturn(page);
        when(pedidoMapper.toResponse(any(Pedido.class)))
            .thenReturn(PedidoResponse.builder().id(1L).build());

        PaginaResponse<PedidoResponse> result = pedidoService.getUsuarioPedidos(1L, pageable);

        assertThat(result.getContent()).hasSize(1);
    }
}
