package com.deporvida.service;

import com.deporvida.dto.request.LibroRequest;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.dto.response.PaginaResponse;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface LibroService {

    LibroResponse create(LibroRequest request);

    LibroResponse update(Long id, LibroRequest request);

    void delete(Long id);

    LibroResponse getById(Long id);

    PaginaResponse<LibroResponse> getAll(Pageable pageable);

    PaginaResponse<LibroResponse> getByCategoria(Long categoriaId, Pageable pageable);

    PaginaResponse<LibroResponse> getByAutor(Long autorId, Pageable pageable);

    PaginaResponse<LibroResponse> search(String keyword, Pageable pageable);

    List<LibroResponse> getDestacado();

    List<LibroResponse> getMasVendidos();

    List<LibroResponse> getTopRated();

    LibroResponse toggleActivo(Long id);

    LibroResponse toggleDestacado(Long id);

    LibroResponse toggleMasVendido(Long id);

    LibroResponse updateInventario(Long id, Integer cantidad);
}