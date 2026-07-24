package com.deporvida.dto.request;

import com.deporvida.entity.Rol;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActualizarRolesRequest {

    @NotEmpty(message = "El usuario debe tener al menos un rol")
    private Set<Rol.NombreRol> roles;
}
