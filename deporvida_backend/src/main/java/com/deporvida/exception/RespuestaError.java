package com.deporvida.exception;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RespuestaError {

    private LocalDateTime timestamp;
    private int estado;
    private String error;
    private String message;
    private String path;
    private Map<String, String> details;

    public RespuestaError(LocalDateTime timestamp, int estado, String error, String message, String path) {
        this.timestamp = timestamp;
        this.estado = estado;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}