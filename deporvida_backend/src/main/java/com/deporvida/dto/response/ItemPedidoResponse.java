package com.deporvida.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemPedidoResponse {

    private Long id;

    private Integer cantidad;

    private BigDecimal precioUnitario;

    private BigDecimal precioDescuento;

    private BigDecimal precioTotal;

    private BigDecimal precioUnitarioEfectivo;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private LibroResponse libro;
}