package com.deporvida.mapper;

import com.deporvida.dto.request.CategoriaRequest;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.entity.Categoria;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface CategoriaMapper {

    @Mapping(target = "padre", ignore = true)
    @Mapping(target = "hijos", ignore = true)
    @Mapping(target = "libros", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    Categoria toEntity(CategoriaRequest request);

    @Mapping(target = "cantidadLibros", expression = "java(entity.getLibros() != null ? entity.getLibros().size() : 0)")
    CategoriaResponse toResponse(Categoria entity);

    @AfterMapping
    default void setImageUrl(Categoria entity, @MappingTarget CategoriaResponse response) {
        response.setUrlImagen(toImageUrl(entity.getUrlImagen()));
    }

    @Named("toImageUrl")
    default String toImageUrl(String filename) {
        if (filename == null || filename.isBlank()) return null;
        if (filename.startsWith("http")) return filename;
        return "/imagenes/" + filename;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "padre", ignore = true)
    @Mapping(target = "hijos", ignore = true)
    @Mapping(target = "libros", ignore = true)
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaActualizacion", ignore = true)
    void updateEntity(CategoriaRequest request, @MappingTarget Categoria entity);
}