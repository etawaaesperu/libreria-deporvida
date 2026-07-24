package com.deporvida.mapper;

import com.deporvida.dto.request.AutorRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.entity.Autor;
import java.time.LocalDate;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class AutorMapperImpl implements AutorMapper {

    @Override
    public Autor toEntity(AutorRequest request) {
        if ( request == null ) {
            return null;
        }

        Autor.AutorBuilder autor = Autor.builder();

        autor.nombre( request.getNombre() );
        autor.biografia( request.getBiografia() );
        if ( request.getFechaNacimiento() != null ) {
            autor.fechaNacimiento( LocalDate.parse( request.getFechaNacimiento() ) );
        }
        if ( request.getFechaFallecimiento() != null ) {
            autor.fechaFallecimiento( LocalDate.parse( request.getFechaFallecimiento() ) );
        }
        autor.nacionalidad( request.getNacionalidad() );
        autor.urlImagen( request.getUrlImagen() );

        return autor.build();
    }

    @Override
    public AutorResponse toResponse(Autor entity) {
        if ( entity == null ) {
            return null;
        }

        AutorResponse.AutorResponseBuilder autorResponse = AutorResponse.builder();

        autorResponse.id( entity.getId() );
        autorResponse.nombre( entity.getNombre() );
        autorResponse.biografia( entity.getBiografia() );
        autorResponse.fechaNacimiento( entity.getFechaNacimiento() );
        autorResponse.fechaFallecimiento( entity.getFechaFallecimiento() );
        autorResponse.nacionalidad( entity.getNacionalidad() );
        autorResponse.urlImagen( entity.getUrlImagen() );
        autorResponse.fechaCreacion( entity.getFechaCreacion() );
        autorResponse.fechaActualizacion( entity.getFechaActualizacion() );

        return autorResponse.build();
    }

    @Override
    public void updateEntity(AutorRequest request, Autor entity) {
        if ( request == null ) {
            return;
        }

        entity.setNombre( request.getNombre() );
        entity.setBiografia( request.getBiografia() );
        if ( request.getFechaNacimiento() != null ) {
            entity.setFechaNacimiento( LocalDate.parse( request.getFechaNacimiento() ) );
        }
        else {
            entity.setFechaNacimiento( null );
        }
        if ( request.getFechaFallecimiento() != null ) {
            entity.setFechaFallecimiento( LocalDate.parse( request.getFechaFallecimiento() ) );
        }
        else {
            entity.setFechaFallecimiento( null );
        }
        entity.setNacionalidad( request.getNacionalidad() );
        entity.setUrlImagen( request.getUrlImagen() );
    }
}
