package com.deporvida.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "autors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Autor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String nombre;

    @Size(max = 1000)
    @Column(length = 1000)
    private String biografia;

    @Column(name = "birth_date")
    private LocalDate fechaNacimiento;

    @Column(name = "death_date")
    private LocalDate fechaFallecimiento;

    @Size(max = 50)
    @Column(length = 50)
    private String nacionalidad;

    @Column(name = "image_url", length = 500)
    private String urlImagen;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime fechaActualizacion;

    @ManyToMany(mappedBy = "autors")
    @Builder.Default
    private Set<Libro> libros = new HashSet<>();
}