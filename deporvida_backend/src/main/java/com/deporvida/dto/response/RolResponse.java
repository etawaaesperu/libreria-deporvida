package com.deporvida.dto.response;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RolResponse {

    private Long id;
    private String nombre;
    private String descripcion;
}
