package com.deporvida.dto.response;

import com.deporvida.enums.MetodoPago;
import com.deporvida.enums.EstadoPago;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoResponse {

    private Long id;

    private String referenciaPago;

    private MetodoPago metodoPago;

    private EstadoPago estado;

    private BigDecimal monto;

    private String moneda;

    private String idTransaccion;

    private String respuestaPasarela;

    private String motivoFallo;

    private LocalDateTime fechaPago;

    private LocalDateTime fechaReembolso;

    private BigDecimal montoReembolso;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private PedidoResponse pedido;
}