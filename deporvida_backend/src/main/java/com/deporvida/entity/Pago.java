package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.deporvida.enums.MetodoPago;
import com.deporvida.enums.EstadoPago;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(name = "pago_reference", unique = true, length = 100, nullable = false)
    private String referenciaPago;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "pago_method", nullable = false, length = 20)
    private MetodoPago metodoPago;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "pago_estado", nullable = false, length = 20)
    @Builder.Default
    private EstadoPago estado = EstadoPago.PENDIENTE;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(name = "monto", nullable = false, precision = 10, scale = 2)
    private BigDecimal monto;

    @Column(name = "moneda", length = 3)
    @Builder.Default
    private String moneda = "USD";

    @Size(max = 100)
    @Column(name = "transaction_id", length = 100)
    private String idTransaccion;

    @Size(max = 200)
    @Column(name = "pago_gateway_response", length = 200)
    private String respuestaPasarela;

    @Size(max = 500)
    @Column(name = "failure_reason", length = 500)
    private String motivoFallo;

    @Column(name = "paid_at")
    private LocalDateTime fechaPago;

    @Column(name = "refunded_at")
    private LocalDateTime fechaReembolso;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "refund_monto", precision = 10, scale = 2)
    private BigDecimal montoReembolso;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false, unique = true)
    private Pedido pedido;
}