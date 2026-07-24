package com.deporvida.service.impl;

import com.deporvida.dto.response.NotificacionPedidoResponse;
import com.deporvida.service.NotificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificacionServiceImpl implements NotificacionService {

    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void notificarEventoPedido(NotificacionPedidoResponse notificacion) {
        // Canal personal: solo el dueño del pedido lo recibe
        messagingTemplate.convertAndSend(
            "/topic/pedidos/usuario/" + notificacion.getUsuarioId(),
            notificacion
        );

        // Canal admin: paneles de administración/colaboradores ven todos los eventos
        messagingTemplate.convertAndSend("/topic/pedidos/admin", notificacion);
    }
}
