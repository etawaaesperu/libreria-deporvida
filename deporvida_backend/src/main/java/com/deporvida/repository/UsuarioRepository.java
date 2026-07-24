package com.deporvida.repository;

import com.deporvida.entity.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByNombreUsuario(String nombreUsuario);

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByNombreUsuario(String nombreUsuario);

    boolean existsByCorreo(String correo);

    @Query("SELECT u FROM Usuario u WHERE LOWER(u.nombreUsuario) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(u.correo) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Usuario> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    Optional<Usuario> findByCorreoIgnoreCase(String correo);
}