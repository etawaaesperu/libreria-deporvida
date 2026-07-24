package com.deporvida.mapper;

import com.deporvida.dto.response.PagoResponse;
import com.deporvida.entity.Pago;
import com.deporvida.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface PagoMapper {

    @Mapping(target = "pedido.usuario.roles", source = "pedido.usuario.roles", qualifiedByName = "mapRoles")
    PagoResponse toResponse(Pago entity);

    @Named("mapRoles")
    default Set<Rol.NombreRol> mapRoles(Set<Rol> roles) {
        if (roles == null) return null;
        return roles.stream()
            .map(Rol::getNombre)
            .collect(java.util.stream.Collectors.toSet());
    }
}