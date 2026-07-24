package com.deporvida.service.impl;

import com.deporvida.dto.request.ItemCarritoRequest;
import com.deporvida.dto.response.CarritoResponse;
import com.deporvida.entity.*;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.CarritoMapper;
import com.deporvida.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarritoServiceImplTest {

    @Mock private CarritoRepository carritoRepository;
    @Mock private ItemCarritoRepository itemCarritoRepository;
    @Mock private LibroRepository libroRepository;
    @Mock private UsuarioRepository usuarioRepository;
    @Mock private CarritoMapper carritoMapper;

    private CarritoServiceImpl carritoService;
    private Usuario usuario;
    private Libro libro;
    private Inventario inventario;
    private Carrito carrito;
    private ItemCarrito itemExistente;

    @BeforeEach
    void setUp() {
        carritoService = new CarritoServiceImpl(
            carritoRepository, itemCarritoRepository, libroRepository, usuarioRepository, carritoMapper);

        usuario = Usuario.builder().id(1L).nombreUsuario("testuser").build();

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
            .build();
        libro.setInventario(inventario);

        carrito = Carrito.builder().id(1L).usuario(usuario).build();

        itemExistente = new ItemCarrito();
        itemExistente.setId(1L);
        itemExistente.setCarrito(carrito);
        itemExistente.setLibro(libro);
        itemExistente.setCantidad(1);
        itemExistente.setPrecioUnitario(new BigDecimal("29.99"));
    }

    @Test
    @DisplayName("addItem deberia agregar item al carrito")
    void addItem_deberiaAgregarItem() {
        ItemCarritoRequest request = new ItemCarritoRequest();
        request.setLibroId(1L);
        request.setCantidad(2);

        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));
        when(itemCarritoRepository.findByCarritoIdAndLibroId(1L, 1L)).thenReturn(Optional.empty());
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        CarritoResponse response = carritoService.addItem(1L, request);

        assertThat(response).isNotNull();
        verify(itemCarritoRepository).save(any(ItemCarrito.class));
    }

    @Test
    @DisplayName("addItem deberia incrementar cantidad si el item ya existe")
    void addItem_deberiaIncrementarCantidad_siItemExiste() {
        ItemCarritoRequest request = new ItemCarritoRequest();
        request.setLibroId(1L);
        request.setCantidad(2);

        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));
        when(itemCarritoRepository.findByCarritoIdAndLibroId(1L, 1L)).thenReturn(Optional.of(itemExistente));
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        carritoService.addItem(1L, request);

        assertThat(itemExistente.getCantidad()).isEqualTo(3);
        verify(itemCarritoRepository).save(itemExistente);
    }

    @Test
    @DisplayName("addItem deberia lanzar excepcion si el libro no esta activo")
    void addItem_deberiaLanzarExcepcion_siLibroNoActivo() {
        libro.setActivo(false);
        ItemCarritoRequest request = new ItemCarritoRequest();
        request.setLibroId(1L);
        request.setCantidad(2);

        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));

        assertThatThrownBy(() -> carritoService.addItem(1L, request))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("not available");
    }

    @Test
    @DisplayName("addItem deberia lanzar excepcion si no hay stock suficiente")
    void addItem_deberiaLanzarExcepcion_siStockInsuficiente() {
        inventario.setCantidad(0);
        ItemCarritoRequest request = new ItemCarritoRequest();
        request.setLibroId(1L);
        request.setCantidad(2);

        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(libroRepository.findById(1L)).thenReturn(Optional.of(libro));

        assertThatThrownBy(() -> carritoService.addItem(1L, request))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessageContaining("stock");
    }

    @Test
    @DisplayName("updateItem deberia actualizar cantidad del item")
    void updateItem_deberiaActualizarCantidad() {
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(itemCarritoRepository.findById(1L)).thenReturn(Optional.of(itemExistente));
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        carritoService.updateItem(1L, 1L, 3);

        assertThat(itemExistente.getCantidad()).isEqualTo(3);
        verify(itemCarritoRepository).save(itemExistente);
    }

    @Test
    @DisplayName("updateItem deberia eliminar item si cantidad es 0 o menor")
    void updateItem_deberiaEliminarItem_siCantidadCero() {
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(itemCarritoRepository.findById(1L)).thenReturn(Optional.of(itemExistente));
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        carritoService.updateItem(1L, 1L, 0);

        verify(itemCarritoRepository).delete(itemExistente);
    }

    @Test
    @DisplayName("removeItem deberia eliminar item del carrito")
    void removeItem_deberiaEliminarItem() {
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));
        when(itemCarritoRepository.findById(1L)).thenReturn(Optional.of(itemExistente));
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        carritoService.removeItem(1L, 1L);

        verify(itemCarritoRepository).delete(itemExistente);
    }

    @Test
    @DisplayName("clearCarrito deberia limpiar todos los items")
    void clearCarrito_deberiaLimpiarItems() {
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.of(carrito));

        carritoService.clearCarrito(1L);

        verify(itemCarritoRepository).deleteByCarritoId(1L);
    }

    @Test
    @DisplayName("getCarrito deberia crear carrito nuevo si no existe")
    void getCarrito_deberiaCrearCarrito_siNoExiste() {
        when(carritoRepository.findByUsuarioId(1L)).thenReturn(Optional.empty());
        when(usuarioRepository.findById(1L)).thenReturn(Optional.of(usuario));
        when(carritoRepository.save(any(Carrito.class))).thenReturn(carrito);
        when(carritoMapper.toResponse(any(Carrito.class)))
            .thenReturn(CarritoResponse.builder().id(1L).build());

        CarritoResponse response = carritoService.getCarrito(1L);

        assertThat(response).isNotNull();
        verify(carritoRepository).save(any(Carrito.class));
    }
}
