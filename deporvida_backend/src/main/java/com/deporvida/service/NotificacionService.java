package com.deporvida.service;

import com.deporvida.dto.response.NotificacionPedidoResponse;

public interface NotificacionService {

    /**
     * Publica un evento de pedido en dos canales:
     *  - /topic/pedidos/usuario/{usuarioId}  -> el cliente dueño del pedido
     *  - /topic/pedidos/admin                -> paneles de admin/colaborador
     */
    void notificarEventoPedido(NotificacionPedidoResponse notificacion);
}
