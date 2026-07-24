package com.deporvida.service.impl;

import com.deporvida.dto.request.CategoriaRequest;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.entity.Categoria;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.CategoriaMapper;
import com.deporvida.repository.CategoriaRepository;
import com.deporvida.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoriaServiceImpl implements CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final CategoriaMapper categoriaMapper;

    @Override
    public CategoriaResponse create(CategoriaRequest request) {
        if (categoriaRepository.existsByNombre(request.getNombre())) {
            throw new IllegalArgumentException("Categoria with nombre '" + request.getNombre() + "' already exists");
        }
        Categoria categoria = categoriaMapper.toEntity(request);
        if (request.getPadreId() != null) {
            Categoria padre = categoriaRepository.findById(request.getPadreId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Padre categoria not found with id: " + request.getPadreId()));
            categoria.setPadre(padre);
        }
        return categoriaMapper.toResponse(categoriaRepository.save(categoria));
    }

    @Override
    public CategoriaResponse update(Long id, CategoriaRequest request) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + id));
        if (!categoria.getNombre().equals(request.getNombre()) && categoriaRepository.existsByNombre(request.getNombre())) {
            throw new IllegalArgumentException("Categoria with nombre '" + request.getNombre() + "' already exists");
        }
        categoriaMapper.updateEntity(request, categoria);
        if (request.getPadreId() != null) {
            Categoria padre = categoriaRepository.findById(request.getPadreId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Padre categoria not found with id: " + request.getPadreId()));
            categoria.setPadre(padre);
        } else {
            categoria.setPadre(null);
        }
        return categoriaMapper.toResponse(categoriaRepository.save(categoria));
    }

    @Override
    public void delete(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + id));
        categoriaRepository.delete(categoria);
    }

    @Override
    @Transactional(readOnly = true)
    public CategoriaResponse getById(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + id));
        return categoriaMapper.toResponse(categoria);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<CategoriaResponse> getAll(Pageable pageable) {
        Page<Categoria> page = categoriaRepository.findAll(pageable);
        return PaginaResponse.fromPage(page.map(categoriaMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponse> getAllActivo() {
        return categoriaRepository.findByActivoTrue().stream()
            .map(categoriaMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoriaResponse> getRootCategories() {
        return categoriaRepository.findByActivoTrueAndPadreIsNull().stream()
            .map(categoriaMapper::toResponse)
            .collect(Collectors.toList());
    }

@Override
    @Transactional(readOnly = true)
    public List<CategoriaResponse> getHijos(Long padreId) {
        return categoriaRepository.findByPadreId(padreId).stream()
            .map(categoriaMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<CategoriaResponse> search(String keyword, Pageable pageable) {
        Page<Categoria> page = categoriaRepository.searchByKeyword(keyword, pageable);
        return PaginaResponse.fromPage(page.map(categoriaMapper::toResponse));
    }

    @Override
    public CategoriaResponse toggleActivo(Long id) {
        Categoria categoria = categoriaRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + id));
        categoria.setActivo(!categoria.getActivo());
        return categoriaMapper.toResponse(categoriaRepository.save(categoria));
    }
}