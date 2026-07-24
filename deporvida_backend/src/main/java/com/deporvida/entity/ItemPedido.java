package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedido_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Positive
    @Column(nullable = false)
    private Integer cantidad;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "unit_precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioUnitario;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "discount_precio", precision = 10, scale = 2)
    private BigDecimal precioDescuento;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "total_precio", nullable = false, precision = 10, scale = 2)
    private BigDecimal precioTotal;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "libro_id", nullable = false)
    private Libro libro;

    public BigDecimal obtenerPrecioUnitarioFinal() {
        return precioDescuento != null && precioDescuento.compareTo(BigDecimal.ZERO) > 0
            ? precioDescuento
            : precioUnitario;
    }
}