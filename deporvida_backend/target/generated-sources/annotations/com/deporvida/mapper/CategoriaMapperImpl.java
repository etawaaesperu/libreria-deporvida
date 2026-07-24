package com.deporvida.mapper;

import com.deporvida.dto.request.CategoriaRequest;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.entity.Categoria;
import java.util.LinkedHashSet;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class CategoriaMapperImpl implements CategoriaMapper {

    @Override
    public Categoria toEntity(CategoriaRequest request) {
        if ( request == null ) {
            return null;
        }

        Categoria.CategoriaBuilder categoria = Categoria.builder();

        categoria.nombre( request.getNombre() );
        categoria.descripcion( request.getDescripcion() );
        categoria.urlImagen( request.getUrlImagen() );
        categoria.ordenVisualizacion( request.getOrdenVisualizacion() );

        return categoria.build();
    }

    @Override
    public CategoriaResponse toResponse(Categoria entity) {
        if ( entity == null ) {
            return null;
        }

        CategoriaResponse.CategoriaResponseBuilder categoriaResponse = CategoriaResponse.builder();

        categoriaResponse.id( entity.getId() );
        categoriaResponse.nombre( entity.getNombre() );
        categoriaResponse.descripcion( entity.getDescripcion() );
        categoriaResponse.urlImagen( entity.getUrlImagen() );
        categoriaResponse.activo( entity.getActivo() );
        categoriaResponse.ordenVisualizacion( entity.getOrdenVisualizacion() );
        categoriaResponse.fechaCreacion( entity.getFechaCreacion() );
        categoriaResponse.fechaActualizacion( entity.getFechaActualizacion() );
        categoriaResponse.padre( toResponse( entity.getPadre() ) );
        categoriaResponse.hijos( categoriaSetToCategoriaResponseSet( entity.getHijos() ) );

        categoriaResponse.cantidadLibros( entity.getLibros() != null ? entity.getLibros().size() : 0 );

        return categoriaResponse.build();
    }

    @Override
    public void updateEntity(CategoriaRequest request, Categoria entity) {
        if ( request == null ) {
            return;
        }

        entity.setNombre( request.getNombre() );
        entity.setDescripcion( request.getDescripcion() );
        entity.setUrlImagen( request.getUrlImagen() );
        entity.setOrdenVisualizacion( request.getOrdenVisualizacion() );
    }

    protected Set<CategoriaResponse> categoriaSetToCategoriaResponseSet(Set<Categoria> set) {
        if ( set == null ) {
            return null;
        }

        Set<CategoriaResponse> set1 = new LinkedHashSet<CategoriaResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Categoria categoria : set ) {
            set1.add( toResponse( categoria ) );
        }

        return set1;
    }
}
