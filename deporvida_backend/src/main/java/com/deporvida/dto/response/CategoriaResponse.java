package com.deporvida.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoriaResponse {

    private Long id;

    private String nombre;

    private String descripcion;

    private String urlImagen;

    private Boolean activo;

    private Integer ordenVisualizacion;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private CategoriaResponse padre;

    private Set<CategoriaResponse> hijos;

    private Integer cantidadLibros;
}