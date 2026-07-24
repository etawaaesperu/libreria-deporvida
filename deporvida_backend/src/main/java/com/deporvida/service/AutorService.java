package com.deporvida.service;

import com.deporvida.dto.request.AutorRequest;
import com.deporvida.dto.response.AutorResponse;
import com.deporvida.dto.response.PaginaResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AutorService {

    AutorResponse create(AutorRequest request);

    AutorResponse update(Long id, AutorRequest request);

    void delete(Long id);

    AutorResponse getById(Long id);

    PaginaResponse<AutorResponse> getAll(Pageable pageable);

    List<AutorResponse> getAllActivo();
}