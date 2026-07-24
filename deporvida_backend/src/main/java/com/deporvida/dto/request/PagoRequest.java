package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PagoRequest {

    @NotNull(message = "Pedido ID is required")
    private Long pedidoId;

    @NotNull(message = "Pago method is required")
    private com.deporvida.enums.MetodoPago metodoPago;

    @NotNull(message = "Monto is required")
    @DecimalMin(value = "0.01", message = "Monto must be greater than 0")
    private BigDecimal monto;
}