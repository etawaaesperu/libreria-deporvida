package com.deporvida.mapper;

import com.deporvida.dto.response.CarritoResponse;
import com.deporvida.dto.response.ItemCarritoResponse;
import com.deporvida.entity.Carrito;
import com.deporvida.entity.ItemCarrito;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {LibroMapper.class})
public interface CarritoMapper {

    @Mapping(target = "cantidadItems", expression = "java(entity.obtenerCantidadItems())")
    @Mapping(target = "subtotal", expression = "java(entity.obtenerSubtotal())")
    @Mapping(target = "items", source = "items")
    CarritoResponse toResponse(Carrito entity);

    @Mapping(target = "precioTotal", expression = "java(entity.obtenerPrecioTotal())")
    @Mapping(target = "libro", source = "libro")
    ItemCarritoResponse toResponse(ItemCarrito entity);
}