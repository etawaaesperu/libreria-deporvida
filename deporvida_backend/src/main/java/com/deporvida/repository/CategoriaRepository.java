package com.deporvida.repository;

import com.deporvida.entity.Categoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

    Optional<Categoria> findByNombre(String nombre);

    List<Categoria> findByActivoTrue();

    List<Categoria> findByActivoTrueAndPadreIsNull();

    List<Categoria> findByPadreId(Long padreId);

    @Query("SELECT c FROM Categoria c WHERE c.activo = true AND (LOWER(c.nombre) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(c.descripcion) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Categoria> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    boolean existsByNombre(String nombre);
}