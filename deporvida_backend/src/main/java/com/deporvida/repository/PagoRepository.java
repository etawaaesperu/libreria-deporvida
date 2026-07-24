package com.deporvida.repository;

import com.deporvida.entity.Pago;
import com.deporvida.enums.MetodoPago;
import com.deporvida.enums.EstadoPago;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PagoRepository extends JpaRepository<Pago, Long> {

    Optional<Pago> findByReferenciaPago(String referenciaPago);

    Optional<Pago> findByPedidoId(Long pedidoId);

    List<Pago> findByEstado(EstadoPago estado);

    List<Pago> findByMetodoPago(MetodoPago metodoPago);

    @Query("SELECT p FROM Pago p WHERE p.fechaCreacion BETWEEN :startDate AND :endDate")
    List<Pago> findByFechaCreacionBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    Page<Pago> findByEstado(EstadoPago estado, Pageable pageable);

    boolean existsByReferenciaPago(String referenciaPago);
}