package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Column(name = "nombre_usuario", nullable = false, unique = true, length = 50)
    private String nombreUsuario;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, unique = true, length = 100)
    private String correo;

    @NotBlank
    @Size(max = 120)
    @Column(name = "contrasena", nullable = false, length = 120)
    private String contrasena;

    @Size(max = 50)
    @Column(name = "nombres", length = 50)
    private String nombres;

    @Size(max = 50)
    @Column(name = "apellidos", length = 50)
    private String apellidos;

    @Size(max = 20)
    @Column(length = 20)
    private String telefono;

    @Column(name = "activo")
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "correo_verificado")
    @Builder.Default
    private Boolean correoVerificado = false;

    @Column(name = "ultimo_inicio_sesion")
    private LocalDateTime ultimoInicioSesion;

    @CreatedDate
    @Column(name = "fecha_creacion", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "fecha_actualizacion")
    private LocalDateTime fechaActualizacion;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "usuario_roles",
        joinColumns = @JoinColumn(name = "usuario_id"),
        inverseJoinColumns = @JoinColumn(name = "rol_id")
    )
    @Builder.Default
    private Set<Rol> roles = new HashSet<>();

    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Carrito carrito;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Pedido> pedidos = new HashSet<>();

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Resena> resenas = new HashSet<>();

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @Builder.Default
    private Set<Direccion> direcciones = new HashSet<>();

    public String obtenerNombreCompleto() {
        if (nombres != null && apellidos != null) {
            return nombres + " " + apellidos;
        }
        return nombreUsuario;
    }
}
