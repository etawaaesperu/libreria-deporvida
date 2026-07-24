package com.deporvida.service.impl;

import com.deporvida.dto.request.AutorRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.entity.Autor;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.AutorMapper;
import com.deporvida.repository.AutorRepository;
import com.deporvida.service.AutorService;
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
public class AutorServiceImpl implements AutorService {

    private final AutorRepository autorRepository;
    private final AutorMapper autorMapper;

    @Override
    public AutorResponse create(AutorRequest request) {
        Autor autor = autorMapper.toEntity(request);
        return autorMapper.toResponse(autorRepository.save(autor));
    }

    @Override
    public AutorResponse update(Long id, AutorRequest request) {
        Autor autor = autorRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Autor not found with id: " + id));
        autorMapper.updateEntity(request, autor);
        return autorMapper.toResponse(autorRepository.save(autor));
    }

    @Override
    @Transactional(readOnly = true)
    public AutorResponse getById(Long id) {
        Autor autor = autorRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Autor not found with id: " + id));
        return autorMapper.toResponse(autor);
    }

    @Override
    public void delete(Long id) {
        if (!autorRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Autor not found with id: " + id);
        }
        autorRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<AutorResponse> getAll(Pageable pageable) {
        Page<Autor> page = autorRepository.findAll(pageable);
        return PaginaResponse.fromPage(page.map(autorMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AutorResponse> getAllActivo() {
        return autorRepository.findAll().stream()
            .map(autorMapper::toResponse)
            .collect(Collectors.toList());
    }
}