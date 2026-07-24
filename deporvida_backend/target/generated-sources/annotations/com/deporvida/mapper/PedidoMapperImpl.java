package com.deporvida.mapper;

import com.deporvida.dto.response.ItemPedidoResponse;
import com.deporvida.dto.response.PagoResponse;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.ItemPedido;
import com.deporvida.entity.Pago;
import com.deporvida.entity.Pedido;
import com.deporvida.entity.Usuario;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class PedidoMapperImpl implements PedidoMapper {

    @Autowired
    private LibroMapper libroMapper;

    @Override
    public PedidoResponse toResponse(Pedido entity) {
        if ( entity == null ) {
            return null;
        }

        PedidoResponse.PedidoResponseBuilder pedidoResponse = PedidoResponse.builder();

        pedidoResponse.usuario( usuarioToUsuarioResponse( entity.getUsuario() ) );
        pedidoResponse.itemPedidos( itemPedidoSetToItemPedidoResponseSet( entity.getItemPedidos() ) );
        pedidoResponse.pago( pagoToPagoResponse( entity.getPago() ) );
        pedidoResponse.id( entity.getId() );
        pedidoResponse.numeroPedido( entity.getNumeroPedido() );
        pedidoResponse.estado( entity.getEstado() );
        pedidoResponse.subtotal( entity.getSubtotal() );
        pedidoResponse.montoImpuesto( entity.getMontoImpuesto() );
        pedidoResponse.costoEnvio( entity.getCostoEnvio() );
        pedidoResponse.montoDescuento( entity.getMontoDescuento() );
        pedidoResponse.montoTotal( entity.getMontoTotal() );
        pedidoResponse.direccionEnvio( entity.getDireccionEnvio() );
        pedidoResponse.ciudadEnvio( entity.getCiudadEnvio() );
        pedidoResponse.departamentoEnvio( entity.getDepartamentoEnvio() );
        pedidoResponse.codigoPostalEnvio( entity.getCodigoPostalEnvio() );
        pedidoResponse.paisEnvio( entity.getPaisEnvio() );
        pedidoResponse.telefonoEnvio( entity.getTelefonoEnvio() );
        pedidoResponse.notas( entity.getNotas() );
        pedidoResponse.fechaEnvio( entity.getFechaEnvio() );
        pedidoResponse.fechaEntrega( entity.getFechaEntrega() );
        pedidoResponse.fechaCancelacion( entity.getFechaCancelacion() );
        pedidoResponse.motivoCancelacion( entity.getMotivoCancelacion() );
        pedidoResponse.fechaCreacion( entity.getFechaCreacion() );
        pedidoResponse.fechaActualizacion( entity.getFechaActualizacion() );

        return pedidoResponse.build();
    }

    @Override
    public ItemPedidoResponse toResponse(ItemPedido entity) {
        if ( entity == null ) {
            return null;
        }

        ItemPedidoResponse.ItemPedidoResponseBuilder itemPedidoResponse = ItemPedidoResponse.builder();

        itemPedidoResponse.libro( libroMapper.toResponse( entity.getLibro() ) );
        itemPedidoResponse.id( entity.getId() );
        itemPedidoResponse.cantidad( entity.getCantidad() );
        itemPedidoResponse.precioUnitario( entity.getPrecioUnitario() );
        itemPedidoResponse.precioDescuento( entity.getPrecioDescuento() );
        itemPedidoResponse.precioTotal( entity.getPrecioTotal() );
        itemPedidoResponse.fechaCreacion( entity.getFechaCreacion() );
        itemPedidoResponse.fechaActualizacion( entity.getFechaActualizacion() );

        itemPedidoResponse.precioUnitarioEfectivo( entity.obtenerPrecioUnitarioFinal() );

        return itemPedidoResponse.build();
    }

    protected UsuarioResponse usuarioToUsuarioResponse(Usuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        UsuarioResponse.UsuarioResponseBuilder usuarioResponse = UsuarioResponse.builder();

        usuarioResponse.roles( mapRoles( usuario.getRoles() ) );
        usuarioResponse.id( usuario.getId() );
        usuarioResponse.nombreUsuario( usuario.getNombreUsuario() );
        usuarioResponse.correo( usuario.getCorreo() );
        usuarioResponse.nombres( usuario.getNombres() );
        usuarioResponse.apellidos( usuario.getApellidos() );
        usuarioResponse.telefono( usuario.getTelefono() );
        usuarioResponse.activo( usuario.getActivo() );
        usuarioResponse.correoVerificado( usuario.getCorreoVerificado() );
        usuarioResponse.ultimoInicioSesion( usuario.getUltimoInicioSesion() );
        usuarioResponse.fechaCreacion( usuario.getFechaCreacion() );
        usuarioResponse.fechaActualizacion( usuario.getFechaActualizacion() );

        return usuarioResponse.build();
    }

    protected Set<ItemPedidoResponse> itemPedidoSetToItemPedidoResponseSet(Set<ItemPedido> set) {
        if ( set == null ) {
            return null;
        }

        Set<ItemPedidoResponse> set1 = new LinkedHashSet<ItemPedidoResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( ItemPedido itemPedido : set ) {
            set1.add( toResponse( itemPedido ) );
        }

        return set1;
    }

    protected PagoResponse pagoToPagoResponse(Pago pago) {
        if ( pago == null ) {
            return null;
        }

        PagoResponse.PagoResponseBuilder pagoResponse = PagoResponse.builder();

        pagoResponse.id( pago.getId() );
        pagoResponse.referenciaPago( pago.getReferenciaPago() );
        pagoResponse.metodoPago( pago.getMetodoPago() );
        pagoResponse.estado( pago.getEstado() );
        pagoResponse.monto( pago.getMonto() );
        pagoResponse.moneda( pago.getMoneda() );
        pagoResponse.idTransaccion( pago.getIdTransaccion() );
        pagoResponse.respuestaPasarela( pago.getRespuestaPasarela() );
        pagoResponse.motivoFallo( pago.getMotivoFallo() );
        pagoResponse.fechaPago( pago.getFechaPago() );
        pagoResponse.fechaReembolso( pago.getFechaReembolso() );
        pagoResponse.montoReembolso( pago.getMontoReembolso() );
        pagoResponse.fechaCreacion( pago.getFechaCreacion() );
        pagoResponse.fechaActualizacion( pago.getFechaActualizacion() );
        pagoResponse.pedido( toResponse( pago.getPedido() ) );

        return pagoResponse.build();
    }
}
