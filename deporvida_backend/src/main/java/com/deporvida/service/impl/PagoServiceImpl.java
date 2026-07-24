package com.deporvida.service.impl;

import com.deporvida.dto.request.PagoRequest;
import com.deporvida.dto.response.PagoResponse;
import com.deporvida.entity.Pedido;
import com.deporvida.entity.Pago;
import com.deporvida.enums.MetodoPago;
import com.deporvida.enums.EstadoPago;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.exception.ProcesamientoPagoException;
import com.deporvida.mapper.PagoMapper;
import com.deporvida.repository.PedidoRepository;
import com.deporvida.repository.PagoRepository;
import com.deporvida.service.PagoService;
import lombok.RequiredArgsConstructor;
import com.deporvida.exception.AccesoDenegadoException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepository;
    private final PedidoRepository pedidoRepository;
    private final PagoMapper pagoMapper;

    @Override
    public PagoResponse createPago(PagoRequest request, Long requesterUsuarioId, boolean isAdmin) {
        Pedido pedido = pedidoRepository.findById(request.getPedidoId())
            .orElseThrow(() -> new RecursoNoEncontradoException("Pedido not found with id: " + request.getPedidoId()));
        assertOwnerOrAdmin(pedido, requesterUsuarioId, isAdmin);

        if (pedido.getPago() != null) {
            throw new IllegalStateException("Pago already exists for this pedido");
        }
        
        if (request.getMonto().compareTo(pedido.getMontoTotal()) != 0) {
            throw new ProcesamientoPagoException("Pago monto does not match pedido total");
        }
        
        Pago pago = new Pago();
        pago.setPedido(pedido);
        pago.setReferenciaPago(generateReferenciaPago());
        pago.setMetodoPago(request.getMetodoPago());
        pago.setMonto(request.getMonto());
        pago.setMoneda("PEN");
        pago.setEstado(EstadoPago.PENDIENTE);
        
        Pago saved = pagoRepository.save(pago);
        return pagoMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public PagoResponse getById(Long id, Long requesterUsuarioId, boolean isAdmin) {
        Pago pago = pagoRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pago not found with id: " + id));
        assertOwnerOrAdmin(pago, requesterUsuarioId, isAdmin);
        return pagoMapper.toResponse(pago);
    }

    @Override
    @Transactional(readOnly = true)
    public PagoResponse getByPedidoId(Long pedidoId, Long requesterUsuarioId, boolean isAdmin) {
        Pago pago = pagoRepository.findByPedidoId(pedidoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pago not found for pedido id: " + pedidoId));
        assertOwnerOrAdmin(pago, requesterUsuarioId, isAdmin);
        return pagoMapper.toResponse(pago);
    }

    @Override
    public PagoResponse processPago(Long pagoId, Long requesterUsuarioId, boolean isAdmin) {
        Pago pago = pagoRepository.findById(pagoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pago not found with id: " + pagoId));
        assertOwnerOrAdmin(pago, requesterUsuarioId, isAdmin);

        if (pago.getEstado() != EstadoPago.PENDIENTE) {
            throw new IllegalStateException("Pago is not in pending estado");
        }
        
        pago.setEstado(EstadoPago.PROCESANDO);
        pagoRepository.save(pago);
        
        try {
            boolean success = processWithGateway(pago);
            
            if (success) {
                pago.setEstado(EstadoPago.COMPLETADO);
                pago.setFechaPago(LocalDateTime.now());
                pago.setIdTransaccion(generateIdTransaccion());
                pago.getPedido().setEstado(com.deporvida.enums.EstadoPedido.CONFIRMADO);
                pedidoRepository.save(pago.getPedido());
            } else {
                pago.setEstado(EstadoPago.FALLIDO);
                pago.setMotivoFallo("Pago gateway rejected the transaction");
            }
        } catch (Exception e) {
            pago.setEstado(EstadoPago.FALLIDO);
            pago.setMotivoFallo(e.getMessage());
        }
        
        return pagoMapper.toResponse(pagoRepository.save(pago));
    }

    @Override
    public PagoResponse refund(Long pagoId, String reason) {
        Pago pago = pagoRepository.findById(pagoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pago not found with id: " + pagoId));
        
        if (pago.getEstado() != EstadoPago.COMPLETADO) {
            throw new IllegalStateException("Only completed pagos can be refunded");
        }
        
        pago.setEstado(EstadoPago.REEMBOLSADO);
        pago.setFechaReembolso(LocalDateTime.now());
        pago.setMontoReembolso(pago.getMonto());
        pago.setMotivoFallo(reason);
        pago.getPedido().setEstado(com.deporvida.enums.EstadoPedido.REEMBOLSADO);
        pedidoRepository.save(pago.getPedido());
        
        return pagoMapper.toResponse(pagoRepository.save(pago));
    }

    @Override
    public PagoResponse cancel(Long pagoId, Long requesterUsuarioId, boolean isAdmin) {
        Pago pago = pagoRepository.findById(pagoId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Pago not found with id: " + pagoId));
        assertOwnerOrAdmin(pago, requesterUsuarioId, isAdmin);

        if (pago.getEstado() != EstadoPago.PENDIENTE && pago.getEstado() != EstadoPago.PROCESANDO) {
            throw new IllegalStateException("Only pending or processing pagos can be cancelled");
        }
        
        pago.setEstado(EstadoPago.CANCELADO);
        
        return pagoMapper.toResponse(pagoRepository.save(pago));
    }

    private void assertOwnerOrAdmin(Pago pago, Long requesterUsuarioId, boolean isAdmin) {
        if (isAdmin) {
            return;
        }
        Pedido pedido = pago.getPedido();
        if (requesterUsuarioId == null || pedido == null || pedido.getUsuario() == null
                || !pedido.getUsuario().getId().equals(requesterUsuarioId)) {
            throw new AccesoDenegadoException("No tienes permiso para acceder a este pago");
        }
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

    private boolean processWithGateway(Pago pago) {
        return true;
    }

    private String generateReferenciaPago() {
        return "PAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private String generateIdTransaccion() {
        return "TXN-" + System.currentTimeMillis();
    }
}