package com.deporvida.mapper;

import com.deporvida.dto.response.AutorResponse;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.dto.response.InventarioResponse;
import com.deporvida.dto.response.ItemPedidoResponse;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.dto.response.PagoResponse;
import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Autor;
import com.deporvida.entity.Categoria;
import com.deporvida.entity.Inventario;
import com.deporvida.entity.ItemPedido;
import com.deporvida.entity.Libro;
import com.deporvida.entity.Pago;
import com.deporvida.entity.Pedido;
import com.deporvida.entity.Usuario;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class PagoMapperImpl implements PagoMapper {

    @Override
    public PagoResponse toResponse(Pago entity) {
        if ( entity == null ) {
            return null;
        }

        PagoResponse.PagoResponseBuilder pagoResponse = PagoResponse.builder();

        pagoResponse.pedido( pedidoToPedidoResponse( entity.getPedido() ) );
        pagoResponse.id( entity.getId() );
        pagoResponse.referenciaPago( entity.getReferenciaPago() );
        pagoResponse.metodoPago( entity.getMetodoPago() );
        pagoResponse.estado( entity.getEstado() );
        pagoResponse.monto( entity.getMonto() );
        pagoResponse.moneda( entity.getMoneda() );
        pagoResponse.idTransaccion( entity.getIdTransaccion() );
        pagoResponse.respuestaPasarela( entity.getRespuestaPasarela() );
        pagoResponse.motivoFallo( entity.getMotivoFallo() );
        pagoResponse.fechaPago( entity.getFechaPago() );
        pagoResponse.fechaReembolso( entity.getFechaReembolso() );
        pagoResponse.montoReembolso( entity.getMontoReembolso() );
        pagoResponse.fechaCreacion( entity.getFechaCreacion() );
        pagoResponse.fechaActualizacion( entity.getFechaActualizacion() );

        return pagoResponse.build();
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

    protected Set<CategoriaResponse> categoriaSetToCategoriaResponseSet(Set<Categoria> set) {
        if ( set == null ) {
            return null;
        }

        Set<CategoriaResponse> set1 = new LinkedHashSet<CategoriaResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Categoria categoria : set ) {
            set1.add( categoriaToCategoriaResponse( categoria ) );
        }

        return set1;
    }

    protected CategoriaResponse categoriaToCategoriaResponse(Categoria categoria) {
        if ( categoria == null ) {
            return null;
        }

        CategoriaResponse.CategoriaResponseBuilder categoriaResponse = CategoriaResponse.builder();

        categoriaResponse.id( categoria.getId() );
        categoriaResponse.nombre( categoria.getNombre() );
        categoriaResponse.descripcion( categoria.getDescripcion() );
        categoriaResponse.urlImagen( categoria.getUrlImagen() );
        categoriaResponse.activo( categoria.getActivo() );
        categoriaResponse.ordenVisualizacion( categoria.getOrdenVisualizacion() );
        categoriaResponse.fechaCreacion( categoria.getFechaCreacion() );
        categoriaResponse.fechaActualizacion( categoria.getFechaActualizacion() );
        categoriaResponse.padre( categoriaToCategoriaResponse( categoria.getPadre() ) );
        categoriaResponse.hijos( categoriaSetToCategoriaResponseSet( categoria.getHijos() ) );

        return categoriaResponse.build();
    }

    protected AutorResponse autorToAutorResponse(Autor autor) {
        if ( autor == null ) {
            return null;
        }

        AutorResponse.AutorResponseBuilder autorResponse = AutorResponse.builder();

        autorResponse.id( autor.getId() );
        autorResponse.nombre( autor.getNombre() );
        autorResponse.biografia( autor.getBiografia() );
        autorResponse.fechaNacimiento( autor.getFechaNacimiento() );
        autorResponse.fechaFallecimiento( autor.getFechaFallecimiento() );
        autorResponse.nacionalidad( autor.getNacionalidad() );
        autorResponse.urlImagen( autor.getUrlImagen() );
        autorResponse.fechaCreacion( autor.getFechaCreacion() );
        autorResponse.fechaActualizacion( autor.getFechaActualizacion() );

        return autorResponse.build();
    }

    protected Set<AutorResponse> autorSetToAutorResponseSet(Set<Autor> set) {
        if ( set == null ) {
            return null;
        }

        Set<AutorResponse> set1 = new LinkedHashSet<AutorResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Autor autor : set ) {
            set1.add( autorToAutorResponse( autor ) );
        }

        return set1;
    }

    protected InventarioResponse inventarioToInventarioResponse(Inventario inventario) {
        if ( inventario == null ) {
            return null;
        }

        InventarioResponse.InventarioResponseBuilder inventarioResponse = InventarioResponse.builder();

        inventarioResponse.id( inventario.getId() );
        inventarioResponse.cantidad( inventario.getCantidad() );
        inventarioResponse.cantidadReservada( inventario.getCantidadReservada() );
        inventarioResponse.nivelReorden( inventario.getNivelReorden() );
        inventarioResponse.stockMaximo( inventario.getStockMaximo() );
        inventarioResponse.ubicacionAlmacen( inventario.getUbicacionAlmacen() );
        inventarioResponse.fechaUltimoReabastecimiento( inventario.getFechaUltimoReabastecimiento() );
        inventarioResponse.fechaProximoReorden( inventario.getFechaProximoReorden() );
        inventarioResponse.fechaCreacion( inventario.getFechaCreacion() );
        inventarioResponse.fechaActualizacion( inventario.getFechaActualizacion() );

        return inventarioResponse.build();
    }

    protected LibroResponse libroToLibroResponse(Libro libro) {
        if ( libro == null ) {
            return null;
        }

        LibroResponse.LibroResponseBuilder libroResponse = LibroResponse.builder();

        libroResponse.id( libro.getId() );
        libroResponse.titulo( libro.getTitulo() );
        libroResponse.isbn13( libro.getIsbn13() );
        libroResponse.isbn10( libro.getIsbn10() );
        libroResponse.descripcion( libro.getDescripcion() );
        libroResponse.precio( libro.getPrecio() );
        libroResponse.precioOferta( libro.getPrecioOferta() );
        libroResponse.fechaPublicacion( libro.getFechaPublicacion() );
        libroResponse.editorial( libro.getEditorial() );
        libroResponse.paginas( libro.getPaginas() );
        libroResponse.idioma( libro.getIdioma() );
        libroResponse.urlPortada( libro.getUrlPortada() );
        libroResponse.urlMiniatura( libro.getUrlMiniatura() );
        libroResponse.activo( libro.getActivo() );
        libroResponse.destacado( libro.getDestacado() );
        libroResponse.masVendido( libro.getMasVendido() );
        libroResponse.calificacionPromedio( libro.getCalificacionPromedio() );
        libroResponse.cantidadResenas( libro.getCantidadResenas() );
        libroResponse.cantidadVistas( libro.getCantidadVistas() );
        libroResponse.cantidadVentas( libro.getCantidadVentas() );
        libroResponse.pesoGramos( libro.getPesoGramos() );
        libroResponse.dimensiones( libro.getDimensiones() );
        libroResponse.fechaCreacion( libro.getFechaCreacion() );
        libroResponse.fechaActualizacion( libro.getFechaActualizacion() );
        libroResponse.categoria( categoriaToCategoriaResponse( libro.getCategoria() ) );
        libroResponse.autors( autorSetToAutorResponseSet( libro.getAutors() ) );
        libroResponse.inventario( inventarioToInventarioResponse( libro.getInventario() ) );

        return libroResponse.build();
    }

    protected ItemPedidoResponse itemPedidoToItemPedidoResponse(ItemPedido itemPedido) {
        if ( itemPedido == null ) {
            return null;
        }

        ItemPedidoResponse.ItemPedidoResponseBuilder itemPedidoResponse = ItemPedidoResponse.builder();

        itemPedidoResponse.id( itemPedido.getId() );
        itemPedidoResponse.cantidad( itemPedido.getCantidad() );
        itemPedidoResponse.precioUnitario( itemPedido.getPrecioUnitario() );
        itemPedidoResponse.precioDescuento( itemPedido.getPrecioDescuento() );
        itemPedidoResponse.precioTotal( itemPedido.getPrecioTotal() );
        itemPedidoResponse.fechaCreacion( itemPedido.getFechaCreacion() );
        itemPedidoResponse.fechaActualizacion( itemPedido.getFechaActualizacion() );
        itemPedidoResponse.libro( libroToLibroResponse( itemPedido.getLibro() ) );

        return itemPedidoResponse.build();
    }

    protected Set<ItemPedidoResponse> itemPedidoSetToItemPedidoResponseSet(Set<ItemPedido> set) {
        if ( set == null ) {
            return null;
        }

        Set<ItemPedidoResponse> set1 = new LinkedHashSet<ItemPedidoResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( ItemPedido itemPedido : set ) {
            set1.add( itemPedidoToItemPedidoResponse( itemPedido ) );
        }

        return set1;
    }

    protected PedidoResponse pedidoToPedidoResponse(Pedido pedido) {
        if ( pedido == null ) {
            return null;
        }

        PedidoResponse.PedidoResponseBuilder pedidoResponse = PedidoResponse.builder();

        pedidoResponse.usuario( usuarioToUsuarioResponse( pedido.getUsuario() ) );
        pedidoResponse.id( pedido.getId() );
        pedidoResponse.numeroPedido( pedido.getNumeroPedido() );
        pedidoResponse.estado( pedido.getEstado() );
        pedidoResponse.subtotal( pedido.getSubtotal() );
        pedidoResponse.montoImpuesto( pedido.getMontoImpuesto() );
        pedidoResponse.costoEnvio( pedido.getCostoEnvio() );
        pedidoResponse.montoDescuento( pedido.getMontoDescuento() );
        pedidoResponse.montoTotal( pedido.getMontoTotal() );
        pedidoResponse.direccionEnvio( pedido.getDireccionEnvio() );
        pedidoResponse.ciudadEnvio( pedido.getCiudadEnvio() );
        pedidoResponse.departamentoEnvio( pedido.getDepartamentoEnvio() );
        pedidoResponse.codigoPostalEnvio( pedido.getCodigoPostalEnvio() );
        pedidoResponse.paisEnvio( pedido.getPaisEnvio() );
        pedidoResponse.telefonoEnvio( pedido.getTelefonoEnvio() );
        pedidoResponse.notas( pedido.getNotas() );
        pedidoResponse.fechaEnvio( pedido.getFechaEnvio() );
        pedidoResponse.fechaEntrega( pedido.getFechaEntrega() );
        pedidoResponse.fechaCancelacion( pedido.getFechaCancelacion() );
        pedidoResponse.motivoCancelacion( pedido.getMotivoCancelacion() );
        pedidoResponse.fechaCreacion( pedido.getFechaCreacion() );
        pedidoResponse.fechaActualizacion( pedido.getFechaActualizacion() );
        pedidoResponse.itemPedidos( itemPedidoSetToItemPedidoResponseSet( pedido.getItemPedidos() ) );
        pedidoResponse.pago( toResponse( pedido.getPago() ) );

        return pedidoResponse.build();
    }
}
