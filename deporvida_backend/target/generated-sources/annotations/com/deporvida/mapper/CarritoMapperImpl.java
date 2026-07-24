package com.deporvida.mapper;

import com.deporvida.dto.response.CarritoResponse;
import com.deporvida.dto.response.ItemCarritoResponse;
import com.deporvida.entity.Carrito;
import com.deporvida.entity.ItemCarrito;
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
public class CarritoMapperImpl implements CarritoMapper {

    @Autowired
    private LibroMapper libroMapper;

    @Override
    public CarritoResponse toResponse(Carrito entity) {
        if ( entity == null ) {
            return null;
        }

        CarritoResponse.CarritoResponseBuilder carritoResponse = CarritoResponse.builder();

        carritoResponse.items( itemCarritoSetToItemCarritoResponseSet( entity.getItems() ) );
        carritoResponse.id( entity.getId() );
        carritoResponse.fechaCreacion( entity.getFechaCreacion() );
        carritoResponse.fechaActualizacion( entity.getFechaActualizacion() );

        carritoResponse.cantidadItems( entity.obtenerCantidadItems() );
        carritoResponse.subtotal( entity.obtenerSubtotal() );

        return carritoResponse.build();
    }

    @Override
    public ItemCarritoResponse toResponse(ItemCarrito entity) {
        if ( entity == null ) {
            return null;
        }

        ItemCarritoResponse.ItemCarritoResponseBuilder itemCarritoResponse = ItemCarritoResponse.builder();

        itemCarritoResponse.libro( libroMapper.toResponse( entity.getLibro() ) );
        itemCarritoResponse.id( entity.getId() );
        itemCarritoResponse.cantidad( entity.getCantidad() );
        itemCarritoResponse.precioUnitario( entity.getPrecioUnitario() );
        itemCarritoResponse.fechaCreacion( entity.getFechaCreacion() );
        itemCarritoResponse.fechaActualizacion( entity.getFechaActualizacion() );

        itemCarritoResponse.precioTotal( entity.obtenerPrecioTotal() );

        return itemCarritoResponse.build();
    }

    protected Set<ItemCarritoResponse> itemCarritoSetToItemCarritoResponseSet(Set<ItemCarrito> set) {
        if ( set == null ) {
            return null;
        }

        Set<ItemCarritoResponse> set1 = new LinkedHashSet<ItemCarritoResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( ItemCarrito itemCarrito : set ) {
            set1.add( toResponse( itemCarrito ) );
        }

        return set1;
    }
}
