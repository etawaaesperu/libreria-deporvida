package com.deporvida.service;

import com.deporvida.dto.request.PagoRequest;
import com.deporvida.dto.response.PagoResponse;
import com.deporvida.enums.EstadoPago;

public interface PagoService {

    PagoResponse createPago(PagoRequest request, Long requesterUsuarioId, boolean isAdmin);

    PagoResponse getById(Long id, Long requesterUsuarioId, boolean isAdmin);

    PagoResponse getByPedidoId(Long pedidoId, Long requesterUsuarioId, boolean isAdmin);

    PagoResponse processPago(Long pagoId, Long requesterUsuarioId, boolean isAdmin);

    // Los reembolsos son solo para administradores (se valida en el controlador), no necesita parámetro de propietario.
    PagoResponse refund(Long pagoId, String reason);

    PagoResponse cancel(Long pagoId, Long requesterUsuarioId, boolean isAdmin);
}