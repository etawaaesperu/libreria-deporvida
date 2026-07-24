package com.deporvida.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibroResponse {

    private Long id;

    private String titulo;

    private String isbn13;

    private String isbn10;

    private String descripcion;

    private BigDecimal precio;

    private BigDecimal precioOferta;

    private BigDecimal precioEfectivo;

    private Boolean enOferta;

    private LocalDate fechaPublicacion;

    private String editorial;

    private Integer paginas;

    private String idioma;

    private String urlPortada;

    private String urlMiniatura;

    private Boolean activo;

    private Boolean destacado;

    private Boolean masVendido;

    private BigDecimal calificacionPromedio;

    private Integer cantidadResenas;

    private Long cantidadVistas;

    private Long cantidadVentas;

    private Integer pesoGramos;

    private String dimensiones;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private CategoriaResponse categoria;

    private Set<AutorResponse> autors;

    private InventarioResponse inventario;
}