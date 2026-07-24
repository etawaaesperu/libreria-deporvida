package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DireccionRequest {

    @NotBlank(message = "Etiqueta is required")
    @Size(max = 50, message = "Etiqueta must not exceed 50 characters")
    private String etiqueta;

    @NotBlank(message = "Full nombre is required")
    @Size(max = 100, message = "Full nombre must not exceed 100 characters")
    private String nombreCompleto;

    @Size(max = 20, message = "Telefono must not exceed 20 characters")
    private String telefono;

    @NotBlank(message = "Direccion line 1 is required")
    @Size(max = 255, message = "Direccion line 1 must not exceed 255 characters")
    private String direccionLinea1;

    @Size(max = 255, message = "Direccion line 2 must not exceed 255 characters")
    private String direccionLinea2;

    @NotBlank(message = "Ciudad is required")
    @Size(max = 100, message = "Ciudad must not exceed 100 characters")
    private String ciudad;

    @NotBlank(message = "Departamento is required")
    @Size(max = 100, message = "Departamento must not exceed 100 characters")
    private String departamento;

    @NotBlank(message = "Zip code is required")
    @Size(max = 20, message = "Zip code must not exceed 20 characters")
    private String codigoPostal;

    @NotBlank(message = "Pais is required")
    @Size(max = 100, message = "Pais must not exceed 100 characters")
    private String pais;

    private Boolean direccionPredeterminada;

    private Boolean facturacion;
}