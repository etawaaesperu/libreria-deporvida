package com.deporvida.service.impl;

import com.deporvida.dto.request.LibroRequest;
import com.deporvida.dto.response.LibroResponse;
import com.deporvida.dto.response.PaginaResponse;
import com.deporvida.entity.Autor;
import com.deporvida.entity.Libro;
import com.deporvida.entity.Categoria;
import com.deporvida.entity.Inventario;
import com.deporvida.exception.RecursoNoEncontradoException;
import com.deporvida.mapper.LibroMapper;
import com.deporvida.repository.AutorRepository;
import com.deporvida.repository.LibroRepository;
import com.deporvida.repository.CategoriaRepository;
import com.deporvida.repository.InventarioRepository;
import com.deporvida.service.LibroService;
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
public class LibroServiceImpl implements LibroService {

    private final LibroRepository libroRepository;
    private final CategoriaRepository categoriaRepository;
    private final AutorRepository autorRepository;
    private final InventarioRepository inventarioRepository;
    private final LibroMapper libroMapper;

    @Override
    public LibroResponse create(LibroRequest request) {
        if (request.getIsbn13() != null && libroRepository.existsByIsbn13(request.getIsbn13())) {
            throw new IllegalArgumentException("Libro with ISBN-13 '" + request.getIsbn13() + "' already exists");
        }
        if (request.getIsbn10() != null && libroRepository.existsByIsbn10(request.getIsbn10())) {
            throw new IllegalArgumentException("Libro with ISBN-10 '" + request.getIsbn10() + "' already exists");
        }
        
        Libro libro = libroMapper.toEntity(request);
        
        if (request.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + request.getCategoriaId()));
            libro.setCategoria(categoria);
        }
        
        if (request.getAutoresIds() != null && !request.getAutoresIds().isEmpty()) {
            Set<Autor> autors = request.getAutoresIds().stream()
                .map(id -> autorRepository.findById(id)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Autor not found with id: " + id)))
                .collect(Collectors.toSet());
            libro.setAutors(autors);
        }
        
        Libro saved = libroRepository.save(libro);
        
        Inventario inventario = new Inventario();
        inventario.setLibro(saved);
        inventario.setCantidad(0);
        inventarioRepository.save(inventario);
        
        return libroMapper.toResponse(saved);
    }

    @Override
    public LibroResponse update(Long id, LibroRequest request) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        
        if (request.getIsbn13() != null && !request.getIsbn13().equals(libro.getIsbn13()) 
            && libroRepository.existsByIsbn13(request.getIsbn13())) {
            throw new IllegalArgumentException("Libro with ISBN-13 '" + request.getIsbn13() + "' already exists");
        }
        if (request.getIsbn10() != null && !request.getIsbn10().equals(libro.getIsbn10()) 
            && libroRepository.existsByIsbn10(request.getIsbn10())) {
            throw new IllegalArgumentException("Libro with ISBN-10 '" + request.getIsbn10() + "' already exists");
        }
        
        libroMapper.updateEntity(request, libro);
        
        if (request.getCategoriaId() != null) {
            Categoria categoria = categoriaRepository.findById(request.getCategoriaId())
                .orElseThrow(() -> new RecursoNoEncontradoException("Categoria not found with id: " + request.getCategoriaId()));
            libro.setCategoria(categoria);
        } else {
            libro.setCategoria(null);
        }
        
        if (request.getAutoresIds() != null) {
            Set<Autor> autors = request.getAutoresIds().stream()
                .map(autorId -> autorRepository.findById(autorId)
                    .orElseThrow(() -> new RecursoNoEncontradoException("Autor not found with id: " + autorId)))
                .collect(Collectors.toSet());
            libro.setAutors(autors);
        }
        
        return libroMapper.toResponse(libroRepository.save(libro));
    }

    @Override
    public void delete(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Libro not found with id: " + id);
        }
        libroRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public LibroResponse getById(Long id) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        return libroMapper.toResponse(libro);
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<LibroResponse> getAll(Pageable pageable) {
        Page<Libro> page = libroRepository.findByActivoTrue(pageable);
        return PaginaResponse.fromPage(page.map(libroMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<LibroResponse> getByCategoria(Long categoriaId, Pageable pageable) {
        Page<Libro> page = libroRepository.findByCategoriaIdAndActivoTrue(categoriaId, pageable);
        return PaginaResponse.fromPage(page.map(libroMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<LibroResponse> getByAutor(Long autorId, Pageable pageable) {
        Page<Libro> page = libroRepository.findByAutorId(autorId, pageable);
        return PaginaResponse.fromPage(page.map(libroMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public PaginaResponse<LibroResponse> search(String keyword, Pageable pageable) {
        Page<Libro> page = libroRepository.searchByKeyword(keyword, pageable);
        return PaginaResponse.fromPage(page.map(libroMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroResponse> getDestacado() {
        return libroRepository.findByActivoTrueAndDestacadoTrue().stream()
            .map(libroMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroResponse> getMasVendidos() {
        return libroRepository.findByActivoTrueAndMasVendidoTrue().stream()
            .map(libroMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<LibroResponse> getTopRated() {
        return libroRepository.findByActivoTrueOrderByCalificacionPromedioDesc().stream()
            .map(libroMapper::toResponse)
            .collect(Collectors.toList());
    }

    @Override
    public LibroResponse toggleActivo(Long id) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        libro.setActivo(!libro.getActivo());
        return libroMapper.toResponse(libroRepository.save(libro));
    }

    @Override
    public LibroResponse toggleDestacado(Long id) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        libro.setDestacado(!libro.getDestacado());
        return libroMapper.toResponse(libroRepository.save(libro));
    }

    @Override
    public LibroResponse toggleMasVendido(Long id) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        libro.setMasVendido(!libro.getMasVendido());
        return libroMapper.toResponse(libroRepository.save(libro));
    }

    @Override
    public LibroResponse updateInventario(Long id, Integer cantidad) {
        Libro libro = libroRepository.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Libro not found with id: " + id));
        Inventario inventario = inventarioRepository.findByLibroId(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Inventario not found for libro id: " + id));
        inventario.setCantidad(cantidad);
        inventarioRepository.save(inventario);
        return libroMapper.toResponse(libro);
    }
}