package com.deporvida.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ActualizarPerfilRequest {

    @Size(max = 50)
    private String nombres;

    @Size(max = 50)
    private String apellidos;

    @Size(max = 20)
    private String telefono;
}
