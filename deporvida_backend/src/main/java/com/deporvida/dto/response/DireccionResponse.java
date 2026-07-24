package com.deporvida.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DireccionResponse {

    private Long id;

    private String etiqueta;

    private String nombreCompleto;

    private String telefono;

    private String direccionLinea1;

    private String direccionLinea2;

    private String ciudad;

    private String departamento;

    private String codigoPostal;

    private String pais;

    private Boolean direccionPredeterminada;

    private Boolean facturacion;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    public String obtenerDireccionFormateada() {
        StringBuilder sb = new StringBuilder();
        sb.append(direccionLinea1);
        if (direccionLinea2 != null && !direccionLinea2.isBlank()) {
            sb.append(", ").append(direccionLinea2);
        }
        sb.append(", ").append(ciudad);
        sb.append(", ").append(departamento);
        sb.append(" ").append(codigoPostal);
        sb.append(", ").append(pais);
        return sb.toString();
    }
}