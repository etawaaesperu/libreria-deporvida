package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "direcciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Direccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "etiqueta", length = 50)
    private String etiqueta;

    @NotBlank
    @Size(max = 100)
    @Column(name = "full_nombre", length = 100, nullable = false)
    private String nombreCompleto;

    @Size(max = 20)
    @Column(name = "telefono", length = 20)
    private String telefono;

    @NotBlank
    @Size(max = 255)
    @Column(name = "direccion_line1", length = 255, nullable = false)
    private String direccionLinea1;

    @Size(max = 255)
    @Column(name = "direccion_line2", length = 255)
    private String direccionLinea2;

    @NotBlank
    @Size(max = 100)
    @Column(name = "ciudad", length = 100, nullable = false)
    private String ciudad;

    @NotBlank
    @Size(max = 100)
    @Column(name = "departamento", length = 100, nullable = false)
    private String departamento;

    @NotBlank
    @Size(max = 20)
    @Column(name = "zip_code", length = 20, nullable = false)
    private String codigoPostal;

    @NotBlank
    @Size(max = 100)
    @Column(name = "pais", length = 100, nullable = false)
    private String pais;

    @Column(name = "is_default")
    @Builder.Default
    private Boolean direccionPredeterminada = false;

    @Column(name = "is_facturacion")
    @Builder.Default
    private Boolean facturacion = false;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public String obtenerDireccionFormateada() {
        StringBuilder sb = new StringBuilder();
        sb.append(direccionLinea1);
        if (direccionLinea2 != null && !direccionLinea2.isBlank()) {
            sb.append(", ").append(direccionLinea2);
        }
        sb.append(", ").append(ciudad);
        sb.append(", ").append(departamento);
        sb.append(" ").append(codigoPostal);
        sb.append(", ").append(pais);
        return sb.toString();
    }
}