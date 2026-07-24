package com.deporvida.service;

import com.deporvida.dto.request.PedidoRequest;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.enums.EstadoPedido;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PedidoService {

    PedidoResponse create(Long usuarioId, PedidoRequest request);

    /**
     * @param requesterUsuarioId id of the authenticated caller
     * @param isAdmin         true if the caller has ROL_ADMIN (admins can view any pedido)
     */
    PedidoResponse getById(Long id, Long requesterUsuarioId, boolean isAdmin);

    PedidoResponse getByNumeroPedido(String numeroPedido, Long requesterUsuarioId, boolean isAdmin);

    PaginaResponse<PedidoResponse> getUsuarioPedidos(Long usuarioId, Pageable pageable);

    PaginaResponse<PedidoResponse> getAll(Pageable pageable);

    PedidoResponse updateEstado(Long id, EstadoPedido estado);

    PedidoResponse cancel(Long id, String reason, Long requesterUsuarioId, boolean isAdmin);

    List<PedidoResponse> getByEstado(EstadoPedido estado);
}