package com.deporvida.dto.response;

import com.deporvida.enums.EstadoPedido;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PedidoResponse {

    private Long id;

    private String numeroPedido;

    private EstadoPedido estado;

    private BigDecimal subtotal;

    private BigDecimal montoImpuesto;

    private BigDecimal costoEnvio;

    private BigDecimal montoDescuento;

    private BigDecimal montoTotal;

    private String direccionEnvio;

    private String ciudadEnvio;

    private String departamentoEnvio;

    private String codigoPostalEnvio;

    private String paisEnvio;

    private String telefonoEnvio;

    private String notas;

    private LocalDateTime fechaEnvio;

    private LocalDateTime fechaEntrega;

    private LocalDateTime fechaCancelacion;

    private String motivoCancelacion;

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

    private UsuarioResponse usuario;

    private Set<ItemPedidoResponse> itemPedidos;

    private PagoResponse pago;
}