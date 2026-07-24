package com.deporvida.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventarioResponse {

    private Long id;

    private Integer cantidad;

    private Integer cantidadReservada;

    private Integer cantidadDisponible;

    private Integer nivelReorden;

    private Integer stockMaximo;

    private String ubicacionAlmacen;

    private LocalDateTime fechaUltimoReabastecimiento;

    private LocalDateTime fechaProximoReorden;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private Boolean enStock;

    private Boolean stockBajo;
}