import api from './api';

export interface AutorResponse {
  id: number;
  nombre: string;
  biografia?: string;
  urlImagen?: string;
}

export const autorService = {
  getAll: (params?: { page?: number; size?: number }) =>
    api.get('/autors', { params }),

  getAllActivo: () =>
    api.get<AutorResponse[]>('/autors/activo'),

  getById: (id: number) =>
    api.get<AutorResponse>(`/autors/${id}`),
};
