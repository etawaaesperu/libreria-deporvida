package com.deporvida.mapper;

import com.deporvida.dto.request.DireccionRequest;
import com.deporvida.dto.response.DireccionResponse;
import com.deporvida.entity.Direccion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface DireccionMapper {

    DireccionMapper INSTANCE = org.mapstruct.factory.Mappers.getMapper(DireccionMapper.class);

    Direccion toEntity(DireccionRequest request);

    DireccionResponse toResponse(Direccion entity);

    @Mapping(target = "usuario", ignore = true)
    void updateEntity(DireccionRequest request, @MappingTarget Direccion entity);
}