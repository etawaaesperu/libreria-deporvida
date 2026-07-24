package com.deporvida.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegistroRequest {

    @NotBlank
    @Size(min = 3, max = 50)
    private String nombreUsuario;

    @NotBlank
    @Email
    @Size(max = 100)
    private String correo;

    @NotBlank
    @Size(min = 8, max = 120)
    private String contrasena;

    @Size(max = 50)
    private String nombres;

    @Size(max = 50)
    private String apellidos;

    @Size(max = 20)
    private String telefono;
}
