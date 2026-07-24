package com.deporvida.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CarritoResponse {

    private Long id;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private Integer cantidadItems;

    private BigDecimal subtotal;

    private Set<ItemCarritoResponse> items;
}