package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutorRequest {

    @NotBlank(message = "Nombre is required")
    @Size(max = 100, message = "Nombre must not exceed 100 characters")
    private String nombre;

    @Size(max = 1000, message = "Biografia must not exceed 1000 characters")
    private String biografia;

    private String fechaNacimiento;

    private String fechaFallecimiento;

    @Size(max = 50, message = "Nacionalidad must not exceed 50 characters")
    private String nacionalidad;

    @Size(max = 500, message = "Image URL must not exceed 500 characters")
    private String urlImagen;
}