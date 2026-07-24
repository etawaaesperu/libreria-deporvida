package com.deporvida.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "carritos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", unique = true, nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<ItemCarrito> items = new HashSet<>();

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    public Integer obtenerCantidadItems() {
        return items.stream().mapToInt(ItemCarrito::getCantidad).sum();
    }

public java.math.BigDecimal obtenerSubtotal() {
        return items.stream()
            .map(item -> item.getLibro().obtenerPrecioEfectivo().multiply(java.math.BigDecimal.valueOf(item.getCantidad())))
            .reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
    }

    public boolean estaVacio() {
        return items.isEmpty();
    }
}