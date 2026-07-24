package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "libros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Libro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 200)
    @Column(nullable = false, length = 200)
    private String titulo;

    @Size(max = 13)
    @Column(name = "isbn_13", unique = true, length = 13)
    private String isbn13;

    @Size(max = 10)
    @Column(name = "isbn_10", unique = true, length = 10)
    private String isbn10;

    @Size(max = 2000)
    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @DecimalMin(value = "0.0", inclusive = true)
    @Column(name = "sale_precio", precision = 10, scale = 2)
    private BigDecimal precioOferta;

    @Column(name = "publication_date")
    private LocalDate fechaPublicacion;

    @Size(max = 50)
    @Column(name = "editorial", length = 50)
    private String editorial;

    @Min(1)
    @Column(name = "paginas")
    private Integer paginas;

    @Size(max = 20)
    @Column(name = "idioma", length = 20)
    private String idioma;

    @Size(max = 500)
    @Column(name = "cover_image_url", length = 500)
    private String urlPortada;

    @Size(max = 500)
    @Column(name = "thumbnail_url", length = 500)
    private String urlMiniatura;

    @Column(name = "is_activo", nullable = false)
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "is_destacado", nullable = false)
    @Builder.Default
    private Boolean destacado = false;

    @Column(name = "is_mas_vendido", nullable = false)
    @Builder.Default
    private Boolean masVendido = false;

    @Column(name = "average_calificacion", precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal calificacionPromedio = BigDecimal.ZERO;

    @Column(name = "resena_count")
    @Builder.Default
    private Integer cantidadResenas = 0;

    @Column(name = "view_count")
    @Builder.Default
    private Long cantidadVistas = 0L;

    @Column(name = "sales_count")
    @Builder.Default
    private Long cantidadVentas = 0L;

    @Min(0)
    @Column(name = "weight_grams")
    private Integer pesoGramos;

    @Size(max = 50)
    @Column(name = "dimensiones", length = 50)
    private String dimensiones;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "libro_autors",
        joinColumns = @JoinColumn(name = "libro_id"),
        inverseJoinColumns = @JoinColumn(name = "autor_id")
    )
    @Builder.Default
    private Set<Autor> autors = new HashSet<>();

    @OneToOne(mappedBy = "libro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Inventario inventario;

    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<ItemPedido> itemPedidos = new HashSet<>();

    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    private Set<ItemCarrito> itemCarritos = new HashSet<>();

    public BigDecimal obtenerPrecioEfectivo() {
        return precioOferta != null && precioOferta.compareTo(BigDecimal.ZERO) > 0
            ? precioOferta
            : precio;
    }

    public boolean estaEnOferta() {
        return precioOferta != null && precioOferta.compareTo(BigDecimal.ZERO) > 0
            && precioOferta.compareTo(precio) < 0;
    }
}