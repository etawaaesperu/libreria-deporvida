package com.deporvida.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ManejadorGlobalExcepciones {

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<RespuestaError> handleRecursoNoEncontrado(
            RecursoNoEncontradoException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.NOT_FOUND.value(),
            "No encontrado",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(ValidacionException.class)
    public ResponseEntity<RespuestaError> handleValidacion(
            ValidacionException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Error de validación",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(UsuarioYaExisteException.class)
    public ResponseEntity<RespuestaError> handleUsuarioYaExiste(
            UsuarioYaExisteException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.CONFLICT.value(),
            "Conflicto",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(StockInsuficienteException.class)
    public ResponseEntity<RespuestaError> handleStockInsuficiente(
            StockInsuficienteException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Stock insuficiente",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(ProcesamientoPagoException.class)
    public ResponseEntity<RespuestaError> handleProcesamientoPago(
            ProcesamientoPagoException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Error de pago",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(AccesoDenegadoException.class)
    public ResponseEntity<RespuestaError> handleAccesoDenegado(
            AccesoDenegadoException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.FORBIDDEN.value(),
            "Prohibido",
            "Acceso denegado: " + ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    public ResponseEntity<RespuestaError> handleIllegalArgumentOrState(
            RuntimeException ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Solicitud incorrecta",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RespuestaError> handleValidacionExceptions(
            MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, String> errores = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String campo = ((FieldError) error).getField();
            String mensaje = error.getDefaultMessage();
            errores.put(campo, mensaje);
        });

        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.BAD_REQUEST.value(),
            "Error de validación",
            errores.toString(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RespuestaError> handleGeneric(
            Exception ex, WebRequest request) {
        RespuestaError error = new RespuestaError(
            LocalDateTime.now(),
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Error interno del servidor",
            ex.getMessage(),
            request.getDescription(false).replace("uri=", "")
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}
