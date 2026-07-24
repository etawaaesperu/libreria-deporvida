package com.deporvida.dto.response;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutorResponse {

    private Long id;

    private String nombre;

    private String biografia;

    private LocalDate fechaNacimiento;

    private LocalDate fechaFallecimiento;

    private String nacionalidad;

    private String urlImagen;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private Integer cantidadLibros;
}