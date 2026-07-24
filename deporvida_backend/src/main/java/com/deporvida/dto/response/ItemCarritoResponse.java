package com.deporvida.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemCarritoResponse {

    private Long id;

    private Integer cantidad;

    private BigDecimal precioUnitario;

    private BigDecimal precioTotal;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private LibroResponse libro;
}