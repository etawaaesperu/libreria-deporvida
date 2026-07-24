package com.deporvida.mapper;

import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Usuario;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-07-24T00:03:59-0500",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.12 (Oracle Corporation)"
)
@Component
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioResponse toResponse(Usuario entity) {
        if ( entity == null ) {
            return null;
        }

        UsuarioResponse.UsuarioResponseBuilder usuarioResponse = UsuarioResponse.builder();

        usuarioResponse.roles( mapRoles( entity.getRoles() ) );
        usuarioResponse.id( entity.getId() );
        usuarioResponse.nombreUsuario( entity.getNombreUsuario() );
        usuarioResponse.correo( entity.getCorreo() );
        usuarioResponse.nombres( entity.getNombres() );
        usuarioResponse.apellidos( entity.getApellidos() );
        usuarioResponse.telefono( entity.getTelefono() );
        usuarioResponse.activo( entity.getActivo() );
        usuarioResponse.correoVerificado( entity.getCorreoVerificado() );
        usuarioResponse.ultimoInicioSesion( entity.getUltimoInicioSesion() );
        usuarioResponse.fechaCreacion( entity.getFechaCreacion() );
        usuarioResponse.fechaActualizacion( entity.getFechaActualizacion() );

        usuarioResponse.nombreCompleto( entity.obtenerNombreCompleto() );

        return usuarioResponse.build();
    }

    @Override
    public void updateEntity(UsuarioResponse request, Usuario entity) {
        if ( request == null ) {
            return;
        }

        entity.setNombreUsuario( request.getNombreUsuario() );
        entity.setCorreo( request.getCorreo() );
        entity.setNombres( request.getNombres() );
        entity.setApellidos( request.getApellidos() );
        entity.setTelefono( request.getTelefono() );
        entity.setActivo( request.getActivo() );
        entity.setCorreoVerificado( request.getCorreoVerificado() );
    }
}
