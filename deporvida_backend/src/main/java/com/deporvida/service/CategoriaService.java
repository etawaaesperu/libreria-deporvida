package com.deporvida.service;

import com.deporvida.dto.request.CategoriaRequest;
import com.deporvida.dto.response.CategoriaResponse;
import com.deporvida.dto.response.PaginaResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoriaService {

    CategoriaResponse create(CategoriaRequest request);

    CategoriaResponse update(Long id, CategoriaRequest request);

    void delete(Long id);

    CategoriaResponse getById(Long id);

    PaginaResponse<CategoriaResponse> getAll(Pageable pageable);

    List<CategoriaResponse> getAllActivo();

    List<CategoriaResponse> getRootCategories();

    List<CategoriaResponse> getHijos(Long padreId);

    PaginaResponse<CategoriaResponse> search(String keyword, Pageable pageable);

    CategoriaResponse toggleActivo(Long id);
}