package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaRequest {

    @NotBlank(message = "Nombre is required")
    @Size(max = 100, message = "Nombre must not exceed 100 characters")
    private String nombre;

    @Size(max = 500, message = "Descripcion must not exceed 500 characters")
    private String descripcion;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String urlImagen;

    private Long padreId;

    private Integer ordenVisualizacion;
}