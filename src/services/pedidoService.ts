import api from './api';
import type { PaginaResponse } from './libroService';

export interface PedidoRequest {
  direccionEnvio: string;
  ciudadEnvio: string;
  departamentoEnvio: string;
  codigoPostalEnvio: string;
  paisEnvio: string;
  telefonoEnvio?: string;
  notas?: string;
  costoEnvio?: number;
}

export interface PedidoResponse {
  id: number;
  numeroPedido: string;
  estado: string;
  subtotal: number;
  montoTotal: number;
  createdAt: string;
  direccionEnvio?: string;
  ciudadEnvio?: string;
  notas?: string;
}

export const pedidoService = {
  create: (data: PedidoRequest) =>
    api.post<PedidoResponse>('/pedidos', data),

  getById: (id: number) =>
    api.get<PedidoResponse>(`/pedidos/${id}`),

  getByNumeroPedido: (numeroPedido: string) =>
    api.get<PedidoResponse>(`/pedidos/numero/${numeroPedido}`),

  getMisPedidos: (params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<PedidoResponse>>('/pedidos', { params }),

  getAll: (params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<PedidoResponse>>('/pedidos/all', { params }),

  cancel: (id: number, motivo: string) =>
    api.put<PedidoResponse>(`/pedidos/${id}/cancelar`, null, { params: { motivo } }),
};
