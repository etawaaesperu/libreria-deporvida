package com.deporvida.mapper;

import com.deporvida.dto.request.DireccionRequest;
import com.deporvida.dto.response.DireccionResponse;
import com.deporvida.entity.Direccion;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class DireccionMapperImpl implements DireccionMapper {

    @Override
    public Direccion toEntity(DireccionRequest request) {
        if ( request == null ) {
            return null;
        }

        Direccion.DireccionBuilder direccion = Direccion.builder();

        direccion.etiqueta( request.getEtiqueta() );
        direccion.nombreCompleto( request.getNombreCompleto() );
        direccion.telefono( request.getTelefono() );
        direccion.direccionLinea1( request.getDireccionLinea1() );
        direccion.direccionLinea2( request.getDireccionLinea2() );
        direccion.ciudad( request.getCiudad() );
        direccion.departamento( request.getDepartamento() );
        direccion.codigoPostal( request.getCodigoPostal() );
        direccion.pais( request.getPais() );
        direccion.direccionPredeterminada( request.getDireccionPredeterminada() );
        direccion.facturacion( request.getFacturacion() );

        return direccion.build();
    }

    @Override
    public DireccionResponse toResponse(Direccion entity) {
        if ( entity == null ) {
            return null;
        }

        DireccionResponse.DireccionResponseBuilder direccionResponse = DireccionResponse.builder();

        direccionResponse.id( entity.getId() );
        direccionResponse.etiqueta( entity.getEtiqueta() );
        direccionResponse.nombreCompleto( entity.getNombreCompleto() );
        direccionResponse.telefono( entity.getTelefono() );
        direccionResponse.direccionLinea1( entity.getDireccionLinea1() );
        direccionResponse.direccionLinea2( entity.getDireccionLinea2() );
        direccionResponse.ciudad( entity.getCiudad() );
        direccionResponse.departamento( entity.getDepartamento() );
        direccionResponse.codigoPostal( entity.getCodigoPostal() );
        direccionResponse.pais( entity.getPais() );
        direccionResponse.direccionPredeterminada( entity.getDireccionPredeterminada() );
        direccionResponse.facturacion( entity.getFacturacion() );
        direccionResponse.fechaCreacion( entity.getFechaCreacion() );
        direccionResponse.fechaActualizacion( entity.getFechaActualizacion() );

        return direccionResponse.build();
    }

    @Override
    public void updateEntity(DireccionRequest request, Direccion entity) {
        if ( request == null ) {
            return;
        }

        entity.setEtiqueta( request.getEtiqueta() );
        entity.setNombreCompleto( request.getNombreCompleto() );
        entity.setTelefono( request.getTelefono() );
        entity.setDireccionLinea1( request.getDireccionLinea1() );
        entity.setDireccionLinea2( request.getDireccionLinea2() );
        entity.setCiudad( request.getCiudad() );
        entity.setDepartamento( request.getDepartamento() );
        entity.setCodigoPostal( request.getCodigoPostal() );
        entity.setPais( request.getPais() );
        entity.setDireccionPredeterminada( request.getDireccionPredeterminada() );
        entity.setFacturacion( request.getFacturacion() );
    }
}
