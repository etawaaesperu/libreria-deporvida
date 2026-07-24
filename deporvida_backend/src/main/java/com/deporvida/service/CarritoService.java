package com.deporvida.service;

import com.deporvida.dto.request.ItemCarritoRequest;
import com.deporvida.dto.response.CarritoResponse;

public interface CarritoService {

    CarritoResponse getCarrito(Long usuarioId);

    CarritoResponse addItem(Long usuarioId, ItemCarritoRequest request);

    CarritoResponse updateItem(Long usuarioId, Long itemId, Integer cantidad);

    CarritoResponse removeItem(Long usuarioId, Long itemId);

    void clearCarrito(Long usuarioId);

    int getItemCount(Long usuarioId);
}