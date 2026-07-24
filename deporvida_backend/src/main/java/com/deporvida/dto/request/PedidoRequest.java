package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoRequest {

    @Size(max = 500, message = "Shipping direccion must not exceed 500 characters")
    private String direccionEnvio;

    @Size(max = 100, message = "Ciudad must not exceed 100 characters")
    private String ciudadEnvio;

    @Size(max = 100, message = "Departamento must not exceed 100 characters")
    private String departamentoEnvio;

    @Size(max = 20, message = "Zip code must not exceed 20 characters")
    private String codigoPostalEnvio;

    @Size(max = 100, message = "Pais must not exceed 100 characters")
    private String paisEnvio;

    @Size(max = 20, message = "Telefono must not exceed 20 characters")
    private String telefonoEnvio;

    @Size(max = 1000, message = "Notas must not exceed 1000 characters")
    private String notas;

    @DecimalMin(value = "0.0", message = "Shipping cost must be non-negative")
    private BigDecimal costoEnvio;
}