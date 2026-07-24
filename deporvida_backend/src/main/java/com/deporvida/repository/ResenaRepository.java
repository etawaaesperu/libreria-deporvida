package com.deporvida.repository;

import com.deporvida.entity.Resena;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResenaRepository extends JpaRepository<Resena, Long> {

    List<Resena> findByLibroId(Long libroId);

    Page<Resena> findByLibroId(Long libroId, Pageable pageable);

    List<Resena> findByUsuarioId(Long usuarioId);

    Optional<Resena> findByUsuarioIdAndLibroId(Long usuarioId, Long libroId);

    List<Resena> findByLibroIdAndAprobadoTrue(Long libroId);

    @Query("SELECT AVG(r.calificacion) FROM Resena r WHERE r.libro.id = :libroId AND r.aprobado = true")
    Double findCalificacionPromedioByLibroId(@Param("libroId") Long libroId);

    @Query("SELECT COUNT(r) FROM Resena r WHERE r.libro.id = :libroId AND r.aprobado = true")
    Long countAprobadoByLibroId(@Param("libroId") Long libroId);

    boolean existsByUsuarioIdAndLibroId(Long usuarioId, Long libroId);
}