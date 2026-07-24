package com.deporvida.repository;

import com.deporvida.entity.Libro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LibroRepository extends JpaRepository<Libro, Long> {

    Optional<Libro> findByIsbn13(String isbn13);

    Optional<Libro> findByIsbn10(String isbn10);

    List<Libro> findByActivoTrueAndDestacadoTrue();

    List<Libro> findByActivoTrueAndMasVendidoTrue();

    Page<Libro> findByActivoTrue(Pageable pageable);

    Page<Libro> findByCategoriaIdAndActivoTrue(Long categoriaId, Pageable pageable);

    @Query("SELECT b FROM Libro b WHERE b.activo = true AND (LOWER(b.titulo) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(b.descripcion) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Libro> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query("SELECT b FROM Libro b WHERE b.activo = true AND b.categoria.id = :categoriaId")
    Page<Libro> findByCategoriaId(@Param("categoriaId") Long categoriaId, Pageable pageable);

    @Query("SELECT b FROM Libro b WHERE b.activo = true AND :autorId MEMBER OF b.autors")
    Page<Libro> findByAutorId(@Param("autorId") Long autorId, Pageable pageable);

    List<Libro> findByActivoTrueOrderByCantidadVentasDesc();

    List<Libro> findByActivoTrueOrderByCantidadVistasDesc();

    List<Libro> findByActivoTrueOrderByCalificacionPromedioDesc();

    boolean existsByIsbn13(String isbn13);

    boolean existsByIsbn10(String isbn10);
}