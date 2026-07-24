package com.deporvida.mapper;

import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Usuario;
import com.deporvida.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRoles")
    @Mapping(target = "nombreCompleto", expression = "java(entity.obtenerNombreCompleto())")
    UsuarioResponse toResponse(Usuario entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "contrasena", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "carrito", ignore = true)
    @Mapping(target = "pedidos", ignore = true)
    @Mapping(target = "resenas", ignore = true)
    @Mapping(target = "direcciones", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    @Mapping(target = "ultimoInicioSesion", ignore = true)
    void updateEntity(UsuarioResponse request, @MappingTarget Usuario entity);

    @Named("mapRoles")
    default Set<Rol.NombreRol> mapRoles(Set<Rol> roles) {
        if (roles == null) return null;
        return roles.stream()
            .map(Rol::getNombre)
            .collect(java.util.stream.Collectors.toSet());
    }
}