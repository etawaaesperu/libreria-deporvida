package com.deporvida.service.impl;

import com.deporvida.dto.request.ItemCarritoRequest;
import com.deporvida.dto.response.CarritoResponse;
import com.deporvida.entity.Libro;
import com.deporvida.entity.Carrito;
import com.deporvida.entity.ItemCarrito;
import com.deporvida.entity.Inventario;
import com.deporvida.entity.Usuario;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.CarritoMapper;
import com.deporvida.repository.LibroRepository;
import com.deporvida.repository.ItemCarritoRepository;
import com.deporvida.repository.CarritoRepository;
import com.deporvida.repository.UsuarioRepository;
import com.deporvida.service.CarritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CarritoServiceImpl implements CarritoService {

    private final CarritoRepository carritoRepository;
    private final ItemCarritoRepository itemCarritoRepository;
    private final LibroRepository libroRepository;
    private final UsuarioRepository usuarioRepository;
    private final CarritoMapper carritoMapper;

    @Override
    public CarritoResponse getCarrito(Long usuarioId) {
        Carrito carrito = getOrCreateCarrito(usuarioId);
        return carritoMapper.toResponse(carrito);
    }

    @Override
    public CarritoResponse addItem(Long usuarioId, ItemCarritoRequest request) {
        Carrito carrito = getOrCreateCarrito(usuarioId);
        
        Libro libro = libroRepository.findById(request.getLibroId())
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + request.getLibroId()));
        
        if (!libro.getActivo()) {
            throw new IllegalArgumentException("Libro is not available");
        }
        
        Inventario inventario = libro.getInventario();
        if (inventario == null || inventario.obtenerCantidadDisponible() < request.getCantidad()) {
            throw new IllegalArgumentException("Not enough stock available");
        }
        
        Optional<ItemCarrito> existingItem = itemCarritoRepository.findByCarritoIdAndLibroId(carrito.getId(), libro.getId());
        
        ItemCarrito itemCarrito;
        if (existingItem.isPresent()) {
            itemCarrito = existingItem.get();
            int newCantidad = itemCarrito.getCantidad() + request.getCantidad();
            
            if (inventario.obtenerCantidadDisponible() < newCantidad) {
                throw new IllegalArgumentException("Not enough stock available");
            }
            
            itemCarrito.setCantidad(newCantidad);
        } else {
            itemCarrito = new ItemCarrito();
            itemCarrito.setCarrito(carrito);
            itemCarrito.setLibro(libro);
            itemCarrito.setCantidad(request.getCantidad());
            itemCarrito.setPrecioUnitario(libro.obtenerPrecioEfectivo());
        }
        
        itemCarritoRepository.save(itemCarrito);
        return carritoMapper.toResponse(carrito);
    }

    @Override
    public CarritoResponse updateItem(Long usuarioId, Long itemId, Integer cantidad) {
        Carrito carrito = getOrCreateCarrito(usuarioId);
        
        ItemCarrito itemCarrito = itemCarritoRepository.findById(itemId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Carrito item not found with id: " + itemId));
        
        if (!itemCarrito.getCarrito().getId().equals(carrito.getId())) {
            throw new IllegalArgumentException("Carrito item does not belong to usuario's carrito");
        }
        
        if (cantidad <= 0) {
            itemCarritoRepository.delete(itemCarrito);
        } else {
            Libro libro = itemCarrito.getLibro();
            Inventario inventario = libro.getInventario();
            
            if (inventario == null || inventario.obtenerCantidadDisponible() < cantidad) {
                throw new IllegalArgumentException("Not enough stock available");
            }
            
            itemCarrito.setCantidad(cantidad);
            itemCarritoRepository.save(itemCarrito);
        }
        
        return carritoMapper.toResponse(carrito);
    }

    @Override
    public CarritoResponse removeItem(Long usuarioId, Long itemId) {
        Carrito carrito = getOrCreateCarrito(usuarioId);
        
        ItemCarrito itemCarrito = itemCarritoRepository.findById(itemId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Carrito item not found with id: " + itemId));
        
        if (!itemCarrito.getCarrito().getId().equals(carrito.getId())) {
            throw new IllegalArgumentException("Carrito item does not belong to usuario's carrito");
        }
        
        itemCarritoRepository.delete(itemCarrito);
        return carritoMapper.toResponse(carrito);
    }

    @Override
    public void clearCarrito(Long usuarioId) {
        Carrito carrito = getOrCreateCarrito(usuarioId);
        itemCarritoRepository.deleteByCarritoId(carrito.getId());
    }

    @Override
    @Transactional(readOnly = true)
    public int getItemCount(Long usuarioId) {
        Carrito carrito = carritoRepository.findByUsuarioId(usuarioId).orElse(null);
        if (carrito == null) {
            return 0;
        }
        return itemCarritoRepository.findByCarritoId(carrito.getId()).stream()
            .mapToInt(ItemCarrito::getCantidad)
            .sum();
    }

    private Carrito getOrCreateCarrito(Long usuarioId) {
        return carritoRepository.findByUsuarioId(usuarioId)
            .orElseGet(() -> {
                Usuario usuario = usuarioRepository.findById(usuarioId)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + usuarioId));
                
                Carrito carrito = new Carrito();
                carrito.setUsuario(usuario);
                return carritoRepository.save(carrito);
            });
    }
}