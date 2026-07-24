package com.deporvida.dto.response;

import com.deporvida.enums.EstadoPedido;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Payload liviano que se envía por WebSocket cuando ocurre un evento sobre un
 * pedido (creación, cambio de estado, cancelación). El front usa esto para
 * refrescar listas/badges en tiempo real; si necesita el detalle completo,
 * lo pide por REST a GET /pedidos/{id}.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionPedidoResponse {

    private Long pedidoId;

    private String numeroPedido;

    private EstadoPedido estado;

    private Long usuarioId;

    private BigDecimal montoTotal;

    /** Tipo de evento: CREADO, ESTADO_ACTUALIZADO, CANCELADO */
    private String tipoEvento;

    private String mensaje;

    private LocalDateTime fecha;
}
