import api from './api';

export interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion?: string;
  urlImagen?: string;
  activo: boolean;
}

export const categoriaService = {
  getAll: (params?: { page?: number; size?: number }) =>
    api.get('/categories', { params }),

  getAllActivo: () =>
    api.get<CategoriaResponse[]>('/categories/activo'),

  getById: (id: number) =>
    api.get<CategoriaResponse>(`/categories/${id}`),

  search: (keyword: string, params?: { page?: number; size?: number }) =>
    api.get('/categories/search', { params: { keyword, ...params } }),
};
