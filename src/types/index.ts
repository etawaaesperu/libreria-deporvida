export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: 'admin' | 'colaborador' | 'cliente';
}

export interface Colaborador {
  id: number;
  userId: number;
  salary: number;
  mobile: string;
  joinDate: string;
  status: boolean;
}

export interface Cliente {
  id: number;
  userId: number;
  codigo: string;
  mobile: string;
  compras: number;
  categoria: string;
  status: boolean;
}

export interface Aviso {
  id: number;
  date: string;
  by: string;
  message: string;
}

export interface Pedido {
  id: number;
  codigo: string;
  date: string;
  categoria: string;
  estado: 'Entregado' | 'Pendiente';
}

export interface Libro {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion?: string;
  stock: number;
  urlPortada?: string;
  urlMiniatura?: string;
  precioEfectivo?: number;
  enOferta?: boolean;
  autors?: { id: number; nombre: string; urlImagen?: string }[];
  inventario?: { id: number; cantidad: number };
}

export interface CarritoItem {
  libro: Libro;
  cantidad: number;
  itemId?: number;
}

export interface LibreriaData {
  users: User[];
  colaboradores: Colaborador[];
  clientes: Cliente[];
  pedidos: Pedido[];
  avisos: Aviso[];
  libros: Libro[];
  nextId: {
    users: number;
    colaboradores: number;
    clientes: number;
    avisos: number;
    pedidos: number;
    libros: number;
  };
}

export type UserRole = 'admin' | 'colaborador' | 'cliente';
export type ViewName =
  | 'home' | 'about' | 'contact' | 'catalogo' | 'carrito' | 'checkout'
  | 'admin-click' | 'colaborador-click' | 'cliente-click'
  | 'admin-signup' | 'colaborador-signup' | 'cliente-signup' | 'login'
  | 'admin-dashboard' | 'admin-colaborador' | 'admin-view-colaborador' | 'admin-add-colaborador'
  | 'admin-approve-colaborador' | 'admin-update-colaborador' | 'admin-view-colaborador-salario'
  | 'admin-cliente' | 'admin-view-cliente' | 'admin-add-cliente' | 'admin-approve-cliente'
  | 'admin-update-cliente' | 'admin-view-cliente-compras' | 'admin-pedidos' | 'admin-avisos'
  | 'colaborador-dashboard' | 'colaborador-pedidos' | 'colaborador-registrar-pedido'
  | 'colaborador-view-pedidos' | 'colaborador-view-pedidos-detalle' | 'colaborador-avisos'
  | 'cliente-dashboard' | 'cliente-pedidos' | 'cliente-ver-pedido'
  | 'favoritos'
  | 'admin-view-compras' | 'admin-view-pedidos' | 'admin-registrar-pedido'
  | 'admin-libros';

export interface NavParams {
  role?: UserRole;
  id?: number;
  class?: string;
  date?: string;
  redirectTo?: ViewName;
  searchTerm?: string;
}
