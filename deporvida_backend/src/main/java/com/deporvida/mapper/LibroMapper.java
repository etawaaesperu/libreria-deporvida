package com.deporvida.mapper;

import com.deporvida.dto.request.LibroRequest;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.entity.Libro;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface LibroMapper {

    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "autors", ignore = true)
    @Mapping(target = "inventario", ignore = true)
    @Mapping(target = "itemPedidos", ignore = true)
    @Mapping(target = "itemCarritos", ignore = true)
    Libro toEntity(LibroRequest request);

    @Mapping(target = "precioEfectivo", expression = "java(entity.obtenerPrecioEfectivo())")
    @Mapping(target = "enOferta", expression = "java(entity.estaEnOferta())")
    LibroResponse toResponse(Libro entity);

    @AfterMapping
    default void setImageUrls(Libro entity, @MappingTarget LibroResponse response) {
        response.setUrlPortada(toImageUrl(entity.getUrlPortada()));
        response.setUrlMiniatura(toImageUrl(entity.getUrlMiniatura()));
    }

    @Named("toImageUrl")
    default String toImageUrl(String filename) {
        if (filename == null || filename.isBlank()) return "/imagenes/default.png";
        if (filename.startsWith("http")) return filename;
        return "/imagenes/" + filename;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "categoria", ignore = true)
    @Mapping(target = "autors", ignore = true)
    @Mapping(target = "inventario", ignore = true)
    @Mapping(target = "itemPedidos", ignore = true)
    @Mapping(target = "itemCarritos", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    void updateEntity(LibroRequest request, @MappingTarget Libro entity);
}