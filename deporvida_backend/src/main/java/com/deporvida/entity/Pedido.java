package com.deporvida.entity;

import com.deporvida.enums.EstadoPedido;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pedido_number", unique = true, length = 50, nullable = false)
    private String numeroPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 20)
    @Builder.Default
    private EstadoPedido estado = EstadoPedido.PENDIENTE;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "tax_monto", precision = 10, scale = 2)
    private BigDecimal montoImpuesto;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "shipping_cost", precision = 10, scale = 2)
    private BigDecimal costoEnvio;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "discount_monto", precision = 10, scale = 2)
    private BigDecimal montoDescuento;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "total_monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal montoTotal;

    @Size(max = 500)
    @Column(name = "shipping_direccion", length = 500)
    private String direccionEnvio;

    @Size(max = 100)
    @Column(name = "shipping_ciudad", length = 100)
    private String ciudadEnvio;

    @Size(max = 100)
    @Column(name = "shipping_departamento", length = 100)
    private String departamentoEnvio;

    @Size(max = 20)
    @Column(name = "shipping_zip_code", length = 20)
    private String codigoPostalEnvio;

    @Size(max = 100)
    @Column(name = "shipping_pais", length = 100)
    private String paisEnvio;

    @Size(max = 50)
    @Column(name = "shipping_telefono", length = 50)
    private String telefonoEnvio;

    @Size(max = 1000)
    @Column(name = "notas", length = 1000)
    private String notas;

    @Column(name = "shipped_at")
    private LocalDateTime fechaEnvio;

    @Column(name = "delivered_at")
    private LocalDateTime fechaEntrega;

    @Column(name = "cancelled_at")
    private LocalDateTime fechaCancelacion;

    @Size(max = 500)
    @Column(name = "cancellation_reason", length = 500)
    private String motivoCancelacion;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @Builder.Default
    private Set<ItemPedido> itemPedidos = new HashSet<>();

    @OneToOne(mappedBy = "pedido", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Pago pago;
}