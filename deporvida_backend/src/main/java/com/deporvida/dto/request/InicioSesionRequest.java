package com.deporvida.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InicioSesionRequest {

    @NotBlank
    private String nombreUsuario;

    @NotBlank
    private String contrasena;
}