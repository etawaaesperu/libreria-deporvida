package com.deporvida.service.impl;

import com.deporvida.dto.request.PedidoRequest;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.dto.response.NotificacionPedidoResponse;
import com.deporvida.entity.Libro;
import com.deporvida.entity.Carrito;
import com.deporvida.entity.ItemCarrito;
import com.deporvida.entity.Inventario;
import com.deporvida.entity.Pedido;
import com.deporvida.entity.ItemPedido;
import com.deporvida.entity.Usuario;
import com.deporvida.enums.EstadoPedido;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.exception.ValidacionException;
import com.deporvida.mapper.PedidoMapper;
import com.deporvida.repository.LibroRepository;
import com.deporvida.repository.CarritoRepository;
import com.deporvida.repository.PedidoRepository;
import com.deporvida.repository.PagoRepository;
import com.deporvida.repository.UsuarioRepository;
import com.deporvida.service.CarritoService;
import com.deporvida.service.PedidoService;
import com.deporvida.service.PagoService;
import com.deporvida.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import com.deporvida.exception.AccesoDenegadoException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository pedidoRepository;
    private final CarritoRepository carritoRepository;
    private final LibroRepository libroRepository;
    private final UsuarioRepository usuarioRepository;
    private final PagoRepository pagoRepository;
    private final CarritoService carritoService;
    private final PagoService pagoService;
    private final PedidoMapper pedidoMapper;
    private final NotificacionService notificacionService;

    @Override
    public PedidoResponse create(Long usuarioId, PedidoRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + usuarioId));
        
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId)
            .orElseThrow(() -> new ValidacionException("Carrito is empty"));
        
        List<ItemCarrito> itemCarritos = new ArrayList<>(carritoRepository.findById(carrito.getId()).get().getItems());
        if (itemCarritos.isEmpty()) {
            throw new ValidacionException("Carrito is empty");
        }
        
        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setNumeroPedido(generateNumeroPedido());
        pedido.setEstado(EstadoPedido.PENDIENTE);
        pedido.setDireccionEnvio(request.getDireccionEnvio());
        pedido.setCiudadEnvio(request.getCiudadEnvio());
        pedido.setDepartamentoEnvio(request.getDepartamentoEnvio());
        pedido.setCodigoPostalEnvio(request.getCodigoPostalEnvio());
        pedido.setPaisEnvio(request.getPaisEnvio());
        pedido.setTelefonoEnvio(request.getTelefonoEnvio());
        pedido.setNotas(request.getNotas());
        
        BigDecimal subtotal = BigDecimal.ZERO;
        List<ItemPedido> itemPedidos = new ArrayList<>();
        
        for (ItemCarrito itemCarrito : itemCarritos) {
            Libro libro = itemCarrito.getLibro();
            Inventario inventario = libro.getInventario();
            
            if (inventario == null || inventario.obtenerCantidadDisponible() < itemCarrito.getCantidad()) {
                throw new ValidacionException("Not enough stock for libro: " + libro.getTitulo());
            }
            
            ItemPedido itemPedido = new ItemPedido();
            itemPedido.setPedido(pedido);
            itemPedido.setLibro(libro);
            itemPedido.setCantidad(itemCarrito.getCantidad());
            itemPedido.setPrecioUnitario(itemCarrito.getPrecioUnitario());
            itemPedido.setPrecioTotal(itemCarrito.getPrecioUnitario().multiply(BigDecimal.valueOf(itemCarrito.getCantidad())));
            
            itemPedidos.add(itemPedido);
            
            subtotal = subtotal.add(itemPedido.getPrecioTotal());
            
            inventario.setCantidad(inventario.getCantidad() - itemCarrito.getCantidad());
            inventario.setCantidadReservada(inventario.getCantidadReservada() + itemCarrito.getCantidad());
            libroRepository.save(libro);
        }
        
        pedido.setItemPedidos(new HashSet<>(itemPedidos));
        pedido.setSubtotal(subtotal);
        
        BigDecimal costoEnvio = request.getCostoEnvio() != null ? request.getCostoEnvio() : BigDecimal.ZERO;
        pedido.setCostoEnvio(costoEnvio);
        
        BigDecimal montoImpuesto = subtotal.multiply(new BigDecimal("0.1"));
        pedido.setMontoImpuesto(montoImpuesto);
        
        BigDecimal total = subtotal.add(costoEnvio).add(montoImpuesto);
        pedido.setMontoTotal(total);
        
        Pedido saved = pedidoRepository.save(pedido);
        
        carritoService.clearCarrito(usuarioId);

        notificacionService.notificarEventoPedido(NotificacionPedidoResponse.builder()
            .pedidoId(saved.getId())
            .numeroPedido(saved.getNumeroPedido())
            .estado(saved.getEstado())
            .usuarioId(usuarioId)
            .montoTotal(saved.getMontoTotal())
            .tipoEvento("CREADO")
            .mensaje("Nuevo pedido " + saved.getNumeroPedido() + " creado")
            .fecha(LocalDateTime.now())
            .build());

        return pedidoMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoResponse getById(Long id, Long requesterUsuarioId, boolean isAdmin) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pedido not found with id: " + id));
        assertOwnerOrAdmin(pedido, requesterUsuarioId, isAdmin);
        return pedidoMapper.toResponse(pedido);
    }

    @Override
    @Transactional(readOnly = true)
    public PedidoResponse getByNumeroPedido(String numeroPedido, Long requesterUsuarioId, boolean isAdmin) {
        Pedido pedido = pedidoRepository.findByNumeroPedido(numeroPedido)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pedido not found with number: " + numeroPedido));
        assertOwnerOrAdmin(pedido, requesterUsuarioId, isAdmin);
        return pedidoMapper.toResponse(pedido);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<PedidoResponse> getUsuarioPedidos(Long usuarioId, Pageable pageable) {
        Page<Pedido> page = pedidoRepository.findByUsuarioId(usuarioId, pageable);
        return PaginaResponse.fromPage(page.map(pedidoMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<PedidoResponse> getAll(Pageable pageable) {
        Page<Pedido> page = pedidoRepository.findAll(pageable);
        return PaginaResponse.fromPage(page.map(pedidoMapper::toResponse));
    }

    @Override
    public PedidoResponse updateEstado(Long id, EstadoPedido estado) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pedido not found with id: " + id));
        
        pedido.setEstado(estado);
        
        if (estado == EstadoPedido.ENVIADO) {
            pedido.setFechaEnvio(LocalDateTime.now());
        } else if (estado == EstadoPedido.ENTREGADO) {
            pedido.setFechaEntrega(LocalDateTime.now());
        } else if (estado == EstadoPedido.CANCELADO) {
            pedido.setFechaCancelacion(LocalDateTime.now());
        }
        
        Pedido actualizado = pedidoRepository.save(pedido);

        notificacionService.notificarEventoPedido(NotificacionPedidoResponse.builder()
            .pedidoId(actualizado.getId())
            .numeroPedido(actualizado.getNumeroPedido())
            .estado(actualizado.getEstado())
            .usuarioId(actualizado.getUsuario().getId())
            .montoTotal(actualizado.getMontoTotal())
            .tipoEvento("ESTADO_ACTUALIZADO")
            .mensaje("Tu pedido " + actualizado.getNumeroPedido() + " ahora está " + actualizado.getEstado())
            .fecha(LocalDateTime.now())
            .build());

        return pedidoMapper.toResponse(actualizado);
    }

    @Override
    public PedidoResponse cancel(Long id, String reason, Long requesterUsuarioId, boolean isAdmin) {
        Pedido pedido = pedidoRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pedido not found with id: " + id));
        assertOwnerOrAdmin(pedido, requesterUsuarioId, isAdmin);

        if (pedido.getEstado() == EstadoPedido.ENTREGADO || pedido.getEstado() == EstadoPedido.ENVIADO) {
            throw new IllegalStateException("Cannot cancel pedido that has been shipped or delivered");
        }
        
        pedido.setEstado(EstadoPedido.CANCELADO);
        pedido.setFechaCancelacion(LocalDateTime.now());
        pedido.setMotivoCancelacion(reason);
        
        for (ItemPedido item : pedido.getItemPedidos()) {
            Libro libro = item.getLibro();
            Inventario inventario = libro.getInventario();
            if (inventario != null) {
                inventario.setCantidad(inventario.getCantidad() + item.getCantidad());
                inventario.setCantidadReservada(inventario.getCantidadReservada() - item.getCantidad());
                libroRepository.save(libro);
            }
        }
        
        Pedido cancelado = pedidoRepository.save(pedido);

        notificacionService.notificarEventoPedido(NotificacionPedidoResponse.builder()
            .pedidoId(cancelado.getId())
            .numeroPedido(cancelado.getNumeroPedido())
            .estado(cancelado.getEstado())
            .usuarioId(cancelado.getUsuario().getId())
            .montoTotal(cancelado.getMontoTotal())
            .tipoEvento("CANCELADO")
            .mensaje("Pedido " + cancelado.getNumeroPedido() + " cancelado: " + reason)
            .fecha(LocalDateTime.now())
            .build());

        return pedidoMapper.toResponse(cancelado);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PedidoResponse> getByEstado(EstadoPedido estado) {
        return pedidoRepository.findByEstado(estado).stream()
            .map(pedidoMapper::toResponse)
            .collect(Collectors.toList());
    }

    private void assertOwnerOrAdmin(Pedido pedido, Long requesterUsuarioId, boolean isAdmin) {
        if (isAdmin) {
            return;
        }
        if (requesterUsuarioId == null || pedido.getUsuario() == null
                || !pedido.getUsuario().getId().equals(requesterUsuarioId)) {
            throw new AccesoDenegadoException("No tienes permiso para acceder a este pedido");
        }
    }

    private String generateNumeroPedido() {
        return "ORD-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000);
    }
}