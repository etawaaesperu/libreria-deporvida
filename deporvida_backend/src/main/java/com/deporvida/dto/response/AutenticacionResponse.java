package com.deporvida.dto.response;

import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutenticacionResponse {

    private Long id;

    private String nombreUsuario;

    private String correo;

    private String nombres;

    private String apellidos;

    private String nombreCompleto;

    private String token;

    private Set<String> roles;
}
