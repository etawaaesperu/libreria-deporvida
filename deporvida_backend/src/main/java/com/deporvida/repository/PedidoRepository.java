package com.deporvida.repository;

import com.deporvida.entity.Pedido;
import com.deporvida.enums.EstadoPedido;
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
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    Optional<Pedido> findByNumeroPedido(String numeroPedido);

    List<Pedido> findByUsuarioId(Long usuarioId);

    Page<Pedido> findByUsuarioId(Long usuarioId, Pageable pageable);

    List<Pedido> findByEstado(EstadoPedido estado);

    List<Pedido> findByUsuarioIdAndEstado(Long usuarioId, EstadoPedido estado);

    @Query("SELECT o FROM Pedido o WHERE o.fechaCreacion BETWEEN :startDate AND :endDate")
    List<Pedido> findByFechaCreacionBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT o FROM Pedido o WHERE o.usuario.id = :usuarioId AND o.fechaCreacion BETWEEN :startDate AND :endDate")
    List<Pedido> findByUsuarioIdAndFechaCreacionBetween(@Param("usuarioId") Long usuarioId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    boolean existsByNumeroPedido(String numeroPedido);
}