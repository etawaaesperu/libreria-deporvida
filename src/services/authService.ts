import api from './api';

export interface LoginRequest {
  nombreUsuario: string;
  contrasena: string;
}

export interface RegistroRequest {
  nombreUsuario: string;
  correo: string;
  contrasena: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
}

export interface AutenticacionResponse {
  id: number;
  nombreUsuario: string;
  correo: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  token: string;
  roles: string[];
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post<AutenticacionResponse>('/auth/login', data),

  register: (data: RegistroRequest) =>
    api.post<AutenticacionResponse>('/auth/register', data),

  me: () =>
    api.get<AutenticacionResponse>('/auth/me'),
};
