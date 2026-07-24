import api from './api';
import type { LibroResponse } from './libroService';

export interface ItemCarritoRequest {
  libroId: number;
  cantidad: number;
}

export interface ItemCarritoResponse {
  id: number;
  libro: LibroResponse;
  cantidad: number;
  precioUnitario: number;
}

export interface CarritoResponse {
  id: number;
  items: ItemCarritoResponse[];
  cantidadItems: number;
  subtotal: number;
}

export const carritoService = {
  getCarrito: () =>
    api.get<CarritoResponse>('/carrito'),

  addItem: (data: ItemCarritoRequest) =>
    api.post<CarritoResponse>('/carrito/items', data),

  updateItem: (itemId: number, cantidad: number) =>
    api.put<CarritoResponse>(`/carrito/items/${itemId}`, null, { params: { cantidad } }),

  removeItem: (itemId: number) =>
    api.delete<CarritoResponse>(`/carrito/items/${itemId}`),

  clearCarrito: () =>
    api.delete('/carrito'),
};
