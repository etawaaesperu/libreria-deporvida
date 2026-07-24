import api from './api';

export interface AutorResponse {
  id: number;
  nombre: string;
  biografia?: string;
  urlImagen?: string;
}

export interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion?: string;
  urlImagen?: string;
  activo: boolean;
}

export interface InventarioResponse {
  id: number;
  cantidad: number;
}

export interface LibroResponse {
  id: number;
  titulo: string;
  isbn13?: string;
  isbn10?: string;
  descripcion?: string;
  precio: number;
  precioOferta?: number;
  precioEfectivo: number;
  enOferta: boolean;
  urlPortada?: string;
  urlMiniatura?: string;
  activo: boolean;
  destacado: boolean;
  masVendido: boolean;
  categoria?: CategoriaResponse;
  autors?: AutorResponse[];
  inventario?: InventarioResponse;
}

export interface PaginaResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const libroService = {
  getAll: (params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<LibroResponse>>('/libros', { params }),

  getById: (id: number) =>
    api.get<LibroResponse>(`/libros/${id}`),

  search: (keyword: string, params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<LibroResponse>>('/libros/search', { params: { keyword, ...params } }),

  getByCategoria: (categoriaId: number, params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<LibroResponse>>(`/libros/categoria/${categoriaId}`, { params }),

  getByAutor: (autorId: number, params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<LibroResponse>>(`/libros/autor/${autorId}`, { params }),

  getDestacados: () =>
    api.get<LibroResponse[]>('/libros/destacado'),

  getMasVendidos: () =>
    api.get<LibroResponse[]>('/libros/masVendidos'),

  getTopRated: () =>
    api.get<LibroResponse[]>('/libros/top-rated'),

  toggleActivo: (id: number) =>
    api.put<LibroResponse>(`/libros/${id}/toggle-activo`),

  toggleDestacado: (id: number) =>
    api.put<LibroResponse>(`/libros/${id}/toggle-destacado`),

  toggleMasVendido: (id: number) =>
    api.put<LibroResponse>(`/libros/${id}/toggle-masVendido`),
};
