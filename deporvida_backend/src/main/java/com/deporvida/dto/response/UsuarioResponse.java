package com.deporvida.dto.response;

import com.deporvida.entity.Rol;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsuarioResponse {

    private Long id;

    private String nombreUsuario;

    private String correo;

    private String nombres;

    private String apellidos;

    private String telefono;

    private Boolean activo;

    private Boolean correoVerificado;

    private LocalDateTime ultimoInicioSesion;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private Set<Rol.NombreRol> roles;

    private String nombreCompleto;
}