package com.deporvida.repository;

import com.deporvida.entity.ItemCarrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemCarritoRepository extends JpaRepository<ItemCarrito, Long> {

    List<ItemCarrito> findByCarritoId(Long carritoId);

    Optional<ItemCarrito> findByCarritoIdAndLibroId(Long carritoId, Long libroId);

    boolean existsByCarritoIdAndLibroId(Long carritoId, Long libroId);

    void deleteByCarritoId(Long carritoId);
}