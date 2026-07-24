package com.deporvida.repository;

import com.deporvida.entity.Autor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AutorRepository extends JpaRepository<Autor, Long> {

    Optional<Autor> findByNombre(String nombre);

    List<Autor> findAllByOrderByNombreAsc();

    @Query("SELECT a FROM Autor a WHERE LOWER(a.nombre) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Autor> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    boolean existsByNombre(String nombre);
}