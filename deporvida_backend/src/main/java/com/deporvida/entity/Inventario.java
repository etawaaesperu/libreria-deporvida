package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "inventario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "libro_id", unique = true, nullable = false)
    private Libro libro;

    @NotNull
    @Min(0)
    @Column(name = "cantidad", nullable = false)
    @Builder.Default
    private Integer cantidad = 0;

    @Min(0)
    @Column(name = "reserved_cantidad")
    @Builder.Default
    private Integer cantidadReservada = 0;

    @Min(0)
    @Column(name = "repedido_level")
    @Builder.Default
    private Integer nivelReorden = 10;

    @Min(0)
    @Column(name = "max_stock")
    private Integer stockMaximo;

    @Column(name = "warehouse_location", length = 100)
    private String ubicacionAlmacen;

    @Column(name = "last_restocked_at")
    private LocalDateTime fechaUltimoReabastecimiento;

    @Column(name = "next_repedido_date")
    private LocalDateTime fechaProximoReorden;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    public Integer obtenerCantidadDisponible() {
        return cantidad - cantidadReservada;
    }

    public boolean estaEnStock() {
        return obtenerCantidadDisponible() > 0;
    }

    public boolean tieneStockBajo() {
        return obtenerCantidadDisponible() <= nivelReorden;
    }

    public boolean puedeReservar(int qty) {
        return obtenerCantidadDisponible() >= qty;
    }

    public void reserve(int qty) {
        if (puedeReservar(qty)) {
            cantidadReservada += qty;
        }
    }

    public void release(int qty) {
        cantidadReservada = Math.max(0, cantidadReservada - qty);
    }

    public void fulfill(int qty) {
        release(qty);
        cantidad = Math.max(0, cantidad - qty);
    }

    public void restock(int qty) {
        cantidad += qty;
    }
}