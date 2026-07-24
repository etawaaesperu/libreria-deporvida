package com.deporvida.dto.response;

import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginaResponse<T> {

    private List<T> content;
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPaginas;
    private boolean first;
    private boolean last;
    private int numberOfElements;
    private boolean empty;

    public static <T> PaginaResponse<T> fromPage(org.springframework.data.domain.Page<T> page) {
        return PaginaResponse.<T>builder()
            .content(page.getContent())
            .pageNumber(page.getNumber())
            .pageSize(page.getSize())
            .totalElements(page.getTotalElements())
            .totalPaginas(page.getTotalPages())
            .first(page.isFirst())
            .last(page.isLast())
            .numberOfElements(page.getNumberOfElements())
            .empty(page.isEmpty())
            .build();
    }
}