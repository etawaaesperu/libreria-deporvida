package com.deporvida.repository;

import com.deporvida.entity.Inventario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long> {

    Optional<Inventario> findByLibroId(Long libroId);

    boolean existsByLibroId(Long libroId);
}