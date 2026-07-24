package com.deporvida.mapper;

import com.deporvida.dto.request.LibroRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.dto.response.InventarioResponse;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.entity.Autor;
import com.deporvida.entity.Categoria;
import com.deporvida.entity.Inventario;
import com.deporvida.entity.Libro;
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
public class LibroMapperImpl implements LibroMapper {

    @Override
    public Libro toEntity(LibroRequest request) {
        if ( request == null ) {
            return null;
        }

        Libro.LibroBuilder libro = Libro.builder();

        libro.titulo( request.getTitulo() );
        libro.isbn13( request.getIsbn13() );
        libro.isbn10( request.getIsbn10() );
        libro.descripcion( request.getDescripcion() );
        libro.precio( request.getPrecio() );
        libro.precioOferta( request.getPrecioOferta() );
        libro.fechaPublicacion( request.getFechaPublicacion() );
        libro.editorial( request.getEditorial() );
        libro.paginas( request.getPaginas() );
        libro.idioma( request.getIdioma() );
        libro.urlPortada( request.getUrlPortada() );
        libro.urlMiniatura( request.getUrlMiniatura() );
        libro.activo( request.getActivo() );
        libro.destacado( request.getDestacado() );
        libro.masVendido( request.getMasVendido() );
        libro.pesoGramos( request.getPesoGramos() );
        libro.dimensiones( request.getDimensiones() );

        return libro.build();
    }

    @Override
    public LibroResponse toResponse(Libro entity) {
        if ( entity == null ) {
            return null;
        }

        LibroResponse.LibroResponseBuilder libroResponse = LibroResponse.builder();

        libroResponse.id( entity.getId() );
        libroResponse.titulo( entity.getTitulo() );
        libroResponse.isbn13( entity.getIsbn13() );
        libroResponse.isbn10( entity.getIsbn10() );
        libroResponse.descripcion( entity.getDescripcion() );
        libroResponse.precio( entity.getPrecio() );
        libroResponse.precioOferta( entity.getPrecioOferta() );
        libroResponse.fechaPublicacion( entity.getFechaPublicacion() );
        libroResponse.editorial( entity.getEditorial() );
        libroResponse.paginas( entity.getPaginas() );
        libroResponse.idioma( entity.getIdioma() );
        libroResponse.urlPortada( entity.getUrlPortada() );
        libroResponse.urlMiniatura( entity.getUrlMiniatura() );
        libroResponse.activo( entity.getActivo() );
        libroResponse.destacado( entity.getDestacado() );
        libroResponse.masVendido( entity.getMasVendido() );
        libroResponse.calificacionPromedio( entity.getCalificacionPromedio() );
        libroResponse.cantidadResenas( entity.getCantidadResenas() );
        libroResponse.cantidadVistas( entity.getCantidadVistas() );
        libroResponse.cantidadVentas( entity.getCantidadVentas() );
        libroResponse.pesoGramos( entity.getPesoGramos() );
        libroResponse.dimensiones( entity.getDimensiones() );
        libroResponse.fechaCreacion( entity.getFechaCreacion() );
        libroResponse.fechaActualizacion( entity.getFechaActualizacion() );
        libroResponse.categoria( categoriaToCategoriaResponse( entity.getCategoria() ) );
        libroResponse.autors( autorSetToAutorResponseSet( entity.getAutors() ) );
        libroResponse.inventario( inventarioToInventarioResponse( entity.getInventario() ) );

        libroResponse.precioEfectivo( entity.obtenerPrecioEfectivo() );
        libroResponse.enOferta( entity.estaEnOferta() );

        return libroResponse.build();
    }

    @Override
    public void updateEntity(LibroRequest request, Libro entity) {
        if ( request == null ) {
            return;
        }

        entity.setTitulo( request.getTitulo() );
        entity.setIsbn13( request.getIsbn13() );
        entity.setIsbn10( request.getIsbn10() );
        entity.setDescripcion( request.getDescripcion() );
        entity.setPrecio( request.getPrecio() );
        entity.setPrecioOferta( request.getPrecioOferta() );
        entity.setFechaPublicacion( request.getFechaPublicacion() );
        entity.setEditorial( request.getEditorial() );
        entity.setPaginas( request.getPaginas() );
        entity.setIdioma( request.getIdioma() );
        entity.setUrlPortada( request.getUrlPortada() );
        entity.setUrlMiniatura( request.getUrlMiniatura() );
        entity.setActivo( request.getActivo() );
        entity.setDestacado( request.getDestacado() );
        entity.setMasVendido( request.getMasVendido() );
        entity.setPesoGramos( request.getPesoGramos() );
        entity.setDimensiones( request.getDimensiones() );
    }

    protected Set<CategoriaResponse> categoriaSetToCategoriaResponseSet(Set<Categoria> set) {
        if ( set == null ) {
            return null;
        }

        Set<CategoriaResponse> set1 = new LinkedHashSet<CategoriaResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Categoria categoria : set ) {
            set1.add( categoriaToCategoriaResponse( categoria ) );
        }

        return set1;
    }

    protected CategoriaResponse categoriaToCategoriaResponse(Categoria categoria) {
        if ( categoria == null ) {
            return null;
        }

        CategoriaResponse.CategoriaResponseBuilder categoriaResponse = CategoriaResponse.builder();

        categoriaResponse.id( categoria.getId() );
        categoriaResponse.nombre( categoria.getNombre() );
        categoriaResponse.descripcion( categoria.getDescripcion() );
        categoriaResponse.urlImagen( categoria.getUrlImagen() );
        categoriaResponse.activo( categoria.getActivo() );
        categoriaResponse.ordenVisualizacion( categoria.getOrdenVisualizacion() );
        categoriaResponse.fechaCreacion( categoria.getFechaCreacion() );
        categoriaResponse.fechaActualizacion( categoria.getFechaActualizacion() );
        categoriaResponse.padre( categoriaToCategoriaResponse( categoria.getPadre() ) );
        categoriaResponse.hijos( categoriaSetToCategoriaResponseSet( categoria.getHijos() ) );

        return categoriaResponse.build();
    }

    protected AutorResponse autorToAutorResponse(Autor autor) {
        if ( autor == null ) {
            return null;
        }

        AutorResponse.AutorResponseBuilder autorResponse = AutorResponse.builder();

        autorResponse.id( autor.getId() );
        autorResponse.nombre( autor.getNombre() );
        autorResponse.biografia( autor.getBiografia() );
        autorResponse.fechaNacimiento( autor.getFechaNacimiento() );
        autorResponse.fechaFallecimiento( autor.getFechaFallecimiento() );
        autorResponse.nacionalidad( autor.getNacionalidad() );
        autorResponse.urlImagen( autor.getUrlImagen() );
        autorResponse.fechaCreacion( autor.getFechaCreacion() );
        autorResponse.fechaActualizacion( autor.getFechaActualizacion() );

        return autorResponse.build();
    }

    protected Set<AutorResponse> autorSetToAutorResponseSet(Set<Autor> set) {
        if ( set == null ) {
            return null;
        }

        Set<AutorResponse> set1 = new LinkedHashSet<AutorResponse>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Autor autor : set ) {
            set1.add( autorToAutorResponse( autor ) );
        }

        return set1;
    }

    protected InventarioResponse inventarioToInventarioResponse(Inventario inventario) {
        if ( inventario == null ) {
            return null;
        }

        InventarioResponse.InventarioResponseBuilder inventarioResponse = InventarioResponse.builder();

        inventarioResponse.id( inventario.getId() );
        inventarioResponse.cantidad( inventario.getCantidad() );
        inventarioResponse.cantidadReservada( inventario.getCantidadReservada() );
        inventarioResponse.nivelReorden( inventario.getNivelReorden() );
        inventarioResponse.stockMaximo( inventario.getStockMaximo() );
        inventarioResponse.ubicacionAlmacen( inventario.getUbicacionAlmacen() );
        inventarioResponse.fechaUltimoReabastecimiento( inventario.getFechaUltimoReabastecimiento() );
        inventarioResponse.fechaProximoReorden( inventario.getFechaProximoReorden() );
        inventarioResponse.fechaCreacion( inventario.getFechaCreacion() );
        inventarioResponse.fechaActualizacion( inventario.getFechaActualizacion() );

        return inventarioResponse.build();
    }
}
