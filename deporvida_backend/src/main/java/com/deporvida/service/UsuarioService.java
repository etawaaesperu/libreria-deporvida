package com.deporvida.service;

import com.deporvida.dto.request.ActualizarRolesRequest;
import com.deporvida.dto.request.DireccionRequest;
import com.deporvida.dto.response.DireccionResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.dto.response.UsuarioResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UsuarioService {

    UsuarioResponse getById(Long id);

    UsuarioResponse getByNombreUsuario(String nombreUsuario);

    UsuarioResponse getByCorreo(String correo);

    PaginaResponse<UsuarioResponse> getAll(Pageable pageable);

    UsuarioResponse update(Long id, UsuarioResponse request);

    void delete(Long id);

    UsuarioResponse toggleActivo(Long id);

    List<DireccionResponse> getDirecciones(Long usuarioId);

    DireccionResponse addDireccion(Long usuarioId, DireccionRequest request);

    DireccionResponse updateDireccion(Long usuarioId, Long direccionId, DireccionRequest request);

    void deleteDireccion(Long usuarioId, Long direccionId);

    DireccionResponse setDireccionPredeterminada(Long usuarioId, Long direccionId);

    UsuarioResponse actualizarRoles(Long usuarioId, ActualizarRolesRequest request);
}