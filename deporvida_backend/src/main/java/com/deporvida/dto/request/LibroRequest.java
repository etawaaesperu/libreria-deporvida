package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LibroRequest {

    @NotBlank
    @Size(max = 200)
    private String titulo;

    @Size(max = 13)
    private String isbn13;

    @Size(max = 10)
    private String isbn10;

    @Size(max = 2000)
    private String descripcion;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal precio;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal precioOferta;

    private LocalDate fechaPublicacion;

    @Size(max = 50)
    private String editorial;

    @Min(1)
    private Integer paginas;

    @Size(max = 20)
    private String idioma;

    @Size(max = 500)
    private String urlPortada;

    @Size(max = 500)
    private String urlMiniatura;

    private Boolean activo;

    private Boolean destacado;

    private Boolean masVendido;

    @Min(0)
    private Integer pesoGramos;

    @Size(max = 50)
    private String dimensiones;

    private Long categoriaId;

    private Set<Long> autoresIds;
}