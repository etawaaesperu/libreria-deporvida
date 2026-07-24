package com.deporvida.mapper;

import com.deporvida.dto.request.AutorRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.entity.Autor;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface AutorMapper {

    @Mapping(target = "libros", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    Autor toEntity(AutorRequest request);

    @Mapping(target = "cantidadLibros", ignore = true)
    AutorResponse toResponse(Autor entity);

    @AfterMapping
    default void setImageUrl(Autor entity, @MappingTarget AutorResponse response) {
        response.setUrlImagen(toImageUrl(entity.getUrlImagen()));
    }

    @Named("toImageUrl")
    default String toImageUrl(String filename) {
        if (filename == null || filename.isBlank()) return null;
        if (filename.startsWith("http")) return filename;
        return "/imagenes/" + filename;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "libros", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    void updateEntity(AutorRequest request, @MappingTarget Autor entity);
}