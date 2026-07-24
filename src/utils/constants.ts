import type { Libro } from '../types';

export const CATEGORIES = [
  'Novela', 'Ficción', 'Infantil', 'Autoayuda', 'Negocios',
  'Historia', 'Ciencia', 'Poesía', 'Cómics', 'Académico'
];

export const SAMPLE_LIBROS: Libro[] = [
  { id: 1, titulo: 'Clean Code', autor: 'Robert C. Martin', categoria: 'Negocios', precio: 95.00, imagen: undefined, descripcion: 'Manual de desarrollo de software limpio', stock: 15 },
  { id: 2, titulo: 'El Principito', autor: 'Antoine de Saint-Exupéry', categoria: 'Infantil', precio: 45.00, imagen: undefined, descripcion: 'Clásico de la literatura infantil', stock: 20 },
  { id: 3, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', categoria: 'Novela', precio: 65.00, imagen: undefined, descripcion: 'Obra maestra del realismo mágico', stock: 12 },
  { id: 4, titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'Historia', precio: 78.00, imagen: undefined, descripcion: 'Breve historia de la humanidad', stock: 10 },
  { id: 5, titulo: 'El poder del ahora', autor: 'Eckhart Tolle', categoria: 'Autoayuda', precio: 55.00, imagen: undefined, descripcion: 'Guía para la iluminación espiritual', stock: 18 },
  { id: 6, titulo: 'Breve historia del tiempo', autor: 'Stephen Hawking', categoria: 'Ciencia', precio: 85.00, imagen: undefined, descripcion: 'Del Big Bang a los agujeros negros', stock: 8 },
  { id: 7, titulo: 'Padre rico, padre pobre', autor: 'Robert Kiyosaki', categoria: 'Negocios', precio: 60.00, imagen: undefined, descripcion: 'Educación financiera básica', stock: 25 },
  { id: 8, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', categoria: 'Novela', precio: 70.00, imagen: undefined, descripcion: 'Clásico de la literatura universal', stock: 5 },
];

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('es-PE', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}
export { API_BASE_URL } from '../services/api';