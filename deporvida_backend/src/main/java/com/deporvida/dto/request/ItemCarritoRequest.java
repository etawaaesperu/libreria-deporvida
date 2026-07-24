package com.deporvida.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemCarritoRequest {

    @NotNull(message = "Libro ID is required")
    private Long libroId;

    @NotNull(message = "Cantidad is required")
    @Min(value = 1, message = "Cantidad must be at least 1")
    private Integer cantidad;
}