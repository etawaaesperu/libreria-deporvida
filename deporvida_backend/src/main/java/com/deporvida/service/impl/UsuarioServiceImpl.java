package com.deporvida.service.impl;

import com.deporvida.dto.request.ActualizarRolesRequest;
import com.deporvida.dto.request.DireccionRequest;
import com.deporvida.dto.response.DireccionResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.dto.response.UsuarioResponse;
import com.deporvida.entity.Direccion;
import com.deporvida.entity.Rol;
import com.deporvida.entity.Usuario;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.DireccionMapper;
import com.deporvida.mapper.UsuarioMapper;
import com.deporvida.repository.DireccionRepository;
import com.deporvida.repository.RolRepository;
import com.deporvida.repository.UsuarioRepository;
import com.deporvida.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final DireccionRepository direccionRepository;
    private final RolRepository rolRepository;
    private final UsuarioMapper usuarioMapper;
    private final DireccionMapper direccionMapper;

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse getById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + id));
        return usuarioMapper.toResponse(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse getByNombreUsuario(String nombreUsuario) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombreUsuario)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with nombreUsuario: " + nombreUsuario));
        return usuarioMapper.toResponse(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponse getByCorreo(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with correo: " + correo));
        return usuarioMapper.toResponse(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<UsuarioResponse> getAll(Pageable pageable) {
        Page<Usuario> page = usuarioRepository.findAll(pageable);
        return PaginaResponse.fromPage(page.map(usuarioMapper::toResponse));
    }

    @Override
    public UsuarioResponse update(Long id, UsuarioResponse request) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + id));
        
        usuarioMapper.updateEntity(request, usuario);
        
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Override
    public void delete(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Usuario not found with id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    @Override
    public UsuarioResponse toggleActivo(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + id));
        usuario.setActivo(!usuario.getActivo());
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional(readOnly = true)
    public List<DireccionResponse> getDirecciones(Long usuarioId) {
        return direccionRepository.findByUsuarioId(usuarioId).stream()
            .map(direccionMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public DireccionResponse addDireccion(Long usuarioId, DireccionRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario not found with id: " + usuarioId));
        
        Direccion direccion = direccionMapper.toEntity(request);
        direccion.setUsuario(usuario);
        
        if (Boolean.TRUE.equals(request.getDireccionPredeterminada())) {
            direccionRepository.findByUsuarioIdAndDireccionPredeterminadaTrue(usuarioId)
                .forEach(a -> {
                    a.setDireccionPredeterminada(false);
                    direccionRepository.save(a);
                });
        }
        
        return direccionMapper.toResponse(direccionRepository.save(direccion));
    }

    @Override
    public DireccionResponse updateDireccion(Long usuarioId, Long direccionId, DireccionRequest request) {
        Direccion direccion = direccionRepository.findById(direccionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Direccion not found with id: " + direccionId));
        
        if (!direccion.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Direccion does not belong to usuario");
        }
        
        direccionMapper.updateEntity(request, direccion);
        
        if (Boolean.TRUE.equals(request.getDireccionPredeterminada())) {
            direccionRepository.findByUsuarioIdAndDireccionPredeterminadaTrue(usuarioId)
                .forEach(a -> {
                    if (!a.getId().equals(direccionId)) {
                        a.setDireccionPredeterminada(false);
                        direccionRepository.save(a);
                    }
                });
        }
        
        return direccionMapper.toResponse(direccionRepository.save(direccion));
    }

    @Override
    public void deleteDireccion(Long usuarioId, Long direccionId) {
        Direccion direccion = direccionRepository.findById(direccionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Direccion not found with id: " + direccionId));
        
        if (!direccion.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Direccion does not belong to usuario");
        }
        
        direccionRepository.delete(direccion);
    }

    @Override
    public DireccionResponse setDireccionPredeterminada(Long usuarioId, Long direccionId) {
        Direccion direccion = direccionRepository.findById(direccionId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Direccion not found with id: " + direccionId));
        
        if (!direccion.getUsuario().getId().equals(usuarioId)) {
            throw new IllegalArgumentException("Direccion does not belong to usuario");
        }
        
        direccionRepository.findByUsuarioIdAndDireccionPredeterminadaTrue(usuarioId)
            .forEach(a -> {
                a.setDireccionPredeterminada(false);
                direccionRepository.save(a);
            });
        
        direccion.setDireccionPredeterminada(true);
        return direccionMapper.toResponse(direccionRepository.save(direccion));
    }

    @Override
    public UsuarioResponse actualizarRoles(Long usuarioId, ActualizarRolesRequest request) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id: " + usuarioId));

        Set<Rol> roles = request.getRoles().stream()
            .map(nombreRol -> rolRepository.findByNombre(nombreRol)
                .orElseThrow(() -> new RecursoNoEncontradoException("Rol no encontrado: " + nombreRol)))
            .collect(Collectors.toSet());

        usuario.setRoles(roles);
        return usuarioMapper.toResponse(usuarioRepository.save(usuario));
    }
}