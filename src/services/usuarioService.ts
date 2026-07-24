import api from './api';

export interface UsuarioResponse {
  id: number;
  nombreUsuario: string;
  correo: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  telefono: string;
  activo: boolean;
  roles: string[];
  fechaCreacion: string;
}

export interface ActualizarRolesRequest {
  roles: string[];
}

export interface PaginaResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export const usuarioService = {
  getAll: (params?: { page?: number; size?: number }) =>
    api.get<PaginaResponse<UsuarioResponse>>('/usuarios', { params }),

  getById: (id: number) =>
    api.get<UsuarioResponse>(`/usuarios/${id}`),

  update: (id: number, data: Partial<UsuarioResponse>) =>
    api.put<UsuarioResponse>(`/usuarios/${id}`, data),

  delete: (id: number) =>
    api.delete(`/usuarios/${id}`),

  toggleActivo: (id: number) =>
    api.put<UsuarioResponse>(`/usuarios/${id}/toggle-activo`),

  actualizarRoles: (id: number, data: ActualizarRolesRequest) =>
    api.put<UsuarioResponse>(`/usuarios/${id}/roles`, data),
};
