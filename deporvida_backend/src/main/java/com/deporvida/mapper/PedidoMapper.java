package com.deporvida.mapper;

import com.deporvida.dto.response.PedidoResponse;
import com.deporvida.dto.response.ItemPedidoResponse;
import com.deporvida.entity.Pedido;
import com.deporvida.entity.ItemPedido;
import com.deporvida.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring", uses = {LibroMapper.class})
public interface PedidoMapper {

    @Mapping(target = "usuario.roles", source = "usuario.roles", qualifiedByName = "mapRoles")
    @Mapping(target = "itemPedidos", source = "itemPedidos")
    @Mapping(target = "pago", source = "pago")
    PedidoResponse toResponse(Pedido entity);

    @Mapping(target = "libro", source = "libro")
    @Mapping(target = "precioUnitarioEfectivo", expression = "java(entity.obtenerPrecioUnitarioFinal())")
    ItemPedidoResponse toResponse(ItemPedido entity);

    @Named("mapRoles")
    default Set<Rol.NombreRol> mapRoles(Set<Rol> roles) {
        if (roles == null) return null;
        return roles.stream()
            .map(Rol::getNombre)
            .collect(java.util.stream.Collectors.toSet());
    }
}